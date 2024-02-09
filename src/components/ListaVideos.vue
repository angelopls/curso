<template>
    <div class="videos flex-stretch flex-item">
        <div class="slimScroll-nulled">
            <div class="accordion scroll">
                <div v-for="aula,index in aulas" :key="index" class="item" >
                    <a @click="$store.state.currentAula=aula">
                        <li class="flex-container flex-nowrap aulabox" :class="{active: aula.active, checked: aula.checked}">
                            <div>
                                <img :src="getThumb(aula.link_video)" />
                                <!--<figure class="unveil2 unveil-loading" :src="getThumb(aula.link_video)"></figure>-->
                            </div>
                            <div class="flex-item">
                                <h6>{{aula.titulo}}</h6>
                            </div>
                        </li>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'ListaVideos',
  data() {
    return {

    };
  },
  computed: {
    aulas() {
      return this.$store.state.aulas;
    },
  },
  methods: {
    getPandaThumb(url) {
      // obtém o prefixo da url
      let userPrefix = '';
      let thumbUrl = '';
      let regex = /player(.+?)\/embed/;
      let matches = url.match(regex);
      if (matches) {
        const content = matches[1];
        userPrefix = `https://b${content}/`;
        // console.log(userPrefix);
      }
      // obtém o ID do vídeo
      regex = /v=([\w-]+)/;
      matches = url.match(regex);

      if (matches) {
        const videoId = matches[1];
        // console.log(videoId);
        thumbUrl = `${userPrefix}${videoId}/thumbnail.jpg`;
        // console.log(thumbUrl);
      }
      return thumbUrl;

      // 'https://player-vz-88c115fd-69b.tv.pandavideo.com.br/embed/?v=8f59bc6a-044f-49ff-8b92-fc1eb0e41f6e
    },
    getYoutubeThumb(url) {
      // Definir a URL do vídeo
      const videoUrl = url;

      // Expressão regular para extrair a ID do vídeo da URL
      const regex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?:$|&|\?)/;

      // Extrair a ID do vídeo da URL usando a expressão regular
      const match = videoUrl.match(regex);

      // Se a ID do vídeo foi encontrada, mostrar no console
      if (match) {
        const videoId = match[1];
        // console.log(videoId); // Mostra "T4z91VUEWD0" no console
        const thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        // console.log(thumbUrl);
        return thumbUrl;
      }
      console.error('Não foi possível extrair a ID do vídeo');
      return '';
    },
    getThumb(url) {
      // const youtubeRegex = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?(?=.*v=\w+).*/i;
      // const pandavideoRegex = /^https?:\/\/(?:\w+\.)?pandavideo\.com\.br\/embed\/\?v=\w+/i;

      // if (youtubeRegex.test(url)) {
      if (url.includes('youtu')) {
        const thumbUrl = this.getYoutubeThumb(url);
        // console.log(thumbUrl);
        return thumbUrl;
      } if (url.includes('panda')) {
      // if (pandavideoRegex.test(url)) {
        const thumbUrl = this.getPandaThumb(url);
        // console.log(thumbUrl);

        return thumbUrl;
      }
      return '';
    },
  },
};

</script>
<style scoped>
.flex-container {
    justify-content: start;
}
</style>
