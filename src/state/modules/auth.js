export const state = {
  storeId: '',
  token: '',
}

export const getters = {}

export const mutations = {
  SET_AUTH(state, authInfo) {
    state.storeId = authInfo.storeId
    state.token = authInfo.token
  },
}

export const actions = {
  setAuth({ commit }, authInfo) {
    commit('SET_AUTH', authInfo)
  },
}
