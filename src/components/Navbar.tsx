import React from 'react';
import { User } from 'firebase/auth';
import { Category } from '../types';
import { motion } from 'motion/react';
import { Gamepad2, Film, Tv, LayoutGrid, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Link, useLocation } from 'react-router-dom';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavbarProps {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

export function Navbar({ user, onLogin, onLogout }: NavbarProps) {
  const location = useLocation();
  
  const navItems = [
    { id: 'all', label: 'Wszystko', icon: LayoutGrid, path: '/' },
    { id: 'games', label: 'Gry', icon: Gamepad2, path: '/category/games' },
    { id: 'movies', label: 'Filmy', icon: Film, path: '/category/movies' },
    { id: 'series', label: 'Seriale', icon: Tv, path: '/category/series' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link 
            to="/"
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
              <span className="font-bold text-xl">C</span>
            </div>
            <span className="font-bold text-xl tracking-tighter hidden sm:block">CINEGAME</span>
          </Link>

          <div className="hidden md:flex items-center gap-1 bg-zinc-900/50 p-1 rounded-full border border-zinc-800">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                  isActive(item.path)
                    ? "bg-zinc-800 text-emerald-400 shadow-lg" 
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-xs font-medium text-zinc-200">{user.displayName}</span>
                  <button 
                    onClick={onLogout}
                    className="text-[10px] text-zinc-500 hover:text-red-400 transition-colors uppercase tracking-widest font-bold"
                  >
                    Wyloguj
                  </button>
                </div>
                <img 
                  src={user.photoURL || ''} 
                  alt={user.displayName || ''} 
                  className="w-10 h-10 rounded-full border-2 border-zinc-800"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="flex items-center gap-2 bg-zinc-100 text-zinc-900 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-white transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Zaloguj
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
