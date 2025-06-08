from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router
from app.websocket.manager import websocket_router
from app.database.connection import init_db
from app.config.settings import get_settings

settings = get_settings()

# app = FastAPI(
#     title="Real-time Voting System",
#     description="A real-time voting system for internal suggestions",
#     version="1.0.0"
# )
app = FastAPI(title="Real-time Voting System")
# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(router, prefix="/api")
app.include_router(websocket_router)

@app.on_event("startup")
async def startup():
    init_db()

@app.get("/")
async def root():
    return {"message": "Real-time Voting System API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )