<template>
  <view class="container">
    <view data-hi="Weixin1" @longpress="onLongPress" @tap="tapName">onLongPress</view>
    <view data-hi="Weixin2" @tap="tapName"> Click me! </view>
    <view data-hi="Weixin3" @click="clickName"> Click me! </view>
  </view>
</template>


<script>
  export default {
    data() {
      return {
      }
    },
    mounted() {
    },
    methods: {
      onLongPress(event) {
        console.log('-----onLongPress---------', event)
      },
      tapName(event) {
        console.log('------tapName--------', event)
      },
      clickName(event) {
        console.log('------clickName--------', event)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
</style>