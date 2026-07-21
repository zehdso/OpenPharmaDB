from pathlib import Path
import json


NORMALIZED_DIR = Path("data/normalized")
PUBLISHED_DIR = Path("data/published")
OUTPUT_FILE = PUBLISHED_DIR / "recalls.json"


def load_recalls():
    recalls = []

    if not NORMALIZED_DIR.exists():
        return recalls

    for regulator_dir in sorted(NORMALIZED_DIR.iterdir()):
        if not regulator_dir.is_dir():
            continue

        recalls_file = regulator_dir / "recalls.json"

        if not recalls_file.exists():
            continue

        with recalls_file.open("r", encoding="utf-8") as f:
            data = json.load(f)

        if isinstance(data, list):
            recalls.extend(data)

    return recalls


def sort_recalls(recalls):
    return sorted(
        recalls,
        key=lambda r: (
            r.get("recall_date") or "",
            r.get("country") or "",
            r.get("id") or "",
        ),
        reverse=True,
    )


def remove_duplicates(recalls):
    seen = set()
    unique = []

    for recall in recalls:
        key = (
            recall.get("regulator"),
            recall.get("id"),
        )

        if key in seen:
            continue

        seen.add(key)
        unique.append(recall)

    return unique


def merge():
    recalls = load_recalls()
    recalls = remove_duplicates(recalls)
    recalls = sort_recalls(recalls)

    PUBLISHED_DIR.mkdir(parents=True, exist_ok=True)

    with OUTPUT_FILE.open("w", encoding="utf-8") as f:
        json.dump(recalls, f, indent=2, ensure_ascii=False)

    print(f"Merged {len(recalls)} recalls.")
    print(f"Output: {OUTPUT_FILE}")


if __name__ == "__main__":
    merge()