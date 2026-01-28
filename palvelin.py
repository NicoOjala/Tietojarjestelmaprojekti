from flask import Flask, request, send_file, jsonify, render_template
import urllib.request
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

data=urllib.request.urlopen("https://users.metropolia.fi/~peterh/mps.json")
kansanedustajat=json.load(data)

@app.route('/ek-kuva')
def ek_kuva():
    return send_file("./ek-kuva.2.jpg", mimetype="image/jpeg")

@app.route('/kansanedustajat')
def hae_kansanedustajat():
    return jsonify(kansanedustajat)

@app.route('/kansanedustajat-sivu')
def kansanedustajat_sivu():
    return render_template('kansanedustajat.html', kansanedustajat=kansanedustajat)

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=3000)

def esimerkki():
    args = request.args
    luku1 = float(args.get("luku1"))
    luku2 = float(args.get("luku2"))
    summa = luku1+luku2
    return str(summa)

