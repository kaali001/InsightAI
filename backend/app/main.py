from fastapi import FastAPI
from app.auth.routes import router as auth_router
from app.feedback.routes import router as feedback_router
from app.auth.routes import router as auth_router


app = FastAPI(title="InsightAI Backend")

app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(feedback_router, prefix="/feedback", tags=["Feedback"])





@app.get("/")
async def root():
    return {"message": "InsightAI backend is running 🚀"}



