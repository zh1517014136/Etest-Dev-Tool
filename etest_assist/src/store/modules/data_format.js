const state = () => ({
    js: '',
    yaml: '',
    json: '',

})

const mutations = {
    setYaml(state, value) {
        state.yaml = value;
    },
    setJson(state, value) {
        state.json = value;
    },
    setJs(state, value) {
        state.js = value;
    }

}

export default {
    namespaced: true,
    state,
    mutations
}