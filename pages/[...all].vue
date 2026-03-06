<template>
  <div class="error-page">
    <div class="container info-page">
      <div>
        <h2>404</h2>
        <p>Ops, a página que você está procurando não existe.</p>
      </div>
      <picture>
        <img id="astronauta" src="/images/404/ilustrative-404.png" alt="Imagem de um astronauta flutuando, ilustração de uma página não encontrada" aria-hidden="true" />
      </picture>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Página não encontrada - BrasilCenter',
  meta: [
    { name: 'description', content: 'Desculpe, a página que você está procurando não foi encontrada.' },
    { property: 'og:title', content: 'Erro 404 - Página não encontrada' },
    { property: 'og:description', content: 'Essa página não existe ou foi removida.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: 'URL_da_imagem' }
  ],
})

</script>

<style scoped>
div#vanta-bg {
  display: flex;
  align-items: center;
}
.error-page {
  min-height: 600px;
  height: 860px;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: var(--brand-secondary-pure);
}
h2 {
  color: var(--neutral-high-lightest);
  font-size: var(--text-title-xxxl);
}
p {
  font-size: var(--text-title-xs);
  color: var(--neutral-high-lightest);
}
.container.info-page img {
  width: 100%;
  max-width: 500px;
  position: relative;
}
.flex {
  display: flex;
}
.container.info-page {
  display: flex;
  align-items: center;
}
@keyframes floatFall {
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
    transform: translateY(50px) rotate(25deg);
  }
  70% {
    transform: translateY(60px) rotate(-15deg);
  }
  85% {
    transform: translateY(80px) rotate(5deg);
  }
  100% {
    transform: translateY(100px) rotate(0deg);
  }
}
picture {
  margin-left: auto;
}
#astronauta {
  animation: floatFall 20s ease-out forwards;
  position: relative;
}
</style>
