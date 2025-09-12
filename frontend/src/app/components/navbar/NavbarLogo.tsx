import Image from "next/image";
import Link from "next/link";

export default function NavbarLogo() {
  return (
    <Link href="/">
      {/* 
      <div>
        <Image
          src="/images/logo.png"
          alt="Hoboc Logo"
          width={32}  // عرض مورد نظر
          height={32} // ارتفاع مورد نظر
          className="h-8 w-auto"
          priority // برای تصاویر مهم در بالای صفحه
        />
      </div> 
      */}
      <div className="text-lg md:text-2xl font-bold text-hoboc cursor-pointer">HOBOC</div>
    </Link>
  );
}
