import Vue from 'vue';
import Vuex from 'vuex';

// import createWebSocketPlugin from '@/plugins/webSocket';

/*
import toast from './moduleToast';
import dialog from './moduleDialog';
import leads from './moduleLeads';
*/
Vue.use(Vuex);

export default new Vuex.Store({
  // plugins: [createWebSocketPlugin()],
  state: {
    version: '0.25.0',
    aluno: null,
    exibirAula: false,
    logado: false,
    open: false,
    categoria: '',
    recuperar: false,
    currentAula: null,
    aulas: [],
    menuMinimified: false,
    windowWidth: window.innerWidth,

  },

  mutations: {

  },

  actions: {
    testeStore(context) {
      console.log(context);
    },
  },

  modules: {
    /*    toast,
    dialog,
    leads,
    */
  },
});
