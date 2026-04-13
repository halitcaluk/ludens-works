"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useFormModal } from "@/components/FormProvider";

interface ServiceDetailProps {
  serviceKey: "s1" | "s2" | "s3" | "s4";
  icon: LucideIcon;
  color: string;
  heroImage: string;
  detailImage: string;
}

export default function ServiceDetail({
  serviceKey,
  icon: Icon,
  color,
  heroImage,
  detailImage,
}: ServiceDetailProps) {
  const t = useTranslations("services_section");
  const { openForm } = useFormModal();

  const scopeItems = t(`${serviceKey}_scope`).split("|");

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0B0F1A] pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A]/70 via-[#0B0F1A]/90 to-[#0B0F1A]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/hizmetler"
            className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors mb-6"
          >
            &larr; {t("badge")}
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg`}>
              <Icon size={28} />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {t(`${serviceKey}_title`)}
            </h1>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl">
            {t(`${serviceKey}_detail_desc`)}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Text */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t("detail_what_title")}
              </h2>
              <div className="text-gray-600 leading-relaxed text-lg space-y-4">
                {t(`${serviceKey}_what_desc`).split("\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-10 mb-4">
                {t("detail_scope_title")}
              </h3>
              <div className="space-y-3">
                {scopeItems.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#0071BD]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-[#0071BD]" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="flex-1 w-full lg:sticky lg:top-24">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={detailImage}
                  alt={t(`${serviceKey}_title`)}
                  className="w-full object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {t("detail_cta_title")}
          </h2>
          <p className="mt-4 text-gray-500">
            {t("detail_cta_subtitle")}
          </p>
          <button
            onClick={openForm}
            className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 bg-[#0071BD] hover:bg-[#005A97] text-white font-medium rounded-xl transition-all"
          >
            {t("detail_cta_button")}
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </>
  );
}
