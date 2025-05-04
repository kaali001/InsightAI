import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { Navbar } from "./components/ui/Navbar";
import { Footer } from "./components/ui/Footer";
import { Toaster } from 'sonner';
import "./index.css";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";


// Create a separate component that uses useLocation
function AppContent() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  const initialize = useAuthStore((state) => state.initialize);
  useEffect(() => {
    initialize();
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboardRoute && <Navbar />}
      <main className="flex-1">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
      <Toaster position="top-right" richColors />
    </Router>
  );
}