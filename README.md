# Álbum Copa 2026 — Gabarito Mobile com Ícone

Este pacote está pronto para publicar no GitHub Pages.

## Arquivos

- `index.html`: app mobile do álbum
- `manifest.json`: configuração para instalar/adicionar à tela inicial
- `favicon.png`: ícone do navegador
- `icons/icon-192.png`: ícone Android
- `icons/icon-512.png`: ícone Android em alta resolução

## Como publicar no GitHub Pages

1. Crie ou abra o repositório `album-copa-2026`.
2. Envie todos os arquivos deste pacote para a raiz do repositório.
3. Vá em `Settings > Pages`.
4. Em `Build and deployment`, selecione:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Clique em `Save`.

Depois acesse o link do GitHub Pages no Chrome do Android.

## Como colocar na tela inicial do Android

1. Abra o site publicado no Chrome.
2. Toque nos três pontos.
3. Toque em `Adicionar à tela inicial` ou `Instalar app`.
4. Confirme.

O ícone será exibido como **Álbum 2026**.


## Backup diário automático

O app cria automaticamente um backup diário interno no navegador, mantendo os últimos 30 dias.

Use os botões:

- **Backup diário**: cria/atualiza o backup do dia.
- **Ver backups**: lista os backups internos disponíveis.
- **Baixar último backup**: baixa um arquivo `.json` com o progresso.

Importante: navegadores não permitem baixar arquivos automaticamente todos os dias sem ação do usuário. Por isso, o backup diário é salvo internamente e o download é feito por botão.


## Aviso dentro do app

Foi incluído um aviso visual no painel inicial informando que o progresso fica salvo no navegador/celular e recomendando baixar backup antes de limpar cache, trocar de aparelho ou reinstalar o Chrome.
