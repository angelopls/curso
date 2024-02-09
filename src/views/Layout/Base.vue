<template>
  <div>
    <FakeLoader />
    <div v-if="!$store.state.logado">
      <TheLogin />
    </div>
    <div v-else class="master">
      <TheHeader />
      <div class="master-content flex-container flex-align-left flex-align-top flex-nowrap">
        <TheMenu />
        <div id="dashboard">
          <BannerTop />
          <br/><br/>
          <router-view />
          <br><br>
          <TheFooter />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheLogin from '@/components/TheLogin.vue';
import BannerTop from '@/components/BannerTop.vue';
import TheHeader from '@/components/TheHeader.vue';
import TheMenu from '@/components/TheMenu.vue';
import TheFooter from '@/components/TheFooter.vue';

// import MainFooter from '@/components/MainFooter.vue';
import '@/assets/css/reset.css';
import '@/assets/css/balloon.css';
import '@/assets/css/estilo.css';
import '@/assets/css/meu-perfil-dados.css';

import '@/assets/css/meu-perfil.css';

import '@/assets/css/curso.css';
import '@/assets/css/style.css';
import '@/assets/css/fake-loader.css';

export default {
  name: 'Base',
  components: {
    TheLogin,
    BannerTop,
    TheHeader,
    TheMenu,
    TheFooter,
  },
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },

};
</script>
<style>
.flex-nowrap {
    flex-wrap: nowrap;
}
.flex-align-top {
    align-items: flex-start;
}
.flex-align-left {
    justify-content: flex-start;
}
</style>
