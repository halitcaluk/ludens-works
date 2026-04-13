"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

export default function BlogPage() {
  const t = useTranslations("blog_page");

  return (
    <>
      <PageHeader badge={t("badge")} title={t("title")} subtitle={t("subtitle")} />
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-[#0071BD]/10 text-[#0071BD] flex items-center justify-center mx-auto">
              <BookOpen size={36} />
            </div>
            <h2 className="mt-6 text-xl font-semibold text-gray-900">
              {t("coming_soon")}
            </h2>
            <p className="mt-3 text-gray-500">{t("notify")}</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
