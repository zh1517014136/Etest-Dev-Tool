<template>
  <div>
    <!-- <div style="width:100%;height:48px;">
      <e-top-tab :selected_index="selected_index" @select="on_select"></e-top-tab>
    </div> -->
    <div style="width:100%;height: calc(100vh - 32px);">
      <v-card height="100%" width="100%" style="min-height:698px;" tile>
        <div style="display:flex; flex-wrap: nowrap;height:100%">
          <div class="py-2 pl-4 pr-2" style="height:100%;width:25%;min-width:300px;min-height:698px">
            <div style="width:100%;height:30%;min-width:250px;  min-height:220px;">
              <v-card tile :elevation="0" style="width:100%; height:100%;">
                <v-subheader style="height:26px">网络设置</v-subheader>
                <v-divider></v-divider>
                <v-select :disabled="_bind" class="mb-0 mt-4" v-model="_xylx" label="(1)协议类型" dense attach
                  :items="['UDP','TCP Client','TCP Server']">
                </v-select>
                <v-select v-if="_xylx!=='TCP Client'" :disabled="_bind" class="my-0" v-model="zj_dz"
                  :label="_xylx=='TCP Client'?'(2)远程主机地址':'(2)本地主机地址'" dense attach :items="get_ip">
                </v-select>
                <v-text-field v-if="_xylx ==='TCP Client'" :disabled="_bind" class="my-0" v-model="zj_dz" attach dense
                  :label="_xylx=='TCP Client'?'(3)远程主机地址':'(3)本地主机地址'"></v-text-field>
                <v-text-field :disabled="_bind" class="my-0" v-model="d_k" attach dense type="number"
                  :label="_xylx=='TCP Client'?'(3)远程主机端口':'(3)本地主机端口'"></v-text-field>
                <div style="text-align:center;">
                  <v-btn block small @click="click">
                    <v-icon left :color="_bind==true?'red':undefined">mdi-lightbulb</v-icon>
                    {{this._bind !== false?'关闭':this._xylx === 'TCP Client'?'链接':'打开'}}
                  </v-btn>
                </div>
              </v-card>
            </div>
            <div class="mt-1" style="width:100%;height:29%; min-height:210px; min-width:250px;">
              <v-card tile :elevation="0" style="width:100%;  height:100%;">
                <v-subheader style="height:26px">接受设置</v-subheader>
                <v-divider></v-divider>
                <v-radio-group style="height:15px" v-model="jieshou_leixing" row>
                  <v-radio style="height:15px" label="ASCII" :value="1"></v-radio>
                  <v-radio style="height:15px" label="HEX" :value="2"></v-radio>
                </v-radio-group>
                <v-checkbox style="height:15px" v-model="_rizhi" :label="`按日志模式显示`">
                </v-checkbox>
                <v-checkbox style="height:15px" v-model="_huanhang" :label="`接收区自动换行`">
                </v-checkbox>
                <!-- <v-checkbox style="height:15px" v-model="_baocun" :label="`接收区自动保存`">
                </v-checkbox> -->
                <!-- <div class="mt-4">
                <a class="mr-4" href="">静默接收</a>
                <a href="">清除接收</a>
              </div> -->
              </v-card>
            </div>
            <div class="mt-1" style="width:100%;height:36%; min-width:250px; min-height:250px">
              <v-card tile :elevation="0" style="width:100%;  height:100%;">
                <v-subheader style="height:26px">发送设置</v-subheader>
                <v-divider></v-divider>
                <v-radio-group style="height:15px" v-model="fasong_leixing" @change="changefasongleixing" row>
                  <v-radio style="height:15px" label="ASCII" :value="1"></v-radio>
                  <v-radio style="height:15px" label="HEX" :value="2"></v-radio>
                </v-radio-group>
                <!-- <v-checkbox style="height:15px" v-model="_jiexizhuanyifu" :label="`自动解析转义符`">
                </v-checkbox>
                <v-checkbox style="height:15px" v-model="_zidonghuiche" :label="`AT指令自动回车`">
                </v-checkbox> -->
                <!-- <v-checkbox style="height:15px" v-model="checkbox7" :label="`打开文件数据源`">
              </v-checkbox> -->
                <v-row class="px-3" align="center">
                  <v-checkbox v-model="_zdfasong" @change="closeSetInitval" :label="`循环周期:`" hide-details
                    class="shrink mr-2 mt-0"></v-checkbox>
                  <v-text-field style="width:80px;" v-model="_ms" :disabled="!_zdfasong"></v-text-field>ms
                   
                </v-row>
              </v-card>
            </div>
          </div>
          <div class="py-2 pl-2 pr-4" style="height:100%;width:75%;min-height:650px ">
            <div style="background-color:yellow;width:100%;height:75%;min-width:500px;">
              <v-card tile :elevation="0" style="width:100%; height:100%;">
                <v-subheader style="height:26px">数据日志</v-subheader>
                <v-divider></v-divider>
                <v-sheet width="100%" class="pa-0 ma-0 mb-1" @keydown.stop
                  style="height: calc(68vh - 52px);min-height:470px;">
                  <e-script-editor id="js_data" :script="js_data" type="jsdata" @change="on_change" />
                </v-sheet>
              </v-card>
            </div>
            <div class="mt-2" style="background-color:red;width:100%;height:25%;min-width:500px">
              <v-card tile :elevation="0" style="width:100%; height:100%;">
                <v-row class="py-0">
                  <v-col class="pa-0" cols="2">
                    <v-subheader style="height:44px">数据发送</v-subheader>
                  </v-col>
                  <v-col v-if="this._xylx == 'UDP'" class="pa-0" cols="6">

                    <v-row v-if="_bind == true" class="py-0">
                      <v-col class="pa-0" cols="6">
                        <v-text-field class="my-0" v-model="_yczjip" attach dense label="远程主机IP地址">
                        </v-text-field>
                      </v-col>
                      <v-col class="pa-0" cols="6">
                        <v-text-field class="my-0" v-model="_yczjdk" attach dense label="远程主机端口号">
                        </v-text-field>
                       
                      </v-col>

                    
                    </v-row>

                  </v-col>
                  <v-col v-else-if="this._xylx == 'TCP Server'" class="pa-0" cols="6">
                    <v-row v-if="_bind == true" class="py-0">
                      <v-select class="my-0" v-model="_changeip" :label="'客户端'+(_clentip.length-1)" :items="_clentip"
                        item-text="ip" item-value="value" dense attach>
                      </v-select>
                    </v-row>
                  </v-col>
                  <v-col class="pa-0 ml-6" cols="3">
                    <v-row v-if="_bind == true" class="py-0">
                      <v-col class="pa-0" cols="6" style="text-align:center;">
                        <v-btn small @click="closefs">
                          <v-icon left>mdi-arrow-bottom-left</v-icon>清除
                        </v-btn>
                      </v-col>
                      <v-col class="pa-0" cols="6" style="text-align:center;">
                        <v-btn small @click="closejs">
                          <v-icon left>mdi-arrow-top-left</v-icon>清除
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row class="pt-4 mt-2">
                  <v-col class="pa-0  pl-3 pr-2" cols="10">
                    <v-sheet width="100%" class="pa-0 ma-0 mb-1" @keydown.stop
                      style="height: calc(9vh);min-height:65px;">
                      <e-script-editor id="push_data" :script="push_data" type="push" @change="on_change" />
                    </v-sheet>
                  </v-col>
                  <v-col class="pa-0  pr-3" cols="2">
                    <v-btn class="ma-0 px-0 " style="height:calc(9vh);min-height:60px;" block @click="fasong"
                      :disabled="!_bind" outlined>{{this._zidong==false?'发送':'停止发送'}}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
  import EScriptEditor from "../../components/widgets/EDataFormatEditor";
  // import ETopTab from "../../components/ETopTabs";

  var dgram = window.require('dgram');
  var net = window.require('net');
  var encoding = require('encoding')
  var tcpServer
  var server
  var tcpClient
  export default {
    components: {
      "e-script-editor": EScriptEditor,
      // "e-top-tab": ETopTab,
    },

    mounted() {
      var interfaces = window.require('os').networkInterfaces();
      let arr = []
      for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
          var alias = iface[i];
          if (alias.family === 'IPv4') {
            arr.push(alias.address)
          }
        }
      }
      this.get_ip = arr
    },
    beforeMount: async function () {
      let db_items = await this.$store.dispatch("db_list", {
        kind: "nettool",
      });
      if (db_items.length > 0) {
        this.$store.commit("net_tool/setItem", db_items);
      }
      this.load_data(this.selected_index)
    },
    beforeDestroy: async function () {
      clearInterval(this.zidongfasong)
      this.zidongfasong = undefined
      let _this = this
      if (this._bind == true) {
        if (this._xylx === 'UDP') {
          server.on('close', () => {
            console.log('socket 已关闭');
          })
          server.close();
        } else if (this._xylx === 'TCP Client') {
          tcpClient.on('close', function () {
            console.log('else close')
            console.log(tcpClient)
            tcpClient.destroy();
          })
          tcpClient.destroy(function () {});
        } else if (this._xylx === 'TCP Server') {
          for (var i in this._socket) {
            this._socket[i].destroy(function () {});
          }
          tcpServer.close(function () {
            console.log('server close')
          })
        }
      }
      let state_items = this.$store.state.net_tool.items;
      let len = state_items.length;
      for (let index = 0; index < len; index++) {
        let item = state_items[index];
        item.bind = false
        item.zidong = false
        item.socket = {}
        item.clentip = [{
          ip: 'All',
          value: ''
        }]
        // clearInterval(item.zidongfasong)
        // item.zidongfasong = undefined
        item.id = index;
        await this.$store.dispatch("db_update", {
          kind: "nettool",
          doc: item,
        });
      }
    },
    computed: {
      selected_index: {
        get: function () {
          return this.$store.state.net_tool.select
        },
        set: function (v) {
          return this.$store.commit('net_tool/setSelect', v);
        },
      },
      _xylx: {
        get: function () {
          return this.$store.state.net_tool.items[this.selected_index].xylx;
        },
        set: function (v) {
          return this.$store.commit("net_tool/xylx", v);
        }
      },
      get_ip: {
        get: function () {
          return this.$store.state.net_tool.items[this.selected_index].ipdz;
        },
        set: function (v) {
          return this.$store.commit("net_tool/ipdz", v);
        }
      },
      zj_dz: {
        get: function () {
          return this.$store.state.net_tool.items[this.selected_index].zjdz;
        },
        set: function (v) {
          return this.$store.commit("net_tool/zjdz", v);
        }
      },
      d_k: {
        get: function () {
          return this.$store.state.net_tool.items[this.selected_index].dk;
        },
        set: function (v) {
          return this.$store.commit("net_tool/dk", v);
        }
      },
      _bind: {
        get: function () {
          return this.$store.state.net_tool.items[this.selected_index].bind;
        },
        set: function (v) {
          return this.$store.commit("net_tool/bind", v);
        }
      },
      jieshou_leixing: {
        get: function () {
          return this.$store.state.net_tool.items[this.selected_index].jieshouleixing;
        },
        set: function (v) {
          return this.$store.commit("net_tool/jieshouleixing", v);
        }
      },
      fasong_leixing: {
        get: function () {
          return this.$store.state.net_tool.items[this.selected_index].fasongleixing;
        },
        set: function (v) {
          return this.$store.commit("net_tool/fasongleixing", v);
        }
      },
      _rizhi: {
        get: function () {
          return this.$store.state.net_tool.items[this.selected_index].rizhi;
        },
        set: function (v) {
          return this.$store.commit("net_tool/rizhi", v);
        }
      },
      _huanhang: {
        get: function () {
          return this.$store.state.net_tool.items[this.selected_index].huanhang;
        },
        set: function (v) {
          return this.$store.commit("net_tool/huanhang", v);
        }
      },
      _jiexizhuanyifu: {
        get: function () {
          return this.$store.state.net_tool.items[this.selected_index].jiexizhuanyifu;
        },
        set: function (v) {
          return this.$store.commit("net_tool/jiexizhuanyifu", v);
        }
      },
      _zidonghuiche: {
        get: function () {
          return this.$store.state.net_tool.items[this.selected_index].zidonghuiche;
        },
        set: function (v) {
          return this.$store.commit("net_tool/zidonghuiche", v);
        }
      },
      _zdfasong: {
        get: function () {
          return this.$store.state.net_tool.items[this.selected_index].zdfasong;
        },
        set: function (v) {
          return this.$store.commit("net_tool/zdfasong", v);
        }
      },
      _zidong: {
        get: function () {
          return this.$store.state.net_tool.items[this.selected_index].zidong;
        },
        set: function (v) {
          return this.$store.commit("net_tool/zidong", v);
        }
      },
      _clentip: {
        get: function () {
          return this.$store.state.net_tool.items[this.selected_index].clentip;
        },
        set: function (v) {
          return this.$store.commit("net_tool/clentip", v);
        }
      },
      _changeip: {
        get: function () {
          return this.$store.state.net_tool.items[this.selected_index].changeip;
        },
        set: function (v) {
          return this.$store.commit("net_tool/changeip", v);
        }
      },
      _socket: {
        get: function () {
          return this.$store.state.net_tool.items[this.selected_index].socket;
        },
        set: function (v) {
          return this.$store.commit("net_tool/socket", v);
        }
      },
      _yczjip: {
        get: function () {
          return this.$store.state.net_tool.items[this.selected_index].yczjip;
        },
        set: function (v) {
          return this.$store.commit("net_tool/yczjip", v);
        }
      },
      _yczjdk: {
        get: function () {
          return this.$store.state.net_tool.items[this.selected_index].yczjdk;
        },
        set: function (v) {
          return this.$store.commit("net_tool/yczjdk", v);
        }
      },
      _ms: {
        get: function () {
          return this.$store.state.net_tool.items[this.selected_index].ms;
        },
        set: function (v) {
          return this.$store.commit("net_tool/ms", v);
        }
      },
      push_data: {
        get: function () {
          return this.$store.state.net_tool.items[this.selected_index].push;
        },
        set: function (v) {
          return this.$store.commit("net_tool/push", v)
        },
      },
      js_data: {
        get: function () {
          return this.$store.state.net_tool.items[this.selected_index].jsdata;
        },
        set: function (v) {
          // this.js_data = v; 
          return this.$store.commit("net_tool/jsdata", v)
        },
      },
    },
    watch: {
      selected_index: function (v) {

        this.load_data(v);
      }
    },
    data() {
      return {
        zidongfasong: undefined
      }
    },
    methods: {
      on_change(id, script) {
        this[id] = script
      },
      load_data(idx) {
        let o = this.$store.state.net_tool.items[idx];
        this._xylx = o.xylx;
        this.get_ip = o.ipdz;
        this.zj_dz = o.zjdz;
        this.d_k = o.dk;
        this._bind = o.bind;
        this.jieshou_leixing = o.jieshouleixing;
        this.fasong_leixing = o.fasongleixing;
        this._rizhi = o.rizhi;
        this._huanhang = o.huanhang;
        this._jiexizhuanyifu = o.jiexizhuanyifu;
        this._zidonghuiche = o.zidonghuiche;
        this._zdfasong = o.zdfasong;
        this._zidong = o.zidong;
        // this._zidongfasong = o.zidongfasong;
        this._clentip = o.clentip;
        this._changeip = o.changeip;
        this._socket = o.socket;
        this._yczjip = o.yczjip;
        this._ms = o.ms;
        this.push_data = o.push;
        this.js_data = o.jsdata;
      },
      on_select(data) {
        // this.closeServer(data)
        this.selected_index = data
      },



      udp() {
        var _this = this
        if (this._bind == false) {
          server = dgram.createSocket('udp4');
          try {
            server.bind({
              address: _this.zj_dz,
              port: _this.d_k,
              exclusive: true
            });
            server.on('listening', function () {
              console.log('服务已启动')
              _this._bind = true
            });
          } catch (error) {
            this.$store.commit("setMsgError", `${error}`);
          }
          server.on('error', () => {
            server.close();
          });
          server.on('message', (msg, rinfo) => {
            if (_this.jieshou_leixing == 1) {
              if (_this._rizhi == false && _this._huanhang == false) {
                let BuffMsg = Buffer.from(msg, 'hex')
                BuffMsg = encoding.convert(BuffMsg, "UTF8", "GBK").toString()
                //let BuffMsg  = msg.toString('ascii')
                _this.js_data = _this.js_data + `${BuffMsg}`
              } else if (_this._rizhi == true && _this._huanhang == false) {
                let BuffMsg = Buffer.from(msg, 'hex')
                BuffMsg = encoding.convert(BuffMsg, "UTF8", "GBK").toString()
                //let BuffMsg  = msg.toString('ascii')
                _this.js_data = _this.js_data + `\n 收到来自: ${rinfo.address}:${rinfo.port}\n ${BuffMsg}`
              }
              if (_this._rizhi == false && _this._huanhang == true) {
                let BuffMsg = Buffer.from(msg, 'hex')
                BuffMsg = encoding.convert(BuffMsg, "UTF8", "GBK").toString()
                //let BuffMsg  = msg.toString('ascii')
                _this.js_data = _this.js_data + `\n ${BuffMsg}`
              } else if (_this._rizhi == true && _this._huanhang == true) {
                let BuffMsg = Buffer.from(msg, 'hex')
                BuffMsg = encoding.convert(BuffMsg, "UTF8", "GBK").toString()
                //let BuffMsg  = msg.toString('ascii')
                _this.js_data = _this.js_data + `\n 收到来自: ${rinfo.address}:${rinfo.port}\n ${BuffMsg}`
              }
            } else if (_this.jieshou_leixing == 2) {
              if (_this._rizhi == false && _this._huanhang == false) {
                let BuffMsg = msg.toString('hex')
                _this.js_data = _this.js_data + `${BuffMsg}`
              } else if (_this._rizhi == true && _this._huanhang == false) {
                let BuffMsg = msg.toString('hex')
                _this.js_data = _this.js_data + `\n 收到来自: ${rinfo.address}:${rinfo.port}\n ${BuffMsg}`
              }
              if (_this._rizhi == false && _this._huanhang == true) {
                let BuffMsg = msg.toString('hex')
                _this.js_data = _this.js_data + `\n ${BuffMsg}`
              } else if (_this._rizhi == true && _this._huanhang == true) {
                let BuffMsg = msg.toString('hex')
                _this.js_data = _this.js_data + `\n 收到来自: ${rinfo.address}:${rinfo.port}\n ${BuffMsg}`
              }
            }
          });
        } else {
          server.on('close', () => {
            console.log('socket 已关闭');
            _this._bind = false
            _this._zidong = false
            clearInterval(_this.zidongfasong)
            _this.zidongfasong = undefined
          })
          server.close();
        }
      },

      client() {
        var _this = this
        if (this._bind == false) {
          tcpClient = new net.Socket();
          try {
            var options = {
              host: _this.zj_dz,
              port: _this.d_k
            }
            tcpClient.connect(options, function () {

              console.log('connected to Server');
              tcpClient.write('hello server');
              _this._bind = true
            })
          } catch (error) {
            this.$store.commit("setMsgError", `${error}`);
            tcpClient.destroy()

          }
          tcpClient.on('data', function (data) {
            if (_this.jieshou_leixing == 1) {
              if (_this._rizhi == false && _this._huanhang == false) {
                let BuffMsg = Buffer.from(data, 'hex')
                BuffMsg = encoding.convert(BuffMsg, "UTF8", "GBK").toString()
                //let BuffMsg  = msg.toString('ascii')
                _this.js_data = _this.js_data + `${BuffMsg}`
              } else if (_this._rizhi == true && _this._huanhang == false) {
                let BuffMsg = Buffer.from(data, 'hex')
                BuffMsg = encoding.convert(BuffMsg, "UTF8", "GBK").toString()
                //let BuffMsg  = msg.toString('ascii')
                _this.js_data = _this.js_data + `\n 收到 : \n ${BuffMsg}`
              }
              if (_this._rizhi == false && _this._huanhang == true) {
                let BuffMsg = Buffer.from(data, 'hex')
                BuffMsg = encoding.convert(BuffMsg, "UTF8", "GBK").toString()
                //let BuffMsg  = msg.toString('ascii')
                _this.js_data = _this.js_data + `\n ${BuffMsg}`
              } else if (_this._rizhi == true && _this._huanhang == true) {
                let BuffMsg = Buffer.from(data, 'hex')
                BuffMsg = encoding.convert(BuffMsg, "UTF8", "GBK").toString()
                //let BuffMsg  = msg.toString('ascii')
                _this.js_data = _this.js_data + `\n 收到 : \n ${BuffMsg}`
              }
            } else if (_this.jieshou_leixing == 2) {
              if (_this._rizhi == false && _this._huanhang == false) {
                let BuffMsg = data.toString('hex')
                _this.js_data = _this.js_data + `${BuffMsg}`
              } else if (_this._rizhi == true && _this._huanhang == false) {
                let BuffMsg = data.toString('hex')
                _this.js_data = _this.js_data + `\n 收到 : \n ${BuffMsg}`
              }
              if (_this._rizhi == false && _this._huanhang == true) {
                let BuffMsg = data.toString('hex')
                _this.js_data = _this.js_data + `\n ${BuffMsg}`
              } else if (_this._rizhi == true && _this._huanhang == true) {
                let BuffMsg = data.toString('hex')
                _this.js_data = _this.js_data + `\n 收到 : \n ${BuffMsg}`
              }
            }
          })
          tcpClient.on('error', function (err) {
            tcpClient.destroy();
            _this._bind = false

          })
        } else {
          tcpClient.on('close', function () {

            tcpClient.destroy();

            _this._bind = false
          })
          tcpClient.destroy(function () {
            _this._bind = false

          });
        }
      },

      Server() {
        var _this = this
        if (this._bind == false) {
          tcpServer = net.createServer();
          try {
            tcpServer.listen({
              host: _this.zj_dz,
              port: _this.d_k,
              exclusive: true
            }, function () {});
            _this._bind = true
          } catch (error) {
            // this.$store.commit("setMsgError", 'ip地址或端口号不正确');
            this.$store.commit("setMsgError", `${error}`);
          }
          // 处理客户端连接
          tcpServer.on('connection', function (socket) {
            console.log(_this._socket)
            _this._socket[socket.remotePort] = socket;
            _this._clentip = [{
              ip: 'All',
              value: ''
            }]
            for (var i in _this._socket) {
              _this._clentip.push({
                ip: `${_this._socket[i].remoteAddress}:${_this._socket[i].remotePort}`,
                value: i
              })
            }
            socket.on('data', function (data) {
              if (_this.jieshou_leixing == 1) {
                if (_this._rizhi == false && _this._huanhang == false) {
                  let BuffMsg = Buffer.from(data, 'hex')
                  BuffMsg = encoding.convert(BuffMsg, "UTF8", "GBK").toString()
                  //let BuffMsg  = msg.toString('ascii')
                  _this.js_data = _this.js_data + `${BuffMsg}`
                } else if (_this._rizhi == true && _this._huanhang == false) {
                  let BuffMsg = Buffer.from(data, 'hex')
                  BuffMsg = encoding.convert(BuffMsg, "UTF8", "GBK").toString()
                  //let BuffMsg  = msg.toString('ascii')
                  _this.js_data = _this.js_data +
                    `\n 收到: ${socket.remoteAddress}:${socket.remotePort} \n ${BuffMsg}`
                }
                if (_this._rizhi == false && _this._huanhang == true) {
                  let BuffMsg = Buffer.from(data, 'hex')
                  BuffMsg = encoding.convert(BuffMsg, "UTF8", "GBK").toString()
                  //let BuffMsg  = msg.toString('ascii')
                  _this.js_data = _this.js_data + `\n ${BuffMsg}`
                } else if (_this._rizhi == true && _this._huanhang == true) {
                  let BuffMsg = Buffer.from(data, 'hex')
                  BuffMsg = encoding.convert(BuffMsg, "UTF8", "GBK").toString()
                  //let BuffMsg  = msg.toString('ascii')
                  _this.js_data = _this.js_data +
                    `\n 收到: ${socket.remoteAddress}:${socket.remotePort} \n ${BuffMsg}`
                }
              } else if (_this.jieshou_leixing == 2) {

                if (_this._rizhi == false && _this._huanhang == false) {
                  let BuffMsg = data.toString('hex')
                  _this.js_data = _this.js_data +
                    `${BuffMsg}`
                } else if (_this._rizhi == true && _this._huanhang == false) {
                  let BuffMsg = data.toString('hex')
                  _this.js_data = _this.js_data +
                    `\n 收到: ${socket.remoteAddress}:${socket.remotePort} \n ${BuffMsg}`
                }
                if (_this._rizhi == false && _this._huanhang == true) {
                  let BuffMsg = data.toString('hex')
                  _this.js_data = _this.js_data +
                    `\n ${BuffMsg}`
                } else if (_this._rizhi == true && _this._huanhang == true) {
                  let BuffMsg = data.toString('hex')
                  _this.js_data = _this.js_data +
                    `\n 收到: ${socket.remoteAddress}:${socket.remotePort} \n ${BuffMsg}`
                }
              }
            })
            socket.on('close', function () { //这里防止连接出错，使用close而非end
              delete _this._socket[socket.remotePort]
              _this._clentip = [{
                ip: 'All',
                value: ''
              }]
              for (var i in _this._socket) {
                _this._clentip.push({
                  ip: `${_this._socket[i].remoteAddress}:${_this._socket[i].remotePort}`,
                  value: i
                })
              }
            });
            socket.on('error', function (err) {
              console.log('与客户端通信或链接过程中发生了一个错误，错误代码为：%s', err.code);
              //当发生错误时，用destroy方法销毁该socket端口。确保不会再被利用
              socket.destroy();
            })
          })
          tcpServer.on('error', function () {
            tcpServer.close(function () {
              _this._bind = false
            })
          })
        } else {
          for (var i in this._socket) {
            this._socket[i].destroy(function () {});
          }
          tcpServer.close(function () {
            console.log('关闭服务')

            tcpServer.unref();
            _this._bind = false

            _this._socket = {}
          })
        }
      },
      click() {
        if (this._xylx == 'UDP') {
          this.udp()
        } else if (this._xylx == 'TCP Client') {
          this.client()
        } else if (this._xylx == 'TCP Server') {
          this.Server()
        }
      },



      fsudp() {
        var _this = this
        server.on('error', function () {})
        // 发送消息
        var SendBuff
        if (this.fasong_leixing == 1) {
          SendBuff = encoding.convert(this.push_data, "GBK")
          // SendBuff = Buffer.from(this.push_data, 'ascii')
        } else {
          SendBuff = Buffer.from(this.push_data.replace(/\s*/g, ""), 'hex')
        }
        if (SendBuff != "") {
          if (this._zdfasong == false) {
            var SendLen = SendBuff.length;
            try {
              server.send(SendBuff, 0, SendLen, this._yczjdk, this._yczjip, function () {
                if (_this.js_data == "") {
                  if (_this._rizhi == true) {
                    _this.js_data = ` 发送至: ${_this._yczjip}:${_this._yczjdk} \n ${_this.push_data} \n`
                  }
                } else {
                  if (_this._rizhi == true) {
                    _this.js_data = _this.js_data +
                      `\n 发送至: ${_this._yczjip}:${_this._yczjdk} \n ${_this.push_data} \n`
                  }
                }
              });
            } catch (error) {
              this.$store.commit("setMsgError", 'ip地址或端口号不正确');
            }
          } else {
            try {
              _this.zidongfasong = setInterval(function () {
                _this._zidong = true
                var SendLen = SendBuff.length;
                server.send(SendBuff, 0, SendLen, _this._yczjdk, _this._yczjip, function () {
                  if (_this.js_data == "") {
                    if (_this._rizhi == true) {
                      _this.js_data = ` 发送至: ${_this._yczjip}:${_this._yczjdk} \n ${_this.push_data} \n`
                    }
                  } else {
                    if (_this._rizhi == true) {
                      _this.js_data = _this.js_data +
                        `\n 发送至: ${_this._yczjip}:${_this._yczjdk} \n ${_this.push_data} \n`
                    }
                  }
                });
              }, _this._ms);
            } catch (error) {
              this.$store.commit("setMsgError", `${error}`);
            }
          }
        } else {
          this.$store.commit("setMsgError", '无法发送空数据');
        }
      },




      fsclient() {
        var _this = this
        let SendBuff
        if (this.fasong_leixing == 1) {
          SendBuff = encoding.convert(this.push_data, "GBK")
          // SendBuff = Buffer.from(this.push_data, 'ascii')
        } else {
          SendBuff = Buffer.from(this.push_data.replace(/\s*/g, ""), 'hex')
        }
        if (SendBuff != "") {
          if (this._zdfasong == false) {
            try {
              tcpClient.write(SendBuff);
              if (_this._rizhi == true) {
                _this.js_data = _this.js_data + `\n 发送:\n ${_this.push_data} \n`
              }
            } catch (error) {
              this.$store.commit("setMsgError", 'ip地址或端口号不正确');
            }
          } else {
            try {
              _this.zidongfasong = setInterval(function () {
                _this._zidong = true
                tcpClient.write(SendBuff);
                if (_this._rizhi == true) {
                  _this.js_data = _this.js_data + `\n 发送:\n ${_this.push_data} \n`
                }
              }, _this._ms);
            } catch (error) {
              this.$store.commit("setMsgError", `${error}`);
            }
          }
        } else {
          this.$store.commit("setMsgError", '无法发送空数据');
        }
      },



      fsserver() {
        var _this = this
        let SendBuff
        try {
          if (this.fasong_leixing == 1) {
            SendBuff = encoding.convert(this.push_data, "GBK")
            // SendBuff = Buffer.from(this.push_data, 'ascii')
          } else {
            SendBuff = Buffer.from(this.push_data.replace(/\s*/g, ""), 'hex')
          }
          if (SendBuff != "") {
            if (this._zdfasong == false) {
              if (this._changeip === '') {
                if (this._clentip.length == 1) {
                  this.$store.commit("setMsgError", '未连接客户端');
                } else {
                  try {
                    for (var i in this._socket) {
                      this._socket[i].write(SendBuff);
                      if (_this._rizhi == true) {
                        _this.js_data = _this.js_data + `\n 发送:\n ${_this.push_data} \n`
                      }
                    }
                  } catch (error) {
                    this.$store.commit("setMsgError", `${error}`);
                  }
                }
              } else {
                try {
                  this._socket[this._changeip].write(SendBuff);
                  if (_this._rizhi == true) {
                    _this.js_data = _this.js_data + `\n 发送:\n ${_this.push_data} \n`
                  }
                } catch (error) {
                  this.$store.commit("setMsgError", `${error}`);
                }
              }
            } else {
              if (this._changeip === '') {
                if (this._clentip.length == 1) {
                  this.$store.commit("setMsgError", '未连接客户端');
                } else {
                  try {
                    _this.zidongfasong = setInterval(function () {
                      _this._zidong = true
                      for (var i in _this._socket) {
                        _this._socket[i].write(SendBuff);
                        if (_this._rizhi == true) {
                          _this.js_data = _this.js_data + `\n 发送:\n ${_this.push_data} \n`
                        }
                      }
                    }, _this._ms);
                  } catch (error) {
                    this.$store.commit("setMsgError", `${error}`);
                  }
                }
              } else {
                try {
                  _this.zidongfasong = setInterval(function () {
                    _this._zidong = true
                    _this._socket[_this._changeip].write(SendBuff);
                    if (_this._rizhi == true) {
                      _this.js_data = _this.js_data + `\n 发送:\n ${_this.push_data}`
                    }
                  }, _this._ms);
                } catch (error) {
                  this.$store.commit("setMsgError", `${error}`);
                }
              }
            }
          } else {
            this.$store.commit("setMsgError", '无法发送空数据');
          }
        } catch (error) {
          this.$store.commit("setMsgError", `${error}`);
        }
      },
      fasong() {
        if (this._zdfasong == true && this.zidongfasong != undefined) {
          this._zidong = false
          clearInterval(this.zidongfasong)
          this.zidongfasong = undefined
        } else {
          if (this._xylx == 'UDP') {
            // 发生异常触发
            this.fsudp()
          } else if (this._xylx == 'TCP Client') {
            this.fsclient()
          } else if (this._xylx == 'TCP Server') {
            this.fsserver()
          }
        }
      },
      closeSetInitval: function (item) {
        if (item == false) {
          this._zidong = false
          clearInterval(this.zidongfasong)
          this.zidongfasong = undefined
        }
      },
      closefs: function () {
        this.push_data = ""
      },
      closejs: function () {
        this.js_data = ""
      },
      changefasongleixing: function (e) {
        if (this.push_data != '') {
          if (e == 2) {
            let SendBuff = encoding.convert(this.push_data, "GBK")
            this.push_data = SendBuff.toString('hex')
          } else if (e == 1) {
            let SendBuff = Buffer.from(this.push_data.replace(/\s*/g, ""), 'hex')
            SendBuff = Buffer.from(SendBuff, 'hex')
            this.push_data = encoding.convert(SendBuff, "UTF8", "GBK").toString()
          }
        }
      }
    }
  }
</script>