from pathlib import Path
import json

import fastjsonschema


SCHEMA_FILE = Path("schemas/recall.schema.json")
DATA_FILE = Path("data/published/recalls.json")


def main():
    with SCHEMA_FILE.open("r", encoding="utf-8") as f:
        schema = json.load(f)

    validator = fastjsonschema.compile(schema)

    with DATA_FILE.open("r", encoding="utf-8") as f:
        recalls = json.load(f)

    errors = 0

    for index, recall in enumerate(recalls, start=1):
        try:
            validator(recall)
        except Exception as e:
            errors += 1
            print(f"[ERROR] Record {index}: {e}")

    if errors == 0:
        print(f"✓ All {len(recalls)} records are valid.")
    else:
        print(f"\nValidation failed: {errors} invalid record(s).")
        raise SystemExit(1)


if __name__ == "__main__":
    main()