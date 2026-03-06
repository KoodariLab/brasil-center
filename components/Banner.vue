<template>
  <div class="Banner">
    <!-- SVG inline como background -->
    <object
      v-if="isDesktop && background"
      :data="background"
      type="image/svg+xml"
      class="banner-svg-background"
    ></object>

    <object
      v-else-if="!isDesktop && backgroundMobile"
      :data="backgroundMobile"
      type="image/svg+xml"
      class="banner-svg-background"
    ></object>

    <Swiper
      :modules="[Navigation, Pagination, Autoplay]"
      :slides-per-view="1"
      :pagination="{ clickable: true }"
      class="mySwiper"
      :autoplay="{ delay: 4000 }"
      :loop="false"
      :touch-release-on-edges="true"
      :breakpoints="{
        0: { direction: 'vertical' },
        768: { direction: 'horizontal' }
      }"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <slot :slide="slide" :index="index" />
      </SwiperSlide>
    </Swiper>
    
  </div>
</template>

<script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { Navigation, Pagination, Autoplay } from 'swiper/modules'

  import 'swiper/css'
  import 'swiper/css/pagination'

  const props = defineProps({
    slides: { type: Array, default: () => [] },
    background: { type: String, default: '' },
    backgroundMobile: { type: String, default: '' }
  })

  const isDesktop = ref(false);
  const breakpoint = 768;
  
  const checkScreenSize = () => {
    if (window.innerWidth >= breakpoint) {
      isDesktop.value = true;
    } else {
      isDesktop.value = false;
    }
  };


  onMounted(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize);
  });
  
</script>

<style >
.Banner {
  position: relative;
  display: flex;
  overflow: hidden;
  align-items: center;
  height: 855px
}
.Banner .swiper-slide {
  display: flex;
  align-items: center;
}
.swiper-pagination {
  bottom: 48px !important;
}
object.banner-svg-background {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.Banner .swiper-pagination-bullet {
  background: var(--brand-secondary-light) !important;
}
.Banner .swiper-pagination-bullet-active {
  background: var(--brand-secondary-darkest) !important;
}

@media screen and (min-width: 991px) and (max-width: 1366px) {
  .Banner {
    height: 600px;
  }
  .Banner .grid-item-banner-texto h2 {
    font-size: var(--text-title-md);
  }
}

@media (max-width: 768px) {
  object.banner-svg-background {
    height: 300px;
    top: initial;
    bottom: -100px;
  }
  .Banner .grid-item-banner picture img {
    width: 100%;
  }
  img.icon-banner-cad {
    display: none !important;
  }
  .Banner {
    height: 694px !important;
  }
  .Banner .button-banner {
    width: 100% !important;
  }
  .Banner .swiper-slide {
    align-items: flex-start;
  }
  .Banner .grid-item-banner-texto {
    width: auto !important;
  }
  .Banner .grid-item-banner {
    flex-direction: column-reverse !important;
    gap: 10px !important;
  }
  .Banner .grid-item-banner-texto h2 {
    font-size: var(--text-title-xs);
  }
  .Banner .grid-item-banner-texto h3 {
    font-size: var(--text-body-xxs);
  }
  .Banner .grid-item-banner picture {
    width: calc(100% + 50px);
  }
  .swiper-pagination {
    bottom: -42px !important;
    gap: 8px;
    display: flex;
    flex-direction: column;
  }
  .item-banner.container.banner-alternativo::after {
    background: linear-gradient(0deg, transparent, #00A851);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    display: block;
    content: "";
    left: 0;
    z-index: -1;
  }
  
}
</style>
