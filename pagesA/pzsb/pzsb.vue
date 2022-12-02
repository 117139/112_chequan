<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<view class="cz_tip"><text class="iconfont icon-yanzhengma"></text>以下信息仅供交管局查询使用，我们将严格保密</view>
		<block v-if="!srcImg">
		
		
		  <!-- camera -->
		  <!-- <camera device-position="back" flash="off" binderror="error" style="width: 100%; height: 528rpx;"> -->
			<view class="camera_ls">
		    <!-- <cover-view class="camera_box "> -->
		    <view class="camera_box ">
		      <cover-view class="camera_th">
		        <cover-view class="camera_title">中华人民共和国机动车行驶证</cover-view>
		        <cover-view class="camera_num">号牌号码</cover-view>
		      </cover-view>
		
		      <cover-view class="camera_bottom x_f">
		        <cover-view class="camera_code">
		        </cover-view>
		        <cover-view class="camera_text ">
		          <cover-view>车辆识别代号</cover-view>
		          <cover-view>发动机号码</cover-view>
		          <cover-view>注册日期</cover-view>
		        </cover-view>
		      </cover-view>
		    </view>
		    <!-- </cover-view> -->
			</view>
		  <!-- </camera> -->
		</block>
		<image class="camera_img" :src="$service.getimg(srcImg)" mode="aspectFill" v-else></image>
		<view class="driving">
		  <view>请确认信息完整，避免反光、模糊导致无法识别</view>
		  <image src="/static/images/home_img_03@2x.png"></image>
		</view>
		<!-- <view @click="$service.jump" data-url="/pagesA/pzsb_n/pzsb_n">pzsb_n</view> -->
		<view class="b_box">
			<view class="b_box1" v-if="!srcImg">
				<view class="b_lr" @click="upimg_fuc">
					<image src="/static/images/home_icon_13@2x.png" mode="aspectFit"></image>
					<text>相册选取</text>
				</view>
				<view class="b_c">
					<view></view>
				</view>
				<view class="b_lr" @click="$service.back">
					<image src="/static/images/home_icon_14@2x.png" mode="aspectFit"></image>
					<text>手动输入</text>
				</view>
			</view>
			<view class="b_box1" v-else>
				<view class="b_btn1" @click="srcImg=''">重新拍照</view>
				<view class="b_btn" @click="ok_fuc">确认使用</view>
			</view>
		</view>
		<!-- 阻止滑动 -->
		<!-- <view @touchmove.stop.prevent='test'></view> -->
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
				options:'',
				datas:'',
				page:1,
				srcImg:''
			}
		},
		computed: {
		...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','loginDatas']),
		},
		// onReachBottom() {
		// 	that.getdata()
		// },
		onLoad(e) {
			that=this
			that.options=e||{}
			//type 1 查状态    2 年检   3 车型识别   4 查违章   5免费评估
			console.log(e)
			uni.chooseImage({
				count:1,
				sizeType: ['original', 'compressed'],
				sourceType: ['camera'],
				success: function(res) {
					console.log(res)
					const tempFilePaths = res.tempFilePaths
					
					// const imglen = that.img_list.length
					var e={
						currentTarget:{
							dataset:{}
						}
					}
					that.upimg(tempFilePaths, 0,e)
					
				}
			});
			// that.getdata()
		},
		onShow() {
			// that.onRetry()
		},
		
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			ok_fuc(){
				uni.navigateBack()
			},
			upimg_fuc(e){
				var that=this
				var edatas=e.currentTarget.dataset
				uni.showActionSheet({
					itemList: ['拍照', '相册选择'],
					success: function(res) {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						var sourceType = ['camera', 'album']
						if (res.tapIndex == 0) {
							sourceType = ['camera']
						} else {
							sourceType = ['album']
						}
						// var len=that.img_arr
						uni.chooseImage({
							count:1,
							sizeType: ['original', 'compressed'],
							sourceType: sourceType,
							success: function(res) {
								console.log(res)
								const tempFilePaths = res.tempFilePaths
								
								// const imglen = that.img_list.length
								
								that.upimg(tempFilePaths, 0,e)
								
							}
						});
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			
			upimg(imgs, i,e) {
			  
			  	var that=this
				var edatas=e.currentTarget.dataset||{}
				if(that.$service.appVN==0){
					var datas=imgs[i]
					
					that.srcImg=datas
					return
				}
				that.$service.wx_upload(imgs[i]).then(res => {
							
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(i)
						// that.img_arr.push(datas)
						
						that.srcImg=datas
						
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
			
			onRetry(){
				that.page=1
				that.datas=[]
				that.getdata()
			},
			getdata(){
				
				var datas={
					// day:that.date,
					page: that.page
				}
				uni.showLoading({
					mask:true,
					title:'正在获取数据'
				})
				var jkurl='/history'
				var nowpage=that.page
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
						if(nowpage==1){
							that.datas=datas.data
						}else{
							if(datas.data.length==0){
								return
							}
							that.datas=that.datas.concat(datas.data)
						}
						if(datas.data.length==0){
							return
						}
						that.page++
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
			// 单条数据
			getdata1(){
				
				var datas={
					id: that.options.id
				}
				var jkurl='/news_detail'
				
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
						that.datas=datas.content
						// if(datas.title){
						// 	uni.setNavigationBarTitle({
						// 		title:datas.title
						// 	})
						// }
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
			
			goback(){
			  uni.navigateBack()
			},
			func(){
				// that.$store.commit('setSystem',datas.system)
			}
		}
	}
</script>

<style lang="scss" scoped>
.wrap_box{
	background: #fff;
}
.cz_tip{
	width: 100%;
	height: 64rpx;
	background: rgba(70, 128, 230, .1);
	display: flex;
	align-items: center;
	font-size: 24rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #4680E6;
	padding: 0 28rpx;
	text{
		font-size: 24rpx;
		margin-right: 10rpx;
	}
}
.driving {
  margin-top: 40rpx;
  font-size: 30rpx;
  text-align: center;
  color: #010101;
	image {
	  margin-top: 8rpx;
	  width: 418rpx;
	  height: 275rpx;
	}
}
.b_box{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: 990;
	background: #FFFFFF;
	// box-shadow: 0px 0px 30px 0px rgba(151,154,162,0.2);
	padding-bottom: 0;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	.b_box1{
		width: 100%;
		padding: 10rpx 28rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.b_lr{
			flex: 1;
			font-size: 28rpx;
			color: #000;
			display: flex;
			flex-direction: column;
			align-items: center;
			image{
				width: 47rpx;
				height: 47rpx;
				margin-bottom: 20rpx;
			}
		}
		.b_c{
			margin: 0 100rpx;
			width: 112rpx;
			height: 112rpx;
			background: rgba(70, 128, 230, .1);
			border-radius: 50%;
			padding: 15rpx;
			view{
				width: 100%;
				height: 100%;
				background: #4680E6;
				border-radius: 50%;
			}
		}
		.b_btn1{
			width: 318rpx;
			height: 90rpx;
			border: 1px solid #4680E6;
			background: #fff;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #4680E6;
		}
		.b_btn{
			width: 318rpx;
			height: 90rpx;
			background: #4680E6;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #F5F5F5;
		}
	}
}







/* 相机 */
.camera_ls{
	width: 100%; 
	height: 528rpx;
	background: #000;
	padding: 30rpx;
}
.camera_box {
  width: 690rpx;
  height: 468rpx;
  padding: 33rpx  35rpx 24rpx;
  // margin: 30rpx auto;
  /* background: #B2AFAA; */
  box-sizing: border-box;
  border: 1px solid #FFFFFF;
  border-radius: 30rpx;
  color: #fff;
  font-size: 20rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.camera_th {
		.camera_title {
		  text-align: center;
		  font-size: 32rpx;
		}
		.camera_num {
		  margin-top: 22rpx;
		}
	}
	
	.camera_bottom{
		display: flex;
		// flex-direction: column;
		// justify-content: space-between;
		.camera_code {
		  width: 151rpx;
		  height: 151rpx;
		  margin-right: 16rpx;
		  border: 1px solid #FFFFFF;
		}
		.camera_text {
		  height: 130rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
	}
	
}


.camera_img {
  display: block;
  width: 100%;
  height: 508rpx;
}
</style>
