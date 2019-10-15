#!flask/bin/python
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import requests
from server.processor.cpu.info import CpuInfo

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


if __name__ == "__main__":
    app.run(debug=True)
