"use client";

import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactImage from "./components/ContactImage";
import ContactDetail from "./components/ContactDetail";

/**
 * Skeleton loader for the contact form.
 * A simple animated grey rectangle placeholder that mimics the form's size.
 */
function ContactFormSkeleton() {
  return (
    <div className="w-full h-[400px] bg-gray-200  rounded-xl animate-pulse mb-6" />
  );
}

/**
 * ContactPage
 * Page layout for the Contact section of the site.
 * Includes:
 * - Static contact image (left or right depending on viewport size)
 * - Contact form (with loading skeleton)
 * - Contact details (address, phone, email)
 * 
 * Behavior:
 * - Displays skeleton while simulating form loading delay (1500ms).
 * - Switches to the real form after the delay.
 */
export default function ContactPage() {
  // Tracks whether the contact form is in loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay for the contact form (1.5 seconds)
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className="min-h-screen bg-white  py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          
          {/* === Contact Image Section === 
              - Displays the static image/illustration for the contact page.
              - On desktop, it is sticky and positioned alongside the form.
          */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 lg:sticky lg:top-0 self-start">
            <ContactImage />
          </div>

          {/* === Contact Form + Details Section === */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            {/* Show skeleton loader while 'loading' is true */}
            {loading ? <ContactFormSkeleton /> : <ContactForm />}
            
            {/* Always show contact details below the form (or skeleton) */}
            <ContactDetail />
          </div>

        </div>
      </div>
    </div>
  );
}
