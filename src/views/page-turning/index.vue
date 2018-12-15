<template>
    <div class="page-turning-warp">
        <ul>
            <li>
                <router-link :to="{name: 'page-turning-effect-1'}">效果一</router-link>
            </li>
            <li>
                <router-link :to="{name: 'page-turning-effect-2'}">效果二</router-link>
            </li>
            <li>
                <router-link :to="{name: 'page-turning-effect-bad'}">错误示范</router-link>
            </li>
        </ul>
        <router-view class="page-turning-body"></router-view>
    </div>
</template>

<script>
export default {
    name: 'index'
}
</script>

<style scoped lang="scss">
    ul {
        list-style-type: none;
        padding: 0 0 1em;
        text-align: center;
        margin-bottom: 0;
        border-bottom: 1px solid $border-color;
        flex-shrink: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    .page-turning-warp {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .page-turning-body {
        height: 100%;
        overflow-y: auto;
    }
</style>
