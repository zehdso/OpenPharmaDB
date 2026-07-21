from pathlib import Path
import json
import requests

from scripts.core.base import BaseRegulator


RAW_FILE = Path("data/raw/health_canada/latest.json")
FILTERED_FILE = Path("data/raw/health_canada/filtered.json")
NORMALIZED_FILE = Path("data/normalized/health_canada/recalls.json")

DATA_URL = (
    "https://recalls-rappels.canada.ca/sites/default/files/"
    "opendata-donneesouvertes/HCRSAMOpenData.json"
)

ALLOWED_ORGANIZATIONS = {
    "Drugs and health products",
    "Marketed health products",
    "Medical devices",
    "Controlled substances and cannabis",
}

ALLOWED_CATEGORIES = {
    "Drugs",
    "Natural health products",
    "Biologic or vaccine",
    "Cannabis",
    "Health products",
    "Veterinary drugs",
    "Radiopharmaceuticals",
    "Drugs - Natural health products",
    "Drugs - Biologic or vaccine",
}


class HealthCanadaRegulator(BaseRegulator):
    name = "Health Canada"
    country = "CA"

    def fetch(self):
        print("Downloading Health Canada dataset...")

        response = requests.get(DATA_URL, timeout=60)
        response.raise_for_status()

        data = response.json()

        RAW_FILE.parent.mkdir(parents=True, exist_ok=True)

        with RAW_FILE.open("w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        print(f"Downloaded {len(data)} records.")

    def filter(self):
        with RAW_FILE.open("r", encoding="utf-8") as f:
            data = json.load(f)

        filtered = [
            record
            for record in data
            if record.get("Organization") in ALLOWED_ORGANIZATIONS
            and record.get("Category") in ALLOWED_CATEGORIES
        ]

        with FILTERED_FILE.open("w", encoding="utf-8") as f:
            json.dump(filtered, f, indent=2, ensure_ascii=False)

        print(f"Filtered {len(data)} → {len(filtered)} records.")

    def normalize(self):
        with FILTERED_FILE.open("r", encoding="utf-8") as f:
            records = json.load(f)

        normalized = []

        mapped_fields = {
            "NID",
            "Title",
            "Product",
            "Category",
            "Recall class",
            "Issue",
            "Last updated",
            "URL",
        }

        for record in records:
            extras = {
                key: value
                for key, value in record.items()
                if key not in mapped_fields
            }

            normalized.append(
                {
                    "schema_version": 1,
                    "id": str(record.get("NID", "")),
                    "regulator": self.name,
                    "country": self.country,
                    "title": record.get("Title"),
                    "product": record.get("Product"),
                    "category": record.get("Category"),
                    "classification": record.get("Recall class"),
                    "reason": record.get("Issue"),
                    "recall_date": record.get("Last updated"),
                    "url": record.get("URL"),
                    "extras": extras,
                }
            )

        NORMALIZED_FILE.parent.mkdir(parents=True, exist_ok=True)

        with NORMALIZED_FILE.open("w", encoding="utf-8") as f:
            json.dump(normalized, f, indent=2, ensure_ascii=False)

        print(f"Normalized {len(normalized)} records.")
        print(f"Output: {NORMALIZED_FILE}")

    def validate(self):
        print("Validation not implemented yet.")


if __name__ == "__main__":
    regulator = HealthCanadaRegulator()
    regulator.fetch()
    regulator.filter()
    regulator.normalize()