import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaYoutube, FaTelegramPlane, FaLinkedin } from "react-icons/fa";

/** Social media link definitions with Persian labels and brand colors */
const socialLinks = [
  {
    name: "لینکدین",
    href: "https://www.linkedin.com/in/mraliarabshahi",
    icon: <FaLinkedin className="text-[#0A66C2] text-2xl sm:text-[26px]" />,
  },
  {
    name: "یوتیوب",
    href: "https://youtube.com/HobocAcademy",
    icon: <FaYoutube className="text-[#FF0000] text-2xl sm:text-[26px]" />,
  },
  {
    name: "اینستاگرام",
    href: "https://instagram.co/hoboc_ir",
    icon: <FaInstagram className="text-[#E4405F] text-2xl sm:text-[26px]" />,
  },
  {
    name: "تلگرام",
    href: "https://t.me/hoboc_ir",
    icon: <FaTelegramPlane className="text-[#0088cc] text-2xl sm:text-[26px]" />,
  },
];

/** Footer's social media section with logo and Persian heading */
export default function FooterSocial() {
  return (
    <nav className="flex flex-col items-center space-y-2">
      {/* Logo */}
      <div className="pb-1">
        <Link href="/" aria-label="صفحه اصلی">
          <Image
            src="/images/logo-icon.png"
            alt="لوگو"
            width={80}
            height={80}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 transition-all duration-200"
            priority
          />
        </Link>
      </div>

      {/* Social title */}
      <h6 className="footer-title text-base sm:text-lg font-bold">
        شبکه‌های اجتماعی
      </h6>

      {/* Icon links */}
      <div className="flex flex-row justify-center gap-x-4 sm:gap-x-6">
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
