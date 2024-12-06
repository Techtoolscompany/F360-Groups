import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import ChatSidebar from './ChatSidebar';
import { useSidebar } from '../../context/SidebarContext';

function MainLayout() {
  const { isCollapsed, isMobileMenuOpen, toggleMobileMenu } = useSidebar();
  const location = useLocation();

  // Close mobile menu when route changes
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex h-screen bg-[#1a1d24] overflow-hidden">
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 transform lg:relative lg:transform-none
        transition duration-200 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'w-16' : 'w-64'}
        bg-[#1e2128] flex flex-col
      `}>
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <TopNav />
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <div className="container mx-auto px-4 py-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Chat sidebar */}
      <div className={`
        fixed inset-y-0 right-0 z-30 transform lg:relative lg:transform-none
        transition duration-200 ease-in-out
        ${isCollapsed ? 'translate-x-full lg:translate-x-0' : 'translate-x-full lg:translate-x-0'}
        w-72 hidden lg:block bg-[#1e2128]
      `}>
        <ChatSidebar />
      </div>
    </div>
  );
}

export default MainLayout;