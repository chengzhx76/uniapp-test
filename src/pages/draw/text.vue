<template>
  <view class="test-draw">
    <view class="canvas">
      <canvas type="2d" canvas-id="canvasBox" id="canvasBox" style="height: 200px; width: 250px;"></canvas>
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
  import { drawImage, subText } from '@/util/draw'
  export default {
    data () {
      return {
        src: '',
        posterUrl: 'https://chengzhx76.cn/wechat/shard/50_40.png',

        subject: '周六一起去爬香山😄😄😄😄😄',
        dateTime: '4月20日 10:58',
      }
    },
    mounted() {
      this.draw()
    },
    methods: {
      draw() {
        drawImage('#canvasBox', this.posterUrl).then(res => {
          console.log(res)
          this.drawing(res)
        })
      },
      drawing(ctx) {
        this.drawText(ctx)
      },
      drawText(ctx) {
        ctx.save()
        ctx.font = '14px Arial'
        ctx.fillStyle = '#76ABEF'
        ctx.fillText('主题', 20, 50)
        ctx.fillText('时间', 20, 110)

        ctx.font = '18px Arial'
        ctx.fillStyle = '#333333'
        ctx.fillText(subText(this.subject, ctx, 250, 30), 30, 78)
        ctx.fillText(this.dateTime, 30, 138)
        ctx.restore()
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