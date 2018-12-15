'use strict'

// import merge from 'lodash/merge'
// import cloneDeep from 'lodash/cloneDeep'
// import store from '../index'

const state = {
    all: 0,
    curr: 0
}

const getters = {
    percent: state => (((state.curr && state.curr / state.all * 100).toFixed(2)) || 0) + '%',
    isComplete: state => state.all > 0 && state.curr === state.all
}

// actions
const actions = {
}
const mutations = {
    setResourceAllNum (state, num) {
        state.all = num
    },
    incrementResource (state) {
        state.curr = state.curr + 1
        // console.log(src, image)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
