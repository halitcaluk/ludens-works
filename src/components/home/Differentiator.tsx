"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const rows = ["1", "2", "3", "4"] as const;

export default function Differentiator() {
  const t = useTranslations("diff");

  return (
    <section className="py-24 bg-white" id="differentiator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center px-3 py-1 bg-[#0071BD]/10 text-[#0071BD] text-xs font-medium rounded-full">
            {t("badge")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-gray-500">{t("subtitle")}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {/* Traditional - Left Card */}
          <div className="relative rounded-2xl border border-gray-200 bg-gray-50 p-8 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-300" />
            <h3 className="text-lg font-semibold text-gray-400 mb-6">
              {t("traditional")}
            </h3>
            <div className="space-y-4">
              {rows.map((row) => (
                <div
                  key={`t${row}`}
                  className="flex items-start gap-3 p-3 bg-white/60 rounded-xl"
                >
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X size={12} className="text-red-400" />
                  </div>
                  <span className="text-sm text-gray-500 leading-relaxed">
                    {t(`t${row}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Ludens - Right Card */}
          <div className="relative rounded-2xl border border-[#0071BD]/20 bg-gradient-to-br from-[#0071BD]/5 to-white p-8 overflow-hidden shadow-lg shadow-[#0071BD]/5">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0071BD] to-[#23B7E7]" />
            {/* Glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#0071BD]/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-6">
                <img src="/luden-icon.svg" alt="LW" className="w-7 h-7" />
                <h3 className="text-lg font-semibold text-[#0071BD]">
                  {t("ludens")}
                </h3>
              </div>
              <div className="space-y-4">
                {rows.map((row, i) => (
                  <motion.div
                    key={`l${row}`}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#0071BD]/10 shadow-sm"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#0071BD]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-[#0071BD]" />
                    </div>
                    <span className="text-sm text-gray-800 font-medium leading-relaxed">
                      {t(`l${row}`)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
