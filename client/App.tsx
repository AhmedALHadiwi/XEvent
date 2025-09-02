import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Placeholder from "./pages/Placeholder";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import AttendeeInsights from "./pages/AttendeeInsights";
import Analytics from "./pages/Analytics";
import Tickets from "./pages/Tickets";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "@/hooks/useAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/attendee-insights" element={<AttendeeInsights />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/support" element={<Placeholder title="Contact Support" />} />
          <Route path="/notifications" element={<Placeholder title="Notifications" />} />
          <Route path="/settings" element={<Placeholder title="Settings" />} />
          <Route path="/marketing" element={<Placeholder title="Marketing" />} />
          <Route path="/categories" element={<Placeholder title="Event Categories" />} />
          <Route path="/users" element={<Placeholder title="Manage Users" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
