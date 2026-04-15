"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Target, Route, BarChart3, MessageSquare, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import PageHeader from "@/components/ui/PageHeader";
import { useFormModal } from "@/components/FormProvider";
import { serviceImages } from "@/lib/images";

const services = [
  { icon: Target, key: "s1", color: "from-sky-600 to-blue-500", slug: "crm-stratejisi", img: serviceImages.s1 },
  { icon: Route, key: "s2", color: "from-blue-500 to-cyan-500", slug: "musteri-yolculugu", img: serviceImages.s2 },
  { icon: BarChart3, key: "s3", color: "from-emerald-500 to-sky-600", slug: "crm-analitik", img: serviceImages.s3 },
  { icon: MessageSquare, key: "s4", color: "from-orange-500 to-amber-500", slug: "crm-icerik", img: serviceImages.s4 },
] as const;

export default function ServicesPage() {
  const t = useTranslations("services_section");
  const { openForm } = useFormModal();

  return (
    <>
      <PageHeader badge={t("badge")} title={t("page_title")} subtitle={t("page_subtitle")} />
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {services.map(({ icon: Icon, key, color, slug, img }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`flex flex-col lg:flex-row gap-10 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              {/* Text */}
              <div className="flex-1">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg mb-5`}>
                  <Icon size={26} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {t(`${key}_title`)}
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed">{t(`${key}_long`)}</p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href={`/hizmetler/${slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0071BD] hover:bg-[#005A97] text-white text-sm font-medium rounded-xl transition-all"
                  >
                    {t("learn_more")}
                    <ArrowRight size={16} />
                  </Link>
                  <button
                    onClick={openForm}
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-all"
                  >
                    {t("info")}
                  </button>
                </div>
              </div>

              {/* Image */}
              <div className="flex-1 w-full">
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                  <img
                    src={img}
                    alt={t(`${key}_title`)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {t("page_cta_title")}
          </h2>
          <p className="mt-4 text-gray-500">
            {t("page_cta_subtitle")}
          </p>
          <button
            onClick={openForm}
            className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 bg-[#0071BD] hover:bg-[#005A97] text-white font-medium rounded-xl transition-all"
          >
            {t("page_cta_button")}
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </>
  );
}
