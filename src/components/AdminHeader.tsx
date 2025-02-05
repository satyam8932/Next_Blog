'use client';
import React, { useState } from 'react';
import { Menu } from 'lucide-react';

export default function AdminHeader() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between px-4 py-3">
                <button
                    id="menu-button"
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
                >
                    <Menu size={24} />
                </button>
                <div className="lg:hidden" />
                {/* Optional: Add header content here */}
            </div>
        </header>
    );
}