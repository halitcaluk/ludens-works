"use client";

import { motion } from "framer-motion";

export default function PageHeader({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="bg-[#0B0F1A] pt-32 pb-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="inline-flex items-center px-3 py-1 bg-[#0071BD]/10 border border-[#0071BD]/20 text-[#23B7E7] text-xs font-medium rounded-full">
            {badge}
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight lg:whitespace-nowrap"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto px-4"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
