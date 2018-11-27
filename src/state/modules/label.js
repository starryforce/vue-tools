export const state = {
  memberListBinding: [],
}

export const getters = {}

export const mutations = {
  ADD_MEMBER(state, newMember) {
    if (state.memberListBinding.every(element => element.id !== newMember.id)) {
      state.memberListBinding.push(newMember)
    } else {
      // console.log('duplicate')
    }
  },
  CLEAR_MEMBER_LIST(state) {
    state.memberListBinding = []
  },
}

export const actions = {
  addMember({ commit }, newMember = {}) {
    commit('ADD_MEMBER', newMember)
  },
  clearMemberList({ commit }) {
    commit('CLEAR_MEMBER_LIST')
  },
}
