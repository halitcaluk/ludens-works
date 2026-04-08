"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useFormModal } from "@/components/FormProvider";
import NetworkBackground from "./NetworkBackground";

export default function Hero() {
  const t = useTranslations("hero");
  const { openForm } = useFormModal();

  const stats = [
    { value: t("stat1_value"), label: t("stat1_label") },
    { value: t("stat2_value"), label: t("stat2_label") },
    { value: t("stat3_value"), label: t("stat3_label") },
  ];

  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center bg-[#0B0F1A] overflow-hidden">
      {/* Animated Network Background */}
      <div className="absolute inset-0 z-0">
        <NetworkBackground />
      </div>

      {/* Dark overlay — lighter at bottom to show ground mesh */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A]/80 via-[#0B0F1A]/50 to-[#0B0F1A]/30 z-[1] pointer-events-none" />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A]/50 via-transparent to-transparent z-[2] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] z-[3] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-[4] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 w-full text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0071BD]/10 border border-[#0071BD]/20 rounded-full text-[#23B7E7] text-xs font-medium tracking-wide backdrop-blur-sm">
            <Sparkles size={14} />
            {t("badge")}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-bold text-white leading-[1.1] tracking-tight max-w-4xl mx-auto"
        >
          {t("title_line1")}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#23B7E7] to-[#01FFFF]">
            {t("title_highlight")}
          </span>{" "}
          {t("title_line2")}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={openForm}
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#0071BD] hover:bg-[#005A97] text-white font-medium rounded-xl transition-all hover:shadow-xl hover:shadow-[#0071BD]/25"
          >
            {t("cta_primary")}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
          <a
            href="#services"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/5 hover:border-white/20 transition-all backdrop-blur-sm"
          >
            {t("cta_secondary")}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex justify-center gap-8 sm:gap-12"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="relative pl-4 border-l border-[#0071BD]/30 text-left"
            >
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
