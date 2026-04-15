"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, ArrowRight, Check } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { useFormModal } from "@/components/FormProvider";

export default function ContactPage() {
  const t = useTranslations("contact_page");
  const tf = useTranslations("form");
  const { openForm } = useFormModal();

  const nextItems = t("next_items").split("|");

  return (
    <>
      <PageHeader badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                {t("info_title")}
              </h2>
              <div className="space-y-6">
                <motion.a
                  href="mailto:info@ludens.works"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-4 hover:text-[#0071BD] transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0071BD]/10 text-[#0071BD] flex items-center justify-center flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <span className="text-gray-700">{t("email")}</span>
                </motion.a>
                {[
                  { icon: MapPin, label: t("location") },
                  { icon: Clock, label: t("hours") },
                ].map(({ icon: Icon, label }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (i + 1) * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#0071BD]/10 text-[#0071BD] flex items-center justify-center flex-shrink-0">
                      <Icon size={20} />
                    </div>
                    <span className="text-gray-700">{label}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {tf("title")}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{tf("subtitle")}</p>
                <button
                  onClick={openForm}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0071BD] hover:bg-[#005A97] text-white font-medium rounded-xl transition-all"
                >
                  {tf("submit")}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* What happens next? */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t("next_title")}
              </h2>
              <div className="space-y-4">
                {nextItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#0071BD]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-[#0071BD]" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
