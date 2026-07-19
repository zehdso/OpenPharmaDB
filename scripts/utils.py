from datetime import datetime


def format_date(value):
    """
    Convert YYYYMMDD to YYYY-MM-DD.
    Returns None if the value is empty or invalid.
    """
    if not value:
        return None

    try:
        return datetime.strptime(value, "%Y%m%d").strftime("%Y-%m-%d")
    except (ValueError, TypeError):
        return None