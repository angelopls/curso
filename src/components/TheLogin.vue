<template>
  <div>
    <div id="plano" class="flex-container loginpage" v-if="!recuperar">
      <div class="flex-item">
        <div class="logo padding4 align-center">
          <a>
            <img
              class="noselect"
              src="/static/imagens/header-login-157.png"
            />
          </a>
        </div>

        <div class="flex-container">
          <div class="flex-container-col">
            <div class="form" style="background-color: #101010; color: #ffffff">
              <div class="head padding4">
                <br />
                <h4 class="align-center">FAÇA SEU LOGIN</h4>
                <br />
              </div>
              <hr />
              <br /><br />

              <div class="flex-container loginform">
                <div class="loginform-content">
                  <form class="flex-container loadingSubmitBtn">
                    <fieldset class="type-email">
                      <i class="fal fa-user-circle"></i>
                      <input
                        v-model="email"
                        type="email"
                        name="login"
                        id="login"
                        placeholder="E-mail de usuário:"
                        value=""
                      />
                    </fieldset>
                    <p v-if="error" class="fieldset-error">
                      Verifique o email e a senha!
                    </p>
                    <p v-if="assinaturaExpirada" class="fieldset-error">
                      Sua assinatura expirou. Procure o seu Mentor
                    </p>

                    <fieldset class="type-password">
                      <i class="fal fa-key"></i>
                      <input
                        v-model="senha"
                        type="password"
                        name="senha"
                        id="senha"
                        placeholder="Sua senha:"
                        value=""
                      />
                    </fieldset>

                    <div
                      class="
                        flex-container-row flex-item flex-nowrap
                        senha-info
                      "
                    >
                      <div class="flex-container flex-item flex-align-left">
                        <!--
                        <label class="flex-container">
                          <div
                            class="flex-container"
                            style="position: relative"
                          >
                            <input
                              type="checkbox"
                              id="mostra-senha"
                              name="mostra-senha"
                            />

                            <span></span>
                            <i class="far fa-check"></i>
                          </div>

                        <div>
                            <p>Mostrar senha</p>
                          </div>

                        </label>
                        -->
                      </div>
                      <div class="flex-container flex-item flex-align-right">
                        <p>
                          <a @click="recuperar=true;" style="cursor: pointer"><u>Esqueci minha senha</u></a>
                        </p>
                      </div>
                    </div>

                    <fieldset>
                      <button :disabled="desabilitaBotao" @click.prevent="getAluno">Entrar</button>
                    </fieldset>
                  </form>

                  <p
                    class="align-center small"
                    style="color: #707070 !important"
                  >
                    <i class="far fa-lock-alt"></i>
                    Seus dados estão protegidos.
                  </p>
                  <br /><br />
                </div>
              </div>
            </div>

            <br />
          </div>
        </div>
      </div>
    </div>
    <RecuperarSenha v-if="recuperar" />
  </div>
</template>

<script>
import RecuperarSenha from '@/components/RecuperarSenha.vue';

export default {
  name: 'TheLogin',
  components: {
    RecuperarSenha,
  },
  data() {
    return {
      desabilitaBotao: false,
      assinaturaExpirada: false,
      email: '',
      senha: '',
      error: false,
      recuperar: false,
    };
  },
  methods: {
    isRecent(date, days) {
      const today = new Date();
      const itemDate = new Date(date);
      const diffTime = Math.abs(itemDate - today);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays < days) {
        return true;
      }
      return false;
    },
    loginDistribuidor() {
      this.desabilitaBotao = true;
      const url = 'https://meut360.com.br/api';
      const params = {
        action: 'loginDistribuidor',
        email: this.email,
        senha: this.senha,
      };
      this.$http
        .post(`${url}/login-distribuidor.php`, params)
        .then((response) => {
          this.$store.state.aluno = response.data;
          console.log('aluno: ', response.data);
          if (this.$store.state.aluno) {
            this.$store.state.logado = true;
            this.$router.push({ name: 'Slider' });
            this.error = false;
          } else {
            this.error = true;
          }
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error('houve um erro na conexão com o servidor! ', error);
        })
        .finally(() => {
          this.desabilitaBotao = false;
        });
    },
    getAluno() {
      this.desabilitaBotao = true;
      const url = 'https://meut360.com.br/api';
      const params = {
        action: 'getAlunoData',
        email: this.email,
        senha: this.senha,
      };
      this.$http
        .post(`${url}/login.php`, params)
        .then((response) => {
          console.log(response.data);
          this.$store.state.aluno = response.data;
          console.log('aluno: ', response.data);
          if (this.$store.state.aluno) {
            if (this.$store.state.aluno.recente === 'OK') {
              this.$store.state.logado = true;
              this.$router.push({ name: 'Slider' });
              this.error = false;
            } else {
              this.assinaturaExpirada = true;
            }
          } else {
            this.loginDistribuidor();
            // this.error = true;
          }
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error('houve um erro na conexão com o servidor! ', error);
        })
        .finally(() => {
          this.desabilitaBotao = false;
        });
    },
  },
};
</script>

<style>
#plano {
  position: relative;
  min-height: 100vh;
  background: #000000;
  max-width: 100%;
}
#plano .form {
  position: relative;
  border-radius: 30px;
  width: 480px;
  max-width: 80vw;
  min-height: 300px;
  margin: 0 auto;
  box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.03);
}
@media screen and (max-width: 360px) {
  #plano .form,
  #plano .form::before {
    max-width: 100vw !important;
    margin: 0;
    border-radius: 0;
  }
}
#plano .logo img {
  max-width: 130px;
  max-height: 80px;
  margin: 0 auto;
}
#plano .form .head h4 {
  font-weight: 400;
  text-transform: uppercase;
  font-size: 16px;
  letter-spacing: 3px;
}
#plano .form hr {
  position: relative;
  border: 0;
  width: 100%;
  height: 7px;
  background: rgb(23, 58, 237);
  background: -moz-linear-gradient(
    144deg,
    rgba(23, 58, 237, 1) 0%,
    rgba(30, 218, 167, 1) 100%
  );
  background: -webkit-linear-gradient(
    144deg,
    rgba(23, 58, 237, 1) 0%,
    rgba(30, 218, 167, 1) 100%
  );
  background: linear-gradient(
    144deg,
    rgba(23, 58, 237, 1) 0%,
    rgba(30, 218, 167, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#173aed",endColorstr="#1edaa7",GradientType=1);
  padding: 0;
  margin: 0;
}
#plano .form form {
  position: relative;
  width: 370px;
  max-width: 100%;
}
#plano .form form i {
  position: absolute;
  z-index: 10;
  top: 17px;
  left: 10px;
  font-size: 15px;
  color: #707070;
}
#plano .form .senha-info {
  margin: 0 0 20px 0;
}
#plano .form .senha-info input {
  width: auto;
  position: absolute;
}
#plano .form .senha-info label,
#plano .form .senha-info p {
  font-size: 12px;
  color: #707070;
  letter-spacing: 0;
  opacity: 1;
}

#plano .form form fieldset {
  position: relative;
  margin-bottom: 8px;
  overflow: hidden;
}
#plano .form fieldset label {
  display: block;
  padding: 8px 10px;
  font-weight: normal;
  font-size: 14px;
  letter-spacing: 1px;
}
#plano .form form fieldset figure {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  border-radius: 3px;
  z-index: 5;
  cursor: pointer;
  min-height: 100%;
  min-width: 80px;
}
#plano .form form fieldset figure::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  content: "\f01e";
  font-family: "Font Awesome 5 Pro";
  text-align: center;
  line-height: 48px;
  font-size: 17px;
  opacity: 0;
  transition: all 200ms ease-in-out;
}
#plano .form form fieldset figure:hover::after {
  opacity: 1;
}
#plano .form form fieldset input {
  position: relative;
  background: transparent;
  border-radius: 7px;
  border: 0;
  min-height: 50px;
  width: 100%;
  padding: 15px 15px 15px 35px;
  font-size: 12px;
  font-weight: normal !important;
  letter-spacing: 1px;
  font-weight: 600;
  outline: none;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
  margin: 0;
  width: 280px;
}
#plano .form form fieldset.type-captcha input {
  padding-left: 90px;
}
#plano .form form fieldset input::placeholder {
  color: var(--color);
  opacity: 0.5;
}
#plano .form form fieldset input:-ms-input-placeholder {
  color: var(--color);
  opacity: 0.5;
}
#plano .form form fieldset input::-ms-input-placeholder {
  color: var(--color);
  opacity: 0.5;
}
#plano .form form fieldset input::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
#plano .form fieldset.error input {
  border-color: #df5b6d;
}
#plano .form form fieldset p.error {
  line-height: 130%;
  padding: 10px;
  letter-spacing: 1px;
  color: red;
  font-size: 13px;
}
#plano .senha-info label input {
  opacity: 0;
  margin: 0;
}
#plano .senha-info label i {
  position: absolute;
  top: 2px;
  left: 4px;
  font-size: 8px;
  color: #a5a5a5;
  z-index: 4;
}
#plano .senha-info label span {
  z-index: 5;
  height: 12px;
  width: 12px;
  border-radius: 2px;
  background: #101010;
  border: 1px solid #888888;
  margin-right: 10px;
  margin: 0 2px;
}
#plano .senha-info label input:checked + span {
  background: none;
}
#plano .form form button,
#plano .form button {
  position: relative;
  padding: 14px 28px;
  border: 0;
  min-height: 50px;
  font-weight: bold;
  font-size: 16px;
  border-radius: 7px;
  outline: none;
  cursor: pointer;
  box-shadow: 0px 4px 3px 0 rgba(0, 0, 0, 0.1);
  width: 280px;
  color: #ffffff;
  background: #206af7;
}
#plano .form form p {
  font-size: 10px;
  font-weight: normal;
  letter-spacing: 1px;
  opacity: 0.7;
}
#plano .form form p i {
  margin-right: 5px;
}

.loginform {
  position: relative;
  max-width: 100%;
}
.loginform .social {
  width: 100%;
}
.loginform button.social {
  position: relative;
  width: 280px;
  max-width: 100%;
  height: 50px;
  border-radius: 7px;
  overflow: hidden;
  border: 0;
  margin: 0;
  padding: 0;
  margin-bottom: 5px;
  outline: none;
  cursor: pointer;
}
.loginform button.social figure {
  position: relative;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  line-height: 50px;
  font-size: 20px;
  text-align: center;
  border: 0;
  color: #ffffff;
}
.loginform button.social figcaption {
  padding: 0 10px;
  text-align: left;
}
.loginform button.social small,
.loginform button.social h4 {
  color: #ffffff;
  padding: 0;
  text-align: left;
  font-size: 18px;
  margin-top: -5px;
  font-weight: 600;
  font-weight: bold;
}
.loginform button.social small {
  opacity: 0.8;
  font-size: 10px;
  font-weight: normal;
}
.loginform .divisor {
  position: relative;
  text-align: center;
  margin: 0 10px;
}
.loginform .divisor span {
  position: relative;
  background: #363636;
  padding: 0 20px;
  z-index: 2;
  border-radius: 30px;
}
.loginform .divisor::after {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  content: "";
  height: 1px;
  background: #dddddd;
  z-index: 1;
}
.loginform .divisor p {
  position: relative;
  background: #ffffff;
  z-index: 3;
  display: inline-block;
  padding: 0 10px;
  font-size: 12px;
  color: #888888;
}
.loginform form button {
  background: #df5b6d;
  outline-color: #df5b6d;
}
.form p {
  font-size: 14px;
  line-height: 135%;
  text-align: center;
}
.form p.small,
.form p small {
  font-size: 10px;
}
.form p.small i {
  margin-right: 6px;
}
.form .info {
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}
.form .info {
  padding: 10px 20px;
}
.form .info p {
  opacity: 0.9;
  font-size: 12px;
}

.form p.error {
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  padding: 15px;
  margin: 0px;
  padding-left: 50px;
}
.form p.error::before {
  position: absolute;
  width: 50px;
  height: 50px;
  top: 50%;
  margin-top: -25px;
  left: 0;
  line-height: 50px;
  font-family: "Font Awesome 5 Pro";
  font-size: 20px;
  color: #ffffff;
  content: "\f06a";
  font-weight: normal;
  text-align: center;
}

.form .loadinggif img {
  position: relative;
  width: 30px;
  height: 30px;
}
.form .loadinggif {
  height: 50px;
}

.loginform-content {
  position: relative;
  width: 280px;
}
.loginform form {
  position: relative;
  max-width: 280px;
  width: 280px;
  overflow: hidden;
}
.loginform p.divisor {
  margin: 15px 0;
  width: 280px;
}
.loginform p.divisor::after {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  border: 0;
}
.loginform form input {
  width: 280px;
  border-radius: 0;
}

.loginform p.fieldset-error {
  text-align: left;
  color: #df5b6d;
  margin-bottom: 5px;
  width: 100%;
}

.footer-text p {
  max-width: 500px;
  text-align: center;
  font-size: 12px;
  opacity: 0.4 !important;
  line-height: 140%;
}
@media screen and (max-width: 360px) {
  .footer-text p {
    font-size: 10px;
  }
}
#plano .form hr,
.ferramentas-item-border,
.admin-modules li .item-border::after {
  background: #d81adb !important;
  background: -moz-linear-gradient(144deg, #d81adb 0%, #590eb4 100%) !important;
  background: -webkit-linear-gradient(
    144deg,
    #d81adb 0%,
    #590eb4 100%
  ) !important;
  background: linear-gradient(144deg, #d81adb 0%, #590eb4 100%) !important;
}
hr.progress::after,
hr[data-progress]::after,
#perfil-dados .image .upload button,
.master-panel-buttons button,
.master-panel-content form.form1 button.button3 {
  background: #d81adb;
  background: -moz-linear-gradient(144deg, #d81adb 0%, #590eb4 100%);
  background: -webkit-linear-gradient(144deg, #d81adb 0%, #590eb4 100%);
  background: linear-gradient(144deg, #d81adb 0%, #590eb4 100%);
}
hr.progress.vertical::after,
hr.vertical[data-progress]::after,
#curso .videos li.active::before,
#curso .videos li::before {
  background: #d81adb;
  background: -moz-linear-gradient(0deg, #d81adb 0%, #590eb4 100%);
  background: -webkit-linear-gradient(0deg, #d81adb 0%, #590eb4 100%);
  background: linear-gradient(0deg, #d81adb 0%, #590eb4 100%);
}
menu .menu li::before,
header .submenu li::after,
.head-abas li::after {
  background: #d81adb;
  background: -moz-linear-gradient(144deg, #d81adb 0%, #590eb4 100%);
  background: -webkit-linear-gradient(144deg, #d81adb 0%, #590eb4 100%);
  background: linear-gradient(144deg, #d81adb 0%, #590eb4 100%);
}
ul.menu-modules li.menu-module::before {
  background: #d81adb;
  background: -moz-linear-gradient(144deg, #d81adb 0%, #590eb4 100%);
  background: -webkit-linear-gradient(144deg, #d81adb 0%, #590eb4 100%);
  background: linear-gradient(144deg, #d81adb 0%, #590eb4 100%);
} /* DEGRADÊ PÁGINA DE FAQ */
#suporte-form form fieldset hr {
  background: #d81adb;
  background: -moz-linear-gradient(144deg, #d81adb 0%, #590eb4 100%);
  background: -webkit-linear-gradient(144deg, #d81adb 0%, #590eb4 100%);
  background: linear-gradient(144deg, #d81adb 0%, #590eb4 100%);
} /* DEGRADÊ MENU CARROSSEL */
.page-header-abas .active {
  color: #d81adb;
}
.page-header-abas .active::after,
.page-header-abas button::after {
  background: #d81adb;
  background: -moz-linear-gradient(
    90deg,
    #d81adb 0%,
    rgba(227, 69, 69, 1) 100%
  );
  background: -webkit-linear-gradient(
    90deg,
    #d81adb 0%,
    rgba(227, 69, 69, 1) 100%
  );
  background: linear-gradient(90deg, #d81adb 0%, #590eb4 100%);
}
.flex-container, .flex-container-row {
    padding: 0;
    margin: 0;
    list-style: none;
    display: table-row;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-around;
  }
.align-center {
    text-align: center;
}
</style>
