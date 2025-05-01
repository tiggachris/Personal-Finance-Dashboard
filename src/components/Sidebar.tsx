import React from 'react';
import { 
  LayoutDashboard, 
  PieChart, 
  ArrowRightLeft, 
  CreditCard, 
  Target, 
  Wallet, 
  Calendar, 
  Settings, 
  HelpCircle,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  activePage: string;
  onChangePage: (page: string) => void;
}

interface NavItem {
  name: string;
  id: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onChangePage }) => {
  const navItems: NavItem[] = [
    { name: 'Dashboard', id: 'dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Transactions', id: 'transactions', icon: <ArrowRightLeft size={20} /> },
    { name: 'Budgets', id: 'budgets', icon: <PieChart size={20} /> },
    { name: 'Bills', id: 'bills', icon: <CreditCard size={20} /> },
    { name: 'Goals', id: 'goals', icon: <Target size={20} /> },
    { name: 'Calendar', id: 'calendar', icon: <Calendar size={20} /> },
  ];

  const bottomNavItems: NavItem[] = [
    { name: 'Settings', id: 'settings', icon: <Settings size={20} /> },
    { name: 'Help', id: 'help', icon: <HelpCircle size={20} /> },
  ];

  return (
    <aside className="bg-white border-r border-neutral-200 w-64 h-screen flex-shrink-0 hidden md:flex flex-col">
      <div className="p-5 border-b border-neutral-200">
        <h1 className="text-xl font-semibold text-primary-600 flex items-center">
          <PieChart className="mr-2" size={24} />
          <span>FinanceFlow</span>
        </h1>
      </div>
      
      <nav className="flex-grow p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`
                  w-full flex items-center py-2 px-3 rounded-lg transition-all duration-200
                  ${activePage === item.id
                    ? 'bg-primary-50 text-primary-700 font-medium'
                    : 'text-neutral-600 hover:bg-neutral-100'
                  }
                `}
                onClick={() => onChangePage(item.id)}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-neutral-200">
        <ul className="space-y-1">
          {bottomNavItems.map((item) => (
            <li key={item.id}>
              <button
                className="w-full flex items-center py-2 px-3 rounded-lg transition-all duration-200 text-neutral-600 hover:bg-neutral-100"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(`Clicked ${item.name}`);
                }}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            </li>
          ))}
          
          <li>
            <button 
              className="w-full flex items-center py-2 px-3 rounded-lg transition-all text-neutral-600 hover:bg-neutral-100"
              onClick={(e) => {
                e.preventDefault();
                console.log('Clicked Logout');
              }}
            >
              <span className="mr-3"><LogOut size={20} /></span>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;