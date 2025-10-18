const radiosStatus = Array.from(document.getElementsByName("status"));
const campoReserva = document.getElementById("campo-reserva");
const dataLimiteInput = document.getElementById("data-limite");

function calcularDataLimite(status) {
  const hoje = new Date();
  if (status === "pago") {
    hoje.setDate(hoje.getDate() + 60);
    return hoje.toLocaleDateString("pt-BR");
  }
  return ""; // deixa vazio se não for pago
}

function atualizarStatus() {
  const status = document.querySelector('input[name="status"]:checked').value;
  const campoReservaVisivel = status === "nao_pago";

  // mostra ou oculta campo de reserva
  campoReserva.style.display = campoReservaVisivel ? "block" : "none";

  // controla o campo de data limite
  if (status === "pago") {
    dataLimiteInput.value = calcularDataLimite(status);
    dataLimiteInput.readOnly = true; // bloqueia edição
  } else {
    dataLimiteInput.value = "";
    dataLimiteInput.readOnly = false; // libera edição manual
    dataLimiteInput.placeholder = "Digite a data limite (ex: 20/10/2025)";
  }
}

// garante que todos os radios disparem a atualização
radiosStatus.forEach((r) => r.addEventListener("change", atualizarStatus));
atualizarStatus();

function gerarEtiquetaHTML() {
  const status = document.querySelector('input[name="status"]:checked').value;
  const reserva = document.getElementById("reserva").value.trim();
  const pedido = document.getElementById("pedido").value.trim();
  const localEl = document.querySelector('input[name="local"]:checked');
  const local = localEl ? localEl.value : "";
  const cliente = document.getElementById("cliente").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const dataLimite = document.getElementById("data-limite").value.trim();

  let etiquetaHTML = `
      <img src="./logoosebocultural.jpg" style="max-width:80px; margin:auto; display:block;">
      <p><strong>Status:</strong> ${
        status === "pago" ? "Pedido Pago" : "Pedido Não Pago"
      }</p>
    `;

  if (status === "nao_pago" && reserva) {
    etiquetaHTML += `<p><strong>Reserva:</strong> ${reserva}</p>`;
  }

  etiquetaHTML += `
      <p><strong>Pedido:</strong> ${pedido}</p>
      <p><strong>Local:</strong> ${local}</p>
      <p><strong>Cliente:</strong> ${cliente}</p>
      <p><strong>Telefone:</strong> ${telefone}</p>
      <p><strong>Data Limite:</strong> ${dataLimite || "-"}</p>
    `;

  return etiquetaHTML;
}

function gerarEtiqueta() {
  const etiquetaDiv = document.getElementById("etiqueta");
  etiquetaDiv.innerHTML = gerarEtiquetaHTML();
  etiquetaDiv.style.display = "block";
}

// Função chamada pelo botão <button onclick="imprimirEtiqueta()">
function imprimirEtiqueta() {
  // Gera a etiqueta na tela
  gerarEtiqueta();

  // Abre diálogo de impressão
  window.print();

  // Aguarda 1s para garantir que o print seja iniciado antes de limpar (ajustável)
  setTimeout(() => {
    // Limpa campos individualmente (não dependemos de <form>)
    // Radios status -> reset para "pago" (padrão)
    const radioPago = document.querySelector(
      'input[name="status"][value="pago"]'
    );
    if (radioPago) radioPago.checked = true;

    // Radios local -> reset para "Centro"
    const radioCentro = document.querySelector(
      'input[name="local"][value="Centro"]'
    );
    if (radioCentro) radioCentro.checked = true;

    // Limpa inputs textuais
    const idsToClear = ["reserva", "pedido", "cliente", "telefone"];
    idsToClear.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });

    // Restaura campo de data limite ao estado inicial (bloqueado)
    dataLimiteInput.value = "";
    dataLimiteInput.readOnly = true;
    dataLimiteInput.placeholder = "Selecione o status primeiro";

    // Esconde campo-reserva
    campoReserva.style.display = "none";

    // Limpa a pré-visualização
    const etiquetaDiv = document.getElementById("etiqueta");
    etiquetaDiv.innerHTML = "";
    etiquetaDiv.style.display = "none";

    // garante que eventuais listeners atualizem o estado corretamente
    atualizarStatus();
  }, 1000);
}