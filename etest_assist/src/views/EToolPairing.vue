<template>
  <div>
     <v-card>
    <close-card :items='items' @chenagCard="change" @closeCard="close"></close-card>
     </v-card>
  </div>
</template>

<script>
  import Card from "./EToolCloseCard";

  export default {
    components: {
      "close-card": Card
    },
    data() {
      return {
        items: [{
            name: "数据转换工具",
            icon: "mdi-account",
            light: false,
            router: "EToolDataFormat"
          }, {
            name: "图形库",
            icon: "mdi-account-circle",
            light: false,
            router: "EToolIcons"
          }, {
            name: "状态生成器",
            icon: "mdi-alert-box",
            light: false,
            router: "EToolStateCode"
          }, {
            name: "串口助手",
            icon: "mdi-alien",
            light: false,
            router: "EToolSerialport"
          }, {
            name: "网络助手",
            icon: "mdi-qqchat",
            light: false,
            router: "EToolNetwork"
          },
          {
            name: "其他助手",
            icon: "mdi-qqchat",
            light: false,
            router: "other"
          },
        ]
      }
    },
    methods: {
      change(data) {
        console.log(data)
        this.items.map((item) => {
          if (item == data) {
            item.light = true
          } else {
            item.light = false
          }
        })
      },
      close(data) {
        console.log(data)
        this.items = this.items.filter((item) => {
          return item != data
        })
      }

    },
  }
</script>