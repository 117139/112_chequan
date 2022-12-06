<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<u-sticky>
		<scroll-view class="tab_list scroll_x" scroll-x="true">
			<view>
				<view class="tab_li" :class="{active:active==index}" @click="setcur(index)" v-for="(item,index) in tabs">
					{{item.title}}
				</view>
			</view>
		</scroll-view>
		</u-sticky>
		<view v-if="active==0" class="datas_list">
			<view class="datas_li" v-for="(item,index) in 5" @click="$service.jump" :data-url="'/pagesA/rgc_zt_jg/rgc_zt_jg?type=1'">
				<!-- <image v-if="index==1" class="datas_li_st" src="/static/images/o_type1.png" mode="aspectFill"></image> -->
				<image v-if="index==2" class="datas_li_st" src="/static/images/o_type2.png" mode="aspectFill"></image>
				<!-- <image v-if="index==3" class="datas_li_st" src="/static/images/o_type3.png" mode="aspectFill"></image> -->
				<image v-else-if="index==4" class="datas_li_st" src="/static/images/o_type4.png" mode="aspectFill"></image>
				<image v-else class="datas_li_st" src="/static/images/o_type0.png" mode="aspectFill"></image>
				<view class="datas_li_cname">
					京A12345
				</view>
				<view class="datas_li_msg">
					支付金额：￥5.00
				</view>
				<view class="datas_li_msg">
					车辆状态：-
				</view>
				<view class="datas_li_msg">
					订单编号：400565312580921
				</view>
				<view class="datas_li_msg">
					下单时间：2022-06-08 18:07:32
				</view>
				<view class="down_btn" v-if="index==2||index==4">
					一键下载图片
				</view>
				<view class="down_btn" v-if="index==4" @click.stop="sub_fuc">
					重新提交
				</view>
			</view>
			
		</view>
		<view v-if="active==1" class="datas_list">
			<view class="datas_li" v-for="(item,index) in 5" @click="$service.jump" :data-url="'/pagesA/rgc_nj_order3/rgc_nj_order3?type=1'">
				<image v-if="index==1" class="datas_li_st" src="/static/images/o_type2.png" mode="aspectFill"></image>
				<!-- <image v-if="index==2" class="datas_li_st" src="/static/images/o_type2.png" mode="aspectFill"></image> -->
				<!-- <image v-if="index==3" class="datas_li_st" src="/static/images/o_type3.png" mode="aspectFill"></image> -->
				<!-- <image v-else-if="index==4" class="datas_li_st" src="/static/images/o_type4.png" mode="aspectFill"></image> -->
				<image v-else class="datas_li_st" src="/static/images/o_type0.png" mode="aspectFill"></image>
				<view class="datas_li_cname">
					京A12345
				</view>
				<view class="datas_li_msg">
					支付金额：￥5.00
				</view>
				<view class="datas_li_msg">
					办理方式：线上年检
				</view>
				<view class="datas_li_msg">
					订单编号：400565312580921
				</view>
				<view class="datas_li_msg">
					下单时间：2022-06-08 18:07:32
				</view>
			</view>
			
		</view>
		<view v-if="active==2" class="datas_list">
			<view class="datas_li" v-for="(item,index) in 5" @click="$service.jump" :data-url="'/pagesA/rgc_sb_jg/rgc_sb_jg'">
				<!-- <image v-if="index==1" class="datas_li_st" src="/static/images/o_type1.png" mode="aspectFill"></image> -->
				<!-- <image v-if="index==2" class="datas_li_st" src="/static/images/o_type2.png" mode="aspectFill"></image> -->
				<!-- <image v-if="index==3" class="datas_li_st" src="/static/images/o_type3.png" mode="aspectFill"></image> -->
				<!-- <image v-else-if="index==4" class="datas_li_st" src="/static/images/o_type4.png" mode="aspectFill"></image> -->
				<!-- <image v-else class="datas_li_st" src="/static/images/o_type0.png" mode="aspectFill"></image> -->
				<view class="datas_li_cname">
					车型识别
				</view>
				<view class="datas_li_msg">
					支付金额：￥5.00
				</view>
				<view class="datas_li_msg">
					车辆识别号：LSVWY4180KN246094
				</view>
				<view class="datas_li_msg">
					订单编号：400565312580921
				</view>
				<view class="datas_li_msg">
					下单时间：2022-06-08 18:07:32
				</view>
			</view>
			
		</view>
		<view v-if="active==3" class="datas_list">
			<view class="datas_li" v-for="(item,index) in 5" @click="jump_fuc(index)"  :data-url="'/pagesA/rgc_zt_jg/rgc_zt_jg?type=4'">
				<!-- <image v-if="index==1" class="datas_li_st" src="/static/images/o_type1.png" mode="aspectFill"></image> -->
				<!-- <image v-if="index==2" class="datas_li_st" src="/static/images/o_type2.png" mode="aspectFill"></image> -->
				<image v-if="index==1" class="datas_li_st" src="/static/images/o_type3.png" mode="aspectFill"></image>
				<image v-else-if="index==2" class="datas_li_st" src="/static/images/o_type5.png" mode="aspectFill"></image>
				<image v-else class="datas_li_st" src="/static/images/o_type0.png" mode="aspectFill"></image>
				<view class="datas_li_cname">
					京A12345
				</view>
				<view class="datas_li_msg">
					支付金额：￥5.00
				</view>
				<view class="datas_li_msg">
					<text  v-if="index==1">违章信息：恭喜您该车无违章</text>
					<text v-else-if="index==2">违章信息：该车有违章</text>
					<text v-else>违章信息：-</text>
				</view>
				<view class="datas_li_msg">
					订单编号：400565312580921
				</view>
				<view class="datas_li_msg">
					下单时间：2022-06-08 18:07:32
				</view>
				<view class="down_btn" v-if="index==2">
					一键下载图片
				</view>
				<!-- <view class="down_btn" v-if="index==4">
					重新提交
				</view> -->
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
				tabs:[
					{
						title:'人工查状态',
					},
					{
						title:'急速年检',
					},
					{
						title:'车型识别',
					},
					{
						title:'人工查违章',
					},
				],
				options:'',
				datas:'',
				page:1,
				active:0
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
			that.active=e.type||0
			console.log(e)
			
			// that.getdata()
		},
		onShow() {
			// that.onRetry()
		},
		
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			sub_fuc(){
				// uni.showToast({
				// 	icon:'none',
				// 	title:'提交成功'
				// })
				if(that.active==0){
					uni.navigateTo({
						url:'/pagesA/rgc_zt/rgc_zt'
					})
				}
				if(that.active==3){
					uni.navigateTo({
						url:'/pagesA/rgc_wz/rgc_wz'
					})
				}
			},
			jump_fuc(e){
				if(e!=1){
					uni.navigateTo({
						url:'/pagesA/rgc_zt_jg/rgc_zt_jg?type=4'
					})
				}
			},
			setcur(index){
				that.active=index
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
	width: 100%;
	min-height: 100vh;
	// #ifdef H5
	min-height: calc(100vh -  44px);
	// #endif
	background: #f8f8f8;
}
.tab_list{
	width: 100%;
	height: 100rpx;
	padding: 0 28rpx;
	background: #f8f8f8;
	.tab_li{
		display: inline-flex;
		height: 100rpx;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #666666;
		&+.tab_li{
			margin-left: 60rpx;
		}
		&.active{
			color: #4680E6;
			position: relative;
			&::after{
				content: '';
				position: absolute;
				bottom: 14rpx;
				left: 50%;
				width: 68rpx;
				height: 6rpx;
				background: #4680E6;
				border-radius: 3rpx;
				margin-left: -34rpx;
			}
		}
	}
}
.datas_list{
	width: 100%;
	padding:10rpx 28rpx 28rpx;
	.datas_li{
		width: 100%;
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 42rpx 28rpx;
		position: relative;
		&+.datas_li{
			margin-top: 22rpx;
		}
		.datas_li_st{
			position: absolute;
			top: 0;
			right: 0;
			width: 100rpx;
			height: 100rpx;
		}
		.datas_li_cname{
			font-size: 32rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
			padding-left: 19rpx;
			position: relative;
			margin-bottom: 14rpx;
			&::after{
				position: absolute;
				left: 0;
				content: '';
				width: 6rpx;
				height: 28rpx;
				background: #4680E6;
				border-radius: 3rpx;
				top: 50%;
				margin-top: -14rpx;
			}
		}
		.datas_li_msg{
			font-size: 28rpx;
			line-height: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #999999;
			padding: 12rpx 0;
		}
		.down_btn{
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 80rpx;
			background: #4680E6;
			border-radius: 10rpx;
			margin-top: 22rpx;
		}
	}
}
</style>
