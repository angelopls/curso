import store from '@/store';

const mixins = {
  data() {
    return {
      msg: '',
      showMessage: false,

    };
  },
  methods: {
    getNivel(nivel, isAluno) {
      let eNivel = nivel;

      if (nivel === null) eNivel = 'Lead';

      if (
        isAluno
        && (nivel === null
          || nivel === 'Lead'
          || nivel === 'Enviei Análise'
          || nivel === 'Mostrei o Método')
      ) { eNivel = 'Aluno'; }

      return eNivel;
    },
    getLeads() {
      store.state.leadsLoading = true;
      this.msg = 'Obtendo lista de leads...';
      this.showMessage = true;
      // this.delayedMessage('Quase lá');
      store.state.carregandoLeads = true;
      const params = {
        action: 'getLeads',
        distribuidorId: store.state.distribuidor.identificador,
      };
      this.$http
        .post('/leads.php', params)
        .then((response) => {
          let leads = response.data;
          if (leads.length > 0 && store.state.alunos) {
            const that = this;
            leads = leads.map((e) => {
              const matriculado = (element) => element.email === e.email;
              const idxAluno = store.state.alunos.findIndex(matriculado);
              let isAluno = false;
              let dataMatricula = null;
              if (idxAluno !== -1) {
                isAluno = true;
                dataMatricula = store.state.alunos[idxAluno].Data;
              }
              // const isAluno = that.$store.state.alunos.findIndex(matriculado) !== -1;
              e.isAluno = !!isAluno;
              e.dataMatricula = dataMatricula;
              e.nivel = that.getNivel(e.nivel, e.isAluno);
              return e;
            });
          }
          store.commit('getLeads', leads);
          store.state.leadsLoading = true;
          store.state.carregandoLeads = false;
          // router.push({ name: 'Leads' });
          store.state.logado = true;
          this.showMessage = false;
          // console.log(this.$store.state.leads);
        })
        .catch((error) => {
          console.error('Não foi possível ler os leads! ', error);
        });
    },

  },
};

export default mixins;
