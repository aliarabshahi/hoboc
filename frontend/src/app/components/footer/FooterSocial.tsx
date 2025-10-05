// app/components/footer/FooterSocial.tsx
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaYoutube, FaTelegramPlane, FaLinkedin } from "react-icons/fa";

/** Social media link definitions with Persian labels and brand colors */
const socialLinks = [
  {
    name: "لینکدین",
    href: "https://www.linkedin.com/in/mraliarabshahi",
    icon: <FaLinkedin size={24} color="#0A66C2" />, // LinkedIn blue
  },
  {
    name: "یوتیوب",
    href: "https://youtube.com/HobocAcademy",
    icon: <FaYoutube size={24} color="#FF0000" />, // YouTube red
  },
  {
    name: "اینستاگرام",
    href: "https://instagram.co/hoboc_ir",
    icon: <FaInstagram size={24} color="#E4405F" />, // Instagram pink-red
  },
  {
    name: "تلگرام",
    href: "https://t.me/hoboc_ir",
    icon: <FaTelegramPlane size={24} color="#0088cc" />, // Telegram blue
  },
];

/** Footer's social media section with logo and Persian heading */
export default function FooterSocial() {
  return (
    <nav className="flex flex-col items-center space-y-2">
      {/* Logo */}
      <div className="pb-1">
        <Image
          src="/images/logo-icon.png"
          alt="لوگو"
          width={100}
          height={100}
          priority
        />
      </div>

      {/* Social title */}
      <h6 className="footer-title text-lg font-bold">شبکه‌های اجتماعی</h6>

      {/* Icon links */}
      <div className="flex flex-row justify-center gap-x-6">
        {socialLinks.map((social, index) => (
          <Link
            key={index}
            href={social.href}
            aria-label={social.name}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            {social.icon}
          </Link>
        ))}
      </div>
    </nav>
  );
}
