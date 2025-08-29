from fastapi import FastAPI
from app.auth.routes import router as auth_router
from app.feedback.routes import router as feedback_router
from app.project.routes import router as project_router
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
import uvicorn


load_dotenv()
app = FastAPI(title="InsightAI Backend")

# CORS settings
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")

# print(frontend_url)            
origins = [
    frontend_url,
]
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
    return {"message": "InsightAI backend is running 🚀"}

# # Dynamic port binding for deployment
if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000)) 
    print(port)
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)
