"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Globe, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const ts = useTranslations("services_section");
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === "tr" ? "en" : "tr";

  return (
    <footer className="bg-[#0B0F1A] text-gray-400 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/luden-icon.svg" alt="Ludens Works" className="w-8 h-8" />
              <span className="text-white font-semibold text-lg">
                Ludens <span className="font-light">Works</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">{t("desc")}</p>
            <div className="flex gap-3 mt-6">
              {[Globe, Mail, MapPin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#0071BD]/20 hover:text-[#23B7E7] transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              {t("services_title")}
            </h4>
            <ul className="space-y-2.5">
              {(["s1_title", "s2_title", "s3_title", "s4_title"] as const).map(
                (key) => (
                  <li key={key}>
                    <Link
                      href="/hizmetler"
                      className="text-sm hover:text-white transition-colors"
                    >
                      {ts(key)}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              {t("quick_title")}
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: "/surec", label: tn("process") },
                { href: "/hakkimizda", label: tn("about") },
                // { href: "/blog", label: tn("blog") },
                { href: "/iletisim", label: tn("contact") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              {t("contact_title")}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>hello@ludenworks.com</li>
              <li>Istanbul, Turkey</li>
            </ul>
            <div className="mt-6">
              <Link
                href={pathname}
                locale={otherLocale}
                className="inline-flex px-3 py-1.5 text-xs font-medium text-gray-400 border border-white/10 rounded-lg hover:text-white hover:border-white/20 transition-all uppercase"
              >
                {otherLocale === "en" ? "English" : "Turkce"}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} Ludens Works. {t("rights")}
          </p>
          <p className="text-xs text-gray-500">
            Lifecycle & Retention CRM Agency
          </p>
        </div>
      </div>
    </footer>
  );
}
