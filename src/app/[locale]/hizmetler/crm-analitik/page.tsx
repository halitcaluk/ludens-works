"use client";

import { BarChart3 } from "lucide-react";
import ServiceDetail from "@/components/ServiceDetail";
import { serviceDetailImages } from "@/lib/images";

export default function CRMAnalyticsPage() {
  return (
    <ServiceDetail
      serviceKey="s3"
      icon={BarChart3}
      color="from-emerald-500 to-sky-600"
      heroImage={serviceDetailImages.s3_hero}
      detailImage={serviceDetailImages.s3_detail}
    />
  );
}
