from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
  return {"message": "Hello, Backend World!"}

@app.get("/health")
async def health():
  return {"status": "ok"}