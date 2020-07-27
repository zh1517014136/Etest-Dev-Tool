<template>
  <v-app>
    <v-main>
      <EDeviceEditor/>
    </v-main>
  </v-app>
</template>
<style>
  ::-webkit-scrollbar {
    display: none;
  }
</style>
<script>

    import EDeviceEditor from './components/EDeviceEditor';

export default {
  name: 'App',

  components: {
    EDeviceEditor,
  },

  data: () => ({
    //
  }),
};
</script>
