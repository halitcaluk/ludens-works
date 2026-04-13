"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Target,
  Route,
  BarChart3,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "@/i18n/navigation";

const services = [
  { icon: Target, key: "s1", color: "from-sky-600 to-blue-500", slug: "crm-stratejisi" },
  { icon: Route, key: "s2", color: "from-blue-500 to-cyan-500", slug: "musteri-yolculugu" },
  { icon: BarChart3, key: "s3", color: "from-emerald-500 to-sky-600", slug: "crm-analitik" },
  { icon: MessageSquare, key: "s4", color: "from-orange-500 to-amber-500", slug: "crm-icerik" },
] as const;

function MiniSegment() {
  return (
    <div className="mt-4 bg-gray-50 rounded-lg p-3 space-y-2">
      {[
        { label: "Champions", w: "72%", color: "bg-sky-600" },
        { label: "At Risk", w: "45%", color: "bg-amber-400" },
        { label: "Dormant", w: "28%", color: "bg-gray-300" },
      ].map((s) => (
        <div key={s.label} className="flex items-center gap-2">
          <span className="text-[10px] text-gray-400 w-16 shrink-0">{s.label}</span>
          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${s.color}`} style={{ width: s.w }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function MiniJourney() {
  const steps = ["Signup", "Onboard", "Activate", "Retain"];
  return (
    <div className="mt-4 bg-gray-50 rounded-lg p-3">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold ${i < 3 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-400"}`}>
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className={`w-6 sm:w-8 h-0.5 ${i < 2 ? "bg-blue-500" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-1.5">
        {steps.map((step) => (
          <span key={step} className="text-[8px] text-gray-400">{step}</span>
        ))}
      </div>
    </div>
  );
}

function MiniChart() {
  const points = [20, 35, 28, 45, 42, 55, 52, 68, 65, 78, 72, 85];
  return (
    <div className="mt-4 bg-gray-50 rounded-lg p-3">
      <svg viewBox="0 0 120 40" className="w-full h-10">
        <polyline
          points={points.map((y, i) => `${i * 10 + 5},${40 - (y / 100) * 40}`).join(" ")}
          fill="none"
          stroke="#10b981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points={`5,40 ${points.map((y, i) => `${i * 10 + 5},${40 - (y / 100) * 40}`).join(" ")} 115,40`}
          fill="url(#chartGrad)"
          opacity="0.15"
        />
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex justify-between text-[8px] text-gray-400 mt-1">
        <span>Oca</span><span>Haz</span><span>Ara</span>
      </div>
    </div>
  );
}

function MiniEmails() {
  return (
    <div className="mt-4 space-y-1.5">
      {[
        { subj: "Welcome! \u{1F44B}", rate: "%42" },
        { subj: "Cart reminder", rate: "%28" },
        { subj: "We miss you", rate: "%18" },
      ].map((e) => (
        <div key={e.subj} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-4 rounded bg-orange-100" />
            <span className="text-[10px] text-gray-600">{e.subj}</span>
          </div>
          <span className="text-[10px] font-medium text-orange-500">{e.rate}</span>
        </div>
      ))}
    </div>
  );
}

const miniVisuals = [MiniSegment, MiniJourney, MiniChart, MiniEmails];

export default function Services() {
  const t = useTranslations("services_section");

  return (
    <section className="py-24 bg-gray-50" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center px-3 py-1 bg-[#0071BD]/10 text-[#0071BD] text-xs font-medium rounded-full">
            {t("badge")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-gray-500">{t("subtitle")}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ icon: Icon, key, color, slug }, i) => {
            const MiniVisual = miniVisuals[i];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
              <Link
                href={`/hizmetler/${slug}`}
                className="group relative block p-6 bg-white rounded-2xl border border-gray-100 hover:border-[#0071BD]/20 hover:shadow-xl hover:shadow-[#0071BD]/5 transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg`}
                >
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-gray-900 group-hover:text-[#0071BD] transition-colors">
                  {t(`${key}_title`)}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  {t(`${key}_desc`)}
                </p>
                <MiniVisual />
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#0071BD] opacity-0 group-hover:opacity-100 transition-opacity">
                  {t("learn_more")}
                  <ArrowUpRight size={14} />
                </div>
              </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
