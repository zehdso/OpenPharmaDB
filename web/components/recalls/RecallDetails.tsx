import type { Recall } from "@/lib/recalls";

import RecallHero from "@/components/recall/RecallHero";
import RecallMetaGrid from "@/components/recall/RecallMetaGrid";
import RecallReason from "@/components/recall/RecallReason";
import RecallActions from "@/components/recall/RecallActions";

function formatDate(date: string) {
  if (!date || date.length !== 8) return date;

  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(4, 6)) - 1;
  const day = date.slice(6, 8);

  return `${day} ${new Date(year, month).toLocaleString(undefined, {
    month: "short",
  })} ${year}`;
}

interface Props {
  recall: Recall;
}

export default function RecallDetails({ recall }: Props) {
  const title = recall.product || recall.title;
  const formattedDate = formatDate(recall.recall_date);

  return (
    <div className="space-y-6 lg:space-y-8">
      <RecallHero
        title={title}
        classification={recall.classification}
        regulator={recall.regulator}
        country={recall.country}
        date={formattedDate}
      />

      <RecallActions title={title} />

      <RecallMetaGrid
        regulator={recall.regulator}
        country={recall.country}
        classification={recall.classification}
        date={formattedDate}
      />

      <RecallReason reason={recall.reason} />
    </div>
  );
}
