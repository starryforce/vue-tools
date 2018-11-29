export const state = {
  memberSigning: {},
}

export const getters = {}

export const mutations = {
  SELECT_MEMBER(state, newMember) {
    state.memberSigning = newMember
  },
  CLEAR_MEMBER(state) {
    state.memberSigning = {}
  },
}

export const actions = {
  selectMember({ commit }, newMember = {}) {
    commit('SELECT_MEMBER', newMember)
  },
  clearMember({ commit }) {
    commit('CLEAR_MEMBER')
  },
}
