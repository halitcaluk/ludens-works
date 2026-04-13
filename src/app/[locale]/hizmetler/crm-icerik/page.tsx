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
    />
  );
}
