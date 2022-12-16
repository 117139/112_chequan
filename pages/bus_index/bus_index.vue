<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<topbar bg_img="/static/images/bg_shangjiaruzhu.png">
			<view class="bus_head dis_flex aic">
				<text class="iconfont icon-back" @click="$service.back"></text>
			</view>
		</topbar>
		<view class="main_box">
			<view class="main_top">
				<view class="bus_top">
					<!-- <image class="bus_logo" src="/static/images/car1.png" mode="aspectFill"></image> -->
					<image class="bus_logo" :src="$service.getimg(datas.img)" mode="aspectFill"></image>
				</view>
				<view class="bus_name">
					{{datas.title||''}} <image v-if="datas.is_vip==1" src="/static/images/shop_vip.png" mode="aspectFit"></image>
				</view>
				<view class="bus_jj">
					{{datas.content||''}}
				</view>
				<view class="bus_tbox dis_flex ju_b">
					<view class="bus_add">
						{{datas.address||''}}
					</view>
					<view class="bus_bb" @click="go_add">
						<image src="/static/images/bus_dh.png" mode="aspectFit"></image>
						<view>导航</view>
					</view>
					<view class="bus_bb" @click="$service.call" :data-tel="datas.phone">
						<image src="/static/images/bus_tel.png" mode="aspectFit"></image>
						<view>电话</view>
					</view>
				</view>
				<view class="bus_btit">
					<view class="bus_btit_l">
						门店照片
					</view>
				</view>
				<swiper class="bus_swi" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" 
								indicator-color="rgba(255, 255, 255, .51)" 
								indicator-active-color="#ffffff" 
								:duration="duration">
					<swiper-item v-for="(item,index) in datas.banner">
						<image :src="$service.getimg(item)" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
				<picker @change="confirm" :value="active" :range="columns" range-key="title">
					<view class="bus_btit bus_btit1">
						<view class="bus_btit_l">
							发布信息
						</view>
						<view class="bus_btit_r">
							{{columns[active].title}}
							<image src="/static/images/bus_lx.png" mode="aspectFit"></image>
						</view>
					</view>
				</picker>
			</view>
			
			<view  v-if="active==0" class="car_list dis_flex fww">
				<view class="car_li" v-for="(item,index) in datas_list" @click.stop="$service.jump" :data-url="'/pages/details_qcmr/details_qcmr?id='+item.id">
					<view class="car_li_box">
						<!-- <image class="car_li_img" src="/static/images/car1.png" mode="aspectFit"></image> -->
						<image class="car_li_img" :src="$service.getimg(item.banner)" mode="aspectFill"></image>
						<view class="car_li_msg">
							<view class="car_li_tit oh2">{{item.title}}</view>
							<view class="car_li_jl oh1">{{item.sub_title}}</view>
							<view class="car_li_num">{{item.price}}元</view>
						</view>
					</view>
				</view>
			</view>
			<view  v-if="active==1" class="car_list dis_flex fww" @click.stop="$service.jump" :data-url="'/pages/details_motor/details_motor?id='+item.id">
				<view class="car_li" v-for="(item,index) in datas_list">
					<view class="car_li_box">
						<!-- <image class="car_li_img" src="/static/images/motor1.png" mode="aspectFit"></image> -->
						<image class="car_li_img" :src="$service.getimg(item.banner)" mode="aspectFill"></image>
						<view class="car_li_msg">
							<view class="car_li_tit oh2">{{item.title}}</view>
							<view class="car_li_jl oh1">官方指导价：{{$service.getnum(item.price)||''}}</view>
							<view class="car_li_num">{{$service.getnum(item.price)||''}}</view>
						</view>
					</view>
				</view>
			</view>
			<view  v-if="active==2" class="car_list dis_flex fww" @click.stop="$service.jump" :data-url="'/pages/details_car/details_car?id='+item.id">
				<view class="car_li" v-for="(item,index) in datas_list">
					<view class="car_li_box">
						<!-- <image class="car_li_img" src="/static/images/car1.png" mode="aspectFit"></image> -->
						<image class="car_li_img" :src="$service.getimg(item.banner)" mode="aspectFill"></image>
						<view class="car_li_msg">
							<view class="car_li_tit oh2">{{item.title}}</view>
							<view class="car_li_jl oh1">{{item.brand_time||''}}年/{{item.km}}万公里</view>
							<view class="car_li_num">{{item.price}}万</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view v-if="active==3" class="car_list dis_flex fww" @click.stop="$service.jump" data-url="/pages/details_jyz/details_jyz"> -->
			<view v-if="active==3" class="car_list dis_flex fww">
				<!-- <view class="car_li" v-for="(item,index) in 20">
					<view class="car_li_box">
						<image class="car_li_img" src="/static/images/car.jpg" mode="aspectFit"></image>
						<view class="car_li_msg">
							<view class="car_li_tit oh2">中石化#93号汽油</view>
							<view class="car_li_jl oh1">中石化高清洁汽油</view>
							<view class="car_li_num">5.62元</view>
						</view>
					</view>
				</view> -->
				<view class="data_sli dis_flex aic">
					<text class="data_sli_l"></text>
					<view class="flex_1 data_sli_c">92#汽油</view>
					<view class="data_sli_r">￥<text>7.18</text></view>
				</view>
				<view class="data_sli dis_flex aic">
					<text class="data_sli_l"></text>
					<view class="flex_1 data_sli_c">95#汽油</view>
					<view class="data_sli_r">￥<text>7.28</text></view>
				</view>
				<view class="data_sli dis_flex aic">
					<text class="data_sli_l"></text>
					<view class="flex_1 data_sli_c">98#汽油</view>
					<view class="data_sli_r">￥<text>8.18</text></view>
				</view>
			</view>
			
			<uni-load-more v-if="listc_status" :status="listc_status" :contentText="contentText"></uni-load-more>
		</view>
		<view class="b_box">
			<view class="b_box_btn" @click="$service.call" :data-tel="datas.phone">联系商家</view>
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
				indicatorDots: true,
				autoplay: true,
				interval: 4000,
				duration: 500,
				list1: [
						'/static/images/car2.png',
						'/static/images/car2.png',
						'/static/images/car2.png',
				],
				columns:[
					{
						title:' 汽车美容',
						id:1
					},
					{
						title:'摩托车',
						id:2
					},
					{
						title:'二手车',
						id:3
					},
					{
						title:'加油站',
						id:4
					},
				],
				active:0,
				datas_list:[],
				listc_status:'loading',
				contentText:{contentdown: "上拉显示更多",contentrefresh: "正在加载...",contentnomore: "暂无数据"},
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
			if(e.type){
				that.active=e.type
			}
			console.log(e)
			
			that.getdata()
		},
		onShow() {
			// that.onRetry()
		},
		onReachBottom() {
			that.getlist()
		},
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			confirm(e) { //选择性别 确定
				console.log(e)
				this.active =e.detail.value
				that.onRetry()
			},
			go_add(){
				const latitude = Number(that.datas.lat); //纬度
				const longitude = Number(that.datas.lng); //经度
				// var latitude=39.920243
				// var longitude=116.460634
				uni.openLocation({
					latitude: latitude,
					longitude: longitude,
					scale: 15,
					name: that.datas.address,
					// address: that.datas.list.address,
					success: function (res) {
						console.log('success');
						console.log(res);
					},
					fail: function (err) {
						console.log('err');
						console.log(err);
					}
				});
			},
			// 单条数据
			getdata(){
				
				var datas={
					id: that.options.id
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
						if(datas.status==1){
							that.columns=[
								{
									title:' 汽车美容',
									id:1
								},
								{
									title:'摩托车',
									id:2
								},
								{
									title:'二手车',
									id:3
								},
								// {
								// 	title:'加油站',
								// 	id:4
								// },
							]
						}else if(datas.status==4){
							that.columns=[
								// {
								// 	title:' 汽车美容',
								// 	id:1
								// },
								{
									title:'摩托车',
									id:2
								},
								{
									title:'二手车',
									id:3
								},
								{
									title:'加油站',
									id:4
								},
							]
						}else{
							that.columns=[
								// {
								// 	title:' 汽车美容',
								// 	id:1
								// },
								{
									title:'摩托车',
									id:2
								},
								{
									title:'二手车',
									id:3
								},
								// {
								// 	title:'加油站',
								// 	id:4
								// },
							]
						}
						that.onRetry()
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
					that.datas_list=[]
					that.getlist()
			},
			/**
			 * 列表
			 */
			getlist(){
				// /index/store
				var datas={
					store_id:that.options.id,
					// lat:that.addmsg.latitude||'',
					// lng:that.addmsg.longitude||'',
					// is_hot:'',//是否热门推荐 1、是 2、否
					// search:'',
					page:that.page,
					limit:20
				}
				var jkurl='/index/carbeauty'
				if(that.columns[that.active].id==2){
					jkurl='/index/motorcycle'
				}
				if(that.columns[that.active].id==3){
					jkurl='/index/usedcar'
				}
				if(that.columns[that.active].id==4){
					return
					// jkurl='/index/motorcycle'
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
							that.datas_list=[]
							that.datas_list=datas.data
						}else{
							that.datas_list=that.datas_list.concat(datas.data)
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
	padding-bottom: 150rpx;
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
			.bus_add{
				width: 550rpx;
				font-size: 26rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #666666;
				padding-right: 50rpx;
			}
			.bus_bb{
				font-size: 24rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #4680E6;
				display: flex;
				flex-direction: column;
				align-items: center;
				image{
					width: 38rpx;
					height: 38rpx;
					margin-bottom: 15rpx;
				}
			}
		}
		.bus_btit{
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 90rpx;
			&.bus_btit1{
				margin-top: 15rpx;
			}
			.bus_btit_l{
				font-size: 32rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #333333;
			}
			.bus_btit_r{
				display: flex;
				align-items: center;
				font-size: 28rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #333333;
				image{
					width: 18rpx;
					height: 9rpx;
					margin-left: 20rpx;
				}
			}
		}
		.bus_swi{
			width: 100%;
			height: 336rpx;
			border-radius: 10rpx;
			image{
					width: 100%;
					height: 336rpx;
					border-radius: 10rpx;
			}
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
	}
	.b_box{
		width: 100%;
		padding: 20rpx 30rpx;
		background: #fff;
		position: fixed;
		bottom: 0;
		z-index: 900;
			.b_box_btn{
				width: 100%;
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
</style>
