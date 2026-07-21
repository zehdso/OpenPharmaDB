import json
from pathlib import Path


def ensure_directory(path: Path) -> None:
    """Create a directory if it does not already exist."""
    path.mkdir(parents=True, exist_ok=True)


def read_json(path: Path):
    """Read a JSON file."""
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def write_json(path: Path, data) -> None:
    """Write data to a JSON file."""
    ensure_directory(path.parent)

    with path.open("w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def iter_json_files(directory: Path, pattern: str = "*.json"):
    """Yield JSON files in sorted order."""
    for file in sorted(directory.glob(pattern)):
        if file.is_file():
            yield file