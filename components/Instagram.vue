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
            <ClientOnly>
                <div class="instagram-feed-wrapper">
                    <behold-widget feed-id="trMXST7iTGKKv8eAta4u" :key="beholdRemountKey" />
                </div>
            </ClientOnly>
        </div>
    </div>
  </section>
</template>

<script setup>
import {
  loadBeholdWidgetScript,
  setupBeholdBrandingHide,
  requestBeholdBrandingHideUpdate,
} from '@/utils/beholdInstagramEmbed.js'

const route = useRoute()
const beholdRemountKey = ref(0)

let disposeBeholdBrandingHide = null

watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    if (newPath === '/' && oldPath !== '/') {
      beholdRemountKey.value += 1
    }
  }
)

watch(beholdRemountKey, () => {
  if (import.meta.client) {
    nextTick(() => requestBeholdBrandingHideUpdate())
  }
})

onMounted(() => {
  if (import.meta.client) {
    loadBeholdWidgetScript()
    disposeBeholdBrandingHide = setupBeholdBrandingHide()
  }
})

onUnmounted(() => {
  disposeBeholdBrandingHide?.()
  disposeBeholdBrandingHide = null
})
</script>

<style scoped>
section {
  background-color: var(--brand-primary-dark);
}
.instagram-feed-wrapper {
  max-width: 100%;
  width: 100%;
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
