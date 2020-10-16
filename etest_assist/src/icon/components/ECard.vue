<template>
  <div>
    <v-card>
      <span v-for="item in items" :key="item.name">
        <v-chip
          :style="{borderRadius:'0px', borderRight:'1px solid #111',backgroundColor:(item.light==true?'#111':'#333') ,color:(item.light==true?'white':'#999')}"
          close @click="change(item)" @click:close="close(item.name)" :to="{name:item.router}">
          <v-icon :style="{color:(item.light==true?'white':'#999')}" left>{{ item.icon }}</v-icon>
          <strong>{{ item.name }}</strong>
        </v-chip>
      </span>
    </v-card>
  </div>
</template>



<script>
  export default {
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
        }, ]
      }
    },
    methods: {
      change(data) {
        this.items.map((item, i) => {
          if (item.name == data.name) {
            item.light = true
          } else {
            item.light = false
          }
        })
      },
      close(data) {
        this.items = this.items.filter((item, i) => {
          return item.name != data
        })
      }

    },
  }
</script>