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
    />
  );
}
