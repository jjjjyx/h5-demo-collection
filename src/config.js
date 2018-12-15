'use strict'

const CONFIG = {}

try {
    let pri = require('./private.js')
    _.merge(CONFIG, pri)
    // console.debug('Loading private configuration:', JSON.stringify(pri))
} catch (e) {
    // console.info('Failed to load private configuration!')
}

export default CONFIG
