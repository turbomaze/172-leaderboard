from flask import Flask, request, json, jsonify, render_template, send_from_directory
from datetime import datetime

app = Flask(__name__)

file_name = 'js/data.json'

@app.route("/")
def hello():
    return render_template("index.html")

@app.route("/js/<path:path>")
def send_js(path):
    return send_from_directory("js", path)

def parse_output(s):
    return s

def get_nugget(perf_idx):
    return {
        "perf_idx": perf_idx,
        "time": str(datetime.now())
    }

@app.route("/submit", methods=["POST"])
def submit():
    perf_idx = parse_output(request.form["perf"])
    if len(perf_idx) > 0:
        data = json.load(open(file_name))
        nugget = get_nugget(perf_idx)
        data.append(nugget)
        with open(file_name, "w") as f:
            json.dump(data, f)
        return jsonify(nugget)
    else:
        return "malformed"
