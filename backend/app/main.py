from fastapi import FastAPI, Request
from app.auth.routes import router as auth_router
from app.feedback.routes import router as feedback_router
from app.project.routes import router as project_router
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
import os
import logging
from dotenv import load_dotenv
import uvicorn

load_dotenv()

# Initialize logging - skip file logging in production if logs dir doesn't exist
try:
    from app.core.logging_config import setup_logging
    setup_logging(log_level=os.getenv("LOG_LEVEL", "INFO"))
except Exception as e:
    # Fallback to basic logging if file logging fails
    logging.basicConfig(level=logging.INFO)
    print(f"Warning: File logging setup failed: {e}")

logger = logging.getLogger(__name__)

# Import rate limiter
from app.core.rate_limiter import limiter

app = FastAPI(
    title="InsightAI Backend",
    description="AI-powered feedback analysis API",
    version="1.0.0"
)

# Add rate limiter to app state
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS settings - support multiple origins for deployment
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")

# Parse multiple origins if provided (comma-separated)
origins = [origin.strip() for origin in frontend_url.split(",") if origin.strip()]

# Add common localhost origins for development
if os.getenv("ENV", "development") == "development":
    origins.extend([
        "http://localhost:5173",
        "http://localhost:3000"
    ])
    origins = list(set(origins))  # Remove duplicates

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            
    allow_credentials=True,
    allow_methods=["*"],                 
    allow_headers=["*"],                 
)

app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
app.include_router(feedback_router, prefix="/api/feedback", tags=["Feedback"])
app.include_router(project_router, prefix="/api/projects", tags=["Projects"])

@app.get("/")
async def root():
    logger.info("Root endpoint accessed")
    return {"message": "InsightAI backend is running 🚀"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.on_event("startup")
async def startup_event():
    port = os.getenv("PORT", "8000")
    env = os.getenv("ENV", "development")
    logger.info(f"InsightAI Backend starting up...")
    logger.info(f"Environment: {env}")
    logger.info(f"Port: {port}")
    logger.info(f"Configured origins: {origins}")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("InsightAI Backend shutting down...")

# Dynamic port binding for deployment
if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    is_dev = os.getenv("ENV", "development") == "development"
    uvicorn.run(
        "app.main:app", 
        host="0.0.0.0", 
        port=port, 
        reload=is_dev
    )
