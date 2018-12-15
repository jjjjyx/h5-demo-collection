<template>
    <div>
        <effect-1-3 :imagesUrl="imagesUrl"></effect-1-3>
        <effect-1-4 :imagesUrl="imagesUrl"></effect-1-4>
    </div>
</template>

<script>

import image0 from './images/0.jpg'
import image1 from './images/1.jpg'
import image2 from './images/2.jpg'
import image3 from './images/3.jpg'
import image4 from './images/4.jpg'
import Effect13 from '@/views/page-turning/components/effect-1-3'
import Effect14 from '@/views/page-turning/components/bad-effect-1-4'

const imagesUrl = [image0, image1, image2, image3, image4]

export default {
    name: 'page-turning-effect-1',
    components: { Effect13, Effect14 },
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
