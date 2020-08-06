<template>
    <v-container class="pa-0 fill-height" fluid>
        <div style="width:100%;height:48px;">
            <e-top-tab :selected_index="selected_index" @select="on_select"></e-top-tab>
        </div>
        <div style="width:100%;height: calc(100vh - 80px);">
            <v-card height="100%" width="100%" tile>
                <div style="display:flex; lex-wrap: nowrap;height:100%">
                    <div class="py-2 pl-4 pr-2" style="height:100%;width:15%;min-width:300px; min-height:600px ">
                        <div style="width:100%;height:36%;min-width:250px;">
                            <v-card tile :elevation="0" style="width:100%; height:100%;">
                                <v-subheader>串口设置</v-subheader>
                                <v-divider></v-divider>
                                <v-text-field label="串口号"></v-text-field>
                                <v-select :items="baud_items" label="波特率" dense attach></v-select>
                                <v-select :items="check_items" label="校验位" dense attach></v-select>
                                <v-select :items="data_items" label="数据位" dense attach></v-select>
                                <v-select :items="stop_items" label="停止位" dense attach></v-select>
                                <div style="text-align:center;">
                                    <v-btn block small>打开</v-btn>
                                </div>
                            </v-card>
                        </div>
                        <div class="mt-1" style="width:100%;height:31%; min-width:250px;">
                            <v-card tile :elevation="0" style="width:100%; height:100%;">
                                <v-subheader>接受设置</v-subheader>
                                <v-divider></v-divider>
                                <v-radio-group style="height:15px" dense v-model="row" row>
                                    <v-radio style="height:15px" dense label="ASCII" :value="1"></v-radio>
                                    <v-radio style="height:15px" dense label="HEX" :value="2"></v-radio>
                                </v-radio-group>
                                <v-checkbox style="height:15px" v-model="flase" dense label="接收日志模式显示"></v-checkbox>
                                <v-checkbox style="height:15px" v-model="flase" dense label="接收完自动换行"></v-checkbox>
                                <v-checkbox style="height:15px" v-model="flase" dense label="接收转向至文件"></v-checkbox>
                                <v-checkbox style="height:15px" v-model="flase" dense label="暂停接收区显示"></v-checkbox>
                                <div></div>
                                <div class="my-4">
                                    <v-btn block small>其他选项</v-btn>
                                </div>
                                <div class="my-4">
                                    <v-btn block small>清除接收</v-btn>
                                </div>
                            </v-card>
                        </div>
                        <div class="mt-1" style="width:100%;height:33%; min-width:250px;">
                            <v-card tile :elevation="0" style="width:100%; height:100%;">
                                <v-subheader>发送设置</v-subheader>
                                <v-divider></v-divider>
                                <v-radio-group style="height:15px" dense v-model="row" row>
                                    <v-radio style="height:15px" dense label="ASCII" :value="1"></v-radio>
                                    <v-radio style="height:15px" dense label="HEX" :value="2"></v-radio>
                                </v-radio-group>
                                <v-checkbox style="height:15px" v-model="flase" dense label="自动解析转义符"></v-checkbox>
                                <v-checkbox style="height:15px" v-model="flase" dense label="AT指令自动回车"></v-checkbox>
                                <v-checkbox style="height:15px" v-model="flase" dense label="自动发送校验位"></v-checkbox>
                                <v-checkbox style="height:15px" v-model="flase" dense label="打开文件数据源"></v-checkbox>
                                <v-checkbox style="height:15px" v-model="flase" dense label="循环周期"></v-checkbox>
                            </v-card>
                        </div>
                    </div>
                    <div class="py-2 pl-2 pr-2" style="height:100%;width:85%;min-height:600px ">
                        <div style="width:100%;height:67%;min-width:500px;">
                            <v-card tile :elevation="0" style="width:100%; height:100%;">
                                <v-subheader>数据日志</v-subheader>
                                <v-divider></v-divider>
                                <v-sheet :id="id" width="100%" height="90%" class="pa-0 ma-1 mb-1"
                                    style="border: 2px solid grey"></v-sheet>
                            </v-card>
                        </div>

                        <div class="mt-2" style="width:100%;height:20%;min-width:500px">
                            <v-card tile :elevation="0" style="width:100%; height:100%;">
                                <div class="my-1" style="display:flex; lex-wrap: nowrap;width:100%;">
                                    <div class="mx-2 my-2">
                                        <v-btn small>数据发送</v-btn>
                                    </div>

                                    <div class="mx-2 my-2 ">
                                        <v-btn small>
                                            <v-icon color="grey lighten-2" outlined>mdi-archive-arrow-down</v-icon>
                                            清除
                                        </v-btn>
                                    </div>
                                    <div class="mx-2 my-2">
                                        <v-btn small>
                                            <v-icon color="grey lighten-2" outlined>mdi-archive-arrow-up</v-icon>
                                            清除
                                        </v-btn>
                                    </div>

                                </div>
                                <v-divider></v-divider>
                                    <v-sheet :id="id" width="85%" height="100%" class="pa-0 ma-1 mb-1"
                                        style="border: 2px solid grey">
                                    </v-sheet>
                            </v-card>
                        </div>
                    </div>
                </div>
            </v-card>
        </div>
    </v-container>
</template>

<script>
    import ETopTab from "../components/ETopTabs";
    export default {
        components: {
            "e-top-tab": ETopTab,
        },

        data: () => ({
            baud_items: [110, 300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 56000, 115200, 128000,
                256000, 'Customize'
            ],
            check_items: ['NONE', 'ODD', 'EVEN', 'MARK', 'SPACE'],
            data_items: [5, 6, 7, 8],
            stop_items: [1, 1.5, 2],
            radios1: 'radio-1',
            radios2: 'radio-1',


        }),
    }
</script>