<template>
  <view class="test-btn">
    <button class="button mark-sm">dsdd</button>
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
      switchTab() {
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  .test-btn {
    position: relative;
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