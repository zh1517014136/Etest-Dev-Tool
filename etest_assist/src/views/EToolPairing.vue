<template>
  <div>
    <v-card>
      <span v-for="item in items" :key="item.name">
        <v-chip
          :style="{borderRadius:'0px', borderRight:'1px solid #111',backgroundColor:(item.light==true?'#111':'#333') ,color:(item.light==true?'white':'#999')}"
          close close-icon="mdi-close" color="#999" @click="change(item)" @click:close="close(item.name)">
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
          },
          {
            name: "数据转换工具1",
            icon: "mdi-account",
            light: false,

            router: "EToolDataFormat"
          }, {
            name: "图形库1",
            icon: "mdi-account-circle",
            light: false,

            router: "EToolIcons"
          }, {
            name: "状态生成器1",
            icon: "mdi-alert-box",
            light: false,

            router: "EToolStateCode"
          }, {
            name: "串口助手1",
            icon: "mdi-alien",
            light: false,

            router: "EToolSerialport"
          }, {
            name: "网络助手1",
            icon: "mdi-qqchat",
            light: false,

            router: "EToolNetwork"
          },
          {
            name: "数据转换工具2",
            icon: "mdi-account",
            light: false,

            router: "EToolDataFormat"
          }, {
            name: "图形库2",
            icon: "mdi-account-circle",
            light: false,

            router: "EToolIcons"
          }, {
            name: "状态生成器2",
            icon: "mdi-alert-box",
            light: false,

            router: "EToolStateCode"
          }, {
            name: "串口助手2",
            icon: "mdi-alien",
            light: false,

            router: "EToolSerialport"
          }, {
            name: "网络助手2",
            icon: "mdi-qqchat",
            light: false,

            router: "EToolNetwork"
          }, {
            name: "数据转换工具3",
            icon: "mdi-account",
            light: false,

            router: "EToolDataFormat"
          }, {
            name: "图形库3",
            icon: "mdi-account-circle",
            light: false,

            router: "EToolIcons"
          }, {
            name: "状态生成器3",
            icon: "mdi-alert-box",
            light: false,

            router: "EToolStateCode"
          }, {
            name: "串口助手3",
            icon: "mdi-alien",
            light: false,

            router: "EToolSerialport"
          }, {
            name: "网络助手3",
            icon: "mdi-qqchat",
            light: false,

            router: "EToolNetwork"
          },
        ]
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
           this.items = this.items.filter((item,i)=>{
              return item.name != data
            })
      }

    },
  }
</script>