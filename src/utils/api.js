'use strict'
// import i18n from '../lang'
import config from '@/config'

const { api_server: server, token_key: tokenKey, token_prefix: tokenPrefix } = config

/* eslint-disable */
const stringifyPrimitive = function (v) {
    switch (typeof v) {
    case 'string':
        return v
    case 'boolean':
        return v ? 'true' : 'false'
    case 'number':
        return isFinite(v) ? v : ''
    default:
        return ''
    }
}

function encode (obj, sep = '&', eq = '=', name) {
    if (obj === null) {
        obj = undefined
    }

    if (typeof obj === 'object') {
        return Object.keys(obj).map(function (k) {
            var ks = encodeURIComponent(stringifyPrimitive(k)) + eq
            if (Array.isArray(obj[k])) {
                if (!obj[k].length) return ks
                return obj[k].map(function (v) {
                    return ks + encodeURIComponent(stringifyPrimitive(v))
                }).join(sep)
            } else if (obj[k] instanceof Date) {
                return ks + encodeURIComponent(obj[k])
            } else {
                return ks + encodeURIComponent(stringifyPrimitive(obj[k]))
            }
        }).join(sep)

    }

    if (!name) return ''
    return encodeURIComponent(stringifyPrimitive(name)) + eq +
        encodeURIComponent(stringifyPrimitive(obj))
}

class HttpBaseError extends Error {
    constructor (message, code, data) {
        super()
        this.name = 'HttpBaseError'
        this.code = code
        this.data = data
        this.message = message
        // console.log(this.message)
        Error.captureStackTrace(this, this.constructor)
    }
}

class AuthInvalidError extends HttpBaseError {
    constructor () {
        super('尚未登录', 401)
        this.name = 'AuthInvalidError'
    }
}

// const RespStatusMap = {
// 	401: '尚未登录',
// 	403: '尚未登录',
// 	404: '(～￣▽￣)～ ，404 了呢',
// 	429: '(～￣▽￣)～ ，服务器繁忙，稍后重试',
// 	500: '(～￣▽￣)～ ，服务器出错了'
// }


const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
}

let token
if (localStorage.getItem(tokenKey)) {
    token = prefixToken(localStorage.getItem(tokenKey))
}

function prefixToken (token) {
    return tokenPrefix ? tokenPrefix + token : token
}

function do_fetch (url, method, data, header = {}) {
    const headers = Object.assign({}, defaultHeaders, header)
    if (token) {
        headers[tokenKey] = token
    }
    let fetchParams = {
        method: method,
        // mode: 'cors',
        // credentials: 'include',
        headers
    }

    if (data) {
        if (method === 'GET') url += `?${encode(data)}`
        if (method === 'POST') fetchParams.body = encode(data)
    }
    return fetch(url, fetchParams)
}

function get (url, data, header) {
    return do_fetch(url, 'GET', data, header)
}

function post (url, data, header) {
    return do_fetch(url, 'POST', data, header)
}

//
const CODE = {
    // # 10 - WEB连接情况组
    100000: 'SUCCESS',
    100010: 'FAILED',
    100020: 'UNKNOWN_ERROR',
    100030: 'SERVICE_UNAVAILABLE',
    100040: 'INVALID_REQUEST',
    100050: 'LOCKED',
    100060: 'CONNET_SUCCESS',
    100070: 'CONNET_FAILED',
    100080: 'INVALID_PARAMETERS',

    // # 11 - 数据验证组
    110000: 'ACCESS_DENIED',
    110010: 'INVALID_CLIENT',
    110020: 'UNIQUE_CONSTRAINT',
    110030: 'INVALID_GRANT',
    110040: 'TOKEN_INVALID',
    110050: 'VERIFYCODE_ERROR',
    110060: 'REGISTER_CLOSE'
}

const handle = async function (resp) {
    if (resp.ok) {
        let { code, data, msg } = await resp.json()
        // console.log({code, data, msg})
        // msg = i18n.t('code.' + CODE[code])
        if (code === 0) {
            return data || msg
        } else {
            throw new HttpBaseError(msg, code, data)
        }
    } else {
        throw new HttpBaseError('请求失败')
    }
}

async function nget (url, info, header) {
    let resp
    try {
        resp = await get(server + url, info, header)
    } catch (e) {
        throw new HttpBaseError('(～￣▽￣)～ ，url 地址不正确呢')
    }
    return await handle(resp)
}

async function npost (url, info, header) {
    let resp
    try {
        resp = await post(server + url, info, header)
    } catch (e) {
        throw new HttpBaseError('(～￣▽￣)～ ，url 地址不正确呢')
    }
    return await handle(resp)
}

export default {
    npost,
    nget,
    get,
    post,
    set token (value) {
        console.log('更新用户token')
        // token = 'Bearer ' + value
        token = prefixToken(value)
        localStorage.setItem(tokenKey, value)
    },
    get token () {
        return token
    }
}

export {
    HttpBaseError
}