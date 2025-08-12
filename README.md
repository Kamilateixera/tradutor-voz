# 🎙️ Projeto Tradutor de Voz

Este projeto é uma aplicação web desenvolvida com **Python** e **Flask** que realiza **tradução automática por voz**.  
O usuário fala no microfone, a aplicação converte a voz em texto e traduz para o idioma desejado em tempo real.

---

## 🔧 Tecnologias utilizadas
- **Python 3.8+**
- **Flask**
- **SpeechRecognition**
- **Deep Translator** ou **Googletrans**
- **HTML + CSS + JavaScript + TypeScript** 

---

## 🎯 Funcionalidades
- 🎤 Captura de áudio do usuário pelo navegador
- 📝 Transcreve voz em texto
- 🌎 Traduz automaticamente para diferentes idiomas
- 💻 Interface web simples e responsiva

---

## 🚀 Como executar

### 1️⃣ Clonar o repositório

git clone https://github.com/Kamilateixera/tradutor-voz.git
cd tradutor-voz

### 2️⃣ Criar e ativar o ambiente virtual
python -m venv venv

No Windows:
venv\Scripts\activate

No macOS/Linux:
source venv/bin/activate


### 3️⃣ Instalar as dependências
pip install -r requirements.txt

### 4️⃣ Executar o projeto
python app.py

A aplicação estará disponível em:
http://127.0.0.1:5000


---
## 📂 Estrutura do Projeto

tradutor-voz/
│
├── app.py            # Arquivo principal da aplicação Flask
├── main.py           # Funções de tradução e processamento
├── requirements.txt  # Dependências do projeto
├── .gitignore        # Arquivos/pastas ignorados pelo Git
│
├── static/           # Arquivos estáticos (CSS, JS, imagens)
├── templates/        # Templates HTML
└── venv/             # Ambiente virtual (ignorado no Git)

---
## ✍️ Autora
Kamila Teixeira Gonçalves
Desenvolvedora em formação, apaixonada por IA, Python e soluções acessíveis com tecnologia.




