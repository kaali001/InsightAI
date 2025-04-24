import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} InsightAI. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link to="/legal/privacy" className="hover:text-black">Privacy</Link>
          <Link to="/legal/terms" className="hover:text-black">Terms</Link>
          <Link to="/legal/aup" className="hover:text-black">AUP</Link>
          <Link to="/help" className="hover:text-black">Help</Link>
        </div>
      </div>
    </footer>
  );
};
