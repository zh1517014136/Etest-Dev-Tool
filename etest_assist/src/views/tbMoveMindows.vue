<template>
  <div style=" height:100%; background-color:#333; display:flex;flex-direction:column">
    <div style="height:300px; width:100%; background-color:#256413" ref="left">
      我是上边的
    </div>
    <div class="py-1" style="cursor:row-resize;" ref="move">
      <v-divider dark> </v-divider>
    </div>
    <div style="height:100%;width:100%;background-color:#985314; ">
      我是下边的
    </div>
  </div>
</template>



<script>
  export default {
    data() {
      return {
        letfDom: null,
        clientStartY: 0,
        previous: 0,
      }
    },
    mounted() {
      this.letfDom = this.$refs.left;
      let moveDom = this.$refs.move;
      moveDom.onmousedown = e => {
        this.clientStartY = e.clientY;
        e.preventDefault();
        console.log(123)
        document.onmousemove = e => {
          this.moveHandle(e.clientY, this.letfDom);
        };

        document.onmouseup = e => {
          document.onmouseup = null;
          document.onmousemove = null;
        };
      };
    },
    methods: {
      moveHandle(nowClientY, letfDom) {
        let now = Date.now();
        if (now - this.previous > 40) {
          let computedY = nowClientY - this.clientStartY;
          let leftBoxHeight = parseInt(letfDom.style.height);
          let changeHeight = leftBoxHeight + computedY;

          if (changeHeight < 150) {
            changeHeight = 150;
          }

          if (changeHeight > 1000) {
            changeHeight = 1000;
          }

          letfDom.style.height = changeHeight + "px";

          this.clientStartY = nowClientY;
          this.previous = now
        }
      }
    }

  }
</script>