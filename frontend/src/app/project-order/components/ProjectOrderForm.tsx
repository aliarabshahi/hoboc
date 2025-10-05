"use client";

import { useState } from "react";
import { ProjectOrderRequest } from "@/app/types/formsType";
import { postApiDataWithFile } from "@/app/services/receive_data/apiClientPostDataWithFile";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaFileAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaFileUpload,
  FaFilePdf,
  FaFileWord,
  FaFileImage,
  FaFileArchive,
  FaFileCode,
  FaFile,
  FaTrash,
} from "react-icons/fa";
import { motion } from "framer-motion";

/** Max upload size in MB */
const MAX_SIZE_MB = 20;

/** Allowed file MIME types */
const ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "text/csv",
  "application/json",
  "application/zip",
  "image/jpeg",
  "image/png",
];

/** Project order form — collects project details and file uploads for submission */
export default function ProjectOrderForm() {
  const [projectOrder, setProjectOrder] = useState<
    Omit<ProjectOrderRequest, "files">
  >({
    full_name: "",
    email: "",
    phone_number: "",
    project_description: "",
    budget: "",
    deadline: "",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /** Validate added files, update state if allowed */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);

    // Type & size validation
    for (const file of newFiles) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setMessage(
          `فرمت ${file.name} مجاز نیست (فرمت‌های مجاز: PDF, DOCX, TXT, CSV, JSON, ZIP, JPG, PNG)`
        );
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setMessage(
          `حجم فایل ${file.name} نباید بیشتر از ${MAX_SIZE_MB} مگابایت باشد`
        );
        return;
      }
    }

    // Check total size across all files
    const totalSize = [...files, ...newFiles].reduce(
      (acc, file) => acc + file.size,
      0
    );
    if (totalSize > MAX_SIZE_MB * 1024 * 1024) {
      setMessage(
        `مجموع حجم فایل‌ها نباید بیشتر از ${MAX_SIZE_MB} مگابایت باشد`
      );
      return;
    }

    setFiles((prev) => [...prev, ...newFiles]);
    setMessage("");
  };

  /** Remove a file by index */
  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  /** Return matching file type icon */
  const getFileIcon = (type: string) => {
    if (type === "application/pdf")
      return <FaFilePdf className="text-red-500" />;
    if (
      type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
      return <FaFileWord className="text-blue-500" />;
    if (type === "text/plain") return <FaFileAlt className="text-gray-500" />;
    if (type === "text/csv" || type === "application/json")
      return <FaFileCode className="text-yellow-500" />;
    if (type === "application/zip")
      return <FaFileArchive className="text-purple-500" />;
    if (type.includes("image/"))
      return <FaFileImage className="text-green-500" />;
    return <FaFile className="text-gray-400" />;
  };

  /** Submit form with project data and attached files */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(projectOrder).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    files.forEach((file) => formData.append("files", file));

    try {
      const { error } = await postApiDataWithFile("/project-orders/", formData);
      if (error) throw new Error(error);

      setMessage("سفارش شما با موفقیت ثبت شد");
      setProjectOrder({
        full_name: "",
        email: "",
        phone_number: "",
        project_description: "",
        budget: "",
        deadline: "",
      });
      setFiles([]);
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
          سفارش پروژه
        </h2>
        <p className="text-gray-600 ">
          فرم زیر را پر کنید تا با شما تماس بگیریم
        </p>
      </div>

      {/* Main form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <FormField
          label="نام کامل"
          icon={<FaUser className="text-hoboc" />}
          placeholder="نام و نام خانوادگی"
          value={projectOrder.full_name}
          onChange={(v) => setProjectOrder({ ...projectOrder, full_name: v })}
          required
        />

        {/* Email */}
        <FormField
          label="ایمیل"
          icon={<FaEnvelope className="text-hoboc" />}
          placeholder="ایمیل شما"
          type="email"
          value={projectOrder.email}
          onChange={(v) => setProjectOrder({ ...projectOrder, email: v })}
          required
        />

        {/* Phone */}
        <FormField
          label="شماره تماس"
          icon={<FaPhone className="text-hoboc" />}
          placeholder="مثلاً 09123456789"
          type="tel"
          value={projectOrder.phone_number}
          onChange={(v) =>
            setProjectOrder({ ...projectOrder, phone_number: v })
          }
          required
          pattern="^0.*$"
          customInvalidMessage="The Phone Number must start with 0 And in English Please"
        />

        {/* Project Description */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 ">
            توضیحات پروژه
          </label>
          <div className="relative">
            <div className="absolute top-3 right-3 text-gray-400">
              <FaFileAlt className="text-hoboc" />
            </div>
            <textarea
              placeholder="جزئیات پروژه مورد نظر خود را شرح دهید"
              className="w-full bg-gray-50  border border-gray-300  text-gray-900  text-sm rounded-lg focus:ring-2 focus:ring-hoboc focus:border-hoboc block p-3 pr-10 h-32 transition"
              value={projectOrder.project_description}
              onChange={(e) =>
                setProjectOrder({
                  ...projectOrder,
                  project_description: e.target.value,
                })
              }
              required
            />
          </div>
        </div>

        {/* Budget */}
        <FormField
          label="بودجه پیشنهادی (اختیاری)"
          icon={<FaMoneyBillWave className="text-hoboc" />}
          placeholder="مثلاً ۵,۰۰۰,۰۰۰ تومان"
          value={projectOrder.budget || ""}
          onChange={(v) => setProjectOrder({ ...projectOrder, budget: v })}
        />

        {/* Deadline */}
        <FormField
          label="مهلت انجام (اختیاری)"
          icon={<FaCalendarAlt className="text-hoboc" />}
          placeholder="مثلاً ۲ هفته"
          value={projectOrder.deadline || ""}
          onChange={(v) => setProjectOrder({ ...projectOrder, deadline: v })}
        />

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 ">
            فایل‌های پروژه (اختیاری)
          </label>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300  rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100  transition">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <FaFileUpload className="w-8 h-8 mb-3 text-hoboc" />
              <p className="mb-2 text-sm text-gray-500 ">
                <span className="font-semibold">برای آپلود کلیک کنید</span> یا
                فایل‌ها را بکشید
              </p>
              <p className="text-xs text-gray-500  text-center">
                فرمت‌های مجاز: PDF, DOCX, TXT, CSV, JSON, ZIP, JPG, PNG (حداکثر{" "}
                {MAX_SIZE_MB}MB )
              </p>
            </div>
            <input
              type="file"
              multiple
              accept=".pdf,.docx,.txt,.csv,.json,.zip,.jpg,.png"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {/* Uploaded file list */}
          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-100  rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    {getFileIcon(file.type)}
                    <span className="text-sm truncate max-w-xs">
                      {file.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)}MB
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#1F9ECE] to-[#F477B8] hover:from-[#1a8abc] hover:to-[#e066a6] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              در حال ارسال...
            </>
          ) : (
            "ارسال سفارش"
          )}
        </button>

        {/* Feedback */}
        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
              message === "سفارش شما با موفقیت ثبت شد"
                ? "bg-green-100  text-green-800 "
                : "bg-red-100  text-red-800 "
            }`}
          >
            {message === "سفارش شما با موفقیت ثبت شد" ? (
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

/** Labeled text input with icon and optional validation */
function FormField({
  label,
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
  pattern,
  customInvalidMessage,
}: {
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
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
          required={required}
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
