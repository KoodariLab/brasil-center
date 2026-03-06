export default defineNuxtConfig({
  compatibilityDate: '2025-05-26',
  ssr: true,
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_API_URL || 'https://www.brasilcenter.com.br/wordpress/graphql'
    }
  },
  app: {
    head: {
      title: 'BrasilCenter - Contact Center e Trade Marketing',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'BrasilCenter é especialista em Contact Center e Trade Marketing. Oferecemos atendimento estratégico para o Grupo Claro, soluções em ouvidoria, Anatel, atendimento técnico e vendas em varejo.' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:title', content: 'BrasilCenter - Contact Center e Trade Marketing' },
        { property: 'og:description', content: 'BrasilCenter é especialista em Contact Center e Trade Marketing. Oferecemos atendimento estratégico para o Grupo Claro, soluções em ouvidoria, Anatel, atendimento técnico e vendas em varejo.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/images/logo-brasil-center.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'BrasilCenter - Contact Center e Trade Marketing' },
        { name: 'twitter:description', content: 'BrasilCenter é especialista em Contact Center e Trade Marketing. Oferecemos atendimento estratégico para o Grupo Claro, soluções em ouvidoria, Anatel, atendimento técnico e vendas em varejo.' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/favicon-512x512.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon-180x180.png' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&display=swap'
        },
      ],
      script: [
        {
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5P8PDF');`,
          type: 'text/javascript',
          tagPosition: 'head',
          hid: 'gtm-script'
        }
      ]
    }
  },
  css: ['@/assets/css/main.css'],
  modules: ['@pinia/nuxt'],
  plugins: [
    '@/plugins/handtalk.client.js'
  ],
})
