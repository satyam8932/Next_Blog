'use client';
import { useState } from 'react'
import Link from 'next/link'
import {
    LayoutDashboard,
    FileText,
    FolderOpen,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-react'

export default function AdminLayout({ children }: any) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0`}
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-blue-600 w-64">
                    <div className="flex justify-between items-center text-center mb-6 px-2">
                        <Link href={"/"}>
                            <span className="text-xl font-semibold text-white">Admin Panel</span>
                        </Link>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden text-gray-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="space-y-2">
                        <Link
                            href="/admin"
                            className="flex items-center px-2 py-3 text-gray-300 hover:bg-blue-700 rounded-lg"
                        >
                            <LayoutDashboard className="w-5 h-5 mr-3" />
                            Dashboard
                        </Link>
                        <Link
                            href="/admin/blogs"
                            className="flex items-center px-2 py-3 text-gray-300 hover:bg-blue-700 rounded-lg"
                        >
                            <FileText className="w-5 h-5 mr-3" />
                            Blogs
                        </Link>
                        <Link
                            href="/admin/categories"
                            className="flex items-center px-2 py-3 text-gray-300 hover:bg-blue-700 rounded-lg"
                        >
                            <FolderOpen className="w-5 h-5 mr-3" />
                            Categories
                        </Link>
                        <Link
                            href="/admin/settings"
                            className="flex items-center px-2 py-3 text-gray-300 hover:bg-blue-700 rounded-lg"
                        >
                            <Settings className="w-5 h-5 mr-3" />
                            Settings
                        </Link>
                    </nav>

                    <div className="absolute bottom-0 left-0 right-0 p-4">
                        <button className="flex items-center w-full px-2 py-3 text-gray-300 hover:bg-blue-700 rounded-lg">
                            <LogOut className="w-5 h-5 mr-3" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className={`p-4 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
                <div className="lg:hidden mb-4">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-gray-600 hover:text-gray-900"
                    >
                        <Menu size={24} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}



