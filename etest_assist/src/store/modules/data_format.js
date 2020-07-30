
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
    ]

})

// const mutations = {
//     setYaml(state, info) {
//         state.items[info.index] = info.
//         state.yaml = value;
//     },
//     setJson(state, value) {
//         state.json = value;
//     },
//     setJs(state, value) {
//         state.js = value;
//     }

// }

export default {
    namespaced: true,
    state,
    // mutations
}