<template>
    <div v-if="$store.state.logado">
        <SliderCursos />
  </div>
</template>

<script>
import SliderCursos from '@/components/SliderCursos.vue';
export default {
  name: 'Slider',

  components: {
    SliderCursos,
  },
  beforeCreate() {
    if (!this.$store.state.logado) {
      this.$router.push({ name: 'Login' });
    }
  },
};
</script>

<style scoped>
.flex-nowrap {
    flex-wrap: nowrap;
}

</style>
