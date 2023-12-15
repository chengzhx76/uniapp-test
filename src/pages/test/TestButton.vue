<template>
  <view class="test-btn">
    <button class="button mark-sm" @click="onThrottle">throttle</button>
    <button class="button mark-sm" @click="onDebounce">debounce</button>
  </view>
</template>   

<script>
  import { throttle, debounce } from '@/util'
  export default {
    data() {
      return {
      }
    },
    mounted() {
    },
    methods: {
      onThrottle: throttle(_ => {
        console.log('throttle=====>')
      }),
      onDebounce: debounce(_ => {
        console.log('debounce=====>')
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  .test-btn {
    position: relative;
    margin-top: 200rpx;
  }
  .button {
    // @include height-rpx-width-percent(100);
    @include height-line(100);
    @include button;
    position: relative;
    // line-height: 100rpx;
    text-align: left;
    font-size: 36rpx;
    color: $titleColor;
    text-indent: 30rpx;
    // display: inline-block;
    // padding-right: 27rpx;
    background: $white;
    margin-top: 10rpx;;
  }
  .mark-sm::after {
    @include absolute(15, 15, right);
    content: " ";
    display: inline-block;
    @include height-width(25);
    @include border-radius(25);
    background: $red;
    left: auto;
  }
</style>