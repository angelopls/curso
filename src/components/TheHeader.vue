<template>
  <header class="flex-container flex-align-left flex-nowrap">
    <div class="menubox">
      <div
        class="menubox padding4 buttonMenu transition flex-container"
        :class="{ active: open }"
        @click="reverseMenu"
      >
        <div class="open"><i class="fal fa-bars"></i></div>
        <div class="close"><i class="fal fa-times"></i></div>
      </div>
    </div>
    <a href="#">
      <div class="header-logo flex-container flex-nowrap">
        <div class="logo noselect">
          <img src="/static/imagens/logo_t360.png" />
        </div>
        <div class="name flex-item align-left noselect">
          <h3 style="text-transform: uppercase"><b>T-360º</b></h3>
        </div>
      </div>
    </a>
    <div class="header-search flex-item flex-container"></div>
    <div class="search buttons">
      <a
        ><button><i class="fa fa-search"></i></button
      ></a>
    </div>
    <div class="profile buttons">
      <button>
        <div class="flex-container flex-nowrap">
          <figure class="unveil2 flex-container">
            <i class="fal fa-user"></i>
          </figure>
          <figcaption class="flex-container flex-nowrap">
            <p class="text-truncate">{{ nome }}</p>
            <div class="padding2"><i class="fal fa-angle-down"></i></div>
          </figcaption>
        </div>
        <ul class="submenu">
          <!--
          <a>
            <li class="flex-container flex-align-left flex-nowrap">
              <div><i class="fa fa-user"></i></div>
              <div>Meu Perfil</div>
            </li>
          </a>
          -->
          <a
            @click="sair"
            data-confirm="Tem certeza que deseja sair de sua conta?"
          >
            <li class="flex-container flex-align-left flex-nowrap">
              <div><i class="fa fa-sign-out"></i></div>
              <div>Sair</div>
            </li>
          </a>
        </ul>
      </button>
    </div>
    <!--
    <div class="user buttons">
        <a>
            <button>
                <i class="fal fa-cog"></i>
            </button>
        </a>
    </div>
    -->
    <!-- <div class="show-iframe"><iframe name="iframe-content" width="100%" height="100%"></iframe><button
        id="close-iframe" type="button"><i class="fas fa-times"></i></button></div> -->
  </header>
</template>

<script>
export default {
  name: 'TheHeader',

  data() {
    return {
      // imgLogo: require("../assets/imagens/logo_t360.png"),
    };
  },
  computed: {
    open() {
      return this.$store.state.open;
    },
    nome() {
      return this.$store.state.aluno ? this.$store.state.aluno.nome : '';
    },
  },
  methods: {
    reverseMenu() {
      this.$store.state.open = !this.$store.state.open;
    },
    sair() {
      this.$store.state.logado = false;
      this.$store.state.exibirAula = false;
      this.$store.state.aluno = null;
    },
  },
};
</script>
<style scoped>
.flex-item {
    flex: auto auto;
    flex-grow: 1;
}
.flex-align-top {
    align-items: flex-start;
}
.flex-align-left {
    justify-content: flex-start;
}
.padding4 {
    padding: 20px;
}
</style>
