import json

import fastjsonschema


def load_validator(schema_path):
    """Load and compile a JSON schema."""
    with open(schema_path, "r", encoding="utf-8") as f:
        schema = json.load(f)

    return fastjsonschema.compile(schema)


def validate_records(records, validator):
    """Validate a list of records."""
    for index, record in enumerate(records, start=1):
        validator(record)

    print(f"Validated {len(records)} records successfully.")