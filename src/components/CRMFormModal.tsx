"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Loader2 } from "lucide-react";

export default function CRMFormModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("form");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const newErrors: Record<string, boolean> = {};

    ["name", "email"].forEach((field) => {
      if (!data.get(field)) newErrors[field] = true;
    });
    if (!data.get("kvkk")) newErrors["kvkk"] = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleClose = () => {
    setSubmitted(false);
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {t("title")}
                </h2>
                <p className="text-sm text-gray-500">{t("subtitle")}</p>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <X size={18} className="text-gray-400" />
              </button>
            </div>

            {submitted ? (
              <div className="px-6 py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#0071BD]/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-[#0071BD]" />
                </div>
                <p className="text-lg font-medium text-gray-900">
                  {t("success")}
                </p>
                <button
                  onClick={handleClose}
                  className="mt-6 px-6 py-2.5 bg-[#0071BD] text-white rounded-xl text-sm font-medium hover:bg-[#005A97] transition-colors"
                >
                  {t("close")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("name")} *
                  </label>
                  <input
                    name="name"
                    type="text"
                    className={`w-full px-3 py-2.5 rounded-xl border ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200"} text-sm focus:outline-none focus:ring-2 focus:ring-[#0071BD]/20 focus:border-[#0071BD] transition-all`}
                    onChange={() => setErrors((p) => ({ ...p, name: false }))}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{t("required")}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("email")} *
                  </label>
                  <input
                    name="email"
                    type="email"
                    className={`w-full px-3 py-2.5 rounded-xl border ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200"} text-sm focus:outline-none focus:ring-2 focus:ring-[#0071BD]/20 focus:border-[#0071BD] transition-all`}
                    onChange={() => setErrors((p) => ({ ...p, email: false }))}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{t("required")}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("message")}
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder={t("message_placeholder")}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071BD]/20 focus:border-[#0071BD] transition-all resize-none"
                  />
                </div>

                {/* Checkboxes */}
                <div className="space-y-3 pt-2">
                  <label className={`flex items-start gap-3 cursor-pointer ${errors.kvkk ? "text-red-600" : ""}`}>
                    <input
                      name="kvkk"
                      type="checkbox"
                      className="mt-1 w-4 h-4 rounded border-gray-300 text-[#0071BD] focus:ring-[#0071BD]"
                      onChange={() => setErrors((p) => ({ ...p, kvkk: false }))}
                    />
                    <span className="text-xs text-gray-600 leading-relaxed">
                      {t("kvkk")} *
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      name="commercial"
                      type="checkbox"
                      className="mt-1 w-4 h-4 rounded border-gray-300 text-[#0071BD] focus:ring-[#0071BD]"
                    />
                    <span className="text-xs text-gray-600 leading-relaxed">
                      {t("commercial")}
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#0071BD] hover:bg-[#005A97] text-white font-medium rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    t("submit")
                  )}
                </button>
                <p className="text-xs text-gray-400 text-center">{t("submit_note")}</p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
