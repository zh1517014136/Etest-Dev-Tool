<template>
  <div style=" height:100%; background-color:#333; display : flex;">
    <div style="height:100%; width:200px; background-color:#256413" ref="left">
      我是左边的
    </div>
    <div class="px-1" style="cursor:col-resize;" ref="move">
      <v-divider dark vertical> </v-divider>
    </div>
    <div style="height:100%;width:100%;background-color:#985314;text-align:right;">
      我是右边的
    </div>
  </div>
</template>



<script>
  export default {
    data() {
      return {
        letfDom: null,
        clientStartX: 0,
        previous: 0
      }
    },
    mounted() {
      this.letfDom = this.$refs.left;
      let moveDom = this.$refs.move;
      moveDom.onmousedown = e => {
        this.clientStartX = e.clientX;
        e.preventDefault();
        console.log(123)
        document.onmousemove = e => {
          this.moveHandle(e.clientX, this.letfDom);
        };

        document.onmouseup = e => {
          document.onmouseup = null;
          document.onmousemove = null;
        };
      };
    },
    methods: {
      moveHandle(nowClientX, letfDom) {
        let now = Date.now();
        if (now - this.previous > 40) {
          let computedX = nowClientX - this.clientStartX;
          let leftBoxWidth = parseInt(letfDom.style.width);
          let changeWidth = leftBoxWidth + computedX;
          if (changeWidth < 150) {
            changeWidth = 150;
          }
          if (changeWidth > 1000) {
            changeWidth = 1000;
          }
          letfDom.style.width = changeWidth + "px";
          this.clientStartX = nowClientX;
          this.previous = now
        }
      }
    }
  }
</script>