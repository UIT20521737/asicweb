// src/components/Logo.js
import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    // Toàn bộ logo là một liên kết trỏ về trang chủ "/"
    <Link href="/" className="flex items-center space-x-3">
      {/* Sử dụng component Image của Next.js để tối ưu hóa logo.
        - src="/logo.png": Trỏ đến file logo.png trong thư mục /public.
        - width & height: Là kích thước thật của ảnh, bắt buộc phải có.
      */}
      <Image
        src="/images/logo.png"
        alt="ASICLab Logo"
        width={50}
        height={50}
      />
      
      {/* Phần chữ bên cạnh logo */}
      <span className="text-xl font-bold text-foreground text-primary">
        ASICLab
      </span>
    </Link>
  );
}