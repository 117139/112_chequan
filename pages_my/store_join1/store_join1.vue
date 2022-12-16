<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<view class="banner_box">
			<u-swiper class="banner_img" :list="list1"   @click="click_fuc" height="364rpx" radius='0' :circular="true" :autoplay="false"></u-swiper>
			<view class="store_box">
				<view class="store_box_b">
					<view class="sb_t">
						<view class="sb_t_name">
							{{datas.title}}
							<view v-if="datas.examine==2" class="rz_icon">
								<image src="/static/images/order_ok.png" mode="aspectFit"></image>
								<text>入驻成功</text>
							</view>
							<!-- <view v-if="datas.examine==1" class="rz_icon">
								<image src="/static/images/order_ok.png" mode="aspectFit"></image>
								<text>审核中</text>
							</view>
							<view v-if="datas.examine==3" class="rz_icon">
								<image src="/static/images/order_ok.png" mode="aspectFit"></image>
								<text>未通过</text>
							</view> -->
						</view>
						<view class="sb_t_num">
							<text class="iconfont icon-dianhuatianchong"></text>
							{{datas.phone}}
						</view>
						<view class="sb_t_num">
							<text class="iconfont icon-daohangdizhi"></text>
							{{datas.address}}
						</view>
					</view>
					<view class="sb_b">
						<view class="sb_b_t">服务详细</view>
						<view class="sb_b_inr">
							{{datas.content}}
						</view>
					</view>
				</view>
				<view class="reset_btn"  @tap="$service.jump" data-url="/pages_my/store_join/store_join">修改信息</view>
				<view  v-if="datas.examine==2" class="sub_btn" @tap="$service.jump" :data-url="'/pages_my/store_fb/store_fb?type1=1&type='+store_type">我要发布</view>
				<view  v-if="datas.examine==1" class="sub_btn sub_btn1" >审核中</view>
				<view  v-if="datas.examine==3" class="sub_btn sub_btn2" >审核失败</view>
				<view  v-if="datas.examine==3" class="examine_tip" >审核原因：{{datas.examine_content||''}}</view>
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
				list1: [
						'/static/images/lx1.jpg',
				],
				cur:0,
				store_type:1
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
			console.log(e)
			that.datas=that.loginDatas.store
			if(that.datas){
				that.list1=that.datas.banner.map((item)=>{
					return that.$service.getimg(item)
				})
				that.store_type=that.datas.status-1
			}
			that.getdata()
		},
		onShow() {
			// that.onRetry()
		},
		
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			click_fuc(e){
				console.log(e)
			},
			onRetry(){
				that.page=1
				that.datas=[]
				that.getdata()
			},
			getdata1(){
				
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
			getdata(){
				uni.$emit('login_fuc', {
					title: ' 刷新信息 ',
					content: 'item.id'
				});
				return
				var datas={
					id: that.loginDatas.store.id||''
				}
				var jkurl='/detail/store'
				
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
						that.datas=datas
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
page{
	// background: #fff;
}
.wrap_box{
	background: #f8f8f8;
	padding-bottom: 40rpx;
}
.banner_box {
	width: 100%;
	position: relative;
	.banner_img{
		position: relative;
		z-index: 900;
		margin-bottom: -30rpx;
	}
	.store_box{
		// margin-top: -30rpx;
		position: relative;
		z-index: 9999;
		padding: 0 28rpx;
		.store_box_b{
			width: 100%;
			background: #fff;
			border-radius: 10rpx;
			padding: 30rpx 0;
			margin-bottom: 150rpx;
			.sb_t{
				width: 100%;
				padding: 0 30rpx 30rpx;
				border-bottom: 1px solid #eee;
				.sb_t_name{
					font-size: 36rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #333333;
					display: flex;
					align-items: center;
					.rz_icon{
						margin-left: 8rpx;
						width: 171rpx;
						height: 48rpx;
						background: rgba(70,128,230,0.1);
						border: 1px solid #4680E6;
						border-radius: 24rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 24rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #4680E6;
						line-height: 32rpx;
						image{
							width: 32rpx;
							height: 32rpx;
							margin-right: 8rpx;
						}
					}
				}
				.sb_t_num{
					margin-top: 20rpx;
					display: flex;
					font-size: 28rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #666666;
					line-height: 32rpx;
					text{
						font-size: 26rpx;
						color: #bbb;
						line-height: 32rpx;
					}
				}
			}
			.sb_b{
				width: 100%;
				padding: 30rpx 30rpx 0;
				.sb_b_t{
					padding-left: 20rpx;
					font-size: 32rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #333333;
					line-height: 36rpx;
					position: relative;
					margin-bottom: 20rpx;
					&:before{
						content: '';
						position: absolute;
						left: 0;
						top: 50%;
						margin-top: -15rpx;
						width: 5rpx;
						height: 30rpx;
						background: #4680E6;
						border-radius: 3rpx;
					}
				}
				.sb_b_inr{
					font-size: 28rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #666666;
					line-height: 52rpx;
				}
			}
		}
	}
}
.reset_btn{
	width: 100%;
	height: 90rpx;
	border: 1px solid #4680E6;
	border-radius: 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 32rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #4680E6;
}
.sub_btn{
	margin-top: 20rpx;
	width: 100%;
	height: 90rpx;
	border: 1px solid #4680E6;
	background: #4680E6;
	border-radius: 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 32rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #fff;
	&.sub_btn1{
		border: 1px solid #ddd;
		background: #eee;
		color: #666;
	}
	&.sub_btn2{
		border: 1px solid #ff0000;
		background: #ff0000;
		color: #fff;
	}
}
.examine_tip{
	color: #f00;
	font-size: 26rpx;
	padding: 20rpx 0;
	line-height: 34rpx;
}
</style>
