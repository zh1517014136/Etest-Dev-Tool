<template>
    <v-container class="pa-0 fill-height" fluid>
        <div style="width:100%;height:48px;">
            <e-top-tab :selected_index="selected_index" @select="on_select"></e-top-tab>
        </div>
        <div style="width:100%;height: calc(100vh - 80px);">
            <v-card height="100%" width="100%" tile>
                <div class="px-4 ma-0 pt-2" style="display:flex; flex-wrap: nowrap;height:100%">
                    <div style="height:100%;width:33%;min-width:300px">
                        <v-sheet class="pa-2">
                            <v-row class="pa-0 ma-0">
                                <v-col cols="12" class="ma-0 pa-0">
                                    <v-sheet class="pa-0 ma-0" style="height: calc(100vh - 130px);">
                                        <e-script-editor :small="true" id="yaml" :script="yaml" type="yaml"
                                            @change="on_change" />
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
                                        <v-btn v-on="on" class="mx-2 my-2" fab dark x-small @click="on_code">
                                            <v-icon color="grey lighten-2" outlined>
                                                mdi-code-braces</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>生成代码</span>
                                </v-tooltip>
                                <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                        <v-btn v-on="on" class="mx-2 my-2" fab dark x-small @click="on_graph">
                                            <v-icon color="grey lighten-2" outlined>
                                                mdi-state-machine</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>生成状态图</span>
                                </v-tooltip>
                            </div>
                        </v-row>
                    </div>
                    <div style="height:100%;width:65%;min-width:300px">
                        <v-sheet class="pa-2">
                            <v-row class="pa-0 ma-0">
                                <v-col cols="12" class="ma-0 pa-0">
                                    <v-sheet class="pa-0 ma-0" style="height: calc(100vh - 130px);">
                                        <e-script-editor v-if="coding" id="lua" :small="true" :script="lua" type='etlua'
                                            @change="on_change" />
                                        <v-row v-else align="center" justify="center">
                                            <div id="graph"></div>
                                        </v-row>
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
<style scoped>
    svg {
        display: block;
        margin: auto;
    }
</style>
<script>
    import EScriptEditor from '../../components/widgets/EDataFormatEditor';
    import yaml from 'js-yaml';
    import helper from '../../helper/helper';
    import ETopTab from "../../components/ETopTabs";
    import mermaid from 'mermaid';

    export default {
        components: {
            'e-script-editor': EScriptEditor,
            "e-top-tab": ETopTab,
        },


        created: function () {
            mermaid.mermaidAPI.initialize({
                startOnLoad: false,
                theme: "default",
            });
        },
        mounted: async function () {
            let db_items = await this.$store.dispatch("db_list", {
                kind: "statecode",
            });
            if (db_items) {
                let len = db_items.length;
                for (let index = 0; index < len; index++) {
                    this.$store.commit("state_code/setItem", {
                        index: index,
                        value: db_items[index],
                    });
                }
            }
            this.load_data(this.selected_index)
        },

        beforeDestroy: async function () {
            let state_items = this.$store.state.state_code.items;
            let len = state_items.length;
            for (let index = 0; index < len; index++) {
                let item = state_items[index];
                item.id = index;
                await this.$store.dispatch("db_update", {
                    kind: "statecode",
                    doc: item,
                });
            }
        },

        data() {
            return {
                alignment: "center",
                justify: "center",
                yaml: '',
                lua: '',
                coding: true,
                kind: 'graph',
            }
        },
        computed: {
            selected_index: {
                get: function () {
                    return this.$store.state.state_code.select;
                },
                set: function (v) {
                    return this.$store.commit("state_code/setSelect", v);
                },
            },
        },
        watch: {
            selected_index: function (v) {
                this.load_data(v);
            }
        },
        lua: {
            get: function () {
                return this.selected_data.lua;
            },
            set: function (v) {
                return this.selected_data.lua = v;
            },
        },
        yaml: {
            get: function () {
                return this.selected_data.yaml;
            },
            set: function (v) {
                return this.selected_data.yaml = v;
            },
        },
        selected_index: {
            get: function () {
                return this.$store.state.state_code.select
            },
            set: function (v) {
                // console.log(v)
                return this.$store.commit('state_code/setSelect', v);
            },
        },


        methods: {
            on_change(id, value) {
                this[id] = value;
                this.save_data(this.selected_index);
            },
            valid_event(e) {
                if (!e || !e.trim()) {
                    return false;
                }
                e = e.trim();
                if (e === '$entry') {
                    return true;
                }
                if (e.startsWith('timeout.')) {
                    e = e.substring(8);
                }
                return helper.check_name(e);
            },
            save_data(idx) {
                this.$store.commit("state_code/setYaml", {
                    index: idx,
                    value: this.yaml,
                });
                this.$store.commit("state_code/setLua", {
                    index: idx,
                    value: this.lua,
                });
            },
            load_data(idx) {
                let o = this.$store.state.state_code.items[idx];
                this.lua = o.lua;
                this.yaml = o.yaml;
            },
            on_select(data) {
                this.selected_index = data;
            },
            valid_actions(acs) {
                if (!acs || !acs.trim()) {
                    return false;
                }
                acs = acs.split(' ');
                let al = [];
                acs.forEach(ac => {
                    if (ac && ac.trim()) {
                        al.push(ac.trim());
                    }
                });
                if (al.length === 0) {
                    return false;
                }
                for (let ac of al) {
                    let aa = ac.split('@');
                    if (aa.length === 1) {
                        if (!helper.check_name(aa[0])) {
                            return false;
                        }
                    } else if (aa.length === 2) {
                        if (!helper.check_name(aa[0]) || (aa[1] && isNaN(aa[1]))) {
                            return false;
                        }
                    } else {
                        return false;
                    }
                }
                return true;
            },
            valid_state(state) {
                if (!state || !state.trim()) {
                    return false;
                }
                state = state.trim();
                let ss = state.split(' ');
                let i = 0;
                ss.forEach(s => {
                    if (s && s.trim()) {
                        i++;
                    }
                });
                return i >= 2;
            },
            valid_yaml() {
                try {
                    let states = yaml.safeLoad(this.yaml);
                    for (let it of states) {
                        for (let k in it) {
                            if (!['when', 'then', 'state'].includes(k)) {
                                throw new Error('无效关键词' + k);
                            }
                        }
                        if (!this.valid_event(it.when)) {
                            throw new Error('when无效事件' + it.when);
                        }
                        if (!this.valid_actions(it.then)) {
                            throw new Error('then无效任务' + it.then);
                        }
                        if (!this.valid_state(it.state)) {
                            throw new Error('state无效状态' + it.state);
                        }
                    }
                    if (states.length === 0) {
                        throw new Error('状态序列不能为空');
                    }
                    if (states[0].when.trim() !== '$entry') {
                        throw new Error('必须以$entry事件开始');
                    }
                    return true;
                } catch (error) {
                    this.$store.commit('setMsgError', error.message);
                }
                return false;
            },
            make_eves(states, codes) {
                let begin = [];
                let end = [];
                let out = [];
                let eves = [];
                states.forEach(st => {
                    if (st.event.type === 'timeout') {
                        if (!out.includes(st.event.name)) {
                            out.push(st.event.name);
                        } else {
                            throw new Error(`timeout.${st.event.name}被多次订阅`);
                        }
                    }
                    st.actions.forEach(ac => {
                        if (ac.type === 'begin_timer') {
                            if (!begin.includes(ac.name)) {
                                begin.push(ac.name);
                            } else {
                                throw new Error(`定时器${st.event.name}被多次启动`);
                            }
                        } else if (ac.type === 'end_timer' && !end.includes(ac.name)) {
                            end.push(ac.name);
                        }
                    });
                    if (!eves.includes(st.event.name)) {
                        eves.push(st.event.name);
                    } else {
                        throw new Error(`${st.event.name}被多次订阅`);
                    }
                });
                begin.forEach(t => {
                    if (!end.includes(t)) {
                        throw new Error(`定时器${t}没有被清除`);
                    }
                    if (!out.includes(t)) {
                        throw new Error(`timeout.${t}没有被订阅`);
                    }
                });
                codes.push('local _timers = {}\n');
            },
            make_fns(states, codes) {
                let fns = [];
                states.forEach(st => {
                    st.actions.forEach(ac => {
                        if (ac.type === 'action' && !fns.includes(ac.name)) {
                            fns.push(ac.name);
                        }
                    });
                });
                fns.forEach(fn => {
                    codes.push(`function ${fn}(udata)`);
                    codes.push('\t');
                    codes.push('end\n');
                });
            },
            append_action(ac, codes, level) {
                let pre = '\t'.repeat(level);
                if (ac.type === 'begin_timer') {
                    codes.push(
                        `${pre}_timers.${ac.name} = async.timeout(${ac.value}, async.emit, 'timeout.${ac.name}')`);
                } else if (ac.type === 'end_timer') {
                    codes.push(`${pre}async.clear(_timers.${ac.name})`);
                } else if (ac.type === 'action') {
                    codes.push(`${pre}${ac.name}(vars)`)
                }
            },

            make_entry(states, codes) {
                let self = this;
                states.forEach(st => {
                    if (st.event.type === 'entry') {
                        codes.push('function entry(vars, option)')
                    } else {
                        if (st.actions.length === 1 && st.actions[0].type === 'action') {
                            codes.push(
                                `\tasync.on('${st.event.type==='timeout'?'timeout.':''}${st.event.name}', ${st.actions[0].name}, vars)`
                            );
                        } else {
                            codes.push(
                                `\tasync.on('${st.event.type==='timeout'?'timeout.':''}${st.event.name}', function()`
                            );
                            st.actions.forEach(ac => self.append_action(ac, codes, 2));
                            codes.push('\tend)');
                        }
                    }
                });
                codes.push('');
                states[0].actions.forEach(ac => {
                    self.append_action(ac, codes, 1);
                });
                codes.push('end');
            },
            make_code(states) {
                let codes = ['\n--[['];
                codes.push(this.yaml);
                codes.push('--]]\n')
                this.make_eves(states, codes);
                this.make_fns(states, codes);
                this.make_entry(states, codes);
                return codes.join('\n');
            },
            get_state(ss) {
                ss = ss.trim();
                let sls = ss.split(' ');
                let sts = [];
                for (let s of sls) {
                    if (s && s.trim()) {
                        sts.push(s.trim())
                    }
                }
                return {
                    from: sts,
                    to: sts.pop()
                };
            },
            get_state_list(yaml_code) {
                let state_list = [];
                let states = yaml.safeLoad(yaml_code);
                let self = this;
                states.forEach(st => {
                    let ev = st.when.trim();
                    let oev;
                    if (ev === '$entry') {
                        oev = {
                            type: 'entry'
                        }
                    } else {
                        if (ev.startsWith('timeout.')) {
                            oev = {
                                type: 'timeout',
                                name: ev.substring(8)
                            }
                        } else {
                            oev = {
                                type: 'event',
                                name: ev
                            }
                        }
                    }

                    let acts = st.then.trim().split(' ');
                    let actls = [];
                    acts.forEach(ac => {
                        ac = ac.trim();
                        if (ac) {
                            let ts = ac.split('@');
                            if (ts.length === 2) {
                                if (ts[1]) {
                                    actls.push({
                                        type: 'begin_timer',
                                        name: ts[0],
                                        value: parseInt(ts[1]),
                                    });
                                } else {
                                    actls.push({
                                        type: 'end_timer',
                                        name: ts[0]
                                    });
                                }
                            } else {
                                actls.push({
                                    type: 'action',
                                    name: ts[0],
                                });
                            }
                        }
                    });

                    state_list.push({
                        event: oev,
                        actions: actls,
                        state: self.get_state(st.state),
                    });
                });
                return state_list;
            },
            graph_name(state) {
                if (['开始', '结束'].includes(state)) {
                    return '[*]'
                }
                return state;
            },
            make_graph(yaml_code) {
                let res = [];
                let state_list = this.get_state_list(yaml_code);
                let self = this;
                res.push('stateDiagram-v2');
                state_list.forEach(st => {
                    st.state.from.forEach(fr => {
                        let l = `\t${self.graph_name(fr)} --> ${self.graph_name(st.state.to)}`;
                        if (st.event.type !== 'entry') {
                            l += ` : ${st.event.type==='timeout' ? 'timeout.':''}${st.event.name}`;
                        }
                        res.push(l)
                    })
                });
                let str = res.join('\n');
                return str;
            },
            on_code() {
                this.kind = 'code';
                if (this.valid_yaml()) {

                    try {
                        let state_list = this.get_state_list(this.yaml);
                        this.lua = this.make_code(state_list);
                        this.coding = true;
                        this.save_data(this.selected_index);

                    } catch (error) {
                        this.$store.commit('setMsgError', error.message);
                    }
                }
            },
            // on_create() {
            //     if (this.kind === 'graph') {
            //         this.on_graph();
            //     } else {
            //         this.on_code();
            //     }
            // },
            on_graph() {
                this.kind = 'graph';
                if (this.valid_yaml()) {
                    this.coding = false;
                    let self = this;
                    this.$nextTick(() => {
                        let element = document.getElementById('graph');
                        mermaid.mermaidAPI.render('graph_svg', self.make_graph(self.yaml), svgCode => {
                            element.innerHTML = svgCode;
                        });
                    })
                    this.save_data(this.selected_index);
                }
            }
        }
    }
</script>