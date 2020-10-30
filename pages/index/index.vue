<template>
	<view class="container">
		<view class="header">
			<image class="head-portrait" src="@/static/shilu-login/logo.png"></image>
		</view>
		<uni-list class="list">
			<uni-list-item title="姓名" rightText="张波   " :showArrow="false"></uni-list-item>
			<uni-list-item title="部门" rightText="突击中队   " :showArrow="false"></uni-list-item>
			<uni-list-item title="职位" rightText="中队长   " :showArrow="false"></uni-list-item>
		</uni-list>
		<button type="warn" class="out-btn" @tap="out()">退出登陆</button>
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
					console.log(res, 1);
				},
				fail(res) {
					// 没有token回到登陆页
					console.log(res, 2)
					uni.redirectTo({
						url: '/pages/login/login'
					})
				}
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
			},
			out() {
				uni.removeStorage({
					key: 'storage_key',
					success: function(res) {
						console.log('success');
					}
				});
				uni.redirectTo({
					url: '/pages/login/login'
				})
			}
		}
	}
</script>

<style>
	body {
		background-color: #fafafa;
	}

	.container {
		font-size: 14px;
		line-height: 24px;
	}

	.header {
		width: 750rpx;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: white;
		margin-bottom: 20px;
		border-bottom: 1px solid #e5e5e5;
	}

	.head-portrait {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		border: 3px solid #fff;
		box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
		margin: 20px auto;
	}

	.uni-list {
		border-top: 1px solid #e5e5e5;
		border-bottom: 1px solid #e5e5e5;
	}

	.uni-list-item__extra-text {
		color: #333333 !important;
	}

	.uni-list-item__content-title {
		font-size: 12px !important;
	}

	.out-btn {
		width: 100%;
		line-height: 44px;
		text-align: center;
		margin-top: 20px;
		background-color: #ed3f14;
		color: white;
		font-size: 12px;
		border-radius: 0;
	}
</style>
