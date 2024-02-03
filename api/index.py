from fastapi import FastAPI
from decouple import config
import psycopg2

app = FastAPI()


POSTGRES_URL = config('POSTGRES_URL')


@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}

@app.get("/api/test")
def get_test_data():
    try:
        # PostgreSQL에 연결
        conn = psycopg2.connect(POSTGRES_URL)

        # 커서 생성
        cursor = conn.cursor()

        # test 테이블에서 모든 데이터 가져오기
        cursor.execute("SELECT * FROM test")
        data = cursor.fetchall()

        # 데이터 출력
        for row in data:
            print(row)

        # 커밋 및 연결 닫기
        conn.commit()
        cursor.close()
        conn.close()

        return {"message": "Data retrieved and printed."}
    except Exception as e:
        return {"error": str(e)}