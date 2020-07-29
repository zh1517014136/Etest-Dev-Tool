<template>
    <v-container class="pa-0 fill-height" fluid>
        <v-card height="100%" width="100%" tile>
            <div>
                <v-row class="pa-0 ma-0" style="flex-wrap: nowrap;">
                    <v-col cols="4">
                        <v-sheet class="pa-2">
                            <v-row class="pa-0 ma-0">
                                <!-- <v-col cols="12" class="ma-0 pa-1">
                                    <v-btn color="grey lighten-2" outlined @click="on_js">
                                        JavaScript
                                    </v-btn>
                                </v-col> -->
                                <v-col cols="12" class="ma-0 pa-0">
                                    <v-sheet class="pa-0 ma-0" style="height: calc(100vh - 142px);">
                                        <e-script-editor id="js" :script="js" type="javascript" @change="on_change" />
                                    </v-sheet>
                                </v-col>
                            </v-row>
                        </v-sheet>
                    </v-col>
                    <v-icon color="grey lighten-2" outlined @click="on_js">
                        mdi-skip-next
                    </v-icon>
                    <v-col cols="4">
                        <v-sheet class="pa-2">
                            <v-row class="pa-0 ma-0">
                                <!-- <v-col cols="12" class="ma-0 pa-1">
                                    <v-btn color="grey lighten-2" outlined @click="on_json">
                                        JSON
                                    </v-btn>
                                </v-col> -->
                                <v-col cols="12" class="ma-0 pa-0">
                                    <v-sheet class="pa-0 ma-0" style="height: calc(100vh - 142px);">
                                        <e-script-editor id="json" :script="json" type="json" @change="on_change" />
                                    </v-sheet>
                                </v-col>
                            </v-row>
                        </v-sheet>
                    </v-col>
                    <v-row class="pa-0 ma-0">
                        <v-icon color="grey lighten-2" outlined @click="on_yaml">
                            mdi-chevron-left-box
                        </v-icon>
                        <v-icon color="grey lighten-2" outlined @click="on_json">
                            mdi-chevron-right-box
                        </v-icon>
                        <v-icon color="grey lighten-2" outlined @click="on_excel">
                            mdi-alpha-e-box
                        </v-icon>
                    </v-row>
                    <v-col cols="4">
                        <v-sheet class="pa-2">
                            <v-row class="pa-0 ma-0">
                                <!-- <v-col cols="6" class="ma-0 pa-1" align="begin">
                                    <v-btn color="grey lighten-2" outlined @click="on_yaml">
                                        YAML
                                    </v-btn>
                                </v-col>
                                <v-col cols="6" class="ma-0 pa-1" align="end">
                                    <v-btn color="grey lighten-2" outlined @click="on_excel">
                                        Excel
                                    </v-btn> -->
                                <!-- </v-col> -->
                                <v-col cols="12" class="ma-0 pa-0">
                                    <v-sheet class="pa-0 ma-0" style="height: calc(100vh - 142px);">
                                        <e-script-editor id="yaml" :script="yaml" type="yaml" @change="on_change" />
                                    </v-sheet>
                                </v-col>
                            </v-row>
                        </v-sheet>
                    </v-col>
                </v-row>
            </div>
        </v-card>
    </v-container>
</template>

<script>
    import XLSX from 'xlsx';
    import EScriptEditor from '../components/widgets/EDataFormatEditor';
    import yaml from 'js-yaml';

    export default {
        components: {
            'e-script-editor': EScriptEditor,
        },

        // data() {
        //     return {
        //         js: '',
        //         json: '',
        //         yaml: '',
        //     }
        // },

        computed: {
            js: {
                get: function () {
                    return this.$store.state.data_format.js;
                },
                set: function (v) {
                    return this.$store.commit('data_format/setJs', v);
                }
            },
            json: {
                get: function () {
                    return this.$store.state.data_format.json;
                },
                set: function (v) {
                    return this.$store.commit('data_format/setJson', v);
                }
            },
            yaml: {
                get: function () {
                    return this.$store.state.data_format.yaml;
                },
                set: function (v) {
                    return this.$store.commit('data_format/setYaml', v);
                }
            }
        },

        methods: {
            on_change(id, script) {
                this[id] = script;
            },
            on_json() {
                try {
                    let jo = JSON.parse(this.json);
                    this.yaml = yaml.dump(jo);
                } catch (error) {
                    this.$store.commit('setMsgError', error.message);
                }
            },
            on_yaml() {
                try {
                    let yo = yaml.load(this.yaml);
                    this.json = JSON.stringify(yo, null, 4);
                } catch (error) {
                    this.$store.commit('setMsgError', error.message);
                }
            },
            on_js() {
                try {
                    let jo = eval(this.js);
                    this.json = JSON.stringify(jo, null, 4);
                    this.yaml = yaml.dump(jo);
                } catch (error) {
                    this.$store.commit('setMsgError', error.message);
                }
            },

            on_excel: function () {
                let inputObj = document.createElement('input')
                inputObj.setAttribute('id', '_ef');
                inputObj.setAttribute('type', 'file');
                inputObj.setAttribute('accept', '.xlsx');
                inputObj.setAttribute("style", 'visibility:hidden');
                document.body.appendChild(inputObj);
                inputObj.addEventListener("change", this.updatePath);
                inputObj.click();
            },

            updatePath: function () {
                let inputObj = document.getElementById("_ef");
                let files = inputObj.files;
                let self = this;
                try {
                    if (files.length > 1) {
                        self.$store.commit('setMsgError', '只能选择一个文件');
                    } else {
                        const fileReader = new FileReader();
                        fileReader.onload = (event) => {
                            try {
                                const workbook = XLSX.read(event.target.result, {
                                    type: 'binary'
                                });
                                let data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
                                self.json = JSON.stringify(data, null, 4);
                                self.yaml = yaml.dump(data);
                            } catch (e) {
                                self.$store.commit('setMsgError', e.message);
                            }
                        }
                        fileReader.readAsBinaryString(files[0])
                    }
                    inputObj.removeEventListener("change", function () {});
                    document.body.removeChild(inputObj);
                } catch (error) {
                    this.$store.commit('setMsgError', error.message);
                }
            },

        }
    }
</script>