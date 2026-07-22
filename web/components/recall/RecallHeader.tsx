"use client";

import { PageHeader } from "@/components/layout/PageHeader";

type Props = {
  title: string;
};

export default function RecallHeader({
  title,
}: Props) {
  return (
    <PageHeader
      title={title}
      subtitle="Recall Details"
    />
  );
}
