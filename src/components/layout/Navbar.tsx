"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Target,
  Route,
  BarChart3,
  MessageSquare,
} from "lucide-react";
import { useFormModal } from "@/components/FormProvider";

const serviceIcons = [Target, Route, BarChart3, MessageSquare];
const serviceKeys = ["crm_strategy", "journeys", "analytics", "content"] as const;
const serviceSlugs = ["/hizmetler/crm-stratejisi", "/hizmetler/musteri-yolculugu", "/hizmetler/crm-analitik", "/hizmetler/crm-icerik"];

export default function Navbar() {
  const t = useTranslations("nav");
  const ts = useTranslations("services_dropdown");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { openForm } = useFormModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const otherLocale = locale === "tr" ? "en" : "tr";

  const navLinks = [
    { href: "/hizmetler", label: t("services"), hasDropdown: true },
    { href: "/surec", label: t("process") },
    { href: "/hakkimizda", label: t("about") },
    { href: "/blog", label: t("blog") },
    { href: "/iletisim", label: t("contact") },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B0F1A]/95 backdrop-blur-md shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/luden-icon.svg" alt="Ludens Works" className="w-8 h-8" />
            <span className="text-white font-semibold text-lg tracking-tight">
              Ludens <span className="font-light">Works</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() =>
                  link.hasDropdown && setServicesOpen(true)
                }
                onMouseLeave={() =>
                  link.hasDropdown && setServicesOpen(false)
                }
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                    />
                  )}
                </Link>
                {link.hasDropdown && servicesOpen && (
                  <div className="absolute top-full left-0 pt-2 w-80">
                    <div className="bg-[#1a2235] border border-white/10 rounded-xl p-2 shadow-2xl shadow-black/30">
                      {serviceKeys.map((key, i) => {
                        const Icon = serviceIcons[i];
                        return (
                          <Link
                            key={key}
                            href={serviceSlugs[i]}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                          >
                            <div className="w-9 h-9 rounded-lg bg-[#0071BD]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0071BD]/20 transition-colors">
                              <Icon size={18} className="text-[#23B7E7]" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">
                                {ts(key)}
                              </div>
                              <div className="text-xs text-gray-400 mt-0.5">
                                {ts(`${key}_desc`)}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={pathname}
              locale={otherLocale}
              className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white border border-white/10 rounded-lg hover:border-white/20 transition-all uppercase"
            >
              {otherLocale}
            </Link>
            <button
              onClick={openForm}
              className="px-5 py-2.5 text-sm font-medium text-white bg-[#0071BD] hover:bg-[#005A97] rounded-lg transition-all hover:shadow-lg hover:shadow-[#0071BD]/25"
            >
              {t("cta")}
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0B0F1A]/98 backdrop-blur-xl border-t border-white/5">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 flex items-center gap-3 px-4">
              <Link
                href={pathname}
                locale={otherLocale}
                className="px-3 py-1.5 text-xs font-medium text-gray-400 border border-white/10 rounded-lg uppercase"
              >
                {otherLocale}
              </Link>
              <button
                onClick={() => { setMobileOpen(false); openForm(); }}
                className="flex-1 text-center px-5 py-2.5 text-sm font-medium text-white bg-[#0071BD] rounded-lg"
              >
                {t("cta")}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
