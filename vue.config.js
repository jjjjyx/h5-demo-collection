const path = require('path')
const webpack = require('webpack')
function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    chainWebpack: (config) => {
        // config.resolve.alias.set('@view', resolve('src/view'))
        config.resolve.alias.set('@', resolve('src'))
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                '_': path.resolve(__dirname, './src/utils/lodash.js')
            })
            // new webpack.ProvidePlugin({
            //     '$': path.resolve(__dirname, './src/utils/dom.js')
            // })
        ]
    },
    css: {
        loaderOptions: {
            sass: {
                data: '@import "@/assets/sass/base.scss";'
            }
        }
    },
    lintOnSave: undefined,
    runtimeCompiler: undefined,
    productionSourceMap: false
}
