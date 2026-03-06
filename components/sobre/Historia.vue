<template>
  <section>
    <div class="Historias container">
      <div class="content-title t-center">
        <span class="highlight">Construindo história</span>
        <h2 class="title-xl">Jornada BCC</h2>
        <p>Fazendo junto e crescendo junto há mais de 25 anos.</p>
      </div>
      <div class="swipper-bullets-mod"></div>
      <Swiper
        :modules="[Navigation, Pagination, Autoplay]"
        :slides-per-view="1"
        :space-between="0"
        :pagination="{el: '.swipper-bullets-mod', clickable: true }"
        :navigation="{
          nextEl: '.n-historia',
          prevEl: '.p-historia'
        }"
        :grab-cursor="true"
        class="carousel-container"
      >
        <SwiperSlide
          v-for="(history, index) in Historias"
          :key="index"
          class="card-carrossel"
          @click="selected = index"
        >
          <div class="card-image-carrossel">
            <span class="icon-date"></span>
            <picture class="picture-wrapper">
              <img :src="history.image" alt="logo da empresa" aria-hidden="true" loading="lazy" />
            </picture>
          </div>
          <div class="card-content-history">
            <div class="title-container-carrossel">{{ history.anoInit }} <strong>{{ history.anoFim }}</strong></div>
            <div class="content-image-mobile">
                <picture>
                <source media="(max-width: 768px)" :srcset="history.imageMobile" />
                <img :src="history.image" alt="logo da empresa mobile" loading="lazy" />
              </picture>
            </div>
            <div class="card-content-text" v-html="history.text"></div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div class="container-btns">
        <div class="item-actions">
          <button class="swiper-button-prev p-historia"></button>
          <button class="swiper-button-next n-historia"></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useGraphQLFetch } from '@/composables/useGraphQLFetch'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import { ref } from 'vue'

const selected = ref(null)

const query = `query {
  pageBy(uri: "sobre-bcc") {
    sobreBbc {
      historia {
        anoInicio
        anoFim
        descricao
        imagem {
          node {
            sourceUrl
          }
        }
        imagemMobile {
          node {
            sourceUrl
          }
        }
      }
    }
  }
}`

const { data: pageData, pending } = useGraphQLFetch(query, {}, 'sobre-historias')

const sobrePage = computed(() => {
  return pageData.value?.data?.pageBy;
});

const Historias = computed(() => {
  const historiaData = sobrePage.value?.sobreBbc?.historia || [];

  return historiaData.map(c => ({
    image: c.imagem?.node?.sourceUrl || '',
    imageMobile: c.imagemMobile?.node?.sourceUrl || '',
    anoInit: c.anoInicio || '',
    anoFim: c.anoFim || '',
    text: c.descricao || '',
  }));
});

</script>

<style scoped>
.swiper {
  margin-top: 80px;
}
.highlight {
  color: var(--neutral-high-lightest);
  background-color: var(--brand-secondary-pure);
}
.card-content-history {
  padding-right: 32px;
}
h2 {
  color: var(--brand-primary-pure);
  font-weight: 600;
  line-height: 110%;
  max-width: 840px;
  margin-inline: auto;
}
.carousel-container {
  width: 100%;
}
picture.picture-wrapper {
  display: block;
  position: relative;
}
picture.picture-wrapper img {
  max-width: 100%;
  margin-inline: auto;
  border-radius: 50%;
  aspect-ratio: 1/1;
}
.card-carrossel {
  display: grid;
  transition: 0.3s ease-in-out;
  gap: 48px;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  padding-bottom: 0;
}
.container-btns {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.item-actions {
  width: 100%;
  position: relative;
  grid-column: 2;
}
.container-btns button {
  border: none;
}
picture.picture-wrapper::after
{
  content: '';
  width: 70px;
  height: 70px;
  background-image: url(/assets/icon-calendario.svg);
  display: block;
  position: absolute;
  background-size: contain;
  z-index: 2;
  top: 0;
  right: 130px;
}
.swiper-paginatio {
  top: 0 !important;
  bottom: inherit !important;
  margin-left: 78px !important;
}
body {
  overflow-x: hidden;
}
.swiper.swiper-initialized.swiper-horizontal.carousel-container::before {
  content: '';
  width: 100vw;
  height: 108%;
  background: #fff;
  z-index: 3;
  position: absolute;
  left: -101vw;
  top: -5px;
}

.title-container-carrossel {
  font-size: var(--text-title-xxxl);
  font-weight: bolder;
  line-height: 85px;
  color: var(--brand-primary-lightest);
  margin-bottom: 40px;
}
.title-container-carrossel strong {
  font-size: 132px;
  display: block;
  position: relative;
  left: 115px;
  color: var(--brand-primary-pure);
}
.card-content-text, .card-content-text p {
  font-weight: 400;
  color: var(--brand-primary-pure);
  line-height: 160%;
  font-size: var(--text-body-sm);
}
.card-image-carrossel {
  position: relative;
  background-image: url(/assets/graficos-fundo-carrossel-historias.svg);
  background-repeat: no-repeat;
  background-position: left center;
  padding: 67px 0;
  background-size: contain;
}
.swipper-bullets-mod {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 120px !important;
  margin-left: 105px;
  gap: 10px;
}
.card-content-history picture {
  display: none;
}
.card-content-history picture img {
  max-width: 180px;
  margin-inline: auto;
  margin-bottom: 14px;
}

@media screen and (min-width: 1024px) {
  .container-btns button.swiper-button-next {
    right: 42% !important;
    bottom: -20px;
  }
  .container-btns button.swiper-button-prev {
    left: 42% !important;
    bottom: -20px;
  }
}

@media screen and (max-width: 991px)
{
  .card-carrossel {
    display: block;
  }
  .card-image-carrossel {
    display: none !important;
  }
  .card-content-history picture {
    display: block;
  }
  .container-btns {
    grid-template-columns: 1fr;
  }
  .item-actions {
    grid-column: 1;
  }
  .swipper-bullets-mod {
    display: none !important;
  }
}

@media screen and (max-width: 768px) {
  .swiper {
    margin-top: 0;
  }
  picture.picture-wrapper img {
    max-width: 180px;
    margin-inline: auto;
    max-height: 180px;
    object-fit: contain;  
  }
  .card-image-carrossel {
    padding: 0 0;
    background-size: 75%;
    background-position: center;
  }
  .title-container-carrossel,.title-container-carrossel strong {
    font-size: var(--text-body-xl);
    text-align: center;
    line-height: 110%;
    margin-bottom: 0;
  }
  .content-image-mobile {
    background-image: url(/assets/grafico-historia-mobile.svg);
    background-repeat: no-repeat;
    background-position: center 2px;
    background-size: 245px 144px;
    padding-top: 14px;
    display: block;
  }
  .card-content-history picture {
    margin-inline: auto;
    max-width: 180px;
    position: relative;
  }
  .card-content-history picture::after {
    content: '';
    width: 38px;
    height: 38px;
    background-image: url(/assets/icon-calendario.svg);
    display: block;
    position: absolute;
    background-size: contain;
    z-index: 2;
    bottom: 0;
    left: 0;
  }
  .title-container-carrossel strong {
    display: inline;
    position: inherit;
  }
  section {
    margin-bottom: 64px;
  }
  picture.picture-wrapper {
    margin-inline: auto;
    max-width: 180px;
  }
  .card-content-history p {
    padding-inline: 20px;
  }
  .card-content-history::after {
    left: calc(50% - 12px);
  }
  .date-carrossel {
    margin-inline: auto;
  }
  .card-content-history {
    padding-right: 0;
    text-align: center;
  }
  picture.picture-wrapper::after {
    width: 40px;
    height: 40px;
    right: inherit;
    bottom: 0;
    top: inherit;
  }
  .item-actions {
    margin-top: 14px;
  }
  button.swiper-button-next.n-historia, button.swiper-button-prev.p-historia {
    bottom: inherit !important;
    top: 22px !important;
  }
}
</style>
