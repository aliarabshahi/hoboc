import { MapPinCheck } from "lucide-react";
import Link from "next/link";

interface Props {
  shrink: boolean;
}

export default function NavbarLogin({ shrink }: Props) {
  if (shrink) {
    return (
      <div className="flex items-center gap-2">
        {/* خط جداکننده فقط روی سایز md+ */}
        <div className="hidden md:block h-4 w-px bg-gray-400"></div>
        <Link href="/roadmap" passHref>
          <button className="text-hoboc-dark text-sm flex items-center gap-1">
            <MapPinCheck size={18} />
            {/* متن "نقشه راه" فقط از md+ نمایش داده می‌شود */}
            <span className="hidden md:inline">نقشه راه</span>
          </button>
        </Link>
      </div>
    );
  }

  // Desktop version (lg screens and up)
  return (
    <div className="flex items-center gap-4 text-md">
      {/* Company login - hidden on small/mid */}
      {/*
      <a href="#" className="text-gray-500 hidden lg:block">
        ورود به بخش شرکت‌ها
      </a>
      <div className="hidden lg:block w-px h-4 bg-gray-400"></div>
      */}

      {/* Full buttons - only shown on lg+ */}
      <div className="hidden lg:flex items-center gap-2">
        <Link href="/roadmap" passHref>
          <button className="btn btn-outline btn-sm text-hoboc-dark border-hoboc-dark hover:bg-[#e6f3f8] hover:text-hoboc-dark h-8">
            نقشه راه
          </button>
        </Link>

        <Link href="/notifications" passHref>
          <button className="btn btn-sm bg-hoboc-dark text-white hover:bg-[#00587A]">
            نوتی جات!
          </button>
        </Link>
      </div>
    </div>
  );
}
