from fastapi import FastAPI
from pydantic import BaseModel

from db import fetch_all_as_dict, get_connection
app = FastAPI()


@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}


@app.get("/api/all/posts")
def all_posts():
    
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("select * from posts")
            rows = cur.fetchall()
            
    return rows

class PostCreate(BaseModel):
    title: str
    user_id: int
    content: str
    start_date: str
    end_date: str

@app.post("/api/posts/create")
def create_post(post_data: PostCreate):
        
    conn = get_connection()
    
    try:
        with conn.cursor() as cur:  
            cur.execute("INSERT INTO posts (title, user_id, content, start_date, end_date) VALUES (%s, %s, %s, %s, %s)",
                    (post_data.title, post_data.user_id, post_data.content, post_data.start_date, post_data.end_date))
            conn.commit()
            
        return {"message": "Post created successfully"}
        
    except Exception as e:
        conn.rollback()
        return {"message": f"Error: {str(e)}"}
    
    finally:
        conn.close()

@app.get("/api/posts/all")
def get_all_posts():

        
    conn = get_connection()
    
    try:
        with conn.cursor() as cur:  
            cur.execute("SELECT * FROM posts")
            items = fetch_all_as_dict(cur)
            print(items)
            
        return items
            
    except Exception as e:
        return 'error'
    
    finally:
        conn.close()

@app.get("/api/test")
def get_test_data():
    
    conn = get_connection()
    
    try:
        with conn.cursor() as cur:  
            cur.execute("SELECT * FROM test")
            items = fetch_all_as_dict(cur)
            print(items)
            
        return {"message": str(items)}
            
    except Exception as e:
        return {"error": str(e)}
    
    finally:
        conn.close()


@app.get("/api/create/tables")
def create_tables():
    
    conn = get_connection()
        
    try:
        with conn.cursor() as cur:  
            # 커서 생성

            # 만약 'posts' 테이블이 이미 존재한다면 삭제
            cur.execute("DROP TABLE IF EXISTS posts")

            # 'posts' 테이블 생성
            cur.execute("""
                CREATE TABLE posts (
                    id SERIAL PRIMARY KEY,
                    title TEXT,
                    user_id INTEGER,
                    content TEXT,
                    start_date DATE,
                    end_date DATE,
                    datetime_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            cur.execute("INSERT INTO posts (title, user_id, content) VALUES ('post1','1', 'test1 content')")
            cur.execute("INSERT INTO posts (title, user_id, content) VALUES ('post2','1', 'test1 content')")
            cur.execute("INSERT INTO posts (title, user_id, content) VALUES ('post3','1', 'test1 content')")
            cur.execute("INSERT INTO posts (title, user_id, content) VALUES ('post4','1', 'test1 content')")
            
            conn.commit()
            
        return {"message": "Table 'posts' created."}
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        conn.close()
        