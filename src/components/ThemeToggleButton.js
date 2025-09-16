'use client'
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button 
      onClick={toggleTheme} 
      className="p-2 rounded-full hover:bg-border transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Moon size={24} className="text-primary" />
      ) : (
        <Sun size={24} className="text-primary" />
      )}
    </button>
  );
}