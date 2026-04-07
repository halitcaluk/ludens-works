"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { TrendingUp, Mail, Users } from "lucide-react";

const items = [
  { icon: TrendingUp, key: "item1" },
  { icon: Mail, key: "item2" },
  { icon: Users, key: "item3" },
] as const;

export default function PainPoints() {
  const t = useTranslations("pain");

  return (
    <section className="py-24 bg-white" id="pain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center px-3 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-full">
            {t("badge")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-gray-500">{t("subtitle")}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map(({ icon: Icon, key }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-red-100 hover:bg-red-50/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                {t(`${key}_title`)}
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                {t(`${key}_desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
