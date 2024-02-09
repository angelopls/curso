<template>
    <div id="dashboard-slider" style="position: relative;">
        <div class="swiper-container-capa swiper-container-initialized swiper-container-horizontal">
            <div class="swiper-wrapper" style="transform: translate3d(0px, 0px, 0px);">
                <div class="swiper-slide swiper-slide-active">
                    <div class="imgbox sizedefault"><img :src="headerBanner">
                      <figure class="unveil2 unveil2-small unveil-loaded" :data-src="headerBanner" :style="{ backgroundImage: 'url(' + headerBanner + ')' }">
                      </figure>
                    </div>
                    <div class="imgbox size800"><img :src="headerBanner">
                      <figure class="unveil2 unveil2-small unveil-loaded" :data-src="headerBanner" :style="{ backgroundImage: 'url(' + headerBanner + ')' }">
                      </figure>
                    </div>
                    <div class="imgbox size400"><img :src="headerBanner">
                      <figure class="unveil2 unveil2-small" :data-src="headerBanner" :style="{ backgroundImage: 'url(' + headerBanner + ')' }">
                      </figure>
                    </div>
                </div>
            </div>
            <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
        </div>
    </div>
</template>

<script>

export default {
  name: 'BannerTop',
  data() {
    return {
      headerBanner: '/static/imagens/imagens-566.jpg',
    };
  },
};
</script>
