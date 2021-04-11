<template>
  <view class="test-draw">
    <view class="canvas">
      <canvas canvas-id="canvas" :style="{height: canvasHeightPx + 'px', width: canvasWidthPx + 'px'}"/>
    </view>
    <image class="img" :src="src"/>
    <view class="footer">
      <button @click="createImg()">创建图片</button>
      <button @click="save()">保存到手机相册</button>
    </view>
  </view>

</template>

<script>
  export default {
    data () {
      return {
        src: '',
        bg: 'https://chengzhx76.cn/wechat/shard/50_40.png',
        qr: 'https://chengzhx76.cn/qrcode/00525818892843b4.png',
        canvasHeightPx: 200,
        canvasWidthPx: 250
      }
    },
    methods: {
      createImg() {
        this.src = ''
        wx.showLoading({
          title: '加载中...'
        })
        this.drawImage().then(() => {
          setTimeout(() => {
            this.showImg()
            wx.hideLoading()
          }, 500)
        })
      },
      drawImage() {
        const bg = new Promise((resolve, reject) => {
          wx.getImageInfo({
            src: this.bg,
            success (res) {
              resolve(res)
            },
            fail (error) {
              console.error(error)
            }
          })
        })
        const qr = new Promise((resolve, reject) => {
          wx.getImageInfo({
            src: this.qr,
            success (res) {
              resolve(res)
            },
            fail (error) {
              console.error(error)
            }
          })
        })

        return new Promise((resolve, reject) => {
          try {
            Promise.all([bg, qr]).then(res => {
              const ctx = wx.createCanvasContext('canvas')
              // 上部 view
              // ctx.setFillStyle('#F8FCFF')
              // ctx.fillRect(0, 0, this.canvasWidthPx, 170)
              ctx.drawImage(res[0].path, 0, 0, this.canvasWidthPx, 400)
              // 底部view
              // ctx.beginPath()
              // ctx.setFillStyle('#FFFFFF')
              // ctx.fillRect(0, 170, this.canvasWidthPx, 90)
              // 中间的灰线
              // ctx.beginPath()
              // ctx.setStrokeStyle('#E5E5E5')
              // ctx.setLineWidth(1)
              // ctx.moveTo(10, 170)
              // ctx.lineTo(this.canvasWidthPx - 10, 170)
              // ctx.stroke()
              // 头部信息
              ctx.beginPath()
              ctx.setTextAlign('center')
              ctx.setFillStyle('#26548D')
              ctx.setFontSize(28)
              ctx.fillText('车找人', this.canvasWidthPx * 0.5, 78)
              // 行程信息
              ctx.beginPath()
              ctx.setTextAlign('right')
              ctx.setFillStyle('#26548D')
              ctx.setFontSize(26)
              ctx.fillText('起点：', this.canvasWidthPx * 0.26, 140)
              ctx.fillText('终点：', this.canvasWidthPx * 0.26, 180)
              ctx.fillText('时间：', this.canvasWidthPx * 0.26, 220)
              ctx.beginPath()
              ctx.setTextAlign('left')
              ctx.setFillStyle('#0A1519')
              ctx.setFontSize(26)
              ctx.fillText("起始地", this.canvasWidthPx * 0.26, 140)
              ctx.fillText("目的地", this.canvasWidthPx * 0.26, 180)
              ctx.fillText("2021年4月11日 22:26:46", this.canvasWidthPx * 0.26, 220)
              // 底部信息
              ctx.beginPath()
              ctx.setTextAlign('left')
              ctx.setFillStyle('#ACACAC')
              ctx.setFontSize(24)
              ctx.fillText('长按识别小程序码，联系TA', this.canvasWidthPx * 0.04, 325)
              ctx.fillText('分享来自「成武拼车」', this.canvasWidthPx * 0.04, 360)
              // 小程序码
              ctx.drawImage(res[1].path, this.canvasWidthPx - 110, 295, 100, 100)
              ctx.draw()
              resolve()
            })
          } catch (error) {
            console.log(error)
            wx.hideLoading()
            reject(error)
          }
        })
      },
      showImg() {
        let self = this
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: self.canvasWidthPx,
          height: self.canvasHeightPx,
          destWidth: self.canvasWidthPx * 2,
          destHeight: self.canvasHeightPx * 2,
          canvasId: 'canvas',
          success (res) {
            self.src = res.tempFilePath
          },
          fail (res) {
            console.log(res)
          }
        })
      },
      save () {
        const self = this
        wx.saveImageToPhotosAlbum({
          filePath: self.src,
          success (res) {
            wx.showModal({
              content: '图片已保存到相册',
              showCancel: false,
              confirmText: '好的',
              success (res) {
                if (res.confirm) {
                }
              }
            })
          },
          fail (res) {
            console.log(res)
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  .img {
    height: 200px;
    width: 250px;
    margin: 10px;
    @include border($color: #F86D36);
  }
</style>