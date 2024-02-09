<template>
<menu :class="{active: open, mobile: mobile , minimified: $store.state.menuMinimified}"
    class="flex-stretch mobileOpen flex-container-col" style="flex-wrap: wrap"
        >
    <div class="menu-content flex-item flex-container-col flex-nowrap" >
      <div class="flex-item"><br>
        <!--<a href="home"><div class="menu-logo"><div class="flex-container flex-nowrap"><div class="logo noselect"><img src="imagens/club-header-logo.png"></div></div></div></a>--><br>
        <div class="profile">
          <!--
          <div class="flex-container">
            <figure style="background-color:#cccccc">
              <div class="flex-container unveil2 unveil2-grey"><i class="fa fa-user"></i></div>
            </figure>
          </div><br>
          <div class="name align-center">
            <h3 class="text-truncate"></h3>
            <h4 class="text-truncate"></h4>
          </div><br>
          -->
          <ul class="bars">
            <li data-balloon="0% completo">
              <p class="text-truncate">Seu progresso</p>
              <hr class="progress" data-progress="0" style="--progress:0%;">
            </li>

          </ul>
          <div class="bars vertical">
            <ul class="flex-container flex-align-center fullheight">
              <li>
                <hr class="progress vertical" data-progress="0" style="--progress:0%;">
              </li>
              <li>
                <hr class="progress vertical" data-progress="98" style="--progress:98%;">
              </li>
            </ul>
          </div>
        </div><br><br>
        <div class="menu">
          <ul><a @click="gotoInicio">
              <li class="pointer flex-container flex-align-left flex-nowrap active">
                <figure class="flex-container"><i class="fal fa-home"></i></figure>
                <figcaption>
                  <h5>Início</h5>
                </figcaption>
              </li>
            </a>
<!--
            <a>
              <li class="pointer flex-container flex-align-left flex-nowrap ">
                <figure class="flex-container"><i class="fal fa-user"></i></figure>
                <figcaption>
                  <h5>Minha Conta</h5>
                </figcaption>
              </li>
            </a>
-->
            <!--<a href="https://receitas.t360.fun/wp-content/uploads/2021/06/MANUAL-T360graus.pdf" target="_blank">
              <li class="flex-container flex-align-left flex-nowrap">
                <figure class="flex-container"><i class="fas fa-book"></i></figure>
                <figcaption>
                  <h5>E-book Inicial da Nutri</h5>
                </figcaption>
              </li>
            </a>
            -->
            <a @click="gotoTreinos">
              <li class="pointer flex-container flex-align-left flex-nowrap">
                <figure class="flex-container"><i class="fas fa-heartbeat"></i></figure>
                <figcaption>
                  <h5>Treinos Online </h5>
                </figcaption>
              </li>
            </a><a target="_blank" href="https://receitas.transformacao360.com.br/" @click="gotoReceitas">
              <li class="pointer flex-container flex-align-left flex-nowrap">
                <figure class="flex-container"><i class="fas fa-utensils"></i></figure>
                <figcaption>
                  <h5>Portal Receitas </h5>
                </figcaption>
              </li>
            </a>
          <!--
          <a >
            <li class="flex-container flex-align-left flex-nowrap ">
              <figure class="flex-container">
                  <i class="fal fa-cog"></i>
              </figure>
              <figcaption>
                  <h5>Administrador</h5>
              </figcaption>
            </li>
          </a>
          -->
          </ul>
        </div><br><br>
      </div>
      <!--
      <div class="menu-footer">
        <hr>
        <div class="flex-container-col flex-align-left"><br><a href="#">
            <p>Termos de Uso</p>
          </a><a href="#">
            <p>Políticas de Privacidade</p>
          </a><br>
          <h4></h4>
        </div>
      </div>
      -->
    </div>
  </menu>
 </template>

<script>
export default {
  name: 'TheMenu',

  data() {
    return {
      // windowWidth: window.innerWidth
    };
  },

  computed: {
    open() {
      return this.$store.state.open;
    },
    mobile() {
      return this.$store.state.windowWidth < 600;
    },
  },
  methods: {
    gotoReceitas() {
      if (this.mobile) {
        this.$store.state.open = false;
      }
    },
    gotoInicio() {
      // this.$store.state.exibirAula = false;
      if (this.$router.currentRoute.name !== 'Slider') {
        this.$router.push({ name: 'Slider' });
      }
      if (this.mobile) {
        this.$store.state.open = false;
      }
    },
    getAulas() {
      const url = 'https://meut360.com.br/api';
      const params = {
        action: 'getAulas',
        categoria: this.$store.state.categoria,
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
    gotoTreinos() {
      this.$store.state.categoria = 'Treinos Online';
      this.$store.state.exibirAula = true;
      this.getAulas();
      this.$router.push({ name: 'Painel' });
      if (this.mobile) {
        this.$store.state.open = false;
      }
    },
  },
};
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
  .flex-align-left {
    justify-content: flex-start;
}
</style>
