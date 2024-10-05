export default {
  namespaced: true,
  state() {
    return {
      sidebar: false
    }
  },
  mutations: {
    openSidebar(state) {
      state.sidebar = true
    },
    closeSidebar(state) {
      state.sidebar = false
    }
  }
}