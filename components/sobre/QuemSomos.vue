<template>
  <section>
    <div class="container" v-if="!pending && (sobreData.titulo || sobreData.descricao)">
      <div class="list-card-horizontal">
        <div class="item-cad-horizontal grid grid-2">
          <div class="card-horizontal-text">
            <span class="highlight">Quem somos</span>
            <ClientOnly>
              <h2 class="title-xxl" ref="title" v-html="sobreData.titulo"></h2>
              <div v-html="sobreData.descricao"></div>
            </ClientOnly>
          </div>
          <div v-if="sobreData.imagem" class="card-horizontal-img">
            <img :src="sobreData.imagem" alt="Imagem Sobre" aria-hidden="true" loading="lazy" ref="img_anime">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useGraphQLFetch } from '@/composables/useGraphQLFetch';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const title = ref(null);
const img_anime = ref(null);
let ctx;

const query = `query {
  pageBy(uri: "sobre-bcc") {
    sobreBbc {
      tituloSobreBbc
      descricaoSobreBbc
      imagemSobreBbc {
        node {
          sourceUrl
        }
      }
    }
  }
}`;

const { data: pageData, pending } = useGraphQLFetch(query, {}, 'sobre-quem-somos');

const sobreData = computed(() => {
  const page = pageData.value?.data?.pageBy?.sobreBbc;
  if (!page) {
    return { titulo: '', descricao: '', imagem: '' };
  }
  return {
    titulo: page.tituloSobreBbc || '',
    descricao: page.descricaoSobreBbc || '',
    imagem: page.imagemSobreBbc?.node?.sourceUrl || ''
  };
});

const setupGsapAnimation = () => {
  if (ctx) {
    ctx.revert();
  }

  if (window.innerWidth >= 1024 && img_anime.value && title.value) {
    ctx = gsap.context(() => {
      gsap.fromTo(
        img_anime.value,
        { x: 100, y: 100, opacity: 0, scale: 0.9 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: img_anime.value,
            start: 'top 90%',
            end: 'bottom 60%',
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        title.value,
        { y: 150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title.value,
            start: 'top 95%',
            end: 'top 70%',
            scrub: true,
          },
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
</script>

<style scoped>
section {
    background-color: var(--neutral-high-pure);
}
.highlight {
  color: var(--neutral-high-lightest);
  background-color: var(--brand-secondary-pure);
}
.item-cad-horizontal {
    display: grid;
    gap: 88px;
}
.card-horizontal-img {
    position: relative;
}
.card-horizontal-img img {
    max-width: 100%;
    position: relative;
    z-index: 2;
    aspect-ratio: 1 / 1.02;
    object-fit: contain;
}
.card-horizontal-text h2 {
    color: var(--brand-primary-pure);
    margin-bottom: 24px;
    font-weight: 600;
    line-height: 110%;
}
.card-horizontal-text div * {
    font-style: normal;
    font-weight: 400;
    color: var(--brand-primary-pure);
    line-height: 160%;
    font-size: var(--text-body-sm);
}

@media screen and (max-width: 1180px) {
    .item-cad-horizontal {
        gap: 24px;
    }
}

@media screen and (max-width: 768px) {
    .item-cad-horizontal {
        gap: 16px;
    }
    .card-horizontal-text p {
        font-size: var(--text-body-xs);
    }
    .grid-2 {
        grid-template-columns: 1fr;
    }
}


</style>
