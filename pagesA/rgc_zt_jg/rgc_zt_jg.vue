<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<view class="banner_box">
			<u-swiper  :list="list1" @click="click_fuc" height="384rpx" radius='5' :circular="true" 
				:indicator="true"
			  :autoplay="false" 
				indicatorMode="dot"></u-swiper>
		</view>
		<view v-if="options.type==4" class="jg_box jg_box_wz">
			<view class="jg_tit">京A12345</view>
			<image v-if="order_type==1" class="datas_li_st" src="/static/images/o_type1.png" mode="aspectFill"></image> <!-- 完成 -->
			<image v-else-if="order_type==2" class="datas_li_st" src="/static/images/o_type2.png" mode="aspectFill"></image> <!-- 已查 -->
			<image v-else-if="order_type==3" class="datas_li_st" src="/static/images/o_type3.png" mode="aspectFill"></image><!-- 正常 -->
			<image v-else-if="order_type==4" class="datas_li_st" src="/static/images/o_type4.png" mode="aspectFill"></image><!-- 有误 -->
			<image v-else-if="order_type==5" class="datas_li_st" src="/static/images/o_type4.png" mode="aspectFill"></image><!-- 违章 -->
			<image v-else class="datas_li_st" src="/static/images/o_type0.png" mode="aspectFill"></image> <!-- 待办 -->
			<view v-if="order_type==3" class="order_text" style="color: #4680E6;">恭喜您暂无违章记录</view>
			<view v-if="order_type==5" class="order_text" style="color: #E2382F;">该车有违章记录</view>
			<view v-if="order_type==0" class="order_text" style="color: #999999;">正在处理中，请稍后查看</view>
			<view v-if="order_type==4" class="order_text" style="color: #E2382F;">您输入的车牌号或车辆识别代号有误</view>
		</view>
		<view v-if="options.type==4" class="jg_box jg_box_wz">
			<view class="jg_tit">京A12345</view>
			
			<image  class="datas_li_st" src="/static/images/o_type4.png" mode="aspectFill"></image><!-- 违章 -->
			<view  class="order_text" style="color: #E2382F;">该车有违章记录</view>
		</view>
		<view v-if="options.type==4" class="jg_box jg_box_wz">
			<view class="jg_tit">京A12345</view>
			
			<image  class="datas_li_st" src="/static/images/o_type0.png" mode="aspectFill"></image><!-- 待办 -->
			<view  class="order_text" style="color: #999999;">正在处理中，请稍后查看</view>
		</view>
		<view v-if="options.type==4" class="jg_box jg_box_wz">
			<view class="jg_tit">京A12345</view>
			
			<image  class="datas_li_st" src="/static/images/o_type4.png" mode="aspectFill"></image><!-- 有误 -->
			<view  class="order_text" style="color: #E2382F;">您输入的车牌号或车辆识别代号有误</view>
		</view>
		
		<view class="jg_box">
			<view class="jg_tit">订单信息</view>
			<view class="jg_li">
				订单编号：400565312580921
			</view>
			<view class="jg_li">
				下单时间：2022-06-08 18:07:32
			</view>
			<view class="jg_li">
				支付时间：2022-06-08 18:07:56
			</view>
			<view class="jg_li">
				支付金额：￥5.00
			</view>
			<view class="jg_li">
				支付方式：微信
			</view>
		</view>
		<view class="jg_btn" @click="down_fuc">一键下载图片</view>
		<view class="jg_btn" @click="sub_fuc">重新提交</view>
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
						'/static/images/car2.png',
						'/static/images/car2.png',
						'/static/images/car2.png',
				],
				order_type:3
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
			//type 1 查状态    2 年检   3 车型识别   4 查违章
			console.log(e)
			if(e.type==1){
				uni.setNavigationBarTitle({
					title:'人工查状态'
				})
			}
			if(e.type==4){
				uni.setNavigationBarTitle({
					title:'订单详情'
				})
			}
			// that.getdata()
		},
		onShow() {
			// that.onRetry()
		},
		
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			down_fuc(){
				uni.showToast({
					icon:'none',
					title:'下载成功'
				})
			},
			sub_fuc(){
				uni.showToast({
					icon:'none',
					title:'提交成功'
				})
			},
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
.wrap_box{
	background: #F8F8F8;
	padding: 28rpx;
}
.banner_box{
	width: 100%;
	margin-bottom: 20rpx;
}
.jg_box{
	width: 100%;
	background: #FFFFFF;
	border-radius: 10rpx;
	padding: 28rpx;
	margin-bottom: 80rpx;
	position: relative;
	&.jg_box_wz{
		margin-bottom: 22rpx;
	}
	.jg_tit{
		font-size: 32rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #333333;
		position: relative;
		padding-left: 20rpx;
		margin-bottom: 15rpx;
		&:before{
			content:'';
			position: absolute;
			left: 0;
			top: 50%;
			margin-top: -14rpx;
			width: 6rpx;
			height: 28rpx;
			background: #4680E6;
			border-radius: 3rpx;
		}
	}
	.jg_li{
		font-size: 28rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #999999;
		line-height: 35rpx;
		padding: 5rpx 0;
	}
	
	
	.datas_li_st{
		position: absolute;
		top: 0;
		right: 0;
		width: 84rpx;
		height: 76rpx;
	}
	.order_text{
		font-size: 32rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #999;
		width: 100%;
		height: 110rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
.jg_btn{
	font-size: 32rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #FFFFFF;
	width: 100%;
	height: 90rpx;
	background: #4680E6;
	border-radius: 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 22rpx;
}
</style>
