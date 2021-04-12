<template>
  <view class="test-draw">
    <view class="canvas">
      <canvas type="2d" id="canvasBox" :style="{height: canvasHeight + 'px', width: canvasWidth + 'px'}"></canvas>
    </view>
    <image class="img" :src="src"/>
    <view class="footer">
      <button @click="drawImage()">创建证书</button>
      <button @click="save()">保存证书</button>
    </view>
  </view>

</template>

<script>
  import { loading, hideLoading } from '@/util/wxml'
  export default {
    data () {
      return {
        src: '',
        posterUrl: 'https://chengzhx76.cn/wechat/shard/50_40.png',
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM661zJK006gZLp4FX1V2Eib1nlmcNRvSMGnv00LTDBnG7NslZBZbyom4D3sVnuibsPKpyqhHicOFdNEA/132',
        qrcodeUrl: 'https://chengzhx76.cn/qrcode/00525818892843b4.png',

        avatarDiam: 40, // 头像的直径
        qrcodeDiam: 40, // 小程序码的直径
        avatarMargin: {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10
        },

        canvasHeight: 200,
        canvasWidth: 250,

        canvasDom: null,
        canvas: null,
        ctx: null,
        dpr: 1,
      }
    },
    methods: {
      drawImage() {
        const query = wx.createSelectorQuery()
        query.select('#canvasBox')
              .fields({
                node: true,
                size: true
              }).exec(res => {
                this.canvasDom = res[0]
                this.canvas = this.canvasDom.node
                this.ctx = this.canvas.getContext('2d')
                this.dpr = wx.getSystemInfoSync().pixelRatio
                this.drawing()
              })
      },
      drawing() {
        // loading('生成中')
        this.drawPoster().then(res => {
          // TODO 绘制内容
          this.drawAvatar()
          this.drawQrcode()
          this.drawText()
        })
      },
      drawPoster() {
        return new Promise((resolve, reject) => {
          const poster = this.canvas.createImage()
          poster.src = this.posterUrl
          poster.onload = () => {
            this.computeCanvasSize(poster.height, poster.width).then(() => {
              this.ctx.drawImage(poster, 0, 0, poster.width, poster.height, 0, 0, this.canvasWidth, this.canvasHeight)
              resolve()
            })
          }

        })
      },
      computeCanvasSize(imgHeight, imgWidth) {
        return new Promise((resolve, reject) => {
          this.canvas.width = this.canvasWidth * this.dpr
          this.canvas.height = this.canvasHeight * this.dpr
          this.ctx.scale(this.dpr, this.dpr)

          console.log(`computeCanvasSize->证书:${imgHeight} x ${imgWidth}-dpr:${this.dpr}-canvas:${this.canvasHeight} x ${this.canvasWidth}`)

          resolve()
        })
      },
      drawAvatar() {
        const avatar = this.canvas.createImage()
        avatar.src = this.avatar
        avatar.onload = () => {
          const radius = this.avatarDiam / 2
          const x = this.avatarMargin.left
          const y = this.canvasHeight - this.avatarDiam - 10
          this.ctx.save()
          this.ctx.arc(x + radius, y + radius, radius, 0, 2 * Math.PI)
          this.ctx.clip()
          this.ctx.drawImage(avatar, 0, 0, avatar.width, avatar.height, x, y, this.avatarDiam, this.avatarDiam)
          this.ctx.restore()
        }
      },
      drawQrcode() {
        const qrcode = this.canvas.createImage()
        qrcode.src = this.qrcodeUrl
        qrcode.onload = () => {
          const radius = this.qrcodeDiam / 2
          const x = this.canvasWidth - this.qrcodeDiam - 10
          const y = this.canvasHeight - this.qrcodeDiam - 10
          this.ctx.save()
          this.ctx.arc(x + radius, y + radius, radius, 0, 2 * Math.PI)
          this.ctx.clip()
          this.ctx.drawImage(qrcode, 0, 0, qrcode.width, qrcode.height, x, y, this.qrcodeDiam, this.qrcodeDiam)
          this.ctx.restore()
        }
      },
      drawText() {
        this.ctx.save()
        this.ctx.font = '14px Arial'
        this.ctx.fillStyle = '#333333'
        this.ctx.fillText('by.Cheng', 10, 20)
        this.ctx.restore()
      },

      save() {

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