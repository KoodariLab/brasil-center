# Conteúdo estático (pageBy)

JSON das 3 páginas do site no formato consumido pelo front.

## Arquivos

| Arquivo | Conteúdo |
|---------|----------|
| `home.json` | Página inicial |
| `sobre-bcc.json` | Sobre a BCC |
| `jeito-bcc.json` | Jeito BCC |
| `pageBy.json` | Objeto único com as 3 páginas (backup/export) |

## Mídias

Tudo é manual: coloque imagens e vídeos em **`public/uploads/`** e referencie nos JSON com o caminho **`/uploads/...`** (ex.: `/uploads/2025/08/foto.png`). No JSON use `node.sourceUrl` para imagens e `node.mediaItemUrl` para vídeos/SVG.

## Uso no Nuxt

O composable **`useGraphQLFetch`** busca os dados em **GET /api/pageby/[page]** (`home`, `sobre-bcc`, `jeito-bcc`). Resposta: `{ data: { pageBy: ... } }`. Arquivos: `server/api/pageby/[page].get.js`, `composables/useGraphQLFetch.js`.
