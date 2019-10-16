import sqlite3
from flask import jsonify
from app.AppConstants import DATABASE_FILENAME


def get_network_usage():
    conn = sqlite3.connect(DATABASE_FILENAME)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM NETWORK ORDER BY id DESC LIMIT 20")
    l = [list(row[1:]) for row in cursor.fetchall()[::-1]]
    conn.close()
    up = []
    down = []
    for i in l:
        up.append(i[0])
        down.append(i[1])
    return jsonify({"up": up, "down": down})
