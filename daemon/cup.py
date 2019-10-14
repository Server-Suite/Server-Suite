import psutil
import sqlite3
import os

from app.AppConstants import CPU_DATABASE_FILENAME


class cup:
    def __init__(self):
        pass

    def getcup(self):
        return psutil.cpu_percent(percpu=True, interval=1)


if __name__ == "__main__":
    if not (os.path.exists(CPU_DATABASE_FILENAME)):
        conn = sqlite3.connect(CPU_DATABASE_FILENAME)

        s = """CREATE TABLE CPU (ID INTEGER PRIMARY KEY AUTOINCREMENT"""

        for i in range(psutil.cpu_count()):
            s += ", CORE" + str(i) + " INT NOT NULL"
        s += ", DATETIME datetime default current_timestamp);"
        conn.execute(s)
    else:
        conn = sqlite3.connect(CPU_DATABASE_FILENAME)
    cpu_object = cup()

    while True:
        try:
            core_insert_query = "INSERT INTO CPU ("
            core_values = "VALUES ("
            cup_usage = cpu_object.getcup()
            for i in range(psutil.cpu_count()):
                core_insert_query += "CORE" + str(i) + ", "
                core_values += str(cup_usage[i]) + ","
            core_insert_query = core_insert_query[:-2] + ") " + core_values[:-1] + ")"
            conn.execute(core_insert_query)
            conn.commit()
        except KeyboardInterrupt:
            conn.close()
            break
