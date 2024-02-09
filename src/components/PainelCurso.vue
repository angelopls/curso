<template>
  <div
    :class="{ menuMinimified: $store.state.menuMinimified }"
    class="master-body flex-item flex-stretch">
    <div ref="curso" id="curso" class="flex-item">
      <div
        class="
          videobox
          flex-container flex-align-top flex-align-left flex-nowrap
        ">
        <div class="video flex-item flex-stretch flex-container" ref="videoPlayer">
          <iframe
            class="vimeo-iframe"
            :src="currentVideo"
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
            allowfullscreen
            width="100%"
            :height="vHeight"

          >
          </iframe>
        </div>

        <ListaVideos />
      </div>

      <PainelCursoResume />
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import ListaVideos from './ListaVideos.vue';
import PainelCursoResume from './PainelCursoResume.vue';

export default {
  name: 'PainelCurso',
  components: {
    ListaVideos,
    PainelCursoResume,
  },
  props: {
    categoria: String,
  },

  data() {
    return {
      // aulas: [],
      // currentAula: null,
      heightStyle: {},
      vHeight: null,
      observer: null,
      height: null,
      width: null,
    };
  },
  created() {
    this.getAulas();
  },
  mounted() {
    const box = this.$refs.videoPlayer;
    const boxSize = box.getBoundingClientRect();

    this.width = `${Math.trunc(boxSize.width)}px`;
    this.vHeight = `${Math.trunc((boxSize.width * 360) / 640)}px`;
    // console.log(this.vHeight);
    // this.height = Math.trunc(boxSize.height) + "px";
    // initialize the observer on mount
    this.initObserver();
    window.onresize = () => {
      console.log(this.$refs.curso.clientWidth);
      const heightString = `${(this.$refs.curso.clientWidth * 360) / 640}px`;
      // Vue.set(this.heightStyle, "height", "440 px"); //heightString
      console.log(heightString);
    };

    //   this.videoHeight()
  },
  // disconnect the observer before destroy
  beforeDestroy() {
    if (this.observer) this.observer.disconnect();
  },

  computed: {
    currentVideo() {
      return this.$store.state.currentAula ? this.$store.state.currentAula.link_video : null;
    },
  },
  methods: {
    initObserver() {
      const box = this.$refs.videoPlayer;
      const vm = this;
      const config = {
        attributes: true,
      };
      // create the observer
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          // check if the mutation is attributes and update the width and height data if it is.
          if (mutation.type === 'attributes') {
            const {
              width,
              height,
            } = box.style;

            vm.width = width;
            vm.height = (height * 360) / 640;
            vm.vHeight = (width * 360) / 640;
            console.log(vm);
          }
        });
      });

      // observe element's specified mutations
      observer.observe(box, config);
      // add the observer to data so we can disconnect it later
      this.observer = observer;
    },
    videoHeight() {
      this.vHeight = (this.$refs.videoPlayer.clientWidth * 360) / 640;
      const heightString = `${this.vHeight}px`;
      // Vue.set(this.heightStyle, "height", heightString);
      this.$refs.videoPlayer.style.height = heightString;
      console.log('height: ', this.vHeight);
    },
    getAulas() {
      const url = 'https://meut360.com.br/api';
      const params = {
        action: 'getAulas',
        categoria: this.categoria,
      };
      this.$http
        .post(`${url}/get-aulas.php`, params)
        .then((response) => {
          this.$store.state.aulas = response.data.map((e, index) => {
            e.seq = index;
            e.active = false;
            e.checked = false;
            return e;
          });
          // eslint-disable-next-line prefer-destructuring
          this.$store.state.currentAula = this.$store.state.aulas[0];
          // console.log('aula: ', this.$store.state.currentAula);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error('Não foi possível carregar as aulas! ', error);
        });
    },
  },
};
</script>
