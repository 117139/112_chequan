<template>
	<view class="content">
		<topbar>
			<view class="my_header dis_flex aic">
				<image class="h_add" src="/static/images/icon_address.png" mode="aspectFit" @click="getadd"></image>
				<view v-if="addmsg.address" class="flex_1 h_add_text"  @click="getadd">{{addmsg.address.city||'--'}}</view>
				<view v-else class="flex_1 h_add_text"  @click="getadd">--</view>
				<image  @tap="$service.jump" data-url="/pagesA/search/search" class="h_iconr" src="/static/images/icon_find.png" mode="aspectFit"></image>
				<image @click="$service.call" :data-tel="p_config.kf_phone" class="h_iconr" src="/static/images/icon_kefu.png" mode="aspectFit"></image>
			</view>
		</topbar>
		<view  v-if="list1.length>0" class="mbanner">
			<view class="banner_box">
				<u-swiper :list="list1"  keyName="img"  @click="click_fuc" height="286rpx" radius='5' :circular="true" indicator indicatorMode="line"></u-swiper>
			</view>
		</view>
		<view class="pttz_box">
			<image class="pttz_img" src="/static/images/pttz_icon.png" mode="aspectFit"></image>
			<swiper class="card-swiper1" :indicator-dots="false" :circular="true" :vertical="true" :autoplay="true" interval="6000"
				duration="500" indicator-color="#8799a3" indicator-active-color="#0081ff">
				<swiper-item class="dis_flex aic" v-for="(item,index) in notify">
					<view>{{item.title}}</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- <scroll-view class="scroll_x order_list" scroll-x="true" >
			<view>
				<view class="order_li" v-for="(item,index) in 4" @click="$service.jump" data-url="/pages/details_motor/details_motor">
					<view class="order_li_box">
						<view class="order_li_tl">今日上新</view>
						<image class="order_li_l" src="/static/images/motor.jpg" mode="aspectFit"></image>
						<view class="order_li_r">
						
							<view class="order_tip oh1">雅马哈MT-09 STD</view>
							<view class="order_code">官方指导价12.9万元</view>
							<view class="order_pri"><text>12.6</text>万</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view> -->
		<view class="fb_list" @click="$service.jump" data-url="/pages_my/store_fb/store_fb?type1=1&type=1">
			<view class="fb_li">
				<image src="/static/images/fbi_mt.png" mode="aspectFill"></image>
			</view>
			<view class="fb_li" @click="$service.jump" data-url="/pages_my/my_luxian/my_luxian?type=1">
				<image src="/static/images/fbi_xl.png" mode="aspectFill"></image>
			</view>
		</view>
		<view v-if="datas.length>0" class="mt_cbox">
			<view class="mt_cboxtit dis_flex aic">
				<view class="mt_cboxtit_l">附近经销商</view>
				<view class="flex_1">/  甄选优质经销商 省心又省钱</view>
				<view @click="$service.jump" data-url="/pagesA/mt_list/mt_list">更多<text class="icon icon-next"></text></view>
			</view>
			<block v-for="(item,index) in datas">
			<view class="mt_msg dis_flex aic" @click="$service.jump" :data-url="'/pages/bus_index/bus_index?type=1&id='+item.id">
				<image class="mt_msg_l" :src="$service.getimg(item.banner)" mode="aspectFill"></image>
				<view class="mt_msg_r">
					<view class="mt_msg_r1">{{item.title||''}}</view>
					<view class="mt_msg_r2">
							<image class="h_add" src="/static/images/icon_address_h.png" mode="aspectFit">
							</image>{{item.address||''}}
					</view>
				</view>
			</view>
			</block>
		</view>
		
		<view class="index_main_tit dis_flex aic">
			<view class="i_tit_li" :class="{active:cur==0}" @click="setcur(0)"><text>精选推荐</text></view>
			<view class="i_tit_li" :class="{active:cur==1}" @click="setcur(1)"><text>路线分享</text></view>
			<view class="flex_1"></view>
		</view>
		<view v-if="cur==0" class="car_list dis_flex fww">
			<view class="car_li" v-for="(item,index) in datas_car" @click="$service.jump" :data-url="'/pages/details_motor/details_motor?id='+item.id">
				<view class="car_li_box">
					<image class="car_li_img" :src="$service.getimg(item.banner)" mode="aspectFill"></image>
					<view class="car_li_msg">
						<view class="car_li_tit oh2">{{item.title}}</view>
						<view class="car_li_jl oh1">官方指导价：{{$service.getnum(item.y_price)||''}}</view>
						<view class="car_li_num">{{$service.getnum(item.price)||''}}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="cur==1" class="car_list dis_flex fww">
			<view class="car_li" v-for="(item,index) in datas_car"  @click="$service.jump" :data-url="'/pages/lx_details/lx_details?id='+item.id">
				<view class="car_li_box">
					<image class="car_li_img"  :src="$service.getimg(item.banner)" mode="aspectFill"></image>
					<view class="car_li_msg">
						<view class="car_li_tit oh2">{{item.title}}</view>
						
						<view v-if="item.is_zan==1" class="car_li_sc car_li_sc1 dis_flex aic" >
							<text class="icon icon-xihuan1"></text>
							{{item.zan||0}}
						</view>
						<view v-else class="car_li_sc dis_flex aic" >
							<text class="icon icon-xihuan"></text>
							{{item.zan||0}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more v-if="listc_status" :status="listc_status" :contentText="contentText"></uni-load-more>
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
				list1: [
						// '/static/images/banner_motor.png',
						// '/static/images/banner_motor.png',
						// '/static/images/banner_motor.png',
				],
				cur:0,
				datas:[],
				
				listc_status:'loading',
				contentText:{contentdown: "上拉显示更多",contentrefresh: "正在加载...",contentnomore: "暂无数据"},
				datas_car:[],
				page:1,
				notify:[]
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin','loginDatas','addmsg','p_config','navdata']),
		},
		onLoad() {
			that =this
			that.getlist(2)
			that.getbanner()
			that.getnotify()
			that.onRetry()
		},
		watch:{
			addmsg(val){
				that.onRetry()
			}
		},
		onReachBottom() {
			that.getlist_car()
			
		},
		methods: {
			/**
			 * @Description 获取地理位置信息
			 * 
			 */
			getadd(){
				uni.getLocation({
					type: 'gcj02',
					// #ifdef APP
					geocode:true,
					// #endif
					success: function (res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						that.$store.commit('setaddmsg',res)
						// that.getdata()
					},
					fail: function (res) {
						console.log(res)
					}
				});
			},
			/**
			 * 店铺列表
			 * @param  status = [1|2|3|4] 类型 1、汽车美容 2、摩托车 3、二手车 4、加油站
			 */
			getlist(status){
				// /index/store
				var datas={
					status:status,
					lat:that.addmsg.latitude||'',
					lng:that.addmsg.longitude||'',
					page:1,
					limit:1
				}
				var jkurl='/index/store'
				that.list_status='loading'
				that.datas=[]
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
						that.datas=datas.data
						// if(datas.total==0){
						// 	that.list_status='noMore'
							
						// }else{
						// 	that.list_status=''
						// }
						// that.getdata_tz()
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
			onRetry(){
					that.page=1
					that.datas_car=[]
					that.getlist_car()
			},
			/**
			 * 列表
			 */
			getlist_car(){
				// /index/store
				var datas={
					// store_id:'',
					lat:that.addmsg.latitude||'',
					lng:that.addmsg.longitude||'',
					// is_hot:'',//是否热门推荐 1、是 2、否
					// search:'',
					page:that.page,
					limit:16
				}
				var jkurl='/index/motorcycle'
				if(that.cur==0){
					jkurl='/index/motorcycle'
					
				}else{
					jkurl='/index/routes'
				}
				that.listc_status='loading'
				
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
							that.datas_car=[]
							that.datas_car=datas.data
						}else{
							that.datas_car=that.datas_car.concat(datas.data)
						}
						
						if(datas.total==0){
							that.listc_status='noMore'
							
						}else{
							that.listc_status=''
						}
						if(datas.data.length>0){
							that.page++
						}
						// that.getdata_tz()
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
			getnotify(){
				var datas={
					type:2,
				}
				var jkurl='/publics/notify'
				
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
						that.notify=datas
						// that.getdata_tz()
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
			getbanner(){
				var datas={
					type:2,
				}
				var jkurl='/publics/banner'
				
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
						that.list1=datas.map(function(item){
							return {
								id: item.id,
								img: that.$service.getimg(item.img),
								is_jump: item.is_jump,
								jump_url: item.jump_url,
								title: item.title,
							}
						})
						// that.getdata_tz()
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
			setcur(index){
				that.cur=index
				that.onRetry()
			},
			click_fuc(e){
				console.log(e)
				var item=that.list1[e]
				if(item.is_jump==2){
					if(item.jump_url==1){
						uni.navigateTo({
							url:'/pagesA/jyz_list/jyz_list'
						})
					}else if(item.jump_url==2){
						uni.navigateTo({
							url:'/pagesA/qcmr_list/qcmr_list'
						})
					}else if(item.jump_url==3){
						uni.navigateTo({
							url:'/pagesA/rgc_zt/rgc_zt'
						})
					}else if(item.jump_url==4){
						uni.navigateTo({
							url:'/pagesA/rgc_nj/rgc_nj'
						})
					}else if(item.jump_url==5){
						uni.navigateTo({
							url:'/pagesA/rgc_mfpg/rgc_mfpg'
						})
					}else if(item.jump_url==6){
						uni.navigateTo({
							url:'/pagesA/rgc_sb/rgc_sb'
						})
					}else{
						uni.navigateTo({
							url:'/pagesA/rgc_wz/rgc_wz'
						})
					}
				}
				if(item.is_jump==3){
					uni.navigateTo({
						url:'/pagesA/xieyi/xieyi?type=2&id='+item.id
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.my_header{
		width: 100%;
		// justify-content: space-between;
		padding: 0 15rpx;
		position: relative;
		z-index: 999;
		.h_add{
			width: 30rpx;
			height: 30rpx;
			margin-right: 15rpx;
		}
		.h_add_text{
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
		}
		.h_iconr{
			width: 40rpx;
			height: 40rpx;
			margin-left: 30rpx;
		}
	}
	.mbanner{
		width: 100%;
		background: #fff;
		height: 180rpx;
		margin-bottom: 150rpx;
		position: relative;
		z-index: 1;
	}
	.banner_box {
		width: 100%;
		padding: 0 28rpx;
		position: absolute;
		top: 20rpx;
		left: 0;
	}
	.pttz_box{
		width: 694rpx;
		height: 76rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		margin: 0 auto 20rpx;
		padding: 0 24rpx;
		display: flex;
		align-items: center;
		.pttz_img{
			width: 115rpx;
			height: 28rpx;
			margin-right: 24rpx;
		}
		.card-swiper1{
			flex:1;
			height: 76rpx;
			font-size: 24rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
			line-height: 76rpx;
		}
	}
	.order_list{
		width: 100%;
		// padding: 0 28rpx;
		padding-left: 28rpx;
		height: 250rpx;
		.order_li{
			display: inline-flex;
			width: 674rpx;
			height: 234rpx;
			// border: 1px solid #DAE7F8;
			// background: linear-gradient(0deg, #E9EEF5 0%, #FFFFFF 100%);
			border-radius: 10rpx;
			position: relative;
			background: #fff;
			&+.order_li{
				margin-left: 20rpx;
			}
			
			.order_li_box{
				width: 100%;
				height: 100%;
				position: relative;
				z-index: 20;
				display: flex;
				align-items: center;
				padding:0 30rpx;
				.order_li_tl{
					position: absolute;
					top: 0;
					left: 0;
					width: 137rpx;
					height: 44rpx;
					background: linear-gradient(0deg, #E0322F 0%, #FC4F4F 100%);
					border-radius: 10rpx 0px 30rpx 0px;
					z-index: 100;
					font-size: 22rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #FFFFFF;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.order_li_l{
					width: 280rpx;
					height: 220rpx;
				}
				.order_li_r{
					flex:1;
					.order_tip{
						height: 42rpx;
						font-size: 32rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #333333;
						line-height: 42rpx;
						margin-bottom: 15rpx;
						font-weight: bold;
					}
					.order_code{
						font-size: 24rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #999999;
						margin-bottom: 15rpx;
					}
					.order_pri{
						font-size: 28rpx;
						font-family: Arial;
						font-weight: bold;
						color: #E2382F;
						text{
							font-size: 42rpx;
						}
					}
				}
			}
		}
	}
	.mt_cbox{
		width: 694rpx;
		min-height: 340rpx;
		background: linear-gradient(90deg, #808CD0 1%, #4B4F9B 97%);
		border-radius: 10rpx;
		margin: 10rpx auto;
		padding: 0 14rpx 14rpx;
		.mt_cboxtit{
			font-size: 24rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #FFFFFF;
			height: 98rpx;
			display: flex;
			align-items: center;
			.mt_cboxtit_l{
				font-size: 32rpx;
				font-family: 35--Regular;
				font-weight: bold;
				color: #FFFFFF;
				margin-right: 15rpx;
			}
		}
		.mt_msg{
			width: 100%;
			min-height: 228rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			padding: 37rpx 10rpx;
			.mt_msg_l{
				width: 230rpx;
				height: 154rpx;
				background: #FFFFFF;
				border-radius: 10rpx;
				margin-right: 30rpx;
			}
			.mt_msg_r{
				.mt_msg_r1{
					font-size: 32rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #333333;
					line-height: 40px;
					margin-bottom: 10rpx;
				}
				.mt_msg_r2{
					font-size: 24rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #999999;
					line-height: 42rpx;
					.h_add{
						width: 28rpx;
						height: 28rpx;
					}
				}
			}
		}
	}
	.index_main_tit{
		width: 100%;
		padding:25rpx 28rpx 18rpx;
		.i_tit_r{
			width: 164rpx;
			height: 52rpx;
			background: #FDC113;
			border-radius: 26rpx;
			padding: 0 10rpx;
			font-size: 24rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 26rpx;
			image{
				width: 26rpx;
				height: 26rpx;
				margin-left: 10rpx;
			}
		}
		.i_tit_li{
			font-size: 32rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #646566;
			position: relative;
			margin-right: 98rpx;
			text{
				position: relative;
				z-index: 20;
			}
			&.active{
				font-size: 36rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #323233;
				&:before{
					content: '';
					position: absolute;
					bottom: 0;
					left: 0;
					width: 160rpx;
					height: 14rpx;
					background: linear-gradient(90deg, #FDC113 0%, #f8f8f8 80%);
					border-radius: 7rpx;
					z-index: 10;
				}
			}
		}
	}
	.data_list{
		width: 100%;
		padding: 0 28rpx;
		.data_li{
			width: 100%;
			background: #fff;
			border-radius: 10rpx;
			margin-bottom: 22rpx;
			.datali_top{
				width: 100%;
				padding: 30rpx 25rpx;
				display: flex;
				align-items: flex-start;
				.datali_top_img{
					width: 138rpx;
					height: 138rpx;
					border-radius: 10rpx;
					margin-right: 20rpx;
				}
				.datali_top_msg{
					flex:1;
					.datalimsg_tit{
						font-size: 32rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #333333;
						line-height: 40rpx;
						margin-bottom: 18rpx;
					}
					.datalimsg_add{
						font-size: 24rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #BBBBBB;
						line-height: 38rpx;
						margin-bottom: 18rpx;
					}
					.datalimsg_dh{
						width: 96rpx;
						height: 41rpx;
						background: rgba(70,128,230,0.1);
						border: 1px solid #4680E6;
						border-radius: 10rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 24rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #4680E6;
						image{
							width: 18rpx;
							height: 18rpx;
							margin-right: 10rpx;
						}
					}
					.datalimsg_jl{
						font-size: 24rpx;
						font-family: Arial;
						font-weight: 400;
						color: #979898;
					}
				}
			}
			.data_sli{
				border-top: 1px solid #EEEEEE;
				width: 100%;
				height: 96rpx;
				padding: 0 32rpx;
				.data_sli_l{
					width: 12rpx;
					height: 12rpx;
					background: #DDDDDD;
					border-radius: 50%;
					margin-right: 14rpx;
				}
				.data_sli_c{
					font-size: 28rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #333333;
				}
				.data_sli_r{
					font-size: 28rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #E2382F;
					text{
						font-size: 36rpx;
					}
				}
			}
			.datasli_more{
				width: 100%;
				height: 96rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #999999;
				border-top: 1px solid #eee;
				text{
					font-size: 28rpx;
				}
			}
		}
		.go_more{
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 694rpx;
			height: 80rpx;
			background: #FDC113;
			border-radius: 10rpx;
			text{
				font-size: 28rpx;
			}
		}
	}
	.car_list{
		width: 100%;
		padding: 0 20rpx;
		.car_li{
			width: 50%;
			padding:11rpx 8rpx;
			.car_li_box{
				width: 100%;
				height: 428rpx;
				background: #FFFFFF;
				border-radius: 10rpx;
				.car_li_img{
					width: 100%;
					height: 224rpx;
					border-radius: 10rpx 10rpx 0rpx 0rpx;
				}
				.car_li_msg{
					width: 100%;
					padding: 12rpx 20rpx 0; 
				}
				.car_li_tit{
					font-size: 30rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #323233;
					line-height: 42rpx;
					height: 84rpx;
					margin-bottom: 8rpx;
				}
				.car_li_jl{
					font-size: 24rpx;
					font-family: Arial;
					font-weight: 400;
					color: #999999;
					margin-bottom: 8rpx;
					line-height: 30rpx;
					height: 30rpx;
				}
				.car_li_num{
					font-size: 28rpx;
					font-family: Arial;
					font-weight: 400;
					color: #E2382F;
				}
				.car_li_sc{
					margin-top: 40rpx;
					font-size: 28rpx;
					font-family: Arial;
					font-weight: 400;
					color: #999999;
					text{
						margin-right: 15rpx;
					}
					&.car_li_sc1{
						color: #E2382F;
					}
				}
			}
		}
	}
.fb_list{
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 2rpx 28rpx 22rpx;
	.fb_li{
		width: 336rpx;
		height: 176rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
}
</style>
