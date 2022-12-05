<template>
	<view>
		<topbar :bg_color="bg_color">
			<view class="bus_head dis_flex aic ju_b">
				<text v-if="backtype==1" class="iconfont icon-back" @click="$service.back"></text>
				<text v-else class="iconfont icon-back" style="opacity: 0;"></text>
				<text >开通会员</text>
				<text class="iconfont icon-back" style="opacity: 0;"></text>
			</view>
		</topbar>
		<view class="openMembership">
			
			<!-- 开通会员 -->
			<view class="header_user_wrap area">
				<image v-if="cur==0" class="image_bg" src="/static/images/kthy.png" mode="widthFix"></image>
				<image v-else class="image_bg" src="/static/images/bg_vip_business.png" mode="widthFix"></image>
				<view class="header_user_content area dis_flex aic">
					<view class="header_img_wrap flex_cen">
						<view class="header_img_box">
							<image v-if="hasLogin" :src="loginDatas.headImgURL" mode="aspectFill"></image>
							<image v-else src="/static/images/tx.png" mode="aspectFill"></image>
						</view>
					</view>
					<view class="header_words_wrap">
						<view class=" dis_flex aic">
							<view class="">
								{{loginDatas.nickname||'昵称'}}
							</view>
							<!-- <image src="../../static/images/hy.png" mode="aspectFit" ></image> -->
						</view>
						<!-- <view class="expiration_time">
							会员到期时间：{{$service.gettime(vipDatas.expireTime*1000)}}
						</view> -->
						<view class="expiration_time" v-if="hasLogin">
						<!-- 	会员到期时间：{{$service.gettime(vipDatas.expireTime*1000)}}
						</view>
						<view class="expiration_time" v-else> -->
							未开通会员
						</view>
					</view>
				</view>
			</view>
		
			<!-- 主题内容 -->
			<view class="content_big_box area">
				<view class="content_tit">
					<view :class="{active:cur==0}" @click="setcur(0)">用户会员套餐</view>
					<view :class="{active:cur==1}" @click="setcur(1)">商户会员套餐</view>
				</view>
				<scroll-view v-if="cur==1" class="sw_list scroll_x" scroll-x="true">
					<view>
						<view class="sw_li" :class="{active:active==index}" @click="active=index" v-for="(item,index) in tabs">{{item.title}}</view>
					</view>
				</scroll-view>
				<view  v-if="cur==0" class="package_wrap flex">
					<view :class="current==index?'list_active':'list_item'" v-for="(item,index) in list" :key="index"
						@tap="current=index">
						<image class="package_img_bg" :src="current==index?'/static/images/hytc2.png':'/static/images/hytc.png'"
							mode="aspectFit"></image>
						<view class="package_news">
							<view class=" dis_flex aic" style="margin-bottom: 16rpx;">
								<image class="news_img" :src="current==index?'/static/images/hyv.png':'/static/images/hy0.png'"
									mode="aspectFit"></image>
								{{item.quarter}}
								<image v-if="index==3" class="news_img_tj" src="/static/images/pic_vip_recommend.png" mode="aspectFit"></image>
							</view>
							<view class="one_month">
								{{item.some}} <text>￥{{item.price}}</text>
								<!-- {{item.title}}<text>￥{{item.originPrice}}</text> -->
							</view>
							<view class="one_month">
								<!-- 每日{{item.num}}元 -->{{item.description}}
							</view>
							<view class="money_price">
								￥<text>{{item.price}}</text>
							</view>
						</view>
					</view>
				</view>
				<view  v-if="cur==1" class="package_wrap flex">
					<view :class="current==index?'list_active':'list_item'" v-for="(item,index) in list1" :key="index"
						@tap="current=index">
						<image class="package_img_bg" :src="current==index?'/static/images/hytc3.png':'/static/images/hytc.png'"
							mode="aspectFit"></image>
						<view class="package_news">
							<view class=" dis_flex aic" style="margin-bottom: 16rpx;">
								<image class="news_img" :src="current==index?'/static/images/hys.png':'/static/images/hy0.png'"
									mode="aspectFit"></image>
								{{item.quarter}}
								<image v-if="index==3" class="news_img_tj" src="/static/images/pic_vip_recommend.png" mode="aspectFit"></image>
							</view>
							<view class="one_month">
								{{item.some}} <text>￥{{item.price}}</text>
								<!-- {{item.title}}<text>￥{{item.originPrice}}</text> -->
							</view>
							<view class="one_month">
								<!-- 每日{{item.num}}元 -->{{item.description}}
							</view>
							<view class="money_price">
								￥<text>{{item.price}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="agree_wrap dis_flex aic" @tap="sele=!sele">
					<view :class="sele?'icon icon-duigou1 active_big':'big'"></view>
					阅读并同意 
					<text @click="$service.jump" data-url="/pagesMy/webview/webview?type=vipxy">《会员服务协议》</text>
					<text @click="$service.jump" data-url="/pagesMy/webview/webview?type=ysxy">《隐私协议》</text>
				</view>
				<view class="btn_wrap" :class="{btn_wrap1:cur==1}" v-if="isShow">
					立即续费
				</view>
				<!-- <view class="btn_wrap" :class="{btn_wrap1:cur==1}" v-else @tap="isShow=!isShow"> -->
				<view class="btn_wrap" :class="{btn_wrap1:cur==1}" v-else @tap="pay_fuc">
					立即开通
				</view>
				<!-- 会员特权 -->
				<view class="viptq_box">
					<view class="privilege_img area2">
						<image v-if="cur==0" src="@/static/images/hytq.png" mode="aspectFit"></image>
						<image v-else src="@/static/images/pic_vip_rights_b.png" mode="aspectFit"></image>
						<view class="privilege_box dis_flex aic ju_c">
							会员特权
						</view>
					</view>
					<view class="card_stream flex">
						<image v-if="cur==0" class="card_stream_img" src="/static/images/pic_vip_content_u.png" mode="widthFix"></image>
						<image v-else class="card_stream_img" src="/static/images/pic_vip_content_b.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	import vip from '@/components/vip/vip.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	// var that 
	export default {
		name:"vip",
		props: {
			curtype: {
				type: [Number,String], 
				default: 0
			},
			backtype: {
				type: [Number,String], 
				default: 0
			},
			
		},
		data() {
			return {
				userImg: "/static/images/tx.png",
				userName: "昵称",
				time: '2022年03月04日',
				isShow:false,//是否是会员
				list: [ //选择会员套餐
					{
						quarter: "次卡会员",
						some: "50次",
						price: "19.00",
						num: "3",
						money: "9.9",
						description:'免费体验'
						
					},
					{
						quarter: "月卡会员",
						some: "1个月",
						price: "120.00",
						num: "2.4",
						money: "98.00",
						description:'每日赠送10次体验'
					},
					{
						quarter: "季卡会员",
						some: "3个月",
						price: "320.00",
						num: "1.8",
						money: "278.00",
						description:'每日赠送10次体验'
					},
					{
						quarter: "年卡会员",
						some: "12个月",
						price: "1080.00",
						num: "1.5",
						money: "539.00",
						description:'每日赠送10次体验'
					}
				],
				list1: [ //选择会员套餐
					
					{
						quarter: "月卡会员",
						some: "1个月",
						price: "120.00",
						num: "2.4",
						money: "69.00",
						description:'免费发布20条'
					},
					{
						quarter: "季卡会员",
						some: "3个月",
						price: "320.00",
						num: "1.8",
						money: "198.00",
						description:'免费发布50条'
					},
					{
						quarter: "半年卡会员",
						some: "6个月",
						price: "600.00",
						num: "1.5",
						money: "278.00",
						description:'免费发布100条'
					},
					{
						quarter: "年卡会员",
						some: "12个月",
						price: "1080.00",
						num: "1.5",
						money: "539.00",
						description:'免费发布无限制'
					}
				],
				current: 0,//套餐选择 当前搜索引
				sele: false, //阅读并同意
				
				cur:0,
				bg_color:'#FF9E54',
				tabs:[
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
				active:0
			};
		},
		computed: {
			...mapState(['hasLogin', 'loginDatas','vipDatas'])
		},
		mounted() {
			this.cur=this.curtype
		},
		watch:{
			cur(val){
				if(val==1){
					this.bg_color='#282A4F'
				}else{
					this.bg_color='#FF9E54'
				}
			}
		},
		methods: {
			pay_fuc(){
				uni.showToast({
					icon:'none',
					title:'开通成功'
				})
			},
			setcur(index){
				var that =this
				that.cur=index
				if(index==1){
					that.bg_color='#282A4F'
				}else{
					that.bg_color='#FF9E54'
				}
			}
			// getviplist(){
			// 	var datas={
			// 		dtProdID:'1'
			// 	}
			// 	// datas=JSON.stringify(datas)
			// 	that.$proBase.getviplist(datas).then((response) => {
			// 		console.log(response)
			// 		const datas = response.data
			// 		if(datas.code==200){
			// 			that.list=datas.data.dataSkus
			// 		}
			// 	})
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.area {
	    width: 100%;
	    padding: 0 0.875rem;
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
	.openMembership {
		width: 100%;
		height: 100%;
		background-color: #fff;
		// padding-top: 98rpx;
		padding-top: 220rpx;
		position: relative;
		// 头部用户信息
		.header_user_wrap {
			height: 298rpx;
			position: absolute;
			top: 0;
			.image_bg {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 0;
			}

			.header_user_content {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 1;
				padding-bottom: 76rpx;
			}

			.header_img_wrap {
				width: 120rpx;
				height: 120rpx;
				background: rgba(255, 255, 255, .2);
				border-radius: 50%;
				margin-right: 20rpx;
			}

			.header_img_box {
				width: 106rpx;
				height: 106rpx;
				border: 2rpx solid #FFFFFF;
				background: linear-gradient(0deg, #FE9D32 0%, #FF7008 100%);
				border-radius: 50%;

				image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.header_words_wrap {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;

				image {
					width: 48rpx;
					height: 48rpx;
					margin-left: 12rpx;
				}

				.expiration_time {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(255, 255, 255, .8);
					margin-top: 18rpx;
				}
			}
		}

		// 选择会员套餐
		.content_big_box {
			width: 100%;
			height: auto;
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 0 0;
			// position: absolute;
			position: relative;
			// top: 222rpx;
			// left: 0;
			z-index: 9;
			padding-top: 40rpx;
			padding-bottom: 50rpx;

			.content_tit {
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-bottom: 40rpx;
				display: flex;
				align-items: center;
				justify-content: space-around;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
				view{
					padding: 15rpx;
					&.active{
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						position: relative;
						&::after{
							content:'';
							position: absolute;
							bottom: 0;
							left: 50%;
							width: 56rpx;
							height: 6rpx;
							background: #FF9C00;
							border-radius: 3rpx;
							margin-left: -28rpx;
						}
					}
				}
				
			}
		}

		.package_wrap {
			flex-wrap: wrap;

			.list_item {
				width: 322rpx;
				height: 290rpx;
				box-shadow: 0px 0px 20rpx 0px rgba(187, 187, 187, 0.3);
				position: relative;
				margin-right: 50rpx;
				margin-bottom: 40rpx;
				border-radius: 20rpx;
				&:nth-child(2n) {
					margin-right: 0;
				}

				.package_img_bg {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					z-index: 0;
				}
				
				.money_price {
					font-size: 26rpx;
					font-family: DIN;
					font-weight: 500;
					// color: #735546;
					color: #666;
					margin-top: 30rpx;

					text {
						font-size: 48rpx;
						font-family: DIN-Bold;
						font-weight: bold;
					}
				}
			}

			.list_active {
				width: 322rpx;
				height: 290rpx;
				box-shadow: 0px 0px 20rpx 0px rgba(187, 187, 187, 0.3);
				position: relative;
				margin-right: 50rpx;
				margin-bottom: 40rpx;
				border-radius: 20rpx;
				&:nth-child(2n) {
					margin-right: 0;
				}

				.package_img_bg {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					z-index: 0;
				}

				.money_price {
					font-size: 26rpx;
					font-family: DIN;
					font-weight: 500;
					color: #FF4F4D;
					margin-top: 30rpx;

					text {
						font-size: 48rpx;
						font-family: DIN-Bold;
						font-weight: bold;
					}
				}
			}

			.package_news {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 9;
				padding: 38rpx 0 0 28rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #512C19;
				
			}

			.news_img {
				width: 38rpx;
				height: 34rpx;
				margin-right: 12rpx;
			}
			.news_img_tj{
				width: 70rpx;
				height: 32rpx;
			}
			.one_month{
				line-height: 40rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(81, 44, 25, 0.8);
				text{
					text-decoration: line-through;
				}
			}
		}
		// 同意
		.agree_wrap{
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #BABABB;
			.big {
				width: 26rpx;
				height: 26rpx;
				border: 1px solid #BBBBBB;
				border-radius: 50%;
				margin-right: 14rpx;
			}
			
			.active_big {
				width: 26rpx;
				height: 26rpx;
				color: #FF831F;
				font-size: 26rpx;
				border: none;
				margin-right: 14rpx;
			}
			text{
				color: #FF831F;
			}
		}
		// 立即续费
		.btn_wrap{
			width: 694rpx;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			background: linear-gradient(90deg, #FE9D32 0%, #FF7008 100%);
			box-shadow: 0px 0px 20rpx 0px rgba(187,187,187,0.3);
			border-radius: 46rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			margin-top: 30rpx;
			margin-bottom: 40rpx;
			&.btn_wrap1{
				background: linear-gradient(90deg, #4B5381 0%, #282A4F 100%);
				box-shadow: 0px 0px 20px 0px rgba(187,187,187,0.3);
			}
		}
		// 会员特权
		.privilege_img{
			height: 130rpx;
			background-color: #fff;
			position: relative;
			overflow: hidden;
			border-radius: 26rpx 26rpx 0 0;
			image{
				width: 100%;
				height: 100%;
				position: absolute;
				top: -10rpx;
				left: 0;
				z-index: 0;
			}
			.privilege_box{
				width: 100%;
				height: 100%;
				position: absolute;
				top: -10rpx;
				left: 0;
				z-index: 9;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}
		}
		// 卡片流
		.card_stream{
			width: 100%;
			padding: 20px 50rpx;
			.card_stream_img{
				width: 100%;
				height: 300rpx;
			}
		}
	}
	.viptq_box{
		box-shadow: 0px 0px 30px 0px rgba(187,187,187,0.2);
	}
	.sw_list{
		width: 100%;
		height: 80rpx;
		margin-bottom: 10rpx;
		.sw_li{
			display: inline-flex;
			min-width: 172rpx;
			height: 68rpx;
			background: #F8F8F8;
			border-radius: 10rpx;
			align-items: center;
			justify-content: center;
			margin-right: 28rpx;
			font-size: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #666666;
				border: 1px solid #f8f8f8;
			&.active{
				color: #FF9C00;
				background: rgba(255,156,0,0.1);
				border: 1px solid #FF9C00;
				
			}
		}
	}
</style>
