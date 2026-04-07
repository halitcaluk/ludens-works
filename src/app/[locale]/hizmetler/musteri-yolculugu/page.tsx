"use client";

import { Route } from "lucide-react";
import ServiceDetail from "@/components/ServiceDetail";
import { serviceDetailImages } from "@/lib/images";

export default function CustomerJourneyPage() {
  return (
    <ServiceDetail
      serviceKey="s2"
      icon={Route}
      color="from-blue-500 to-cyan-500"
      heroImage={serviceDetailImages.s2_hero}
      detailImage={serviceDetailImages.s2_detail}
      features={[
        "Welcome & onboarding serisi tasar\u0131m\u0131",
        "Cart abandonment ak\u0131\u015flar\u0131",
        "Post-purchase journey'ler",
        "Win-back & re-engagement kampanyalar\u0131",
        "Cross-sell & upsell otomasyonlar\u0131",
        "\u00c7ok kanall\u0131 (email, SMS, push) orkestrasyon",
        "Lifecycle stage tan\u0131mlama ve ge\u00e7i\u015f kurallar\u0131",
      ]}
      tools={["Klaviyo", "Braze", "Iterable", "Customer.io", "Mailchimp"]}
    />
  );
}
