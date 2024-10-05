import requestAxios from "@/axios/request";
import store from '../index'

export default {
  namespaced: true,
  state() {
    return {
      requests: []
    }
  },
  mutations: {
    setRequests(state, requests) {
      state.requests = requests
    },
    addRequest(state, request) {
      state.requests.push(request)
    },
  },
  actions: {
    async create({commit, dispatch}, payload) {
      try {
        const token = store.getters["auth/token"]
        const {data} = await requestAxios.post(`/requests.json?auth=${token}`, payload)
        commit('addRequest', {...payload, id: data.name})
        dispatch('error/setMessage', {
          type: 'primary',
          text: 'Заявка успешно создана!'
        }, {root: true})
      } catch (error) {
        dispatch('error/setMessage', {
          type: 'danger',
          text: error.message
        }, {root: true})
      }
    },
    async loadData({commit, dispatch}) {
      try {
        const token = store.getters["auth/token"]
        const {data} = await requestAxios.get(`/requests.json?auth=${token}`)
        commit('setRequests', Object.keys(data).map(id => ({...data[id], id})))
      } catch (error) {
        dispatch('error/setMessage', {
          type: 'danger',
          text: error.message
        }, {root: true})
      }
    }
  },
  getters: {
    requests(state) {
      return state.requests
    }
  }
}