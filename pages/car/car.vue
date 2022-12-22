<template>
	<view class="content">
		<topbar>
			<view class="my_header dis_flex aic">
				<image class="h_add" src="/static/images/icon_address.png" mode="aspectFit"></image>
				<view class=" h_add_text">北京</view>
				
				<view class="top_search flex_1" @tap="$service.jump" data-url="/pagesA/search/search">
					<text class="icon icon-sousuo"></text>
					<view class="flex_1">请输入你要搜索的内容</view>
					<view class="top_search_btn">搜素</view>
				</view>
			</view>
		</topbar>
		<!-- 金刚区 -->
		<view class="index_tui_list dis_flex fww">
			<view class="index_tui_li" @tap="$service.jump" data-url="/pages_my/store_fb/store_fb?type1=1&type=2">
				<view class="index_tui_li_img">
					<image src="/static/images/ici1.png" mode="aspectFill"></image>
				</view>
				<view class="index_tui_li_text">我要发布</view>
			</view>
			<view class="index_tui_li" @tap="$service.jump" data-url="/pages_my/store_fb/store_fb?type1=1&type=2">
				<view class="index_tui_li_img">
					<image src="/static/images/ici2.png" mode="aspectFill"></image>
				</view>
				<view class="index_tui_li_text">我要卖车</view>
			</view>
			<view class="index_tui_li" @click="$service.jump" data-url="/pagesA/rgc_sb/rgc_sb">
				<view class="index_tui_li_img">
					<image v-if="navdata[5].img" :src="$service.getimg(navdata[5].img)" mode="aspectFill"></image>
					<image v-else src="/static/images/iti6.png" mode="aspectFill"></image>
				</view>
				<view class="index_tui_li_text">{{navdata[5].title||'车型识别'}}</view>
			</view>
			<view class="index_tui_li"  @click="$service.jump" data-url="/pagesA/rgc_mfpg/rgc_mfpg">
				<!-- <view class="index_tui_li_img">
					<image src="/static/images/iti5.png" mode="aspectFill"></image>
				</view>
				<view class="index_tui_li_text">免费评估</view> -->
				<view class="index_tui_li_img">
					<image v-if="navdata[4].img" :src="$service.getimg(navdata[4].img)" mode="aspectFill"></image>
					<image v-else src="/static/images/iti5.png" mode="aspectFill"></image>
				</view>
				<view class="index_tui_li_text">{{navdata[4].title||'免费评估'}}</view>
			</view>
			
		</view>
		<view  v-if="list1.length>0" class="banner_box">
			<u-swiper  :list="list1"   keyName="img" @click="click_fuc" height="222rpx" radius='0' :circular="true"></u-swiper>
		</view>
		
		<view class="cart_list dis_flex fww">
			<block v-for="(item,index) in car_info_hot">
				<view class="cart_li"  @tap="$service.jump" :data-url="'/pagesA/search/search?type=2&key='+item.name">
					<image class="cart_img" :src="$service.getimg(item.img)" mode="aspectFit"></image>
					<view class="cart_text">{{item.name}}</view>
				</view>
			</block>
			<view class="cart_li" @tap="$service.jump" data-url="/pagesA/ctpe_list/ctpe_list">
				<image class="cart_img" src="/static/images/icon_more.png" mode="aspectFit"></image>
				<view class="cart_text">更多</view>
			</view>
		</view>
		
		<view v-if="datas_tj.length>0" class="mt_cbox">
			<view class="mt_cboxtit dis_flex aic">
				<view class="mt_cboxtit_l">安全认证</view>
				<view class="flex_1">/  专业检测 车况透明</view>
			</view>
			<scroll-view class="scroll_x mtc_list" scroll-x="true" >
				<view class="car_li" v-for="(item,index) in datas_tj" @click="$service.jump" data-url="/pages/details_car/details_car">
					<view class="car_li_box">
						<image class="car_li_img" :src="$service.getimg(item.banner)" mode="aspectFill"></image>
						<view class="car_li_msg">
							<view class="car_li_tit oh1">{{item.title}}</view>
							<view class="car_li_num">{{item.price}}万</view>
							<view class="car_li_ntext">{{item.brand_time||''}}年/{{item.km}}万公里</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="index_main_tit dis_flex aic">
			<view class="i_tit_li active" ><text>精选推荐</text></view>
		</view>
		<view class="car_list dis_flex fww">
			<view class="car_li" v-for="(item,index) in datas_car" @click="$service.jump" :data-url="'/pages/details_car/details_car?id='+item.id">
				<view class="car_li_box">
					<image class="car_li_img" :src="$service.getimg(item.banner)" mode="aspectFill"></image>
					<view class="car_li_msg">
						<view class="car_li_tit oh2">{{item.title}}</view>
						<view class="car_li_jl oh1">{{item.brand_time||''}}年/{{item.km}}万公里</view>
						<view class="car_li_num">{{item.price}}万</view>
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
						// '/static/images/banner_car.png',
						// '/static/images/banner_car.png',
						// '/static/images/banner_car.png',
				],
				cur:0,
				datas_car:[],
				listc_status:'loading',
				contentText:{contentdown: "上拉显示更多",contentrefresh: "正在加载...",contentnomore: "暂无数据"},
				page:1,
				datas_tj:[]
			}
		},
		onLoad() {
			that =this
			that.getbanner()
			if(that.car_info.length==0){
				that.getcar_datas()
			}
			that.getlist_tj()
			that.onRetry()
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin','loginDatas','addmsg','p_config','navdata','car_info','car_info_hot']),
		},
		onReachBottom() {
			that.getlist_car()
		},
		methods: {
			getcar_datas() {
			
				var datas = {}
				var jkurl = '/publics/car_info'
			
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
						that.$store.commit('setcardatas',datas)
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
			getlist_tj(){
				// /index/store
				var datas={
					// store_id:'',
					// lat:that.addmsg.latitude||'',
					// lng:that.addmsg.longitude||'',
					is_hot:1,//是否热门推荐 1、是 2、否
					// search:'',
					page:1,
					limit:16
				}
				var jkurl='/index/usedcar'
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
						
						that.datas_tj=datas
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
			 * 二手车列表
			 */
			getlist_car(){
				// /index/store
				var datas={
					// store_id:'',
					// lat:that.addmsg.latitude||'',
					// lng:that.addmsg.longitude||'',
					is_hot:2,//是否热门推荐 1、是 2、否
					// search:'',
					page:that.page,
					limit:16
				}
				var jkurl='/index/usedcar'
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
						if(datas.data>length>0){
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
			
			getbanner(){
				var datas={
					type:3,
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
			setcur(index){
				that.cur=index
			},
		}
	}
</script>

<style lang="scss" scoped>
	.my_header{
		width: 100%;
		// justify-content: space-between;
		padding: 0 15rpx;
		.h_add{
			width: 30rpx;
			height: 30rpx;
			margin-right: 15rpx;
		}
		.h_add_text{
			min-width: 3em;
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
			margin-right: 30rpx;
		}
		.top_search{
			display: flex;
			align-items: center;
			height: 68rpx;
			border: 1px solid #FDC113;
			border-radius: 34rpx;
			font-size: 24rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #999999;
			padding-left: 20rpx;
			text{
				font-size: 32rpx;
				color: #999999;
				margin-right: 15rpx;
			}
			.top_search_btn{
				width: 134rpx;
				height: 66rpx;
				background: #FDC113;
				border-radius: 0px 34px 34px 0px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #333333;
			}
		}
	}
	.banner_box {
		width: 100%;
		padding: 20rpx 28rpx;
	}
	.index_tui_list{
		width: 100%;
		padding-top: 10rpx;
		.index_tui_li{
			width: 25%;
			padding: 20rpx 0;
			display: flex;
			align-items: center;
			flex-direction: column;
			.index_tui_li_img{
				width: 80rpx;
				height: 80rpx;
				position: relative;
				image{
					width: 100%;
					height: 100%;
				}
				.index_tui_jz{
					min-width:55rpx;
					display: flex;
					align-items: center;
					position: absolute;
					top: -10rpx;
					// left: 70rpx;
					right: -25rpx;
					font-size: 18rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #333333;
					padding: 2rpx 4rpx;
					background: #FDC113;
					border-radius: 10rpx 10rpx 10rpx 0px;
				}
			}
			.index_tui_li_text{
				font-size: 26rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #323233;
				margin-top: 28rpx;
			}
		}
	}
	
	.cart_list{
		width: 694rpx;
		// height: 276px;
		min-height: 140rpx;
		border-radius: 10px;
		margin: 0 auto 30rpx;
		padding: 10rpx 0;
		background: #fff;
		.cart_li{
			width: 20%;
			height: 143rpx;
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
			.cart_img{
				width: 60rpx;
				height: 60rpx;
			}
			.cart_text{
				margin-top: 10rpx;
				font-size: 26rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #323233;
			}
		}
	}
	.mt_cbox{
		width: 694rpx;
		min-height: 340rpx;
		background: linear-gradient(90deg, #808CD0 1%, #4B4F9B 97%);
		background-image: url('/static/images/caribg.png');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
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
		.mtc_list{
			width: 100%;
			height: 308rpx;
			.car_li{
				display: inline-flex;
				&+.car_li{
					margin-left: 18rpx;
				}
				.car_li_box{
					width: 234rpx;
					height: 308rpx;
					background: #FFFFFF;
					border-radius: 10rpx;
					.car_li_img{
						width: 100%;
						height: 156rpx;
						border-radius: 10rpx 10rpx 0rpx 0rpx;
						display: block;
					}
					.car_li_msg{
						width: 100%;
						padding: 12rpx 12rpx 0; 
					}
					.car_li_tit{
						font-size: 26rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #323233;
						line-height: 38rpx;
						height: 38rpx;
						margin-bottom: 8rpx;
					}
					.car_li_ntext{
						font-size: 22rpx;
						font-family: Arial;
						font-weight: 400;
						color: #333333;
					}
					.car_li_num{
						font-size: 24rpx;
						font-family: Arial;
						font-weight: 400;
						color: #E2382F;
						margin-bottom: 8rpx;
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
			}
		}
	}
</style>
