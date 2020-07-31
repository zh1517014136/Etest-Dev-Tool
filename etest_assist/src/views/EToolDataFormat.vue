<template>
    <v-container class="pa-0 fill-height" fluid>
        <div style="width:100%;height:48px;">
            <e-top-tab :selected_index='selected_index' @select="on_select"> </e-top-tab>
        </div>
        <div style="width:100%;height: calc(100vh - 80px);">
            <v-card height="100%" width="100%" tile>
                <div class="px-4 ma-0 pt-4" style="display:flex; flex-wrap: nowrap;height:100%">
                    <div style="height:100%;width:32%;min-width:300px">
                        <v-sheet class="pa-0 pt-3">
                            <v-row class="pa-0 ma-0">
                                <v-col cols="12" class="ma-0 pa-0">
                                    <v-sheet class="pa-0 ma-0" style="height: calc(100vh - 142px);">
                                        <e-script-editor id="js" :script="js" type="javascript" @change="on_change" />
                                    </v-sheet>
                                </v-col>
                            </v-row>
                        </v-sheet>
                    </div>
                    <div
                        style="height:100%;width:2%;min-width:50px;max-width:50px;display:flex;justify-content:center;align-items:center;">

                        <v-tooltip top>
                            <template v-slot:activator="{ on }">
                                <v-btn v-on="on" class="mx-2" fab dark x-small>
                                    <v-icon color="grey lighten-2" outlined @click="on_js">
                                        mdi-play
                                    </v-icon>
                                </v-btn>
                            </template>
                            <span>执行js代码</span>
                        </v-tooltip>

                    </div>
                    <div style="height:100%;width:32%;min-width:300px">
                        <v-sheet class="pa-0 pt-3">
                            <v-row class="pa-0 ma-0">
                                <v-col cols="12" class="ma-0 pa-0">
                                    <v-sheet class="pa-0 ma-0 " style="height: calc(100vh - 142px);">
                                        <e-script-editor id="json" :script="json" type="json" @change="on_change" />
                                    </v-sheet>
                                </v-col>
                            </v-row>
                        </v-sheet>
                    </div>
                    <div
                        style="height:100%;width:2%;min-width:40px;max-width:50px;display:flex;justify-content:center;align-items:center;">
                        <v-row :align="alignment" :justify="justify" height="100%">
                            <div class="d-flex flex-column">
                                <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                        <v-btn v-on="on" class="mx-2 my-2" fab dark x-small>
                                            <v-icon color="grey lighten-2" outlined @click="on_yaml">
                                                mdi-chevron-double-left
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <span>yaml转js代码</span>
                                </v-tooltip>
                                <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                        <v-btn v-on="on" class="mx-2 my-2" fab dark x-small>
                                            <v-icon color="grey lighten-2" outlined @click="on_json">
                                                mdi-chevron-double-right
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <span>json转yaml代码</span>
                                </v-tooltip>
                                <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                        <v-btn v-on="on" class="mx-2 my-2" fab dark x-small>
                                            <v-icon color="grey lighten-2" outlined @click="on_excel">
                                                mdi-file-excel
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <span>上传文件</span>
                                </v-tooltip>
                            </div>
                        </v-row>
                    </div>
                    <div style="height:100%;width:32%;min-width:300px">
                        <v-sheet class="pa-0 pt-3">
                            <v-row class="pa-0 ma-0">
                                <v-col cols="12" class="ma-0 pa-0">
                                    <v-sheet class="pa-0 ma-0" style="height: calc(100vh - 142px);">
                                        <e-script-editor id="yaml" :script="yaml" type="yaml" @change="on_change" />
                                    </v-sheet>
                                </v-col>
                            </v-row>
                        </v-sheet>
                    </div>
                </div>
            </v-card>
        </div>

    </v-container>
</template>

<script>
    import XLSX from 'xlsx';
    import EScriptEditor from '../components/widgets/EDataFormatEditor';
    import ETopTab from '../components/ETopTabs';

    import yaml from 'js-yaml';

    export default {
        components: {
            'e-script-editor': EScriptEditor,
            "e-top-tab": ETopTab,
        },

        mounted: async function () {
            let db_items = await this.$store.dispatch('db_list', {
                kind: 'dataformat'
            });
            if (db_items) {
                let len = db_items.length
                for (let index = 0; index < len; index++) {
                    this.$store.commit('data_format/setItem', {index: index, value:  db_items[index]});
                }
            }
            this.loaded = true;
        },

        beforeDestroy: async function() {
            let state_items = this.$store.state.data_format.items;
            let len = state_items.length
            for (let index = 0; index < len; index++) {
                let item = state_items[index];
                item.id = index;
                await this.$store.dispatch('db_update', {
                    kind: 'dataformat',
                    doc: item
                })
            }
        },

        data() {
            return {
                alignment: 'center',
                justify: 'center',
                loaded: false,
            }
        },

        computed: {
            js: {
                get: function () {
                    if(!this.loaded) {
                        return '';
                    }
                    return  this.$store.state.data_format.items[this.selected_index].js;
                },
                set: function (v) {
                    this.$store.commit('data_format/setJs', {index: this.selected_index, value: v})
                },
            },
            json: {
                get: function () {
                    if(!this.loaded) {
                        return '';
                    }
                    return  this.$store.state.data_format.items[this.selected_index].json;
                },
                set: function (v) {
                    this.$store.commit('data_format/setJson', {index: this.selected_index, value: v})
                },
            },
            yaml: {
                get: function () {
                    if(!this.loaded) {
                        return '';
                    }
                    return  this.$store.state.data_format.items[this.selected_index].yaml;
                },
                set: function (v) {
                    this.$store.commit('data_format/setYaml', {index: this.selected_index, value: v})
                },
            },
            selected_index: {
                get: function () {
                    return this.$store.state.data_format.select
                },
                set: function (v) {
                    // console.log(v)
                    return this.$store.commit('data_format/setSelect', v);
                },
            }
        },

        methods: {
            on_select(data) {
                this.selected_index = data
            },
            on_change(id, script) {
                this[id] = script;
            },
            on_json() {
                try {
                    let jo = JSON.parse(this.json);
                    this.yaml = yaml.dump(jo);
                } catch (error) {
                    // this.$store.commit("setMsgError", error.message);
                }
            },
            on_yaml() {
                try {
                    let yo = yaml.load(this.yaml);
                    this.json = JSON.stringify(yo, null, 4);
                } catch (error) {
                    this.$store.commit("setMsgError", error.message);
                }
            },
            on_js() {
                try {
                    let jo = eval(this.js);
                    this.json = JSON.stringify(jo, null, 4);
                    this.yaml = yaml.dump(jo);
                } catch (error) {
                    this.$store.commit("setMsgError", error.message);
                }
            },

            on_excel: function () {
                let inputObj = document.createElement("input");
                inputObj.setAttribute("id", "_ef");
                inputObj.setAttribute("type", "file");
                inputObj.setAttribute("accept", ".xlsx");
                inputObj.setAttribute("style", "visibility:hidden");
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
                        self.$store.commit("setMsgError", "只能选择一个文件");
                    } else {
                        const fileReader = new FileReader();
                        fileReader.onload = (event) => {
                            try {
                                const workbook = XLSX.read(event.target.result, {
                                    type: "binary",
                                });
                                let data = XLSX.utils.sheet_to_json(
                                    workbook.Sheets[workbook.SheetNames[0]]
                                );
                                self.json = JSON.stringify(data, null, 4);
                                self.yaml = yaml.dump(data);
                            } catch (e) {
                                self.$store.commit("setMsgError", e.message);
                            }
                        };
                        fileReader.readAsBinaryString(files[0]);
                    }
                    inputObj.removeEventListener("change", function () {});
                    document.body.removeChild(inputObj);
                } catch (error) {
                    this.$store.commit("setMsgError", error.message);
                }
            },
        },
    };
</script>