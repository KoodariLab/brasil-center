<template>
    <div>
      <Banner :background="svgUrl" :backgroundMobile="svgUrlMobile" :alturaBanner="'860px'" :slides="banners">
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
        <QuemSomos />
        <BaseBcc />
        <Conquista />
        <Historia />
        <JunteSeGente />
      </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGraphQLFetch } from '@/composables/useGraphQLFetch'
import QuemSomos from '@/components/sobre/QuemSomos.vue'
import BaseBcc from '@/components/sobre/BaseBcc.vue'
import JunteSeGente from '@/components/JunteSe.vue'
import Conquista from '@/components/sobre/Conquista.vue'
import Historia from '@/components/sobre/Historia.vue'

useHead({
  title: 'Quem somos | BrasilCenter',
  meta: [
    { name: 'description', content: 'No Contact Center, somos responsáveis pelo atendimento estratégico do Grupo Claro. Solucionamos demandas em células de ouvidoria, Anatel, atendimento técnico e backoffice financeiro, entre outros serviços. Em Trade Marketing, realizamos vendas de produtos Claro em redes de varejo e diretamente nas residências, em diversas regiões do país.' },
    { property: 'og:title', content: 'Quem somos | BrasilCenter' },
    { property: 'og:description', content: 'No Contact Center, somos responsáveis pelo atendimento estratégico do Grupo Claro. Solucionamos demandas em células de ouvidoria, Anatel, atendimento técnico e backoffice financeiro, entre outros serviços. Em Trade Marketing, realizamos vendas de produtos Claro em redes de varejo e diretamente nas residências, em diversas regiões do país.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: 'URL_da_imagem' }
  ]
})

const query = `query {
  pageBy(uri: "sobre-bcc") {
    title
    sobreBbc {
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
        bannerDesktop { 
          node {
            sourceUrl
          }
        }
        bannerMobile {  
          node {
            sourceUrl
          }
        }
      }
    }
  }
}`

const { data: pageData, pending } = useGraphQLFetch(query, {}, 'sobre-banner')

const banners = computed(() => { 
  const sobrePage = pageData?.value?.data?.pageBy;
  const bannerData = sobrePage?.sobreBbc?.banner ?? []; 

  return bannerData.map(b => ({
    desktop: b.bannerDesktop?.node?.sourceUrl || '', 
    mobile: b.bannerMobile?.node?.sourceUrl || '',   
    icon: b.icone?.node?.sourceUrl || "",
    title: b.titulo || '',                           
    text: b.descricao || '',                         
    button: b.botao || '',                           
    link: b.link || ''                               
  }));
});

const svgUrl = computed(() => pageData.value?.data?.pageBy?.sobreBbc?.fundoEmSvg?.node?.mediaItemUrl);
const svgUrlMobile = computed(() => pageData.value?.data?.pageBy?.sobreBbc?.fundoEmSvgMobile?.node?.mediaItemUrl);

</script>

<style scoped>
.Banner {
  background-color: var(--brand-primary-dark);
  background-repeat: no-repeat;
  background-position: center;
  position: sticky;
  top: 0;
}

@media screen and (max-width: 768px) 
{
  
  .item-banner.container {
    margin-top: 90px;
  }
  .Banner .grid-item-banner-texto h2 {
    text-align: center;
  }
  .Banner .grid-item-banner {
    justify-content: space-between;
    height: 578px;
  }

}
</style>