const state = () => ({
  serial: undefined,
  baud: 128000,
  check: 'none',
  data_key: 7,
  stop_key: 1,
  jieshou: 1,
  fasong: 1,
  rizhi: false,
  huanhang: false,
  zanting: false,
  xunhuan: false,
  ms: 1000,
  serial_items: [1, 2, 3, 4, 5],
  baud_items: [110, 300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 56000, 115200, 128000,
    256000, 'Customize'
  ],
  check_items: ['NONE', 'ODD', 'EVEN', 'MARK', 'SPACE'],
  data_items: [5, 6, 7, 8],
  stop_items: [1, 1.5, 2],
  radios1: 'radio-1',
  radios2: 'radio-1',
  selected_index: 0,
  serialportarr: [],
  open: false,
  push: '',
  zidong: false,
  jsdata: ''
})

const mutations = {
  baud(state, value) {
    state.baud = value
  },
  serial(state, value) {
    state.serial = value
  },
  check(state, value) {
    state.check = value
  },
  data_key(state, value) {
    state.data_key = value
  },
  stop_key(state, value) {
    state.stop_key = value
  },
  jieshou(state, value) {
    state.jieshou = value
  },
  fasong(state, value) {
    state.fasong = value
  },
  rizhi(state, value) {
    state.rizhi = value
  },
  huanhang(state, value) {
    state.huanhang = value
  },
  zanting(state, value) {
    state.zanting = value
  },
  xunhuan(state, value) {
    state.xunhuan = value
  },
  ms(state, value) {
    state.ms = value
  },
  serialportarr(state, value) {
    state.serialportarr = value
  },
  open(state, value) {
    state.open = value
  },
  push(state, value) {
    state.push = value
  },
  zidong(state, value) {
    state.zidong = value
  },
  jsdata(state, value) {
    state.jsdata = value
  }
}

export default {
  namespaced: true,
  state,
  mutations
}