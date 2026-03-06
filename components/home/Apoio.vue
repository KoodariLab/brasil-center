<template>
  <section>
    <div class="Apoio container">
      <div class="content-title t-center">
        <span class="highlight">Apoio aos colaboradores</span>
        <h2 class="title-xxl">Benefícios que vão além do trabalho</h2>
        <p>Além de coberturas essenciais como <strong>vale-transporte, vale-refeição/alimentação, seguro de vida, plano de saúde e odontológico,</strong> a BCC tem muito mais apoio para complementar o seu bem-estar:</p>
      </div>
      <Swiper
        :modules="[Navigation, Pagination, Autoplay]"
        :slides-per-view="4"
        :space-between="56"
        :navigation="{
          nextEl: '.n-apoio',
          prevEl: '.p-apoio'
        }"
        :grab-cursor="true"
        class="carousel-container"
         :breakpoints="{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          }
        }"
      >
        <SwiperSlide
          v-for="(p, index) in Benefits"
          :key="index"
          class="card-carrossel"
          @click="selected = index"
        >
          <div class="card-content-project">
            <div class="icone-item"><img :src="p.icone" alt="ícone ilustrativo" aria-hidden="true" loading="lazy" /></div>
            <h3>{{ p.descricao }}</h3>
          </div>
        </SwiperSlide>
      </Swiper>
      <div class="container-btns">
        <div class="item-actions">
          <button class="swiper-button-prev p-apoio"></button>
          <button class="swiper-button-next n-apoio"></button>
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
import 'swiper/css/navigation'
import { ref } from 'vue'

const selected = ref(null)

const query = `query {
  pageBy(uri: "home") { # Busca diretamente a página 'home'
    title
    home {
      beneficios {
        icone {
          node {
            sourceUrl
          }
        }
        descricao
      }
    }
  }
}`

const { data: pageData, pending } = useGraphQLFetch(query, {}, 'home-apoio')
const homePage = computed(() => pageData.value?.data?.pageBy || null);

const Benefits = computed(() => {
  const beneficios = homePage.value?.home?.beneficios || [];
  return beneficios.map(b => ({
    icone: b.icone?.node?.sourceUrl || '',
    descricao: b.descricao || ''
  }));
});
</script>

<style scoped>
.swiper {
  margin-top: 124px;
}
.highlight {
    color: var(--brand-primary-pure);
    background-color: var(--brand-primary-lightest);
}
h2 {
  color: var(--brand-primary-pure);
  font-weight: 600;
  line-height: 110%;
  margin-inline: auto;
}
.card-content-project .icone-item {
  width: 160px;
  height: 160px;
  margin-inline: auto;
  background: var(--brand-primary-lightest);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 32px;
}
.carousel-container {
  width: 100%;
}
.card-carrossel {
  width: 328px;
  transition: 0.3s ease-in-out;
}
.item-actions {
  position: relative;
  margin-top: 72px;
}
button.swiper-button-prev,
button.swiper-button-next {
  bottom: 0;
}
.container-btns .item-actions {
  padding: 20px;
}
.date-carrossel {
  width: 172px;
  height: 80px;
  display: flex;
  align-items: center;
  background-color: var(--brand-primary-lightest);
  border-radius: 48px;
  margin-bottom: 22px;
  justify-content: center;
  gap: 12px;
  font-size: var(--text-title-xxs);
  color: var(--brand-primary-pure);
  font-weight: bold;
  position: relative;
  padding: 18px 22px;
}
.carousel-container {
  position: relative;
}
.carousel-container {
  overflow: visible;
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
.content-title p {
  font-weight: 400;
  line-height: 160%;
  color: var(--brand-primary-pure);
  font-size: var(--text-body-md);
  margin-top: 24px;
}
.card-content-project img {
  margin-inline: auto;
  width: 68px;
  height: 68px;
  -o-object-fit: container;
  object-fit: contain;
}
.card-content-project h3 {
  font-weight: 700;
  text-align: center;
  line-height: 120%;
  font-size: var(--text-title-xs);
  color: var(--brand-primary-pure);
  margin-bottom: 8px;
}
.card-content-project p {
  font-size: var(--text-body-sm);
  font-style: normal;
  text-align: center;
  font-weight: 500;
  line-height: 160%;
  color: var(--brand-primary-pure);
}

@media screen and (max-width: 768px) {
  .content-title p {
    font-size: var(--text-body-xs);
  }
  .swiper {
    margin-top: 32px;
  }
  section {
    margin-bottom: 64px;
  }
  .item-actions {
    margin-top: 0;
  }
  .card-content-project .icone-item {
    width: 120px;
    height: 120px;
  }
  .card-content-project p {
    font-weight: 400;
  }
}
</style>
