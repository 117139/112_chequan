<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<view class="banner_box">
			<u-swiper class="banner_img" :list="list1"   @click="click_fuc" height="364rpx" radius='0' :circular="true"></u-swiper>
			<view class="store_box">
				<view class="store_box_b">
					<view class="sb_t">
						<view class="sb_t_name">
							南中环二手车店
							<view class="rz_icon">
								<image src="/static/images/order_ok.png" mode="aspectFit"></image>入驻成功
							</view>
						</view>
						<view class="sb_t_num">
							<text class="iconfont icon-dianhuatianchong"></text>
							18612345678
						</view>
						<view class="sb_t_num">
							<text class="iconfont icon-daohangdizhi"></text>
							北京朝阳区来广营乡北园东路顾家庄桥北300米 路西
						</view>
					</view>
					<view class="sb_b">
						<view class="sb_b_t">服务详细</view>
						<view class="sb_b_inr">
							二十三年品牌老店汇众车行，长期经营中高端精品二手车，车源充足，车况明，退还有保障。支持7天内退车，15天可换服务。
						</view>
					</view>
				</view>
				<view class="reset_btn"  @tap="$service.jump" data-url="/pages_my/store_join/store_join">修改信息</view>
				<view class="sub_btn" @tap="$service.jump" data-url="/pages_my/store_fb/store_fb">我要发布</view>
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
				cur:0
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
			
			// that.getdata()
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
	border: 1px solid#4680E6;
	background: #4680E6;
	border-radius: 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 32rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #fff;
}
</style>
