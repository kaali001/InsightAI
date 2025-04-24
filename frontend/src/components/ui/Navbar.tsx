import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import logo from "../../assets/logo.png";
import Button from "./Button";

export const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Features", path: "/features" },
    { name: "Pricing", path: "/pricing" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-black/60 transition-all duration-300",
        scrolled && "shadow-lg"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          {/* <img src={logo} alt="InsightAI" className="h-8 w-8 object-contain" /> */}
          <span className="font-bold text-xl text-gray-900 dark:text-white">
            InsightAI
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all",
                location.pathname === link.path &&
                  "text-black dark:text-white font-semibold underline underline-offset-4"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button
              size="sm"
              className="text-gray-800 dark:text-white bg-gray-100/20 hover:bg-gray-100/20 border border-gray-300 dark:border-white/30"
            >
              Log In
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              size="sm"
              className="bg-white text-gray-800 shadow-md hover:bg-white"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
