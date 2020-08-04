const state = () => ({

    icon:'',
    color:undefined,
    input:'',
    sort:false
  
  })
  
  const mutations = {
    icon(state,value){
      state.icon=value
    },
    color(state,value){
      state.color=value
    },
    input(state,value){
      state.input=value==null?"":value
    },
    sort(state,value){
      state.sort=value
    },
  }
  
  export default {
      namespaced: true,
      state,
      mutations
  }