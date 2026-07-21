# OpenPharmaDB

[![Tests](https://github.com/zehdso/OpenPharmaDB/actions/workflows/test.yml/badge.svg)](https://github.com/zehdso/OpenPharmaDB/actions/workflows/test.yml)

A unified, open-source pharmaceutical recall database that aggregates recall data from multiple official regulators into one consistent JSON schema.

## Features

- Unified schema across regulators
- Official regulator sources only
- Normalized JSON output
- Automated validation
- GitHub Actions CI
- Command-line search
- Extensible regulator architecture

## Supported Regulators

| Regulator | Country | Status |
|-----------|---------|--------|
| FDA | United States | ✅ |
| Health Canada | Canada | ✅ |

More regulators are planned.

---

## Architecture

```
Official Regulator
        │
        ▼
 Fetch Raw Data
        │
        ▼
 Filter Relevant Records
        │
        ▼
 Normalize
        │
        ▼
 Merge
        │
        ▼
 Validate
        │
        ▼
 Published Dataset
```

---

## Repository Structure

```text
OpenPharmaDB/
├── data/
│   ├── raw/
│   ├── normalized/
│   └── published/
├── schemas/
├── scripts/
│   ├── core/
│   └── regulators/
├── tests/
├── .github/
│   └── workflows/
├── openpharmadb.py
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/zehdso/OpenPharmaDB.git
```

Install dependencies:

```bash
pip install requests fastjsonschema pytest
```

---

## Generate Dataset

Run a regulator:

```bash
python -m scripts.regulators.health_canada
```

```bash
python -m scripts.regulators.fda
```

Merge datasets:

```bash
python -m scripts.core.merge
```

Validate:

```bash
python -m scripts.core.validate
```

Run tests:

```bash
pytest
```

---

## CLI Usage

Search recalls:

```bash
python openpharmadb.py ibuprofen
```

Filter by regulator:

```bash
python openpharmadb.py --regulator FDA
```

Filter by country:

```bash
python openpharmadb.py --country CA
```

Limit results:

```bash
python openpharmadb.py ibuprofen --limit 5
```

---

## Dataset Schema

Each record follows the same schema.

```json
{
  "schema_version": 1,
  "id": "",
  "regulator": "",
  "country": "",
  "title": "",
  "product": "",
  "category": "",
  "classification": "",
  "reason": "",
  "recall_date": "",
  "url": null,
  "extras": {}
}
```

---

## Goals

- Aggregate official pharmaceutical recall data
- Preserve regulator-specific metadata
- Provide a stable public schema
- Support automation and research
- Enable easy integration into applications

---

## Roadmap

- Additional regulators
- Better CLI search
- REST API
- Python package
- Web interface
- Incremental updates
- Release automation

---

## License

MIT License.