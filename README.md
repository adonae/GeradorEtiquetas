# Gerador de Etiquetas - O Sebo Cultural

Sistema rápido e intuitivo para gerar e imprimir etiquetas de pedidos no **O Sebo Cultural**.
Desenvolvido em HTML, CSS e JavaScript puro, otimizado para impressoras térmicas como Elgin i8 e Epson TM-T20.

## Funcionalidades principais

- **Pedido Pago**: calcula automaticamente a data limite para retirada em 60 dias.
- **Pedido Não Pago**: exibe número da reserva, canal de atendimento e, se o canal for `Site`, também o número do pedido.
- **Pedido EV/Amazon**: exibe número da reserva, número do pedido e data limite.
- **Locais de retirada**: Centro, Bancários e Manaíra.
- **Dados do cliente**: nome, telefone e data limite.
- **Impressão térmica**: layout ajustado para papel de 80 mm.
- **Modo offline**: a logo é incorporada em base64 no arquivo `logo-data.js`, evitando falhas por carregamento externo.

## Estrutura do projeto

```text
GeradorEtiquetas/
|-- index.html
|-- style.css
|-- script.js
|-- logo-data.js
|-- logoosebocultural.jpg
```

## Como usar

1. Abra `index.html` no navegador.
2. Preencha os dados do pedido conforme o status selecionado.
3. Clique em **Gerar Etiqueta**.
4. Na janela de impressão, escolha a impressora térmica e mantenha escala em `100%`.

## Observações

- O formulário é limpo automaticamente após a impressão.
- Se necessário, ajuste margens e fonte em `style.css`.
- A lógica de exibição dos campos e geração da etiqueta fica em `script.js`.
