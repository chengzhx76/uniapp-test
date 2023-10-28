<template>
  <view class="wechat-icon">
    <view class="icon" v-for="(icon, index) in icons" :key="index">
      <view class="svg">
        <text class="weui-icon" :style="{'-webkit-mask-image': `url(data:image/svg+xml;base64,${icon.outline})`}"/>
        <text class="weui-icon" :style="{'-webkit-mask-image': `url(data:image/svg+xml;base64,${icon.filled})`}"/>
      </view>
      <view class="name">{{ icon.name }}</view>
    </view>
  </view>
</template>

<script>
  import icons from '@/icon/data'
  import Base64 from '@/icon/base64'
  export default {
    data() {
      return {
        icons: []
      }
    },
    mounted() {
      for(let name in icons) {
        const { outline, filled } = icons[name]
        // console.log(name, outline, filled)
        this.icons.push({
          outline: Base64.encode(outline),
          filled: Base64.encode(filled),
          name: name
        })
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  .wechat-icon {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 58px;
  }
  .icon {
    flex: 0 0 12%;
    @include align($direction:column);
    .svg {
      @include text-center;
    }
    .name {
      padding: 10rpx;
      font-size: 20rpx;
    }
  }
  
  .weui-icon {
    height: 16px;
    width: 16px;
    vertical-align: middle;
    display: inline-block;
    background: black;
    mask-repeat: no-repeat;
    mask-size: cover;
  }
</style>