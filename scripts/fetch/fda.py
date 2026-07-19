import json

import requests

from scripts.config import (
    FDA_ENFORCEMENT_API,
    FDA_RAW_DIR,
    HEADERS,
    REQUEST_TIMEOUT,
)


def fetch_page(limit=100, skip=0):
    """Fetch one page of FDA enforcement records."""
    response = requests.get(
        FDA_ENFORCEMENT_API,
        headers=HEADERS,
        params={
            "limit": limit,
            "skip": skip,
        },
        timeout=REQUEST_TIMEOUT,
    )

    response.raise_for_status()
    return response.json()


def save_raw_json(data, filename="latest.json"):
    """Save raw API response to disk."""
    FDA_RAW_DIR.mkdir(parents=True, exist_ok=True)

    output_file = FDA_RAW_DIR / filename

    with output_file.open("w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    print(f"Saved: {output_file}")


def main():
    data = fetch_page()
    save_raw_json(data)


if __name__ == "__main__":
    main()