<template>
  <section>
    <div class="container">
      <div class="content-title t-center">
        <span class="highlight">Conquistas</span>
        <h2 class="title-xl">{{ titulo }}</h2>
      </div>
      <Swiper
        :modules="[Navigation, Pagination, Autoplay]"
        :slides-per-view="4.4"
        :space-between="16"
        :grab-cursor="true"
        :navigation="true"
        class="carousel-container"
        free-mode
        :breakpoints="{
          0: {
            slidesPerView: 1.4,
          },
          640: {
            slidesPerView: 2.5,
          },
          1024: {
            slidesPerView: 4.4,
            spaceBetween: 16,
          }
        }"
      >
        <SwiperSlide
          v-for="(premio, index) in premios"
          :key="index"
          class="card-item"
          @click="selected = index"
        >
          <img :src="premio.image" alt="logo da empresa" aria-hidden="true" loading="lazy" />
          <div class="flex-item-card">
            <h3><span class="icon-stars"></span> {{ premio.title }}</h3>
          </div>
          <p>{{ premio.text }}</p>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useGraphQLFetch } from '@/composables/useGraphQLFetch'
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

const selected = ref(null)

const query = `query {
  pageBy(uri: "sobre-bcc") {
    sobreBbc {
      tituloPremio
      conquistas {
        descricaoDoPremio
        premios
        logo {
          node {
            sourceUrl
          }
        }
      }
    }
  }
}`

const { data: pageData, pending } = useGraphQLFetch(query, {}, 'sobre-conquistas')

const sobrePage = computed(() => {
  return pageData.value?.data?.pageBy;
});

const premios = computed(() => {
  const conquistasData = sobrePage.value?.sobreBbc?.conquistas || [];
  return conquistasData.map(c => ({
    image: c.logo?.node?.sourceUrl || '',
    title: c.premios || '',
    text: c.descricaoDoPremio || '',
  }));
});

const titulo = computed(() => {
  return sobrePage.value?.sobreBbc?.tituloPremio || '';
});
</script>

<style scoped>
section {
  background-color: var(--brand-primary-lightest);
}
.swiper {
  margin-top: 80px;
}
.highlight {
  color: var(--neutral-high-lightest);
  background-color: var(--brand-secondary-pure);
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
  position: relative;
  padding-bottom: 58px;
  margin-bottom: 40px;
}
.card-item {
  width: 303px;
  background: var(--neutral-high-lightest);
  border-radius: 30px;
  padding: 24px 17px;
  text-align: center;
  min-height: 303px;
  min-height: -webkit-fill-available;
}
.carousel-container .card-item img {
  margin-inline: auto;
  max-width: 100%;
  object-fit: scale-down;
  height: 50px;
  margin-bottom: 20px;
  object-position: left;
}
.swiper-slide.card-item .flex-item-card {
  border-top: 3px solid var(--neutral-low-light);
}
.card-item p {
  text-align: left;
  font-size: var(--text-body-sm);
  color: var(--neutral-low-pure);
  line-height: 160%;
  padding: 0 8px;
}
.card-item h3 {
  text-align: left;
  font-size: var(--text-body-sm);
  color: var(--neutral-low-pure);
  font-weight: 600;
  line-height: 160%;
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 8px;
}
span.icon-stars {
  width: 25px;
  height: 25px;
  display: block;
  background-image: url('/assets/star.svg');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.carousel-container {
  overflow: visible;
}
body {
  overflow-x: hidden;
}
.swiper.carousel-container::before {
  content: '';
  width: 100vw;
  height: 108%;
  background-color: var(--brand-primary-lightest);
  z-index: 3;
  position: absolute;
  left: -100vw;
  top: -5px;
}

@media screen and (max-width: 768px) {
  .content-title.t-center {
    text-align: left;
  }
  .t-center .highlight {
    margin-inline: inherit;
  }
  .carousel-container {
    padding-bottom: 0;
    margin-bottom: 64px;
    margin-top: 32px;
  }
  .carousel-container::after{
    left: 20px;
  }
}
</style>
