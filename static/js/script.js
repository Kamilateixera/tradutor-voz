const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

document.addEventListener("DOMContentLoaded", () => {
  const btnGravar = document.getElementById("btnGravar");
  const textoReconhecidoSpan = document.getElementById("textoReconhecido");
  const traducaoSpan = document.getElementById("traducao");

  btnGravar.onclick = () => {
    if (!SpeechRecognition) {
      alert("Seu navegador não suporta reconhecimento de voz");
      return;
    }

    const recognition = new SpeechRecognition();

    // Usa o código completo (ex.: pt-BR) para reconhecimento
    recognition.lang = document.getElementById("origem").value || "pt-BR";

    recognition.start();

    recognition.onresult = async (event) => {
      const texto = event.results[0][0].transcript;
      textoReconhecidoSpan.textContent = texto;

      const origemSelect = document.getElementById("origem").value;
      const destinoSelect = document.getElementById("destino").value;

      // Para o tradutor, enviamos só o código curto (ex.: "pt" ao invés de "pt-BR")
      const origemCurta = origemSelect.split("-")[0];

      const response = await fetch("/traduzir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          texto: texto,
          origem: origemCurta,
          destino: destinoSelect
        })
      });

      const data = await response.json();

      if (data.sucesso) {
        traducaoSpan.textContent = data.traducao;

        const utterance = new SpeechSynthesisUtterance(data.traducao);
        utterance.lang = destinoSelect;
        speechSynthesis.speak(utterance);
      } else {
        traducaoSpan.textContent = "Erro: " + data.erro;
      }
    };

    recognition.onerror = (event) => {
      alert("Erro no reconhecimento: " + event.error);
    };

    recognition.onend = () => {
      console.log("Reconhecimento finalizado.");
    };
  };
});
