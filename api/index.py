from fastapi import FastAPI

app = FastAPI()


POSTGRES_URL="postgres://default:KEuv3b8SltGD@ep-sweet-tooth-377478-pooler.ap-southeast-1.postgres.vercel-storage.com/verceldb"
POSTGRES_USER="default"
POSTGRES_HOST="ep-sweet-tooth-377478-pooler.ap-southeast-1.postgres.vercel-storage.com"
POSTGRES_PASSWORD="KEuv3b8SltGD"
POSTGRES_DATABASE="verceldb"

database_url = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}/{POSTGRES_DATABASE}"

@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}