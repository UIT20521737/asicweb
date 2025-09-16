// src/components/NavLink.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, children }) {
  // Lấy đường dẫn hiện tại, ví dụ: '/', '/news'
  const pathname = usePathname();
  
  // Kiểm tra xem link này có phải là link của trang hiện tại không
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      // Nếu isActive là true, áp dụng class 'text-foreground'.
      // Nếu không, áp dụng class 'text-muted'.
      className={` font-bold transition-colors px-4 py-2 rounded-lg ${
        !isActive ? 'bg-transparent text-primary hover:text-foreground' : 'bg-active text-primary-light'
      }`}
    >
      {children}
    </Link>
  );
}