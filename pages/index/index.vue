<template>
	<view class="content" v-if="userInfo.length==undefined">
		<view id="userShow">
			<view id="showHead"><image :src="userInfo.avatar" mode="aspectFill"></image></view>
			<view id="showBody">
				<view id="showBody_1"><view><view class="title">学校:</view><view class="text">{{userInfo.org.orgName}}</view></view><view><view class="title">姓名:</view><view class="text">{{userInfo.name}}</view></view><view><view class="title">电话:</view><view class="text">{{userInfo.tel}}</view></view></view>
				<view id="showBody_3"><view><view class="title">学号:</view><view class="text">{{userInfo.studentID}}</view></view><view><view class="title">id:</view><view class="text">{{userInfo.userID}}</view></view><view><view class="title">时间戳:</view><view class="text">{{userInfo.timestamp}}</view></view></view>
				<view id="showBody_2"><view><view class="title">性别:</view><view class="text">{{userInfo.sex}}</view></view><view><view class="title">令牌:</view><view class="text">{{userInfo.token}}</view></view></view>
				<!-- uni-grid 天坑! 禁止使用! -->
				<!-- <uni-grid :column="4">
					<uni-grid-item class="uni-grid-item"><view class="title">学校:</view><view class="text">{{userInfo.org.orgName}}</view></uni-grid-item>
					<uni-grid-item><view class="title">姓名:</view><view class="text">{{userInfo.name}}</view></uni-grid-item>
					<uni-grid-item><view class="title">性别:</view><view class="text">{{userInfo.sex}}</view></uni-grid-item>
					<uni-grid-item><view class="title">电话:</view><view class="text">{{userInfo.tel}}</view></uni-grid-item>
					<uni-grid-item><view class="title">id:</view><view class="text">{{userInfo.userID}}</view></uni-grid-item>
					<uni-grid-item><view class="title">学号:</view><view class="text">{{userInfo.studentID}}</view></uni-grid-item>
					<uni-grid-item><view class="title">令牌:</view><view class="text">{{userInfo.token}}</view></uni-grid-item>
					<uni-grid-item><view class="title">时间戳:</view><view class="text">{{userInfo.timestamp}}</view></uni-grid-item>
				</uni-grid> -->
			</view>
		</view>
	</view>
	<view class="center" id="empty" v-else>
		<view>
			<view><image src="@/static/img/error.png"></image></view>
			<view>未选择用户</view>
			<view>请先选中用户</view>
		</view>
	</view>
</template>

<script>
	import {updateUser} from '@/static/js/account.js'
	export default {
		data() {
			return {
				userInfotest: {},
				userInfo: {"role":9,"loginname":"loginname","org":{"orgName":"学校名称","orgLogo":"http://tskcloud.qiniudn.com/logo/011086251504175680938/某个图片.jpg","orgID":1234},"sex":"1","avatar":"../../static/img/R-C.jpg","userID":2205242,"token":"一个令牌","studentID":"学号","password":"密码","registerMode":1,"freeUser":0,"name":"姓名","tel":"手机号","timestamp":1685362190071}
			}
		},
		onLoad() {
		},
		onShow() {
			let that = this;
			let user = getApp().globalData.nowUser;
			let change = getApp().globalData.changeUser;
			if(change==1){
				// that.userInfo = updateUser(user.phone, user.passwd);
				updateUser(user.phone, user.passwd);
			}
			console.log(user);
			console.log("用户改变:"+change);
		},
		methods: {
			
		}
	}
</script>

<style>
	.center{
		display: flex;
		justify-content: center;
		align-content: center;
	}
	#empty{
		flex-direction: row;
		font-size: 2em;
		text-align: center;
		color: #26a8a2;
	}
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
		flex-direction: column;
		flex-wrap: wrap;
		padding: 10rpx 0;
		margin: 10rpx 0;
		width: 90%;
		background: #edf2ff;
		position: relative;
		border-radius: 10rpx;
		overflow: hidden;
	}
	#showHead{
		position: absolute;
		height: 100%;
		width: 20%;
		min-width: 150px;
		left: 0;
		overflow: hidden;
		display: flex;
		justify-content: flex-start;
	}
	#showHead > image{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: flex-start;
	}
	#showBody{
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 15rpx 0;
	}
	#showBody > view{
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		flex-wrap: wrap;
		width: 100%;
	}
	#showBody > view > view{
		display: flex;
		padding: 10rpx 5rpx 10rpx 5rpx;
	}
	.uni-grid-item{
		display: flex;
		justify-content: center;
		align-content: center;
		max-height: 200rpx;
		max-width: 400rpx;
		background: #26a8a2;
	}
	.title{
		display: flex;
		position: relative;
		color: #1a2847;
		font-weight: bold;
	}
	.text{
		display: flex;
		position: relative;
		color: #6b5458;
		flex-wrap: wrap;
	}
</style>
