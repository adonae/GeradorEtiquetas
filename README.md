# 🏷️ Gerador de Etiquetas

Sistema simples e eficiente para geração e impressão de etiquetas de pedidos, desenvolvido especialmente para o **O Sebo Cultural**.  
Permite gerar etiquetas de forma rápida para pedidos **pagos** e **não pagos**, com informações personalizadas do cliente e local de retirada.

---

## 🚀 Funcionalidades

- Seleção de **status do pedido**:
  - 🟢 **Pedido Pago** → exibe campo de *Número do Pedido* e preenche automaticamente a *Data Limite* (+60 dias).
  - 🔴 **Pedido Não Pago** → exibe campos de *Número da Reserva* e *Canal de Atendimento* (Balcão, Whatsapp ou Telefone).
- Escolha de **Local de Retirada** (Centro, Bancários ou Manaíra).
- Campos para **nome do cliente**, **telefone** e **data limite personalizada**.
- **Geração automática da etiqueta** na tela.
- **Impressão otimizada** para impressoras térmicas (Elgin i8, Epson TM-T20, etc).
- **Limpeza automática dos campos** após a impressão.

---

## 🖨️ Compatibilidade com Impressoras Térmicas

O layout foi ajustado para impressoras de **80mm**, garantindo margens seguras e texto centralizado.  
Testado com:

- ✅ Elgin i8  
- ✅ Epson TM-T20  

> 💡 Caso a etiqueta saia cortada em algum modelo, é possível ajustar as margens no `style.css` no bloco `@media print`.

---

## 🛠️ Estrutura do Projeto

📂 gerador-etiquetas/
├── index.html # Estrutura principal do formulário e etiqueta
├── style.css # Estilos visuais e configuração de impressão
├── script.js # Lógica de exibição, geração e impressão das etiquetas
└── logoosebocultural.jpg # Logotipo exibido nas etiquetas

---

## ⚙️ Como Usar

1. Baixe ou clone o repositório:
   ```bash
   git clone https://github.com/usuario/gerador-etiquetas.git

2. Abra o arquivo index.html em qualquer navegador moderno.
3. Preencha as informações do pedido.
4. Clique em Gerar Etiqueta.
5. Quando a janela de impressão abrir:
    - Selecione sua impressora térmica.
    - Configure o papel como 80mm de largura.
    - Escala 100%.
    - Margens: Nenhuma ou Personalizada mínima.
6. Clique em Imprimir.

## 🧩 Tecnologias Utilizadas

| Tecnologia                      | Descrição                           |
| ------------------------------- | ----------------------------------- |
| 🧱 **HTML5**                    | Estrutura da aplicação              |
| 🎨 **CSS3**                     | Estilo visual e regras de impressão |
| ⚙️ **JavaScript (Vanilla ES6)** | Lógica funcional do sistema         |

## 💬 Observações

- O campo “Canal de Atendimento” aparece somente quando o status é “Pedido Não Pago”.
- A data limite é preenchida automaticamente apenas para pedidos pagos.
- Após imprimir, todos os campos são limpos automaticamente para facilitar o próximo uso.

## 📄 Licença

Este projeto foi desenvolvido para uso interno do O Sebo Cultural.
Você pode adaptar e reutilizar o código livremente, desde que mantenha os créditos.