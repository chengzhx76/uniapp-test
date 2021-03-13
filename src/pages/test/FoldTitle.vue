<template>
  <view class="fold-title">
    <view class="header">
      <view class="main">
        <view class="title">标题</view>
        <view class="tips">提示</view>
      </view>
      <view class="handler">
        <view class="icon" hover-class="txic-hover" @click="toggle">
          <text class="weui-icon-arrow " :class="[isShow ? 'show' : 'hide']"></text>
        </view>
      </view>
    </view>
    <view class="container" v-if="isShow">
      <cell-title :tips="tips">
        <view slot="icon">
          <text class="fa gray-icon fa-user"/>
        </view>
        <view slot="centent">
          哈哈
        </view>
        <view slot="handler">
          <switch @change="moreSwitchState" color="#76ABEF"/>
        </view>
      </cell-title>
      <cell-title :tips="tips">
        <view slot="icon">
          <text class="fa gray-icon fa-user"/>
        </view>
        <view slot="centent">
          哈哈
        </view>
        <view slot="handler">
          <switch @change="moreSwitchState" color="#76ABEF"/>
        </view>
      </cell-title>
    </view>
  </view>
</template>

<script>
  import CellTitle from '@/pages/com/CellTitle'
  export default {
    data() {
      return {
        isShow: false,
        tips: '呵呵'
      }
    },
    components: {
      CellTitle
    },
    methods: {
      toggle() {
        this.isShow = !this.isShow
      },
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
  .fold-title {
    width: 100%;
  }
  .header {
    width: 100%;
    display: flex;
    @include border(top);
    @include border(bottom);
    background-color: $white;
    .main {
      width: calc(100% - 150rpx);
      // background-color: #F3C9C9;
      .title {
        @include height-width-percent-text-line(90, $lineHeight: 110, $align: left);
        font-size: 36rpx;
        text-indent: 30rpx;
        color: $titleColor;
        // background-color: #F5D1F7;
      }
      .tips {
        padding: 0 10rpx 25rpx 30rpx;
        font-size: 32rpx;
        color: $tipColor;
        // background-color: #E2FCFF;
      }
    }
    .handler {
      width: 150rpx;
      @include justify-align;
      .icon {
        @include height-width(75, 120);
        @include border-radius(75);
        @include border;
        @include justify-align;
        .weui-icon-arrow {
          @include height-width(30);
          transition: all .3s;
          color: $iconColor;
        }
        .show {
          transform: rotate(-90deg);
        }
        .hide {
          transform: rotate(90deg);
        }
      }
    }
  }
  .container {
    width: 100%;
    @include border(bottom);
    padding-bottom: 50rpx;
    @include border-radius(20);
    background-color: $white;
  }

</style>