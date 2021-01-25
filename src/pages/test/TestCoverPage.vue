<template>
  <view class="container">
    <button @click="show">Showsss</button>
    <view class="popup-container" :class="[isShow ? 'show' : 'hidden']">
      <view class="popup"
        :change:popupHeight="cover.resReady" :popupHeight="popupHeight"
        @transitionend="cover.transitionEnd" 
        @touchstart="cover.touchstart" 
        @touchmove="cover.touchmove" 
        @touchend="cover.touchend">
        <view class="main">dsssss</view>
        <view class="close" @click="close">+</view>
      </view>
    </view>
  </view>
</template>

<script module="cover" lang="wxs">
  var touchstart = function(event, ownerInstance) {
    console.log('touchstart')
    var ins = event.instance
    var st = ins.getState()
    // console.log('touchstart.st-> ', JSON.stringify(st))
    st.isMoving = true
    // st.startX = event.touches[0].pageX
    st.startY = event.touches[0].pageY

    console.log('touchstart.st-> ', JSON.stringify(event.touches[0]))
    // st.firstAngle = 0
  }

  var touchmove = function(event, ownerInstance) {
    console.log('touchmove')
    var ins = event.instance
    var st = ins.getState()
    if (!st.isMoving) return
    // var currMoveX = event.touches[0].pageX
    var currMoveY = event.touches[0].pageY

    // 总结：
    // touchmove的最后坐标减去touchstart的起始坐标，
    // X的结果如果正数，则说明手指是从左往右划动；X的结果如果负数，则说明手指是从右往左划动；
    // Y的结果如果正数，则说明手指是从上往下划动；Y的结果如果负数，则说明手指是从下往上划动。
    // var pagex = currMoveX - st.startX
    var pagey = currMoveY - st.startY

    // 内容框的偏移
    var movey = pagey > 0 ? Math.min(st.max, pagey) : Math.max(-st.max, pagey)
    if (movey < 0) movey = 0
    console.log('currMoveY-> ' + currMoveY +' startY-> ' + st.startY +' pagey-> ' + movey +' movey-> ' + movey)
    ins.setStyle({
      'transform': 'translateY(' + movey + 'px)',
      'transition': ''
    })
    // console.log('movey => ' + movey)

  }

  var touchend = function(event, ownerInstance) {
    console.log('touchend')
    var ins = event.instance
    var st = ins.getState()
  }

  var resReady = function(newVal, oldVal, ownerInstance, ins) {
    var st = ins.getState()
    if (newVal) {
      console.log('resReady', newVal)
      st.max = newVal
    }
  }

  var transitionEnd = function(event, ownerInstance) {
    var ins = event.instance
    var st = ins.getState()
  }

  module.exports = {
    resReady: resReady,
    transitionEnd: transitionEnd,
    touchstart: touchstart,
    touchmove: touchmove,
    touchend: touchend
  }
</script>

<script>
  import { getCompRect } from '@/util/wxml'
  export default {
    data() {
      return {
        isShow: true,
        popupHeight: 0
      }
    },
    mounted() {
      this.readyRes()
    },
    methods: {
      readyRes() {
        getCompRect(this, '.popup').then(rect => {
          console.log(rect.height)
          this.popupHeight = rect.height
        })
      },
      show() {
        this.isShow = true
      },
      close() {
        this.isShow = false
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  .container {
    width: 100%;
  }
  .popup-container {
    width: 100%;
    z-index: $maskZIndex;
    position: relative;
  }

  .popup {
    transition: all .3s;
  }

  .show {
    .popup {
      transform: translateY(0);
    }
  }

  .hidden {
    .popup {
      transform: translateY(100%);
    }
  }
  .main {
    height: 100%;
    width: 100%;
    background: #FBE5E5;

  }
  .popup {
    height: 100%;
    width: 100%;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: $popupZIndex;
    overflow-x: hidden;
    overflow-y: auto;
    // overflow-y: scroll;
    // background: $white;
  }


  .close {
    @include height-width(50);
    @include text-center;
    @include border-radius(50);
    font-size: 64rpx;
    transform: rotate(45deg);
    color: $iconColor;
    // background-color: red;
    @include absolute-right(10, 10);
  }
</style>