// import Layout from '@/views/layout/layout2'

const homeRouter = {
    path: '',
    name: 'home',
    // redirect: '/home',
    component: '/dashboard/index',
    icon: 'ios-speedometer',
    hide: true,
    layout: false
}

/**
 * 这里的结构与vue-router 的 routes 相似， 并且会根据路由的path去响应的目录加载视图
 * 也可以使用 `component` 自定义视图
 * menus 下的第一级节点 默认使用布局为 @/views/layout/layout 布局文件，可以使用layout = false 拒接使用布局，或者指定其他布局
 *
 * {
 *     path # 菜单的路径 不定义为 name
 *     name # 唯一值，作为router 的name属性，已经 iView menu菜单的name 属性
 *     icon # 菜单的icon  不填 则显示 textIcon
 *     textIcon: # 菜单的icon  不填 为标题题第一个字符  textIcon 与icon 优先显示 icon
 *     redirect： 有子菜单项的菜单 需要填写 redirect 属性，表示默认展示的子页面  不填默认为 `${path}/`
 *     child:  # 子菜单列表
 *     hide： 是否在页面中显示该菜单项
 *     expand: 默认为true， 如果有子菜单是否在侧边栏渲染成下级菜单
 *     component: # comment 为path 的拼接，当路径为空时 取 name
 * }
 */
const menus = [
    // { path: '404', name: 'error-404', hide: true, layout: false, component: 'errorPage/404'},
    // { path: '/401', name: 'error-401', hide: true},
    homeRouter,
    {
        name: 'pageTurning',
        path: 'page-turning',
        layout: false,
        child: [
            { name: 'page-turning-effect-bad', hide: true, path: 'bad' },
            { name: 'page-turning-effect-1', hide: true, path: 'pte1' },
            { name: 'page-turning-effect-2', hide: true, path: 'pte2' }
        ]
    }
    // {
    //     name: 'pages',
    //     icon: 'ios-aperture',
    //     redirect: '/pages/user/profile',
    //     hide: true,
    //     child: [
    //         {
    //             name: 'user',
    //             hide: true,
    //             expand: false,
    //             redirect: '/pages/user/profile',
    //             child: [
    //                 { name: 'profile', hide: true },
    //                 { name: 'settings', hide: true },
    //                 { name: 'security', hide: true }
    //             ]
    //         },
    //         // {name: 'change-email', hide: true,},
    //         // {name: 'bind-email', hide: true,},
    //         { name: 'about', hide: true },
    //         { name: 'help', hide: true },
    //         { name: 'changelog', hide: true }
    //         // {name: 'support', hide: true},
    //     ]
    // },
]

export default menus
export { homeRouter }
