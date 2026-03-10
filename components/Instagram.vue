<template>
  <section>
    <div class="container">
        <div class="list-card-horizontal">
            <div class="item-cad-horizontal grid grid-2">
                <picture class="card-horizontal-img">
                    <source media="(max-width: 767px)" srcset="/images/foto-principal-insta-mobile.png">
                    <img src="/images/foto-principal-insta.svg" alt="Ilustração de Diversidade com total inclusão" loading="lazy">
                </picture>
                <div class="card-horizontal-text">
                    <img src="/assets/emojis.svg" alt="imagem ilustrativa" aria-hidden="true" class="icon-insta-cad" loading="lazy">
                    <h2 class="title-xl t-white">Siga nosso Insta!</h2>
                    <div class="paragr t-white">
                        <p>Fique por dentro do que acontece na BCC através do nosso Instagram. Estamos sempre postando sobre a empresa, novas oportunidades e muitos outros conteúdos que você não vai querer perder.   </p>
                    </div>
                    <nuxt-link to="https://www.instagram.com/brasilcenter_oficial/"  class="button-bcc btn-white btn-icon" target="_blank">Acesse <span class="iconInsta"></span></nuxt-link>
                    <h3>@brasilcenter_oficial</h3>
                    
                </div>
            </div>
        </div>
        <div class="instagram-embed">
            <client-only>
                <div class="instagram-feed-wrapper">
                    <div class="sk-instagram-feed" data-embed-id="25597742"></div>
                </div>
            </client-only>
        </div>
    </div>
  </section>
</template>

<script setup>

const route = useRoute();

const loadInstagramWidget = () => {
  const feedContainer = document.querySelector('.sk-instagram-feed');
  if (feedContainer) {
    feedContainer.innerHTML = ''; // Limpa o container antes de recarregar
  }

  const existingScript = document.getElementById('sociablekit-script');
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement('script');
  script.id = 'sociablekit-script';
  script.src = 'https://widgets.sociablekit.com/instagram-feed/widget.js';
  script.defer = true;
  document.body.appendChild(script);
};

onMounted(() => {
  if (process.client) {
    loadInstagramWidget();
  }
});

watch(() => route.fullPath, (newPath, oldPath) => {
  if (newPath === '/' && oldPath !== '/') {
    // Quando navegar pra Home de volta, força reload da página
    window.location.reload();
  }
});
    // export default defineEventHandler(async () => {
    // const endpointAccessToken = process.env.INSTAGRAM_GRAPH_API_URL

    // if (!endpointAccessToken) {
    //     return { error: 'Token ou URL não configurada' }
    // }

    // try {
    //     const res = await fetch(endpointAccessToken)
    //     const data = await res.json()
    //     return data
    // } catch (error) {
    //     return { error: 'Erro ao buscar o feed' }
    // }
    // })
</script>

<style scoped>
section {
  background-color: var(--brand-primary-dark);
}
/* Container principal */
.instagram-feed-wrapper {
  max-width: 100%;
  display: grid;
}

/* Esconde foto de perfil, biografia e seguidores */
.instagram-feed-wrapper .sk-profile-info {
  display: none !important;
}

/* Esconde curtidas, comentários, datas, etc */
.instagram-feed-wrapper .sk-post-stats,
.instagram-feed-wrapper .sk-post-caption,
.instagram-feed-wrapper .sk-post-date {
  display: none !important;
}

/* Mantém somente as imagens/vídeos do feed */
.instagram-feed-wrapper .sk-item {
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

/* Grid para 4 itens */
.instagram-feed-wrapper .sk-items {
  display: grid !important;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

/* Força a esconder os itens além do 4º (5,6, etc) */
.instagram-feed-wrapper .sk-item:nth-child(n+5) {
  display: none !important;
}
.instagram-user-root-container {
    display: none !important;
}
.instagram-embed {
    padding-top: 140px;
}
.item-cad-horizontal {
    display: grid;
    gap: 120px;
    align-items: center;
}
.card-horizontal-img {
    position: relative;
}
.icon-insta-cad {
    max-width: 284px;
}
.card-horizontal-img img {
    max-width: 100%;
    position: relative;
    margin: auto;
}
.card-horizontal-text p {
    font-size: var(--text-body-sm);
    font-weight: 400;
    line-height: 160%;
}
.card-horizontal-text {
    display: flex;
    flex-direction: column;
    gap: 24px;
}
.card-horizontal-text h3 {
    line-height: 160%;
    font-size: var(--text-title-md);
    font-weight: 100;
    color: var( --neutral-high-lightest);
}



@media screen and (max-width: 768px) {
    .item-cad-horizontal {
        text-align: center;
        gap: 24px;
        grid-template-columns: 1fr;
    }
    .icon-insta-cad {
        max-width: 138px;
        margin-inline: auto;
    }
    .card-horizontal-text p {
        font-size: var(--text-body-xs);
        text-align: center;
    }
    .card-horizontal-text h3 {
        text-align: center;
        font-size: var(--text-title-xxs);
    }
    .instagram-embed {
        padding-top: 20px;
    }
}
</style>
