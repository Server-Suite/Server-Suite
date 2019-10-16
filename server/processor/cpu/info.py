import sqlite3
import psutil
from flask import jsonify


from app.AppConstants import DATABASE_FILENAME


class CpuInfo:
    def get_cores(self):
        return [("CORE" + str(core)) for core in range(psutil.cpu_count())]

    def get_combined_cpu_usage_per_core(self):
        conn = sqlite3.connect(DATABASE_FILENAME)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM CPU ORDER BY id DESC LIMIT 20")
        l = [list(row[1:]) for row in cursor.fetchall()[::-1]]
        conn.close()
        responses = []
        for i in l:
            response = {}
            for j in range(len(i) - 1):
                response.update({"CORE" + str(j): i[j]})
            response.update({"DATETIME": i[-1]})
            responses.append(response)
        return jsonify({"cpu_per_core": responses})

    def get_isolate_cpu_usage_per_core(self):
        conn = sqlite3.connect(DATABASE_FILENAME)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM CPU ORDER BY id DESC LIMIT 20")
        l = [list(row[1:]) for row in cursor.fetchall()[::-1]]
        conn.close()
        responses = {}
        cores = self.get_cores()
        for core in cores:
            responses.update({core: []})
        for i in l:
            response = {}
            for j in range(len(i) - 1):
                responses["CORE" + str(j)].append(i[j])
            response.update({"DATETIME": i[-1]})
        return jsonify({"cores": cores, "cpu_per_core": responses})

