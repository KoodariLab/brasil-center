<template>
    <section>
        <div class="container">
            <div class="content-title">
                <span class="highlight">Junte-se a nós</span>
                <div class="flex gap-10">
                    <h2 class="title-xxl t-white">Quer fazer <span class="word_breaker"></span>parte da BCC?</h2>
                    <img src="/assets/logo-great-place.png" alt="Lodo da Great Place to Work" class="logo-great-place" loading="lazy" aria-label="true">
                </div>
                <p class="t-white">Confira as vagas abertas e faça o seu cadastro agora mesmo!</p>
                <NuxtLink to="https://vemprabcc.gupy.io/" class="button-bcc" target="_blank">Vem ser BCC</NuxtLink>
            </div>
        </div>
        <picture>
            <source media="(max-width: 768px)" srcset="/assets/mobile-banner-jeito-bcc.png">
            <img src="/assets/junte-se-a-nos.png" alt="imagem ilustrativa" aria-hidden="true" class="img-join" loading="lazy">
        </picture>
    </section>
</template>

<script setup>

</script>

<style scoped>
span.highlight {
    background: var(--brand-primary-dark);
}
img.img-join {
    margin-inline: auto;
    margin-top: 100px;
    object-fit: cover;
    object-position: center;
    height: 425px;
    max-width: 100vw;
}
section {
    background-color: var(--brand-primary-pure);
    padding-bottom: 0;
}
.grid {
    grid-template-columns: 6fr 1fr;
}
.title-xxl {
    position: relative;
}
.flex.gap-10 {
    justify-content: space-between;
    align-items: center;
}
.content-title {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 54px;
}
.button-bcc {
   margin-top: 24px;
}

@media screen and (max-width: 1280px) {
    .content-title {
        gap: 0;
    }
}

@media screen and (min-width: 1640px) {
    section {
        background-position: 0 1100px;
    }
}
@media screen and (max-width: 768px) {
    .content-title {
        gap: 0;
    }
    img.logo-great-place {
        height: 84px;
    }
    .content-title p.t-white {
        margin-top: 16px;
    }
    img.img-join {
        width: 100%;
        height: auto;
        margin-top: 0;
    }
}
</style>