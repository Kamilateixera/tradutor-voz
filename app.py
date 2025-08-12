from flask import Flask, render_template, request, jsonify
from main import traduzir_texto
import speech_recognition as sr

app = Flask(__name__)

def ouvir_microfone(idioma_origem='pt'):
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("🎤 Diga algo...")
        try:
            audio = r.listen(source, timeout=5, phrase_time_limit=10)
            frase = r.recognize_google(audio, language=idioma_origem)
            return frase
        except sr.WaitTimeoutError:
            return "Erro: Nenhuma fala detectada (tempo limite)"
        except sr.UnknownValueError:
            return "Erro: Não foi possível reconhecer a fala"
        except sr.RequestError as e:
            return f"Erro ao requisitar o serviço: {e}"

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
