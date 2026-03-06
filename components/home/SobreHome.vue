<template>
    <section ref="scrollContentSobre">
        <div class="container" ref="containerSobre">
            <span class="highlight">Sobre nós</span>
            <h2>Olá! Somos <span class="asterisco"></span><br> a BrasilCenter</h2>
            <div class="grid-item grid">
                <div class="content-grid-item">
                    <p ref="stickyTitleSobre">Desde 1998, somos a empresa de relacionamento com o cliente da Claro. 
Por aqui, a gente transforma serviços como suporte técnico, ouvidoria, BackOffice, atendimento ao consumidor e vendas em experiências que conectam pessoas com inovação e humanização do início ao fim.</p>
                </div>
                <picture>
                    <source media="(max-width: 768px)" srcset="/images/home/imagem-mobile-home-quem-somos.png">
                    <img src="/images/home/img-quem-somos-home.png" alt="imagem ilustrativa de uma mulher com um notebook na mão e um fundo azul com logo da claro" class="img-quem-somos" loading="lazy">
                </picture>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const containerSobre = ref(null)
const stickyTitleSobre = ref(null)
const scrollContentSobre = ref(null)
let ctx

const setupScrollTrigger = () => {
  if (ctx) ctx.revert()

  if (window.innerWidth >= 1024 && stickyTitleSobre.value && containerSobre.value) {
    ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: stickyTitleSobre.value,
        start: 'center center',
        end: () => `${containerSobre.value.offsetHeight - stickyTitleSobre.value.offsetHeight - 800} / 2`,
        pin: stickyTitleSobre.value,
        scrub: true,
        anticipatePin: 1,
        markers: false
      })
    }, containerSobre.value)
  }
}
 
onMounted(() => {
    setupScrollTrigger()
})

onBeforeUnmount(() => {
  ctx && ctx.revert()
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<style scoped>
section {
    background-image: url(/assets/after-quem-somos.png);
    background-repeat: no-repeat;
    background-position: bottom;
}
section h2 {
    font-size: var(--text-title-xxxl);
    line-height: 100%;
    color: var(--brand-secondary-pure);
    font-weight: 600;
    position: relative;
    margin-bottom: 32px;
}
.content-grid-item p {
    color: var(--brand-secondary-dark);
    font-size: var(--text-body-sm);
    line-height: 160%;
}
.grid-item {
    gap: 132px;
    padding-left: 48px;
    grid-template-columns: 1fr 2fr;
}
img.img-quem-somos {
    max-width: 100%;
    height: 979px;
    object-fit: contain;
}
.asterisco {
    width: 148px;
    height: 148px;
    background-image: url(/assets/asterisco.svg);
    background-repeat: no-repeat;
    background-position: center;
    display: inline-block;
    position: relative;
    top: 30px;
}

@media screen and (max-width: 1280px) {
    span.asterisco {
        background-size: contain;
        width: 80px !important;
        height: 80px !important;
        top: 10px !important;
    }
    section h2 {
        font-size: 140px;
    }
}

@media screen and (max-width: 1180px) {
    section h2 {
        font-size: var(--text-title-xxl);
    }
    .asterisco {
        width: 80px;
        height: 80px;
        background-size: contain;
        top: 15px;
    }
    .grid-item {
        gap: 56px;
        padding-left: 0;
        grid-template-columns: 1fr 1fr;
    }
    img.img-quem-somos {
        height: auto;
    }
    section {
        background-position: center 135%;
    }
}

@media screen and (max-width: 768px) {
    section {   
        background-position: center 106%;
        background-size: contain;
    }
    section h2 {
        font-size: var(--text-title-lg);
        line-height: 110%;
    }
   
    .content-grid-item p {
        font-size: var(--text-body-xs);
    }
    .grid-item {
        gap: 0;
        padding-left: 0;
        grid-template-columns: 1fr;
    }
    img.img-quem-somos {
        height: auto;
        width: calc(100% + 18px) !important;
        position: relative;
        left: -16px;
        margin-top: 40px;
    }
}
</style>