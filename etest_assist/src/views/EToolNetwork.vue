<template>
  <div>
    <div style="width:100%;height:48px;">
      <e-top-tab :selected_index="selected_index" @select="on_select"></e-top-tab>
    </div>
    <div style="width:100%;height: calc(100vh - 80px);">
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
                <v-select :disabled="_bind" class="my-0" v-model="zj_dz"
                  :label="_xylx=='TCP Client'?'(2)远程主机地址':'(2)本地主机地址'" dense attach :items="get_ip">
                </v-select>
                <v-text-field :disabled="_bind" class="my-0" v-model="d_k" attach dense
                  :label="_xylx=='TCP Client'?'(3)远程主机端口':'(3)本地主机端口'"></v-text-field>
                <div style="text-align:center;">
                  <v-btn block small @click="click">
                    <v-icon left :color="_bind==true?'red':undefined">mdi-lightbulb</v-icon>
                    {{this._bind==false?'打开':'关闭'}}
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
                <v-checkbox style="height:15px" v-model="_jiexizhuanyifu" :label="`自动解析转义符`">
                </v-checkbox>
                <v-checkbox style="height:15px" v-model="_zidonghuiche" :label="`AT指令自动回车`">
                </v-checkbox>

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
                      <v-select class="my-0" v-model="_changeip" :label="'客户端'+_clentip.length" :items="_clentip"
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
  import EScriptEditor from "../components/widgets/EDataFormatEditor";
  import ETopTab from "../components/ETopTabs";

  var dgram = window.require('dgram');
  var server
  var encoding = require('encoding')
  var net = window.require('net');
  var tcp_server
  var Sockets = {};
  var tcp_client
  export default {
    components: {
      "e-script-editor": EScriptEditor,
      "e-top-tab": ETopTab,
    },

    beforeMount() {
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
    // mounted: async function () {
    //   let db_items = await this.$store.dispatch("db_list", {
    //     kind: "nettool",
    //   });
    //   if (db_items) {
    //     let len = db_items.length;
    //     for (let index = 0; index < len; index++) {
    //       this.$store.commit("net_tool/setItem", {
    //         index: index,
    //         value: db_items[index],
    //       });
    //     }
    //   }
    //   this.load_data(this.selected_index)
    // },
    beforeDestroy: async function () {
      if (this._xylx === 'UDP') {
        server.on('close', () => {
          console.log('socket 已关闭');
        })
        server.close();
      } else if (this._xylx === 'TCP Client') {
        tcp_client.on('close', function () {
          console.log('else close  111111')
          tcp_client.destroy();
        })
        tcp_client.destroy(function () {});
      } else if (this._xylx === 'TCP Server') {
        for (var i in Sockets) {
          Sockets[i].destroy(function () {
            tcp_server.close(function () {
              console.log('server  close')
            })
          });
        }
        tcp_server.close(function () {
          console.log('server  close')
        })
      }
      let state_items = this.$store.state.net_tool.items;
      let len = state_items.length;
      for (let index = 0; index < len; index++) {
        let item = state_items[index];
        item.bind = false
        item.zidong = false
        clearInterval(item.zidongfasong)
        item.zidongfasong = undefined
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
          console.log(v)
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
      // _baocun: {
      //   get: function () {
      //     return this.$store.state.net_tool.items[this.selected_index].baocun;
      //   },
      //   set: function (v) {
      //     return this.$store.commit("net_tool/baocun", v);
      //   }
      // },
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
      _zidongfasong: {
        get: function () {
          return this.$store.state.net_tool.items[this.selected_index].zidongfasong;
        },
        set: function (v) {
          return this.$store.commit("net_tool/zidongfasong", v);
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
      }
    },
    watch: {
      selected_index: function (v) {

        this.load_data(v);
      }
    },
    data() {
      return {}
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
        // this._baocun = o.baocun;
        this._zdfasong = o.zdfasong;
        this._zidong = o.zidong;
        this._zidongfasong = o.zidongfasong;
        this._clentip = o.clentip;
        this._changeip = o.changeip;
        this._socket = o.socket;
        this._yczjip = o.yczjip;
        this._ms = o.ms;
        this.push_data = o.push;
        this.js_data = o.jsdata;
      },
      on_select(data) {
        this.closeServer(data)
        // _this.selected_index = data;
      },
      closeServer(data) {
        let _this = this
        if (this._bind === true) {
          if (this._xylx === 'UDP') {
            server.on('close', () => {
              console.log('socket 已关闭');
              _this._bind = false
              _this._zidong = false
              clearInterval(_this._zidongfasong)
              _this._zidongfasong = undefined
              _this.selected_index = data
            })
            server.close();
          } else if (this._xylx === 'TCP Client') {
            tcp_client.on('close', function () {
              console.log('else close  111111')
              tcp_client.destroy();
              _this._bind = false
              _this._zidong = false
              clearInterval(_this._zidongfasong)
              _this._zidongfasong = undefined
              _this.selected_index = data

            })
            tcp_client.destroy(function () {
              _this._bind = false
              _this._zidong = false
              clearInterval(_this._zidongfasong)
              _this._zidongfasong = undefined
              _this.selected_index = data
            });
          } else if (this._xylx === 'TCP Server') {
            for (var i in Sockets) {
              Sockets[i].destroy(function () {
                tcp_server.close(function () {
                  console.log('server  close')
                  _this._bind = false
                  _this._zidong = false
                  clearInterval(_this._zidongfasong)
                  _this._zidongfasong = undefined
                  _this.selected_index = data
                })
              });
            }
            tcp_server.close(function () {
              console.log('server  close')
              _this._bind = false
              _this._zidong = false
              clearInterval(_this._zidongfasong)
              _this._zidongfasong = undefined
              _this.selected_index = data
            })
            this._bind = false
            this._zidong = false
            clearInterval(this._zidongfasong)
            this._zidongfasong = undefined
          }
        } else {
          this.selected_index = data
        }
      },
      click() {
        var _this = this
        if (this._xylx == 'UDP') {
          if (this._bind == false) {

            server = dgram.createSocket('udp4');
            server.bind({
              address: _this.zj_dz,
              port: _this.d_k,
              exclusive: true
            });
            server.on('error', () => {
              server.close();
            });
            server.on('listening', function () {
              console.log('服务已启动')
              console.log(_this._bind)
              _this._bind = true
            });
            server.on('message', (msg, rinfo) => {
              console.log(msg)
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
              clearInterval(_this._zidongfasong)
              _this._zidongfasong = undefined
            })
            server.close();

          }
        } else if (this._xylx == 'TCP Client') {
          if (this._bind == false) {
            tcp_client = new net.Socket();
            var options = {
              host: _this.zj_dz,
              port: _this.d_k
            }
            // 连接 tcp server
            tcp_client.connect(options, function () {
              console.log('connected to Server');
              tcp_client.write('hello server');
              _this._bind = true
            })
            // 接收数据
            tcp_client.on('data', function (data) {
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
                  console.log(BuffMsg)
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
            tcp_client.on('error', function (err) {
              console.log('在于服务器连接或通信过程中发生了一个错误，错误代码为%s', err.code);
              //当发生错误时，用destroy方法销毁该socket端口。确保不会再被利用
              tcp_client.destroy();
              _this._bind = false
            })
          } else {
            tcp_client.on('close', function () {
              console.log('else close  111111')
              tcp_client.destroy();
              _this._bind = false
            })
            tcp_client.destroy(function () {
              _this._bind = false
            });
          }
        } else if (this._xylx == 'TCP Server') {
          if (this._bind == false) {
            this._bind = true
            tcp_server = net.createServer();
            tcp_server.listen({
              host: _this.zj_dz,
              port: _this.d_k,
              exclusive: true
            }, function () {});

            // 处理客户端连接
            tcp_server.on('connection', function (socket) {
              Sockets[socket.remotePort] = socket;
              _this._socket = Sockets
              _this._clentip = []
              for (var i in Sockets) {
                _this._clentip.push({
                  ip: `${Sockets[i].remoteAddress}:${Sockets[i].remotePort}`,
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
                delete Sockets[socket.remotePort]
                _this._clentip = []
                for (var i in Sockets) {
                  _this._clentip.push({
                    ip: `${Sockets[i].remoteAddress}:${Sockets[i].remotePort}`,
                    value: i
                  })
                }
              });
              socket.on('error', function (err) {
                console.log('与客户端通信或链接过程中发生了一个错误，错误代码为：%s', err.code);
                //当发生错误时，用destroy方法销毁该socket端口。确保不会再被利用
                socket.destroy();
              })
              // socket.on('end', ()=>{
              //     tcp_server.close();
              //  });
            })
            tcp_server.on('error', function () {
              tcp_server.close(function () {
                _this._bind = false
              })
            })

          } else {
            for (var i in Sockets) {
              Sockets[i].destroy(function () {
                tcp_server.close(function () {
                  console.log('server  close')
                  _this._bind = false
                })
              });
            }
            tcp_server.close(function () {
              console.log('server  close')
              _this._bind = false
            })
            this._bind = false
          }
        }
      },
      fasong() {
        var _this = this
        if (this._zdfasong == true && this._zidongfasong != undefined) {
          this._zidong = false
          clearInterval(this._zidongfasong)
          this._zidongfasong = undefined
        } else {
          if (this._xylx == 'UDP') {
            // 发生异常触发
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
              } else {
                this._zidongfasong = setInterval(function () {
                  _this._zidong = true
                  var SendLen = SendBuff.length;
                  server.send(SendBuff, 0, SendLen, _this._yczjdk, _this._yczjip, function () {
                    // console.log('数据发送成功')
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
              }
            } else {
              console.log('无法发送空数据')
            }
          } else if (this._xylx == 'TCP Client') {
            let SendBuff
            if (this.fasong_leixing == 1) {
              SendBuff = encoding.convert(this.push_data, "GBK")
              // SendBuff = Buffer.from(this.push_data, 'ascii')
            } else {
              SendBuff = Buffer.from(this.push_data.replace(/\s*/g, ""), 'hex')
            }
            if (SendBuff != "") {
              if (this._zdfasong == false) {
                tcp_client.write(SendBuff);
                if (_this._rizhi == true) {
                  _this.js_data = _this.js_data + `\n 发送:\n ${_this.push_data} \n`
                }
              } else {
                this._zidongfasong = setInterval(function () {
                  _this._zidong = true
                  tcp_client.write(SendBuff);
                  if (_this._rizhi == true) {
                    _this.js_data = _this.js_data + `\n 发送:\n ${_this.push_data} \n`
                  }
                }, _this._ms);
              }
            } else {
              console.log('无法发送空数据')
            }
          } else if (this._xylx == 'TCP Server') {
            let SendBuff
            if (this.fasong_leixing == 1) {
              SendBuff = encoding.convert(this.push_data, "GBK")
              // SendBuff = Buffer.from(this.push_data, 'ascii')
            } else {
              SendBuff = Buffer.from(this.push_data.replace(/\s*/g, ""), 'hex')
            }
            if (SendBuff != "") {
              if (this._zdfasong == false) {
                this._socket[this._changeip].write(SendBuff);
                if (_this._rizhi == true) {
                  _this.js_data = _this.js_data + `\n 发送:\n ${_this.push_data} \n`
                }
              } else {
                this._zidongfasong = setInterval(function () {
                  _this._zidong = true
                  this._socket[this._changeip].write(SendBuff);
                  if (_this._rizhi == true) {
                    _this.js_data = _this.js_data + `\n 发送:\n ${_this.push_data}`
                  }
                }, _this._ms);
              }
            } else {
              console.log('无法发送空数据')
            }
          }
        }
      },
      closeSetInitval: function (item) {
        if (item == false) {
          this._zidong = false
          clearInterval(this._zidongfasong)
          this._zidongfasong = undefined
        }
      },
      closefs: function () {
        this.push.push_data_data = ""
      },
      closejs: function () {
        this.js_data = ""
      },
      changefasongleixing: function (e) {
        console.log(this.push_data)
        if (this.push_data != '') {
          if (e == 2) {
            let SendBuff = encoding.convert(this.push_data, "GBK")
            console.log(SendBuff)
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