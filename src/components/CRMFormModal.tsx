"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Loader2 } from "lucide-react";
import { Link } from "@/i18n/navigation";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        options: {
          sitekey: string;
          size?: "invisible" | "normal" | "compact";
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
        }
      ) => string;
      execute: (widgetId: string) => void;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export default function CRMFormModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("form");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const tokenResolverRef = useRef<((token: string) => void) | null>(null);

  // Load Turnstile script once
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    if (typeof window === "undefined") return;
    if (document.querySelector("script[data-turnstile]")) return;

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    script.setAttribute("data-turnstile", "true");
    document.head.appendChild(script);
  }, []);

  // Render Turnstile widget when modal opens
  useEffect(() => {
    if (!open || !TURNSTILE_SITE_KEY) return;

    let cancelled = false;
    const tryRender = () => {
      if (cancelled) return;
      if (!window.turnstile || !turnstileContainerRef.current) {
        setTimeout(tryRender, 200);
        return;
      }
      if (widgetIdRef.current) return; // already rendered

      widgetIdRef.current = window.turnstile.render(
        turnstileContainerRef.current,
        {
          sitekey: TURNSTILE_SITE_KEY,
          size: "invisible",
          callback: (token: string) => {
            tokenResolverRef.current?.(token);
            tokenResolverRef.current = null;
          },
          "error-callback": () => {
            tokenResolverRef.current?.("");
            tokenResolverRef.current = null;
          },
          "expired-callback": () => {
            if (widgetIdRef.current && window.turnstile) {
              window.turnstile.reset(widgetIdRef.current);
            }
          },
        }
      );
    };
    tryRender();

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* noop */
        }
        widgetIdRef.current = null;
      }
    };
  }, [open]);

  async function getTurnstileToken(): Promise<string> {
    if (!TURNSTILE_SITE_KEY) return "";
    if (!window.turnstile || !widgetIdRef.current) return "";

    return new Promise<string>((resolve) => {
      tokenResolverRef.current = resolve;
      try {
        window.turnstile!.reset(widgetIdRef.current!);
        window.turnstile!.execute(widgetIdRef.current!);
      } catch {
        resolve("");
      }
      // Safety timeout — if Turnstile doesn't respond in 15s, give up
      setTimeout(() => {
        if (tokenResolverRef.current === resolve) {
          tokenResolverRef.current = null;
          resolve("");
        }
      }, 15000);
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const newErrors: Record<string, boolean> = {};

    ["name", "email"].forEach((field) => {
      if (!data.get(field)) newErrors[field] = true;
    });
    if (!data.get("kvkk")) newErrors["kvkk"] = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitError(null);
    setLoading(true);

    try {
      const turnstileToken = await getTurnstileToken();

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          commercial: Boolean(data.get("commercial")),
          turnstileToken,
        }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json.ok) {
        setSubmitError(t("error"));
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError(t("error"));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setErrors({});
    setSubmitError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {t("title")}
                </h2>
                <p className="text-sm text-gray-500">{t("subtitle")}</p>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <X size={18} className="text-gray-400" />
              </button>
            </div>

            {submitted ? (
              <div className="px-6 py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#0071BD]/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-[#0071BD]" />
                </div>
                <p className="text-lg font-medium text-gray-900">
                  {t("success")}
                </p>
                <button
                  onClick={handleClose}
                  className="mt-6 px-6 py-2.5 bg-[#0071BD] text-white rounded-xl text-sm font-medium hover:bg-[#005A97] transition-colors"
                >
                  {t("close")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("name")} *
                  </label>
                  <input
                    name="name"
                    type="text"
                    className={`w-full px-3 py-2.5 rounded-xl border ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200"} text-sm focus:outline-none focus:ring-2 focus:ring-[#0071BD]/20 focus:border-[#0071BD] transition-all`}
                    onChange={() => setErrors((p) => ({ ...p, name: false }))}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{t("required")}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("email")} *
                  </label>
                  <input
                    name="email"
                    type="email"
                    className={`w-full px-3 py-2.5 rounded-xl border ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200"} text-sm focus:outline-none focus:ring-2 focus:ring-[#0071BD]/20 focus:border-[#0071BD] transition-all`}
                    onChange={() => setErrors((p) => ({ ...p, email: false }))}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{t("required")}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("message")}
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder={t("message_placeholder")}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071BD]/20 focus:border-[#0071BD] transition-all resize-none"
                  />
                </div>

                {/* Checkboxes */}
                <div className="space-y-3 pt-2">
                  <label className={`flex items-start gap-3 cursor-pointer ${errors.kvkk ? "text-red-600" : ""}`}>
                    <input
                      name="kvkk"
                      type="checkbox"
                      className="mt-1 w-4 h-4 rounded border-gray-300 text-[#0071BD] focus:ring-[#0071BD]"
                      onChange={() => setErrors((p) => ({ ...p, kvkk: false }))}
                    />
                    <span className="text-xs text-gray-600 leading-relaxed">
                      {t("kvkk_before")}
                      <Link
                        href="/kvkk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-[#0071BD] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t("kvkk_link")}
                      </Link>
                      {t("kvkk_after")} *
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      name="commercial"
                      type="checkbox"
                      className="mt-1 w-4 h-4 rounded border-gray-300 text-[#0071BD] focus:ring-[#0071BD]"
                    />
                    <span className="text-xs text-gray-600 leading-relaxed">
                      {t("commercial")}
                    </span>
                  </label>
                </div>

                {/* Invisible Turnstile widget */}
                <div ref={turnstileContainerRef} />

                {/* Error banner */}
                {submitError && (
                  <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                    {submitError}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#0071BD] hover:bg-[#005A97] text-white font-medium rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    t("submit")
                  )}
                </button>
                <p className="text-xs text-gray-400 text-center">{t("submit_note")}</p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
