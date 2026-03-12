<template>
  <main>
    <Banner :background="svgUrl" :backgroundMobile="svgUrlMobile" :slides="bannerSlides">
      <template #default="{ slide }">
        <div class="item-banner container" :class="{ 'banner-alternativo': slide.alternativo }">
          <div class="grid-item-banner" >
            <picture>
              <source v-if="slide.mobile" :srcset="slide.mobile" media="(max-width: 768px)" />
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
      <SobreHome />
      <AtuacaoHome />
      <EssenciaHome />
      <NossaCultura />
      <NossaGente />
      <Apoio />
      <JunteSeGente />
      <InstagramAPI />
    </div>

  </main>
</template>

<script setup>
import { useHead } from '#imports'
import { computed } from 'vue'
import { useGraphQLFetch } from '@/composables/useGraphQLFetch'
import Banner from '@/components/Banner.vue'
import SobreHome from '@/components/home/SobreHome.vue'
import AtuacaoHome  from '@/components/home/AtuacaoHome.vue'
import EssenciaHome from '@/components/home/EssenciaHome.vue'
import NossaCultura from '@/components/home/NossaCultura.vue'
import NossaGente from '@/components/home/NossaGente.vue'
import Apoio from '@/components/home/Apoio.vue'
import JunteSeGente from '@/components/JunteSe.vue'
import InstagramAPI from '@/components/Instagram.vue'

useHead({
  title: 'BrasilCenter',
  meta: [
    { name: 'description', content: 'Junte-se a nós ... Nossa vocação como empresa é proporcionar sempre a melhor experiência de atendimento. Buscamos solucionar as necessidades dos nossos clientes' },
    { property: 'og:title', content: 'Quem somos | BrasilCenter' },
    { property: 'og:description', content: '' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: 'URL_da_imagem' }
  ]
})

const query = `query {
  pageBy(uri: "home") {
    id
    home {
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
        button
        bannerAlternativo
        link
        text
        title
        icones {
          node {
            sourceUrl
          }
        }
        image {
          node {
            sourceUrl
          }
        }
        imageMobile {
          node {
            sourceUrl
          }
        }
      }
    }
  }
}`

const { data: pageData, pending } = useGraphQLFetch(query, {}, 'home-page')

const bannerSlides = computed(() => {
  const homePage = pageData.value?.data?.pageBy;
  const banners = homePage?.home?.banner ?? []; 
  
  return banners.map(b => ({
    desktop: b.image?.node?.sourceUrl || '',
    mobile: b.imageMobile?.node?.sourceUrl || '',
    icon: b.icones?.node?.sourceUrl || '',
    title: b.title || '',
    text: b.text || '',
    button: b.button || '',
    link: b.link || '',
    alternativo: b.bannerAlternativo 
  }));
});

const svgUrl = computed(() => pageData.value?.data?.pageBy?.home?.fundoEmSvg?.node?.mediaItemUrl);
const svgUrlMobile = computed(() => pageData.value?.data?.pageBy?.home?.fundoEmSvgMobile?.node?.mediaItemUrl);
</script>

<style scoped>
.Banner {
  background-color: var(--brand-secondary-pure);
  background-repeat: no-repeat;
  background-position: center;
  position: sticky;
  top: 0;
}

.Banner .grid-item-banner-texto h3 {
  white-space: pre-line;
}

@media (max-width: 768px) {
  .Banner{
    background-image: none !important;
  }
  .item-banner.container {
    margin-top: 90px;
  }
  .Banner .grid-item-banner-texto h2 {
    padding-right: 32px;
  }
  .Banner .grid-item-banner-texto h3 {
    padding-right: 32px;
  }
}
</style>