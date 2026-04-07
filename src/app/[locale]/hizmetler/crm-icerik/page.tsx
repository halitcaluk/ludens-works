"use client";

import { MessageSquare } from "lucide-react";
import ServiceDetail from "@/components/ServiceDetail";
import { serviceDetailImages } from "@/lib/images";

export default function CRMContentPage() {
  return (
    <ServiceDetail
      serviceKey="s4"
      icon={MessageSquare}
      color="from-orange-500 to-amber-500"
      heroImage={serviceDetailImages.s4_hero}
      detailImage={serviceDetailImages.s4_detail}
      features={[
        "Segment bazl\u0131 i\u00e7erik stratejisi",
        "Email copywriting ve mesaj optimizasyonu",
        "Email \u015fablon tasar\u0131m\u0131",
        "Subject line A/B test senaryolar\u0131",
        "\u00c7ok kanall\u0131 mesajla\u015fma (email, SMS, push)",
        "Dinamik i\u00e7erik ve ki\u015fiselle\u015ftirme",
        "\u0130\u00e7erik takvimi ve planlama",
      ]}
      tools={["Klaviyo", "Mailchimp", "Figma", "Canva", "Litmus"]}
    />
  );
}
