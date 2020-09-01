<template>
  <div>
    <v-chip v-for="item in items" :key="item"
      :style="{borderRadius:'0px', borderRight:'1px solid #111',backgroundColor:(item.light==true?'#111':'#333') ,color:(item.light==true?'white':'#999')}"
      close close-icon="mdi-close" color="#999" @click="click(item)" @click:close="propsClose(item)" draggable
      @drop.native="(ev) => on_drop(ev, item)" @dragover.native="(ev) => on_dragover(ev, item)"
      @dragstart.native="(ev) => on_dragstart(ev, item)" @dragend="by_drag=null" :ripple="false">
      <v-icon :style="{color:(item.light==true?'white':'#999')}" left>{{ item.icon }}</v-icon>
      <strong>{{ item.name }}</strong>
    </v-chip>
  </div>
</template>

<script>
  export default {
    props: ['items'],
    data() {
      return {
        by_drag: null,
      }

    },
    methods: {
      click(data) {
        this.$emit('chenagCard', data)
      },
      propsClose(data) {
        this.$emit('closeCard', data)
      },
      on_dragstart: function (ev, item) {
        this.by_drag = item;
      },
      on_drop: function (ev, item) {

        const data = {
          move: this.by_drag,
          code: item,
        }
        this.$emit('moveData', data)
      },
      on_dragover: function (ev) {
        ev.preventDefault();
        if (!this.by_drag) {
          return;
        }
      },
    },
  }
</script>