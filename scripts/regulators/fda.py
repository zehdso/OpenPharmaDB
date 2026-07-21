from pathlib import Path
import json
import requests

from scripts.core.base import BaseRegulator


RAW_FILE = Path("data/raw/fda/latest.json")
FILTERED_FILE = Path("data/raw/fda/filtered.json")
NORMALIZED_FILE = Path("data/normalized/fda/recalls.json")

DATA_URL = "https://api.fda.gov/food/enforcement.json?limit=1000"


class FDARegulator(BaseRegulator):
    name = "FDA"
    country = "US"

    def fetch(self):
        print("Downloading FDA recalls...")

        response = requests.get(DATA_URL, timeout=60)
        response.raise_for_status()

        data = response.json().get("results", [])

        RAW_FILE.parent.mkdir(parents=True, exist_ok=True)

        with RAW_FILE.open("w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        print(f"Downloaded {len(data)} records.")

    def filter(self):
        with RAW_FILE.open("r", encoding="utf-8") as f:
            data = json.load(f)

        filtered = data

        with FILTERED_FILE.open("w", encoding="utf-8") as f:
            json.dump(filtered, f, indent=2, ensure_ascii=False)

        print(f"Filtered {len(filtered)} records.")

    def normalize(self):
        with FILTERED_FILE.open("r", encoding="utf-8") as f:
            records = json.load(f)

        normalized = []

        mapped = {
            "event_id",
            "product_description",
            "classification",
            "reason_for_recall",
            "recall_initiation_date",
            "more_code_info",
        }

        for record in records:
            extras = {
                k: v
                for k, v in record.items()
                if k not in mapped
            }

            normalized.append(
                {
                    "schema_version": 1,
                    "id": str(record.get("event_id", "")),
                    "regulator": self.name,
                    "country": self.country,
                    "title": record.get("product_description"),
                    "product": record.get("product_description"),
                    "category": None,
                    "classification": record.get("classification"),
                    "reason": record.get("reason_for_recall"),
                    "recall_date": record.get("recall_initiation_date"),
                    "url": None,
                    "extras": extras,
                }
            )

        NORMALIZED_FILE.parent.mkdir(parents=True, exist_ok=True)

        with NORMALIZED_FILE.open("w", encoding="utf-8") as f:
            json.dump(normalized, f, indent=2, ensure_ascii=False)

        print(f"Normalized {len(normalized)} records.")

    def validate(self):
        print("Validation handled by scripts.core.validate")


if __name__ == "__main__":
    regulator = FDARegulator()
    regulator.fetch()
    regulator.filter()
    regulator.normalize()