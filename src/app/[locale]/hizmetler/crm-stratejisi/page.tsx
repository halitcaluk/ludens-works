"use client";

import { Target } from "lucide-react";
import ServiceDetail from "@/components/ServiceDetail";
import { serviceDetailImages } from "@/lib/images";

export default function CRMStrategyPage() {
  return (
    <ServiceDetail
      serviceKey="s1"
      icon={Target}
      color="from-sky-600 to-blue-500"
      heroImage={serviceDetailImages.s1_hero}
      detailImage={serviceDetailImages.s1_detail}
      features={[
        "CRM olgunluk analizi ve durum de\u011ferlendirmesi",
        "M\u00fc\u015fteri segmentasyon modeli tasarımı",
        "KPI framework ve hedef belirleme",
        "CRM yol haritası oluşturma",
        "Rekabet analizi ve benchmark",
        "B\u00fcy\u00fcme f\u0131rsat\u0131 haritalama",
        "Teknoloji stack de\u011ferlendirmesi",
      ]}
      tools={["Klaviyo", "HubSpot", "Braze", "Customer.io", "Segment", "Mixpanel"]}
    />
  );
}
