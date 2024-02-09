<template>
  <router-view />
</template>

<script>

export default {
  name: 'App',
  mounted() {
    window.onresize = () => {
      this.$store.state.windowWidth = window.innerWidth;
      this.$store.state.menuMinimified = this.$store.state.windowWidth < 1000 && this.$store.state.windowWidth > 600;
    };
  },
  computed: {
    menuMinimified() {
      return this.$store.state.windowWidth < 1000 && this.$store.state.windowWidth > 600;
    },
  },

};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
