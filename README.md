# Álbum Copa 2026 — Versão com Google Sheets

Esta versão permite sincronizar o progresso entre computador e Android usando uma planilha do Google Sheets como nuvem.

## Arquivos

- `index.html`: app principal para publicar no GitHub Pages
- `manifest.json`: configuração de instalação como app
- `favicon.png`: ícone do navegador
- `icons/`: ícones Android
- `Code.gs`: código do Google Apps Script
- `README.md`: este guia

## Parte 1 — Atualizar o GitHub

Envie para a raiz do repositório:

```text
index.html
manifest.json
favicon.png
README.md
Code.gs
icons/icon-192.png
icons/icon-512.png
```

O `Code.gs` não é usado pelo GitHub Pages, mas fica salvo como referência.

## Parte 2 — Criar o Google Sheets

1. Crie uma planilha no Google Sheets.
2. Nome sugerido: `Album Copa 2026 - Progresso`.
3. Vá em `Extensões > Apps Script`.
4. Apague o conteúdo do arquivo `Code.gs`.
5. Cole o conteúdo do arquivo `Code.gs` deste pacote.
6. Clique em Salvar.

## Parte 3 — Publicar o Apps Script

1. No Apps Script, clique em `Implantar`.
2. Clique em `Nova implantação`.
3. Em tipo, escolha `App da Web`.
4. Em `Executar como`, escolha `Eu`.
5. Em `Quem pode acessar`, escolha `Qualquer pessoa com o link`.
6. Clique em `Implantar`.
7. Autorize o acesso.
8. Copie a URL do Web App, terminada em `/exec`.

## Parte 4 — Conectar no app

1. Abra o site do GitHub Pages.
2. Toque em `Configurar link`.
3. Cole a URL do Apps Script terminada em `/exec`.
4. Toque em `Enviar nuvem` para mandar seu progresso atual para o Google Sheets.
5. No outro aparelho, configure o mesmo link e toque em `Carregar nuvem`.

## Auto sync

O botão `Auto sync` liga ou desliga o envio automático para o Google Sheets após alterações.

Mesmo com auto sync, é recomendável usar `Enviar nuvem` antes de trocar de aparelho.
