<template>
	<view>
		<view class="editProfile">
			<!-- 修改资料 -->
			<view class="head_img_wrap area flex">
				<view class="">
					<!-- <image :src="userImg" mode="scaleToFill" v-if="!userImg"/>
					<image :src="userImg" mode="scaleToFill" v-else/> -->
					<avatar selWidth="250rpx" selHeight="250rpx" @upload="myUpload" :avatarSrc="$service.getimg(userdata.img)"
						avatarStyle="width: 164rpx;height: 164rpx;border-radius: 50%;" inner=true></avatar>
					<view class="" @tap="uploadTo">
						点击切换头像
					</view>
				</view>
			</view>
			<view class="line_one area flex">
				<view class="">
					姓名
				</view>
				<input class="uni-input" type="text" placeholder="请输入" maxlength="5" placeholder-style="color:#999999;font-size: 30rpx;" v-model="userdata.nick">
			</view>
			<picker @change="confirm" :value="index" :range="columns" range-key="title">
			<view class="line_one area flex">
				<view class=" flex_1">
					性别
				</view>
				<view class="each_line_r flex" @tap="show = true">
					
					<view class="" style="margin-right: 16rpx;">
						{{userdata.sex==2?'女':'男'}}
					</view>
					<text class="iconfont icon-next"></text>
				</view>
			</view>
			</picker>
			<!-- <view class="hold area" @tap="$sjuNav.switchTab(`/pages/profile/profile`,{identity:1})"> -->
			<view class="hold area" @tap="sub_fuc">
				<!-- identity 1雇主，2阿姨 -->
				保存资料
			</view>
			
		</view>
			<!-- <view class="hold area" @tap="$sjuNav.switchTab(`/pages/profile/profile`,{identity:1})"> -->
			<view class="hold hold1 area" @tap="logout_fuc">
				<!-- identity 1雇主，2阿姨 -->
				退出登录
			</view>
			<view class="hold hold2 area" @tap="id_del">
				注销账号
			</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	export default {
		data() {
			return {
				userdata:'',
				columns:[
					{
						title:'男',
						sex:1
					},
					{
						title:'女',
						sex:2
					},
				],
				index:0
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginDatas'
			])
		},
		onLoad() {
			that=this
			that.userdata=JSON.parse(JSON.stringify(that.loginDatas))
		},
		methods: {
			// 更新头像
			myUpload(rsp) {
				var avatar = rsp.path
				console.log(avatar)
				if(that.$service.appVN==0){
					that.userdata.img=avatar
					return
					
				}
				that.$service.wx_upload(avatar).then(res => {
							
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(that.userdata)
						// that.setmsg(datas)
						that.userdata.img=datas
					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: "none",
								title: "上传失败"
							})
						}
					}
				}).catch(e => {
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
			},
			sub_fuc(img){
				if(that.$service.appVN==0){
					uni.showToast({
						icon: 'none',
						title: '提交成功'
					})
					
					setTimeout(function(){
						// that.$service.wxlogin('token')
						uni.navigateBack()
					},1000)
					return
					
				}
				// /mine/mine_set
				var jkurl='/member/edit'
				// var address=uni.getStorageSync('kyp_address')||''
				var datas={
					img	:that.userdata.img,
					nick:that.userdata.nick,
					sex:that.userdata.sex,
				}
				that.$service.P_post(jkurl, datas).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						that.htmlReset = 0
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
						uni.showToast({
							icon: 'none',
							title: '提交成功'
						})
						setTimeout(function(){
							that.$service.wxlogin('token')
						},1000)
					} else {
					
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '获取数据失败'
							})
						}
					}
				}).catch(e => {
					that.htmlReset = 1
					that.btnkg = 0
					// that.$refs.htmlLoading.htmlReset_fuc(1)
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败，请检查您的网络连接'
					})
				})
			},
			logout_fuc(){
				uni.showModal({
				    title: '提示',
				    content: '是否退出当前账号',
				    success: function (res) {
				        if (res.confirm) {
				            that.$store.commit('logout')
										// uni.clearStorageSync()
										// uni.setStorageSync('yhxy', 'true')
										uni.showToast({
											title:'退出成功',
											icon:'none'
										})
										setTimeout(function(){
											uni.switchTab({
												url:'/pages/index/index'
											})
										},1000)
				           
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			id_del(){
				uni.showModal({
				    title: '提示',
				    content: '是否注销当前账号',
				    success: function (res) {
				        if (res.confirm) {
										uni.showToast({
											title:'注销申请已提交,工作人员会在3-7个工作日内联系您',
											icon:'none'
										})
				           
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			uploadTo() { //上传本人照片
				uni.chooseImage({
					count: 1,
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						this.userImg = tempFilePaths[0]
					}
				});
			},
			confirm(e) { //选择性别 确定
			console.log(e)
				this.userdata.sex = that.columns[e.detail.value].sex
			},
			cancel() { //取消
				this.show = !this.show;
			},
		}
	}
</script>

<style lang="scss" scoped>
.editProfile{
	width: 100%;
	height: 100%;
	background-color: #fff;
	padding: 0  28rpx;
	.head_img_wrap{
		height: 330rpx;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		font-weight: 400;
		color: #333333;
		border-bottom: 1px solid #EEEEEE;
		image{
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 16rpx;
		}
	}
	.line_one{
		height: 92rpx;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #EEEEEE;
		.uni-input{
			text-align: right;
		}
		.each_line_r {
			// width: 200rpx;
			height: 100%;
			font-size: 30rpx;
			font-weight: 400;
			color: #999999;
			align-items: center;
		}
	}

}
	.hold{
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		font-size: 30rpx;
		font-weight: 400;
		color:$uni-bg-colorf;
		&.hold1{
			// border-top: 1px solid #eee;
			background: #fff;
			margin-top: 100rpx;
			color: #bbb;
		}
		&.hold2{
			border-top: 1px solid #eee;
			background: #fff;
			// margin-top: 100rpx;
			color: #bbb;
		}
	}
</style>
