<template>
  <header>
    <nav class="navbar" aria-label="Menu principal">
        <div class="headereffect container bg-white">
            <div class="logo nav-l-card">
                <button  v-if="mobileView" class="menu-mobile-click" :class="{ active: menuOpen }" @click="toggleMenu"><span></span></button>
                <NuxtLink to="/">
                    <img src="/assets/logo-brasil-center.svg" alt="Logotipo da Brasil Center Comunicações" />
                </NuxtLink>
            </div>
            <div class="nav-r-card" :class="{ 'menu-open': menuOpen }">
                <ul class="list-menu-desktop">
                    <li><NuxtLink exact-active-class="active-link" @click="closeMenu" to="/">Página inicial</NuxtLink></li>
                    <li><NuxtLink exact-active-class="active-link" @click="closeMenu" to="/sobre">Sobre a BCC</NuxtLink></li>
                    <li><NuxtLink exact-active-class="active-link" @click="closeMenu" to="/jeito-bcc">Jeito BCC</NuxtLink></li>
                    <li><NuxtLink exact-active-class="active-link" @click="closeMenu" to="https://vemprabcc.gupy.io/" target="_blank">Junte-se a nós</NuxtLink></li>
                </ul>
                <ul class="social-links">
                    <NuxtLink to="https://www.instagram.com/brasilcenter_oficial/" target="_blank">
                        <picture data-tooltip="Redes">
                            <source srcset="/assets/instagram-mobile.svg" media="(max-width: 1140px)">
                            <img src="/assets/instagram.svg" alt="instagram" aria-label="true">
                        </picture>
                    </NuxtLink>
                </ul>
            </div>
            <NuxtLink v-if="mobileView" to="https://vemprabcc.gupy.io/" target="_blank" class="button-bcc">Vem ser BCC</NuxtLink>
        </div>
    </nav>
  </header>
</template>

<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue'

    const mobileView = ref(false)
    const menuOpen = ref(false)

    const toggleMenu = () => {
        menuOpen.value = !menuOpen.value
    }

    const closeMenu = () => {
        menuOpen.value = false
    }

    const handleResizeTablet = () => {
        mobileView.value = window.innerWidth <= 1180
    }

    const handleResizeMobile = () => {
        mobileView.value = window.innerWidth <= 768
    }

    onMounted(() => {
        handleResizeTablet()
        handleResizeMobile()
        window.addEventListener('resize', handleResizeMobile)
        window.addEventListener('resize', handleResizeTablet)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('resize', handleResizeTablet)
        window.removeEventListener('resize', handleResizeMobile)
    })
</script>

<style scoped>
.router-link-active {
    font-weight: bold;
}
ul.social-links {
    margin-left: 24px;
}
nav.navbar {
    margin-top: 28px;
}
header {
    position: fixed;
    width: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    transition: 0.3s ease-in-out;
}
nav ul {
    display: flex;
    align-items: center;
    list-style: none;
    gap: 24px;
    height: 100%;
}
nav ul li, nav ul li a {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s ease-out;
}
nav ul li a {
    font-size: var(--text-body-sm); 
    width: 141px;
    font-weight: 600;
    line-height: 160%;
    color: var(--neutral-low-pure);
    position: relative;
}
nav ul li a:hover {
    color: var(--brand-primary-pure);
}
nav ul li a::after {
    content: '';
    width: 100%;
    height: 8px;
    position: absolute;
    bottom: 0;
    border-radius: 10px;
    transition: 0.4s ease-out;
}
picture {
    position: relative;
}
.headereffect {
    padding: 0 42px;
    border-radius: 70px;
    display: flex;
    height: 68px;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 0 15px -1px rgb(0 0 0 / 5%);
}
ul.social-links a:hover {
    cursor: pointer;
}
.nav-r-card {
    display: flex;
    align-items: center;
    height: 100%;
}
.logo.nav-l-card {
    display: flex;
    align-items: center;
}
ul.social-links a img {
    position: relative;
    z-index: 1;
}
ul.social-links a {
    position: relative;
}

@media screen and (min-width:1024px) {
    ul.social-links a:hover img {
        filter: brightness(0) invert(1);
    }
    ul.social-links a:hover::after {
        content: '';
        width: 100%;
        height: 100%;
        background: var(--brand-primary-pure);
        display: block;
        position: absolute;
        top: -4px;
        left: -4px;
        padding: 4px;
        z-index: 0;
        border-radius: 5px;
    }
}

@media screen and (min-width: 1141px) {
    nav ul li a.router-link-active::after {
        background: #B3C1D6;
    }
    nav ul li a:hover::after {
        background: var(--brand-primary-pure);
    }
}

@media screen and (max-width: 1180px) {
    .nav-r-card, .list-menu-desktop {
        flex-direction: column;
    }
    nav ul {
        height: auto;
    }
    .logo.nav-l-card {
        gap: 15px;
    }
    .headereffect.container {
        width: 100%;
        border-radius: 0;
        padding-inline: 10px;
        box-shadow: none;
    }
    header nav.navbar {
       margin-top: 0;
    }
    header .logo.nav-l-card img {
        width: 95px;
    }
    header nav a.button-bcc {
        width: 105px;
        height: 28px;
        font-size: var(--text-body-xxs);
    }
    header .nav-r-card {
        background: #fff !important;
        width: 100vw;
        height: 568px !important;
        position: absolute;
        left: 0;
        top: 67px;
        transition: 0.3s;
        transform: translate3d(0, -100%, 0);
        opacity: 0;
        z-index: -1;
    }
    header nav ul.list-menu-desktop {
        margin-left: 20px;
        margin-right: auto;
        margin-top: 20px;
    }
    nav ul li a {
        justify-content: flex-start !important;
        color: var(--brand-primary-pure);
    }
    button.menu-mobile-click {
        position: relative;
        width: 18px;
        height: 18px;
        background: transparent;
        border: none;
        margin: 0;
        padding: 14px;
        transition: 0.3s ease-in-out;
    }
    button.menu-mobile-click.active::before {
        transform: rotate(45deg);
        top: 11px;
    }
    button.menu-mobile-click.active span::after {
        transform: rotate(-45deg);
        top: 0;
    }
    button.menu-mobile-click::before {
        content: "";
        position: absolute;
        top: 4px;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: #000;
        z-index: 0;
        border-radius: 2px;
        transform: rotate(0);
        transition: 0.3s ease-in-out;
    }
    button.menu-mobile-click span,
    button.menu-mobile-click span::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 3px;
        background-color: #000;
        left: 0;
        border-radius: 2px;
        z-index: 1;
        transition: 0.3s ease-in-out;
    }
    button.menu-mobile-click.active span {
        background: transparent;
    }
    button.menu-mobile-click span {
        top: 11px;
    }
    button.menu-mobile-click span::after {
        top: 8px;
    }
    .nav-r-card.menu-open {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
    header nav ul.social-links {
        background: var(--brand-primary-lightest);
        width: 100%;
        margin-left: 0 !important;
        padding: 26px 20px;
        margin-top: auto;
        height: 100px !important;
        gap: 60px;
    }
    picture::before {
        content: attr(data-tooltip);
        font-weight: 600;
        display: block;
        line-height: 140%;
        font-size: var(--text-body-xxs);
        color: var(--brand-primary-dark);
        padding-bottom: 12px;
    }
}

@media screen and (max-width: 768px) {
    .headereffect {
        height: 55px;
    }
    header .nav-r-card {
        top: 55px;
        height: calc(100dvh - 55px) !important;
    }
}

</style>