const radiosStatus = Array.from(document.getElementsByName("status"));
const campoReserva = document.getElementById("campo-reserva");
const campoPedido = document.getElementById("campo-pedido");
const campoCanal = document.getElementById("campo-canal");
const dataLimiteInput = document.getElementById("data-limite");

// Campos para controle de visibilidade
const inputCliente = document.getElementById("cliente");
const labelCliente = document.querySelector('label[for="cliente"]');
const inputTelefone = document.getElementById("telefone");
const labelTelefone = document.querySelector('label[for="telefone"]');
const grupoLocal = document.querySelectorAll('input[name="local"]')[0]?.closest(".checkbox-group");
const labelLocal = document.querySelector('label:has(input[name="local"])');

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

  if (status === "pago") {
    campoReserva.style.display = "none";
    campoCanal.style.display = "block"; // agora pedido pago também tem canal
    campoPedido.style.display = "none";
    mostrarCamposCliente(true);
    mostrarCampoLocal(true);
    dataLimiteInput.value = calcularDataLimite(status);
    dataLimiteInput.readOnly = true;
    atualizarCanal(); // controla a exibição do número do pedido
  } 
  else if (status === "nao_pago") {
    campoReserva.style.display = "block";
    campoCanal.style.display = "block";
    campoPedido.style.display = "none";
    mostrarCamposCliente(true);
    mostrarCampoLocal(true);
    dataLimiteInput.value = "";
    dataLimiteInput.readOnly = false;
    dataLimiteInput.placeholder = "Digite a data limite (ex: 20/10/2025)";
    atualizarCanal();
  } 
  else if (status === "ev_amazon") {
    campoReserva.style.display = "block";
    campoCanal.style.display = "none";
    campoPedido.style.display = "block";
    mostrarCamposCliente(false);
    mostrarCampoLocal(true);
    dataLimiteInput.value = "";
    dataLimiteInput.readOnly = false;
    dataLimiteInput.placeholder = "Digite a data limite (ex: 20/10/2025)";
  }
}

function mostrarCamposCliente(visible) {
  inputCliente.style.display = visible ? "block" : "none";
  inputTelefone.style.display = visible ? "block" : "none";
  if (labelCliente) labelCliente.style.display = visible ? "block" : "none";
  if (labelTelefone) labelTelefone.style.display = visible ? "block" : "none";
}

function mostrarCampoLocal(visible) {
  if (grupoLocal) grupoLocal.style.display = visible ? "flex" : "none";
  if (labelLocal) labelLocal.style.display = visible ? "block" : "none";
}

function atualizarCanal() {
  const status = document.querySelector('input[name="status"]:checked').value;
  const canalSelecionado = document.querySelector('input[name="canal"]:checked');
  const canal = canalSelecionado ? canalSelecionado.value : "";

  // Regras para exibir ou esconder o número do pedido
  if (
    (status === "pago" && canal === "Site") ||
    (status === "nao_pago" && canal === "Site") ||
    status === "ev_amazon"
  ) {
    campoPedido.style.display = "block";
  } else {
    campoPedido.style.display = "none";
  }
}

radiosStatus.forEach((r) => r.addEventListener("change", atualizarStatus));
document.querySelectorAll('input[name="canal"]').forEach((c) => c.addEventListener("change", atualizarCanal));
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
        status === "pago"
          ? "Pedido Pago"
          : status === "nao_pago"
          ? "Pedido Não Pago"
          : "Pedido EV/Amazon"
      }</p>
    `;

  if (reserva && (status === "nao_pago" || status === "ev_amazon")) {
    etiquetaHTML += `<p><strong>Reserva:</strong> ${reserva}</p>`;
  }

  if (
    (status === "pago" && canal === "Site") ||
    (status === "nao_pago" && canal === "Site") ||
    status === "ev_amazon"
  ) {
    etiquetaHTML += `<p><strong>Pedido:</strong> ${pedido}</p>`;
  }

  if (status !== "ev_amazon") {
    etiquetaHTML += `<p><strong>Canal:</strong> ${canal}</p>`;
  }

  etiquetaHTML += `<p><strong>Local:</strong> ${local}</p>`;

  if (status !== "ev_amazon") {
    etiquetaHTML += `
      <p><strong>Cliente:</strong> ${cliente}</p>
      <p><strong>Telefone:</strong> ${telefone}</p>
    `;
  }

  etiquetaHTML += `<p><strong>Data Limite:</strong> ${dataLimite || "-"}</p>`;
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
    document.querySelector('input[name="canal"][value="Site"]').checked = true;

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