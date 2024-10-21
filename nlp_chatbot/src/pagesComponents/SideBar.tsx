import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { Clock, HelpCircle, Menu, Settings, Sun, Moon, LogOut } from 'lucide-react';
import { ScrollArea } from "../components/ui/scroll-area";
import { useTheme } from '@/components/theme-provider';

const NavSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="mb-6">
    <h3 className="text-sm font-semibold text-muted-foreground mb-2 px-2">
      {title}
    </h3>
    {children}
  </div>
);

const NavLink: React.FC<{
  to: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}> = ({ to, icon, label, badge }) => (
  <Link
    to={to}
    className="flex items-center px-2 py-2 rounded-md hover:bg-secondary transition-colors"
  >
    <span className="mr-3 text-primary">{icon}</span>
    <span>{label}</span>
    {badge !== undefined && (
      <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
        {badge}
      </span>
    )}
  </Link>
);

function SideBar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  return (
    <div>
      <div className="xl:hidden fixed top-0 left-0 right-0 z-50 bg-background flex items-center justify-between p-4 shadow-md border-b">
        <Button variant="outline" size="icon" onClick={toggleSidebar}>
          <Menu className="h-6 w-6" />
        </Button>
        <Link to="/AuthPage">
          <Button>Log In</Button>
        </Link>
      </div>

      <div
        className={`fixed border-r inset-y-0 left-0 z-50 w-60 bg-background text-foreground shadow-lg transform transition-transform duration-500 ease xl:translate-x-0 flex flex-col`}
      >
        <div className="flex-shrink-0">
          <div className="p-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src={""} alt="" className="h-7" />
              <span className="text-xl font-bold text-primary">ChatBot</span>
            </Link>
            <div className="border-gray-700 text-gray-200 text-xs py-1 px-2 bg-secondary rounded-md">
              USER
            </div>
          </div>
          <div className="border-t border-gray-600 opacity-20"></div>
        </div>

        <ScrollArea className="flex-grow">
          <div className="border-t border-gray-600 opacity-20 my-4"></div>
          <nav className="px-4">
            <NavSection title="historical">
              <NavLink
                to="/history"
                icon={<Clock className="h-4 w-4" />}
                label="History Chats"
              />
            </NavSection>

            <NavSection title="Support">
              <NavLink
                to="/AuctionGuides/SafeBidding"
                icon={<HelpCircle className="h-4 w-4" />}
                label="Help Center"
              />
              <NavLink
                to="/UserSettings"
                icon={<Settings className="h-4 w-4" />}
                label="Settings"
              />
              <NavLink
                to="/UserSettings"
                icon={<LogOut className="h-4 w-4" />}
                label="Log Out"
              />
            </NavSection>
          </nav>
        </ScrollArea>

        <div className="p-4">
          <Button onClick={toggleTheme} variant="outline" size="icon">
            {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;