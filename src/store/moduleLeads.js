const moduleLeads = {
  namespaced: true,

  state: {
    leads: [],
  },

  mutations: {
    updateLeads(state, leads) {
      // here set your state
      state.leads = leads;
    },
  },

  actions: {
    getLeads({
      commit,
    }) {
        console.log('entrou');
      const params = {
        action: 'getLeads',
        distribuidorId: this.$store.state.distribuidor.identificador,
      };
      console.log(params);
      this.$http // axios
        .post('/leads.php', params)
        .then((response) => {
          // const d2 = new Date();

          console.log(response.data);
          /*
                              this.items = response.data;
                              this.itemsFiltered = this.items;
                              this.totalRows = this.items.length;
                              this.carregando = false;
                              //const d3 = new Date();
                              //console.log('final: ', d3, ' ', d3 - d1);
                      */
          commit('updateLeads', response.data);
        })
        .catch((error) => {
          console.error('Não foi possível gravar como assitida! ', error);
        });
    },
  },
};

export default moduleLeads;
