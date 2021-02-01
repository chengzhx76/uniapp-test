<template>
  <view class="slide-panel">
    <view class="header">
      <view class="title">切换</view>
      <view class="tabs-bar">开关</view>
    </view>
    <swiper class="panel" :current="0" :duration="2000" @change="swiperChange">
      <swiper-item>
        <view class="tab-content-a">1</view>
        <view class="tab-content-a" style="background-color: #DBD7FA;">1</view>
      </swiper-item>
      <swiper-item>
        <view class="tab-content">2</view>
      </swiper-item>
      <swiper-item>
        <view class="tab-content">3</view>
      </swiper-item>
    </swiper>
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
      swiperChange(event) {
        console.log(event)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  .slide-panel {
    width: 100%;
  }
  .header {
    @include height-rpx-width-percent(100);
    @include justify-align($justify:space-between);
    background-color: #FCE1E1;
    .title {
      height: 100%;
      @include align;
      background-color: #FECDEA;
    }
    .tabs-bar {
      height: 100%;
      @include align;
      background-color: #E0FCF2;
    }
  }
  .panel {
    width: 100%;
    // height: 100%;
    background-color: #FCDBC8;
    .tab-content-a {
      height: 100px;
    }
  }
</style>