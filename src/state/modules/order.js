export const state = {
  selectedMember: {},
}

export const getters = {}

export const mutations = {
  SELECT_MEMBER(state, member) {
    state.selectedMember = member
  },
  CLEAR_MEMBER(state) {
    state.selectedMember = {}
  },
}

export const actions = {
  selectMember({ commit }, member) {
    commit('SELECT_MEMBER', member)
  },
  clearMember({ commit }) {
    commit('CLEAR_MEMBER')
  },
}
