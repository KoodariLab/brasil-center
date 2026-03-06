// import Lenis from '@studio-freight/lenis'

// export default defineNuxtPlugin((nuxtApp) => {
//   let lenis = null
//   let rafId = null

//   function startLenis() {
//     if (!lenis) {
//       lenis = new Lenis({
//         duration: 1.35,
//         easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//         smooth: true,
//       })

//       function raf(time) {
//         lenis.raf(time)
//         rafId = requestAnimationFrame(raf)
//       }

//       rafId = requestAnimationFrame(raf)

//       nuxtApp.provide('lenis', lenis)

//       nuxtApp.hook('page:finish', () => {
//         lenis.scrollTo(0, { immediate: true })
//       })

//       console.log('Lenis ativado')
//     }
//   }

//   function stopLenis() {
//     if (lenis) {
//       cancelAnimationFrame(rafId)
//       lenis.destroy()
//       lenis = null
//       console.log('Lenis desativado')
//     }
//   }

//   if (process.client) {
//     const mediaQuery = window.matchMedia('(min-width: 1024px)')

//     function handleMediaChange(e) {
//       if (e.matches) {
//         startLenis()
//       } else {
//         stopLenis()
//       }
//     }

//     // Verifica no carregamento inicial
//     handleMediaChange(mediaQuery)

//     // Escuta mudanças de tamanho da viewport
//     mediaQuery.addEventListener('change', handleMediaChange)
//   }
// })
