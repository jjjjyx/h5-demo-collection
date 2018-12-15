<template>
    <div>
        <h3 class="effect-title">拖动翻页</h3>
        <slot></slot>
        <div class="box" :style="currImageStyles" ref="box" @touchstart="handlerMoveStart" @touchmove="handlerMoving" @touchend="handlerMoveEnd">
            <div  ref="effect" class="box__effect" :class="boxSideClasses">
                <div class="box__side box__side--1" ref="side">
                    <span class="front box-inner" :style="currImageStyles"></span>
                    <span class="back box-inner" :style="imagesStyles"></span>
                </div>
                <div class="box__side box__side--2" :style="imagesStyles"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { TransitionEventName } from '@/utils/common'
import { once, addClass, removeClass } from '@/utils/dom'
import Mixin from './mixins'
export default {
    mixins: [Mixin],
    name: 'effect-1-4',
    computed: {
        boxSideClasses () {
            return `box__effect--${this.action}`
        },
        imagesStyles () {
            return this.action === 'next' ? this.nextImagesStyles : this.prevImagesStyles
        }
    },
    data () {
        return {
            action: 'prev',
            effectRunning: false,
            touchData: {
                startX: null,
                startY: null,
                dragging: false
            }
        }
    },
    methods: {
        handlerMoveStart (e) {
            let { clientX, clientY } = e.touches[0]
            this.touchData.startX = clientX
            this.touchData.startY = clientY
            this.touchData.dragging = true
        },
        getDistance (px1, py1, px2, py2) {
            let dx = px1 - px2
            let dy = py1 - py2
            // return Math.sqrt(dx * dx + dy * dy)
            return [dx, dy]
        },
        handlerMoving (e) {
            if (!this.touchData.dragging) return
            // console.log('handlerMoving')
            let { clientX, clientY } = e.touches[0]
            // console.log(this.touchData, { clientX, clientY })
            let [dx, dy] = this.getDistance(this.touchData.startX, this.touchData.startY, clientX, clientY)
            let rotate
            if (dx > 0) { // 左滑应该向后翻页
                this.action = 'next'
                rotate = -1
            } else if (dx < 0) { // 向右滑 应该向前翻页
                this.action = 'prev'
                rotate = 1
            }
            // 判断效果开始
            let distance = Math.sqrt(dx * dx + dy * dy)
            if (distance > 10) { // 移动距离超过 10
                this.$nextTick(() => {
                    let $side = this.$refs.side
                    $side.style.transform = `rotateY(${rotate * distance}deg)`
                })
            }
        },
        handlerMoveEnd () {
            if (!this.touchData.dragging) return
            this.touchData.dragging = false
            let $side = this.$refs.side
            $side.removeAttribute('style')
            addClass($side, 'box__side--turning')
            let tmpIndex = this.action === 'next' ? this.nextIndex : this.prevIndex
            once($side, TransitionEventName, (e) => {
                // $side.style.transition = ''
                $side.style.transform = ''
                removeClass($side, 'box__side--turning')
                this.index = tmpIndex
                // $effect.style.visibility = 'hidden'
            })
        },
        turning (e) {
            if (this.effectRunning) return null
            this.effectRunning = true
            let { offsetX } = e
            let width = this.$refs.box.clientWidth
            let half = width / 2
            let tmpIndex
            // $effect.style.visibility = 'hidden'
            if (offsetX > half) {
                // $effect.style.cssText = `left:${half}px;`
                // $effect.style.left = `${half}px`
                tmpIndex = this.nextIndex
                // rotateY = 'rotateY(-180deg)'
                this.action = 'next'
            } else {
                // $effect.style.left = 0
                tmpIndex = this.prevIndex
                // rotateY = 'rotateY(180deg)'
                this.action = 'prev'
            }
            // $effect.style.visibility = 'visible'
            this.$nextTick(() => {
                let $side = this.$refs.side
                // $side.style.transition = '1s transform ease'
                // $side.style.transform = rotateY
                addClass($side, 'box__side--turning')
                once($side, TransitionEventName, (e) => {
                    // $side.style.transition = ''
                    // $side.style.transform = ''
                    removeClass($side, 'box__side--turning')
                    this.index = tmpIndex
                    this.effectRunning = false
                    // $effect.style.visibility = 'hidden'
                })
            })
        }
    },
    mounted () {
    }
}
</script>

<style scoped lang="scss">
    .box {
        background: no-repeat right;
        background-size: 100%;
        width: 100%;
        height: 150px;
        position: relative;
        perspective: 1200px;
    }
    .box__effect {
        position: absolute;
        top: 0;
        width: 50%;
        height: 100%;
        left: 0;
        /*visibility: hidden;*/
        pointer-events: none;
    }
    .box__side--1 {
        z-index: 2;
    }
    .box__effect--prev {
        .box__side--1 {
            transform-style: preserve-3d;
            transform-origin: right center;
        }
        .box__side--2 {
            background-position: left;
        }
        .front {
            background-position: left;
        }
        .back {
            background-position: right;
        }
    }
    .box__effect--next {
        left: 50%;
    }

    .box__side {
        position: absolute;
        top: 0;
        width: 100%;
        right: 0;
        height: 100%;
        background: no-repeat right;
        background-size: 200%;
        transform-style: preserve-3d;
        transform-origin: left center;
    }
    .box__side--turning {
        transition: 1s transform ease;
        transform: rotateY(-180deg)!important;
    }
    .box__effect--prev {
        .box__side--turning {
            transform: rotateY(180deg) !important;
        }
    }
    .box-inner {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: no-repeat right;
        background-size: 200%;
    }
    .front {
        background-position: right;
        transform: translateZ(1.1px);
        z-index: 2;
    }

    .back {
        background-position: left;
        transform: scale(-1, 1);
    }
</style>
