<template>
    <div v-if="$store.state.exibirAula">
        <PainelCurso :categoria="$store.state.categoria" />
    </div>
</template>

<script>
import PainelCurso from '@/components/PainelCurso.vue';

export default {
  name: 'Painel',
  components: {
    PainelCurso,
  },
  beforeCreate() {
    if (!this.$store.state.logado) {
      this.$router.push({ name: 'Login' });
    }
  },
};
</script>
