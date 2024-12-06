import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { usePermissions } from '../../hooks/usePermissions';

function AdminLayout() {
  const location = useLocation();
  const { hasPermission } = usePermissions();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    {
      name: 'Sermons',
      path: '/admin/sermons',
      permission: { action: 'create', resource: 'sermons' },
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      name: 'Users',
      path: '/admin/users',
      permission: { action: 'read', resource: 'users' },
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 bg-[#1e2128] border-r border-[#2a2f38] p-4">
        <div className="space-y-1">
          {menuItems.map(item => (
            (!item.permission || hasPermission(item.permission)) && (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  isActive(item.path)
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-400 hover:bg-[#2a2f38] hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            )
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;