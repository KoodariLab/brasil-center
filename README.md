# Brasil Center

## 📌 Descrição do Projeto

Brasil Center é uma **SPA (Single Page Application)** desenvolvida em [Nuxt 3](https://nuxt.com/), que consome dados dinâmicos de um Headless [WordPress CMS](https://wordpress.org/) através de [GraphQL](https://graphql.org/).

O frontend utiliza animações fluidas com [GSAP](https://gsap.com/) e bibliotecas modernas para UI/UX.

---

## ⚙️ Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina as seguintes ferramentas:

- [Git](https://git-scm.com)  
- [Node.js](https://nodejs.org/en/) (versão **23.6.0** ou superior)

Além disto, é recomendado utilizar um editor como [VSCode](https://code.visualstudio.com/).

---

## 🚀 Como rodar o projeto

### Clone este repositório

```bash
git clone <https://gitlab.com/misael7/brasil-center-koodari.git>
```

### Acesse a pasta do projeto

```bash
cd brasil-center-koodari
```

### Instale as dependências

```bash
npm install
```

### Execute em modo de desenvolvimento

```bash
npm run dev
```

### Gerar versão de produção

```bash
npm run build
```

### Gerar versão estática da aplicação

```bash
npm run generate
```

### Visualizar build gerado

```bash
npm run preview
```

---

## 🛠 Tecnologias

As principais ferramentas usadas no projeto:

- [Nuxt 3](https://nuxt.com/)  
- [Vue 3](https://vuejs.org/)  
- [GSAP](https://gsap.com/)  
- [Pinia](https://pinia.vuejs.org/)  
- [Apollo Client](https://www.apollographql.com/)  
- [GraphQL](https://graphql.org/)  
- [Swiper.js](https://swiperjs.com/)  
- [Three.js](https://threejs.org/)  
- [Vanilla Tilt](https://micku7zu.github.io/vanilla-tilt.js/)  

O projeto utiliza a opção `swr: true` no `$fetch` do Nuxt 3.  
Isso ativa a estratégia **Stale-While-Revalidate (SWR)**:

- O cliente recebe imediatamente a versão em cache.
- Enquanto isso, uma nova requisição é feita em background.  
- Assim que a resposta chega, o cache é atualizado automaticamente. 

---

## 🔑 Variáveis de Ambiente (.env)

O Nuxt 3 já possui suporte nativo para variáveis de ambiente.  
Isso significa que **não é necessário instalar bibliotecas adicionais** como `dotenv`.  

- Basta criar um arquivo `.env` na raiz do projeto.  
- Atualmente, o arquivo /server/api/graphql.js está configurado com a URL fixa para o endpoint GraphQL, para simplificar a execução em servidores com menos ajustes.
- Porém, a recomendação é trocar essa configuração para usar variáveis de ambiente (.env), garantindo mais segurança e facilidade (desenvolvimento, homologação e produção).

### Exemplo completo do script com .env:

```javascript
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const config = useRuntimeConfig()
  const apiUrl = config.public.apiUrl

  const response = await $fetch(apiUrl, {
    method: 'POST',
    body,
    headers: getRequestHeaders(event)
  })

  return response
})
```

### Vinculando a variável em nuxt.config.ts

Para que a variável em server/api/ funcione precisa chamar no nuxt.config.ts dentro de defineNuxtConfig na raiz do projeto:

```
runtimeConfig: {
  public: {
    apiUrl: process.env.NUXT_API_URL
  }
}
# brasil-center
# brasil-center
