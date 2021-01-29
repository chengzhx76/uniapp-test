<template>
  <view class="choose-switch" :class="[!!value ? 'checked' : '', size]"  :style="{ background: bgColor }" @click="toggle">
    <view class="inner" v-if="value">
      公历
    </view>
    <view class="inner" v-else>
      农历
    </view>
    <view class="switch"></view>
    <view class="disabled" v-if="disable"></view>
  </view>
</template>   

<script>
  export default {
    data() {
      return {
        value: 0,
        size: 'md',
        openBg: '#2d8cf0',
        closeBg: '#F5AA37',
        disable: false
      }
    },
    computed: {
      bgColor: {
        get() {
          return !!this.value ? this.openBg : this.closeBg
        },
        set(val) {
          return val
        }
      }
    },
    methods: {
      toggle() {
        if (this.disable) return
        this.bgColor = !!this.value ? this.openBg : this.closeBg
        this.value = !this.value
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  .choose-switch {
    // @include border;
    position: relative;
    // background-color: #464244;
    .inner {
      height: 100%;
      @include align;
      justify-content: flex-end;
      font-size: 22rpx;
      color: $white;
      // background-color: #F5B4B4;
    }
    .switch {
      @include border-radius-percent(50%);
      position: absolute;
      transition: all .3s ease-in-out;
      background-color: #fff;
    }
  }
  .checked {
    .inner {
      justify-content: flex-start;
    }
  }

  .lg {
    @include height-width(50, 110);
    // @include border-radius(50);
    .inner {
      width: calc(100% - 18rpx);
      margin-right: 18rpx;
    }
    .switch {
      top: 5rpx; // (50-40)/2
      left: 5rpx;// (50-40)/2
      @include height-width(40);
    }
  }
  .lg.checked {
    .inner {
      margin-left: 18rpx;
    }
    .switch {
      left: 65rpx; // 110 - 40 - (50-40)/2
    }
  }

  .md {
    @include height-width(40, 110);
    @include border-radius(40);
    .inner {
      width: calc(100% - 15rpx);
      margin-right: 15rpx;
    }
    .switch {
      top: 2rpx;
      left: 2rpx;
      @include height-width(36);
    }
  }
  .md.checked {
    .inner {
      margin-left: 15rpx;
    }
    .switch {
      left: 72rpx;
    }
  }

  .sm {
    @include height-width(32, 96);
    @include border-radius(32);
    .inner {
      width: calc(100% - 12rpx);
      margin-right: 12rpx;
    }
    .switch {
      top: 2rpx;
      left: 2rpx;
      @include height-width(28);
    }
  }
  .sm.checked {
    .inner {
      margin-left: 12rpx;
    }
    .switch {
      left: 66rpx;
    }
  }

  .disabled {
    @include cover-all;
  }

</style>