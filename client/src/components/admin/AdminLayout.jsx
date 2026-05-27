import React from 'react'
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';

  // Admin Layout
// =========================
const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Admin Pages */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout


