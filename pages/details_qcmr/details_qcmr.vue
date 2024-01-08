<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<view class="details_tbox">
			<!-- <u-swiper
							:list="list4"
							keyName="url"
							@change="e => currentNum = e.current"
							:autoplay="false"
							height="500rpx"
							radius="0"
							:circular="true" 
							indicatorStyle="right: 20px"
			>
					<view
									slot="indicator"
									class="indicator-num"
					>
							<text class="indicator-num__text">{{ currentNum + 1 }}/{{ list4.length }}</text>
					</view>
			</u-swiper> -->
			<view class="swiper_box">
				<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
					:duration="duration" @change="swiper_fuc">
					<!-- <swiper-item>
						<view class="swiper-item uni-bg-red">A</view>
					</swiper-item> -->
					<swiper-item v-for="(item,index) in datas.banner">
						<view class="swiper-item">
							<image :src="$service.getimg(item)" mode="aspectFill"></image>
						</view>
					</swiper-item>
				</swiper>
				<view class="indicator-num" >
						<text v-if="datas.banner" class="indicator-num__text">{{ currentNum + 1 }}/{{ datas.banner.length }}</text>
				</view>
			</view>
			<view class="details_top">
				<view class="flex_1">
					<view class="details_top_l1">
						{{datas.price||'0'}}<text>元</text> 
						<!-- <view class="ghf_tag">包含过户费</view> -->
					</view>
					<view class="details_top_l2">{{datas.title||''}}</view>
				</view>
				<view v-if="datas.store" class="xq_xzdj" @click="$service.call" :data-tel="datas.store.phone">联系商家</view>
			</view>
			<view class="details_top_f">
				<view class="xq_name">{{datas.title||''}}</view>
				<view class="xq_tpri dis_flex aic">
					{{datas.sub_title||''}}
				</view>
			</view>
		</view>
		<view class="main_box">
			<view class="main_box_tit">
				<view class="main_tl">服务详情</view>
				<!-- <view class="main_tr_btn">
					询问车况
				</view> -->
			</view>
			<view class="carmsg_ms">
				<text v-html="datas.content"></text>
				<!-- <image src="/static/images/mrxq.jpg" style="width: 100%;" mode="widthFix"></image>
				<image src="/static/images/mrxq1.png" style="width: 100%;" mode="widthFix"></image> -->
				<block v-for="(item,index) in datas.content_img">
					<image :src="$service.getimg(item)" style="width: 100%;" mode="widthFix"></image>
				</block>
			</view>
		</view>
		<view v-if="datas.store" class="main_box">
			<view class="main_box_tit">
				<view class="main_tl">商家信息</view>
			</view>
			<view class="dp_msg"  @click="$service.jump" :data-url="'/pages/bus_index/bus_index?id='+datas.store.id">
				<image class="dp_msgbg" src="/static/images/bg_shop.png" mode="aspectFill"></image>
				<view class="dp_msg_box dis_flex">
					<image v-if="datas.store.is_vip==1" class="dp_msg_tl" src="/static/images/shop_vip.png" mode="aspectFill"></image>
					<view class="dp_msg_i">
						<text class="iconfont icon-shangpu"></text>
					</view>
					<view class="flex_1">
						<view class="dp_msg_name">{{datas.store.title}}<text class="iconfont icon-next"></text></view>
						<view class="dp_msg_add">{{datas.store.address}}</view>
					</view>
				</view>
			</view>
			<view class="dp_bmsg dis_flex aic">
				<view class="dp_bmsg_l flex_1">
					<view class="dp_bmsg_l1">{{datas.title}}</view>
					<view class="dp_bmsg_l2">价格: {{datas.price}}元</view>
				</view>
				<view class="dp_bmsg_r" @click="$service.call" :data-tel="datas.store.phone">立即咨询</view>
			</view>
		</view>
		<view class="bbox"></view>
		<view class="xq_bbox">
			<view class="xq_bbox1 dis_flex">
				<view  v-if="datas.store" class="xq_bli" @click="$service.jump" :data-url="'/pages/bus_index/bus_index?id='+datas.store.id">
					<text class="iconfont icon-gongsi"></text>
					<text>商家</text>
				</view>
				<view v-if="datas.collection==2" class="xq_bli" @click="sc_fuc">
					<text class="iconfont icon-shoucang"></text>
					<text>收藏</text>
				</view>
				<view v-else class="xq_bli" @click="sc_fuc">
					<text class="iconfont icon-shoucang1" style="color: #E2382F;"></text>
					<text style="color: #E2382F;">已收藏</text>
				</view>
				<!-- #ifdef APP -->
				<view class="xq_bli" @click="share_fuc">
					<text class="iconfont icon-zhuanfa3"></text>
					<text>转发</text>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<view class="xq_bli" style="position: relative;">
					<button type="default" open-type="share" style="position: absolute;opacity: 0; top: 0;left: 0;right: 0;bottom: 0;" :data-id="1"></button>
					<text class="iconfont icon-zhuanfa3"></text>
					<text>转发</text>
				</view>
				<!-- #endif -->
				<view v-if="datas.store" class="xq_b_btn"  @click="$service.call" :data-tel="datas.store.phone">
					联系商家
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
				page:1,
				list4: [],
				currentNum:0,
				sc_type:false,
				indicatorDots: false,
				autoplay: false,
				interval: 2000,
				duration: 500
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
			
			that.getdata()
		},
		onShow() {
			// that.onRetry()
		},
		onShareAppMessage() {},
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			swiper_fuc(e){
				console.log(e.detail.current)
				that.currentNum=e.detail.current
			},
			share_fuc(){
				var code=''
				// if(that.loginDatas.identification_id){
				// 	code=that.loginDatas.identification_id
				// }
				uni.shareWithSystem({
				  summary: '车圈',
				  // href: 'https://yibeitong.com.aa.800123456.top/h5/#/?code='+code,
				  href: 'https://www.baidu.com?code='+code,
				  success(){
				    // 分享完成，请注意此时不一定是成功分享
				  },
				  fail(){
				    // 分享失败
				  }
				})
				// uni.share({
				// 	provider: "weixin",
				// 	scene: "WXSceneTimeline",
				// 	type: 1,
				// 	href: "http://uniapp.dcloud.io/",
					
				// 	title: "uni-app分享",
				// 	summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
					
				// 	imageUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKmRZxBGVgJicED1mLYTXkHRdMdGzOYfp8dGK7epK6Hpib4gO0Ria7nlHriabNzcpaedO5y3RuJSibRbPA/132",
				// 	success: function (res) {
				// 		console.log("success:" + JSON.stringify(res));
				// 	},
				// 	fail: function (err) {
				// 		console.log("fail:" + JSON.stringify(err));
				// 	}
				// });
			},
			getdata(){
				var that=this
				var datas={
					id: that.options.id,
				}
				var jkurl='/detail/car_beauty'
				
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
			/**
			 * 收藏方法
			 */
			sc_fuc(){
				var datas={
					id: that.options.id,
					type:1
				}
			
				var jkurl='/operate/collection'
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
						that.getdata()
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
@import "@/common/css/fwxq.scss";
	
.details_tbox{
	width: 100%;
	background: #fff;
	margin-bottom: 20rpx;
	.details_top{
		width: 100%;
		min-height: 162rpx;
		background: #4680E6;
		border-radius: 0px 0px 30rpx 30rpx;
		padding: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.details_top_l1{
			font-size: 48rpx;
			font-family: Arial;
			font-weight: bold;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			margin-bottom: 10rpx;
			text{
				font-size: 32rpx;
				font-weight: normal;
			}
			
		}
		.details_top_l2{
			font-size: 24rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #FFFFFF;
		}
		.xq_xzdj{
			font-size: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #FFFFFF;
			width: 188rpx;
			height: 72rpx;
			background: #000000;
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.details_top_f{
		width: 100%;
		background: #fff;
		padding: 28rpx;
		.xq_name{
			font-size: 38rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
			line-height: 52rpx;
			margin-bottom: 10rpx;
		}
		.xq_tpri{
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
			text{
				color: #E2382F;
			}
		}
	}
}
.ghf_tag{
	font-size: 22rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 112rpx;
	height: 38rpx;
	background: #E2382F;
	border-radius: 4rpx;
	padding: 0 10rpx;
	margin-left: 10rpx;
	&.ghf_tag1{
		background: linear-gradient(90deg, #808CD0 1%, #4B4F9B 97%);
	}
}
.main_box{
	width: 100%;
	background: #fff;
	padding: 0 28rpx 40rpx;
	margin-bottom: 22rpx;
	.main_box_tit{
		width: 100%;
		padding: 22rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10rpx;
		.main_tl{
			font-size: 32rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
			position: relative;
			padding-left: 20rpx;
			line-height: 36rpx;
			&:before{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				margin-top: -16rpx;
				width: 6rpx;
				height: 32rpx;
				background: #4680E6;
				border-radius: 3rpx;
			}
		}
		.main_tr_btn{
			font-size: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #FFFFFF;
			width: 188rpx;
			height: 72rpx;
			background: #E2382F;
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.carmsg1{
		width: 100%;
		min-height: 160rpx;
		background: #F8F8F8;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 28rpx;
		.carmsg1_li{
			.carmsg1_li_d1{
				font-size: 32rpx;
				font-family: Arial;
				font-weight: 400;
				color: #333333;
				margin-bottom: 10rpx;
			}
			.carmsg1_li_d2{
				font-size: 24rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #999999;
			}
		}
	}
	.carmsg2{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		.carmsg2_li{
			width: 50%;
			height: 70rpx;
			line-height: 70rpx;
			display: flex;
			align-items: center;
			.carmsg2_li_name{
				width: 140rpx;
				font-size: 28rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #BBBBBB;
			}
			.carmsg2_li_v{
				font-size: 28rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #333333;
			}
		}
	}
	.carmsg3{
		width: 100%;
		height: 200rpx;
		.carmsg3_li{
			width: 105rpx;
			display: inline-flex;
			flex-direction:column;
			align-items: center;
			justify-content: center;
			height: 200rpx;
			&+.carmsg3_li{
				margin-left: 50rpx;
			}
			.carmsg3_li_img{
				width: 88rpx;
				height: 88rpx;
				margin-bottom: 23rpx;
			}
			.carmsg3_li_text{
				text-align: center;
				font-size: 24rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #333333;
			}
		}
	}
	.carmsg4{
		width: 100%;
		font-size: 22rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #BBBBBB;
		line-height: 32rpx;
		margin-bottom: 40rpx;
	}
	.carmsg_more{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #333333;
		height: 80rpx;
		background: #F8F8F8;
		border-radius: 10rpx;
	}
	
	
	.carmsg_ms{
		width: 100%;
		font-size: 28rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #333333;
		line-height: 52rpx;
	}
	
	
	.xq_imgs{
		width:750rpx;
		margin-left: -28rpx;
		margin-right: -28rpx;
		margin-bottom: 20rpx;
		padding-left: 17rpx;
		padding-right: 17rpx;
		.xqimg_box{
			width: 100%;
			height: 482rpx;
			padding: 11rpx;
			image{
				width: 100%;
				height: 100%;
				border-radius: 10rpx;
			}
			&+.xqimg_box{
				width: 50%;
				height: 245rpx;
			}
		}
	}
}
.dp_msg{
	width: 100%;
	height: 268rpx;
	background: linear-gradient(0deg, #4B5381 0%, #282A4F 100%);
	border-radius: 20rpx;
	position: relative;
	.dp_msgbg{
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 268rpx;
	}
	.dp_msg_box{
		width: 100%;
		position: relative;
		z-index: 100;
		padding-top: 80rpx;
		padding-left: 56rpx;
		.dp_msg_tl{
			position: absolute;
			top: 0;
			left: 0;
			z-index: 200;
			width: 194rpx;
			height: 54rpx;
			background: linear-gradient(90deg, #FF5313 0%, #E2382F 98%);
			border-radius:20rpx 0 20rpx 0 ;
		}
		.dp_msg_i{
			width: 88rpx;
			height: 88rpx;
			background:rgba(0, 0, 0, .21);
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 45rpx;
			color: #fff;
			margin-right: 30rpx;
		}
		.dp_msg_name{
			max-width: 460rpx;
			font-size: 32rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #FFFFFF;
			text{
				font-size: 30rpx;
				margin-left: 8rpx;
				color: rgba(255, 255, 255, .51);
			}
		}
		.dp_msg_add{
			max-width: 460rpx;
			font-size: 24rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 42rpx;
		}
	}
}
.bbox{
	width: 100%;
	height: 150rpx;
}
.xq_bbox{
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 990;
	width: 100%;
	// height: 100px;
	background: #FFFFFF;
	box-shadow: 0px 0px 30px 0px rgba(151,154,162,0.2);
	padding-bottom: 0;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	.xq_bbox1{
		width: 100%;
		padding: 10rpx 28rpx;
		.xq_bli{
			flex: 1;
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
			position: relative;
			&.xq_bli1:before{
				content: '';
				position: absolute;
				right: 0;
				width: 1px;
				height: 26rpx;
				background: #EEEEEE;
				top: 50%;
				margin-top: -13rpx;
			}
			image{
				width: 35rpx;
				height: 35rpx;
			}
			text{
				// margin-top: 11rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
			}
			.iconfont{
				font-size: 30rpx;
				margin-bottom: 11rpx;
			}
		}
		.xq_b_btn{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			width: 347rpx;
			height: 90rpx;
			background: #4680E6;
			border-radius: 10rpx;
			margin-left: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
.dp_bmsg{
	width: 100%;
	margin-top: 20rpx;
	.dp_bmsg_l{
		.dp_bmsg_l1{
			font-size: 32rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
			margin-bottom: 10rpx;
			text{
				color: #E2382F;
			}
		}
		.dp_bmsg_l2{
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #666666;
		}
	}
	.dp_bmsg_r{
		font-size: 30rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 188rpx;
		height: 72rpx;
		background: #E2382F;
		border-radius: 8rpx;
	}
}

</style>
