<template>
  <view class="show-container">
    <view class="danmu">
      <view class="channel" v-for="(channel, index) in channels" :key="index">
        <view v-for="danmu in channel.danmus" :key="danmu.id"
          :id="danmu.id" class="msg"  
          :style="{ 'transform': 'translateX(' + windowWidth + 'px)' }" 
          @animationend="animationEventListener">
          <img class="avatar" :src="danmu.avatar" alt="avatar">
          <view class="content">{{ danmu.content }}</view>
        </view>
      </view>
    </view>

    <view class="admin">
      <button @click="addDanMu">弹幕</button>
    </view>

  </view>

</template>

<script>
  import { getRect } from '@/util/wxml'
  export default {
    data () {
      return {
        channels:[{danmus:[], lastMsgId: null},{danmus:[], lastMsgId: null},{danmus:[], lastMsgId: null},{danmus:[], lastMsgId: null},{danmus:[], lastMsgId: null}],
        windowWidth: 0,

        msgQueue: [],
        msgQueueTimer: null,
      }
    },
    created() {
      const sysInfo = uni.getSystemInfoSync()
      this.windowWidth = sysInfo.windowWidth
    },
    mounted() {
      this.listenerMsgQueue()
    },
    methods: {
      addDanMu() {
        const msg = {
          id: `msg_${Math.random().toString(36).substring(2)}`,
          avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM7KKRsQAiapR7J7BlpMRU0ygH2aaI3KoFicrEMrp54ibQs96osmZVb6hxU4t9tjZypjSUPd6gp6ctC8g/132',
          content: '用css3来实现弹幕ss3来实现弹幕ss3来实现弹幕'
        }
        this.addMsg(msg)
      },
      addMsg(msg) {
        this.msgQueue.push(msg)
      },
      listenerMsgQueue() {
        this.msgQueueTimer = setInterval(() => {
          if (this.msgQueue.length) {
            this.getAvailChannel().then(channelIndex => {
              if (channelIndex != -1) {
                const msg = this.msgQueue.splice(0, 1)[0]
                console.log(`${msg.id}->${channelIndex}`)
                this.channels[channelIndex].danmus.push(msg)
                this.channels[channelIndex].lastMsgId = msg.id
              }
            })
          }
        }, 300)
      },
      getAvailChannel() {
        // 循环所有通道找出可用的通道
        const availChannelIndexs = []

        const promises = []
        this.channels.forEach((item, index) => {
          if (item.lastMsgId) {
            promises.push(getRect(`#${item.lastMsgId}`))
          } else {
            availChannelIndexs.push(index)
          }
        })
        return new Promise(resolve => {
          Promise.all(promises).then(reses => {
            reses.forEach((res, index) => {
              if (!res) {
                availChannelIndexs.push(index)
              } else if (res.right - this.windowWidth <= 0) {
                availChannelIndexs.push(index)
              }
            })
            let channelIndex = -1
            if (availChannelIndexs.length) {
              const index = Math.floor(Math.random() * availChannelIndexs.length)
              channelIndex = availChannelIndexs[index]
            }
            resolve(channelIndex)
          })
        })
      },

      animationEventListener(e) {
        for (let i = 0; i < this.channels.length; i++) {
          const danmus = this.channels[i].danmus
          for (let j = 0; j < danmus.length; j++) {
            if (danmus[j].id == e.target.id) {
              this.channels[i].danmus.splice(j, 1)
              return
            }
          }
        }
      }

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";
  @import "@/styles/variables.scss";
  .show-container {
    width: 100%;
  }
  .danmu {
    width: 100%;
    .channel {
      @include height-rpx-width-percent(100);
      @include align;
      position: relative;
      background-color: #FCF3F3;
      .msg {
        height: 70rpx;
        padding-left: 10rpx;
        padding-right: 20rpx;
        position: absolute;
        @include align;
        @include border-radius(70);
        background-color: rgba(209,213,219, 0.8);
        .avatar {
          @include round(50);
        }
        .content {
          @include height-line(50);
          margin-left: 10rpx;
          font-size: 24rpx;
          color: $titleColor;
          white-space: nowrap;
        }
      }
    }
  }

  .msg {
    animation-name: danmu;
    animation-duration: 2s;
    animation-iteration-count: 1;
    animation-play-state: running;
    // animation-play-state: paused;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    will-change: transform;
  }

  @keyframes danmu {
    from { 
      visibility: visible; 
      // transform: translateX(100px); 
    }
    to {
      visibility: visible; 
      transform: translateX(-100%); 
    } 
  }

</style>