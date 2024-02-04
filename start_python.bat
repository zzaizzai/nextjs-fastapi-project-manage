@echo off
call venv\Scripts\activate
cd api
start uvicorn index:app --host 127.0.0.1 --port 8000 --reload