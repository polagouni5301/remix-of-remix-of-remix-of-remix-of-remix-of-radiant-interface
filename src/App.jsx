import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./routes/Layout";
import Landing from "./routes/landing";
import Index from "./routes/index";
import Login from "./routes/login";
import Diagnose from "./routes/diagnose.$id";
import Campaign from "./routes/campaign.$id";
import ObservationSchedule from "./routes/observation-schedule.$id";
import { AuthProvider } from "./lib/auth-context";
import { TooltipProvider } from "./components/ui/tooltip";

export default function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="landing" element={<Landing />} />
              <Route path="login" element={<Login />} />
              <Route path="campaign/:id" element={<Campaign />} />
              <Route path="diagnose/:id" element={<Diagnose />} />
              <Route path="observation-schedule/:id" element={<ObservationSchedule />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  );
}
