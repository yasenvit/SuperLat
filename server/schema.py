import sqlite3


DBFILENAME = "superlative.db"


def create_db(dbfilename=DBFILENAME):
    with sqlite3.connect(dbfilename) as conn:
        cur = conn.cursor()

        SQL = """ DROP TABLE IF EXISTS sessions;"""
        cur.execute(SQL)

        SQL = """
        CREATE TABLE sessions (
            pk INTEGER PRIMARY KEY AUTOINCREMENT,
            api_key VARCHAR(255),
            session_id VARCHAR(128),
            token VARCHAR(255),     
            time FLOAT
        );
        """
        cur.execute(SQL)


if __name__ == "__main__":
    create_db(DBFILENAME)
