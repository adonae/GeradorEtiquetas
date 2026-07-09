'use strict';

// ---------------------------------------------------------------------------
// Constantes
// ---------------------------------------------------------------------------

/**
 * Configuração data-driven da visibilidade dos campos do formulário.
 * Cada status define: label exibido na etiqueta, quais campos mostrar,
 * tipo de data limite (auto = calculada, manual = editável),
 * dataLimiteDias (dias a somar na data atual quando for 'auto'),
 * e condição para exibir campo Pedido (função que recebe o canal).
 */
const STATUS_CONFIG = Object.freeze({
  pago: {
    label: 'Pedido Pago',
    mostrarReserva: false,
    mostrarCanal: true,
    mostrarCliente: true,
    mostrarLocal: true,
    dataLimiteTipo: 'auto',
    dataLimiteDias: 60,
    mostrarPedido: (canal) => canal === 'Site',
  },
  nao_pago: {
    label: 'Pedido Não Pago',
    mostrarReserva: true,
    mostrarCanal: true,
    mostrarCliente: true,
    mostrarLocal: true,
    dataLimiteTipo: 'auto',
    dataLimiteDias: 5,
    mostrarPedido: (canal) => canal === 'Site',
  },
  ev_amazon: {
    label: 'Pedido EV/Amazon',
    mostrarReserva: true,
    mostrarCanal: false,
    mostrarCliente: false,
    mostrarLocal: true,
    dataLimiteTipo: 'manual',
    dataLimiteDias: 0,
    mostrarPedido: () => true,
  },
});

// ---------------------------------------------------------------------------
// Referências DOM
// ---------------------------------------------------------------------------

const campoReserva = document.getElementById('campo-reserva');
const campoPedido = document.getElementById('campo-pedido');
const campoCanal = document.getElementById('campo-canal');
const dataLimiteInput = document.getElementById('data-limite');
const etiquetaDiv = document.getElementById('etiqueta');
const botaoImprimir = document.getElementById('botao-imprimir');
const botaoLimpar = document.getElementById('botao-limpar');
const logoTopo = document.getElementById('logo-topo');
const inputCliente = document.getElementById('cliente');
const labelCliente = document.getElementById('label-cliente');
const inputTelefone = document.getElementById('telefone');
const labelTelefone = document.getElementById('label-telefone');
const grupoLocal =
  document.querySelector('input[name="local"]')?.closest('.checkbox-group');
const labelLocal = document.getElementById('label-local');

// ---------------------------------------------------------------------------
// Inicialização
// ---------------------------------------------------------------------------

logoTopo.src = LOGO_DATA_URL;

// ---------------------------------------------------------------------------
// Funções auxiliares
// ---------------------------------------------------------------------------

/** @returns {string} Valor do status selecionado ('pago', 'nao_pago' ou 'ev_amazon') */
function getStatus() {
  return document.querySelector('input[name="status"]:checked')?.value ?? 'pago';
}

/** @returns {string} Valor do canal selecionado ou string vazia */
function getCanal() {
  const el = document.querySelector('input[name="canal"]:checked');
  return el ? el.value : '';
}

/** @returns {string} Valor do local selecionado ou string vazia */
function getLocal() {
  const el = document.querySelector('input[name="local"]:checked');
  return el ? el.value : '';
}

/** Retorna a data atual somada a `dias` no formato pt-BR */
function calcularDataLimite(dias) {
  const data = new Date();
  data.setDate(data.getDate() + dias);
  return data.toLocaleDateString('pt-BR');
}

/** Exibe os campos de cliente e telefone */
function exibirCamposCliente() {
  inputCliente.classList.remove('u-hidden');
  inputTelefone.classList.remove('u-hidden');
  labelCliente.classList.remove('u-hidden');
  labelTelefone.classList.remove('u-hidden');
}

/** Oculta os campos de cliente e telefone */
function ocultarCamposCliente() {
  inputCliente.classList.add('u-hidden');
  inputTelefone.classList.add('u-hidden');
  labelCliente.classList.add('u-hidden');
  labelTelefone.classList.add('u-hidden');
}

/** Exibe o campo de local de retirada */
function exibirCampoLocal() {
  grupoLocal?.classList.remove('u-hidden');
  labelLocal?.classList.remove('u-hidden');
}

/** Oculta o campo de local de retirada */
function ocultarCampoLocal() {
  grupoLocal?.classList.add('u-hidden');
  labelLocal?.classList.add('u-hidden');
}

// ---------------------------------------------------------------------------
// Atualização dinâmica do formulário
// ---------------------------------------------------------------------------

/** Recalcula a visibilidade de todos os campos com base no status e canal */
function atualizarFormulario() {
  const status = getStatus();
  const canal = getCanal();
  const config = STATUS_CONFIG[status];

  campoReserva.classList.toggle('u-hidden', !config.mostrarReserva);
  campoCanal.classList.toggle('u-hidden', !config.mostrarCanal);

  const mostrarPedido = config.mostrarPedido(canal);
  campoPedido.classList.toggle('u-hidden', !mostrarPedido);

  if (config.mostrarCliente) {
    exibirCamposCliente();
  } else {
    ocultarCamposCliente();
  }

  if (config.mostrarLocal) {
    exibirCampoLocal();
  } else {
    ocultarCampoLocal();
  }

  if (config.dataLimiteTipo === 'auto') {
    dataLimiteInput.value = calcularDataLimite(config.dataLimiteDias);
    dataLimiteInput.readOnly = true;
    dataLimiteInput.placeholder = '';
  } else {
    dataLimiteInput.value = '';
    dataLimiteInput.readOnly = false;
    dataLimiteInput.placeholder = 'Digite a data limite (ex: 20/10/2025)';
  }
}

// ---------------------------------------------------------------------------
// Geração segura da etiqueta (sem XSS — usa createElement e textContent)
// ---------------------------------------------------------------------------

/** Constrói o HTML da etiqueta usando createElement para evitar injeção XSS */
function gerarEtiquetaHTML() {
  const status = getStatus();
  const canal = getCanal();
  const local = getLocal();
  const reserva = document.getElementById('reserva').value.trim();
  const pedido = document.getElementById('pedido').value.trim();
  const cliente = document.getElementById('cliente').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const dataLimite = dataLimiteInput.value.trim();
  const config = STATUS_CONFIG[status];

  const div = document.createElement('div');

  function adicionarParagrafo(rotulo, valor) {
    const p = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = rotulo + ': ';
    p.appendChild(strong);
    p.appendChild(document.createTextNode(valor || '-'));
    div.appendChild(p);
  }

  // Logo — img segura (src fixo do sistema)
  const img = document.createElement('img');
  img.src = LOGO_DATA_URL;
  img.alt = 'Logo O Sebo Cultural';
  img.className = 'logo-etiqueta';
  div.appendChild(img);

  // Status
  adicionarParagrafo('Status', config.label);

  // Reserva
  if (reserva && config.mostrarReserva) {
    adicionarParagrafo('Reserva', reserva);
  }

  // Pedido
  if (config.mostrarPedido(canal)) {
    adicionarParagrafo('Pedido', pedido || '-');
  }

  // Canal
  if (config.mostrarCanal) {
    adicionarParagrafo('Canal', canal);
  }

  // Local
  adicionarParagrafo('Local', local);

  // Cliente e Telefone
  if (config.mostrarCliente) {
    adicionarParagrafo('Cliente', cliente || '-');
    adicionarParagrafo('Telefone', telefone || '-');
  }

  // Data Limite
  adicionarParagrafo('Data Limite', dataLimite || '-');

  return div.innerHTML;
}

/** Renderiza a etiqueta no DOM */
function gerarEtiqueta() {
  etiquetaDiv.innerHTML = gerarEtiquetaHTML();
  etiquetaDiv.style.display = 'block';
}

// ---------------------------------------------------------------------------
// Aguardar carregamento de imagens antes da impressão
// ---------------------------------------------------------------------------

/** Aguarda que todas as imagens da etiqueta estejam carregadas */
async function aguardarImagensDaEtiqueta() {
  const imagens = Array.from(etiquetaDiv.querySelectorAll('img'));

  await Promise.all(
    imagens.map(async (imagem) => {
      if (imagem.complete && imagem.naturalWidth > 0) {
        if (typeof imagem.decode === 'function') {
          try {
            await imagem.decode();
          } catch (_) {
            // decode pode falhar mesmo após carregamento — ignora
          }
        }
        return;
      }

      await new Promise((resolve, reject) => {
        imagem.addEventListener('load', resolve, { once: true });
        imagem.addEventListener(
          'error',
          () => reject(new Error('A logo da etiqueta não carregou.')),
          { once: true },
        );
      });
    }),
  );
}

// ---------------------------------------------------------------------------
// Impressão
// ---------------------------------------------------------------------------

/** Evita cliques duplos no botão imprimir enquanto a impressão está aberta */
let impressaoEmAndamento = false;

/** Gera a etiqueta, aguarda as imagens e abre a janela de impressão */
async function imprimirEtiqueta() {
  if (impressaoEmAndamento) return;
  impressaoEmAndamento = true;

  gerarEtiqueta();

  try {
    await aguardarImagensDaEtiqueta();
    window.print();
  } catch (error) {
    console.error(error);
    alert(
      'A logo da etiqueta ainda não carregou. Aguarde um instante e tente imprimir novamente.',
    );
  } finally {
    impressaoEmAndamento = false;
  }
}

// ---------------------------------------------------------------------------
// Limpar formulário (acionado pelo botão "Limpar Campos")
// ---------------------------------------------------------------------------

/** Restaura o formulário ao estado inicial e limpa a etiqueta */
function limparFormulario() {
  document.querySelector('input[name="status"][value="pago"]').checked = true;
  document.querySelector('input[name="local"][value="Centro"]').checked = true;
  document.querySelector('input[name="canal"][value="Balcão"]').checked = true;

  ['reserva', 'pedido', 'cliente', 'telefone'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });

  dataLimiteInput.value = '';
  dataLimiteInput.readOnly = true;
  dataLimiteInput.placeholder = 'Selecione o status primeiro';

  etiquetaDiv.innerHTML = '';
  etiquetaDiv.style.display = 'none';

  atualizarFormulario();
}

// ---------------------------------------------------------------------------
// Registro de eventos
// ---------------------------------------------------------------------------

document
  .querySelectorAll('input[name="status"]')
  .forEach((radio) => radio.addEventListener('change', atualizarFormulario));

document
  .querySelectorAll('input[name="canal"]')
  .forEach((radio) => radio.addEventListener('change', atualizarFormulario));

botaoImprimir.addEventListener('click', imprimirEtiqueta);
botaoLimpar.addEventListener('click', limparFormulario);

// ---------------------------------------------------------------------------
// Estado inicial
// ---------------------------------------------------------------------------

atualizarFormulario();
