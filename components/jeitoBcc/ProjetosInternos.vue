<template>
  <section>
    <div class="container">
      <div class="content-title t-center">
        <span class="highlight">Projetos internos</span>
        <h2 class="title-xxl">Incentivo e reconhecimento para os nossos</h2>
        <p>Conheça as iniciativas que destacam os talentos da BCC.</p>
      </div>
      <Swiper
        :modules="[Navigation, Pagination, Autoplay]"
        :slides-per-view="4"
        :space-between="56"
        :navigation="true"
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
          v-for="(Projeto, index) in Projetos"
          :key="index"
          class="card-carrossel"
          @click="selected = index"
        >
          <div class="card-content-project">
            <div class="icone-item"><img :src="Projeto.icone" alt="ícone ilustrativo" aria-hidden="true" loading="lazy" /></div>
            <h3>{{ Projeto.titulo }}</h3>
            <p>{{ Projeto.descricao }}</p>
          </div>
        </SwiperSlide>
      </Swiper>
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
  pageBy(uri: "jeito-bcc") {
    jeitoBcc {
      projetos {
        titulo
        descricao
        icone {
          node {
            sourceUrl
          }
        }
      }
    }
  }
}`

const { data: pageData, pending } = useGraphQLFetch(query, {}, 'jeitoBcc-projetos')

const Projetos = computed(() => {
  const JeitoBccPage = pageData.value?.data?.pageBy;
  const itemProjetos = JeitoBccPage?.jeitoBcc?.projetos ?? []; 

  return itemProjetos.map(b => ({
    icone: b.icone?.node?.sourceUrl || '',
    titulo: b.titulo || '',
    descricao: b.descricao || '',
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
.carousel-container {
  width: 100%;
}
.card-carrossel {
  width: 328px;
  transition: 0.3s ease-in-out;
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
  max-width: 100%;
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
  .card-content-project .icone-item {
    width: 120px;
    height: 120px;
  }
  .card-content-project p {
    font-weight: 400;
  }
}
</style>
