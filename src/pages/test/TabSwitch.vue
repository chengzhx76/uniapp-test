<template>
  <view class="tab-switch">
    <view class="tab" v-for="(item, index) in tabs" :key="index"
       :class="{'active-tab' : activeIndex === index }"
        @click="switchTab(index)">{{ item }}</view>
    <view class="active" :style="activeStyle"></view>
    <view class="disabled" v-if="disable"></view>
  </view>
</template>   

<script>
  import { getRect } from '@/util/wxml'
  export default {
    data() {
      return {
        tabs: ['提醒', '类别', 'TODO'],
        activeIndex: 1,
        size: 'md',
        bg: '#2d8cf0',
        activeBg: '#F5AA37',
        disable: true,
        activeStyle: null
      }
    },
    mounted() {
      this.toggle(this.activeIndex)
    },
    methods: {
      switchTab(index) {
        if (this.disable) return
        this.activeIndex = index
        this.toggle(this.activeIndex)
      },
      toggle(index) {
        Promise.all([
          getRect('.tab', true),
          getRect('.active')
        ]).then(([tabRects, activeRect]) => {
          const tabRect = tabRects[index]
          this.activeStyle = `height: ${tabRect.height-4}px; width: ${tabRect.width}px; transform: translateX(${tabRect.left}px);`
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  .tab-switch {
    @include align;
    position: relative;
    @include border-radius(5);
    background-color: $dark-blue;
    .tab {
      padding: 8rpx;
      font-size: 24rpx;
      color: $unimpColor;
      z-index: 9;
    }
    .active-tab {
      font-size: 26rpx;
      font-weight: 500;
      color: $titleColor;
    }
    .active {
      z-index: 6;
      margin-top: 2px;
      @include absolute;
      @include border-radius(5);
      @include box-shadow;
      transition: .5s ease;
      background-color: $white;
    }
  }
  .disabled {
    @include cover-all;
  }

</style>