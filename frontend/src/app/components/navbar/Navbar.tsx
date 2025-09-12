"use client";
import { useState } from "react";
import NavbarLogo from "./NavbarLogo";
import NavbarMenu from "./NavbarMenu";
import NavbarLogin from "./NavbarLogin";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-white text-sm shadow-sm">
      <div
        className="container mx-auto flex items-center justify-between px-4 py-2 md:px-14"
        dir="rtl"
      >
        {/* Mobile hamburger */}
        <div className="block md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-600"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Logo + menu */}
        <div className="flex items-center md:gap-4 flex-1 md:flex-none justify-center md:justify-start">
          <div className="md:mr-4">
            <NavbarLogo />
          </div>
          <div className="hidden md:block">
            <NavbarMenu />
          </div>
        </div>

        {/* Login */}
        <div className="hidden lg:flex">
          <NavbarLogin shrink={false} />
        </div>
        <div className="block lg:hidden">
          <NavbarLogin shrink={true} />
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4" dir="rtl">
          <NavbarMenu />
        </div>
      )}
    </div>
  );
}
