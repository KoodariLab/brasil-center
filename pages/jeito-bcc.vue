<template>
  <div>
    <Banner :background="svgUrl" :backgroundMobile="svgUrlMobile" :alturaBanner="'860px'" :slides="bannerSlides">
      <template #default="{ slide }">
        <div class="item-banner container">
          <div class="grid-item-banner">
            <picture>
              <source v-if="slide.mobile" :srcset="slide.mobile" media="(max-width: 768px)">
              <img v-if="slide.desktop" :src="slide.desktop" :alt="slide.title" aria-hidden="true">
            </picture>
            <div class="grid-item-banner-texto">
              <img v-if="slide.icon" :src="slide.icon" alt="imagem ilustrativa" aria-hidden="true" class="icon-banner-cad">
              <h2 v-if="slide.title">{{ slide.title }}</h2>
              <h3 v-if="slide.text">{{ slide.text }}</h3>
              <a v-if="slide.link" :href="slide.link" class="button-banner" target="_blank">{{ slide.button }}</a>
            </div>
          </div>
        </div>
      </template>
    </Banner>

    <div class="scroll-anime">
      <Atmosfera />
      <ParaComecar />
      <Prioridade />
      <ProjetosInternos />
      <JunteSe />
    </div>
  </div>
</template>

<script setup> 
import { computed } from 'vue'
import { useGraphQLFetch } from '@/composables/useGraphQLFetch'
import Atmosfera from '@/components/jeitoBcc/Atmosfera.vue'
import ParaComecar from '@/components/jeitoBcc/ParaComecar.vue'
import Prioridade from '@/components/jeitoBcc/Prioridade.vue'
import ProjetosInternos from '@/components/jeitoBcc/ProjetosInternos.vue'
import JunteSe from '@/components/JunteSe.vue'

useHead({
  title: 'Jeito BCC | BrasilCenter',
  meta: [
    { name: 'description', content: 'Conheça o jeito BCC de trabalhar. Um ambiente onde os talentos encontram oportunidades reais de crescimento, com cultura de bem-estar e desenvolvimento profissional.' },
    { property: 'og:title', content: 'Jeito BCC | BrasilCenter' },
    { property: 'og:description', content: 'Conheça o jeito BCC de trabalhar. Um ambiente onde os talentos encontram oportunidades reais de crescimento, com cultura de bem-estar e desenvolvimento profissional.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: '/images/logo-brasil-center.png' }
  ]
})

const query = `query {  
  pageBy(uri: "jeito-bcc") {
    jeitoBcc {
      fundoEmSvg {
        node {
          mediaItemUrl
        }
      }
      fundoEmSvgMobile {
        node {
          mediaItemUrl
        }
      }
      banner {
        botao
        descricao
        link
        titulo
        icone {
          node {
            sourceUrl
          }
        }
        bannerMobile {
          node {
            sourceUrl
          }
        }
        bannerDesktop {
          node {
            sourceUrl
          }
        }
      }
    }
  }
}`

const { data: pageData, pending } = useGraphQLFetch(query, {}, 'jeitoBcc-banner')
const bannerSlides = computed(() => {
  const JeitoBccPage = pageData.value?.data?.pageBy;

  const banners = JeitoBccPage?.jeitoBcc?.banner ?? []; 
  return banners.map(b => ({
    desktop: b.bannerDesktop?.node?.sourceUrl || '',
    mobile: b.imageMobile?.node?.sourceUrl || '',
    icon: b.icone?.node?.sourceUrl || "",
    title: b.titulo || '',
    text: b.descricao || '',
    button: b.botao || '',
    link: b.link || ''
  }));
});

const svgUrl = computed(() => pageData.value?.data?.pageBy?.jeitoBcc?.fundoEmSvg?.node?.mediaItemUrl);
const svgUrlMobile = computed(() => pageData.value?.data?.pageBy?.jeitoBcc?.fundoEmSvgMobile?.node?.mediaItemUrl);

</script>

<style scoped>
.Banner {
  background-color: var(--brand-primary-pure);
  background-repeat: no-repeat;
  background-position: center;
  position: sticky;
  top: 0;
}
@media screen and (max-width: 768px) {
  .Banner .grid-item-banner-texto h2 {
    text-align: center;
  }
  .item-banner.container {
    margin-top: 90px;
  }
  .Banner .grid-item-banner {
    justify-content: space-between;
    height: 578px;
  }
}
</style>