"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useFormModal } from "@/components/FormProvider";

export default function CTASection() {
  const t = useTranslations("cta_section");
  const { openForm } = useFormModal();

  return (
    <section className="py-24 bg-gray-50" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B0F1A] via-[#111827] to-[#0B0F1A] p-12 sm:p-16 lg:p-20 text-center"
        >
          {/* Glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0071BD]/10 rounded-full blur-[128px]" />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight max-w-3xl mx-auto leading-tight">
              {t("title")}
            </h2>
            <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto">
              {t("subtitle")}
            </p>
            <div className="mt-10">
              <button
                onClick={openForm}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-[#0071BD] hover:bg-[#005A97] text-white font-medium rounded-xl text-lg transition-all hover:shadow-xl hover:shadow-[#0071BD]/25"
              >
                {t("button")}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-500">{t("note")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
