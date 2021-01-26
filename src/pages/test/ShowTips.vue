<template>
  <view class="container">
    <view class="box">
      <view class="content" @longpress="onLongPress('11')">
        
      </view>
      <view class="tips" v-if="showTips" @click="deleted('11')">删除</view>
    </view>
  </view>
</template>


<script>
  export default {
    data() {
      return {
        showTips: false
      }
    },
    mounted() {
    },
    methods: {
      onLongPress(id) {
        console.log(id)
        this.showTips = true
      },
      deleted(id) {
        this.showTips = false
      }
    }
  }
</script>
<!-- https://www.cnblogs.com/lvhw/p/7589081.html -->
<!-- http://www.javanx.cn/20180928/css-tips/ -->
<!-- 阴影好文章： https://www.html.cn/archives/9360/ -->
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  .container {
    @include height-width-percent(50%);
    @include justify-align;
  }
  .box {
    // @include height-width(260);
    @include justify-align;
    background-color: #CFCBFC;
    position: relative;
    .content {
      @include height-width(120);
      background-color: #FAE5E5;
    }
    .tips {
      // @include height-width(60, 300);
      @include border($color: #4C4C4C)
      font-size: 28rpx;
      color: #fff;
      border-radius: 10rpx;
      position: absolute;
      left: 50%;
      bottom: 100%;
      margin-bottom: 24rpx;
      transform: translateX(-50%);
      padding: 25rpx 35rpx;
      white-space: nowrap;
      background-color: #4C4C4C;
      box-shadow: 0 20rpx 40rpx -10rpx rgba(0, 0, 0, 0.4);
      animation: anime-top 260ms ease-out forwards;
      &:after {
        content: " ";
        position: absolute;
        left: 50%;
        bottom: -50%;
        transform: translateX(-50%);
        margin-bottom: 26rpx;
        width: 0;
        height: 0;
        border-left: 18rpx solid transparent;
        border-right: 18rpx solid transparent;
        border-top: 20rpx solid #4C4C4C;
      }
    }
    @keyframes anime-top {
      from {
        opacity: .5;
        bottom: 110%;
      }
    }
  }
</style>