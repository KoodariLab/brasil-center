<template>
  <section>
        <div class="container">
            <div class="list-card-horizontal">
                <div class="content-title t-center">
                    <span class="highlight" ref="highlight">As bases BCC</span>
                    <h2 class="title-xxl" ref="title">O jeito <span class="word_breaker"></span> BrasilCenter <span class="word_breaker"></span>de fazer </h2>
                </div>
                <div class="item-cad-horizontal grid grid-2">
                    <div class="card-horizontal-img">
                        <img src="/images/sobreBcc/base-bcc.png" alt="imagem ilustrativa" aria-hidden="true" loading="lazy" ref="img_anime">
                    </div>
                    <div class="card-horizontal-text">
                        <div v-for="(item, index) in cardItems" :key="index" class="item-card" :ref="el => itemCards[index] = el">
                          <img :src="item.icon" :alt="item.title" class="card-icon">
                          <h3>{{ item.title }}</h3>
                          <p>{{ item.text }}</p>
                      </div>
                    </div>
                </div>
            </div>   
        </div>   
   </section>

</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';

const highlight = ref(null);
const title = ref(null);
const img_anime = ref(null);
const itemCards = ref([]);

let ctx; 


const cardItems = [
  { icon: '/assets/olho.svg', title: 'Objetivo', text: 'Prover serviços de Contact Center e Vendas aos clientes do Grupo Claro com qualidade diferenciada e custos competitivos.' },
  { icon: '/assets/telescopio.svg', title: 'Perspectiva', text: 'Ser reconhecida pela excelência na gestão de soluções de relacionamento com o cliente.' },
  { icon: '/assets/estrela.svg', title: 'Valores', text: 'Sustentabilidade, cliente, pessoas, inovação e honestidade.' }
];

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Dispara animações só quando a seção aparecer
        gsap.fromTo(title.value, { y: 150, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' });

        gsap.fromTo(highlight.value, { y: 150, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power1.out',  });

        gsap.fromTo(img_anime.value, { y: 250, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out', delay: 0.3 });

        gsap.fromTo(itemCards.value, { y: 350, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: 'power2.out',
          stagger: { amount: 0.6, from: 'start' },
         
        });

        observer.disconnect();
      }
    });
  }, { threshold: 0.2 }); 

  if (title.value) observer.observe(title.value);
});


onUnmounted(() => {
  if (ctx) {
    ctx.revert();
  }
});
</script>

<style scoped>
.highlight {
  color: var(--neutral-high-lightest);
  background-color: var(--brand-secondary-pure);
}
.item-card,
.card-horizontal-img img,
.content-title .title-xxl,
.content-title .highlight {
opacity: 0;
transform: translateY(50px);
}
.item-cad-horizontal {
  display: grid;
  gap: 88px;
  margin-top: 40px;
}
.card-horizontal-img {
  position: relative;
}
.card-horizontal-img img {
  max-width: 100%;
  position: relative;
  z-index: 2;
  object-fit: contain;
}
h2 {
  color: var(--brand-primary-pure);
  margin-bottom: 24px;
  font-weight: 600;
  line-height: 110%;
}
.card-horizontal-text h3 {
  font-weight: bold;
  color: var(--brand-primary-pure);
  line-height: 120%;
  font-size: var(--text-title-xs);
}
.card-horizontal-text p {
  font-weight: 400;
  color: var(--brand-primary-pure);
  line-height: 160%;
  font-size: var(--text-body-sm);
}
.card-horizontal-text {
  display: flex;
  max-width: 450px;
  flex-direction: column;
  gap: 40px;
  margin-left: auto;
}
.card-horizontal-text .item-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.card-horizontal-text .item-card img {
  width: 72px;
}
.card-horizontal-img::after {
  width: 100%;
  height: 100%;
  top: 25%;
  right: 38%;
  position: absolute;
  content: '';
  background-image: url(/assets/detalhe-img.svg);
  z-index: -1;
  background-repeat: no-repeat;
  background-position: top;
  background-size: contain;
}

@media screen and (max-width: 768px) {
    .grid-2{
        grid-template-columns: 1fr;
    }
    .card-horizontal-img img {
        max-width: 70%;
        margin-inline: auto;
    }
    .card-horizontal-img::after {
        display: none;
    }
    .item-cad-horizontal {
        gap: 32px;
    }
    .card-horizontal-text .item-card img {
        margin-inline: auto;
    }
    .card-horizontal-text .item-card {
        text-align: center;
    }
    .card-horizontal-text {
        margin-inline: auto;
    }
}
</style>
