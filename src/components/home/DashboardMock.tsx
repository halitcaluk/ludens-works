"use client";

import { motion } from "framer-motion";

const barData = [35, 45, 30, 55, 70, 60, 80, 75, 90, 85, 95, 88];
const months = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];

export default function DashboardMock() {
  return (
    <div className="p-4 sm:p-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img src="/luden-icon.svg" alt="LW" className="w-8 h-8 rounded-lg" />
          <div>
            <div className="text-sm font-medium text-white">CRM Dashboard</div>
            <div className="text-xs text-gray-500">Lifecycle Performance</div>
          </div>
        </div>
        <div className="flex gap-2">
          {["7G", "30G", "90G"].map((label) => (
            <button
              key={label}
              className={`px-3 py-1 text-xs rounded-lg ${
                label === "30G"
                  ? "bg-[#0071BD] text-white"
                  : "bg-white/5 text-gray-400"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Aktif Kullanıcı", value: "24,891", change: "+12.5%", up: true },
          { label: "Retention Rate", value: "%68.4", change: "+5.2%", up: true },
          { label: "Email Revenue", value: "$128.4K", change: "+23.1%", up: true },
          { label: "Churn Rate", value: "%4.2", change: "-2.8%", up: false },
        ].map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.1 }}
            className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/5"
          >
            <div className="text-xs text-gray-500 mb-1">{kpi.label}</div>
            <div className="text-lg sm:text-xl font-bold text-white">{kpi.value}</div>
            <div
              className={`text-xs mt-1 ${
                kpi.up ? "text-emerald-400" : "text-emerald-400"
              }`}
            >
              {kpi.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white/5 rounded-xl p-4 border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-medium text-white">Lifecycle Revenue</div>
              <div className="text-xs text-gray-500">Aylık email & CRM geliri</div>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#0071BD]" />
                <span className="text-gray-400">Email</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-gray-400">SMS</span>
              </span>
            </div>
          </div>
          {/* Bar Chart */}
          <div className="flex items-end gap-1.5 h-32 sm:h-40">
            {barData.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  className="w-full rounded-t-sm bg-gradient-to-t from-[#0071BD] to-[#23B7E7] relative"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 1 + i * 0.05, duration: 0.4 }}
                >
                  {/* SMS overlay */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-emerald-400/30 rounded-t-sm"
                    initial={{ height: 0 }}
                    animate={{ height: `${h * 0.25}%` }}
                    transition={{ delay: 1.2 + i * 0.05, duration: 0.3 }}
                  />
                </motion.div>
                <span className="text-[8px] sm:text-[10px] text-gray-600 hidden sm:block">
                  {months[i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right sidebar - Segment breakdown */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
          <div className="text-sm font-medium text-white mb-1">Segment Dağılımı</div>
          <div className="text-xs text-gray-500 mb-4">Aktif müşteri segmentleri</div>
          <div className="space-y-3">
            {[
              { label: "Champions", pct: 28, color: "bg-[#0071BD]" },
              { label: "Loyal", pct: 22, color: "bg-emerald-400" },
              { label: "At Risk", pct: 18, color: "bg-amber-400" },
              { label: "New Users", pct: 32, color: "bg-cyan-400" },
            ].map((seg, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">{seg.label}</span>
                  <span className="text-gray-500">%{seg.pct}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${seg.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${seg.pct}%` }}
                    transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Mini lifecycle funnel */}
          <div className="mt-5 pt-4 border-t border-white/5">
            <div className="text-xs text-gray-500 mb-3">Lifecycle Funnel</div>
            {[
              { label: "Acquired", val: "12.4K", w: "100%" },
              { label: "Activated", val: "8.2K", w: "66%" },
              { label: "Retained", val: "5.8K", w: "47%" },
              { label: "Revenue", val: "3.1K", w: "25%" },
            ].map((step, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between text-[10px] mb-0.5">
                  <span className="text-gray-400">{step.label}</span>
                  <span className="text-gray-500">{step.val}</span>
                </div>
                <motion.div
                  className="h-2 bg-gradient-to-r from-[#0071BD] to-[#23B7E7] rounded-sm"
                  initial={{ width: 0 }}
                  animate={{ width: step.w }}
                  transition={{ delay: 1.5 + i * 0.1, duration: 0.4 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom flow cards */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { name: "Welcome Series", status: "Aktif", emails: "4 email", rate: "%42.1" },
          { name: "Cart Abandonment", status: "Aktif", emails: "3 email", rate: "%28.7" },
          { name: "Win-Back Flow", status: "Aktif", emails: "5 email", rate: "%15.3" },
          { name: "Post-Purchase", status: "Aktif", emails: "6 email", rate: "%35.8" },
        ].map((flow, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 + i * 0.1 }}
            className="bg-white/5 rounded-lg p-3 border border-white/5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-white truncate">{flow.name}</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-emerald-400/10 text-emerald-400 rounded">
                {flow.status}
              </span>
            </div>
            <div className="text-[10px] text-gray-500">{flow.emails}</div>
            <div className="text-sm font-semibold text-[#23B7E7] mt-1">
              {flow.rate} <span className="text-[10px] text-gray-500 font-normal">conv.</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
