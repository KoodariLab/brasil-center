<template>
  <section>
    <div class="container">
        <div class="list-card-horizontal">
            <div class="item-cad-horizontal grid">
                <div class="card-horizontal-img">
                    <img ref="imgAnime" src="/images/jeitoBcc/para-comecar.png" alt="imagem ilustrativa" aria-hidden="true" loading="lazy">
                </div>
                <div class="card-horizontal-text">
                    <span class="highlight">Para começar e ficar</span>
                    <h2 ref="titleAnime" class="title-xxl t-white">É sobre ser você, se desenvolver e fazer parte de algo maior</h2>
                    <div ref="contentAnime" class="content t-white">
                        <p>Aqui, cada pessoa conta, e as oportunidades são para todos. A gente acredita na força do todo e num ambiente onde o crescimento é real e acessível.
                        <br><br>
                          Fazer parte da nossa equipe é entrar para uma galera que se apoia, compartilha e caminha junto. E o melhor: seu potencial é bem-vindo do jeito que é,
                           independentemente da sua história, cor, idade, gênero, orientação, religião ou se você possui alguma deficiência (PCD). Na BCC, todo mundo tem vez e voz.
                      </p>
                    </div>
                    <NuxtLink href="https://vemprabcc.gupy.io/" class="button-bcc" target="_blank">Vem ser BCC</NuxtLink>
                </div>
            </div>
        </div>
    </div>
     
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const imgAnime = ref(null);
const titleAnime = ref(null);
const contentAnime = ref(null);

let ctx; 

onMounted(() => {
  if (window.innerWidth >= 1024) {
    if (!imgAnime.value || !titleAnime.value || !contentAnime.value) {
      return;
    }

    ctx = gsap.context(() => {
      gsap.fromTo(
        imgAnime.value,
        { y: 150, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imgAnime.value,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: true
          }
        }
      );

      gsap.fromTo(
        titleAnime.value,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleAnime.value,
            start: 'top 95%',
            end: 'top 70%',
            scrub: true
          }
        }
      );

      gsap.fromTo(
        contentAnime.value,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          delay: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentAnime.value,
            start: 'top 95%',
            end: 'top 70%',
            scrub: true
          }
        }
      );
    }, null);
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
    position: relative;
    background-color: var(--brand-secondary-pure);
}
.highlight {
  color: var(--neutral-high-lightest);
  background-color: var(--brand-secondary-dark);
}
.item-cad-horizontal {
    display: grid;
    gap: 69px;
    grid-template-columns: 1fr 1.2fr;
}
.item-cad-horizontal .content {
    margin-bottom: 32px;
}
.card-horizontal-img {
    position: relative;
    margin-top: 64px;
}
.card-horizontal-img img {
    max-width: 100%;
    position: relative;
    margin-left: auto;
    z-index: 2;
}
.card-horizontal-text h2 {
    margin-bottom: 24px;
    font-weight: 600;
    line-height: 110%;
}
.card-horizontal-text p {
    font-style: normal;
    font-weight: 400;
    line-height: 160%;
    font-size: var(--text-body-sm);
}

@media screen and (max-width: 768px) {
    .item-cad-horizontal {
        gap: 32px;
        display: flex;
        flex-direction: column-reverse;
    }
    .card-horizontal-img {
        margin-top: 0;
    }
    .card-horizontal-text p {
        font-size: var(--text-body-xs);
    }
}
</style>
