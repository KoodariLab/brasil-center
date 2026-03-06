<template>
  <section v-if="items" class="Essencia">
    <div class="container">
      <div class="content-title">
        <span class="highlight" ref="highlight">Nossa essência</span>
        <h2 class="title-xxl" ref="titleText">{{ titulo }}</h2>
      </div>

      <Swiper
        :modules="[Pagination]"
        :slides-per-view="5"
        :space-between="16"
        class="carousel-container"
        :pagination="{ el: paginationRef, clickable: true }"
        :breakpoints="{
          0: { slidesPerView: 1.1, spaceBetween: 12 },
          640: { slidesPerView: 2.5, spaceBetween: 16 },
          1024: { slidesPerView: 5, spaceBetween: 16 }
        }"
      >
        <SwiperSlide
          v-for="(item, index) in items"
          :key="index"
          class="carousel-item"
          :class="{
            active: hoverIndex !== null ? hoverIndex === index : defaultActive === index || selected === index
          }"
          @mouseenter="hoverIndex = index"
          @mouseleave="hoverIndex = null"
        >
          <video
            alt="vídeos do tiktok da Brasil Center"
            loading="lazy"
            :ref="el => { if (el) videoRefs[index] = el }"
            playsinline
            preload="metadata"
          >
            <source :src="item.thumbnail" type="video/mp4" />
          </video>

          <div class="overlay"></div>

          <button
            class="play-button" :class="{ active: selected === index }"
            @click.stop="toggleFixed(index)"
          >
            <span v-if="selected === index"><img src="/assets/botao-pausa.svg" alt="ícone play"></span>
            <span v-else><img src="/assets/botao-play.png" alt="ícone play"></span>
          </button>
        </SwiperSlide>
      </Swiper>

      <div ref="paginationRef" class="custom-swiper-pagination"></div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useGraphQLFetch } from '@/composables/useGraphQLFetch';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Pagination } from 'swiper/modules';
import { gsap } from 'gsap';
const paginationRef = ref(null);

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

gsap.registerPlugin(ScrollTrigger);

const hoverIndex = ref(null); 
const selected = ref(null);
const defaultActive = ref(0)
const videoRefs = ref([]);
const highlight = ref(null);
const titleText = ref(null);
let ctx;

const query = `query {
  pageBy(uri: "home") {
    title
    home {
      tituloDe
      videos {
        uploadVideo {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
}`;

const { data: pageData, pending } = useGraphQLFetch(query, {}, 'home-essencia');
const homePage = computed(() => pageData.value?.data?.pageBy || null);

const items = computed(() => {
  const videos = homePage.value?.home?.videos || [];
  return videos.map(b => ({
    thumbnail: b.uploadVideo?.node?.mediaItemUrl || ''
  }));
});

const titulo = computed(() => {
  return homePage.value?.home?.tituloDe || '';
});

function toggleFixed(index) {
  const video = videoRefs.value[index];
  if (!video) return;

  if (selected.value === index) {
    // se já está ativo, desativa
    video.pause();
    video.currentTime = 0;
    selected.value = null;
  } else {
    // para todos os outros
    videoRefs.value.forEach((v, i) => {
      if (v && i !== index) {
        v.pause();
        v.currentTime = 0;
      }
    });
    selected.value = index;
    video.muted = false;
    video.play().catch(() => {});
  }
}

const setupGsapAnimation = () => {
  if (ctx) {
    ctx.revert();
  }

  if (window.innerWidth >= 1024 && highlight.value && titleText.value) {
    ctx = gsap.context(() => {
      gsap.fromTo(
        highlight.value,
        { y: -100, opacity: 0, rotation: -4 },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: highlight.value,
            start: 'top 80%',
            toggleActions: 'restart none none reset'
          }
        }
      );

      gsap.fromTo(
        titleText.value,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.1,
          scrollTrigger: {
            trigger: titleText.value,
            start: 'top 80%',
            toggleActions: 'restart none none reset'
          }
        }
      );
    });
  }
};

watch(pending, (newPending) => {
  if (!newPending) {
    setupGsapAnimation();
  }
});

onMounted(() => {
  if (!pending.value) {
    setupGsapAnimation();
  }
});

onUnmounted(() => {
  if (ctx) {
    ctx.revert();
  }
});

watch(items, (newItems) => {
  if (newItems.length > 0) {
    defaultActive.value = 0;
  }
});
</script>


<style scoped>
@media (min-width: 1024px) {
  .swiper-pagination {
    display: none;
  }
}
.grid.grid-2 {
  align-items: flex-end;
}
.grid {
  grid-template-columns: 2fr 1.7fr;
  align-items: flex-end;
}
.title-xxl {
  position: relative;
  max-width: 660px;
  color: var(--brand-secondary-pure) !important;
}
.title-xxl::after {
  content: '';
  width: 178px;
  height: 274px;
  background-image: url(/assets/icone-coracoes.png);
  background-repeat: no-repeat;
  background-position: right;
  background-size: contain;
  position: absolute;
  top: 0;
  right: -50%;
}
.img-essencia {
  height: 276px;
  object-fit: contain;
  margin-left: 115px;
}
.carousel-container {
  margin-top: 100px;
  padding: 0 20px;
}
.carousel-item {
  width: 260px;
  height: 630px;
  border-radius: 25px;
  overflow: hidden; 
  cursor: pointer;
  position: relative;
  transition: width 0.4s ease;
  margin-top: 10px;
  margin-bottom: 10px;
  transition: 0.3s;
}
.swiper-slide.carousel-item:hover:not(.active) {
  outline: 6px solid var(--brand-secondary-pure);
}
.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: -1;
}
.carousel-item .overlay {
  position: absolute;
  inset: 0;
  background: #005EEB;
  mix-blend-mode: multiply;
  z-index: 0;
}
.carousel-item .play-button {
  border: none;
  background: transparent;
  cursor: pointer;
  position: absolute;
  top: 50%;
  z-index: -1;
  left: 50%;
  transform: translate(-50%, -50%);
}
.custom-swiper-pagination span.swiper-pagination-bullet.swiper-pagination-bullet-active {
  background: var(--brand-secondary-pure) !important;
}
.custom-swiper-pagination .swiper-pagination-bullet {
  background: var(--neutral-low-medium) !important;
}
.carousel-item.active .play-button {
 z-index: 1;
}
video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.carousel-item.active .overlay {
  background-size: cover;
  background-image: url('/assets/iphone.svg');
  background-repeat: no-repeat;
  background-color: transparent;
}
.play-button {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255,255,255,0.8);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 2;
}
.carousel-item:hover .play-button,
.carousel-item.active .play-button {
  opacity: 1;
}

@media screen and (min-width: 991px) {
  .carousel-item.active {
    width: 330px !important;
    border-radius: 57px;
  }
  .carousel-item {
    width: 260px !important;
  }
}

@media screen and (max-width: 768px) {
  .swiper-slide.swiper-slide-active .overlay {
    background-color: transparent;
  }
  .play-button {
    opacity: 1 !important;
    z-index: 2 !important;
  }
  .carousel-item {
    aspect-ratio: 1 / 1.9;
    height: auto;
    border-radius: 64px;
  }
  .title-xxl::after {
    width: 80px;
    height: 128px;
    top: -97px;
    right: -28%;
  }
  .title-xxl {
    max-width: 75%;
  }
  .custom-swiper-pagination {
    display: flex;
    justify-content: center;
    padding-top: 48px;
  }
  .swiper-slide.carousel-item:not(.active) {
    outline: 6px solid var(--brand-secondary-pure);
  }
  .carousel-container {
    margin-top: 32px;
  }
}

@media screen and (max-width: 460px) {
  .swiper-slide {
    transform: scale(0.9);
    transition: 0.8s;
  }
  .swiper-slide.swiper-slide-active {
    transform: scale(1);
  }
  .carousel-item {
    border-radius: 59px;
  }
}
@media screen and (max-width: 375px) {
  .carousel-item {
    border-radius: 46px;
  }
 
}
</style>