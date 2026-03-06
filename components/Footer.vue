<template>
    <footer>
        <div class="content-footer container">
            <div class="grid-tens">
                <h2>Contato</h2>
                <div class="flex-item-menu">
                    <nav class="col-span-1" aria-label="Menu rodapé principal">
                        <h3>Menu</h3>
                        <ul>
                            <li><NuxtLink to="/">Página inicial</NuxtLink></li>
                            <li><NuxtLink to="/sobre">Sobre a BCC</NuxtLink></li>
                            <li><NuxtLink to="/jeito-bcc">Jeito BCC</NuxtLink></li>
                            <li><NuxtLink to="https://vemprabcc.gupy.io/" target="_blank">Junte-se a nós</NuxtLink></li>
                        </ul>
                    </nav>
                    <nav class="col-span-1" aria-label="links rodapé">
                        <h3>Links</h3>
                        <ul v-for="(l, index) in Links" :key="index">
                            <NuxtLink :to="l.link" target="_blank">
                            {{ l.nomeDoCampo }}
                            </NuxtLink>
                        </ul>
                    </nav>
                </div>   
            </div>

            <div class="grid-full">
                <address>
                    <a href="mailto:falecomabcc@brasilcenter.com.br" class="icon-left" rel="noopener noreferrer">falecomabcc@brasilcenter.com.br</a> 
                </address>
                <div class="footer-social-links">
                    <div class="limit-card-infos">
                        <div>
                            <NuxtLink to="https://www.instagram.com/brasilcenter_oficial/" target="_blank"><img src="/assets/instagram-white.png" alt="ícone da rede social instagram"></NuxtLink>
                            <NuxtLink to="mailto:falecomabcc@brasilcenter.com.br"><img src="/assets/mail-white.png" alt="ícone do e-mail" aria-hidden="true"></NuxtLink>
                        </div>
                        <NuxtLink to="/"><img src="/images/logo-white.svg" alt="Logotipo da Brasil Center Comunicações" /></NuxtLink>
                        <NuxtLink to="https://www.glassdoor.com.br/Vis%C3%A3o-geral/Trabalhar-na-BrasilCenter-EI_IE2482933.13,25.htm" target="_blank" rel="noopener noreferrer"><img src="/images/logo-glassdoor.svg" alt="BrasilCenter no Glassdoor" /></NuxtLink>
                    </div>
                </div>
            </div>
        </div>
        <div class="crypt">
            <div class="container">
                <p>BrasilCenter © {{ currentYear }}  -  Todos os direitos reservados</p>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useGraphQLFetch } from '@/composables/useGraphQLFetch'
const currentYear = new Date().getFullYear()

const query = `query {
  pageBy(uri: "home") {
    id
    home {
      links {
        nomeDoCampo
        link
      }
    }
  }
}`
 
const { data: pageData, pending } = useGraphQLFetch(query, {}, 'home-link-footer')

const Links = computed(() => {
  const homePage = pageData.value?.data?.pageBy;
  const links = homePage?.home?.links ?? []; 

  return links.map(l => ({
    nomeDoCampo: l.nomeDoCampo || '',
    link: l.link || ''
  }))
})
</script>

<style scoped>
footer {
    overflow: hidden;
    background-color: var(--brand-primary-darkest);
}
footer .content-footer {
    padding: 175px 0 110px;
    background-repeat: no-repeat;
    background-position: center right;
    background-size: contain;
    position: relative;
    z-index: 1;
}
.content-footer.container::after {
    background-image: url(/assets/graficos-rodape.svg);
    content: '';
    width: 100%;
    height: 120%;
    display: block;
    z-index: 0;
    position: absolute;
    top: -10%;
    right: -35%;
    background-repeat: no-repeat;
    background-position: right;
    background-size: contain;
}
footer a, footer p, footer h2, footer h3 {
    color: var(--neutral-high-light);
}
footer h2 {
    font-size: var(--text-title-xl);
    line-height: 110%;
    font-weight: 600;
}
footer h3 {
    font-size: var(--text-title-xs);
    line-height: 110%;
    font-weight: 600;
    margin-bottom: 24px;
}
footer nav a {
    font-size: var(--text-body-sm);
    line-height: 160%;
    font-weight: 400;
    padding: 8px 0;
    display: block;
}
footer .grid-full a {
    font-size: var(--text-body-md);
    line-height: 110%;
    font-weight: 500;
    display: inline-block;
    position: relative;
}
.icon-left::after {
    content: '';
    position: absolute;
    width: 25px;
    height: 25px;
    background-image: url('/assets/arrow-down-left.png');
    top: 2px;
    right: -31px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}
footer .crypt {
    position: relative;
    z-index: 1;
    background: var(--brand-primary-pure);
    padding: 15px 0;
}
footer .flex-item-menu nav {
    min-width: 225px;
}
footer .flex-item-menu {
    display: flex;
    padding: 35px 0 70px;
}
footer .crypt p {
    color: var(--brand-primary-light);
    font-size: var(--text-title-xxxs);
}
footer ul {
    list-style: none;
    padding: 0;
}
footer .limit-card-infos {
    display: flex;
    max-width: 395px;
    align-items: center;
    justify-content: space-between;
    gap: 68px;
}
footer .limit-card-infos div {
    display: flex;
    align-items: center;
    gap: 16px;
}
.footer-social-links {
    margin-top: 50px;
}
.content-footer.container div {
    position: relative;
    z-index: 1;
}
.img-selo {
    margin-left: auto;
    margin-right: 163px;
    display: flex;
    align-items: center;
}

@media screen and (max-width: 1024px) {
    footer .limit-card-infos {
        gap: 51px;
    }
}

@media screen and (max-width: 768px) {
    footer h2 {
        font-size: var(--text-title-md);
    }
    footer h3 {
        font-size: var(--text-title-xxs);
    }
    footer nav a {
        font-size: var(--text-body-xs);
        font-weight: 400;
    }
    footer .content-footer {
        padding: 74px 0 100px;
    }
    footer .flex-item-menu {
        padding: 35px 0 24px;
        gap: 40px;
        flex-direction: column;
    }
    footer .grid-full a {
        font-size: var(--text-body-xxs);
    }
    .icon-left::after{
        width: 25px;
        height: 17px;
        top: 0;
        right: -27px;
    }
    .footer-social-links {
        margin-top: 24px;
    }
    footer .limit-card-infos {
        align-items: baseline;
        justify-content: normal;
        flex-direction: column;
        gap: 32px;
    }
    .content-footer.container::after {
        width: 75%;
        height: 83%;
        top: 90%;
        right: 30%;
        background-position: unset;
        background-size: contain;
    }
}

@media screen and (max-width: 480px) {
    footer .limit-card-infos {
        gap: 24px;
    }
}
</style>