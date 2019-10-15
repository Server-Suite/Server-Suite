#!flask/bin/python
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


@app.route("/network/ip")
@cross_origin()
def get_combined_cpu_usage_per_core():
    import geocoder

    g = geocoder.ip("me")
    return jsonify(g.latlng)


if __name__ == "__main__":
    app.run(debug=True)
