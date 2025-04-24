
import { BrowserRouter as Router } from "react-router-dom";
import  AppRouter  from "./routes/AppRouter";
import { Navbar } from "./components/ui/Navbar";
import { Footer } from "./components/ui/Footer";
import "./index.css";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <AppRouter />
        </main>
        <Footer />
      </div>
    </Router>
  );
}
