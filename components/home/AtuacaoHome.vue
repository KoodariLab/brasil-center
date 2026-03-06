<template>
  <section ref="scrollContent">
    <div class="container" ref="container">
      <div class="grid grid-2">
        <div class="content-title">
          <div ref="stickyTitle">
            <span class="highlight">Atuação</span>
            <h2 class="title-xxl t-white">{{ titulo }}</h2>
          </div>
        </div>
        <div class="content-numbers">
          <div class="item-atuacao" v-for="(item, index) in atuacaoItems" :key="index">
            <img :src="item.icon" :alt="'ícone para'+item.label" class="icon-atuacao" aria-hidden="true" loading="lazy">
            <h4 :ref="el => numberRefs[index] = el">{{ animatedValues[index] || item.value }}</h4>
            <p>{{ item.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useGraphQLFetch } from '@/composables/useGraphQLFetch'
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const container = ref(null)
const stickyTitle = ref(null)
const scrollContent = ref(null)
const animatedValues = ref([])
const numberRefs = [] // guarda os refs dos <h4>
let ctx

const query = `query {
  pageBy(uri: "home") {
    title
    home {
      tituloDeAtuacao
      findOut {
        icone {
          node {
            id
            sourceUrl
          }
        }
        numero
        descricao
      }
    }
  }
}`

const { data: pageData, pending } = useGraphQLFetch(query, {}, 'home-atuacao')
const homePage = computed(() => pageData.value?.data?.pageBy || null)

const atuacaoItems = computed(() => {
  const findOut = homePage.value?.home?.findOut || []
  return findOut.map(b => ({
    icon: b.icone?.node?.sourceUrl || '',
    value: b.numero || '',
    label: b.descricao || ''
  }))
})

const titulo = computed(() => {
  return homePage.value?.home?.tituloDeAtuacao || ''
})

function animateNumber(index, rawValue) {
  const match = rawValue.match(/([\+\-]?\d+)(\s*\w*)?/)
  if (!match) {
    animatedValues.value[index] = rawValue
    return
  }

  const number = parseInt(match[1])
  const suffix = match[2] || ''
  const obj = { val: 0 }

  gsap.to(obj, {
    val: number,
    duration: 2,
    ease: 'power1.out',
    onUpdate: () => {
      const formatted = new Intl.NumberFormat('pt-BR').format(Math.floor(obj.val))
      animatedValues.value[index] = `+${formatted}${suffix}`
    },
    onComplete: () => {
      animatedValues.value[index] = rawValue
    }
  })
}

const setupNumberScrollTriggers = () => {
  ScrollTrigger.batch(numberRefs, {
    onEnter: batch => {
      batch.forEach((el) => {
        const index = numberRefs.indexOf(el)
        if (index !== -1 && !animatedValues.value[index]) {
          const item = atuacaoItems.value[index]
          animateNumber(index, item.value)
        }
      })
    },
    start: 'top 85%',
    once: true, // Evita reanimação
  })
}

const setupScrollTrigger = () => {
  if (ctx) ctx.revert()

  if (window.innerWidth >= 1024 && stickyTitle.value && container.value) {
    ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: stickyTitle.value,
        start: 'center center',
        end: () => `${container.value.offsetHeight - stickyTitle.value.offsetHeight - 400} / 2`,
        pin: stickyTitle.value,
        scrub: true,
        anticipatePin: 1,
        markers: false
      })
    }, container.value)
  }
}

watch(pending, (newPending) => {
  if (!newPending) {
    animatedValues.value = []
    setupScrollTrigger()
    setupNumberScrollTriggers()
  }
})

onMounted(() => {
  if (!pending.value) {
    setupScrollTrigger()
    setupNumberScrollTriggers()
  }
})

onBeforeUnmount(() => {
  ctx && ctx.revert()
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<style scoped>
section {
  position: relative;
  background-color: var(--brand-primary-pure);
}
.title-xl {
  color: var(--neutral-high-lightest);
}
.content-numbers {
  display: flex;
  flex-direction: column;
  gap: 112px;
  position: relative;
}
img.icon-atuacao {
  width: 98px;
  height: 98px;
  object-fit: contain;
  object-position: center;
}
.item-atuacao {
  width: 100%;
  max-width: 520px;
  aspect-ratio: 1 / 1;
  background-image: url(/assets/estrela-atuacao.png);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin-left: auto;
  position: relative;
  z-index: 1;
}
.content-numbers::after {
  content: '';
  width: 260%;
  height: 150%;
  background-image: url(/assets/graficos-fundo.svg);
  display: block;
  position: absolute;
  top: 15%;
  left: -47%;
  background-repeat: no-repeat;
  z-index: 0;
}
.item-atuacao h4 {
  font-size: 100px;
  font-weight: bold;
  line-height: 100%;
  color: var(--brand-primary-pure);
}
.item-atuacao p {
  font-size: var(--text-title-md);
  font-weight: 600;
  color: var(--brand-primary-pure);
  line-height: 160%;
}
.grid.grid-2 {
  gap: 148px;
  align-items: start;
}
.item-stick {
  position: sticky;
  top: 100px;
  align-self: start;
}
span.highlight {
  background: var(--brand-primary-dark);
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-200%);
  }
}

@media screen and (max-width: 768px) {
  .content-title {
    text-align: center;
  }
  span.highlight {
    margin-inline: auto;
  }
  .grid.grid-2{
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .content-numbers  {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  .content-numbers::after {
    display: none;
  }
  .item-atuacao {
    max-width: 220px;
    margin-inline: auto;
  }
  img.icon-atuacao {
    width: 38px;
    height: 38px;
  }
  .item-atuacao h4 {
    font-size: var(--text-title-lg);
  }
  .item-atuacao p {
    font-size: var(--text-body-xs);
  }

}
</style>