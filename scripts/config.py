from pathlib import Path

# Project root
PROJECT_ROOT = Path(__file__).resolve().parent.parent

# Data directories
RAW_DATA_DIR = PROJECT_ROOT / "data" / "raw"
NORMALIZED_DATA_DIR = PROJECT_ROOT / "data" / "normalized"

# Source-specific directories
FDA_RAW_DIR = RAW_DATA_DIR / "fda"

# API settings
FDA_ENFORCEMENT_API = "https://api.fda.gov/drug/enforcement.json"

# HTTP settings
REQUEST_TIMEOUT = 30

HEADERS = {
    "User-Agent": "OpenPharmaDB/0.1 (+https://github.com/zehdso/OpenPharmaDB)"
}