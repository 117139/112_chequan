<template>
	<view class="content">
		<topbar>
			<view class="my_header dis_flex aic">
				<image class="h_add" src="/static/images/icon_address.png" mode="aspectFit"></image>
				<view class="flex_1 h_add_text" >北京1</view>
				<image  @tap="$service.jump" data-url="/pagesA/search/search" class="h_iconr" src="/static/images/icon_find.png" mode="aspectFit"></image>
				<image class="h_iconr" src="/static/images/icon_kefu.png" mode="aspectFit"></image>
			</view>
		</topbar>
		<view class="mbanner">
			<view class="banner_box">
				<u-swiper  :list="list1"   @click="click_fuc" height="286rpx" radius='5' :circular="true" indicator indicatorMode="line"></u-swiper>
			</view>
		</view>
		<view class="pttz_box">
			<image class="pttz_img" src="/static/images/pttz_icon.png" mode="aspectFit"></image>
			<swiper class="card-swiper1" :indicator-dots="false" :circular="true" :vertical="true" :autoplay="true" interval="6000"
				duration="500" indicator-color="#8799a3" indicator-active-color="#0081ff">
				<swiper-item class="dis_flex aic" v-for="(item,index) in 3">
					<view>阅读北京限行规则，避免违章问题</view>
				</swiper-item>
			</swiper>
		</view>
		<scroll-view class="scroll_x order_list" scroll-x="true" >
			<view>
				<view class="order_li" v-for="(item,index) in 4">
					<!-- <image class="order_libg" src="/static/images/order_libg.png" mode="aspectFill"></image> -->
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
		</scroll-view>
		
		<view class="mt_cbox">
			<view class="mt_cboxtit dis_flex aic">
				<view class="mt_cboxtit_l">附近经销商</view>
				<view class="flex_1">/  甄选优质经销商 省心又省钱</view>
				<view>更多<text class="icon icon-next"></text></view>
			</view>
			<view class="mt_msg dis_flex aic">
				<image class="mt_msg_l" src="/static/images/banner_motor.png" mode="aspectFill"></image>
				<view class="mt_msg_r">
					<view class="mt_msg_r1">北京国潮摩托车行</view>
					<view class="mt_msg_r2">
							<image class="h_add" src="/static/images/icon_address_h.png" mode="aspectFit">
							</image>北京朝阳区来广营乡北园东路 顾家庄桥北300米路西
					</view>
				</view>
			</view>
		</view>
		
		<view class="index_main_tit dis_flex aic">
			<view class="i_tit_li" :class="{active:cur==0}" @click="setcur(0)"><text>精选推荐</text></view>
			<view class="i_tit_li" :class="{active:cur==1}" @click="setcur(1)"><text>路线分享</text></view>
			<view class="flex_1"></view>
		</view>
		<view v-if="cur==0" class="car_list dis_flex fww">
			<view class="car_li" v-for="(item,index) in 20">
				<view class="car_li_box">
					<image class="car_li_img" src="/static/images/motor.jpg" mode="aspectFit"></image>
					<view class="car_li_msg">
						<view class="car_li_tit oh2">QJMOTOR 壹米150国 潮探班复古水冷摩托</view>
						<view class="car_li_jl">官方指导价：2.9万</view>
						<view class="car_li_num">1.66万</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="cur==1" class="car_list dis_flex fww">
			<view class="car_li" v-for="(item,index) in 20"  @click="$service.jump" :data-url="'/pages/lx_details/lx_details?id='+1">
				<view class="car_li_box">
					<image class="car_li_img" src="/static/images/motor_lx.jpg" mode="aspectFit"></image>
					<view class="car_li_msg">
						<view class="car_li_tit oh2">皖南川藏线摩托骑行 罗陵湾摩友驿站</view>
						
						<view v-if="index==1" class="car_li_sc car_li_sc1 dis_flex aic" >
							<text class="icon icon-xihuan1"></text>
							256
						</view>
						<view v-else class="car_li_sc dis_flex aic" >
							<text class="icon icon-xihuan"></text>
							256
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var that 
	export default {
		data() {
			return {
				list1: [
						'/static/images/banner_motor.png',
						'/static/images/banner_motor.png',
						'/static/images/banner_motor.png',
				],
				cur:0
			}
		},
		onLoad() {
			that =this
		},
		methods: {
			setcur(index){
				that.cur=index
			},
			click_fuc(e){
				console.log(e)
			}
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
</style>
