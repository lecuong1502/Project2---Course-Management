import React from "react";
import { GraduationCap, User, BookOpen, MessageSquare, LayoutDashboard, LogOut } from 'lucide-react';
import { UserRole } from '../type';

interface NavbarProps {
    currentView: string,
    onNavigate: (view: string) => void;
    userRole: UserRole;
    onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, userRole, onLogout }) => {
    const getLinkClass = (viewName: string) => {
        const base = "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer";
        return currentView === viewName
            ? `${base} bg-blue-700 text-white`
            : `${base} text-blue-100 hover:bg-blue-600 hover:text-white`;
    };

    return (
        <nav className="bg-blue-800 sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
                        <GraduationCap className="h-8 w-8 text-white mr-2" />
                        <span className="text-white font-bold text-xl tracking-tight">One Life, One Future EduCenter</span>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <a onClick={() => onNavigate('home')} className={getLinkClass('home')}>
                                Home
                            </a>
                            <a onClick={() => onNavigate('courses')} className={getLinkClass('courses')}>
                                <BookOpen className="w-4 h-4 mr-2" />
                                Courses
                            </a>
                            <a onClick={() => onNavigate('consultation')} className={getLinkClass('consultation')}>
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Consultation
                            </a>

                            {userRole === UserRole.GUEST && (
                                <a onClick={() => onNavigate('register')} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium ml-4 transition-colors cursor-pointer">
                                    Register Now
                                </a>
                            )}

                            {(userRole === UserRole.STAFF || userRole === UserRole.MANAGER) && (
                                <a onClick={() => onNavigate('dashboard')} className={getLinkClass('dashboard')}>
                                    <LayoutDashboard className="w-4 h-4 mr-2" />
                                    Dashboard
                                </a>
                            )}
                        </div>
                    </div>
                
                    <div className="flex items-center">
                        {userRole !== UserRole.GUEST ? (
                            <div className="flex items-center gap-3">
                                <span className="text-blue-200 text-sm hidden sm:inline">Welcome, {userRole}</span>
                                <button onClick={onLogout} className="p-2 rounded-full hover:bg-blue-700 text-blue-100">
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => onNavigate('login')} className="text-blue-100 hover:text-white flex items-center text-sm">
                                <User className="w-4 h-4 mr-1" /> Staff Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;