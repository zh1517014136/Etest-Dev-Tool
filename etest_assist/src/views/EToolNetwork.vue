<template>
  <div style="width:100%;height: calc(100vh - 32px);">
    <v-card height="100%" width="100%" style="min-height:698px;" tile>
      <div style="display:flex; flex-wrap: nowrap;height:100%">
        <div class="py-2 pl-4 pr-2" style="height:100%;width:25%;min-width:300px;min-height:698px">
          <div style="width:100%;height:30%;min-width:250px;  min-height:220px;">
            <v-card tile :elevation="0" style="width:100%; height:100%;">
              <v-subheader style="height:26px">网络设置</v-subheader>
              <v-divider></v-divider>
              <v-select :disabled="bind" class="mb-0 mt-4" v-model="xylx" label="(1)协议类型" dense attach
                :items="['UDP','TCP Client','TCP Server']">
              </v-select>
              <v-select :disabled="bind" class="my-0" v-model="zjdz" :label="xylx=='TCP Client'?'(2)远程主机地址':'(2)本地主机地址'"
                dense attach :items="ipdz">
              </v-select>
              <v-text-field :disabled="bind" class="my-0" v-model="dk" attach dense
                :label="xylx=='TCP Client'?'(3)远程主机端口':'(3)本地主机端口'"></v-text-field>
              <div style="text-align:center;">
                <v-btn block small @click="click">
                  <v-icon left :color="bind==true?'red':undefined">mdi-lightbulb</v-icon>{{this.bind==false?'打开':'关闭'}}
                </v-btn>
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
              <v-radio-group style="height:15px" v-model="row1" @change="changeRow1" row>
                <v-radio style="height:15px" label="ASCII" :value="1"></v-radio>
                <v-radio style="height:15px" label="HEX" :value="2"></v-radio>
              </v-radio-group>
              <v-checkbox style="height:15px" v-model="checkbox4" :label="`自动解析转义符`">
              </v-checkbox>
              <v-checkbox style="height:15px" v-model="checkbox5" :label="`AT指令自动回车`">
              </v-checkbox>

              <!-- <v-checkbox style="height:15px" v-model="checkbox7" :label="`打开文件数据源`">
              </v-checkbox> -->
              <v-row class="px-3" align="center">
                <v-checkbox v-model="checkbox8" @change="closeSetInitval" :label="`循环周期:`" hide-details
                  class="shrink mr-2 mt-0"></v-checkbox>
                <v-text-field style="width:80px;" v-model="ms" :disabled="!checkbox8"></v-text-field>ms
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
                style="height: calc(72vh - 52px);min-height:470px;">
                <e-script-editor id="js_data" :script="jsdata" type="jsdata" @change="on_change" />
              </v-sheet>
            </v-card>
          </div>
          <div class="mt-2" style="background-color:red;width:100%;height:25%;min-width:500px">
            <v-card tile :elevation="0" style="width:100%; height:100%;">
              <v-row class="py-0">
                <v-col class="pa-0" cols="2">
                  <v-subheader style="height:44px">数据发送</v-subheader>
                </v-col>
                <v-col v-if="this.xylx == 'UDP'" class="pa-0" cols="6">

                  <v-row v-if="bind == true" class="py-0">
                    <v-col class="pa-0" cols="6">
                      <v-text-field class="my-0" v-model="yczjip" attach dense label="远程主机IP地址">
                      </v-text-field>
                    </v-col>
                    <v-col class="pa-0" cols="6">
                      <v-text-field class="my-0" v-model="yczjdk" attach dense label="远程主机端口号">
                      </v-text-field>
                    </v-col>
                  </v-row>

                </v-col>
                <v-col v-else-if="this.xylx == 'TCP Server'" class="pa-0" cols="6">
                  <v-row v-if="bind == true" class="py-0">
                    <v-select class="my-0" v-model="changeip" :label="'客户端'+clentip.length" :items="clentip"
                      item-text="ip" item-value="value" dense attach>
                    </v-select>
                  </v-row>
                </v-col>
                <v-col class="pa-0 ml-6" cols="3">
                  <v-row v-if="bind == true" class="py-0">
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
                  <v-sheet width="100%" class="pa-0 ma-0 mb-1" @keydown.stop style="height: calc(9vh);min-height:65px;">
                    <e-script-editor id="push_data" :script="push" type="push" @change="on_change" />
                  </v-sheet>
                </v-col>
                <v-col class="pa-0  pr-3" cols="2">
                  <v-btn class="ma-0 px-0 " style="height:calc(9vh);min-height:60px;" block @click="fasong"
                    :disabled="!bind" outlined>{{this.zidong==false?'发送':'停止发送'}}
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
  var dgram = window.require('dgram');
  var server = dgram.createSocket('udp4');
  var encoding = require('encoding')
  var net = window.require('net');
  var tcp_server = net.createServer();
  var Sockets = {};
  var SocketID = 1;
  var tcp_client = net.Socket();
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
      } catch (error) {
        console.log(error)
      }
    },
    computed: {
      push_data: {
        get: function () {

        },
        set: function (v) {

          this.push = v;
        },
      },
      js_data: {
        get: function () {

        },
        set: function (v) {

          this.jsdata = v;
        },
      }
    },

    data() {
      return {
        bind: false,
        ms: 1000,
        dk: 8080,
        yczjip: '192.168.10.154',
        yczjdk: 8080,
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
        zidong: false,
        zidongfasong: undefined,
        clentip: [],
        changeip: '',
        socket: undefined,
      }
    },
    methods: {
      on_change(id, script) {
        this[id] = script
      },
      click() {
        var _this = this
        if (this.xylx == 'UDP') {
          if (this.bind == false) {
            server.bind({
              address: _this.zjdz,
              port: _this.dk,
              exclusive: true
            });
            server.on('error', () => {
              server.close();
            });
            server.on('listening', () => {

            });
            server.on('message', (msg, rinfo) => {
              if (_this.row == 1) {
                if (this.checkbox1 == false && this.checkbox2 == false) {
                  var BuffMsg = Buffer.from(msg, 'hex')
                  BuffMsg = encoding.convert(BuffMsg, "UTF8", "GBK").toString()
                  //let BuffMsg  = msg.toString('ascii')
                  _this.jsdata = _this.jsdata + `${BuffMsg}`
                } else if (this.checkbox1 == true && this.checkbox2 == false) {
                  var BuffMsg = Buffer.from(msg, 'hex')
                  BuffMsg = encoding.convert(BuffMsg, "UTF8", "GBK").toString()
                  //let BuffMsg  = msg.toString('ascii')
                  _this.jsdata = _this.jsdata + `\n 收到来自: ${rinfo.address}:${rinfo.port}\n ${BuffMsg}`
                }
                if (this.checkbox1 == false && this.checkbox2 == true) {
                  var BuffMsg = Buffer.from(msg, 'hex')
                  BuffMsg = encoding.convert(BuffMsg, "UTF8", "GBK").toString()
                  //let BuffMsg  = msg.toString('ascii')
                  _this.jsdata = _this.jsdata + `\n ${BuffMsg}`
                } else if (this.checkbox1 == true && this.checkbox2 == true) {
                  var BuffMsg = Buffer.from(msg, 'hex')
                  BuffMsg = encoding.convert(BuffMsg, "UTF8", "GBK").toString()
                  //let BuffMsg  = msg.toString('ascii')
                  _this.jsdata = _this.jsdata + `\n 收到来自: ${rinfo.address}:${rinfo.port}\n ${BuffMsg}`
                }

              } else if (_this.row == 2) {
                if (this.checkbox1 == false && this.checkbox2 == false) {
                  let BuffMsg = msg.toString('hex')
                  _this.jsdata = _this.jsdata + `${BuffMsg}`
                } else if (this.checkbox1 == true && this.checkbox2 == false) {
                  let BuffMsg = msg.toString('hex')
                  _this.jsdata = _this.jsdata + `\n 收到来自: ${rinfo.address}:${rinfo.port}\n ${BuffMsg}`
                }
                if (this.checkbox1 == false && this.checkbox2 == true) {
                  let BuffMsg = msg.toString('hex')
                  _this.jsdata = _this.jsdata + `\n ${BuffMsg}`
                } else if (this.checkbox1 == true && this.checkbox2 == true) {
                  let BuffMsg = msg.toString('hex')
                  _this.jsdata = _this.jsdata + `\n 收到来自: ${rinfo.address}:${rinfo.port}\n ${BuffMsg}`
                }
              }
            });
            this.bind = true
          } else {
            server.close(function () {
              console.log('关闭服务')
            });
            this.bind = false
            this.zidong = false
            clearInterval(this.zidongfasong)
            this.zidongfasong = undefined
          }
        } else if (this.xylx == 'TCP Client') {
          if (this.bind == false) {
            var options = {
              host: this.zjdz,
              port: this.dk
            }
            // 连接 tcp server
            tcp_client.connect(options, function () {
              console.log('connected to Server');
              tcp_client.write('hello server');
              _this.bind = true
            })
            // 接收数据
            tcp_client.on('data', function (data) {
              if (_this.row == 1) {
                if (this.checkbox1 == false && this.checkbox2 == false) {
                  var BuffMsg = Buffer.from(data, 'hex')
                  BuffMsg = encoding.convert(BuffMsg, "UTF8", "GBK").toString()
                  //let BuffMsg  = msg.toString('ascii')
                  _this.jsdata = _this.jsdata + `${BuffMsg}`
                } else if (this.checkbox1 == true && this.checkbox2 == false) {
                  var BuffMsg = Buffer.from(data, 'hex')
                  BuffMsg = encoding.convert(BuffMsg, "UTF8", "GBK").toString()
                  //let BuffMsg  = msg.toString('ascii')
                  _this.jsdata = _this.jsdata + `\n 收到 : \n ${BuffMsg}`
                }
                if (this.checkbox1 == false && this.checkbox2 == true) {
                  var BuffMsg = Buffer.from(data, 'hex')
                  BuffMsg = encoding.convert(BuffMsg, "UTF8", "GBK").toString()
                  //let BuffMsg  = msg.toString('ascii')
                  _this.jsdata = _this.jsdata + `\n ${BuffMsg}`
                } else if (this.checkbox1 == true && this.checkbox2 == true) {
                  var BuffMsg = Buffer.from(data, 'hex')
                  BuffMsg = encoding.convert(BuffMsg, "UTF8", "GBK").toString()
                  //let BuffMsg  = msg.toString('ascii')
                  _this.jsdata = _this.jsdata + `\n 收到 : \n ${BuffMsg}`
                }



                // var BuffMsg = Buffer.from(data, 'hex')
                // BuffMsg = encoding.convert(BuffMsg, "UTF8", "GBK").toString()
                // //let BuffMsg  = msg.toString('ascii')
                // _this.jsdata = _this.jsdata + `\n 收到 : \n ${BuffMsg}`
              } else if (_this.row == 2) {
                if (this.checkbox1 == false && this.checkbox2 == false) {
                  let BuffMsg = data.toString('hex')
                  _this.jsdata = _this.jsdata + `${BuffMsg}`
                } else if (this.checkbox1 == true && this.checkbox2 == false) {
                  let BuffMsg = data.toString('hex')
                  _this.jsdata = _this.jsdata + `\n 收到 : \n ${BuffMsg}`
                }
                if (this.checkbox1 == false && this.checkbox2 == true) {
                  let BuffMsg = data.toString('hex')
                  _this.jsdata = _this.jsdata + `\n ${BuffMsg}`
                } else if (this.checkbox1 == true && this.checkbox2 == true) {
                  let BuffMsg = data.toString('hex')
                  _this.jsdata = _this.jsdata + `\n 收到 : \n ${BuffMsg}`
                }

                // let BuffMsg = data.toString('hex')
                // _this.jsdata = _this.jsdata + `\n 收到 : \n ${BuffMsg}`
              }
              // _this.jsdata = _this.jsdata + `\n 收到: \n ${data.toString()}`
            })
          } else {
            console.log('else close')
            tcp_client.on('end', function () {})
            tcp_client.on('error', function () {})
            tcp_client.on('close', function () {
              console.log('else close  111111')
            })
            this.bind = false
          }

        } else if (this.xylx == 'TCP Server') {
          if (this.bind == false) {
            tcp_server.listen({
              host: _this.zjdz,
              port: _this.dk,
              exclusive: true
            }, function () {});

            // 处理客户端连接
            tcp_server.on('connection', function (socket) {
              Sockets[socket.remotePort] = socket;
              _this.socket = Sockets
              console.log(Sockets)
              _this.clentip = []
              for (var i in Sockets) {
                _this.clentip.push({
                  ip: `${Sockets[i].remoteAddress}:${Sockets[i].remotePort}`,
                  value: i
                })
              }
              socket.on('data', function (data) {
                if (_this.row == 1) {
                  if (this.checkbox1 == false && this.checkbox2 == false) {
                    var BuffMsg = Buffer.from(data, 'hex')
                    BuffMsg = encoding.convert(BuffMsg, "UTF8", "GBK").toString()
                    //let BuffMsg  = msg.toString('ascii')
                    _this.jsdata = _this.jsdata + `${BuffMsg}`
                  } else if (this.checkbox1 == true && this.checkbox2 == false) {
                    var BuffMsg = Buffer.from(data, 'hex')
                    BuffMsg = encoding.convert(BuffMsg, "UTF8", "GBK").toString()
                    //let BuffMsg  = msg.toString('ascii')
                    _this.jsdata = _this.jsdata +
                      `\n 收到: ${socket.remoteAddress}:${socket.remotePort} \n ${BuffMsg}`
                  }
                  if (this.checkbox1 == false && this.checkbox2 == true) {
                    var BuffMsg = Buffer.from(data, 'hex')
                    BuffMsg = encoding.convert(BuffMsg, "UTF8", "GBK").toString()
                    //let BuffMsg  = msg.toString('ascii')
                    _this.jsdata = _this.jsdata + `\n ${BuffMsg}`
                  } else if (this.checkbox1 == true && this.checkbox2 == true) {
                    var BuffMsg = Buffer.from(data, 'hex')
                    BuffMsg = encoding.convert(BuffMsg, "UTF8", "GBK").toString()
                    //let BuffMsg  = msg.toString('ascii')
                    _this.jsdata = _this.jsdata +
                      `\n 收到: ${socket.remoteAddress}:${socket.remotePort} \n ${BuffMsg}`
                  }

                  // var BuffMsg = Buffer.from(data, 'hex')
                  // BuffMsg = encoding.convert(BuffMsg, "UTF8", "GBK").toString()
                  // //let BuffMsg  = msg.toString('ascii')
                  // _this.jsdata = _this.jsdata +
                  //   `\n 收到: ${socket.remoteAddress}:${socket.remotePort} \n ${BuffMsg}`
                } else if (_this.row == 2) {

                  if (this.checkbox1 == false && this.checkbox2 == false) {
                    let BuffMsg = data.toString('hex')
                    _this.jsdata = _this.jsdata +
                      `${BuffMsg}`
                  } else if (this.checkbox1 == true && this.checkbox2 == false) {
                    let BuffMsg = data.toString('hex')
                    _this.jsdata = _this.jsdata +
                      `\n 收到: ${socket.remoteAddress}:${socket.remotePort} \n ${BuffMsg}`
                  }
                  if (this.checkbox1 == false && this.checkbox2 == true) {
                    let BuffMsg = data.toString('hex')
                    _this.jsdata = _this.jsdata +
                      `\n ${BuffMsg}`
                  } else if (this.checkbox1 == true && this.checkbox2 == true) {
                    let BuffMsg = data.toString('hex')
                    _this.jsdata = _this.jsdata +
                      `\n 收到: ${socket.remoteAddress}:${socket.remotePort} \n ${BuffMsg}`
                  }

                  // let BuffMsg = data.toString('hex')
                  // _this.jsdata = _this.jsdata +
                  //   `\n 收到: ${socket.remoteAddress}:${socket.remotePort} \n ${BuffMsg}`
                }
                // data = data.toString();
                // _this.jsdata = _this.jsdata + `\n 收到: ${socket.remoteAddress}:${socket.remotePort} \n ${data}`
              })
              socket.on('close', function (e) { //这里防止连接出错，使用close而非end
                delete Sockets[socket.remotePort]
                _this.clentip = []
                for (var i in Sockets) {
                  _this.clentip.push({
                    ip: `${Sockets[i].remoteAddress}:${Sockets[i].remotePort}`,
                    value: i
                  })
                }
              });
            })
            tcp_server.on('error', function () {})
            tcp_server.on('close', function () {
              _this.bind = false
            })
            this.bind = true
          } else {
            tcp_server.on('close', function () {})
            this.bind = false
          }
        }
      },
      fasong() {
        var _this = this
        if (this.checkbox8 == true && this.zidongfasong != undefined) {
          this.zidong = false
          clearInterval(this.zidongfasong)
          this.zidongfasong = undefined
        } else {
          if (this.xylx == 'UDP') {
            // 发生异常触发
            server.on('error', function () {})
            // 发送消息
            var SendBuff
            if (this.row1 == 1) {
              SendBuff = encoding.convert(this.push, "GBK")
              // SendBuff = Buffer.from(this.push, 'ascii')
            } else {
              SendBuff = Buffer.from(this.push.replace(/\s*/g, ""), 'hex')
            }
            if (SendBuff != "") {
              if (this.checkbox8 == false) {
                var SendLen = SendBuff.length;
                server.send(SendBuff, 0, SendLen, this.yczjdk, this.yczjip, function () {
                  if (_this.jsdata == "") {
                    if (_this.checkbox1 == true) {

                      _this.jsdata = ` 发送至: ${_this.yczjip}:${_this.yczjdk} \n ${_this.push} \n`


                    }
                  } else {
                    if (_this.checkbox1 == true) {

                      _this.jsdata = _this.jsdata + `\n 发送至: ${_this.yczjip}:${_this.yczjdk} \n ${_this.push} \n`



                    }
                  }
                });
              } else {
                this.zidongfasong = setInterval(function () {
                  _this.zidong = true
                  var SendLen = SendBuff.length;
                  server.send(SendBuff, 0, SendLen, _this.yczjdk, _this.yczjip, function () {
                    // console.log('数据发送成功')
                    if (_this.jsdata == "") {
                      if (_this.checkbox1 == true) {

                        _this.jsdata = ` 发送至: ${_this.yczjip}:${_this.yczjdk} \n ${_this.push} \n`

                      }
                    } else {
                      if (_this.checkbox1 == true) {

                        _this.jsdata = _this.jsdata +
                          `\n 发送至: ${_this.yczjip}:${_this.yczjdk} \n ${_this.push} \n`

                      }
                    }
                  });
                }, _this.ms);
              }
            } else {
              console.log('无法发送空数据')
            }
          } else if (this.xylx == 'TCP Client') {
            var SendBuff
            if (this.row1 == 1) {
              SendBuff = encoding.convert(this.push, "GBK")
              // SendBuff = Buffer.from(this.push, 'ascii')
            } else {
              SendBuff = Buffer.from(this.push.replace(/\s*/g, ""), 'hex')
            }
            if (SendBuff != "") {
              if (this.checkbox8 == false) {
                tcp_client.write(SendBuff);
                if (_this.checkbox1 == true) {

                  _this.jsdata = _this.jsdata + `\n 发送:\n ${this.push} \n`

                }
              } else {
                this.zidongfasong = setInterval(function () {
                  _this.zidong = true
                  tcp_client.write(SendBuff);
                  if (_this.checkbox1 == true) {

                    _this.jsdata = _this.jsdata + `\n 发送:\n ${this.push} \n`

                  }
                }, _this.ms);
              }
            } else {
              console.log('无法发送空数据')
            }
          } else if (this.xylx == 'TCP Server') {
            var SendBuff
            if (this.row1 == 1) {
              SendBuff = encoding.convert(this.push, "GBK")
              // SendBuff = Buffer.from(this.push, 'ascii')
            } else {
              SendBuff = Buffer.from(this.push.replace(/\s*/g, ""), 'hex')
            }
            if (SendBuff != "") {
              if (this.checkbox8 == false) {
                this.socket[this.changeip].write(SendBuff);
                if (_this.checkbox1 == true) {

                  _this.jsdata = _this.jsdata + `\n 发送:\n ${this.push} \n`

                }
              } else {
                this.zidongfasong = setInterval(function () {
                  _this.zidong = true
                  this.socket[this.changeip].write(SendBuff);
                  if (_this.checkbox1 == true) {

                    _this.jsdata = _this.jsdata + `\n 发送:\n ${this.push}`

                  }
                }, _this.ms);
              }
            } else {
              console.log('无法发送空数据')
            }

          }
        }
      },
      closeSetInitval: function (item) {
        if (item == false) {
          this.zidong = false
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
      changeRow1: function (e) {
        console.log(this.push)
        if (this.push != '') {
          if (e == 2) {
            var SendBuff = encoding.convert(this.push, "GBK")
            console.log(SendBuff)
            this.push = SendBuff.toString('hex')
          } else if (e == 1) {
            var SendBuff = Buffer.from(this.push.replace(/\s*/g, ""), 'hex')
            SendBuff = Buffer.from(SendBuff, 'hex')
            this.push = encoding.convert(SendBuff, "UTF8", "GBK").toString()
          }
        }
      }
    }
  }
</script>