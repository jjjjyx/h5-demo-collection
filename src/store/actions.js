// export function setBreadCrumb ({commit, state}, routeMetched) {
//     // commit('')
//     // diff.forEach((key) => {
//     //     // 也许默认分类的这个东西就不该放在 全局设置
//     //     SITE[key] = req.body[key]
//     //
//     // })
// }
export function setLanguage ({ commit }, language) {
    commit('SET_LANGUAGE', language)
}
