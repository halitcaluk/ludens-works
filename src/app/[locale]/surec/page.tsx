"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Search, PenTool, Rocket, LineChart, ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { useFormModal } from "@/components/FormProvider";

const steps = [
  { icon: Search, key: "step1", num: "01" },
  { icon: PenTool, key: "step2", num: "02" },
  { icon: Rocket, key: "step3", num: "03" },
  { icon: LineChart, key: "step4", num: "04" },
] as const;

export default function ProcessPage() {
  const t = useTranslations("process");
  const { openForm } = useFormModal();

  return (
    <>
      <PageHeader badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#0071BD] via-[#0071BD]/30 to-transparent hidden sm:block" />

            <div className="space-y-12">
              {steps.map(({ icon: Icon, key, num }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex gap-6 sm:gap-8"
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-[#0071BD]/10 border border-[#0071BD]/20 flex items-center justify-center text-[#0071BD]">
                      <Icon size={26} />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0071BD] text-white text-[10px] font-bold flex items-center justify-center">
                      {num}
                    </span>
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-xl font-bold text-gray-900">{t(`${key}_title`)}</h3>
                    <p className="text-sm font-medium text-[#0071BD] mt-1">{t(`${key}_subtitle`)}</p>
                    <p className="mt-3 text-gray-600 leading-relaxed">{t(`${key}_long`)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            İlk adımı atın
          </h2>
          <p className="mt-4 text-gray-500">
            Ücretsiz CRM Readiness Audit ile sürecinizi başlatın.
          </p>
          <button
            onClick={openForm}
            className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 bg-[#0071BD] hover:bg-[#005A97] text-white font-medium rounded-xl transition-all"
          >
            Ücretsiz CRM Analizi
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </>
  );
}
