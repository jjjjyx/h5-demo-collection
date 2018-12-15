<template>
    <div>
        <h3 class="effect-title">点击翻页 - 实现一</h3>
        <slot><p class="effect-desc">问题：不可回翻</p></slot>
        <div class="box" :style="currImageStyles">
            <div class="box-side box-side-1" @click="next" ref="sideNext">
                <span class="box-inner__front box-inner" :style="currImageStyles"></span>
                <span class="box-inner__back box-inner" :style="nextImagesStyles"></span>
            </div>
            <div class="box-side box-side-2" :style="nextImagesStyles"></div>
        </div>
    </div>
</template>

<script>
import { TransitionEventName } from '@/utils/common'
import { once } from '@/utils/dom'

import Mixin from './mixins'

export default {
    mixins: [Mixin],
    name: 'effect-1-1',
    data () {
        return {
        }
    },
    methods: {
        next () {
            // this.index++
            let $sideNext = this.$refs.sideNext
            $sideNext.style.transition = '1s transform ease'
            $sideNext.style.transform = 'rotateY(-180deg)'
            once($sideNext, TransitionEventName, (e) => {
                $sideNext.style.transition = ''
                $sideNext.style.transform = ''
                this.index = this.nextIndex
            })
        }
    },
    mounted () {
        // let $sideNext = this.$refs.sideNext
    }
}
</script>

<style scoped lang="scss">
    .box {
        /*background-image: url("./images/0.jpg");*/
        background: no-repeat right;
        background-size: 100%;
        width: 100%;
        height: 150px;
        position: relative;
        perspective: 1200px;
    }

    .box-inner {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-size: 200%;
        background-repeat: no-repeat;
    }

    .box-inner__front {
        background-position: right;
        transform: translateZ(1.1px);
    }

    .box-inner__back {
        background-position: left;
        transform: scale(-1, 1);

    }

    .box-side {
        position: absolute;
        top: 0;
        width: 50%;
        right: 0;
        height: 100%;
        background: no-repeat right;
        background-size: 200%;
    }

    .box-side-1 {
        z-index: 2;
        transform-style: preserve-3d;
        transform-origin: left center;
        /*transition: 1s all ease;*/
    }

    .box-side-2 {
        z-index: 1;
        /*background: no-repeat right;*/
    }
</style>
