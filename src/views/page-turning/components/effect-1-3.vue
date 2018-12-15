<template>
    <div>
        <h3 class="effect-title">点击翻页</h3>
        <slot></slot>
        <div class="box" :style="currImageStyles" @click="turning" ref="box" @mousemove="handleMouseMove">
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
    name: 'effect-1-3',
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
            boxWidth: ''
        }
    },
    methods: {
        handleMouseMove (e) {
            // if (this.effectRunning) return null
            // let { offsetX } = e
            // let width = this.$refs.box.clientWidth
            // let half = width / 2
            // if (offsetX > half) {
            //     this.action = 'next'
            // } else {
            //     this.action = 'prev'
            // }
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
        transform: rotateY(-180deg);
    }
    .box__effect--prev {
        .box__side--turning {
            transform: rotateY(180deg);
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
    /*.box__side--prev, .box__side--next {*/
        /*z-index: 2;*/
    /*}*/
    /*.box__side--prev {*/
        /*transform-style: preserve-3d;*/
        /*transform-origin: right center;*/
        /*.front {*/
            /*background-position: left;*/
        /*}*/
        /*.back {*/
            /*background-position: right;*/
        /*}*/
        /*& +.box__side {*/
            /*background-position: left;*/
        /*}*/
    /*}*/

</style>
