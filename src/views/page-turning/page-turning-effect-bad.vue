<template>
    <div>
        <effect-1-1 :imagesUrl="imagesUrl"></effect-1-1>
        <effect-1-2 :imagesUrl="imagesUrl"></effect-1-2>
        <effect-1-3 :imagesUrl="imagesUrl"><p class="effect-desc">将原本使用js控制的动效，通过class 添加来控制，解决闪现问题</p></effect-1-3>
        <effect-1-4 :imagesUrl="imagesUrl"><p class="effect-desc">问题：左右交互滑动，出现鬼畜 <br>点击行为没有控制</p></effect-1-4>
    </div>
</template>

<script>

import image0 from './images/0.jpg'
import image1 from './images/1.jpg'
import image2 from './images/2.jpg'
import image3 from './images/3.jpg'
import image4 from './images/4.jpg'
import Effect11 from '@/views/page-turning/components/bad-effect-1-1'
import Effect12 from '@/views/page-turning/components/bad-effect-1-2'
import Effect13 from '@/views/page-turning/components/effect-1-3'
import Effect14 from '@/views/page-turning/components/bad-effect-1-4'

const imagesUrl = [image0, image1, image2, image3, image4]

export default {
    name: 'page-turning-effect-1',
    components: { Effect14, Effect12, Effect11, Effect13 },
    data () {
        return {
            imagesUrl
        }
    },
    computed: {},
    methods: {},
    mounted () {
        // let $sideNext = this.$refs.sideNext
    }
}
</script>

<style scoped lang="scss">

</style>
