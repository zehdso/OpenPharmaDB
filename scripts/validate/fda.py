import json

from scripts.validate.schema import load_validator, validate_records
from scripts.config import NORMALIZED_DATA_DIR, PROJECT_ROOT


def main():
    schema_path = PROJECT_ROOT / "schemas" / "recall.schema.json"
    data_path = NORMALIZED_DATA_DIR / "recalls" / "fda_recalls.json"

    validator = load_validator(schema_path)

    with data_path.open("r", encoding="utf-8") as f:
        records = json.load(f)

    validate_records(records, validator)


if __name__ == "__main__":
    main()