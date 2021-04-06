<template>
  <view class="content">
    <view class="mark-box"></view>
    <view class="test">ww</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Hello'
      }
    },
    onLoad() {

    },
    methods: {

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  .mark-box {
    height: 100rpx;
    width: 100rpx;
    margin-top: 100rpx;
    background: #D6D4D4;
    position: relative;
  }
  .mark-box:after {
    content: " ";
    @include round(15);
    display: inline-block;
    @include absolute(-8, -8, right);
    background: $red;
    animation: flash 1s linear infinite;
  }
  @keyframes flash {
    0%{
      transform: scale(1);
    }
    25%{
      transform: scale(0.9);
    }
    50%{
      transform: scale(0.7);
    }
    75%{
      transform: scale(0.9);
    }
    100%{
      transform: scale(1);
    }
  }
</style>
