import { RequestHandler } from "express";
import { isMongoConnected } from "../db";
import { Event } from "../models/Event";
import { Ticket } from "../models/Ticket";
import { User } from "../models/User";

// In-memory fallback data
const mem = {
  analytics: {
    totalRevenue: 623500,
    totalAttendees: 2759,
    totalTickets: 2759,
    events: 28
  }
};

export const getDashboardAnalytics: RequestHandler = async (_req, res) => {
  if (isMongoConnected()) {
    try {
      const [events, tickets, users] = await Promise.all([
        Event.countDocuments(),
        Ticket.countDocuments(),
        User.countDocuments({ role: "user" })
      ]);

      // Calculate total revenue from tickets
      const ticketData = await Ticket.aggregate([
        {
          $lookup: {
            from: "events",
            localField: "event",
            foreignField: "_id",
            as: "eventData"
          }
        },
        {
          $unwind: "$eventData"
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$eventData.price" }
          }
        }
      ]);

      const totalRevenue = ticketData[0]?.totalRevenue || 0;

      return res.json({
        totalRevenue,
        totalAttendees: users,
        totalTickets: tickets,
        events
      });
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch analytics" });
    }
  } else {
    return res.json(mem.analytics);
  }
};

export const exportAnalytics: RequestHandler = async (req, res) => {
  const format = req.query.format as string;
  
  if (format !== 'csv' && format !== 'excel') {
    return res.status(400).json({ error: "Invalid format. Use 'csv' or 'excel'" });
  }

  try {
    // Sample data for export
    const reportData = [
      { Event: "Colombo Music Festival", Revenue: 120000, Attendees: 240, Date: "2025-04-12" },
      { Event: "Lanka Supercar Show", Revenue: 90000, Attendees: 180, Date: "2025-04-15" },
      { Event: "Rock & Roll Night", Revenue: 105000, Attendees: 210, Date: "2025-03-03" },
    ];

    if (format === 'csv') {
      const csvHeader = Object.keys(reportData[0]).join(',');
      const csvRows = reportData.map(row => Object.values(row).join(','));
      const csvContent = [csvHeader, ...csvRows].join('\n');
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=analytics-report.csv');
      return res.send(csvContent);
    }

    // For Excel format, we'll return JSON that can be processed by frontend
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=analytics-report.json');
    return res.json(reportData);

  } catch (error) {
    return res.status(500).json({ error: "Failed to export analytics" });
  }
};