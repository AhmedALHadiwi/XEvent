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
import ProtectedRoute from "./components/ProtectedRoute";

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
          <Route path="/events" element={<ProtectedRoute requireAdmin><Events /></ProtectedRoute>} />
          <Route path="/events/:id" element={<ProtectedRoute requireAdmin><EventDetails /></ProtectedRoute>} />
          <Route path="/tickets" element={<ProtectedRoute><Tickets /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/attendee-insights" element={<ProtectedRoute requireAdmin><AttendeeInsights /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute requireAdmin><Analytics /></ProtectedRoute>} />
          <Route path="/support" element={<ProtectedRoute><Placeholder title="Contact Support" /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Placeholder title="Notifications" /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Placeholder title="Settings" /></ProtectedRoute>} />
          <Route path="/marketing" element={<ProtectedRoute requireAdmin><Placeholder title="Marketing" /></ProtectedRoute>} />
          <Route path="/categories" element={<ProtectedRoute requireAdmin><Placeholder title="Event Categories" /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute requireAdmin><Placeholder title="Manage Users" /></ProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
