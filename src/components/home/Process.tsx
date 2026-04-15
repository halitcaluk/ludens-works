"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Search, PenTool, Rocket, LineChart } from "lucide-react";

const steps = [
  { icon: Search, key: "step1", num: "01" },
  { icon: PenTool, key: "step2", num: "02" },
  { icon: Rocket, key: "step3", num: "03" },
  { icon: LineChart, key: "step4", num: "04" },
] as const;

function AuditVisual() {
  return (
    <div className="mt-4 bg-white/5 rounded-lg p-3 space-y-2">
      {[
        { label: "Veri Kalitesi", score: 72, color: "bg-amber-400" },
        { label: "Segmentasyon", score: 35, color: "bg-red-400" },
        { label: "Otomasyon", score: 48, color: "bg-amber-400" },
        { label: "Raporlama", score: 85, color: "bg-emerald-400" },
      ].map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span className="text-[9px] text-gray-500 w-16 shrink-0">{item.label}</span>
          <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.score}%` }} />
          </div>
          <span className="text-[9px] text-gray-500 w-6 text-right">{item.score}</span>
        </div>
      ))}
    </div>
  );
}

function ArchitectVisual() {
  return (
    <div className="mt-4 bg-white/5 rounded-lg p-3">
      <div className="flex items-center justify-center gap-1">
        {["Segment", "Journey", "Flow"].map((label, i) => (
          <div key={label} className="flex items-center">
            <div className="px-2 py-1 bg-[#0071BD]/20 rounded text-[8px] text-[#23B7E7] font-medium">
              {label}
            </div>
            {i < 2 && <div className="w-3 h-px bg-[#0071BD]/30" />}
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-3 bg-white/5 rounded-sm" />
        ))}
      </div>
    </div>
  );
}

function OperateVisual() {
  return (
    <div className="mt-4 bg-white/5 rounded-lg p-3 space-y-1.5">
      {[
        { name: "Welcome Flow", status: true },
        { name: "Abandon Cart", status: true },
        { name: "Win-Back", status: false },
      ].map((flow) => (
        <div key={flow.name} className="flex items-center justify-between">
          <span className="text-[9px] text-gray-400">{flow.name}</span>
          <span className={`text-[8px] px-1.5 py-0.5 rounded ${flow.status ? "bg-emerald-400/10 text-emerald-400" : "bg-amber-400/10 text-amber-400"}`}>
            {flow.status ? "Live" : "Testing"}
          </span>
        </div>
      ))}
    </div>
  );
}

function MeasureVisual() {
  return (
    <div className="mt-4 bg-white/5 rounded-lg p-3">
      <svg viewBox="0 0 100 30" className="w-full h-8">
        <polyline
          points="0,25 15,20 30,22 45,15 60,12 75,8 100,5"
          fill="none"
          stroke="#0071BD"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <polyline
          points="0,28 15,25 30,27 45,22 60,20 75,18 100,16"
          fill="none"
          stroke="#23B7E7"
          strokeWidth="1"
          strokeDasharray="3 2"
          opacity="0.5"
        />
      </svg>
      <div className="flex justify-between mt-1">
        <span className="text-[8px] text-gray-600">Hafta 1</span>
        <span className="text-[8px] text-emerald-400">+45% ROI</span>
      </div>
    </div>
  );
}

const visuals = [AuditVisual, ArchitectVisual, OperateVisual, MeasureVisual];

export default function Process() {
  const t = useTranslations("process");

  return (
    <section className="py-24 bg-[#0B0F1A]" id="process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mx-auto">
          <span className="inline-flex items-center px-3 py-1 bg-[#0071BD]/10 border border-[#0071BD]/20 text-[#23B7E7] text-xs font-medium rounded-full">
            {t("badge")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight lg:whitespace-nowrap">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#0071BD]/30 to-transparent" />

          {steps.map(({ icon: Icon, key, num }, i) => {
            const Visual = visuals[i];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="relative inline-flex">
                  <div className="w-16 h-16 rounded-2xl bg-[#1a2235] border border-white/10 flex items-center justify-center text-[#23B7E7] relative z-10">
                    <Icon size={26} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0071BD] text-white text-[10px] font-bold flex items-center justify-center z-20">
                    {num}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">
                  {t(`${key}_title`)}
                </h3>
                <p className="text-sm text-[#23B7E7] font-medium mt-1">
                  {t(`${key}_subtitle`)}
                </p>
                <p className="mt-3 text-sm text-gray-400 leading-relaxed max-w-xs mx-auto">
                  {t(`${key}_desc`)}
                </p>
                <Visual />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
