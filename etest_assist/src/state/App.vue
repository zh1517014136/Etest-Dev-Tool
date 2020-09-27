<template>
  <v-app>
    <!-- 上面的图标（最小化，放大，关闭） -->
    <e-sys-bar header="ETestTools" />
    <!-- 左侧导航栏 -->
    <e-top-bar> </e-top-bar>
    <!-- 路由 -->

    <v-main>
      <!-- <e-card></e-card> -->
      <!-- <router-view /> -->
      <e-tool-stateCode></e-tool-stateCode>
    </v-main>
    <v-snackbar top :timeout="touts" :color="tip_color" v-model="tip">
      {{ tip_msg }}
      <template v-slot:action="{ attrs }">
        <v-btn icon small @click="tip=false" v-bind="attrs">
          <v-icon>mdi-close</v-icon>
          
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>
<style>
  ::-webkit-scrollbar {
    display: none;
  }
</style>
<script>
  import ESysBar from "./../components/ESysBar";
  import ETopBar from './../components/ETopBar';
  import EToolStateCode from './views/EToolStateCode'




  export default {
    name: 'App',
    components: {
      "e-sys-bar": ESysBar,
      "e-top-bar": ETopBar,
      'e-tool-stateCode':EToolStateCode
    },

    data: () => ({
      //
    }),

    computed: {
      tip: {
        get: function () {
          return this.$store.state.last_tip.tip;
        },
        set: function (newValue) {
          if (!newValue) this.$store.commit('clearMsg');
        }
      },
      tip_msg: function () {
        return this.$store.state.last_tip.tip_msg;
      },
      tip_color: function () {
        let c = this.$store.state.last_tip.tip_type;
        if (c === 'info') {
          return 'grey darken-1';
        } else {
          return c;
        }
      },
      touts: function () {
        let t = this.tip_color;
        if (t === 'error') {
          return 5000;
        } else {
          return 1500;
        }
      },
    }
  };
</script>