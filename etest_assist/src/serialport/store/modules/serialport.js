const state = () => ({
  items:{
    serial: undefined,
    baud: 128000,
    check: 'none',
    data_key: 8,
    stop_key: 1,
    jieshou: 1,
    fasong: 1,
    rizhi: true,
    huanhang: true,
    zanting: false,
    xunhuan: false,
    ms: 1000,
    baud_items: [110, 300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 56000, 115200, 128000,
      256000, 'Customize'
    ],
    check_items: ['NONE', 'ODD', 'EVEN', 'MARK', 'SPACE'],
    data_items: [5, 6, 7, 8],
    stop_items: [1, 1.5, 2],
    selected_index: 0,
    serialportarr: [],
    open: false,
    push: '',
    zidong: false,
    jsdata: ''
  }
  
})

const mutations = {
  baud(state, value) {
    state.items.baud = value
  },
  serial(state, value) {
    state.items.serial = value
  },
  check(state, value) {
    state.items.check = value
  },
  data_key(state, value) {
    state.items.data_key = value
  },
  stop_key(state, value) {
    state.items.stop_key = value
  },
  jieshou(state, value) {
    state.items.jieshou = value
  },
  fasong(state, value) {
    state.items.fasong = value
  },
  rizhi(state, value) {
    state.items.rizhi = value
  },
  huanhang(state, value) {
    state.items.huanhang = value
  },
  zanting(state, value) {
    state.items.zanting = value
  },
  xunhuan(state, value) {
    state.items.xunhuan = value
  },
  ms(state, value) {
    state.items.ms = value
  },
  serialportarr(state, value) {
    state.items.serialportarr = value
  },
  open(state, value) {
    state.items.open = value
  },
  push(state, value) {
    state.items.push = value
  },
  zidong(state, value) {
    state.items.zidong = value
  },
  jsdata(state, value) {
    state.items.jsdata = value
  }
}

export default {
  namespaced: true,
  state,
  mutations
}