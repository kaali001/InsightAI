import { Routes, Route } from "react-router-dom";

// Public Pages
import Landing from "../pages/marketing/Landing";
import Features from "../pages/marketing/Features";
import Pricing from "../pages/marketing/Pricing";
import Blog from "../pages/marketing/Blog";
import About from "../pages/marketing/About";
import Contact from "../pages/marketing/Contact";

// Auth Pages
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";

// Dashboard & Core
import Overview from "../pages/dashboard/OverView";
import Clusters from "../pages/dashboard/Clusters";
import Sentiment from "../pages/dashboard/Sentiment";
import Keywords from "../pages/dashboard/Keywords";

// Projects & Upload
import ListProjects from "../pages/projects/ListProjects";
import AddApp from "../pages/projects/AddApp";
import FileUpload from "../pages/upload/FileUpload";
import History from "../pages/feedback/History";

// Reports & Settings
import GenerateReports from "../pages/reports/GenerateReports";
import Profile from "../pages/settings/Profile";
import Billing from "../pages/settings/Billing";
import APIKeys from "../pages/settings/APIKeys";
import Team from "../pages/settings/Team";

// Legal, Help, System
import Privacy from "../pages/legal/Privacy";
import Terms from "../pages/legal/Terms";
import AUP from "../pages/legal/AUP";
import DPA from "../pages/legal/DPA";
import HelpCenter from "../pages/help/HelpCenter";
import NotFound from "../pages/system/NotFound";
import Error500 from "../pages/system/Error500";
import Maintenance from "../pages/system/Maintenance";

const AppRouter = () => {
  return (
    <Routes>
      {/* 🧠 Marketing */}
      <Route path="/" element={<Landing />} />
      <Route path="/features" element={<Features />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* 🔐 Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="/verify" element={<VerifyEmail />} />

      {/* 📊 Core App */}
      <Route path="/dashboard" element={<Overview />} />
      <Route path="/dashboard/clusters" element={<Clusters />} />
      <Route path="/dashboard/sentiment" element={<Sentiment />} />
      <Route path="/dashboard/keywords" element={<Keywords />} />

      {/* 📦 Projects & Upload */}
      <Route path="/projects" element={<ListProjects />} />
      <Route path="/projects/add-app" element={<AddApp />} />
      <Route path="/upload" element={<FileUpload />} />
      <Route path="/feedback" element={<History />} />

      {/* 📄 Reports & Settings */}
      <Route path="/reports" element={<GenerateReports />} />
      <Route path="/settings/profile" element={<Profile />} />
      <Route path="/settings/billing" element={<Billing />} />
      <Route path="/settings/api-keys" element={<APIKeys />} />
      <Route path="/settings/team" element={<Team />} />

      {/* 📚 Legal + Help */}
      <Route path="/legal/privacy" element={<Privacy />} />
      <Route path="/legal/terms" element={<Terms />} />
      <Route path="/legal/aup" element={<AUP />} />
      <Route path="/legal/dpa" element={<DPA />} />
      <Route path="/help" element={<HelpCenter />} />

      {/* 😵‍💫 System */}
      <Route path="/500" element={<Error500 />} />
      <Route path="/maintenance" element={<Maintenance />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
