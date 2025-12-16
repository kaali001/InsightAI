# app/core/validators.py
import re
import logging
from fastapi import HTTPException

logger = logging.getLogger(__name__)


def validate_google_play_app_id(app_id: str) -> bool:
    """
    Validate Google Play app ID format.
    Format: com.company.appname (reverse domain notation)
    """
    if not app_id:
        return False
    
    # Pattern: lowercase letters, numbers, dots, underscores
    # Must have at least two segments (com.app)
    pattern = r'^[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)+$'
    
    if not re.match(pattern, app_id):
        logger.warning(f"Invalid Google Play app ID format: {app_id}")
        return False
    
    # Reasonable length check
    if len(app_id) > 150:
        logger.warning(f"Google Play app ID too long: {len(app_id)} chars")
        return False
    
    return True


def validate_app_store_app_id(app_id: str) -> bool:
    """
    Validate App Store app ID format.
    Format: numeric ID (e.g., 389801252)
    """
    if not app_id:
        return False
    
    # Must be numeric
    if not app_id.isdigit():
        logger.warning(f"Invalid App Store app ID format (not numeric): {app_id}")
        return False
    
    # Reasonable length (App Store IDs are typically 9-10 digits)
    if len(app_id) < 6 or len(app_id) > 15:
        logger.warning(f"App Store app ID unusual length: {len(app_id)} digits")
        return False
    
    return True


def validate_app_ids(
    google_play_app_id: str = None,
    app_store_app_id: str = None
) -> None:
    """
    Validate app IDs and raise HTTPException if invalid.
    At least one valid ID must be provided.
    """
    errors = []
    
    if google_play_app_id and not validate_google_play_app_id(google_play_app_id):
        errors.append(f"Invalid Google Play app ID format: '{google_play_app_id}'. Expected format: com.company.appname")
    
    if app_store_app_id and not validate_app_store_app_id(app_store_app_id):
        errors.append(f"Invalid App Store app ID format: '{app_store_app_id}'. Expected: numeric ID (e.g., 389801252)")
    
    if errors:
        logger.error(f"App ID validation failed: {errors}")
        raise HTTPException(status_code=400, detail=errors)
    
    # At least one valid ID required
    if not google_play_app_id and not app_store_app_id:
        raise HTTPException(
            status_code=400, 
            detail="At least one valid app identifier (google_play_app_id or app_store_app_id) must be provided."
        )


def sanitize_input(text: str, max_length: int = 10000) -> str:
    """Sanitize and truncate text input"""
    if not text:
        return ""
    
    # Remove null bytes and control characters (except newlines, tabs)
    sanitized = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]', '', text)
    
    # Truncate if too long
    if len(sanitized) > max_length:
        logger.debug(f"Input truncated from {len(text)} to {max_length} chars")
        sanitized = sanitized[:max_length]
    
    return sanitized.strip()
