// src/components/dashboard/Sidebar.tsx
import { cn } from '../../../lib/utils';
import {
  Home,
  Folder,
  Settings,
  LogOut,
  UploadCloud,
  FileDown,
  UserCircle,
  User,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';


const navLinks = [
  { name: 'Projects', icon: Folder },
  { name: 'Overview', icon: Home },
  { name: 'Upload', icon: UploadCloud },
  { name: 'Export', icon: FileDown },
  { name: 'Settings', icon: Settings },
  { name: 'Profile', icon: UserCircle },
];

type SidebarProps = {
  activePage: string;
  setActivePage: (page: string) => void;
};

export function Sidebar({ activePage, setActivePage }: SidebarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(true);

  const isExpanded = open || (isHovered && !isMobile);

  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logout();         // Clear token and user state
    navigate('/login');     // Redirect to login
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setOpen(!mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLinkClick = (page: string) => {
    setActivePage(page);
    if (isMobile) setOpen(false);
  };

  const toggleSidebar = () => {
    setOpen(!open);
    setIsHovered(false);
  };

  return (
    <aside
      className={cn(
        "bg-white border-r fixed left-0 h-5/6 z-40 shadow-lg transition-all duration-300 ease-in-out",
        "flex flex-col",
        isExpanded ? "w-64" : "w-20",
        isMobile && !open
      )}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
            <User className="w-5 h-5" />
          </div>
          {isExpanded && (
            <div>
              <p className="font-medium text-sm">John Doe</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          )}
        </div>

        <button
          onClick={toggleSidebar}
          className={cn(
            "p-1.5 rounded-md hover:bg-gray-100 transition-colors",
            "text-gray-500 hover:text-gray-700",
            "focus:outline-none focus:ring-2 focus:ring-gray-300"
          )}
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
        >
          {open ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="mt-2 flex flex-col h-[calc(100%-5rem)]">
        <div className="flex-1 space-y-1 px-2 py-2">
          {navLinks.map(({ name, icon: Icon }) => {
            const isActive = activePage === name;
            return (
              <button
                key={name}
                onClick={() => handleLinkClick(name)}
                className={cn(
                  "flex items-center w-full p-3 rounded-lg transition-all duration-200",
                  "text-sm font-medium",
                  "hover:bg-gray-100 hover:text-gray-900",
                  isActive
                    ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500"
                    : "text-gray-600",
                  isExpanded ? "justify-start" : "justify-center"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-transform",
                    isActive ? "scale-110" : "scale-100"
                  )}
                />
                {isExpanded && (
                  <span className="ml-3 transition-opacity duration-200">
                    {name}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Section */}
        <div className="px-2 py-4 border-t border-gray-100">
          <button
            onClick={handleSignOut}
            className={cn(
              "flex items-center w-full p-3 rounded-lg transition-all duration-200",
              "text-sm font-medium text-red-600",
              "hover:bg-red-50 hover:text-red-700",
              isExpanded ? "justify-start" : "justify-center"
            )}
          >
            <LogOut
              className={cn("w-5 h-5", isExpanded ? "mr-3" : "mx-auto")}
            />
            {isExpanded && "Sign Out"}
          </button>
        </div>
      </nav>
    </aside>
  );
}