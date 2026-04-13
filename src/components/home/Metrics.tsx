"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const metricKeys = ["m1", "m2", "m3", "m4"] as const;

export default function Metrics() {
  const t = useTranslations("metrics");

  return (
    <section className="py-20 bg-gradient-to-r from-[#0B0F1A] via-[#111827] to-[#0B0F1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metricKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#23B7E7] to-[#01FFFF]">
                {t(`${key}_value`)}
              </div>
              <div className="mt-2 text-sm text-gray-400">
                {t(`${key}_label`)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
