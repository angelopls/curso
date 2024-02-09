<template>
  <div>
    <!--<TheLeads />-->
    <TheDisparador />
  </div>
</template>

<script>
//import TheLeads from '../components/TheLeads.vue';
import TheDisparador from '../components/TheDisparador.vue';
export default {
  name: 'Home',

  components: {
  //  TheLeads,
    TheDisparador,
  },
  beforeCreate() {
    if (!this.$store.state.logado) {
      this.$router.push({ name: 'Login' });
    }
  },
};
</script>
