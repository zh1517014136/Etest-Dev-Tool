<template>
  <v-app>
    <!-- <e-sys-bar header="ETestDev" /> -->
    <v-main>
      <EDeviceEditor />
    </v-main>
  </v-app>
</template>
<style>
::-webkit-scrollbar {
  display: none;
}
</style>
<script>
// import ESysBar from "./components/ESysBar";
import EDeviceEditor from "./components/EDeviceEditor";

export default {
  name: "App",

  components: {
    EDeviceEditor,
    // "e-sys-bar": ESysBar,
  },

  data: () => ({
    //
  }),
};
</script>
