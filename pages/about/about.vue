<template>
	<view id="con">
		<view class="showBlock" v-for="(con, ind) in show">
			<view class="ti">{{con.ti}}</view>
			<view class="co" @click="copy(con.co)">{{con.co}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: [
					{
						"ti": "关于",
						"co": "优学院位置签到小程序，同时也是我的结课项目"
					},
					{
						"ti": "项目地址",
						"co": "https://github.com/xmexg/YXYLocheck_uni"
					},
					{
						"ti": "工作原理",
						"co": "https://github.com/xmexg/YXYLocheck"
					},
					{
						"ti": "",
						"co": "程序未实际验证，无法保证优学院成功签到"
					},
					{
						"ti": "CORS",
						"co": "浏览器处于安全考虑，如果在浏览器运行请先解锁CORS限制，方法见项目地址"
					}
				]
			}
		},
		methods: {
			copy(text){
				uni.setClipboardData({
					data: text,
					success: function () {
						uni.showToast({
							"title": "复制成功",
							"icon": "none"
						})
					}
				});
			}
		}
	}
</script>

<style>
	#con{
		display: flex;
		position: relative;
		width: 100%;
		height: 100%;
		flex-direction: column;
		justify-content: center;
		align-content: center;
	}
	.showBlock{
		display: block;
		position: relative;
		left: 4%;
		width: 90%;
		background: #edf2ff;
		padding: 5rpx;
		margin: 5rpx 0;
		border-radius: 5rpx;
	}
	.ti{
		color: #000;
	}
	.co{
		color: #6e83b8;
	}
</style>
