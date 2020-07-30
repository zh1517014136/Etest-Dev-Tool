<template>
  <v-tabs
    @change="change"
    fixed-tabs
  >
    <v-tab v-for="item in items" :key="item" >
     {{item}}
    </v-tab>
   
  </v-tabs>
</template>

<script>
export default {
  data:function(){
    return {
      items:['01','02','03','04','05']
    }
  },
  methods:{
    change:function(data){
      this.$emit('select',data)
    }
  }

}
</script>