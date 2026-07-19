import json

from scripts.config import FDA_RAW_DIR, NORMALIZED_DATA_DIR
from scripts.utils import format_date


def normalize_record(record):
    """Convert an FDA recall record to the OpenPharmaDB schema."""

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
        "recall_date": format_date(record.get("recall_initiation_date")),
        "termination_date": format_date(record.get("termination_date")),
        "affected_lots": [],
        "distribution": record.get("distribution_pattern"),
        "official_url": None,
        "raw_source": record,
    }


def main():
    input_file = FDA_RAW_DIR / "latest.json"
    output_dir = NORMALIZED_DATA_DIR / "recalls"
    output_dir.mkdir(parents=True, exist_ok=True)

    with input_file.open("r", encoding="utf-8") as f:
        data = json.load(f)

    records = data.get("results", [])
    normalized = [normalize_record(record) for record in records]

    output_file = output_dir / "fda_recalls.json"

    with output_file.open("w", encoding="utf-8") as f:
        json.dump(normalized, f, indent=2)

    print(f"Normalized {len(normalized)} records")
    print(f"Saved: {output_file}")


if __name__ == "__main__":
    main()