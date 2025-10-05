"use client";

import { useState } from "react";
import { ResumeSubmissionRequest } from "@/app/types/formsType";
import { postApiDataWithFile } from "@/app/services/receive_data/apiClientPostDataWithFile";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaFilePdf,
  FaFileUpload,
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

/** Join Us form — collects applicant info, validates PDF upload, and posts data to /resume-submissions/ */
export default function JoinUsForm() {
  const [resume, setResume] = useState<
    Omit<ResumeSubmissionRequest, "resume_file">
  >({
    full_name: "",
    email: "",
    phone_number: "",
    linkedin_profile: "",
    github_profile: "",
    cover_letter: "",
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const MAX_SIZE_MB = 5;

  /** Validates selected file (must be PDF under size limit) */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setMessage("فقط فایل PDF قابل قبول است");
        setResumeFile(null);
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setMessage(`حجم فایل نباید بیشتر از ${MAX_SIZE_MB} مگابایت باشد`);
        setResumeFile(null);
        return;
      }
      setResumeFile(file);
      setMessage("");
    }
  };

  /** Submits form data + file (if present) to API */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(resume).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    if (resumeFile) {
      formData.append("resume_file", resumeFile);
    }

    try {
      const { error } = await postApiDataWithFile(
        "/resume-submissions/",
        formData
      );

      if (error) {
        throw new Error(error);
      }

      setMessage("رزومه با موفقیت ارسال شد");
      setResume({
        full_name: "",
        email: "",
        phone_number: "",
        linkedin_profile: "",
        github_profile: "",
        cover_letter: "",
      });
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
      className="bg-white  p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100  max-w-2xl mx-auto"
    >
      {/* Heading */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-hoboc mb-2">
          ارسال رزومه
        </h2>
        <p className="text-gray-600 ">
          فرم زیر را برای همکاری با ما تکمیل کنید
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="نام کامل"
          icon={<FaUser className="text-hoboc" />}
          value={resume.full_name}
          onChange={(v) => setResume({ ...resume, full_name: v })}
          placeholder="نام و نام خانوادگی"
          type="text"
        />

        <FormField
          label="ایمیل"
          icon={<FaEnvelope className="text-hoboc" />}
          value={resume.email}
          onChange={(v) => setResume({ ...resume, email: v })}
          placeholder="ایمیل شما"
          type="email"
        />

        <FormField
          label="شماره تماس"
          icon={<FaPhone className="text-hoboc" />}
          value={resume.phone_number}
          onChange={(v) => setResume({ ...resume, phone_number: v })}
          placeholder="مثلاً 09123456789"
          type="tel"
          pattern="^0.*$"
          customInvalidMessage="The Phone Number must start with 0 And in English Please"
        />

        <FormField
          label="لینکدین (اختیاری)"
          icon={<FaLinkedin className="text-hoboc" />}
          value={resume.linkedin_profile ?? ""}
          onChange={(v) => setResume({ ...resume, linkedin_profile: v })}
          placeholder="https://linkedin.com/in/your-profile"
          type="url"
        />

        <FormField
          label="گیت‌هاب (اختیاری)"
          icon={<FaGithub className="text-hoboc" />}
          value={resume.github_profile ?? ""}
          onChange={(v) => setResume({ ...resume, github_profile: v })}
          placeholder="https://github.com/your-username"
          type="url"
        />

        {/* Cover letter */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 ">
            انگیزه‌نامه (اختیاری)
          </label>
          <div className="relative">
            <div className="absolute top-3 right-3 text-gray-400">
              <FaFileAlt className="text-hoboc" />
            </div>
            <textarea
              placeholder="دلایل خود برای همکاری با ما را بیان کنید"
              className="w-full bg-gray-50  border border-gray-300  text-gray-900  text-sm rounded-lg focus:ring-2 focus:ring-hoboc focus:border-hoboc block p-3 pr-10 h-32 transition"
              value={resume.cover_letter}
              onChange={(e) =>
                setResume({ ...resume, cover_letter: e.target.value })
              }
            />
          </div>
        </div>

        {/* File upload */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 ">
            فایل رزومه (PDF - اختیاری)
          </label>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300  rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100  transition">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <FaFileUpload className="w-8 h-8 mb-3 text-hoboc" />
              <p className="mb-2 text-sm text-gray-500 ">
                <span className="font-semibold">برای آپلود کلیک کنید</span> یا
                فایل را بکشید
              </p>
              <p className="text-xs text-gray-500 ">
                فقط فایل‌های PDF (حداکثر {MAX_SIZE_MB}MB)
              </p>
            </div>
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {resumeFile && (
            <div className="mt-2 flex items-center text-sm text-hoboc">
              <FaFilePdf className="ml-1" />
              {resumeFile.name}
            </div>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#1F9ECE] to-[#F477B8] 
             hover:from-[#1a8abc] hover:to-[#e066a6] 
             text-white font-medium py-3 px-6 rounded-lg 
             transition-colors duration-300 
             shadow-md hover:shadow-lg 
             disabled:opacity-70 disabled:cursor-not-allowed 
             flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 border-2 border-white rounded-full animate-spin"></span>
              در حال ارسال...
            </>
          ) : (
            <>ارسال رزومه</>
          )}
        </button>

        {/* Feedback messages */}
        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
              message === "رزومه با موفقیت ارسال شد"
                ? "bg-green-100  text-green-800 "
                : "bg-red-100  text-red-800 "
            }`}
          >
            {message === "رزومه با موفقیت ارسال شد" ? (
              <FaCheckCircle className="flex-shrink-0" />
            ) : (
              <FaTimesCircle className="flex-shrink-0" />
            )}
            {message}
          </motion.div>
        )}
      </form>
    </motion.section>
  );
}

/** Single labeled input field with icon, supports validation & custom error message */
function FormField({
  label,
  icon,
  value,
  onChange,
  placeholder,
  type,
  pattern,
  customInvalidMessage,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type: string;
  pattern?: string;
  customInvalidMessage?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-gray-700 ">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
          {icon}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-gray-50  border border-gray-300  text-gray-900  text-sm rounded-lg focus:ring-2 focus:ring-hoboc focus:border-hoboc block p-3 pr-10 transition"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={!label.includes("اختیاری")}
          pattern={pattern}
          onInvalid={(e) => {
            if (customInvalidMessage) {
              (e.target as HTMLInputElement).setCustomValidity(
                customInvalidMessage
              );
            }
          }}
          onInput={(e) => {
            (e.target as HTMLInputElement).setCustomValidity("");
          }}
        />
      </div>
    </div>
  );
}
