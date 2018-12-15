import store from '@/store'

const images = require.context('../views/', true, /\.(jpg|png|jpeg|gif)$/i)
// console.log(123)
const promises = images.keys().map((item) => {
    console.log(item)
    item = item.substring(2)
    return import('../views/' + item)
})

Promise.all(promises).then((modules) => {
    // 设置总量
    // 然后不断更新进度
    // store.commit('setResourceAllNum', modules.length)
    modules.forEach((module) => {
        // console.log(module.default)
        let src = module.default
        let image = new Image()
        image.src = src
        image.onload = function onload () {
            // console.log(this)
            // 测试使用的延迟效果 不用请关闭
            // setTimeout(()=> {
            store.commit('incrementResource', { src, image: this })
            // }, ~~(Math.random() * 1000))
        }
    })
})
