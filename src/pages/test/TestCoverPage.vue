<template>
  <view class="container">
    <button @click="open">Showsss</button>
    <button @tap="cover.showPopup">showPopup</button>
    <view class="popup-container" :catchtouchmove="false">
      <view class="popup"
        :change:res="cover.resReady" :res="res"
        :change:isShow="cover.isShowChange" :isShow="isShow"
        @transitionend="cover.transitionEnd" 
        @touchstart="cover.touchstart" 
        @touchmove="cover.touchmove" 
        @touchend="cover.touchend">
        <view class="main">dsssss</view>
        <view class="close" @tap="cover.hidePopup">+</view>
      </view>
    </view>
  </view>
</template>

<script module="cover" lang="wxs">
  var touchstart = function(event, ownerInstance) {
    var ins = event.instance
    var st = ins.getState()
    if (!st.max) return
    // console.log('touchstart.st-> ', JSON.stringify(st))
    st.isMoving = true
    st.startX = event.touches[0].pageX
    st.startY = event.touches[0].pageY
    st.firstAngle = 0
  }

  var touchmove = function(event, ownerInstance) {
    var ins = event.instance
    var st = ins.getState()
    if (!st.isMoving) return
    var currMoveX = event.touches[0].pageX
    var currMoveY = event.touches[0].pageY

    // 总结：
    // touchmove的最后坐标减去touchstart的起始坐标，
    // X的结果如果正数，则说明手指是从左往右划动；X的结果如果负数，则说明手指是从右往左划动；
    // Y的结果如果正数，则说明手指是从上往下划动；Y的结果如果负数，则说明手指是从下往上划动。
    var pagex = currMoveX - st.startX
    var pagey = currMoveY - st.startY
    // 左侧45度角为界限，大于45度则允许水平滑动
    if (st.firstAngle === 0) {
        st.firstAngle = Math.abs(pagey) - Math.abs(pagex)
    }
    if (st.firstAngle < 0) {
        return
    }

    // 内容框的偏移
    var movey = pagey > 0 ? Math.min(st.max, pagey) : Math.max(-st.max, pagey)
    // 已经是划出来了，还要往左滑动，忽略
    if (movey < 0) return
    ins.setStyle({
      'transform': 'translateY(' + movey + 'px)',
      'transition': ''
    })
    st.transformy = movey
    return false
  }

  var touchend = function(event, ownerInstance) {
    var ins = event.instance
    var st = ins.getState()
    if (!st.max) return
    if (st.firstAngle < 0) {
      return
    }
    var duration = st.duration / 1000
    st.isMoving = false

    var moveEndY = event.changedTouches[0].pageY

    var moveyDistance = moveEndY - st.startY
    // console.log(' moveEndY-> ' + moveEndY + ' st.startY-> ' + st.startY + ' moveyDistance-> ' + moveyDistance + ' st.throttle-> ' + st.throttle)

    if (moveyDistance > 0 && Math.abs(moveyDistance) > st.throttle) {
      st.out = false
      innerHidePopup(ins, ownerInstance, duration)
      ownerInstance.callMethod('hide')
    } else {
      innerShowPopup(ins, ownerInstance, duration)
      ownerInstance.callMethod('show')
    }
  }

  var innerShowPopup = function(ins, ownerInstance, heightDuration) {
    if (!ins || !ins.getState() || !ins.getState().max) {
      ins = ownerInstance.selectComponent('.popup')
    }
    st = ins.getState()
    if (!st.max) return
    st.out = true
    // var duration = st.duration ? st.duration / 1000 : heightDuration
    var duration = heightDuration>-1 ? heightDuration : st.duration / 1000
    ins.setStyle({
      'transform': 'translate3d(0, 0px, 0)',
      'transition': 'transform ' + (duration) + 's'
    })
    st.transformy = 0
  }

  var innerHidePopup = function(ins, ownerInstance, heightDuration) {
    if (!ins || !ins.getState() || !ins.getState().max) {
      ins = ownerInstance.selectComponent('.popup')
    }
    var st = ins.getState()
    if (!st.max) return
    var movey = st.max
    var duration = heightDuration>-1 ? heightDuration : st.duration / 1000 
    ins.setStyle({
      'transform': 'translate3d(0px, ' + movey + 'px, 0)',
      'transition': 'transform ' + (duration) + 's'
    })
    st.transformy = movey
  }

  var showPopup = function(event, ownerInstance) {
    var ins = event.instance
    innerShowPopup(ins, ownerInstance)
    
    ownerInstance.callMethod('show')
    return false
  }

  var hidePopup = function(event, ownerInstance) {
    var ins = event.instance
    innerHidePopup(ins, ownerInstance)
    
    ownerInstance.callMethod('hide')
    return false
  }

  var resReady = function(newVal, oldVal, ownerInstance, ins) {
    var st = ins.getState()
    if (newVal) {
      st.max = newVal.height
      st.throttle = st.max * 0.3 // 滑动超过1/3
      st.duration = newVal.duration
      if (st.show) {
        innerShowPopup(ins, ownerInstance, 0)
      } else {
        innerHidePopup(ins, ownerInstance)
      }
    }
  }
  var isShowChange = function(newVal, oldVal, ownerInstance, ins) {
    var st = ins.getState()
    st.show = newVal
    if (st.show) {
        innerShowPopup(ins, ownerInstance, 0)
    } else {
        innerHidePopup(ins, ownerInstance)
    }
  }

  var transitionEnd = function(event, ownerInstance) {
    var ins = event.instance
    var st = ins.getState()
    if (!st.max) return
    var duration = st.duration / 1000
    if (!st.out) {
      ins.setStyle({
        'transform': 'translate3d(0, ' + st.max + 'px, 0)',
        'transition': 'transform ' + duration +'s'
      })
    }
  }

  module.exports = {
    resReady: resReady,
    isShowChange: isShowChange,
    showPopup: showPopup,
    hidePopup: hidePopup,
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
        res: null,
        // isShow: true,
        isShow: false,
        duration: 350,
        height: 0
      }
    },
    mounted() {
      this.readyRes()
    },
    methods: {
      readyRes() {
        getCompRect(this, '.popup').then(rect => {
          this.res = {
            show: this.isShow,
            height: rect.height,
            duration: this.duration
          }
        })
      },
      open() {
        this.isShow = true
        // cover.showPopup()
      },
      show() {
        console.log('show')
        this.isShow = true
      },
      hide() {
        console.log('hide')
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
    transform: translateY(100%);
  }
   /*.popup {
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
  } */
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