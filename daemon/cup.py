import psutil
import sqlite3
import os

from app.AppConstants import DATABASE_FILENAME


class cup:
    def __init__(self):
        pass

    def getcup(self):
        return psutil.cpu_percent(percpu=True, interval=1)


if __name__ == "__main__":
    if not (os.path.exists(DATABASE_FILENAME)):
        conn = sqlite3.connect(DATABASE_FILENAME)

        s = """CREATE TABLE CPU (ID INTEGER PRIMARY KEY AUTOINCREMENT"""

        for i in range(psutil.cpu_count()):
            s += ", CORE" + str(i) + " INT NOT NULL"
        s += ", DATETIME datetime default current_timestamp);"
        conn.execute(s)
        s = """CREATE TABLE NETWORK 
        (ID INTEGER PRIMARY KEY AUTOINCREMENT,
        UPLOAD INT NOT NULL,
        DOWNLOAD INT NOT NULL,
        DATETIME datetime default current_timestamp);"""
        conn.execute(s)
    else:
        conn = sqlite3.connect(DATABASE_FILENAME)

    cpu_object = cup()
    initial_down = psutil.net_io_counters().bytes_recv
    initial_up = psutil.net_io_counters().bytes_sent
    while True:
        try:
            now_down = psutil.net_io_counters().bytes_recv
            now_up = psutil.net_io_counters().bytes_sent
            download_speed = (now_down - initial_down) / 1000
            upload_speed = (now_up - initial_up) / 1000
            network_query = (
                " INSERT INTO NETWORK (UPLOAD,DOWNLOAD) VALUES ("
                + str(upload_speed)
                + ","
                + str(download_speed)
                + ");"
            )
            conn.execute(network_query)

            core_insert_query = "INSERT INTO CPU ("
            core_values = "VALUES ("
            cup_usage = cpu_object.getcup()
            for i in range(psutil.cpu_count()):
                core_insert_query += "CORE" + str(i) + ", "
                core_values += str(cup_usage[i]) + ","
            core_insert_query = core_insert_query[:-2] + ") " + core_values[:-1] + ")"
            conn.execute(core_insert_query)
            conn.commit()
            initial_down = now_down
            initial_up = now_up
        except KeyboardInterrupt:
            conn.close()
            break
