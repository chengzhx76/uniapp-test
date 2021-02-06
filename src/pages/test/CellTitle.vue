<template>
  <view class="cell-title">
    <view class="title">
      <view class="icon">
        <text class="fa gray-icon fa-user"/>
      </view>
      <view class="centent">哈哈</view>
      <view class="handler">
        <switch @change="moreSwitchState" color="#76ABEF"/>
      </view>
    </view>
    <view class="tips">呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵呵</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      moreSwitchState(val) {
        console.log(val)
      }
    },
    mounted() {
      
    },
    created() {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  .cell-title {
    width: 100%;
    @include border(top);
    @include border(bottom);
    padding: 10rpx 0;
    background-color: $white;
  }
  .title {
    width: 100%;
    @include align;
    // background-color: #FAEBEB;
    .icon {
      @include height-width(90);
      @include justify-align;
    }
    .centent {
      width: calc(100% - 180rpx);
      @include height-line(90);
      font-size: 36rpx;
      color: $titleColor;
      @include over-hidden;
      // background-color: #F5D1F7;
    }
    .handler {
      width: 180rpx;
      @include justify-align;
    }
  }

  .tips {
    padding: 0 10rpx 15rpx 30rpx;
    font-size: 32rpx;
    color: $tipColor;
    // background-color: #E2FCFF;
  }

</style>