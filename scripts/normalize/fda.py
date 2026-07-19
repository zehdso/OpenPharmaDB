import json
from pathlib import Path

from scripts.config import FDA_RAW_DIR
from scripts.utils import format_date

OUTPUT_FILE = Path("data/normalized/recalls/fda_recalls.json")


def normalize_record(record):
    return {
        "id": record.get("event_id"),
        "source": "FDA",
        "country": "US",
        "status": record.get("status"),
        "classification": record.get("classification"),
        "product_name": record.get("product_description"),
        "generic_name": None,
        "manufacturer": record.get("recalling_firm"),
        "reason": record.get("reason_for_recall"),
        "affected_lots": (
            [record["code_info"]]
            if record.get("code_info")
            else []
        ),
        "distribution": record.get("distribution_pattern"),
        "recall_date": format_date(record.get("recall_initiation_date")),
        "termination_date": format_date(record.get("termination_date")),
        "official_url": None,
        "raw_source": {
            "authority": "FDA",
            "dataset": "Drug Enforcement Reports",
            "api": "openFDA",
        },
    }


def load_all_records():
    pages_dir = FDA_RAW_DIR / "pages"
    records = []

    for page_file in sorted(pages_dir.glob("page_*.json")):
        with page_file.open("r", encoding="utf-8") as f:
            data = json.load(f)

        records.extend(data.get("results", []))

    return records


def main():
    raw_records = load_all_records()

    normalized = [normalize_record(record) for record in raw_records]

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

    with OUTPUT_FILE.open("w", encoding="utf-8") as f:
        json.dump(normalized, f, indent=2)

    print(f"Normalized {len(normalized)} records.")


if __name__ == "__main__":
    main()