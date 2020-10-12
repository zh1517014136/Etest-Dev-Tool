<template>
  <v-container class="pa-0 fill-height" fluid>
    <!-- <div style="width:100%;height:48px;">
            <e-top-tab :selected_index="selected_index" @select="on_select"></e-top-tab>
        </div> -->
    <div style="width:100%;height: calc(100vh - 32px); min-height:680px;">
      <v-card height="100%" width="100%" tile>
        <div style="display:flex; lex-wrap: nowrap;height:100%">
          <div class="py-2 pl-4 pr-2" style="height:100%;width:15%;min-width:300px; min-height:600px ">
            <div style="width:100%;height:47%;min-width:250px;">
              <v-card tile :elevation="0" style="width:100%; height:100%;">
                <v-subheader style="height:24px">串口设置</v-subheader>
                <v-divider class="mb-4"></v-divider>
                <v-select :items="serialportarr" :disabled='this._open' v-model="_serial" label="串口号" item-text="comName" item-value="path"
                  dense attach></v-select>
                <div id="error"></div>
                <v-select :items="[110, 300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 56000, 115200, 128000,
        256000, 'Customize' 
      ]" v-model="_baud" label="波特率" :disabled='this._open' dense attach></v-select>
                <v-select :items="['none', 'odd', 'even', 'mark', 'space']" v-model="_check" :disabled='this._open' label="校验位" dense attach>
                </v-select>
                <v-select :items="[5, 6, 7, 8]" v-model="_data_key" label="数据位" :disabled='this._open' dense attach></v-select>
                <v-select :items="[1, 1.5, 2]" v-model="_stop_key" label="停止位" :disabled='this._open' dense attach></v-select>
                <div style="text-align:center;">
                  <v-btn block small @click="click(1)">{{this._open==true?'关闭':'打开'}}</v-btn>
                </div>
              </v-card>
            </div>
            <div class="mt-1" style="width:100%;height:28%; min-width:250px;">
              <v-card tile :elevation="0" style="width:100%; height:100%;">
                <v-subheader style="height:24px">接受设置</v-subheader>
                <v-divider></v-divider>
                <v-radio-group style="height:15px" dense v-model="_jieshou" row>
                  <v-radio style="height:15px" dense label="ASCII" :value="1"></v-radio>
                  <v-radio style="height:15px" dense label="HEX" :value="2"></v-radio>
                </v-radio-group>
                <v-checkbox style="height:15px" v-model="_rizhi" dense label="接收日志模式显示">
                </v-checkbox>
                <v-checkbox style="height:15px" v-model="_huanhang" dense label="接收完自动换行">
                </v-checkbox>
                <!-- <v-checkbox style="height:15px" v-model="receive_checkbox3" dense label="接收转向至文件">
                                </v-checkbox> -->
                <v-checkbox style="height:15px" v-model="_zanting" dense label="暂停接收区显示">
                </v-checkbox>
                <!-- <div class="my-4">
                                    <v-btn block small>其他选项</v-btn>
                                </div>
                                <div class="my-4">
                                    <v-btn block small>清除接收</v-btn>
                                </div> -->
              </v-card>
            </div>
            <div class="mt-1" style="width:100%;height:25%; min-width:250px;">
              <v-card tile :elevation="0" style="width:100%; height:100%;">
                <v-subheader style="height:24px">发送设置</v-subheader>
                <v-divider></v-divider>
                <v-radio-group style="height:15px" dense v-model="_fasong" row>
                  <v-radio style="height:15px" dense label="ASCII" :value="1"></v-radio>
                  <v-radio style="height:15px" dense label="HEX" :value="2"></v-radio>
                </v-radio-group>
                <!-- <v-checkbox style="height:15px" v-model="send_checkbox1" dense label="自动解析转义符">
                                </v-checkbox>
                                <v-checkbox style="height:15px" v-model="send_checkbox2" dense label="AT指令自动回车">
                                </v-checkbox>
                                <v-checkbox style="height:15px" v-model="send_checkbox3" dense label="自动发送校验位">
                                </v-checkbox>
                                <v-checkbox style="height:15px" v-model="send_checkbox4" dense label="打开文件数据源">
                                </v-checkbox> -->
                <v-row class="px-3" align="center">
                  <v-checkbox v-model="_xunhuan" @change="closeSetInitval" :label="`循环周期:`" hide-details
                    class="shrink mr-2 mt-0"></v-checkbox>
                  <v-text-field style="width:80px;" v-model="_ms" :disabled="!_xunhuan"></v-text-field>ms

                </v-row>
              </v-card>
            </div>
          </div>
          <div class="py-2 pl-2 pr-2" style="height:100%;width:85%;min-height:600px ">
            <div style="width:100%;height:67%;min-width:500px;">
              <v-card tile :elevation="0" style="width:100%; height:100%;">
                <v-subheader style="height:24px">数据日志</v-subheader>
                <v-divider></v-divider>
                <v-sheet width="100%" height="90%" class="pa-0 ma-1 mb-1" style="border: 2px solid grey"></v-sheet>
              </v-card>
            </div>

            <div class="mt-2" style="width:100%;height:20%;min-width:500px">
              <v-card tile :elevation="0" style="width:100%; height:100%;">
                <v-row class="py-0">
                  <v-col class="pa-0" cols="2">
                    <v-subheader style="height:44px">数据发送</v-subheader>
                  </v-col>
                  <v-col class="pa-0 ml-6" cols="3">
                    <v-row class="py-0">
                      <!-- v-if="_bind == true" -->
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
                <div style="display:flex; lex-wrap: nowrap;width:100%;height:100%">
                  <v-sheet width="85%" height="100%" class="pa-0 ma-1 mb-1" @keydown.stop
                    style="border: 2px solid grey">
                  </v-sheet>
                  <!-- <v-textarea name="input-7-1" filled label="Label"  style="width:100%;height:100%"
                                        value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.">
                                    </v-textarea> -->
                  <v-btn style="width:15%;height:100%" class="pa-0 ma-1 mb-1" @click="write">发送
                  </v-btn>
                </div>
              </v-card>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </v-container>
</template>

<script>
  // import ETopTab from "../../components/ETopTabs";

  const serialport = window.require('serialport');
  var port = undefined

  export default {
    components: {
      // "e-top-tab": ETopTab,
    },
    computed: {
      _baud: {
        get: function () {
          return this.$store.state.serialport.baud
        },
        set: function (v) {
          return this.$store.commit('serialport/baud', v)
        }
      },
      _serial: {
        get: function () {
          return this.$store.state.serialport.serial
        },
        set: function (v) {
          return this.$store.commit('serialport/serial', v)
        }
      },

      _check: {
        get: function () {
          return this.$store.state.serialport.check
        },
        set: function (v) {
          return this.$store.commit('serialport/check', v)
        }
      },
      _data_key: {
        get: function () {
          return this.$store.state.serialport.data_key
        },
        set: function (v) {
          return this.$store.commit('serialport/data_key', v)
        }
      },
      _stop_key: {
        get: function () {
          return this.$store.state.serialport.stop_key
        },
        set: function (v) {
          return this.$store.commit('serialport/stop_key', v)
        }
      },
      _jieshou: {
        get: function () {
          return this.$store.state.serialport.jieshou
        },
        set: function (v) {
          return this.$store.commit('serialport/jieshou', v)
        }
      },
      _fasong: {
        get: function () {
          return this.$store.state.serialport.fasong
        },
        set: function (v) {
          return this.$store.commit('serialport/fasong', v)
        }
      },
      _rizhi: {
        get: function () {
          return this.$store.state.serialport.rizhi
        },
        set: function (v) {
          return this.$store.commit('serialport/rizhi', v)
        }
      },
      _huanhang: {
        get: function () {
          return this.$store.state.serialport.huanhang
        },
        set: function (v) {
          return this.$store.commit('serialport/huanhang', v)
        }
      },
      _zanting: {
        get: function () {
          return this.$store.state.serialport.zanting
        },
        set: function (v) {
          return this.$store.commit('serialport/zanting', v)
        }
      },
      _xunhuan: {
        get: function () {
          return this.$store.state.serialport.xunhuan
        },
        set: function (v) {
          return this.$store.commit('serialport/xunhuan', v)
        }
      },
      _ms: {
        get: function () {
          return this.$store.state.serialport.ms
        },
        set: function (v) {
          return this.$store.commit('serialport/ms', v)
        }
      },
      serialportarr: {
        get: function () {
          return this.$store.state.serialport.serialportarr
        },
        set: function (v) {
          return this.$store.commit('serialport/serialportarr', v)
        }
      },
      _open: {
        get: function () {
          return this.$store.state.serialport.open
        },
        set:function(v){
          return this.$store.commit('serialport/open',v)
        }
      }
    },

    data: () => ({
      selected_index: 0,
      zidongfasong: undefined,
    }),
    beforeMount: function () {
      serialport.list().then(
        ports => {
          //ports 串口
          this.serialportarr = ports
          this._serial = this._serial === undefined ? ports[0].comName : this._serial
        }
      )
    },
    methods: {
      closeSetInitval: function (item) {
        if (item == false) {
          clearInterval(this.zidongfasong)
          this.zidongfasong = undefined
        }
      },
      click: function () {
        if (!port) {
          port = new serialport(this._serial, {
            baudRate: this._baud, //波特率
            dataBits: this._data_key, //数据位
            parity: this._check, //校验
            stopBits: this._stop_key, //停止位
            flowControl: false,
            autoOpen: false //不自动打开
          }, false)
          this.open()

        } else {
          if (port) {
            var _this = this
            port.close(function () {
              console.log('端口已关闭')
              port = undefined
              _this._open=false
            });
          }
        }
      },
      open: function () {
        var _this = this
        port.on('error', (error) => {
          console.log('Error: ', error.message);
        })
        port.open(function (error) {
          if (error) {
            console.log("打开端口" + _this._serial + "错误：" + error);
          } else {
            console.log("打开端口" + _this._serial + "成功");
            _this._open=true
            _this.getck()
            port.on('data', function (data) {
              console.log('收到的数据: ' + data);
            });
          }
        });
      },
      write: function () {
        port.write("2334444");
      },
      getck: function () {
        port.set({
          cts: true,
          dsr: false,
          dtr: true,
          rts: true,
          brk: false
        })
        port.get(function (err, data) {
          console.log(err)
          console.log(data)
        })
      },

      closefs: function () {

      },
      closejs: function () {

      },
    }

  }
</script>