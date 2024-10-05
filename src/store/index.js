import { createStore, createLogger } from 'vuex'
import auth from './modules/auth.module'
import error from './modules/error.module'
import request from './modules/request.module'
import sidebar from './modules/sidebar.module'

const plugins = []

if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export default createStore({
  plugins: plugins,
  modules: {
    auth, error, request, sidebar
  }
})
