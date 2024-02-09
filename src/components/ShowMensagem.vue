<template>
  <div class="text-center">
    <v-dialog v-model="show" width="500" persistent>
      <v-card>
        <v-progress-linear
          indeterminate
          color="indigo darken-2"
        ></v-progress-linear>

        <v-card-title class="text-h5 grey lighten-2"> T 360 </v-card-title>

        <v-card-text>
          {{ msg }}
        </v-card-text>

        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "ShowMensagem",
  props: {
    msg: String,
    dialog: Boolean,
  },
  computed: {
    show: {
      get() {
        return this.dialog;
      },
      set(dialog) {
        this.$emit("input", dialog);
      },
    },
  },
};
</script>
