<template>
    <section>
        <div class="container">
            <div class="content-title">
                <span class="highlight">Nossa cultura</span>
                <h2 class="title-xxl t-white">{{ titulo }}</h2>
                <p class="t-white">Ambientes e estruturas que tornam tudo mais leve e uma cultura onde pessoas vêm antes de qualquer coisa.</p>
            </div>
            <div class="grid-wrapper">
              <div class="grid" ref="gridRef">
                <img v-for="(img, i) in images" :key="i" :src="img.thumbnail" :alt="img.alt" class="item" loading="lazy" />
              </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useGraphQLFetch } from '@/composables/useGraphQLFetch';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

gsap.registerPlugin(ScrollTrigger);

let ctx
const gridRef = ref(null)

const query = `query {
  pageBy(uri: "home") {
    title
    home {
      titulocultura
      listaDeImagens {
        imagem {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
}`

const { data: pageData, pending } = useGraphQLFetch(query, {}, 'home-nossa-cultura')
const homePage = computed(() => pageData.value?.data?.pageBy || null);

const images = computed(() => {
  const listaDeImagens = homePage.value?.home?.listaDeImagens || [];
  return listaDeImagens.map(b => ({
    thumbnail: b.imagem?.node?.sourceUrl || '',
    alt: b.imagem?.node?.altText || ''
  }));
});

const titulo = computed(() =>{
  return homePage.value?.home?.titulocultura || ''
});


const setupGsapAnimation = () => {
  if (ctx) {
    ctx.revert();
  }

  if (window.innerWidth >= 1024 && gridRef.value) {
    ctx = gsap.context(() => {
      const items = gridRef.value.querySelectorAll('.item');

      gsap.set(items, { opacity: 0, y: 40 });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        ease: 'power2.out',
        duration: 0.8,
        scrollTrigger: {
          trigger: gridRef.value,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }, gridRef.value);
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

</script>

<style scoped>
span.highlight {
    background: var(--brand-primary-dark);
}
section {
    background-color: var(--brand-primary-pure);
    background-image: url(/assets/curvas.svg);
    background-position: bottom;
    background-size: contain;
    background-repeat: no-repeat;
}
.grid {
    grid-template-columns: 6fr 1fr;
}
.title-xxl {
    position: relative;
}
.title-xxl::after {
    content: '';
    width: 178px;
    height: 274px;
    background-image: url(/assets/estrelas.png);
    background-repeat: no-repeat;
    background-position: right;
    background-size: contain;
    position: absolute;
    top: -50px;
    right: -30%;
}
.content-title {
    max-width: 980px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 54px;
}
.grid-wrapper {
    max-width: 1020px;
}

p {
  font-weight: 400;
  font-size: var( --text-body-md);
  line-height: 160%;
}
.item {
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
}

.grid img {
  object-fit: cover;
  object-position: center;
}

@media screen and (max-width: 1280px) {
  .content-title {
    gap: 0;
  }
}

@media screen and (min-width: 1050px) {
  .grid {
    gap: 15px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 15px 28px 152px 100px 80px 80px 55px 125px;
    grid-auto-flow: row dense;
  }
  .grid > img:nth-child(1) {
    grid-column-start: 1;
    grid-row-end: 1;
    grid-row-start: 1;
    height: 342px;
  }
  .grid > img:nth-child(2) {
    grid-column-start: 2;
    grid-row-start: 3;
    grid-row-end: span 3;
    height: 457px;
  }
  .grid > img:nth-child(3) {
    grid-column-start: 3;
    grid-row-start: 2;
    grid-row-end: span 1;
    height: 195px;
  }
  .grid > img:nth-child(4) {
    grid-column-start: 1;
    grid-row-start: 5;
    grid-row-end: span 1;
    height: 342px;
  }
  .grid > img:nth-child(5) {
    grid-column-start: 2;
    grid-row-start: 7;
    grid-row-end: span 1;
    height: 195px;
  }
  .grid > img:nth-child(6) {
    grid-column-start: 3;
    grid-row-start: 4;
    grid-row-end: span 1;
    height: 195px;
}
  .grid > img:nth-child(7) {
    grid-column-start: 3;
    grid-row-end: 7;
    height: 195px;
  }
}

@media screen and (max-width: 1049px) {
  .grid {
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    grid-auto-flow: row dense;
  }
  .grid > img:nth-child(1) {
    grid-column-start: 1;
    grid-row-start: 1;
    margin-top: 40px;
  }
  .grid > img:nth-child(2) {
    grid-column-start: 2;
    grid-row-start: 2;
    margin-top: -232px;
  }
  .grid > img:nth-child(3) {
    grid-column-start: 2;
  }
  .grid > img:nth-child(4) {
    grid-column-start: 1;
  }
  .grid > img:nth-child(5) {
    grid-column-start: 1;
  }
  .grid > img:nth-child(6) {
    grid-column-start: 2;
    margin-top: -54px;
  }
  .grid > img:nth-child(7) {
    margin-top: -54px;
    grid-column-start: 2;
  }
}

@media screen and (min-width: 1640px) {
  section {
    background-position: 0 1100px;
  }
}

@media screen and (max-width: 768px) {
  section {
    background-image: none;
  }
  .content-title {
    gap: 0;
  }
  .title-xxl::after {
    width: 75px;
    height: 115px;
    background-image: url(/assets/estrela-mobile.svg);
    top: -115px;
    right: 0;
  }
  .grid > img:nth-child(2) {
    grid-column-start: 2;
    grid-row-start: 2;
    margin-top: -125px !important;
  }
}
</style>