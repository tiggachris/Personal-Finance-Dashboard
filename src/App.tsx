import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import Bills from './pages/Bills';
import Goals from './pages/Goals';
import CalendarPage from './pages/Calendar';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };
  
  const renderPage = () => {
    // Ignore settings and help page changes
    if (activePage === 'settings' || activePage === 'help') {
      return <Dashboard onChangePage={setActivePage} />;
    }

    switch (activePage) {
      case 'dashboard':
        return <Dashboard onChangePage={setActivePage} />;
      case 'transactions':
        return <Transactions />;
      case 'budgets':
        return <Budgets />;
      case 'bills':
        return <Bills />;
      case 'goals':
        return <Goals />;
      case 'calendar':
        return <CalendarPage />;
      default:
        return <Dashboard onChangePage={setActivePage} />;
    }
  };
  
  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Desktop Sidebar */}
      <Sidebar 
        activePage={activePage} 
        onChangePage={(page) => {
          // Don't update active page for settings and help
          if (page !== 'settings' && page !== 'help') {
            setActivePage(page);
          }
          setIsMobileSidebarOpen(false);
        }} 
      />
      
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}
      
      {/* Mobile Sidebar */}
      <div 
        className={`
          fixed left-0 top-0 h-full z-30 transition-transform duration-300 ease-in-out transform 
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:hidden
        `}
      >
        <Sidebar 
          activePage={activePage} 
          onChangePage={(page) => {
            setActivePage(page);
            setIsMobileSidebarOpen(false);
          }} 
        />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleMobileSidebar={toggleMobileSidebar} />
        
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;