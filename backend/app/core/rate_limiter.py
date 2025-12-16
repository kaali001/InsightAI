# app/core/rate_limiter.py
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi import Request
from fastapi.responses import JSONResponse
import logging

logger = logging.getLogger(__name__)

# Initialize rate limiter
limiter = Limiter(key_func=get_remote_address)


async def rate_limit_exceeded_handler(request: Request, exc: RateLimitExceeded):
    """Custom handler for rate limit exceeded"""
    logger.warning(f"Rate limit exceeded for IP: {get_remote_address(request)}")
    return JSONResponse(
        status_code=429,
        content={
            "detail": "Too many requests. Please try again later.",
            "retry_after": str(exc.detail)
        }
    )


# Rate limit decorators for different endpoints
# Usage: @limiter.limit("10/minute")
RATE_LIMITS = {
    "analysis": "5/minute",      # Heavy AI processing
    "scraping": "10/minute",     # External API calls
    "upload": "20/minute",       # File uploads
    "auth": "10/minute",         # Auth endpoints
    "default": "60/minute"       # Default rate
}
