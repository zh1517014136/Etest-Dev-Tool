const state = () => ({
  items: [

  ],
  select: 0
})

const mutations = {
  items(state, value) {
    var arr = []
    state.items.map((item,i)=>{
     if(item.name==value.name){
       arr.push(true)
     }else{
       arr.push(false)
     }
    })
    if(arr.indexOf(true)==-1){
      state.items.push(value)
    }
    console.log(state.items)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}