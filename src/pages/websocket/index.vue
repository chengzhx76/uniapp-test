<template>
	<view class="container">
		<view class="list" v-for="(item, index) in msgs" :key="index">{{ item }}</view>
		<view class="box">
			<input class="input" 
        confirm-type="send"
        v-model.lazy="msg"
        :focus="true"
        maxlength="256"
        @confirm="confirmEvent"/>
      <view class="close" @click="close">关闭</view>
		</view>
	</view>
</template>

<script>
	import ws from '@/util/wxws'
	export default {
		data() {
			return {
				msgs:[],
				msg: '',
				dispatcher: null
			}
		},
		mounted() {
		  this.initWebsocket()
		},
		methods: {
			initWebsocket() {
				const dispatcher = ws('ws://localhost:8080/ws')
				// console.log(dispatcher)
				dispatcher.createChannel(this.msgListener)
				this.dispatcher = dispatcher
			},
			msgListener(msg) {
				console.log('msg==>', msg)
        this.msgs.push(msg)
			},
			close() {
				this.dispatcher.close()
			},
			confirmEvent(e) {
        if (e.detail.value) {
          let msg = e.detail.value
          if (msg) {
            msg = msg.replace(/\s+/g, '')
          }
          if (!msg) {
            return
          }
          this.msg = ''
          // this.sendMsg(msgWarp)
          this.dispatcher.socket.send({
						data: msg
					})
        }
      }
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "@/styles/mixin.scss";
	.container {
		width: 100%;
		margin-top: 120rpx;
		.list {
			width: 100%;
		}
		.box {
			width: 100%;
			height: 100rpx;
			position: fixed;
			display: flex;
			bottom: 0;
			.input {
				width: calc(100% - 120rpx);
				height: 100%;
				background: #F8D5D5;
			}
			.close {
				height: 100rpx;
				width: 120rpx;
				font-size: 36rpx;
				@include text-center;
			}
		}
	}
</style>
