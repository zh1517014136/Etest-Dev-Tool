<template>
  <div>
    <v-chip v-for="item in items" :key="item"
      :style="{borderRadius:'0px', borderRight:'1px solid #111',backgroundColor:(item.light==true?'#111':'#333') ,color:(item.light==true?'white':'#999')}"
      close close-icon="mdi-close" color="#999" @click="click(item)" @click:close="propsClose(item)" draggable
      :ripple="false">
      <v-icon :style="{color:(item.light==true?'white':'#999')}" left>{{ item.icon }}</v-icon>
      <strong>{{ item.name }}</strong>
    </v-chip>
  </div>
</template>

<script>
  export default {
    props: ['items'],
    methods: {
      click(data) {
        this.$emit('chenagCard', data)
      },
      propsClose(data) {
        this.$emit('closeCard', data)
      }

    },
  }
</script>