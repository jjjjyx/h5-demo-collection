'use strict'

import Vue from 'vue'
import Router from 'vue-router'
// import iView from 'iview'

import Layout from '@/views/layout/layout'
import menus from './menus'
// import store from '@/store'
// import * as userApi from '../api/userApi'

Vue.use(Router)

function getMeta (item) {
    let meta = {
        ...item
    }
    delete meta.child
    return meta
}

function getComponent (c) {
    if (c === false) return null
    if (c && _.isString(c)) {
        return () => import('@/views' + c)
    } else if (c) {
        return c
    } else {
        return null
    }
}

// 将菜单转换成路由
function menuToRouter (menu, parent) {
    let path = menu.path === undefined ? menu.name : menu.path
    let componentPath = parent + '/' + menu.name
    let name = menu.name
    let meta = getMeta(menu)
    // let path = _path
    let result = {
        path,
        meta,
        name,
        component: () => import('@/views' + componentPath)
    }
    if (menu.child) {
        result.children = menu.child.map((item) => menuToRouter(item, componentPath))
        result.redirect = menu.redirect // || result.children[0].path
    }
    return result
}

let menusRouters = menus.map(function t (menu) {
    // 处理路径，定义的路径都是不带 / 的
    let _path = menu.path === undefined ? menu.name : menu.path
    let routerPath = _path ? '/' + _path : ''
    // 一级菜单需要重定向，填充默认重定向路径
    let redirect = menu.redirect || (routerPath + '/')
    let { layout, name } = menu
    let meta = getMeta(menu)

    let component = getComponent(menu.component) || (() => import('@/views' + redirect))
    let result = {
        path: routerPath, meta
    }

    if (menu.child) {
        result.children = menu.child.map((item) => menuToRouter(item, routerPath))
        result.name = name
    }

    if (layout === false) { // 不使用布局
        result.component = component
        result.name = name
        result.path = redirect
        console.log(result)
        return result
    }
    // 获取布局文件
    result.component = getComponent(layout) || Layout
    result.redirect = redirect
    result.children = result.children || [
        { path: redirect, name, meta, component }
    ]
    return result
})

let routes = [
    {
        path: '/404',
        component: () => import('@/views/errorPage/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/errorPage/401'),
        hidden: true
    },
    ...menusRouters,
    { path: '*', redirect: '/404', hidden: true }
]

// eslint-disable-next-line
async function isLogIn () {
    // let loginStatus = false
    // 判段用户实例是否存在或者过期
    // if (!store.getters.isLogin) {
    //     try {
    //         let data = await userApi.auth()
    //         store.commit('USER_SET_INFO', data)
    //         loginStatus = true
    //     } catch (e) {
    //         loginStatus = false
    //     }
    // } else {
    //     loginStatus = true
    // }
    return true // loginStatus
}

const router = new Router({
    // mode: 'history',
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    routes: routes
})
router.beforeEach(async function (to, from, next) {
    // iView.LoadingBar.start()
    // let auth = await isLogIn()
    //
    // let firstMatched = to.matched[0]
    // if (auth) { // 有登录
    //     if (firstMatched.name === 'sign') { // 访问的是登录相关的页面，直接调整到首页
    //         next({ path: '/' }) // 如果当前是从首页跳转来的， 不会触发 afterEach
    //         iView.LoadingBar.finish()
    //     } else { // 访问其他页面
    //         // todo 可加入权限判断
    //         next()
    //     }
    // } else {
    //     if (firstMatched.name === 'sign') { // 访问的是登录相关的页面，直接继续
    //         next()
    //     } else {
    //         next({ name: `sign_in`, query: { redirect: to.path } })
    //         iView.LoadingBar.finish()
    //     }
    //     // 没有登录
    // }

    next()
})

router.afterEach(function () {
    // iView.LoadingBar.finish()
})

export default router
export {
    routes
}
