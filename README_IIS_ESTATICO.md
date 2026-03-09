# Deploy estático no IIS

Publicar o site como **arquivos estáticos** no IIS (sem Node, sem PHP). As páginas são pré-renderizadas no build.

## Passo a passo

### 1. Gerar o site estático

No projeto:

```bash
npm run generate
```

A saída fica em **`.output/public`**.

### 2. Publicar no IIS

1. Copie **todo o conteúdo** da pasta `.output/public` para a raiz do site no IIS (pasta física do site).
2. Copie o arquivo **`web.config.estatico`** do projeto para essa mesma pasta e **renomeie** para **`web.config`** (substituindo o antigo, se existir).

### 3. Conferir

- Acesse a URL do site (ex.: `https://seusite.com.br`).
- Teste as rotas: `/`, `/sobre`, `/jeito-bcc`. Todas devem abrir com conteúdo e funcionar ao navegar pelo menu.

## O que esse web.config faz

- Serve os arquivos estáticos (HTML, JS, CSS, imagens em `_nuxt/`, `uploads/`, etc.) normalmente.
- Para URLs que não correspondem a um arquivo (ex.: refresh em `/sobre`), reescreve para `200.html`, que é o fallback do Nuxt para o roteador client-side.

## Observação

O arquivo **`web.config`** na raiz do repositório é do setup antigo (PHP/WordPress) e foi mantido só para histórico. Para o deploy estático do Nuxt no IIS, use **`web.config.estatico`** renomeado como `web.config` na pasta publicada.
