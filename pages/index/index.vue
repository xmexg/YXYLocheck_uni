<template>
	<view class="content">
		<view id="userShow"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
	
	#userShow{
		display: flex;
		justify-content: center;
		align-content: center;
		flex-wrap: wrap;
		padding: 10rpx 0;
		margin: 10rpx 0;
		width: 90%;
		background: #000;
	}
</style>
