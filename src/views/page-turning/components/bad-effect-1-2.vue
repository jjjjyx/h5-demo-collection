<template>
    <div>
        <h3 class="effect-title">点击翻页 - 实现二 </h3>
        <slot><p class="effect-desc">问题：左右互相翻页的时候， 元素闪现问题</p></slot>
        <div class="box" :style="currImageStyles" @click="turning" ref="box">
            <div  ref="effect" class="box__effect">
                <div class="box__side" :class="boxSideClasses" ref="side">
                    <span class="front box-inner" :style="currImageStyles"></span>
                    <span class="back box-inner" :style="imagesStyles"></span>
                </div>
                <div class="box__side" :style="imagesStyles"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { TransitionEventName } from '@/utils/common'
import { once } from '@/utils/dom'
import Mixin from './mixins'

export default {
    mixins: [Mixin],
    name: 'effect-1-2',
    components: {
        // boxInner: {
        //     functional: true,
        //     render (h, ctx) {
        //         let self = ctx.parent
        //         let side1 = <div>
        //         </div>
        //         return [
        //
        //         ]
        //     }
        // }
    },
    computed: {
        boxSideClasses () {
            return `box__side--${this.action}`
        },
        imagesStyles () {
            return this.action === 'next' ? this.nextImagesStyles : this.prevImagesStyles
        }
    },
    data () {
        return {
            action: 'prev',
            effectRunning: false
        }
    },
    methods: {
        turning (e) {
            if (this.effectRunning) return null
            let { offsetX } = e
            let width = this.$refs.box.clientWidth
            let $effect = this.$refs.effect
            let half = width / 2
            let tmpIndex
            let rotateY
            // $effect.style.visibility = 'hidden'
            if (offsetX > half) {
                // $effect.style.cssText = `left:${half}px;`
                $effect.style.left = `${half}px`
                tmpIndex = this.nextIndex
                rotateY = 'rotateY(-180deg)'
                this.action = 'next'
            } else {
                $effect.style.left = 0
                tmpIndex = this.prevIndex
                rotateY = 'rotateY(180deg)'
                this.action = 'prev'
            }
            // $effect.style.visibility = 'visible'

            this.effectRunning = true
            this.$nextTick(() => {
                let $side = this.$refs.side
                $side.style.transition = '1s transform ease'
                $side.style.transform = rotateY
                once($side, TransitionEventName, (e) => {
                    $side.style.transition = ''
                    $side.style.transform = ''
                    this.effectRunning = false
                    this.index = tmpIndex
                    // $effect.style.visibility = 'hidden'
                })
            })
            // this.showEffect()
            // this[go]()
        },
        showEffect () {},
        next () {
            // this.index++
            let $sideNext = this.$refs.sideNext
            let $sideNextEffect = this.$refs.sideNextEffect
            $sideNext.style.zIndex = 10
            $sideNextEffect.style.transition = '1s transform ease'
            $sideNextEffect.style.transform = 'rotateY(-180deg)'
            once($sideNextEffect, TransitionEventName, (e) => {
                $sideNext.style.zIndex = 0
                $sideNextEffect.style.transition = ''
                $sideNextEffect.style.transform = ''
                this.index = this.nextIndex
            })
        },
        prev () {
            let $sidePrev = this.$refs.sidePrev
            $sidePrev.style.zIndex = 10
            let $sidePrevEffect = this.$refs.sidePrevEffect
            $sidePrevEffect.style.transition = '1s transform ease'
            $sidePrevEffect.style.transform = 'rotateY(-180deg)'
            once($sidePrevEffect, TransitionEventName, (e) => {
                $sidePrev.style.zIndex = 0
                $sidePrevEffect.style.transition = ''
                $sidePrevEffect.style.transform = ''
                this.index = this.prevIndex
            })
        }
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
        /*visibility: hidden;*/
        pointer-events: none;
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
    .box__side--prev, .box__side--next {
        z-index: 2;
    }
    .box__side--prev {
        transform-style: preserve-3d;
        transform-origin: right center;
        .front {
            background-position: left;
        }
        .back {
            background-position: right;
        }
        & +.box__side {
            background-position: left;
        }
    }

</style>
