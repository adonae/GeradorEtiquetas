  const radiosStatus = document.getElementsByName("status");
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

  radiosStatus.forEach(r => r.addEventListener("change", atualizarStatus));
  atualizarStatus();

  function gerarEtiqueta() {
    const status = document.querySelector('input[name="status"]:checked').value;
    const reserva = document.getElementById("reserva").value.trim();
    const pedido = document.getElementById("pedido").value.trim();
    const local = document.querySelector('input[name="local"]:checked').value;
    const cliente = document.getElementById("cliente").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const dataLimite = document.getElementById("data-limite").value.trim();

    let etiquetaHTML = `
      <img src="logo.png" style="max-width:80px; margin:auto; display:block;">
      <p><strong>Status:</strong> ${status === "pago" ? "Pedido Pago" : "Pedido Não Pago"}</p>
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

    const etiquetaDiv = document.getElementById("etiqueta");
    etiquetaDiv.innerHTML = etiquetaHTML;
    etiquetaDiv.style.display = "block";

    window.print();
  }