// src/components/Header.js
'use client'
import Logo from './Logo';
import Image from 'next/image';
import ThemeToggleButton from './ThemeToggleButton'
import NavLink from './NavLink';
import {Menu, X} from 'lucide-react'
import { useState } from 'react';
export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const routers =  [
        {
            href: "/",
            content: "Introduction"
        },
        {
            href: "/news",
            content: "News"
        },
        {
            href: "/publications",
            content: "Publications"
        },
        {
            href: "/calendar",
            content: "Calendar"        
        },
        {
            href: "/services",
            content: "Services"
        },
    ]
    return (
        // Thêm các class để cố định Header
        // h-16 tương đương với 64px, khớp với padding bạn muốn
        <>
            <header 
            className="fixed top-0 left-0 w-full z-50 h-16 shadow-md bg-background border-b border-border"
            >
            <div className="flex h-full items-center justify-between w-full px-8">
                <Logo />
                <nav className="hidden lg:flex items-center space-x-6">
                    {routers.map((item, index) => (<NavLink className="text-primary font-medium  hover:text-foreground transition-colors" key={index} href={item.href}>{item.content}</NavLink>))}
                    <ThemeToggleButton/>
                </nav>
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="p-2 lg:hidden" // Thay md:hidden thành lg:hidden
                    aria-label="Open menu"
                >
                    <Menu size={24} className='text-primary'/>
                </button>
            </div>
            </header>
                {/* --- LỚP PHỦ VÀ MENU MOBILE --- */}
                {/* Lớp phủ sẽ xuất hiện khi isMenuOpen là true */}
                <div 
                    className={`pt-0 fixed inset-0 z-40 bg-black/75  transition-opacity
                            ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => setIsMenuOpen(false)}
                ></div>

                {/* Tấm menu trượt từ bên trái */}
                <div 
                    className={`shadow-lg fixed top-0 left-0 h-full w-4/5 max-w-xs bg-background z-50
                            transform transition-transform duration-300 ease-in-out
                            ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    {/* Header của menu mobile */}
                    <div className="flex items-center justify-between p-4 border-b border-border">
                        {/* <Logo /> */}
                        <div className='flex items-center space-x-3'>
                            <Image
                            src="/images/logo.png"
                            alt="ASICLab Logo"
                            width={50}
                            height={50}
                            />
                            <span className="text-xl font-bold text-foreground text-primary">
                            ASICLab
                            </span>
                            <ThemeToggleButton />
                        </div>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2"
                            aria-label="Close menu"
                        >
                            <X size={24} className='text-primary'/>
                        </button>
                    </div>
                    
                    {/* Các link trong menu mobile */}
                    <nav className="flex flex-col p-4 space-y-2">
                        {routers.map((item, index) => (
                            <NavLink key={index} href={item.href}>{item.content}</NavLink>
                        ))}
                    </nav>
                </div>
        </>
    );
}