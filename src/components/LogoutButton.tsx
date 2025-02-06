'use client';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { useState } from 'react';

// You can create a separate LogoutButton component
const LogoutButton = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSignOut = async () => {
        try {
            setIsLoading(true);
            await signOut({
                redirect: true,
                callbackUrl: '/login'
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleSignOut}
            disabled={isLoading}
            className="flex items-center w-full px-3 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all duration-200 disabled:opacity-50"
        >
            {isLoading ? (
                <>
                    <div className="w-5 h-5 mr-3 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                    <span>Signing out...</span>
                </>
            ) : (
                <>
                    <LogOut className="w-5 h-5 mr-3" />
                    <span>Logout</span>
                </>
            )}
        </button>
    );
};

export default LogoutButton;