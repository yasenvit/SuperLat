import sqlite3

TABLE_SESSIONS = "sessions"
# name of the database
DATABASE = "superlative.db"


def record_session(apiKey, sessionId, token, time):
    """ insert a new session into the database """
    with sqlite3.connect(DATABASE) as conn:
        cur = conn.cursor()
        SQLPATTERN = (
            "INSERT INTO {table} (api_key,session_id,token, time) VALUES(?,?,?,?);"
        )
        SQL = SQLPATTERN.format(table=TABLE_SESSIONS)
        cur.execute(SQL, (apiKey, sessionId, token, time))


def get_session_creds():
    with sqlite3.connect(DATABASE) as conn:
        cur = conn.cursor()
        SQLPATTERN = "SELECT * FROM {table} ORDER BY pk DESC LIMIT 1"
        SQL = SQLPATTERN.format(table=TABLE_SESSIONS)
        cur.execute(SQL)
        lastrow = cur.fetchone()

        result = {
            "api_key": lastrow[1],
            "session_id": lastrow[2],
            "token": lastrow[3],
            "timestamp": lastrow[4],
        }
        return result


def send_emails(links):
    # print("1st_Link:", links[0])
    # print("2nd_Link:", links[1])
    # print("3rd_Link:", links[2])
    # print("4th_Link:", links[3])
    pass
