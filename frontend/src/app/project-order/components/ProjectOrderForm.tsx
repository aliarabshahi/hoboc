"use client";
import { useState } from "react";
import { ProjectOrderRequest } from "@/app/types/formsType";
import { postApiDataWithFile } from "@/app/services/receive_data/apiClientPostDataWithFile";
import {
  FaUser, FaEnvelope, FaPhone, FaFileAlt, FaMoneyBillWave,
  FaCalendarAlt, FaFileUpload, FaFilePdf, FaFileWord, FaFileImage,
  FaFileArchive, FaFileCode, FaFile, FaTrash, FaCheckCircle, FaTimesCircle
} from "react-icons/fa";
import { motion } from "framer-motion";

const MAX_SIZE_MB = 20;
const ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain", "text/csv", "application/json", "application/zip",
  "image/jpeg", "image/png",
];

export default function ProjectOrderForm() {
  const [projectOrder, setProjectOrder] = useState<Omit<ProjectOrderRequest, "files">>({
    full_name: "", email: "", phone_number: "",
    project_description: "", budget: "", deadline: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    for (const file of newFiles) {
      if (!ALLOWED_TYPES.includes(file.type))
        return setMessage(`فرمت ${file.name} مجاز نیست`);
      if (file.size > MAX_SIZE_MB * 1024 * 1024)
        return setMessage(`حجم ${file.name} زیاد است`);
    }
    const totalSize =
      [...files, ...newFiles].reduce((acc, f) => acc + f.size, 0);
    if (totalSize > MAX_SIZE_MB * 1024 * 1024)
      return setMessage("مجموع حجم فایل‌ها بیش از حد مجاز است");
    setFiles((p) => [...p, ...newFiles]);
    setMessage("");
  };

  const removeFile = (i: number) => setFiles((p) => p.filter((_, x) => x !== i));

  const getFileIcon = (t: string) => {
    if (t === "application/pdf") return <FaFilePdf className="text-red-500" />;
    if (t.includes("word")) return <FaFileWord className="text-blue-500" />;
    if (t.includes("text")) return <FaFileAlt className="text-gray-500" />;
    if (t.includes("csv") || t.includes("json"))
      return <FaFileCode className="text-yellow-500" />;
    if (t.includes("zip")) return <FaFileArchive className="text-purple-500" />;
    if (t.includes("image")) return <FaFileImage className="text-green-500" />;
    return <FaFile className="text-gray-400" />;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    const fd = new FormData();
    Object.entries(projectOrder).forEach(([k, v]) => v && fd.append(k, v));
    files.forEach((f) => fd.append("files", f));
    try {
      const { error } = await postApiDataWithFile("/project-orders/", fd);
      if (error) throw new Error(error);
      setMessage("سفارش با موفقیت ارسال شد ✅");
      setProjectOrder({
        full_name: "", email: "", phone_number: "",
        project_description: "", budget: "", deadline: "",
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
      className="bg-white/70 backdrop-blur-md p-5 sm:p-7 md:p-8 rounded-xl
                 border border-[#1F9ECE]/15 shadow-[0_2px_10px_rgba(31,158,206,0.07)]
                 max-w-2xl mx-auto"
    >
      <div className="mb-6 sm:mb-8 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1F9ECE] mb-2">
          سفارش پروژه
        </h2>
        <p className="text-[#393939]/80 text-sm sm:text-base leading-relaxed">
          فرم زیر را پر کنید تا پروژهٔ شما بررسی شود
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField label="نام کامل" icon={<FaUser className="text-[#1F9ECE]" />}
          placeholder="نام و نام خانوادگی"
          value={projectOrder.full_name}
          onChange={(v) => setProjectOrder({ ...projectOrder, full_name: v })}
          required
        />
        <FormField label="ایمیل" icon={<FaEnvelope className="text-[#1F9ECE]" />}
          placeholder="ایمیل شما"
          type="email"
          value={projectOrder.email}
          onChange={(v) => setProjectOrder({ ...projectOrder, email: v })}
          required
        />
        <FormField label="شماره تماس" icon={<FaPhone className="text-[#1F9ECE]" />}
          placeholder="مثلاً ۰۹۱۲۳۴۵۶۷۸۹"
          type="tel"
          pattern="^0.*$"
          customInvalidMessage="شماره باید با صفر شروع شود"
          value={projectOrder.phone_number}
          onChange={(v) => setProjectOrder({ ...projectOrder, phone_number: v })}
          required
        />

        {/* توضیحات پروژه */}
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-2 text-[#393939]/90">
            توضیحات پروژه
          </label>
          <div className="relative">
            <div className="absolute top-3 right-3 text-[#1F9ECE]">
              <FaFileAlt />
            </div>
            <textarea
              className="w-full bg-white/60 border border-[#1F9ECE]/20 text-[#393939]
                         text-sm sm:text-base rounded-lg focus:ring-2 focus:ring-[#1F9ECE]
                         focus:border-[#1F9ECE] p-3 pr-10 h-32 placeholder-gray-400 transition"
              placeholder="جزئیات پروژه مورد نظر خود را بنویسید"
              value={projectOrder.project_description}
              onChange={(e) =>
                setProjectOrder({ ...projectOrder, project_description: e.target.value })
              }
              required
            />
          </div>
        </div>

        <FormField label="بودجه پیشنهادی (اختیاری)"
          icon={<FaMoneyBillWave className="text-[#1F9ECE]" />}
          placeholder="مثلاً ۵,۰۰۰,۰۰۰ تومان"
          value={projectOrder.budget || ""}
          onChange={(v) => setProjectOrder({ ...projectOrder, budget: v })}
        />
        <FormField label="مهلت انجام (اختیاری)"
          icon={<FaCalendarAlt className="text-[#1F9ECE]" />}
          placeholder="مثلاً ۲ هفته"
          value={projectOrder.deadline || ""}
          onChange={(v) => setProjectOrder({ ...projectOrder, deadline: v })}
        />

        {/* آپلود فایل */}
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-2 text-[#393939]/90">
            فایل‌های پروژه (اختیاری)
          </label>
          <label className="flex flex-col items-center justify-center w-full h-32
                             border-2 border-dashed border-[#1F9ECE]/25 rounded-lg
                             cursor-pointer bg-white/60 hover:bg-[#E9D7EB]/30 transition">
            <div className="flex flex-col items-center pt-5 pb-6 text-center">
              <FaFileUpload className="w-8 h-8 mb-3 text-[#1F9ECE]" />
              <p className="mb-2 text-xs sm:text-sm text-[#393939]/80">
                <span className="font-semibold">برای آپلود کلیک کنید</span> یا فایل‌ها را بکشید
              </p>
              <p className="text-xs text-gray-500">فرمت مجاز و حداکثر {MAX_SIZE_MB}MB</p>
            </div>
            <input
              type="file" multiple accept=".pdf,.docx,.txt,.csv,.json,.zip,.jpg,.png"
              className="hidden" onChange={handleFileChange}
            />
          </label>

          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file, i) => (
                <div key={i}
                  className="flex items-center justify-between p-3
                             bg-[#E9D7EB]/20 rounded-lg border border-[#1F9ECE]/10">
                  <div className="flex items-center gap-2 truncate max-w-xs">
                    {getFileIcon(file.type)}
                    <span className="text-sm">{file.name}</span>
                    <span className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)}MB
                    </span>
                  </div>
                  <button type="button" onClick={() => removeFile(i)}
                    className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit" disabled={loading}
          className="w-full bg-gradient-to-r from-[#1F9ECE] to-[#F477B8]
                     hover:from-[#198cb0] hover:to-[#e267a5]
                     text-white font-medium text-sm sm:text-base
                     py-2.5 sm:py-3 rounded-lg transition-all duration-300
                     shadow-md hover:shadow-lg flex justify-center items-center gap-2
                     disabled:opacity-65 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ارسال در حال انجام...
            </>
          ) : ("ارسال سفارش")}
        </button>

        {message && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className={`p-3 rounded-lg text-xs sm:text-sm flex items-center gap-2 ${
              message.includes("موفق") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}>
            {message.includes("موفق") ? <FaCheckCircle /> : <FaTimesCircle />}
            {message}
          </motion.div>
        )}
      </form>
    </motion.section>
  );
}

/*---------------- Input Field Component ----------------*/
function FormField({
  label, icon, placeholder, value, onChange,
  type = "text", required = false, pattern, customInvalidMessage,
}: {
  label: string; icon: React.ReactNode; placeholder: string; value: string;
  onChange: (v: string) => void; type?: string; required?: boolean;
  pattern?: string; customInvalidMessage?: string;
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
          type={type} placeholder={placeholder} value={value}
          onChange={(e) => onChange(e.target.value)} required={required}
          pattern={pattern}
          onInvalid={(e) => customInvalidMessage &&
            (e.target as HTMLInputElement).setCustomValidity(customInvalidMessage!)}
          onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
          className="w-full bg-white/60 border border-[#1F9ECE]/20 text-[#393939]
                     text-sm sm:text-base rounded-lg focus:ring-2 focus:ring-[#1F9ECE]
                     focus:border-[#1F9ECE] p-3 pr-10 placeholder-gray-400 transition"
        />
      </div>
    </div>
  );
}
