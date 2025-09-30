"use client";

import { FaPhone, FaEnvelope, FaLinkedin, FaGithub, FaYoutube, FaTelegram } from "react-icons/fa";

/** Contact info card with phone, email, and social links (Persian labels kept) */
export default function ContactDetail() {
  return (
    <div className="w-full bg-gradient-to-r from-[#1F9ECE] to-[#F477B8] rounded-lg shadow-lg p-6 mt-8">
      <h3 className="text-xl font-bold text-white mb-8 text-center">اطلاعات تماس</h3>
      
      <div className="flex flex-row-reverse justify-between items-center gap-8">
        {/* Phone & Email - right side */}
        <div className="space-y-4 text-white" dir="rtl">
          <div className="flex items-center justify-end">
            <span className="ml-2 tracking-widest">۰۹۱۹۰۰۸۸۱۹۰</span>
            <FaPhone className="text-lg mr-1" />
          </div>
          
          <div className="flex items-center justify-end">
            <span className="ml-2 tracking-wider">s4aa4m@gmail.com</span>
            <FaEnvelope className="text-lg mr-1" />
          </div>
        </div>
        
        {/* Social media - left side */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-6 justify-start">
            <a href="https://www.linkedin.com/in/mraliarabshahi" className="text-white hover:text-gray-200 transition-colors">
              <FaLinkedin className="text-2xl" />
            </a>
            <a href="https://github.com/aliarabshahi/" className="text-white hover:text-gray-200 transition-colors">
              <FaGithub className="text-2xl" />
            </a>
          </div>
          <div className="flex gap-6 justify-start">
            <a href="https://youtube.com/HobocAcademy" className="text-white hover:text-gray-200 transition-colors">
              <FaYoutube className="text-2xl" />
            </a>
            <a href="https://t.me/hoboc_ir" className="text-white hover:text-gray-200 transition-colors">
              <FaTelegram className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
