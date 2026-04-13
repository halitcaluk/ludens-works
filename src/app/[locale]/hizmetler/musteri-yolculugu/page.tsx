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
    />
  );
}
