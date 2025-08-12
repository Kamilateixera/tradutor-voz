from deep_translator import GoogleTranslator

def traduzir_texto(texto, idioma_destino):
    return GoogleTranslator(source="auto", target=idioma_destino).translate(texto)
