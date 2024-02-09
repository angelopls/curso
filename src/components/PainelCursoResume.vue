<template>
  <div class="flex-container flex-align-left">
     <div class="videohead flex-item">
        <h6>{{titulo}}</h6>
     </div>

     <div class="video-finishbutton">
        <a>
           <button @click="nextAula" class="video-finished-button">
              <div class="flex-container flex-nowrap">
                 <figure><i class="fa fa-check"></i></figure>
                 <figcaption><b>Concluir e avançar</b></figcaption>
              </div>
           </button>
        </a>
     </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PainelCursoResume',
  computed: {
    titulo() {
      return this.$store.state.currentAula ? this.$store.state.currentAula.titulo : '';
    },
  },
  methods: {
    gravaAulaAssistida(idAula) {
      console.log('aluno: ', this.$store.state.aluno.email);
      console.log('aula: ', idAula);

      const url = 'https://meut360.com.br/api';
      const params = {
        action: 'gravaAulaAssistida',
        emailAluno: this.$store.state.aluno.email,
        idAula,
      };

      axios
        .post(`${url}/get-aulas.php`, params)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error('Não foi possível gravar como assitida! ', error);
        });
    },
    nextAula() {
      const indexAula = this.$store.state.currentAula.seq;
      const idAula = this.$store.state.aulas[indexAula].id;
      console.log(this.$store.state.aulas);
      console.log(this.$store.state.currentAula.seq);
      console.log(this.$store.state.aulas[indexAula].id);
      this.gravaAulaAssistida(idAula);
      const aulaAtual = this.$store.state.currentAula.seq + 1;
      if (aulaAtual < this.$store.state.aulas.length) {
        this.$store.state.aulas[aulaAtual - 1].checked = true;
        this.$store.state.aulas[aulaAtual - 1].active = false;
        this.$store.state.aulas[aulaAtual].active = true;
        this.$store.state.currentAula = this.$store.state.aulas[aulaAtual];
        // console.log(this.$store.state.aulas[aulaAtual])
      } else {
        // this.$store.state.exibirAula = false;
        this.$router.push({ name: 'Slider' });
      }
    },
  },
};
</script>
