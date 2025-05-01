import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Menu, 
  ChevronDown, 
  User, 
  Settings, 
  LogOut, 
  HelpCircle 
} from 'lucide-react';

interface HeaderProps {
  onToggleMobileSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleMobileSidebar }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };
  
  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
  };
  
  return (
    <header className="bg-white border-b border-neutral-200 py-3 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-neutral-600 hover:text-neutral-900"
          onClick={onToggleMobileSidebar}
        >
          <Menu size={24} />
        </button>
        
        <div className="max-w-md w-full relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="input pl-10 py-1.5"
          />
          <Search 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" 
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            className="p-2 rounded-full text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 relative"
            onClick={toggleNotifications}
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full"></span>
          </button>
          
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-dropdown border border-neutral-200 z-10 animate-fade-in">
              <div className="p-3 border-b border-neutral-200">
                <h3 className="font-medium">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                <div className="p-3 border-b border-neutral-200 hover:bg-neutral-50">
                  <p className="text-sm font-medium">New feature available</p>
                  <p className="text-xs text-neutral-500 mt-1">Budget sharing is now available!</p>
                </div>
                <div className="p-3 border-b border-neutral-200 hover:bg-neutral-50">
                  <p className="text-sm font-medium">Bill reminder</p>
                  <p className="text-xs text-neutral-500 mt-1">Your electricity bill is due tomorrow.</p>
                </div>
                <div className="p-3 hover:bg-neutral-50">
                  <p className="text-sm font-medium">Budget alert</p>
                  <p className="text-xs text-neutral-500 mt-1">You've reached 80% of your food budget.</p>
                </div>
              </div>
              <div className="p-2 border-t border-neutral-200 text-center">
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="relative">
          <button
            className="flex items-center gap-2 rounded-full hover:bg-neutral-100 py-1 px-2"
            onClick={toggleProfileMenu}
          >
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white">
              <User size={16} />
            </div>
            <span className="hidden sm:block text-sm font-medium">Chris Tigga</span>
            <ChevronDown size={16} className="hidden sm:block text-neutral-500" />
          </button>
          
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-dropdown border border-neutral-200 z-10 animate-fade-in">
              <div className="p-2">
                <button className="w-full flex items-center gap-2 p-2 text-sm text-left rounded hover:bg-neutral-100">
                  <User size={16} className="text-neutral-500" />
                  <span>Profile</span>
                </button>
                <button className="w-full flex items-center gap-2 p-2 text-sm text-left rounded hover:bg-neutral-100">
                  <Settings size={16} className="text-neutral-500" />
                  <span>Settings</span>
                </button>
                <button className="w-full flex items-center gap-2 p-2 text-sm text-left rounded hover:bg-neutral-100">
                  <HelpCircle size={16} className="text-neutral-500" />
                  <span>Help & Support</span>
                </button>
                <hr className="my-1 border-neutral-200" />
                <button className="w-full flex items-center gap-2 p-2 text-sm text-left rounded hover:bg-neutral-100 text-danger-600">
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;