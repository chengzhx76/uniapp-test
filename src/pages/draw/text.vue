<template>
  <view class="test-draw">
    <view class="canvas">
      <canvas type="2d" id="canvasBox" style="height: 200px; width: 250px;"></canvas>
    </view>
    <image class="img" :src="src"/>
    <view class="footer">
      <button @click="draw()">创建证书</button>
      <button @click="save()">保存证书</button>
    </view>
  </view>

</template>

<script>
  import { loading, hideLoading } from '@/util/wxml'
  import { drawImage } from '@/util/draw'
  export default {
    data () {
      return {
        src: '',
        posterUrl: 'https://chengzhx76.cn/wechat/shard/50_40.png',

        subject: '周六一起去爬香山😄',
        dateTime: '4月20日 10:58',
      }
    },
    methods: {
      draw() {
        drawImage('#canvasBox', this.posterUrl, this.drawing)
      },
      drawing(ctx) {
        this.drawText(ctx)
      },
      drawText(ctx) {
        ctx.save()
        ctx.font = '16px Arial'
        ctx.fillStyle = '#76ABEF'
        ctx.fillText('Cheng邀请你加入提醒', 16, 50)
        ctx.font = '18px Arial'
        ctx.fillStyle = '#333333'

        // const textList = [`主题：${this.subject}`, `时间：${this.dateTime}`]
        const textList = [`主题：${this.subject}`]

        this.fillText(ctx, textList, 28, 85, 170)
        ctx.restore()
      },

      fillText(ctx, textList, sx, sy, lineWithMax) {
        for (let i = 0; i < textList.length; i++) {
          const text = textList[i]
          const width = ctx.measureText(text)
          const height = parseInt(ctx.font)

          console.log(width, height)

          sy = sy * (i + 1)
          if (width <= lineWithMax) {
            ctx.fillText(text, sx, sy)
          } else {
            const chars = text.split('')
            const charsWith = []
            for (let j = 0; j < chars.length; j++) {
              charsWith.push(ctx.measureText(chars[j]).width)
            }
            let lineWith = 0
            let lastIndex = 0
            let loop = 0
            charsWith.forEach((width, index) => {
              lineWith += width
              console.log(lineWith)
              if (lineWith >= lineWithMax) {
                const fillText = text.substring(lastIndex, index)
                loop++
                const x = sx
                const y = sy + (height * loop)
                console.log(sy, height, loop)
                ctx.fillText(fillText, x, y)
                lastIndex = index
              }
            })
          }

        }

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
    @include border($color: #F86D36);
  }
</style>