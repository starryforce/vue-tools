export const state = {
  spinner: false,
}

export const getters = {}

export const mutations = {
  TRIGGER_SPINNER(state, newValue) {
    state.spinner = newValue
  },
}

export const actions = {
  show_spinner({ commit }) {
    commit('TRIGGER_SPINNER', true)
  },
  hide_spinner({ commit }, newValue) {
    commit('TRIGGER_SPINNER', false)
  },
}
