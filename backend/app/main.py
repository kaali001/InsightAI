from fastapi import FastAPI
from app.auth.routes import router as auth_router
from app.feedback.routes import router as feedback_router
from app.auth.routes import router as auth_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="InsightAI Backend")

# CORS settings
origins = [
    "http://localhost:5173",       # Frontend local dev (Vite)
    "https://your-frontend.com",   # deployed frontend url
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            
    allow_credentials=True,
    allow_methods=["*"],                 # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],                 # Allow all headers
)




app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
app.include_router(feedback_router, prefix="/api/feedback", tags=["Feedback"])





@app.get("/")
async def root():
    return {"message": "InsightAI backend is running 🚀"}



