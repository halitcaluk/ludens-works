"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";

interface Section {
  heading: string;
  body: string;
}

export default function KvkkPage() {
  const t = useTranslations("kvkk_page");
  // next-intl raw access for array content
  const sections = t.raw("sections") as Section[];

  return (
    <>
      <PageHeader
        badge={t("badge")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-400 mb-10">{t("last_updated")}</p>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {section.heading}
                </h2>
                <p className="text-gray-600 leading-relaxed">{section.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
