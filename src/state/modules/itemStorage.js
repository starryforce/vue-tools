export const state = {
  cart: [],
  selectedMember: {},
  selectedAddress: {},
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
}

export const mutations = {
  // 如果商品已经存在，则修改其数量
  // 如果商品不存在，则新增该商品
  // 如果商品数量为 0，则将其从购物车中移除
  UPDATE_ITEM(state, { itemInfo, quantity }) {
    if (state.cart[0]) {
      const cartIsOversea = state.cart[0].isOversea
      const itemIsOversea = itemInfo.isOversea
      if (cartIsOversea !== itemIsOversea) {
        return cartIsOversea ? 'oversea' : 'common'
      }
    }
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
      Object.assign(
        {},
        {
          items: state.cart,
          basketID: Date.now(),
          member: state.selectedMember,
        }
      )
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
    state.selectedMember = state.baskets[index].member
    state.baskets.splice(index, 1)
  },
  SELECT_MEMBER(state, member) {
    state.selectedMember = member
  },
  SELECT_ADDRESS(state, address) {
    state.selectedAddress = address
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
  selectMember({ commit }, member) {
    commit('SELECT_MEMBER', member)
  },
  selectAddress({ commit }, address) {
    commit('SELECT_ADDRESS', address)
  },
}
