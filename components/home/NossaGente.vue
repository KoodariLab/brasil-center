<template>
  <section>
    <div class="container">
        <div class="content-title">
          <span class="highlight">Nossa gente</span>
          <h2 class="title-xxl">
            Na BCC, o sucesso <span class="word_breaker"></span> começa com <span class="word_breaker"></span>reconhecimento<span class="word_breaker"></span> e evolução
          </h2>
        </div>
        <div class="list-card-horizontal">

            <div class="item-cad-horizontal grid grid-2">
                <picture class="card-horizontal-img">
                    <source media="(max-width: 768px)" srcset="/images/home/menino-mobi.png">
                    <img src="/images/home/menino.png" alt="Ilustração de Diversidade com total inclusão" aria-label="true" loading="lazy" ref="img1">
                </picture>
                <div class="card-horizontal-text">
                    <h3>Diversidade com <br> total inclusão</h3>
                    <div class="paragr">
                      <p>
                        Acreditamos que a inovação acontece quando se junta a pluralidade dos perfis, com chances e oportunidades de cada um ser do jeito que é.
                      </p><br>
                      <p>Respeitamos a diversidade e queremos que todo mundo se sinta em casa. Por isso, para nós, inclusão não é um conceito, é a ação que transforma as diferenças na força que dá voz e espaço para todos.</p>
                    </div>
                  </div>
            </div>

            <div class="item-cad-horizontal grid grid-2">
                 <picture class="card-horizontal-img">
                    <source media="(max-width: 768px)" srcset="/images/home/menina-mobi.png">
                    <img src="/images/home/menina.png" alt="Ilustração de Reconhecimento e valorização" aria-label="true" loading="lazy" ref="img2">
                </picture>
                <div class="card-horizontal-text">
                    <h3>Cresça e decole!</h3>
                    <div class="paragr">
                        <p>
                            Nós não só acreditamos no seu crescimento, mas o incentivamos. Com programas que funcionam como trilhas personalizadas, você vai de iniciante a especialista com todo o suporte. Cola na BCC para desenvolver os seus talentos e habilidades ao máximo!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

gsap.registerPlugin(ScrollTrigger);

const img1 = ref(null);
const img2 = ref(null);

let ctx;

onMounted(() => {
  if (window.innerWidth >= 1024) {
    if (!img1.value || !img2.value) {
      return;
    }

    ctx = gsap.context(() => {
      const imgs = [img1.value, img2.value];

      imgs.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 300, scale: 0.9 },
          {
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: 'power1.out',
            scrollTrigger: {
              start: 'top 90%', 
              end: 'bottom 65%',
              trigger: el,
              scrub: true,
              markers: false,
            }
          }
        );
      });
    });
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
  background-color: var(--brand-primary-lightest);
}
.highlight {
  color: var(--brand-primary-pure);
  background-color: var(--neutral-high-lightest);
}
h2 {
  max-width: 756px;
  color: var(--brand-primary-pure);
}
.item-cad-horizontal {
  display: grid;
  gap: 126px;
  align-items: center;
}
.card-horizontal-img {
  position: relative;
}
.card-horizontal-img img {
  max-width: 100%;
  position: relative;
  z-index: 2;
  object-fit: contain;
  /* transition: 0.3s; */
}
.card-horizontal-text h3 {
  font-size: var(--text-title-lg);
  color: var(--brand-primary-pure);
  margin-bottom: 24px;
  font-weight: 600;
  line-height: 110%;
}
.card-horizontal-text p {
  font-style: normal;
  font-weight: 400;
  color: var(--brand-primary-darkest);
  line-height: 160%;
  font-size: var(--text-body-sm);
  direction: ltr;
}
.list-card-horizontal {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 82px;
}
.list-card-horizontal .item-cad-horizontal:nth-child(2n+1) {
  direction: rtl;
}
.list-card-horizontal .item-cad-horizontal:nth-child(2n+1) .card-horizontal-text {
  text-align: left;
}
.card-horizontal-img::after {
  width: 100%;
  height: 135%;
  content: '';
  position: absolute;
  top: -15%;
  right: 0;
  z-index: 0;
}
.list-card-horizontal .item-cad-horizontal .card-horizontal-img::after {
  background-image: url('/assets/detalhe-diversidade-2.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  right: 230px;
  top: -5%;
  transform: rotate(180deg);
}
.list-card-horizontal .item-cad-horizontal:nth-child(2n+1) .card-horizontal-img::after {
  background-image: url('/assets/detalhe-diversidade-1.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  right: -230px;
  transform: rotate(0);
}

@media screen and (max-width: 768px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }
  .item-cad-horizontal {
    display: grid;
    gap: 20px;
  }
  .list-card-horizontal .item-cad-horizontal:nth-child(2n+1) .card-horizontal-img::after{
    background-image: url(/assets/details-img-mobile-1.svg);
    right: -33%;
    top: -7%;
  }
  .list-card-horizontal .item-cad-horizontal .card-horizontal-img::after{
    background-image: url(/assets/graficos-2.svg);
    top: -32px;
    right: inherit;
    left: -35%;
    transform: rotate(0);
    height: 114%;
  }
  .list-card-horizontal {
    margin-top: 24px;
  }
  .card-horizontal-text {
    position: relative;
    z-index: 1;
  }
  .card-horizontal-text h3 {
    font-size: var(--text-title-xs);
    margin-bottom: 16px;
  }
  .card-horizontal-text p {
    font-size: var(--text-body-xs);
  }
  .list-card-horizontal {
    gap: 50px;
  }
  .card-horizontal-img img {
    width: 100%;
  }
}
</style>
