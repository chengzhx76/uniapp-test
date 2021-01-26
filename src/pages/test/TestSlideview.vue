<template>
  <view class="sildeview">
    <view class="sildeview-left left""
      :change:res="silde.resReady" :res="res"
      :change:isShow="silde.isShowChange" :isShow="isShow"
      :change:disable="silde.disableChange" :disable="disable"
      :change:duration="silde.durationChange" :duration="duration"
      :change:rebounce="silde.rebounceChange" :rebounce="rebounce"
      @transitionend="silde.transitionEnd" 
      @touchstart="silde.touchstart" 
      @touchmove="silde.touchmove" 
      @touchend="silde.touchend"
    >
      <view class="cell">
        滑动窗口
      </view>
    </view>
    <!-- <view class="sildeview-right" style="width: 360rpx;"> -->
    <view class="sildeview-right right">
      <view class="buttons">
        <view class="btn" :data-index="1" @tap="silde.clickButton">
          <view class="btn-warp">
            <text class="weui-icon-clear"></text>
          </view>
        </view>
        <view class="btn" :data-index="2" @tap="silde.clickButton">
          <view class="btn-warp">
            <text class="weui-icon-contacts"></text>
          </view>
        </view>
        <view class="btn" :data-index="1" @tap="silde.clickButton">
          <view class="btn-warp">
            <text class="weui-icon-add-friends"></text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script module="silde" lang="wxs">
  var touchstart = function(event, ownerInstance) {
    console.log('touchstart')
    var ins = event.instance
    var st = ins.getState()

    // console.log('touchstart.st-> ', JSON.stringify(st))

    if (st.disable) return
    if (!st.size) return
    st.isMoving = true
    st.startX = event.touches[0].pageX
    st.startY = event.touches[0].pageY
    st.firstAngle = 0
  }

  var touchmove = function(event, ownerInstance) {
    console.log('touchmove')
    var ins = event.instance
    var st = ins.getState()
    if (!st.size || !st.isMoving) return
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
        st.firstAngle = Math.abs(pagex) - Math.abs(pagey)
    }
    if (st.firstAngle < 0) {
        return
    }
    // x 轴滑动距离不可超出最大值 max； pagex 为负数超出边框
    // movex 负数为展开，正数为关闭
    var movex = pagex > 0 ? Math.min(st.max, pagex) : Math.max(-st.max, pagex)
    // 往回滑动的情况
    if (st.out) {
      // 已经是划出来了，还要往左滑动，忽略
      if (movex < 0) return
      ins.setStyle({
        'transform': 'translateX(' + (st.transformx + movex) + 'px)',
        'transition': ''
      })
      var btns = ownerInstance.selectAllComponents('.btn')
      var transformTotal = 0
      var len = btns.length
      var i = len - 1;
      for (;i >= 0; i--) {
        var transform = st.size.buttons[i].width / st.max * movex
        var transformx = st.size.buttons[i].max - Math.min(st.size.buttons[i].max, transform + transformTotal)
        btns[i].setStyle({
          'transform': 'translateX(' + (-transformx) + 'px)',
          'transition': ''
        })
        transformTotal += transform
      }
      return false
    }

    if (movex > 0) movex = 0
    // 内容框的偏移
    ins.setStyle({
      'transform': 'translateX(' + movex + 'px)',
      'transition': ''
    })

    st.transformx = movex
    var transformTotal = 0
    // 每个按钮的偏移
    var btns = ownerInstance.selectAllComponents('.btn')
    var len = btns.length
    var i = len - 1;
    for (;i >= 0; i--) {
      var transform = st.size.buttons[i].width / st.max * movex
      var transformx = Math.max(-st.size.buttons[i].max, transform + transformTotal)
      btns[i].setStyle({
          'transform': 'translateX(' + transformx + 'px)',
          'transition': ''
      })
      st.size.buttons[i].transformx = transformx
      transformTotal += transform
    }
    return false // 禁止垂直方向的滑动
  }

  var touchend = function(event, ownerInstance) {
    console.log('touchend')
    var ins = event.instance
    var st = ins.getState()
    if (!st.size || !st.isMoving) return
    // 左侧45度角为界限，大于45度则允许水平滑动
    if (st.firstAngle < 0) {
      return
    }
    var duration = st.duration / 1000
    st.isMoving = false
    var btns = ownerInstance.selectAllComponents('.btn')
    var len = btns.length
    var i = len - 1

    var moveEndX = event.changedTouches[0].pageX
    if (Math.abs(moveEndX - st.startX) < st.throttle || moveEndX - st.startX > 0) { // 方向也要控制
      st.out = false
      ins.setStyle({
        'transform': 'translate3d(0px, 0, 0)',
        'transition': 'transform ' + (duration) + 's'
      })
      for (;i >= 0; i--) {
        btns[i].setStyle({
          'transform': 'translate3d(0px, 0, 0)',
          'transition': 'transform ' + (duration) + 's'
        })
      }

      ownerInstance.callMethod('hide')
      return

    }

    showButtons(ins, ownerInstance, duration)
    ownerInstance.callMethod('show')

  }

  var REBOUNCE_TIME = 0.2
  var showButtons = function(ins, ownerInstance, withDuration) {
    console.log('showButtons')
    var st = ins.getState()
    if (!st.size) return
    var rebounceTime = st.rebounce ? REBOUNCE_TIME : 0 // 回弹距离
    var movex = st.max
    st.out = true
    var btns = ownerInstance.selectAllComponents('.btn')
    var rebounce = st.rebounce || 0
    var len = btns.length
    var i = len - 1
    ins.setStyle({
      'transform': 'translate3d(' + (-movex - rebounce) + 'px, 0, 0)',
      'transition': 'transform ' + (withDuration) + 's'
    })
    st.transformx = -movex
    var transformTotal = 0
    for (;i >= 0; i--) {
      var btnWidth = st.size.buttons[i].width
      var transform = btnWidth / st.max * movex // 一个btn的宽度占总宽度的几分之几
      // console.log('btnWidth-> ' + btnWidth)
      // console.log('st.max-> ' + st.max)
      // console.log('movex-> ' + movex)
      // console.log('transform-> ' + transform)
      var transformx = (-(transform + transformTotal))
      btns[i].setStyle({
          'transform': 'translate3d(' + transformx + 'px, 0, 0)',
          'transition': 'transform ' + (withDuration ? withDuration + rebounceTime : withDuration) + 's'
      })
      st.size.buttons[i].transformx = transformx
      transformTotal += transform
    }
  }

  var innerHideButton = function(ownerInstance) {
    console.log('innerHideButton')
    var ins = ownerInstance.selectComponent('.left')
    var st = ins.getState()
    if (!st.size) return
    var duration = st.duration ? st.duration / 1000 : 0
    var btns = ownerInstance.selectAllComponents('.btn')
    var len = btns.length
    var i = len - 1
    ins.setStyle({
        'transform': 'translate3d(0px, 0, 0)',
        'transition': 'transform ' + (duration) + 's'
    })
    st.transformx = 0
    for (;i >= 0; i--) {
        btns[i].setStyle({
          'transform': 'translate3d(0px, 0, 0)',
          'transition': 'transform ' + (duration) + 's'
        })
        st.size.buttons[i].transformx = 0
    }
  }

  var clickButton = function(event, ownerInstance) {
    innerHideButton(ownerInstance)
    
    ownerInstance.callMethod('choose', event.currentTarget.dataset.index)
    return false
  }

  var resReady = function(newVal, oldVal, ownerInstance, ins) {
    var st = ins.getState()
    if (newVal && newVal.button && newVal.buttons) {
      st.size = newVal
      st.transformx = 0

      var max = 0
      var len = newVal.buttons.length
      var i = newVal.buttons.length - 1;
      var total = 0
      for (; i >= 0; i--) {
        max += newVal.buttons[i].width
        total += newVal.buttons[i].width
        newVal.buttons[i].max = total
        newVal.buttons[i].transformx = 0
      }
      st.throttle = st.size.throttle || 40 // 固定值
      st.rebounce = st.size.rebounce
      st.max = max
      ownerInstance.selectComponent('.right').setStyle({
        left: (newVal.button.width) + 'px',
        width: max + 'px'
      })

      if (!st.size.disable && st.size.show) {
        showButtons(ins, ownerInstance)
      }
      // console.log('最大可滑动距离=> ' + max)
    }
  }

  var isShowChange = function(newVal, oldVal, ownerInstance, ins) {
    var st = ins.getState()
    st.show = newVal
    if (st.disable) return
    if (st.show) {
        showButtons(ins, ownerInstance, st.duration)
    } else {
        innerHideButton(ownerInstance)
    }
  }
  var disableChange = function(newVal, oldVal, ownerInstance, ins) {
    var st = ins.getState()
    st.disable = newVal
  }
  var durationChange = function(newVal, oldVal, ownerInstance, ins) {
    var st = ins.getState()
    st.duration = newVal || 400
  }
  var rebounceChange = function(newVal, oldVal, ownerInstance, ins) {
    var st = ins.getState()
    st.rebounce = newVal
  }

  var transitionEnd = function(event, ownerInstance) {
    var ins = event.instance
    var st = ins.getState()
    // 回弹效果
    if (st.out && st.rebounce) {
      ins.setStyle({
        'transform': 'translate3d(' + (-st.max) + 'px, 0, 0)',
        'transition': 'transform ' + REBOUNCE_TIME +'s'
      })
    }
  }


  module.exports = {
    resReady: resReady,
    isShowChange: isShowChange,
    disableChange: disableChange,
    durationChange: durationChange,
    rebounceChange: rebounceChange,
    transitionEnd: transitionEnd,
    touchstart: touchstart,
    touchmove: touchmove,
    touchend: touchend,
    clickButton: clickButton
  }
</script>

<script>
  import { getCompRect } from '@/util/wxml'
  export default {
    data() {
      return {
        // 资源
        res: null,
        isShow: false,    // 是否显示slideview，可以控制隐藏显示
        disable: false,// 是否禁用slideview
        duration: 1000, // 显示隐藏的动画的时长，单位ms
        throttle: 40,  // 手指移动距离超过该值的时候，触发slideview的显示隐藏
        rebounce: 0,   // 回弹距离
      }
    },
    mounted() {
      this.readyRes()
    },
    methods: {
      readyRes() {
        Promise.all([
          getCompRect(this, '.left'),
          getCompRect(this, '.btn', true)
        ]).then(([leftRects, btnRect]) => {
          this.res = {
            button: leftRects,
            buttons: btnRect,
            show: this.isShow,
            disable: this.disable,
            duration: this.duration,
            throttle: this.throttle,
            rebounce: this.rebounce
          }
        })
      },
      hide() {
        console.log('hide')
      },
      show() {
        console.log('show')
      },
      choose(index) {
        console.log('choose', index)
      }
    }
  }
</script>

<!-- https://developers.weixin.qq.com/miniprogram/dev/extended/weui/slideview.html -->
<!-- https://github.com/wechat-miniprogram/weui-miniprogram/blob/master/src/slideview/slideview.wxs -->
<!-- https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html -->
<!-- https://developers.weixin.qq.com/miniprogram/dev/framework/view/interactive-animation.html -->

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  .sildeview {
    width: 100%;
    position: relative;
    overflow: hidden;
    margin-top: 200rpx;
    // background-color: #F7E0E0;
  }
  .sildeview-left {
    z-index: 10;
    position: relative;
    // background-color: #FAF7BF;
    .cell {
      @include height-rpx-width-percent(150);
      @include border-radius(15);
      background-color: #fff;
      font-size: 32rpx;
      color: rgba(0,0,0,.9);
      text-align: right;
      line-height: 150rpx;
    }
  }
  .sildeview-right {
    height: 100%;
    position: absolute;
    top: 0;
    left: 100%;
    z-index: 1;
    // @include align;
    background-color: #F8BAF1;
    .buttons {
      height: 100%;
      // display: flex;
      .btn {
        @include width-rpx-height-percent(120);
        @include justify-align;
        // background-color: #FADDDD;
        position: absolute;
        left: 0;
        bottom: 0;
        .btn-warp {
          @include height-width(90);
          @include border-radius(90);
          @include justify-align;
          background-color: #fff;
          .weui-icon-clear, .weui-icon-contacts, .weui-icon-add-friends {
            @include height-width(50);
            color: $iconColor;
          }
        }
        &:first-child {
          padding-left: 30rpx;
        }
        &:last-child {
          padding-right: 15rpx;
        }
      }
    }
  }

</style>