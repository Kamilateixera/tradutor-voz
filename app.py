from flask import Flask, render_template, request, jsonify
from main import traduzir_texto

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/traduzir", methods=["POST"])
def traduzir():
    data = request.get_json()
    texto = data.get("texto", "")
    idioma_destino = data.get("destino", "en")  
    try:
        traducao = traduzir_texto(texto, idioma_destino)
        return jsonify({"sucesso": True, "traducao": traducao})
    except Exception as e:
        return jsonify({"sucesso": False, "erro": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
