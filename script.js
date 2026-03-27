const radiosStatus = Array.from(document.getElementsByName("status"));
const campoReserva = document.getElementById("campo-reserva");
const campoPedido = document.getElementById("campo-pedido");
const campoCanal = document.getElementById("campo-canal");
const dataLimiteInput = document.getElementById("data-limite");
const etiquetaDiv = document.getElementById("etiqueta");
const botaoImprimir = document.getElementById("botao-imprimir");
const logoTopo = document.getElementById("logo-topo");

const inputCliente = document.getElementById("cliente");
const labelCliente = document.getElementById("label-cliente");
const inputTelefone = document.getElementById("telefone");
const labelTelefone = document.getElementById("label-telefone");
const grupoLocal =
  document.querySelector('input[name="local"]')?.closest(".checkbox-group");
const labelLocal = document.getElementById("label-local");

let limpezaPendenteAposImpressao = false;

logoTopo.src = LOGO_DATA_URL;

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
    campoCanal.style.display = "block";
    campoPedido.style.display = "none";
    mostrarCamposCliente(true);
    mostrarCampoLocal(true);
    dataLimiteInput.value = calcularDataLimite(status);
    dataLimiteInput.readOnly = true;
    dataLimiteInput.placeholder = "";
    atualizarCanal();
    return;
  }

  if (status === "nao_pago") {
    campoReserva.style.display = "block";
    campoCanal.style.display = "block";
    campoPedido.style.display = "none";
    mostrarCamposCliente(true);
    mostrarCampoLocal(true);
    dataLimiteInput.value = "";
    dataLimiteInput.readOnly = false;
    dataLimiteInput.placeholder = "Digite a data limite (ex: 20/10/2025)";
    atualizarCanal();
    return;
  }

  campoReserva.style.display = "block";
  campoCanal.style.display = "none";
  campoPedido.style.display = "block";
  mostrarCamposCliente(false);
  mostrarCampoLocal(true);
  dataLimiteInput.value = "";
  dataLimiteInput.readOnly = false;
  dataLimiteInput.placeholder = "Digite a data limite (ex: 20/10/2025)";
}

function mostrarCamposCliente(visible) {
  inputCliente.style.display = visible ? "block" : "none";
  inputTelefone.style.display = visible ? "block" : "none";
  labelCliente.style.display = visible ? "block" : "none";
  labelTelefone.style.display = visible ? "block" : "none";
}

function mostrarCampoLocal(visible) {
  if (grupoLocal) {
    grupoLocal.style.display = visible ? "flex" : "none";
  }

  if (labelLocal) {
    labelLocal.style.display = visible ? "block" : "none";
  }
}

function atualizarCanal() {
  const status = document.querySelector('input[name="status"]:checked').value;
  const canalSelecionado = document.querySelector('input[name="canal"]:checked');
  const canal = canalSelecionado ? canalSelecionado.value : "";

  if (
    (status === "pago" && canal === "Site") ||
    (status === "nao_pago" && canal === "Site") ||
    status === "ev_amazon"
  ) {
    campoPedido.style.display = "block";
    return;
  }

  campoPedido.style.display = "none";
}

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
  const dataLimite = dataLimiteInput.value.trim();

  let etiquetaHTML = `
    <img
      src="${LOGO_DATA_URL}"
      alt="Logo O Sebo Cultural"
      class="logo-etiqueta"
    >
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
    etiquetaHTML += `<p><strong>Pedido:</strong> ${pedido || "-"}</p>`;
  }

  if (status !== "ev_amazon") {
    etiquetaHTML += `<p><strong>Canal:</strong> ${canal}</p>`;
  }

  etiquetaHTML += `<p><strong>Local:</strong> ${local}</p>`;

  if (status !== "ev_amazon") {
    etiquetaHTML += `
      <p><strong>Cliente:</strong> ${cliente || "-"}</p>
      <p><strong>Telefone:</strong> ${telefone || "-"}</p>
    `;
  }

  etiquetaHTML += `<p><strong>Data Limite:</strong> ${dataLimite || "-"}</p>`;

  return etiquetaHTML;
}

function gerarEtiqueta() {
  etiquetaDiv.innerHTML = gerarEtiquetaHTML();
  etiquetaDiv.style.display = "block";
}

async function aguardarImagensDaEtiqueta() {
  const imagens = Array.from(etiquetaDiv.querySelectorAll("img"));

  await Promise.all(
    imagens.map(async (imagem) => {
      if (imagem.complete && imagem.naturalWidth > 0) {
        if (typeof imagem.decode === "function") {
          try {
            await imagem.decode();
          } catch (error) {
            // Mantém a impressão mesmo se o decode falhar após o carregamento.
          }
        }

        return;
      }

      await new Promise((resolve, reject) => {
        imagem.addEventListener("load", resolve, { once: true });
        imagem.addEventListener(
          "error",
          () => reject(new Error("A logo da etiqueta não carregou.")),
          { once: true }
        );
      });
    })
  );
}

function limparFormularioAposImpressao() {
  if (!limpezaPendenteAposImpressao) {
    return;
  }

  document.querySelector('input[name="status"][value="pago"]').checked = true;
  document.querySelector('input[name="local"][value="Centro"]').checked = true;
  document.querySelector('input[name="canal"][value="Balcão"]').checked = true;

  ["reserva", "pedido", "cliente", "telefone"].forEach((id) => {
    const elemento = document.getElementById(id);

    if (elemento) {
      elemento.value = "";
    }
  });

  dataLimiteInput.value = "";
  dataLimiteInput.readOnly = true;
  dataLimiteInput.placeholder = "Selecione o status primeiro";

  etiquetaDiv.innerHTML = "";
  etiquetaDiv.style.display = "none";

  limpezaPendenteAposImpressao = false;
  atualizarStatus();
}

async function imprimirEtiqueta() {
  gerarEtiqueta();

  try {
    await aguardarImagensDaEtiqueta();
    limpezaPendenteAposImpressao = true;
    window.print();
  } catch (error) {
    console.error(error);
    alert(
      "A logo da etiqueta ainda não carregou. Aguarde um instante e tente imprimir novamente."
    );
  }
}

window.addEventListener("afterprint", limparFormularioAposImpressao);

radiosStatus.forEach((radio) => radio.addEventListener("change", atualizarStatus));
document
  .querySelectorAll('input[name="canal"]')
  .forEach((radio) => radio.addEventListener("change", atualizarCanal));
botaoImprimir.addEventListener("click", imprimirEtiqueta);

atualizarStatus();
