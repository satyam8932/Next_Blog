'use client';
import React, { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { status } = useSession();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    if (status === 'loading') {
        return <></>;
    }
    if (status === 'authenticated') {

        return (
            <div className="min-h-screen bg-gray-50 flex">
                <AdminSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

                <div className="flex-1 flex flex-col h-screen overflow-hidden">
                    <AdminHeader setIsSidebarOpen={setIsSidebarOpen} />

                    <main className="p-4 md:p-6 flex-1 overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        );
    }
    return null;
}