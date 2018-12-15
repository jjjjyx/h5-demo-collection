import transfer from './transfer-dom'
import ClickOutside from './clickoutside'
import Touch from './touch'

export default function install (Vue) {
    Vue.directive('transfer-dom', transfer)
    Vue.directive('click-outside', ClickOutside)
    Vue.directive('touch', Touch)
}
