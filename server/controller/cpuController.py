#!flask/bin/python
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import requests, os
from server.processor.cpu.info import CpuInfo
import server.processor.filesystem.fs as fs
import server.processor.network.network as network

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


@app.route("/system/loc")
@cross_origin()
def getGeoLoc():
    return requests.get("http://ipinfo.io/json").json()


@app.route("/docker/<path:path>")
@cross_origin()
def getDockerContainers(path):
    return jsonify(requests.get("http://localhost:2375/" + path).json())


@app.route("/system/cpu")
@cross_origin()
def get_combined_cpu_usage_per_core():
    cpu_info = CpuInfo()
    return cpu_info.get_combined_cpu_usage_per_core()


@app.route("/system/core")
@cross_origin()
def get_isolate_cpu_usage_per_core():
    cpu_info = CpuInfo()
    return cpu_info.get_isolate_cpu_usage_per_core()


@app.route("/fs")
@cross_origin()
def fileSystem():
    return jsonify(fs.get_partitions_and_capacities())


@app.route("/network/speed")
@cross_origin()
def netSpeed():
    return network.get_network_usage()


@app.route("/files/<path:path>")
@cross_origin()
def filesByPath(path):
    response = path_hierarchy(path, True)
    return jsonify(response)


def path_hierarchy(path, flag):
    hierarchy = {"type": "folder", "name": os.path.basename(path), "path": path}
    if flag:
        try:
            hierarchy["children"] = [
                path_hierarchy(os.path.join(path, contents), False)
                for contents in os.listdir(path)
            ]
        except OSError as e:
            if e.errno != e.ENOTDIR:
                raise
            hierarchy["type"] = "file"

    return hierarchy


if __name__ == "__main__":
    app.run(debug=True)
