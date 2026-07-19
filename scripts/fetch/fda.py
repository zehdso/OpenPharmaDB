import json
from pathlib import Path

import requests

from scripts.config import (
    FDA_ENFORCEMENT_API,
    FDA_RAW_DIR,
    HEADERS,
    REQUEST_TIMEOUT,
)

PAGE_SIZE = 100


def fetch_page(skip=0, limit=PAGE_SIZE):
    response = requests.get(
        FDA_ENFORCEMENT_API,
        headers=HEADERS,
        params={
            "skip": skip,
            "limit": limit,
        },
        timeout=REQUEST_TIMEOUT,
    )
    response.raise_for_status()
    return response.json()


def save_json(data, output_file: Path):
    output_file.parent.mkdir(parents=True, exist_ok=True)

    with output_file.open("w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)


def main():
    first_page = fetch_page()

    # Save the latest snapshot
    save_json(first_page, FDA_RAW_DIR / "latest.json")

    meta = first_page.get("meta", {})
    total = meta.get("results", {}).get("total", 0)

    print(f"Total FDA recall records: {total}")

    pages_dir = FDA_RAW_DIR / "pages"
    pages_dir.mkdir(parents=True, exist_ok=True)

    page = 1
    skip = 0

    while skip < total:
        print(f"Downloading page {page}...")

        data = fetch_page(skip=skip)

        save_json(
            data,
            pages_dir / f"page_{page:04d}.json",
        )

        skip += PAGE_SIZE
        page += 1

    print("Download complete.")


if __name__ == "__main__":
    main()