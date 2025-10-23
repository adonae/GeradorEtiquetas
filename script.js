const radiosStatus = Array.from(document.getElementsByName("status"));
const campoReserva = document.getElementById("campo-reserva");
const campoPedido = document.getElementById("campo-pedido");
const campoCanal = document.getElementById("campo-canal");
const dataLimiteInput = document.getElementById("data-limite");

function calcularDataLimite(status) {
  const hoje = new Date();
  if (status === "pago") {
    hoje.setDate(hoje.getDate() + 60);
    return hoje.toLocaleDateString("pt-BR");
  }
  return "";
}

function atualizarStatus() {
  const status = document.querySelector('input[name="status"]:checked').value;
  const campoReservaVisivel = status === "nao_pago";

  campoReserva.style.display = campoReservaVisivel ? "block" : "none";
  campoPedido.style.display = status === "pago" ? "block" : "none";
  campoCanal.style.display = status === "nao_pago" ? "block" : "none";

  if (status === "pago") {
    dataLimiteInput.value = calcularDataLimite(status);
    dataLimiteInput.readOnly = true;
  } else {
    dataLimiteInput.value = "";
    dataLimiteInput.readOnly = false;
    dataLimiteInput.placeholder = "Digite a data limite (ex: 20/10/2025)";
  }
}

radiosStatus.forEach((r) => r.addEventListener("change", atualizarStatus));
atualizarStatus();

function gerarEtiquetaHTML() {
  const status = document.querySelector('input[name="status"]:checked').value;
  const reserva = document.getElementById("reserva").value.trim();
  const pedido = document.getElementById("pedido").value.trim();
  const canalEl = document.querySelector('input[name="canal"]:checked');
  const canal = canalEl ? canalEl.value : "";
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

  if (status === "pago") {
    etiquetaHTML += `<p><strong>Pedido:</strong> ${pedido}</p>`;
  } else {
    etiquetaHTML += `<p><strong>Canal:</strong> ${canal}</p>`;
  }

  etiquetaHTML += `
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

function imprimirEtiqueta() {
  gerarEtiqueta();
  window.print();

  setTimeout(() => {
    document.querySelector('input[name="status"][value="pago"]').checked = true;
    document.querySelector('input[name="local"][value="Centro"]').checked = true;

    ["reserva", "pedido", "cliente", "telefone"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });

    dataLimiteInput.value = "";
    dataLimiteInput.readOnly = true;
    dataLimiteInput.placeholder = "Selecione o status primeiro";

    campoReserva.style.display = "none";
    campoCanal.style.display = "none";
    campoPedido.style.display = "block";

    const etiquetaDiv = document.getElementById("etiqueta");
    etiquetaDiv.innerHTML = "";
    etiquetaDiv.style.display = "none";

    atualizarStatus();
  }, 1000);
}
