<template>
  <div class="box-slider-cursos">
    <div class="dashcursos">
      <div class="flex-container flex-nowrap">
        <div class="flex-item dashcursos-head">
          <h5>T360º Academy (ÁREA EXCLUSIVA PARA ALUNOS)</h5>
          <p></p>
        </div>
      </div>
      <br />

      <swiper
        ref="mySwiper"
        :slidesPerView="2"
        :spaceBetween="5"
        :loop="false"
        :navigation="true"
        :pagination="true"
        :modules="modules"
      >
        <swiper-slide
          v-for="(slide, n) in slides"
          :key="n"
          class="cbox flex-stretch flex-item flex-container flex-align-top"
          @click.native="exibirAulas(slide.categoria)"
        >
          <img :src="slide.imageUrl" />
          <figure
            class="unveil2 unveil2-small unveil-loaded"
            :data-src="slide.imageUrl"
            :style="{ backgroundImage: 'url(' + slide.imageUrl + ')' }"
          ></figure>
        </swiper-slide>
        <br />
      </swiper>
    </div>
  </div>
</template>

<script>
// let vm = null;
import {
  Swiper, SwiperSlide, Navigation, Pagination,
} from '@morev/vue-swiper';
import '../assets/css/swiper-bundle.min.css';

export default {
  name: 'SliderCursos',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [Navigation, Pagination],
      slides: [
        {
          imageUrl: '/static/imagens/imagens-107247.jpg',
          // "img/imagens-107247.jpg",
          categoria: 'Introdução',
        },
        {
          imageUrl: '/static/imagens/imagens-107277.jpg',
          categoria: 'Mentalidade',
        },
        {
          imageUrl: '/static/imagens/imagens-107279.jpg',
          categoria: 'Protocolo Alimentar',
        },
        {
          imageUrl: '/static/imagens/imagens-107280.jpg',
          categoria: 'Exercício Físico',
        },
        {
          imageUrl: '/static/imagens/imagens-107285.jpg',
          categoria: 'Hidratação',
        },
        {
          imageUrl: '/static/imagens/imagens-107281.jpg',
          categoria: 'Comunidade Protetiva',
        },
        {
          imageUrl: '/static/imagens/imagens-107282.jpg',
          categoria: 'Nutrição Complementar',
        },
        {
          imageUrl: '/static/imagens/imagens-107283.jpg',
          categoria: 'Lives T360',
        },
        {
          imageUrl: '/static/imagens/imagens-107519.jpg',
          categoria: 'Treinos Online',
        },
      ],
    };
  },
  created() {
    // vm = this;
    if (this.$store.state.logado) {
      const dataIngresso = new Date(this.$store.state.aluno.data_ingresso);
      const dataHoje = new Date();
      const diasMatriculado = (dataHoje - dataIngresso) / (1000 * 60 * 60 * 24);
      // console.log(diasMatriculado);
      if (diasMatriculado < 7) { this.slides.splice(7, 1); }
    }
  },
  mounted() {
    // console.log('mounted');
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  methods: {
    exibirAulas(categoria) {
      // console.log(categoria);
      this.$store.state.categoria = categoria;
      this.$store.state.exibirAula = true;
      this.$router.push({ name: 'Painel' });
    },
  },
};
</script>
