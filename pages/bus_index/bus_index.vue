<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<topbar bg_img="/static/images/bg_shangjiaruzhu.png">
			<view class="bus_head dis_flex aic">
				<text class="iconfont icon-back"></text>
			</view>
		</topbar>
		<view class="main_box">
			<view class="main_top">
				<view class="bus_top">
					<image class="bus_logo" src="/static/images/car1.png" mode="aspectFill"></image>
				</view>
				<view class="bus_name">
					南中环美容洗车店 <image src="/static/images/shop_vip.png" mode="aspectFit"></image>
				</view>
				<view class="bus_jj">
					这里是30个字以内的服务介绍，这里是30个字以内的服 务介绍……
				</view>
				<view class="bus_tbox dis_flex ju_b">
					<view class="bus_add">
						北京朝阳区来广营乡北园东路顾家庄桥北 300米路西
					</view>
				</view>
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
				page:1
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
.bus_head{
	width: 100%;
	height: 100%;
	// padding: 0 14rpx;
	text{
		font-size: 30rpx;
		color: #fff;
	}
}
.wrap_box{
	width: 100%;
	min-height: 100vh;
	background-image: url(/static/images/bg_shangjiaruzhu.png);
	background-repeat: no-repeat;
	background-size: 100% 266rpx;
	background-position: top;
	// padding: 140rpx 28rpx 20rpx; 
	background-color: #f8f8f8;
}
.main_box{
	padding-top: 100rpx;
	.main_top{
		width: 100%;
		min-height: 530rpx;
		background: linear-gradient(to bottom,#ffffff, #f8f8f8f8);
		border-radius: 30rpx 30rpx 0px 0px;
		padding:0 28rpx;
		.bus_top{
			width: 100%;
			height: 90rpx;
			position: relative;
			.bus_logo{
				position: absolute;
				top: -89rpx;
				left: 0;
				width: 138rpx;
				height: 138rpx;
				border-radius: 10rpx;
			}
		}
		.bus_name{
			font-size: 38rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
			line-height: 52rpx;
			image{
				margin-left: 20rpx;
				width: 184rpx;
				height: 52rpx;
				vertical-align: bottom;
			}
		}
		.bus_jj{
			margin-top: 20rpx;
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #999999;
			line-height: 42rpx;
			margin-bottom: 40rpx;
		}
		.bus_tbox{
			width: 100%;
		}
	}
}
</style>
