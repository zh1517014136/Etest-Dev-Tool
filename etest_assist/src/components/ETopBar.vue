<template>
  <v-navigation-drawer fixed permanent expand-on-hover app style="z-index:9999">
    <v-list nav dense>
<!-- 
       <v-list-item>

        <v-list-item-icon>
          <v-icon>mdi-lan</v-icon>
        </v-list-item-icon>
        <v-list-item-title><a style="color:white;" href="../lan/public/index.html">网络调试助手</a></v-list-item-title>

      </v-list-item>

      <v-list-item>

        <v-list-item-icon>
          <v-icon>mdi-simple-icons</v-icon>
        </v-list-item-icon>
        <v-list-item-title><a style="color:white;" href="../icon/public/index.html">图标库</a></v-list-item-title>

      </v-list-item>

     
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-database</v-icon>
        </v-list-item-icon>
        <v-list-item-title><a style="color:white;" href="../data/public/index.html">数据转换工具</a></v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-state-machine</v-icon>
        </v-list-item-icon>
        <v-list-item-title><a style="color:white;" href="../state/public/index.html">状态机生成器</a></v-list-item-title>
      </v-list-item> 
      
       <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-align-vertical-center</v-icon>
        </v-list-item-icon>
        <v-list-item-title><a style="color:white;" href="../serialport/public/index.html">串口调试助手</a></v-list-item-title>
      </v-list-item>
    </v-list>
  -->
     
    <!--    
    -->
    
     
              
     <v-list-item>

        <v-list-item-icon>
          <v-icon>mdi-lan</v-icon>
        </v-list-item-icon>
        <v-list-item-title><a style="color:white;" href="./lan.html">网络调试助手</a></v-list-item-title>

      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-simple-icons</v-icon>
        </v-list-item-icon>
        <v-list-item-title><a style="color:white;" href="./icon.html">图标库</a></v-list-item-title>
      </v-list-item>

       <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-database</v-icon>
        </v-list-item-icon>
        <v-list-item-title><a style="color:white;" href="./dataformat.html">数据转换工具</a></v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-state-machine</v-icon>
        </v-list-item-icon>
        <v-list-item-title><a style="color:white;" href="./state.html">状态机生成器</a></v-list-item-title>
      </v-list-item>
     
       <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-align-vertical-center</v-icon>
        </v-list-item-icon>
        <v-list-item-title><a style="color:white;" href="./serialport.html">串口调试助手</a></v-list-item-title>
      </v-list-item>
    </v-list>  
      
  </v-navigation-drawer>
</template>

<style >
a {
  text-decoration: none;
}
</style>

<script>
  export default {


    methods: {
      jump: function () {
      
      }
    }
  }
</script>