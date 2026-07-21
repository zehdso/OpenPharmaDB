from pathlib import Path
import json


PUBLISHED = Path("data/published/recalls.json")


def test_published_exists():
    assert PUBLISHED.exists()


def test_published_is_list():
    with PUBLISHED.open("r", encoding="utf-8") as f:
        data = json.load(f)

    assert isinstance(data, list)


def test_not_empty():
    with PUBLISHED.open("r", encoding="utf-8") as f:
        data = json.load(f)

    assert len(data) > 0


def test_required_fields():
    with PUBLISHED.open("r", encoding="utf-8") as f:
        data = json.load(f)

    required = {
        "schema_version",
        "id",
        "regulator",
        "country",
        "title",
        "product",
        "category",
        "classification",
        "reason",
        "recall_date",
        "url",
        "extras",
    }

    for record in data:
        assert required.issubset(record.keys())


def test_unique_regulator_id():
    with PUBLISHED.open("r", encoding="utf-8") as f:
        data = json.load(f)

    seen = set()

    for record in data:
        key = (record["regulator"], record["id"])
        assert key not in seen
        seen.add(key)