<template>
  <section>
    <div class="container">
        <div class="list-card-horizontal">
            <div class="item-cad-horizontal grid">
                <div class="card-horizontal-text">
                    <span class="highlight">Atmosfera BCC</span>
                    <h2 class="title-xxl">O lugar perfeito para crescer e gerar impacto de verdade</h2>
                    <p>
                        Na BCC, o bem-estar encontra seu espaço. Os ambientes foram pensados pra você se sentir à vontade e deixar o trabalho rolar de um jeito leve e produtivo. Aqui, o clima é bom, a energia flui e os resultados acontecem naturalmente.
                        <br><br>
                        A gente se importa de verdade com o modo como você se sente, porque quando o time tá feliz, os talentos vão ainda mais longe!
                    </p>
                </div>
                <div class="card-horizontal-img">
                    <img src="/images/jeitoBcc/pessoas-grafico.png" alt="imagem ilustrativa" aria-hidden="true" loading="lazy" ref="img">
                </div>
            </div>
        </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

const img = ref(null)
let trigger = null

onMounted(() => {
  if (window.innerWidth >= 1024 && img.value) {
    trigger = gsap.fromTo(
      img.value,
      { x: 100, y: 150, opacity: 0, scale: 0.95 },
      {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: img.value,
          start: 'top 90%', 
          end: 'bottom 65%',
          scrub: true
        }
      }
    )
  }
})

onBeforeUnmount(() => {
  trigger?.scrollTrigger?.kill()
})

</script>

<style scoped>
.highlight {
  color: var(--neutral-high-lightest);
  background-color: var(--brand-primary-pure);
}
.item-cad-horizontal {
  display: grid;
  gap: 210px;
  grid-template-columns: 2fr 1.2fr;
}

.card-horizontal-img {
  position: relative;
}
.card-horizontal-img img {
  max-width: 100%;
  position: relative;
  margin-left: auto;
  z-index: 2;
}
.card-horizontal-text h2 {
  color: var(--brand-primary-pure);
  margin-bottom: 24px;
  font-weight: 600;
  line-height: 110%;
}
.card-horizontal-text p {
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
  .content-title.t-center {
      text-align: left;
  }
  .t-center .highlight {
      margin-inline: inherit;
  }
  .item-cad-horizontal {
      gap: 32px;
      grid-template-columns: 1fr;
  }
  .card-horizontal-text p {
      font-size: var(--text-body-xs);
  }
}

</style>
