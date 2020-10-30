<template>
	<view class="container">
		<view class="">实际评分操作在这里</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				phone: '',
				code: ''
			}
		},
		created: () => {
			uni.getStorage({
				key: 'test_key',
				success: function(res) {
					console.log(res);
				},
			});
			// 如果token过期就删除本地的缓存
			// uni.removeStorage({
			//     key: 'storage_key',
			//     success: function (res) {
			//         console.log('success');
			//     }
			// });
			// uni.login({
			// 	provider: 'weixin',
			// 	success: function(loginRes) {
			// 		console.log(loginRes, 11);
			// 		// 获取用户信息
			// 		uni.getUserInfo({
			// 			provider: 'weixin',
			// 			success: function(infoRes) {
			// 				console.log('用户昵称为：' + infoRes, 22);
			// 			}
			// 		});
			// 	}
			// });
		},
		computed: {
			havephone() {
				console.log(this.phone, this.phone.length == 11)
				return this.phone.length == 11
			}
		},
		methods: {
			getCode() {
				console.log(this, this.code)
				this.code = 123
			},
			inputChange(e) {
				console.log(e, e.detail.value)
			}
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
