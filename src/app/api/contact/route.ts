import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * POST /api/contact
 *
 * Expects JSON body:
 * {
 *   name: string
 *   email: string
 *   message?: string
 *   commercial?: boolean
 *   turnstileToken?: string  (from Cloudflare Turnstile widget)
 * }
 *
 * Required env vars (set in .env.local / Vercel):
 *  - RESEND_API_KEY      → from https://resend.com/api-keys
 *  - CONTACT_TO_EMAIL    → where form submissions are delivered (e.g. info@ludens.works)
 *  - CONTACT_FROM_EMAIL  → verified sender address on Resend (e.g. noreply@ludens.works)
 *                          For quick testing use: onboarding@resend.dev
 *
 * Optional (recommended for bot protection):
 *  - TURNSTILE_SECRET_KEY      → from Cloudflare Turnstile widget (server-side secret)
 *  - NEXT_PUBLIC_TURNSTILE_SITE_KEY → same widget's site key (client-side)
 */
export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

  if (!apiKey || !toEmail || !fromEmail) {
    console.error(
      "[contact] Missing env vars. Required: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL"
    );
    return NextResponse.json(
      { ok: false, error: "Server not configured" },
      { status: 500 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const commercial = Boolean(body.commercial);
  const turnstileToken = String(body.turnstileToken ?? "").trim();

  // Verify Turnstile token if the site is configured with Turnstile
  if (turnstileSecret) {
    if (!turnstileToken) {
      return NextResponse.json(
        { ok: false, error: "Captcha verification required" },
        { status: 400 }
      );
    }

    try {
      const verifyRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: turnstileSecret,
            response: turnstileToken,
          }),
        }
      );
      const verifyData = (await verifyRes.json()) as {
        success?: boolean;
        "error-codes"?: string[];
      };

      if (!verifyData.success) {
        console.error(
          "[contact] Turnstile verification failed:",
          verifyData["error-codes"]
        );
        return NextResponse.json(
          { ok: false, error: "Captcha verification failed" },
          { status: 403 }
        );
      }
    } catch (err) {
      console.error("[contact] Turnstile verification error:", err);
      return NextResponse.json(
        { ok: false, error: "Captcha verification error" },
        { status: 500 }
      );
    }
  }

  if (!name || !email) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Invalid email" },
      { status: 400 }
    );
  }

  const resend = new Resend(apiKey);

  const subject = `New CRM Analysis request from ${name}`;
  const plain = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Commercial emails opt-in: ${commercial ? "Yes" : "No"}`,
    "",
    "Message:",
    message || "(empty)",
  ].join("\n");

  const html = `
    <div style="font-family: system-ui, sans-serif; line-height: 1.6; color: #111;">
      <h2 style="margin:0 0 12px">New CRM Analysis request</h2>
      <table style="border-collapse: collapse;">
        <tr><td style="padding:4px 12px 4px 0;color:#555;">Name</td><td><strong>${escapeHtml(name)}</strong></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#555;">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#555;">Commercial opt-in</td><td>${commercial ? "Yes" : "No"}</td></tr>
      </table>
      <h3 style="margin:16px 0 4px">Message</h3>
      <p style="white-space: pre-wrap; margin:0;">${escapeHtml(message) || "<em>(empty)</em>"}</p>
    </div>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject,
      text: plain,
      html,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Failed to send email" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected error" },
      { status: 500 }
    );
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
