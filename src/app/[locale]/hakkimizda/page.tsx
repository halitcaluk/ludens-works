"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Elif K.",
    role: "Head of Growth, E-ticaret Markas\u0131",
    text: "Ludens Works ile \u00e7al\u0131\u015fmaya ba\u015flad\u0131ktan sonra email kanal\u0131ndan gelen gelirimiz 3 kat\u0131na \u00e7\u0131kt\u0131. Segmentasyon ve lifecycle ak\u0131\u015flar\u0131 ger\u00e7ekten fark yarat\u0131yor.",
  },
  {
    name: "Mert A.",
    role: "Marketing Director, SaaS",
    text: "CRM stratejimizi s\u0131f\u0131rdan kurgulad\u0131lar. Retention oran\u0131m\u0131z %40 artt\u0131 ve churn rate'\u0131m\u0131z tarihi d\u00fc\u015f\u00fck seviyelere geldi.",
  },
  {
    name: "Ay\u015fe T.",
    role: "E-commerce Manager, Marketplace",
    text: "Sadece teknik kurulum de\u011fil, ger\u00e7ekten stratejik d\u00fc\u015f\u00fcnen bir ekip. Journey tasar\u0131mlar\u0131 ve A/B testleriyle s\u00fcrekli optimize ediyorlar.",
  },
  {
    name: "Can D.",
    role: "Founder, D2C Brand",
    text: "Acquisition maliyetlerimiz artarken mevcut m\u00fc\u015fterilerden gelir \u00fcretme stratejimiz yoktu. Ludens Works bunu tamamen de\u011fi\u015ftirdi.",
  },
];

const partnerLogos = [
  "Klaviyo", "HubSpot", "Mailchimp", "Shopify", "Braze",
  "Customer.io", "Segment", "Mixpanel",
];

export default function AboutPage() {
  const t = useTranslations("about");
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <>
      {/* Hero - Simple Centered */}
      <section className="bg-[#0B0F1A] pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
            className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
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

      {/* Approach - Simple Text */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {t("approach_title")}
          </h2>
          <p className="mt-6 text-gray-600 leading-relaxed text-lg">
            {t("approach_desc")}
          </p>
        </div>
      </section>

      {/* Partner & Technology Logos */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-center text-sm font-medium text-gray-400 uppercase tracking-widest mb-10">
            Teknoloji Ortaklarımız
          </h3>
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

      {/* Testimonials Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12">
            Müşterilerimiz Ne Diyor?
          </h2>

          <div className="relative">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-gray-50 rounded-2xl p-8 sm:p-10 border border-gray-100"
            >
              <Quote size={32} className="text-[#0071BD]/20 mb-4" />
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed italic">
                &ldquo;{testimonials[activeTestimonial].text}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0071BD]/10 flex items-center justify-center text-[#0071BD] font-bold text-sm">
                  {testimonials[activeTestimonial].name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonials[activeTestimonial].role}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === activeTestimonial
                      ? "bg-[#0071BD] w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
