#!flask/bin/python
from flask import Flask, jsonify
import sqlite3
from app.AppConstants import CPU_DATABASE_FILENAME

app = Flask(__name__)


@app.route("/cpu/usage/percore")
def index():
    conn = sqlite3.connect(CPU_DATABASE_FILENAME)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM CPU ORDER BY id DESC LIMIT 100")
    l = [list(row[1:-1]) for row in cursor.fetchall()[::-1]]
    conn.close()
    responses = []
    for i in l:
        response = {}
        for j in range(len(i)):
            response.update({"CORE" + str(j): i[j]})
        responses.append(response)
    return jsonify({"cpu_per_core": responses})


if __name__ == "__main__":
    app.run(debug=True)
