import axios from "axios"
import {defineError} from "@/utils/error.util"

const TOKEN_KEY = "token"
const API_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.VUE_APP_FB_KEY}`

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem(TOKEN_KEY)
    }
  },
  getters: {
    token(state) {
      return state.token
    },
    isAuthenticated(_, getters) {
      return !!getters.token
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    logout(state) {
      state.token = null
      localStorage.removeItem(TOKEN_KEY)
    }
  },
  actions: {
    async login({commit, dispatch}, payload) {
      try {
        const {data} = await axios.post(API_URL, {...payload, returnSecureToken: true})
        commit('setToken', data.idToken)
        commit('error/clearMessage', null, {root: true})
      } catch (error) {
        dispatch('error/setMessage', {
          type: 'danger',
          text: defineError(error)
        }, {root: true})
        throw new Error(error)
      }
    }
  }
}