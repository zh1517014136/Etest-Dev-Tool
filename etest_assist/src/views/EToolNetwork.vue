<template>
  <div style="width:100%;height: calc(100vh - 32px);">
    <v-card height="100%" width="100%" tile>
      <div style="display:flex; flex-wrap: nowrap;height:100%">
        <div class="py-2 pl-4 pr-2" style="height:100%;width:25%;min-width:300px; min-height:600px ">
          <div style="width:100%;height:33%;min-width:250px;">
            <v-card tile :elevation="0" style="width:100%; height:100%;">
              <v-subheader>网络设置</v-subheader>
              <v-divider></v-divider>
              <v-select class="mb-0 mt-4" v-model="xylx" label="(1)协议类型" dense attach
                :items="['UDP','TCP Client','TCP Server']">
              </v-select>
              <v-select class="my-0" v-model="zjdz" label="(2)本地主机地址" dense attach
                :items="['UDP','TCP Client','TCP Server']">
              </v-select>
              <v-text-field class="my-0" attach dense label="(3)本地主机端口"></v-text-field>
              <div style="text-align:center;">
                <v-btn block small>打开</v-btn>
              </div>
            </v-card>
          </div>
          <div class="mt-1" style="width:100%;height:33%; min-width:250px;">
            <v-card tile :elevation="0" style="width:100%; height:100%;">
              <v-subheader>接受设置</v-subheader>
              <v-divider></v-divider>
              <v-radio-group style="height:15px" dense v-model="row"  row>
                <v-radio style="height:15px" dense label="ASCII" :value="1"></v-radio>
                <v-radio style="height:15px" dense label="HEX" :value="2"></v-radio>
              </v-radio-group>
              <v-checkbox style="height:15px" dense v-model="checkbox1" :label="`按日志模式显示: ${checkbox1.toString()}`"></v-checkbox>
              <v-checkbox style="height:15px" dense v-model="checkbox2" :label="`接收区自动换行: ${checkbox2.toString()}`"></v-checkbox>
              <v-checkbox style="height:15px" dense v-model="checkbox3" :label="`接收区自动保存: ${checkbox3.toString()}`"></v-checkbox>
            </v-card>
          </div>
          <div class="mt-1" style="width:100%;height:34%; min-width:250px;">
            <v-card tile :elevation="0" style="width:100%; height:100%;">
              <v-subheader>发送设置</v-subheader>
              <v-divider></v-divider>
             <v-radio-group style="height:15px"  dense v-model="row1"  row>
                <v-radio style="height:15px" dense label="ASCII" :value="1"></v-radio>
                <v-radio style="height:15px" dense label="HEX" :value="2"></v-radio>
              </v-radio-group>
              <v-checkbox style="height:15px" dense v-model="checkbox4" :label="`自动解析转义符: ${checkbox1.toString()}`"></v-checkbox>
              <v-checkbox style="height:15px" dense v-model="checkbox5" :label="`AT指令自动回车: ${checkbox2.toString()}`"></v-checkbox>
              <v-checkbox style="height:15px" dense v-model="checkbox6" :label="`自动发送校验位: ${checkbox3.toString()}`"></v-checkbox>
              <v-checkbox style="height:15px" dense v-model="checkbox7" :label="`打开文件数据源: ${checkbox3.toString()}`"></v-checkbox>
              <v-checkbox style="height:15px" dense v-model="checkbox8" :label="`循环周期: ${checkbox3.toString()}`"></v-checkbox>
            </v-card>
          </div>
        </div>
        <div class="py-2 pl-2 pr-4" style="height:100%;width:75%;min-height:600px ">
          <div style="background-color:yellow;width:100%;height:80%;min-width:500px;">
            <v-card tile :elevation="0" style="width:100%; height:100%;">
              <v-subheader>数据日志</v-subheader>
              <v-divider></v-divider>
              12313213131313131313131 <br />
              12313213131313131313131 <br />
              12313213131313131313131 <br />
            </v-card>
          </div>
          <div class="mt-2" style="background-color:red;width:100%;height:20%;min-width:500px">
            <v-card tile :elevation="0" style="width:100%; height:100%;">
              <v-subheader>数据发送</v-subheader>
              <v-divider></v-divider>
              12313213131313131313131 <br />
              12313213131313131313131 <br />
              12313213131313131313131 <br />
            </v-card>
          </div>
        </div>


      </div>
    </v-card>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        xylx: '',
        zjdz: '',
        row: 1,
        row1: 1,
        checkbox1: true,
        checkbox2: true,
        checkbox3: false,
        checkbox4: true,
        checkbox5: true,
        checkbox6: false,
        checkbox7: false,
        checkbox8: false,
      
      }
    }

  }
</script>