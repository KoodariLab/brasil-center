<template>
    <section>
        <div class="container">
            <div class="list-card-horizontal">
                <div class="item-cad-horizontal grid">
                    <div class="card-horizontal-text">
                        <span class="highlight">Prioridades</span>
                        <h2 class="title-xxl">A gente valoriza o que é mais importante</h2>
                        <p>Um time de talentos vibrantes que cresce no bem-estar coletivo e tem ações e prioridades bem definidas.</p>

                        <div class="list-itens grid grid-2">
                            <div class="item-list" v-for="(item, index) in Prioridade" :key="index">
                                <picture class="div-icon" v-if="item.icone">
                                    <img :src="item.icone" :alt="'ícone de ilustração para'+item.titulo" aria-hidden="true" loading="lazy"></img>
                                </picture>
                                <h4 v-if="item.titulo">{{ item.titulo }}</h4>
                                <p v-if="item.descricao">{{ item.descricao }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="card-horizontal-img">
                        <picture>
                            <source srcset="/images/jeitoBcc/pessoa-prioridade.png" media="(max-width: 768px)" />
                           <img ref="imgParallax" src="/images/jeitoBcc/pessoa-prioridade.png" alt="imagem ilustrativa" aria-hidden="true" loading="lazy">
                        </picture>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div v-if="is_desktop" class="background-parallax" style="background-image: url('/images/jeitoBcc/bg-parallax.jpg');"></div>
</template>

<script setup>
import { computed } from 'vue'
import { useGraphQLFetch } from '@/composables/useGraphQLFetch'
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const imgParallax = ref(null)
const is_desktop = ref(true)
let ctx

const query = `query {  
    pageBy(uri: "jeito-bcc") {
    jeitoBcc {
        prioridades {
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

const { data: pageData, pending } = useGraphQLFetch(query, {}, 'jeitoBcc-prioridades')

const Prioridade = computed(() => {
  const JeitoBccPage = pageData.value?.data?.pageBy;
  const itemPrioridade = JeitoBccPage?.jeitoBcc?.prioridades ?? []; 

  return itemPrioridade.map(b => ({
    icone: b.icone?.node?.sourceUrl || '',
    titulo: b.titulo || '',
    descricao: b.descricao || '',
  }));
});

onMounted(() => {
    if (window.innerWidth >= 1024)
    {
        ctx = gsap.context(() => {
        gsap.to(imgParallax.value,
        {
            y: 400,
            duration: 1.5,
            ease: 'power1.out',
            scrollTrigger: {
            trigger: imgParallax.value,
            start: 'top top',
            end: 'bottom center',
            scrub: true
            }
        })
        }, imgParallax.value)
    }
})

</script>

<style scoped>
.background-parallax {
    height: 276px;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
}
section{
    background-color: var(--neutral-high-pure);
}
.highlight {
  color: var(--brand-primary-pure);
  background-color: var(--neutral-high-lightest);
}
.item-cad-horizontal {
    display: grid;
    gap: 210px;
    grid-template-columns: 2fr 1.1fr;
}
.card-horizontal-img {
    position: relative;
    display: flex;
}
.card-horizontal-img img {
    max-width: 100%;
    position: relative;
    margin-left: auto;
    z-index: 2;
    margin-top: auto;
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
.list-itens {
    gap: 84px 56px;
    margin-top: 72px;
}
.list-itens .item-list img {
    max-width: 100%;
    object-fit: contain;
}
picture.div-icon {
    overflow: hidden;
    background: #fff;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
}
.item-list h4 {
    color: var(--brand-primary-pure);
    font-weight: bold;
    margin-bottom: 8px;
    line-height: 120%;
    font-size: var(--text-title-xs);
}
.card-horizontal-img::before {
    content: '';
    position: absolute;
    right: -37%;
    top: 0;
    width: 100%;
    height: 112%;
    background-image: url(/assets/fundo-curvas.svg);
    background-repeat: no-repeat;
    background-position: top;
}

@media screen and (max-width: 1180px) {
    .item-cad-horizontal {
        gap: 24px;
    }
}

@media screen and (max-width: 768px) {
    picture.div-icon {
        margin-inline: auto;
    }
    span.highlight {
        margin-inline: auto;
    }
    .card-horizontal-text {
        text-align: center;
    }
    .card-horizontal-text h2 {
        padding-inline: 40px;
    }
    .item-cad-horizontal {
        gap: 56px;
        grid-template-columns: 1fr;
    }
    .card-horizontal-text p {
        font-size: var(--text-body-xs);
    }
    .card-horizontal-img::before{
        display: none;
    }
    .item-list p {
        font-size: var(--text-body-sm);
    }
    .list-itens .item-list img {
        margin-inline: auto;
    }
    .list-itens.grid.grid-2 {
        grid-template-columns: 1fr;
        max-width: 320px;
        margin-inline: auto;
    }
    .list-itens {
        gap: 56px;
        margin-top: 56px;
    }
    .card-horizontal-img img {
        max-width: 75%;
        margin-inline: auto;
    }
}

</style>
