<template>
  <div style="width:100%;height: calc(100vh - 32px);">
    <v-card height="100%" width="100%" style="min-height:698px;" tile>
      <div style="display:flex; flex-wrap: nowrap;height:100%">
        <div class="py-2 pl-4 pr-2" style="height:100%;width:25%;min-width:300px;min-height:698px">
          <div style="width:100%;height:30%;min-width:250px;  min-height:220px;">
            <v-card tile :elevation="0" style="width:100%; height:100%;">
              <v-subheader style="height:26px">网络设置</v-subheader>
              <v-divider></v-divider>
              <v-select class="mb-0 mt-4" v-model="xylx" label="(1)协议类型" dense attach
                :items="['UDP','TCP Client','TCP Server']">
              </v-select>
              <v-select class="my-0" v-model="zjdz" label="(2)本地主机地址" dense attach :items="ipdz">
              </v-select>
              <v-text-field class="my-0" v-model="dk" attach dense label="(3)本地主机端口"></v-text-field>
              <div style="text-align:center;">
                <v-btn block small @click="click">{{this.flag==false?'打开':'关闭'}}</v-btn>
              </div>
            </v-card>
          </div>
          <div class="mt-1" style="width:100%;height:29%; min-height:210px; min-width:250px;">
            <v-card tile :elevation="0" style="width:100%;  height:100%;">
              <v-subheader style="height:26px">接受设置</v-subheader>
              <v-divider></v-divider>
              <v-radio-group style="height:15px" v-model="row" row>
                <v-radio style="height:15px" label="ASCII" :value="1"></v-radio>
                <v-radio style="height:15px" label="HEX" :value="2"></v-radio>
              </v-radio-group>
              <v-checkbox style="height:15px" v-model="checkbox1" :label="`按日志模式显示`">
              </v-checkbox>
              <v-checkbox style="height:15px" v-model="checkbox2" :label="`接收区自动换行`">
              </v-checkbox>
              <v-checkbox style="height:15px" v-model="checkbox3" :label="`接收区自动保存`">
              </v-checkbox>
              <div class="mt-4">
                <a class="mr-4" href="">静默接收</a>
                <a href="">清除接收</a>
              </div>
            </v-card>
          </div>
          <div class="mt-1" style="width:100%;height:36%; min-width:250px; min-height:250px">
            <v-card tile :elevation="0" style="width:100%;  height:100%;">
              <v-subheader style="height:26px">发送设置</v-subheader>
              <v-divider></v-divider>
              <v-radio-group style="height:15px" v-model="row1" row>
                <v-radio style="height:15px" label="ASCII" :value="1"></v-radio>
                <v-radio style="height:15px" label="HEX" :value="2"></v-radio>
              </v-radio-group>
              <v-checkbox style="height:15px" v-model="checkbox4" :label="`自动解析转义符`">
              </v-checkbox>
              <v-checkbox style="height:15px" v-model="checkbox5" :label="`AT指令自动回车`">
              </v-checkbox>
              <v-checkbox style="height:15px" v-model="checkbox6" :label="`自动发送校验位`">
              </v-checkbox>
              <v-checkbox style="height:15px" v-model="checkbox7" :label="`打开文件数据源`">
              </v-checkbox>
              <v-row class="px-3" align="center">
                <v-checkbox v-model="checkbox8" :label="`循环周期:`" hide-details class="shrink mr-2 mt-0"></v-checkbox>
                <v-text-field style="width:80px;" v-model="ms" :disabled="!checkbox8"></v-text-field>ms
              </v-row>
            </v-card>
          </div>
        </div>
        <div class="py-2 pl-2 pr-4" style="height:100%;width:75%;min-height:698px ">
          <div style="background-color:yellow;width:100%;height:79%;min-width:500px;">
            <v-card tile :elevation="0" style="width:100%; height:100%;">
              <v-subheader style="height:26px">数据日志</v-subheader>
              <v-divider></v-divider>
              <v-sheet width="100%" class="pa-0 ma-0 mb-1" @keydown.stop
                style="height: calc(75vh - 52px);min-height:460px;">
                <e-script-editor id="jsdata" :script="jsdata" type="jsdata" @change="on_change" />
              </v-sheet>
            </v-card>
          </div>
          <div class="mt-2" style="background-color:red;width:100%;height:20%;min-width:500px">
            <v-card tile :elevation="0" style="width:100%; height:100%;">
              <v-subheader style="height:26px">数据发送</v-subheader>
              <v-divider></v-divider>
              <v-row class="pt-4">
                <v-col class="pa-0  pl-3 pr-2" cols="10">
                  <v-sheet width="100%" class="pa-0 ma-0 mb-1" @keydown.stop style="height: calc(9vh);min-height:65px;">
                    <e-script-editor id="push" :script="push" type="push" @change="on_change" />
                  </v-sheet>
                </v-col>
                <v-col class="pa-0  pr-3" cols="2">
                  <v-btn class="ma-0 px-0 " style="height:calc(9vh);min-height:60px;" block @click="fasong" outlined>发送
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
  import EScriptEditor from "../components/widgets/EDataFormatEditor";
  export default {
    components: {
      "e-script-editor": EScriptEditor,

    },

    mounted() {
      try {
        var interfaces = window.require('os').networkInterfaces();
        for (var devName in interfaces) {
          var iface = interfaces[devName];
          for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4') {
              this.ipdz.push(alias.address)
              //return alias.address;
            }
          }

        }
        this.zjdz = this.ipdz[0]
        const dgram = window.require('dgram');
        const server = dgram.createSocket('udp4');
        server.close(function () {
          console.log('关闭服务')
        })

      } catch (error) {
        console.log(error)
      }

    },

    data() {
      return {
        flag: false,
        ms: 1000,
        dk: 8080,
        xylx: 'UDP',
        zjdz: '',
        row: 1,
        row1: 1,
        ipdz: [],
        push: "",
        jsdata: "",
        checkbox1: true,
        checkbox2: true,
        checkbox3: false,
        checkbox4: true,
        checkbox5: true,
        checkbox6: false,
        checkbox7: false,
        checkbox8: false,

      }
    },
    methods: {
      on_change() {

      },
      click() {
        const dgram = window.require('dgram');
        const server = dgram.createSocket('udp4');
        server.bind({
          address: this.zjdz,
          port: this.dk,
          exclusive: true
        });
        server.on('error', (err) => {
          console.log(`服务器异常：\n${err.stack}`);
          server.close();
        });

        server.on('message', (msg, rinfo) => {
          console.log(`服务器收到：${msg} 来自 ${rinfo.address}:${rinfo.port}`);
        });

        server.on('listening', () => {
          const address = server.address();
          console.log(`服务器监听 ${address.address}:${address.port}`);
        });


      },

      fasong() {
        const dgram = window.require('dgram')
        const client = dgram.createSocket('udp4')
       
        client.on('close', function () {
          console.log('udp client closed.')
        })

        // 当绑定端口好启动成功后触发

        client.on('listening', () => {
          const address = client.address()
          console.log(`client running ${address.address}: ${address.port}`)
        })


        // 当收到消息时触发
        client.on('message', function (msg, rinfo) {
          console.log(`receive message from ${rinfo.address}:${rinfo.port}：${msg}`);
        })
        // 发生异常触发
        client.on('error', function () {
          console.log('some error on udp client.')
        })
        // 发送消息
        var SendBuff = '你好,这是我发送过来的数据';
        var SendLen = SendBuff.length;
        client.send(SendBuff, 0, SendLen, this.dk, this.zjdz , function(){
          console.log('数据发送成功')
        });


      }

    }

  }
</script>