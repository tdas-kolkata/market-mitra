from fastapi import FastAPI, Request, Response, HTTPException
import os

API_KEY = os.getenv("PREFECT_API_KEY")

app = FastAPI()

@app.get("/validate")
async def validate(request: Request):
    key = request.headers.get("X-API-Key")

    if key != API_KEY:
        raise HTTPException(status_code=401)

    response = Response(status_code=200)
    response.headers["Remote-User"] = "apikey-client"
    response.headers["Remote-Groups"] = "apikey-clients"
    return response
