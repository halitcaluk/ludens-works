"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const partnerLogos = [
  "HubSpot", "Klaviyo", "Mailchimp", "Braze",
  "Iterable", "Customer.io", "Bird", "ActiveCampaign",
];

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0B0F1A] pt-32 pb-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-3 py-1 bg-[#0071BD]/10 border border-[#0071BD]/20 text-[#23B7E7] text-xs font-medium rounded-full"
          >
            {t("badge")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight lg:whitespace-nowrap"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed px-4"
          >
            {t("subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Team Photo */}
      <section className="pt-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl overflow-hidden shadow-2xl shadow-black/10"
          >
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Ludens Works Team"
              className="w-full h-[300px] sm:h-[400px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {t("approach_title")}
          </h2>
          <div className="mt-6 text-gray-600 leading-relaxed text-lg space-y-4">
            {t("approach_desc").split("\n").map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Platforms */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-center text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">
            {t("tools_title")}
          </h3>
          <p className="text-center text-gray-500 max-w-2xl mx-auto mb-10">
            {t("tools_desc")}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {partnerLogos.map((logo, i) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-center py-6 px-4 bg-white rounded-xl border border-gray-100 hover:border-[#0071BD]/20 hover:shadow-md transition-all"
              >
                <span className="text-gray-400 font-semibold text-lg">{logo}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug"
          >
            {t("closing")}
          </motion.p>
        </div>
      </section>
    </>
  );
}
