'use client';
import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <AdminSidebar />
            
            <div className="flex-1 flex flex-col">
                <AdminHeader />
                
                <main className="p-4 md:p-6 flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}