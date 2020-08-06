<template>
  <v-card>
    <span style="margin-right:1px;" v-for="item in items"
      :key="item.name">
      <v-chip class="pr-4" style="border-radius:0" label :light="item.light" close v-if="item.name"
        @click="change(item)" @click:close="item.name = false" :to="{name:item.router}">
        <v-icon left>{{ item.icon }}</v-icon>
        <strong>{{ item.name }}</strong>&nbsp;
      </v-chip>
    </span>
  </v-card>
</template>


<script>
  export default {
    data() {
      return {

        items: [{
          name: "数据转换工具",
          icon: "mdi-account",
          light: false,
          close: false,
          router: "EToolDataFormat"
        }, {
          name: "图形库",
          icon: "mdi-account-circle",
          light: false,
          close: false,
          router: "EToolIcons"
        }, {
          name: "状态生成器",
          icon: "mdi-alert-box",
          light: false,
          close: false,
          router: "EToolStateCode"
        }, {
          name: "串口助手",
          icon: "mdi-alien",
          light: false,
          close: false,
          router: "EToolSerialport"
        }, {
          name: "网络助手",
          icon: "mdi-qqchat",
          light: false,
          close: false,
          router: "EToolNetwork"
        },]
      }
    },
    methods: {
      change(data) {
        this.items.map((item, i) => {
          if (item.name == data.name) {
            item.light = true
            item.close = true
          } else {
            item.light = false
            item.close = false
          }
        })
      },
      mouseover(data) {
        this.items.map((item, i) => {
          if (item.name == data.name) {
            item.close = true
          }
        })
      },
      mouseout(data) {

        this.items.map((item, i) => {
          if (item.name == data.name) {
            if (item.light != true) {
              item.close = false
            }
          }
        })
      }
    },
  }
</script>