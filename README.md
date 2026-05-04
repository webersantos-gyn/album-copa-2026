# Álbum Copa 2026 — Google Sheets V2 Corrigido

Esta versão corrige o envio para o Google Sheets usando formulário oculto, mais compatível com Apps Script em sites estáticos no GitHub Pages.

## O que fazer

1. Envie estes arquivos para a raiz do GitHub:
   - `index.html`
   - `manifest.json`
   - `favicon.png`
   - `README.md`
   - `Code.gs`
   - pasta `icons`

2. No Google Sheets:
   - Vá em `Extensões > Apps Script`
   - Apague tudo no `Código.gs`
   - Cole o conteúdo do novo `Code.gs`
   - Salve

3. Reimplante:
   - `Implantar > Gerenciar implantações`
   - Clique no lápis
   - Em versão, escolha `Nova versão`
   - Clique em `Implantar`

4. Copie a URL terminada em `/exec`.

5. No app:
   - Clique em `Configurar link`
   - Cole a URL `/exec`
   - Marque uma figurinha como `Tenho`
   - Clique em `Enviar nuvem`

6. Na planilha, confira:
   - Aba `estado_atual`
   - Célula `A2`: payload
   - Célula `B2`: texto grande com JSON

## Teste opcional no Apps Script

Rode a função `testeSalvar` no Apps Script.

Se ela preencher `estado_atual!B2`, o script tem permissão para gravar na planilha.
