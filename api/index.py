from fastapi import FastAPI
from decouple import config
import psycopg2
from db import db_manager, fetch_all_as_dict

app = FastAPI()


@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}

@app.get("/api/test")
def get_test_data():
    try:
        # PostgreSQL에 연결
        conn = db_manager.get_conn()

        # 커서 생성
        cursor = conn.cursor()

        # test 테이블에서 모든 데이터 가져오기
        cursor.execute("SELECT * FROM test")
        
        items = fetch_all_as_dict(cursor)
        # 데이터 출력
        print(items)

        # 커밋 및 연결 닫기
        conn.commit()
        cursor.close()

        return {"message": "Data retrieved and printed."}
    except Exception as e:
        return {"error": str(e)}
    
    

@app.get("/api/create/tables")
def create_tables():
    try:
        # 커서 생성
        conn = db_manager.get_conn()
        cursor = conn.cursor()

        # 만약 'posts' 테이블이 이미 존재한다면 삭제
        cursor.execute("DROP TABLE IF EXISTS posts")

        # 'posts' 테이블 생성
        cursor.execute("""
            CREATE TABLE posts (
                id SERIAL PRIMARY KEY,
                title TEXT,
                author_id INTEGER,
                content TEXT
            )
        """)
        cursor.execute("INSERT INTO posts (title, author_id, content) VALUES ('post1','1', 'test1 content')")
        cursor.execute("INSERT INTO posts (title, author_id, content) VALUES ('post2','1', 'test1 content')")
        cursor.execute("INSERT INTO posts (title, author_id, content) VALUES ('post3','1', 'test1 content')")
        # 커밋 및 연결 닫기
        conn.commit()
        
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        cursor.close()
        
    print('create tables done')
    return {"message": "Table 'posts' created."}