// initial state
export const state = {
  goods: [],
  /*
  {
    num: 1,
    goodsId: 1,
    isChecked: true,
    product: {
      name: 'aitm',
    },
  },
  */
  stack: [
    //     {
    //     user: {},
    //     cart: []
    // }
  ],
}

// getters
export const getters = {
  // checkedGoods(state) {
  //   return state.goods.filter(item => item.isChecked)
  // },
  // checkedNum(state) {
  //   var sum = 0
  //   state.goods.forEach(item => (sum += item.isChecked ? item.num : 0))
  //   return sum
  // },
  // totalNum(state) {
  //   var sum = 0
  //   state.goods.forEach(item => (sum += item.num))
  //   return sum
  // },
  // checkedMoney(state) {
  //   var sum = 0
  //   state.goods.forEach(
  //     item => (sum += item.isChecked ? item.num * item.product.price : 0)
  //   )
  //   return sum
  // },
  // totalMoney(state) {
  //   var sum = 0
  //   state.goods.forEach(item => (sum += item.num * item.product.price))
  //   return sum
  // },
  // hasCommercial(state) {
  //   return state.goods.some(item => item.isChecked && item.product.isCommercial)
  // },
}

// actions
export const actions = {}

// mutations
export const mutations = {
  setCart(state, array) {
    state.goods = Object.assign([], array)
  },
  addCart(state, product) {
    var newShopping = {
      num: 1,
      goodsId: 0,
      isChecked: true,
      product: {},
    }
    var res = state.goods.filter(item => item.goodsId === product.id)
    if (res[0]) {
      res[0].num++
      res[0].isChecked = true
    } else {
      newShopping.product = product
      newShopping.goodsId = newShopping.product.id
      state.goods.push(newShopping)
    }
  },
  remove(state, array) {},
  modify(state, item) {},
  clearChecked(state) {
    state.goods = state.goods.filter(item => !item.isChecked)
  },
  clearAll(state) {
    state.goods = Object.assign([])
  },
}

// export default {
//     state,
//     getters,
//     actions,
//     mutations
// }
