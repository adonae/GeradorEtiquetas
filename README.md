# 🏷️ Gerador de Etiquetas - O Sebo Cultural

> Sistema rápido e intuitivo para gerar e imprimir etiquetas de pedidos no **O Sebo Cultural**.  
> Desenvolvido em HTML, CSS e JavaScript puro, otimizado para impressoras térmicas (Elgin i8, Epson TM-T20, etc).

---

## 🚀 Funcionalidades Principais

✅ **Status do Pedido**
- **Pedido Pago** → Exibe *Número do Pedido* e calcula automaticamente a *Data Limite* (+60 dias).  
- **Pedido Não Pago** → Exibe *Número da Reserva* e *Canal de Atendimento* (*Site, Balcão, Whatsapp, Telefone*).  
  - Se o canal for **Site**, também exibe *Número do Pedido*.  
- **Pedido EV/Amazon** → Exibe apenas *Número da Reserva*, *Número do Pedido* e *Data Limite*.  

🏬 **Locais de Retirada**
- Centro  
- Bancários  
- Manaíra  

👤 **Informações do Cliente**
- Nome, telefone e data limite (manual ou automática).

🖨️ **Geração e Impressão**
- Criação instantânea da etiqueta com visual limpo e profissional.  
- Impressão otimizada para papel **80mm**, com margens ajustadas para diferentes modelos de impressoras.  
- Limpeza automática dos campos após cada impressão.

---

## 🖨️ Compatibilidade com Impressoras

Layout configurado para impressoras térmicas de **80mm**, com margens seguras e texto centralizado.  

Testado com:
- ✅ Elgin i8  
- ✅ Epson TM-T20  

💡 **Dica:** Se a etiqueta sair cortada em algum modelo, ajuste as margens no bloco `@media print` dentro do arquivo `style.css`.

---

## 🗂️ Estrutura do Projeto

```
📦 gerador-etiquetas/
├── index.html       # Estrutura principal do sistema
├── style.css        # Estilos e configuração de impressão
├── script.js        # Lógica de geração e comportamento dinâmico dos campos
└── logoosebocultural.jpg  # Logotipo impresso nas etiquetas
```

---

## ⚙️ Como Usar

1. **Clone ou baixe o repositório**
   ```bash
   git clone https://github.com/usuario/gerador-etiquetas.git
   ```
2. **Abra o arquivo** `index.html` no navegador.  
3. **Preencha os dados** do pedido conforme o status selecionado.  
4. Clique em **Gerar Etiqueta**.  
5. Na janela de impressão:
   - Selecione a impressora térmica.
   - Papel: **80mm de largura**.
   - Escala: **100%**.
   - Margens: **Nenhuma** ou **Personalizada mínima**.
6. Clique em **Imprimir** 🖨️

---

## 💻 Tecnologias Utilizadas

| Tecnologia | Descrição |
|-------------|------------|
| 🧱 **HTML5** | Estrutura da aplicação |
| 🎨 **CSS3** | Estilo visual e otimização para impressão |
| ⚙️ **JavaScript (Vanilla ES6)** | Lógica funcional e dinâmica do sistema |

---

## 🧩 Regras de Exibição dos Campos

| Status | Campos exibidos |
|--------|------------------|
| **Pedido Pago** | Número do Pedido, Local de Retirada, Data Limite automática |
| **Pedido Não Pago** | Número da Reserva, Canal de Atendimento |
| **Pedido Não Pago (canal = Site)** | Número da Reserva, Canal de Atendimento, Número do Pedido |
| **Pedido EV/Amazon** | Número da Reserva, Número do Pedido, Data Limite |

---

## 🪄 Customização

Você pode ajustar o comportamento e o layout modificando:
- `script.js` → para lógica de exibição e geração de etiqueta.  
- `style.css` → para espaçamento e margens de impressão.  

💡 **Dica:** Margens entre `6mm e 8mm` na esquerda funcionam bem para impressoras Epson e Elgin.

---

## 📄 Licença

Este projeto foi desenvolvido para uso interno do **O Sebo Cultural**.  
Pode ser adaptado e reutilizado livremente, mantendo os créditos originais.  