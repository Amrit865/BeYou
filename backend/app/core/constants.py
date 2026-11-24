"""
BeYou - Fixed Clothing Categories & Fashion Styles Configuration
Strictly adhering to project specifications.
"""

from typing import Dict, List

# ONLY 5 APPROVED CLOTHING CATEGORIES
APPROVED_CATEGORIES: List[str] = [
    "Shirts",
    "Tops",
    "Dresses",
    "Jeans",
    "Pullovers",
]

# ONLY 4 APPROVED FASHION STYLES
APPROVED_STYLES: List[str] = [
    "Casual",
    "Formal",
    "Partywear",
    "Minimalist",
]

# CURATED COLOR OPTIONS
APPROVED_COLORS: List[str] = [
    "White",
    "Black",
    "Red",
    "Blue",
    "Pink",
    "Beige",
    "Green",
    "Custom",
]

# GARMENT-SPECIFIC RELEVANT FABRICS
FABRIC_OPTIONS_BY_CATEGORY: Dict[str, List[str]] = {
    "Shirts": ["Cotton", "Linen", "Silk", "No preference"],
    "Tops": ["Cotton", "Silk", "Linen", "No preference"],
    "Dresses": ["Cotton", "Silk", "Linen", "No preference"],
    "Jeans": ["Denim", "No preference"],
    "Pullovers": ["Wool", "Knitted fabric", "No preference"],
}

# ALL FABRICS COMBINED
ALL_APPROVED_FABRICS: List[str] = [
    "Cotton",
    "Denim",
    "Silk",
    "Wool",
    "Linen",
    "Knitted fabric",
    "No preference",
]

# VISION ANALYSIS CATEGORIES (Single Garment Singular + Unsupported)
VISION_CATEGORIES: List[str] = [
    "Shirt",
    "Top",
    "Dress",
    "Jeans",
    "Pullover",
    "Unsupported Category",
]

# VISION ANALYSIS STYLES
VISION_STYLES: List[str] = [
    "Casual",
    "Formal",
    "Partywear",
    "Minimalist",
    "Uncertain",
]
