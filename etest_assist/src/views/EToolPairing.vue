<template>
  <div>
    <v-card>
      <close-card :items='items' @chenagCard="change" @closeCard="close" @moveData="move"></close-card>
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
      },
      move(data) {
        console.log(data)
        var index = this.items.findIndex(item1 => item1 == data.move)
        var index1 = this.items.findIndex(item1 => item1 == data.code)
        if (index < index1) {
          let arr = this.items
          arr = this.items.filter((item) => {
            return item != data.move
          })
          console.log(arr)
          arr.splice(arr.findIndex((item => item == data.code)) + 1, 0, data.move)
          console.log(arr)
          this.items = arr
        } else {
           let arr = this.items
          arr = this.items.filter((item) => {
            return item != data.move
          })
          console.log(arr)
          arr.splice(arr.findIndex((item => item == data.code)), 0, data.move)
          console.log(arr)
          this.items = arr
        }
      }

    },
  }
</script>