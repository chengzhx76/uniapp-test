<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			this.$store.dispatch('RunEventListener')
		},
		onHide: function() {
			console.log('App Hide')
			this.$store.dispatch('StopEventListener')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
