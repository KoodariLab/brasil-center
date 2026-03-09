# Brasil Center

Site institucional da Brasil Center (Contact Center e Trade Marketing), feito em [Nuxt 3](https://nuxt.com/) com **conteúdo estático** em `content/pageBy/` e mídias em `public/uploads/`.

---

## Pré-requisitos

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/) (v18 ou superior)
- Editor recomendado: [VSCode](https://code.visualstudio.com/)

---

## Como rodar

```bash
git clone <url-do-repositorio>
cd site-nuxt-brasil-center
npm install
npm run dev
```

Acesse **http://localhost:3000**.

---

## Scripts

| Comando        | Descrição                    |
|----------------|------------------------------|
| `npm run dev`  | Desenvolvimento com HMR      |
| `npm run build`| Build para produção (SSR)   |
| `npm run generate` | Build estático (pré-render) |
| `npm run preview`  | Visualizar build gerado     |
| `npm run start`    | Rodar servidor de produção (.output) |

---

## Estrutura do conteúdo

- **`content/pageBy/`** – JSON das páginas (home, sobre-bcc, jeito-bcc) no formato consumido pelo front.
- **`public/uploads/`** – Imagens, vídeos e SVGs referenciados pelos JSON (caminhos `/uploads/...`).
- **`server/api/pageby/[page].get.js`** – API que serve o conteúdo de cada página.

Todo o conteúdo é editado aqui no projeto. Não é necessário WordPress nem variáveis de ambiente.

**Para alterar textos:** edite os JSON em `content/pageBy/` (home.json, sobre-bcc.json, jeito-bcc.json).

**Para adicionar uma imagem ou vídeo:** coloque o arquivo em `public/uploads/` (ex.: `public/uploads/2025/08/minha-foto.png`) e use no JSON o caminho `/uploads/2025/08/minha-foto.png` em `sourceUrl` ou `mediaItemUrl`. Depois é só commitar e fazer deploy.

---

## Tecnologias

- [Nuxt 3](https://nuxt.com/) – Framework Vue com SSR
- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/) – Estado global
- [GSAP](https://gsap.com/) – Animações
- [Swiper](https://swiperjs.com/) – Carrosséis

---

## Documentação de referência (histórico)

- **`web.config`** e **`README_IIS.md`** – Mantidos para consulta de deploy em IIS e integração com WordPress no passado. O projeto atual não depende deles.
- **`web.config.estatico`** e **`README_IIS_ESTATICO.md`** – Deploy do site **estático** (após `npm run generate`) no IIS.
