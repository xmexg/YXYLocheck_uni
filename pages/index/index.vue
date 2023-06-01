<template>
	<view class="content" v-if="userInfo.length==undefined">
		<view id="userShow" @click="upPageUserData">
			<view id="showHead"><image :src="userInfo.avatar" mode="aspectFit"></image></view>
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
		<view id="courseListShow">
			<view class="courseBlockShow" v-for="(item, index) in courseList">
				<!-- <view class="courseBlockShow_index">{{index}}</view> -->
				<swiper class="courseBlockShowInfo_swiper">
					<swiper-item class="courseBlockShowInfo">
						<view class="courseBlockShow_img"><image class="courseBlockShow_img_img" :src="item.cover" mode="aspectFill"></image></view>
						<view class="courseBlockShow_text">
							<view class="courseBlockShow_name">{{item.name}}</view>
							<view class="courseBlockShow_name">{{item.creatorOrgName}} {{item.className}}</view>
							<view class="courseBlockShow_name">{{item.teacherName}}</view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="courseBlockShow_swiper_index">{{index+1}}</view>
						<view>{{item}}</view>
					</swiper-item>
				</swiper>
				<view class="courseActivityShow">
					<!-- 注意for与if处于同一节点，v-if 的优先级比 v-for 更高，v-if 将没有权限访问 v-for 里的变量 -->
					<view v-for="activities in appHomeActivity">
						<view v-if="activities.id == item.id">
							<swiper class="activities_swiper">
								<swiper-item class="activities_show">
									<view class="ActivityType">
										<view>courseActivity:(尚不支持)</view>
										<view v-if="activities.info.courseActivityCount != 0">
											<view calss="activitydetaillist" v-for="(activitydetail, indexdetail) in activities.info.courseActivityDTOList"></view>
										</view>
										<view v-else>
											没有该类型活动
										</view>
									</view>
									<view class="ActivityType">
										<view>miniCourseActivity:(尚不支持)</view>
										<view v-if="activities.info.miniCourseActivityCount != 0">
											<view calss="activitydetaillist" v-for="(activitydetail, indexdetail) in activities.info.courseActivityDTOList"></view>
										</view>
										<view v-else>
											没有该类型活动
										</view>
									</view>
									<view class="ActivityType">
										<view>otherActivity:(仅支持位置签到)</view>
										<view v-if="activities.info.otherActivityCount != 0">
											<view calss="activitydetaillist" v-for="(activitydetail, indexdetail) in activities.info.courseActivityDTOList"></view>
										</view>
										<view v-else>
											没有该类型活动
										</view>
									</view>
								</swiper-item>
								<swiper-item>{{activities}}</swiper-item>
							</swiper>
						</view>
						<view v-else>
							<view>获取课程活动列表失败</view>
						</view>
					</view>
				</view>
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
	import {UserLogin, DeLoginResult, UserCourseList, AppHomeActivityList} from '@/static/js/account.js'
	export default {
		data() {
			return {
				userInfo: {"role":9,"loginname":"loginname","org":{"orgName":"学校名称","orgLogo":"http://tskcloud.qiniudn.com/logo/011086251504175680938/某个图片.jpg","orgID":1234},"sex":"1","avatar":"../../static/img/R-C.jpg","userID":2205242,"token":"一个令牌","studentID":"学号","password":"密码","registerMode":1,"freeUser":0,"name":"姓名","tel":"手机号","timestamp":1685362190071},
				courseList: [{"id":119651,"name":"2022-2023-2学期形势与政策（山东高校专版）","cover":"https://obscloud.ulearning.cn/resources/android/mobile/8124418_20230217141542.jpg","courseCode":"92305661","type":1,"classId":626053,"className":"班级名字","status":1,"teacherName":"老师名字","learnProgress":0,"totalDuration":0,"publishStatus":1,"creatorOrgId":2741,"creatorOrgName":"学校名字","classUserId":26526063},{"id":119658,"name":"2022-2023-2学期形势与政策（山东高校专版）","cover":"https://obscloud.ulearning.cn/resources/android/mobile/8124418_20230217141542.jpg","courseCode":"92305661","type":1,"classId":626053,"className":"班级名字","status":1,"teacherName":"老师名字","learnProgress":0,"totalDuration":0,"publishStatus":1,"creatorOrgId":2741,"creatorOrgName":"学校名字","classUserId":26526063}],
				appHomeActivity: [{"id":119651,"info":{"allCount":1,"courseActivityCount":0,"courseActivityDTOList":[],"miniCourseActivityCount":0,"miniCourseActivityDTOList":[],"otherActivityCount":1,"otherActivityDTOList":[{"relationType":1,"relationId":562324,"title":"2023-04-04 15:55  点名","startDate":1680594949000,"status":2,"publishStatus":0,"scoreType":0,"classes":["班级名"],"personStatus":0}]}}]
			}
		},
		onLoad() {
		},
		onShow() {
			if(getApp().globalData.changeUser==1){// 需要更新用户信息
				this.upPageUserData();
				getApp().globalData.changeUser=0;
			}
		},
		methods: {
			async upPageUserData(){// 更新用户全部数据，包括基本信息和课程信息
				let user = getApp().globalData.nowUser;
				if(user==undefined){
					uni.showToast({
						"title": "未选择用户,请先在账户页面选择一个用户",
						"icon": "error"
					})
					return;
				}
				let getlogininfo = await UserLogin(user.phone, user.passwd);
				console.log("登录信息:");
				console.log(getlogininfo);
				if(getlogininfo.code != 200){
					uni.showToast({
						"title": getlogininfo.message,
						"icon": 'error'
					})
					return;
				}
				let deuserinfo = DeLoginResult(getlogininfo.result);
				console.log("响应包解密结果："+deuserinfo);
				this.userInfo = JSON.parse(deuserinfo);
				// 更新用户课程
				this.upPageUserCourseList();
			},
			async upPageUserCourseList(Authorization){// 更新用户课程
				if((Authorization == undefined) || (typeof Authorization !== 'string')){
					Authorization = this.userInfo.token;
				}
				let getUserCourseList = await UserCourseList(Authorization);
				console.log("获取到用户课程列表：");
				console.log(getUserCourseList);
				if(getUserCourseList==undefined){
					uni.showToast({
						"title": "获取用户课程列表失败",
						"icon": "error"
					})
					return;
				}
				this.courseList = getUserCourseList.courseList;
				// 更新课程首页活动
				// this.upAppHomeActivityList();
			},
			async upAppHomeActivityList(Authorization){// 获取课程首页活动，appHomeActivity
				if((Authorization == undefined) || (typeof Authorization !== 'string')){
					Authorization = this.userInfo.token;
				}
				let newappHomeActivityJson = [];
				this.courseList.forEach(async(v, i) => {
					console.log("获取课程首页信息");
					let appHomeActivity = await AppHomeActivityList(String(v.id), Authorization);
					console.log(appHomeActivity);
					newappHomeActivityJson.push({"id":v.id,"info":appHomeActivity});
				})
				this.appHomeActivity = newappHomeActivityJson;
			}
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
		margin-bottom: 10rpx;
		width: 100%;
		background: #ced4da;
		position: relative;
		overflow: hidden;
	}
	#showHead{
		position: absolute;
		height: 100%;
		width: 20%;
		min-width: 150px;
		left: 5%;
		overflow: hidden;
		display: flex;
		justify-content: flex-start;
	}
	#showHead > image{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: flex-start;
		border-radius: 5rpx;
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
	#courseListShow{
		width: 90%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		padding: 10rpx 0;
		margin: 10rpx 0;
		background: #edf2ff;
		position: relative;
		border-radius: 10rpx;
		overflow: hidden;
	}
	.courseBlockShow{
		/* 奇怪的bug，无法使用flex居中 */
		width: 90%;
		position: relative;
		border: 2rpx solid #91a7ff;
		border-radius: 10rpx;
		overflow: hidden;
		margin: 1% 0;
		left: 3%;
		padding: 1%;
	}
	.courseBlockShowInfo_swiper{
		border-bottom: 1rpx solid #91a7ff;
		
	}
	.courseBlockShowInfo{
		width: 100%;
		height: 100rpx;
		border-bottom: 1rpx solid #91a7ff;
		position: relative;
		display: flex;
		flex-direction: row;
	}
	.courseBlockShow_img{
		width: 30%;
		overflow: hidden;
		border-radius: 5rpx;
		margin: 0 5rpx 5rpx 0;
		position: relative;
	}
	.courseBlockShow_img_img{
		width: 100%;
	}
	.courseBlockShow_text{
		width: 70%;
	}
	.courseBlockShow_swiper_index{
		position: absolute;
		left: 30%;
		width: 40%;
		font-size: 3rem;
		color: #b1d5c8;
		z-index: -1;
		text-align: center;
	}
	.activities_swiper{
		overflow-y: scroll;
		height: 300rpx;
	}
	.activities_show{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.ActivityType{
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 5rpx 0;
		border-left: 3rpx solid #26a8a2;
	}
	.ActivityType > view:first-child{
		color: #8559ff;
	}
	.ActivityType > view:nth-child(2){
		color: #26a8a2;
	}
	.ActivityType > view:last-child{
		color: #135552;
	}
	.activitydetaillist{
		
	}
</style>
