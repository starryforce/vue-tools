export const state = {
  orderSelector: false,
}

export const getters = {}

export const mutations = {
  TRIGGER_ORDER_SELECTOR(state, newValue) {
    state.orderSelector = !state.orderSelector
  },
}

export const actions = {
  triggerOrderSelector({ commit }) {
    commit('TRIGGER_ORDER_SELECTOR')
  },
}
