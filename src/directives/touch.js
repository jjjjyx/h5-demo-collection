import { off, on, once } from '@/utils/dom'

const isTouch = 'ontouchstart' in window
const mouseEvents = isTouch ? {
    down: 'touchstart',
    move: 'touchmove',
    up: 'touchend',
    over: 'touchstart',
    out: 'touchend'
} : { down: 'mousedown', move: 'mousemove', up: 'mouseup', over: 'mouseover', out: 'mouseout' }

class Touch {
    constructor (el, binding) {
        this.$el = el
        this.dragData = {
            x: null,
            y: null,
            dragX: null,
            dragY: null,
            dragging: false
        }
        this.$$initEvent()
        this.putEvent(binding)
    }

    $$initEvent () {
        // on(this.$el, mouseEvents.down, this.handleMoveStart.bind(this))
    }

    $$destroy () {
        off(this.$el, mouseEvents.down, this.handleMoveStart.bind(this))
        // off(this.$el, mouseEvents.move, this.$$move)
        // off(this.$el, mouseEvents.up, this.$$end)
    }

    putEvent (binding) {
        console.log('putEvent', binding)
    }

    handleMoveStart (e) {
        let { clientX, clientY } = e
        this.dragData.dragX = clientX
        this.dragData.dragY = clientY
        this.dragData.dragging = true

        on(this.$el, mouseEvents.move, this.handleMoving.bind(this))
        once(this.$el, mouseEvents.up, this.handleMoveEnd.bind(this))
    }
    getDistance (px1, py1, px2, py2) {
        let dx = px1 - px2
        let dy = py1 - py2
        return Math.sqrt(dx * dx + dy * dy)
    }

    handleMoving (e) {
        if (!this.dragData.dragging) return false
        // let { clientX, clientY } = e
        // let upPosition = this.getDistance(this.dragData.dragX, this.dragData.dragY, clientX, clientY)
        console.log('========= handleMoving')
        // let v = utils.getDistance(this.downPosition, upPosition).length()

        // let diffDistance =
    }

    handleMoveEnd (e) {
        console.log('$$end', e)
        off(this.$el, mouseEvents.move, this.handleMoving.bind(this))
    }
}

export default {
    bind (el, binding, vnode) {
        // console.log('ontouchstart' in window)
        // console.log(el)
        // console.log(binding)
        // console.log(vnode)
        if (!el.__bind_touch) {
            el.__bind_touch = new Touch(el, binding)
        } else {
            el.__bind_touch.putEvent(binding)
        }
    },
    unbind (el) {
        el.__bind_touch.$$destroy()
        el.__bind_touch = null
    }
}
