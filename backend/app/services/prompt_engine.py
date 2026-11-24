"""
BeYou - AI Fashion Image Generation Prompt Engine
Strictly adheres to priority hierarchy and mandatory fashion constraints.
"""

from typing import Dict, Any

class FashionPromptEngine:
    """
    Dedicated prompt-building service for BeYou.
    Enforces:
    1. Women's fashion restriction.
    2. Selected clothing category (Shirts, Tops, Dresses, Jeans, Pullovers).
    3. User's custom design requirements (preserved without overriding).
    4. Selected fashion style (Casual, Formal, Partywear, Minimalist).
    5. Selected colour.
    6. Fabric preference (appropriate for the garment).
    7. Single individual garment focus (NO full outfits, NO unrelated clothing).
    8. Realistic garment proportions, believable textures, natural stitching, clean studio photography.
    """

    @classmethod
    def build_prompt(cls, request_data: Dict[str, Any]) -> str:
        category = request_data.get("category", "Dresses").strip()
        style = request_data.get("style", "Casual").strip()
        colour = request_data.get("colour", "White").strip()
        fabric = (request_data.get("fabric") or "").strip()
        custom_description = (request_data.get("description") or "").strip()

        # Handle "No preference" or empty fabric
        fabric_phrase = ""
        if fabric and fabric.lower() not in ["no preference", "none", ""]:
            fabric_phrase = f"crafted with authentic {fabric} texture and weave,"

        # Singular garment definition
        singular_category_map = {
            "Shirts": "women's shirt",
            "Tops": "women's top",
            "Dresses": "women's dress",
            "Jeans": "pair of women's jeans",
            "Pullovers": "women's pullover sweater"
        }
        garment_name = singular_category_map.get(category, f"women's {category.lower().rstrip('s')}")

        # Style definition context
        style_cues = {
            "Casual": "relaxed, effortlessly stylish, and modern everyday aesthetic",
            "Formal": "sophisticated, structured tailoring, elegant lines, and polished professional appearance",
            "Partywear": "chic occasion-wear, glamorous accents, refined statement silhouette, and evening appeal",
            "Minimalist": "understated luxury, clean geometric lines, unembellished elegance, and timeless simplicity"
        }
        style_context = style_cues.get(style, f"{style} aesthetic")

        # Assemble prompt according to strict priority order
        prompt_parts = [
            # 1 & 2: Women's fashion & exact garment category
            f"Studio fashion photograph of a single {garment_name} in {colour} for women.",
            # 3: User's custom design description (high priority)
            f"Specific design details: {custom_description}." if custom_description else "",
            # 4 & 5 & 6: Style, colour, fabric
            f"Designed in a {style} fashion style ({style_context}).",
            fabric_phrase,
            # 7: Structural & photographic constraints
            f"Strict focus: spotlight ONLY this single {garment_name}. Do NOT generate a complete outfit, unrelated garments, bags, sunglasses, footwear, or heavy decorative background. Professional fashion lookbook photography, soft diffused studio lighting, neutral minimalist background, realistic garment proportions, natural seam stitching, genuine fabric drape, and pristine construction."
        ]

        full_prompt = " ".join([p for p in prompt_parts if p.strip()])
        return full_prompt

    @classmethod
    def build_negative_constraints(cls) -> str:
        """
        Negative cues to keep generation focused strictly on single women's garments.
        """
        return (
            "men's clothing, male model, full outfit, mismatched garments, jackets, coats, shoes, sandals, "
            "bags, hats, multiple outfits, cluttered backdrop, distorted seams, asymmetrical errors, "
            "unrealistic anatomy, low resolution, blur, watermark, text"
        )
