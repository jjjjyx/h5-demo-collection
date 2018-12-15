'use strict'

import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import modules from './modules'
import { mutations } from './mutations.js'
import * as actions from './actions'
// import createPersistedState from 'vuex-persistedstate'
import { homeRouter } from '../router/menus'

Vue.use(Vuex)

const state = {
    // 全局
    dict: {},
    language: localStorage.getItem('local') || 'zh-CN',
    homeRouter
}
const getters = {}
const debug = process.env.NODE_ENV !== 'production'
// createPersistedState({
// filter: ({type}) => {
// return type !== 'APPEND_MEDIA'
// }
// })
const plugins = []

if (debug) {
    plugins.push(createLogger())
}
export default new Vuex.Store({
    strict: debug,
    actions,
    getters,
    state,
    mutations,
    modules,
    plugins
})
