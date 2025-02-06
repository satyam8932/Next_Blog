'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FileText,
    FolderOpen,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronRight
} from 'lucide-react';
import LogoutButton from './LogoutButton';

const menuItems = [
    {
        path: '/admin',
        name: 'Dashboard',
        icon: LayoutDashboard
    },
    {
        path: '/admin/blogs',
        name: 'Blogs',
        icon: FileText
    },
    {
        path: '/admin/categories',
        name: 'Categories',
        icon: FolderOpen
    },
    // {
    //     path: '/admin/settings',
    //     name: 'Settings',
    //     icon: Settings
    // }
];

export default function AdminSidebar({ isSidebarOpen, setIsSidebarOpen } : any) {
    const [isMobile, setIsMobile] = useState(false);
    const pathname = usePathname();

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (!mobile) {
                setIsSidebarOpen(true);
            }
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close sidebar on mobile when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const sidebar = document.getElementById('sidebar');
            const menuButton = document.getElementById('menu-button');

            if (isMobile && isSidebarOpen && sidebar && !sidebar.contains(event.target as Node) && !menuButton?.contains(event.target as Node)) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobile, isSidebarOpen]);

    const isActive = (path: string) => {
        if (path === '/admin') {
            return pathname === path;
        }
        return pathname.startsWith(path);
    };

    return (
        <>
            {/* Overlay */}
            {isMobile && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                id="sidebar"
                className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 lg:static lg:block flex-shrink-0`}
            >
                <div className="h-full px-4 py-6 bg-[#0A0B14] w-72 shadow-xl flex flex-col">
                    <div className="flex justify-between items-center mb-8 px-2">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-white">MetaExpat Admin</span>
                        </Link>
                        {isMobile && (
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>

                    <nav className="flex-1 space-y-1 overflow-y-auto">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center justify-between px-3 py-3 rounded-lg transition-all duration-200 ${isActive(item.path)
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                <div className="flex items-center">
                                    <item.icon className="w-5 h-5 mr-3" />
                                    <span>{item.name}</span>
                                </div>
                                {isActive(item.path) && (
                                    <ChevronRight className="w-5 h-5" />
                                )}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-auto pt-4">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                            <LogoutButton />
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}