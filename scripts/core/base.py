from abc import ABC, abstractmethod


class BaseRegulator(ABC):
    """Base class for all regulator integrations."""

    name = ""
    country = ""

    @abstractmethod
    def fetch(self):
        """Download the official raw dataset."""
        raise NotImplementedError

    def filter(self):
        """
        Filter the raw dataset to records relevant to OpenPharmaDB.

        Regulators with dedicated pharmaceutical datasets (e.g. FDA)
        can simply return without doing anything.
        """
        return

    @abstractmethod
    def normalize(self):
        """Convert filtered records into the canonical schema."""
        raise NotImplementedError

    @abstractmethod
    def validate(self):
        """Validate normalized records."""
        raise NotImplementedError