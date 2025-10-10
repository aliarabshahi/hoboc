"use client";
import { useState } from "react";
import { ResumeSubmissionRequest } from "@/app/types/formsType";
import { postApiDataWithFile } from "@/app/services/receive_data/apiClientPostDataWithFile";
import {
  FaUser, FaEnvelope, FaPhone, FaLinkedin, FaGithub,
  FaFilePdf, FaFileUpload, FaFileAlt, FaCheckCircle, FaTimesCircle
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function JoinUsForm() {
  const [resume, setResume] = useState<Omit<ResumeSubmissionRequest, "resume_file">>({
    full_name: "", email: "", phone_number: "",
    linkedin_profile: "", github_profile: "", cover_letter: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const MAX_SIZE_MB = 5;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf")
      return setMessage("فقط فایل PDF قابل قبول است");
    if (file.size > MAX_SIZE_MB * 1024 * 1024)
      return setMessage(`حجم فایل نباید بیشتر از ${MAX_SIZE_MB} مگابایت باشد`);
    setResumeFile(file);
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.entries(resume).forEach(([k, v]) => v && formData.append(k, v));
    if (resumeFile) formData.append("resume_file", resumeFile);

    try {
      const { error } = await postApiDataWithFile("/resume-submissions/", formData);
      if (error) throw new Error(error);
      setMessage("رزومه با موفقیت ارسال شد");
      setResume({ full_name: "", email: "", phone_number: "", linkedin_profile: "", github_profile: "", cover_letter: "" });
      setResumeFile(null);
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/70 backdrop-blur-md 
                 p-5 sm:p-7 md:p-8 rounded-xl 
                 shadow-[0_2px_10px_rgba(31,158,206,0.07)] 
                 border border-[#1F9ECE]/15 max-w-2xl mx-auto"
    >
      {/* تیتر و توضیح */}
      <div className="mb-6 sm:mb-8 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1F9ECE] mb-2">
          ارسال رزومه
        </h2>
        <p className="text-[#393939]/80 text-sm sm:text-base leading-relaxed">
          فرم زیر را برای همکاری با تیم هوبوک تکمیل کنید
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField label="نام کامل" icon={<FaUser className="text-[#1F9ECE]" />} value={resume.full_name}
          onChange={(v) => setResume({ ...resume, full_name: v })} placeholder="نام و نام خانوادگی" type="text" />

        <FormField label="ایمیل" icon={<FaEnvelope className="text-[#1F9ECE]" />} value={resume.email}
          onChange={(v) => setResume({ ...resume, email: v })} placeholder="ایمیل شما" type="email" />

        <FormField label="شماره تماس" icon={<FaPhone className="text-[#1F9ECE]" />} value={resume.phone_number}
          onChange={(v) => setResume({ ...resume, phone_number: v })} placeholder="مثلاً ۰۹۱۲۳۴۵۶۷۸۹" type="tel"
          pattern="^0.*$" customInvalidMessage="The Phone Number must start with 0 And in English Please" />

        <FormField label="لینکدین (اختیاری)" icon={<FaLinkedin className="text-[#1F9ECE]" />} value={resume.linkedin_profile ?? ""}
          onChange={(v) => setResume({ ...resume, linkedin_profile: v })} placeholder="https://linkedin.com/in/your-profile" type="url" />

        <FormField label="گیت‌هاب (اختیاری)" icon={<FaGithub className="text-[#1F9ECE]" />} value={resume.github_profile ?? ""}
          onChange={(v) => setResume({ ...resume, github_profile: v })} placeholder="https://github.com/your-username" type="url" />

        {/* انگیزه نامه */}
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-2 text-[#393939]/90">
            انگیزه‌نامه (اختیاری)
          </label>
          <div className="relative">
            <div className="absolute top-3 right-3 text-[#1F9ECE]">
              <FaFileAlt />
            </div>
            <textarea
              placeholder="دلایل خود برای همکاری با ما را بیان کنید"
              className="w-full bg-white/60 border border-[#1F9ECE]/20 text-[#393939]
                         text-sm sm:text-base rounded-lg focus:ring-2 focus:ring-[#1F9ECE]
                         focus:border-[#1F9ECE] p-3 pr-10 h-32 placeholder-gray-400 transition"
              value={resume.cover_letter}
              onChange={(e) => setResume({ ...resume, cover_letter: e.target.value })}
            />
          </div>
        </div>

        {/* فایل رزومه */}
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-2 text-[#393939]/90">
            فایل رزومه (PDF - اختیاری)
          </label>
          <label
            className="flex flex-col items-center justify-center w-full h-32 
                       border-2 border-dashed border-[#1F9ECE]/25 rounded-lg cursor-pointer 
                       bg-white/60 hover:bg-[#E9D7EB]/30 transition"
          >
            <div className="flex flex-col items-center pt-5 pb-6 text-center">
              <FaFileUpload className="w-8 h-8 mb-3 text-[#1F9ECE]" />
              <p className="mb-2 text-xs sm:text-sm text-[#393939]/80">
                <span className="font-semibold">برای آپلود کلیک کنید</span> یا فایل را بکشید
              </p>
              <p className="text-xs text-gray-500">
                فقط PDF (حداکثر {MAX_SIZE_MB}MB)
              </p>
            </div>
            <input type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
          </label>

          {resumeFile && (
            <div className="mt-2 flex items-center text-sm text-[#1F9ECE]">
              <FaFilePdf className="ml-1" /> {resumeFile.name}
            </div>
          )}
        </div>

        {/* دکمه ارسال */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#1F9ECE] to-[#F477B8] 
                     hover:from-[#198cb0] hover:to-[#e267a5] 
                     text-white font-medium text-sm sm:text-base py-2.5 sm:py-3
                     rounded-lg transition-all duration-300 shadow-md hover:shadow-lg 
                     disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              در حال ارسال...
            </>
          ) : <>ارسال رزومه</>}
        </button>

        {/* پیام وضعیت */}
        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-3 rounded-lg text-xs sm:text-sm flex items-center gap-2 ${
              message.includes("موفق") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {message.includes("موفق") ? <FaCheckCircle /> : <FaTimesCircle />}
            {message}
          </motion.div>
        )}
      </form>
    </motion.section>
  );
}

/*------------------- Field Component -------------------*/
function FormField({
  label, icon, value, onChange, placeholder, type, pattern, customInvalidMessage
}: {
  label: string; icon: React.ReactNode; value: string; onChange: (v: string) => void;
  placeholder: string; type: string; pattern?: string; customInvalidMessage?: string;
}) {
  return (
    <div>
      <label className="block text-xs sm:text-sm font-medium mb-2 text-[#393939]/90">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#1F9ECE] pointer-events-none">
          {icon}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={!label.includes("اختیاری")}
          pattern={pattern}
          onInvalid={(e) => customInvalidMessage && (e.target as HTMLInputElement).setCustomValidity(customInvalidMessage!)}
          onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
          className="w-full bg-white/60 border border-[#1F9ECE]/20 text-[#393939]
                     text-sm sm:text-base rounded-lg focus:ring-2 focus:ring-[#1F9ECE]
                     focus:border-[#1F9ECE] p-3 pr-10 placeholder-gray-400 transition"
        />
      </div>
    </div>
  );
}
