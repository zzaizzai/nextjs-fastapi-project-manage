from typing import List, Dict, Any
import json

from decouple import config
import psycopg2

POSTGRES_URL = config('POSTGRES_URL')


class DatabaseManager:
    def __init__(self):
        self.conn = psycopg2.connect(POSTGRES_URL)
    
    def get_conn(self):
        return self.conn
    
    def get_cursor(self):
        return self.conn.cursor()
    
    def close(self):
        self.conn.close()
        
        
db_manager = DatabaseManager()


# convert to json
def fetch_all_as_dict(cursor) -> List[Dict[str, Any]]:
    rows = cursor.fetchall()
    columns = [column[0] for column in cursor.description]
    results = []
    
    for row in rows:
        row_dict = dict(zip(columns, row))
        for key, value in row_dict.items():
            if isinstance(value, str) and value.startswith('{') and value.endswith('}'):
                try:
                    row_dict[key] = json.loads(value)
                except json.JSONDecodeError:
                    pass
        results.append(row_dict)

    return results