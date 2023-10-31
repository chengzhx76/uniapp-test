<template>
	<view class="container">
	</view>
</template>

<script>
	// import ws from '@/util/wxws'
	import $hub from '@/util/flowhub'
	export default {
		data() {
			return {
				// dispatcher: null
			}
		},
		mounted() {
		  this.initListener()
		},
		methods: {
			initListener() {
				// const dispatcher = ws('ws://localhost:8080/ws')
				// dispatcher.createChannel(this.msgListener)
				// this.dispatcher = dispatcher

				/*
					{"event":"UNREAD_MSG","value":0}
					{"event":"WAIT_RUN_TRAVEL","value":true}
					{"event":"DIALIG_HOME","value":"帐号冻结"}
				*/

				// const dispatcher = $hub.WS('ws://localhost:8080/ws')

        // 发送事件
        // dispatcher.emit('ws-event1')
        // dispatcher.emit('ws-event2')

		    // 注册监听
		    // 监听是否有未读消息
		    $hub.on('UNREAD_MSG', (result) => console.log('unread_msg: ', result))
		    // 监听是否有马上要出发的行程
		    $hub.on('WAIT_RUN_TRAVEL', result => console.log('wait_run_travel: ', result))
		    // 监听Home弹窗
		    $hub.on('DIALIG_HOME', result => console.log('dialig_home1: ', result))
		    $hub.on('DIALIG_HOME', result => console.log('dialig_home2: ', result))
			},
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "@/styles/mixin.scss";
	.container {
	}
</style>
