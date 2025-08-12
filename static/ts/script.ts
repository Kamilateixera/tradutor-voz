// Tipos auxiliares para eventos
type SpeechRecognitionResultEvent = Event & {
  results: SpeechRecognitionResultList;
};

type SpeechRecognitionErrorEvent = Event & {
  error: string;
};

// Usa nome alternativo para evitar conflito de escopo com 'SpeechRecognition'
const ReconhecimentoVoz =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

document.addEventListener("DOMContentLoaded", () => {
  const btnGravar = document.getElementById("btnGravar") as HTMLButtonElement;
  const textoReconhecidoSpan = document.getElementById("textoReconhecido") as HTMLSpanElement;
  const traducaoSpan = document.getElementById("traducao") as HTMLSpanElement;

  btnGravar.onclick = () => {
    if (!ReconhecimentoVoz) {
      alert("Seu navegador não suporta reconhecimento de voz.");
      return;
    }

    const recognition = new ReconhecimentoVoz();
    recognition.lang = (document.getElementById("origem") as HTMLInputElement).value || "pt-BR";

    recognition.start();

    recognition.onresult = async (event: SpeechRecognitionResultEvent) => {
      const texto = event.results[0][0].transcript;
      textoReconhecidoSpan.textContent = texto;

      try {
        const response = await fetch("/traduzir", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            texto: texto,
            origem: (document.getElementById("origem") as HTMLInputElement).value,
            destino: (document.getElementById("destino") as HTMLInputElement).value
          })
        });

        const data = await response.json();

        if (data.sucesso) {
          traducaoSpan.textContent = data.traducao;

          const utterance = new SpeechSynthesisUtterance(data.traducao);
          utterance.lang = (document.getElementById("destino") as HTMLInputElement).value;
          speechSynthesis.speak(utterance);
        } else {
          traducaoSpan.textContent = "Erro: " + data.erro;
        }
      } catch (error) {
        traducaoSpan.textContent = "Erro ao se comunicar com o servidor.";
        console.error(error);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      alert("Erro no reconhecimento de voz: " + event.error);
    };

    recognition.onend = () => {
      console.log("Reconhecimento finalizado.");
    };
  };
});
