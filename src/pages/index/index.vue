<template>
	<view class="content">
		<navigator  url="/pages/test/ShowTips" hover-class="navigator-hover">ShowTips</navigator>
		<navigator url="/pages/test/TestCoverPage" hover-class="navigator-hover">CoverPage</navigator>
		<navigator url="/pages/test/TestSlideview" hover-class="navigator-hover">Slideview</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	navigator {
		height: 70rpx;
		text-align: center;
		line-height: 70rpx;
		border-bottom: 1px solid #000;
	}
</style>
