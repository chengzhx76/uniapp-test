<template>
  <view class="show-danmu">
    <canvas type="2d" id="canvas" class="canvas"></canvas>
  </view>

</template>

<script>
  import { selectorCanvas } from '@/util/danmu'
  export default {
    data () {
      return {
        channels:[{
          top: 0,
          left: 0
        }]
        x: 0
      }
    },
    mounted() {
      this.draw()
    },
    methods: {
      draw() {
        selectorCanvas('#canvas').then(res => {





          this.loadImg(res.canvas).then(img => {
            const renderLoop = () => {
              this.render(res.canvas, res.ctx, img)
              res.canvas.requestAnimationFrame(renderLoop)
            }
            res.canvas.requestAnimationFrame(renderLoop)
          })

        })
      },

      loadImg(canvas) {
        return new Promise((resolve, reject) => {
          const img = canvas.createImage()
          img.src = 'https://chengzhx76.cn/pusher-test/car.png'
          img.onload = () => {
            resolve(img)
          }
        })
      },

      render(canvas, ctx, img) {
        ctx.clearRect(0, 0, 305, 305)
        this.drawCar(canvas, ctx, img)
      },


      drawCar(canvas, ctx, img) {
        if (this.x > 350) {
          this.x = -100
        }
        ctx.drawImage(img, this.x++, 0, 100, 50)
        ctx.restore()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" >
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  .canvas {
    width: 305px;
    height: 305px;
    background-color: #F6DDDD;
    margin-top: 30px;
  }
</style>