<template>
	<view>
		<view id="con">
			<view id="adduser" class="blockcenter">
				<view id="adduser_title">添加优学院账号</view>
				<view id="adduser_con" class="blockcenter">
					<view id="adduser_input" class="blockcenter">
						<input type="number" maxlength="11" placeholder="请输入手机号" v-model="phone" confirm-type="next" :confirm-hold="true"/>
						<input type="text" placeholder="请输入密码" v-model="passwd" confirm-type="done"/>
					</view>
					<view id="adduser_btn" class="blockcenter">
						<button type="primary" @click="addUser">保存</button>
					</view>
				</view>
			</view>
			<view id="showUserList">
				<view id="showUserList_title">已保存的用户信息</view>
				<view id="showUserList_info" class="blockcenter" v-for="(item, index) in userList">
					<div class="showUserList_info_list">
						<view class="userList_phone">手机号: {{item.phone}}</view>
						<view class="userList_passwd">密码: {{item.passwd}}</view>
						<swiper class="showUser_swiper">
							<swiper-item>
								<view class="user_fun">{{index+1}}</view>
							</swiper-item>
							<swiper-item>
								<view class="userList_index">
									<view>
										<view>
											<input type="text" placeholder="请输入新的密码" :value="item.passwd" :ref="'changePasswd'+index" confirm-type="done"/>
										</view>
										<button type="default" @click="changeUserInfo(index)">修改</button>
									</view>
									<view>
										<button type="primary" @click="choUser(item)">选中</button>
										<button type="warn" @click="delUser(item)">删除</button>
									</view>
								</view>
							</swiper-item>
						</swiper>
					</div>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		globalData: {
			nowUser: ""
		},
		data() {
			return {
				phone: "",
				passwd: "",
				userList: []
			}
		},
		onLoad() {
			this.upUserList();
		},
		methods: {
			upUserList(){
				this.userList = []; // 置空
				let that = this;// 奇怪的语法，两个this所指不一样
				uni.getStorageInfo({
					success(res) {
						res.keys.forEach((ph, k) => {
							let pa = uni.getStorageSync(ph);
							that.userList.push({"phone": ph, "passwd": pa});
							// myjs.loginBody(ph,pa);
						});
					},
					fail() {
						uni.showToast({
							title: '无法读取本地用户信息'
						});
					}
				})
			},
			addUser(){
				if(this.phone && this.passwd) {
					uni.setStorageSync(this.phone, this.passwd);
					this.userList.push({"phone": this.phone, "passwd": this.passwd});
					uni.showToast({title: "保存成功"});
					this.phone = "";
					this.passwd = "";
				}
			},
			changeUserInfo(index){
				//this.$refs亲测无效
				this.$nextTick(() => {
					let nowPasswd = this.$refs['changePasswd0'].value;
					console.log("nowPasswd:");
					console.log(nowPasswd);
				});
			},
			choUser(user){
				getApp().globalData.nowUser = user;
				getApp().globalData.changeUser = 1;
			},
			delUser(user){
				uni.removeStorageSync(user.phone);
				this.upUserList();
			}
		}
	}
</script>

<style>
	.blockcenter {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	#con {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	#adduser {
		width: 90%;
		display: block;
		background: #edf2ff;
		border-radius: 10rpx;
		padding: 20rpx 0;
		margin: 20rpx 0;
	}

	#adduser_title {
		text-align: center;
	}

	#adduser_con {
		width: 100%;
		flex-direction: row;
	}

	#adduser_input {
		width: 70%;
		flex-direction: column;
	}

	#adduser_btn {
		width: 30%;
	}
	
	input{
		padding-top: 10rpx;
		border-bottom: #5e5e5e solid 1px;
		width: 90%;
	}
	
	#showUserList{
		background: #edf2ff;
		width: 90%;
		border-radius: 10rpx;
		margin: 10rpx 0;
		padding: 20rpx 0;
	}
	#showUserList_title{
		text-align: center;		
	}
	#showUserList_info{
		width: 100%;
	}
	.showUserList_info_list{ 
		width: 90%;
		margin: 5rpx 0;
		padding: 20rpx;
		border-radius: 20rpx;
		background: #dbe4ff;
		position: relative;
		overflow: hidden;
	}
	.userList_index{
		position: absolute;
		right: 30%;
		top: 0rpx;
		color: #888e7e;
		font-style: italic;
		text-shadow: 2px 2px 5px #767c6b;
	}
	.user_fun{
		position: absolute;
		top: 0px;
		right: 0px;
		width: 10%;
		max-width: 100rpx;
		height: 100%;
		background: linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1));
		display: flex;
		justify-content: center;
		align-items: center;
		color: #979db0;
		border-top-left-radius: 50%;
		border-bottom-left-radius: 50%;
	}
	.showUser_swiper{
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 0);
	}
	swiper-item{
	}
	.showUser_swiper swiper-item:last-child{
		background: #ffffff;
		position: relative;
	}
	.userList_index{
		position: absolute;
		left: 0px;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.userList_index > view{
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0 10rpx;
	}
</style>
