export interface Recall {
  schema_version: string;
  id: string;
  regulator: string;
  country: string;
  title: string;
  product: string;
  category: string;
  classification: string;
  reason: string;
  recall_date: string;
  url: string;
  extras: Record<string, unknown>;
}

export async function getRecalls(): Promise<Recall[]> {
  const response = await fetch("/recalls.json");

  if (!response.ok) {
    throw new Error("Failed to load recalls dataset.");
  }

  return response.json();
}
