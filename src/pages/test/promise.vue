<template>
	<view class="content">
		<view class="amount">
			<text class="value" v-if="!loading">{{ totalPrice }}</text>
			<text class="loading" v-else>loading...</text>
		</view>
		<view class="box">
			<input class="input" type="number" confirm-type="done" v-model.lazy="initVal" @confirm="confirmEvent"/>
     </view>
		<view class="footer">
      <button @click="btn">BTN</button>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				initVal: 10,
				amount: 0,
				loading: false
			}
		},
		computed: {
      /*totalPrice() {
        // return this.amount + this.initVal
        const s = this.syncCompute()
        console.log('sss', s.then(re => {
        	console.log('re', re)
        }))
        console.log('s.then()', s.then())
        return s.then()
      }*/
      async totalPrice() {
      	this.loading = true
			  let res = await this.getServerAmount()
			  this.loading = false
			  return res
      }
    },
		methods: {
			confirmEvent(e) {
        let val = e.detail.value
        if (val) {
          
        }
      },
			async syncCompute() {
				this.loading = true
			  let res = await this.getServerAmount()
			  this.loading = false
			  console.log(res)
			  // this.amount = res
			  return res
			},
			getServerAmount() {
			  return new Promise(resolve => {
			    setTimeout(() => resolve(1000), 1000)
			  })
			},
			returnVal() {
				return 2222
			},
			btn() {
				this.initVal += 11
				// this.syncCompute()
			}
		}
	}
</script>

<style>
	.amount {
		margin-top: 100px;
	}
	.value {
		font-size: 66rpx;
		color: #F3A3A3;
	}
	.input {
		border: 1px solid red;
	}
	.footer {
		margin-top: 200px;
	}
</style>
