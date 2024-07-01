import { createStore, createLogger } from 'vuex'
import teacher from './modules/Teacher'

// const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    teacher
  },
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})