
let default_script = {
    js: 'function demo(){\n \
        return {\n \
            json: "json格式数据",\n \
            yaml: "yaml格式数据",\n \
            value: 100,\n \
            items:[1,2,3,4,5,6]\n \
        }\n \
    }\n \
    demo()',
    yaml: 'json: json格式数据\n \
    yaml: yaml格式数据\n \
    value: 100\n \
    items:\n \
      - 1\n \
      - 2\n \
      - 3\n \
      - 4\n \
      - 5\n \
      - 6\n \
      ',
    json: '{\n \
        "json": "json格式数据",\n \
        "yaml": "yaml格式数据",\n \
        "value": 100,\n \
        "items": [\n \
            1,\n \
            2,\n \
            3,\n \
            4,\n \
            5\n \
        ]\n \
    }'
};
const state = () => ({
    items: [
        JSON.parse(JSON.stringify(default_script)),
        JSON.parse(JSON.stringify(default_script)),
        JSON.parse(JSON.stringify(default_script)),
        JSON.parse(JSON.stringify(default_script)),
        JSON.parse(JSON.stringify(default_script)),
    ],
    select:0

})

const mutations = {
    setYaml(state, info) {
        state.items[info.index].yaml = info.value;
    },
    setJson(state, info) {
        state.items[info.index].json = info.value;
    },
    setJs(state, info) {
        state.items[info.index].js = info.value;
    },
    setItem(state, info) {
        state.items[info.index] = info.value;
    },
    setSelect(state, value) {
        state.select = value;
    }
}

export default {
    namespaced: true,
    state,
    mutations
}