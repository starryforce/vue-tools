export const state = {
  cart: [],
  baskets: [],
}

export const getters = {
  // 购物车中的商品数量根据 skuId 获取
  cartItemQuantity: state => skuId => {
    const item = state.cart.find(item => skuId === item.skuId)
    return item ? item.quantity : 0
  },
  cartTotalPrice(state) {
    return state.cart.reduce((accumulator, current) => {
      return accumulator + current.quantity * current.itemPrice
    }, 0)
  },
  totalQuantity(state) {
    return state.cart.reduce((accumulator, current) => {
      return accumulator + current.quantity
    }, 0)
  },
  tempCart(state) {
    return state.cart.map(item => ({
      goodsId: item.skuId,
      num: item.quantity,
      isChecked: true,
      product: item,
    }))
  },
}

export const mutations = {
  // 如果商品已经存在，则修改其数量
  // 如果商品不存在，则新增该商品
  // 如果商品数量为 0，则将其从购物车中移除
  UPDATE_ITEM(state, { itemInfo, quantity }) {
    const isExist = state.cart.find(item => itemInfo.skuId === item.skuId)
    if (!isExist) {
      state.cart.push(Object.assign(itemInfo, { quantity: quantity }))
    } else {
      const index = state.cart.findIndex(item => itemInfo.skuId === item.skuId)
      state.cart.splice(
        index,
        1,
        Object.assign({}, itemInfo, { quantity: quantity })
      )
    }
  },
  CLEAR_CART(state) {
    state.cart = []
  },
  PUSH_BASKET(state) {
    state.baskets.push(
      Object.assign({}, { items: state.cart, basketID: Date.now() })
    )
  },
  REMOVE_BASKET(state, basket) {
    const index = state.baskets.findIndex(
      item => item.basketID === basket.basketID
    )
    state.baskets.splice(index, 1)
  },
  POP_BASKET(state, basket) {
    const index = state.baskets.findIndex(
      item => item.basketID === basket.basketID
    )
    state.cart = state.baskets[index].items
    state.baskets.splice(index, 1)
  },
}

export const actions = {
  updateItem({ commit }, { itemInfo, quantity }) {
    commit('UPDATE_ITEM', { itemInfo, quantity })
  },
  clearCart({ commit }) {
    commit('CLEAR_CART')
  },
  pushBasket({ commit }) {
    commit('PUSH_BASKET')
    commit('CLEAR_CART')
  },
  popBasket({ commit }, basket) {
    commit('POP_BASKET', basket)
  },
}
