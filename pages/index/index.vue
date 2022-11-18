<template>
	<view class="content">
		<view class="banner_box">
			<u-swiper  :list="list1"   @click="click_fuc" height="320rpx" radius='0' :circular="true"></u-swiper>
		</view>
		<!-- 金刚区 -->
		<view class="index_tui_list dis_flex fww">
			<view class="index_tui_li" @click="$service.jump" data-url="/pagesA/jyz_list/jyz_list">
				<view class="index_tui_li_img">
					<image src="/static/images/iti1.png" mode="aspectFill"></image>
				</view>
				<view class="index_tui_li_text">加油站</view>
			</view>
			<view class="index_tui_li" @click="$service.jump" data-url="/pagesA/qcmr_list/qcmr_list">
				<view class="index_tui_li_img">
					<image src="/static/images/iti2.png" mode="aspectFill"></image>
				</view>
				<view class="index_tui_li_text">汽车美容</view>
			</view>
			<view class="index_tui_li">
				<view class="index_tui_li_img">
					<image src="/static/images/iti3.png" mode="aspectFill"></image>
				</view>
				<view class="index_tui_li_text">人工查状态</view>
			</view>
			<view class="index_tui_li">
				<view class="index_tui_li_img">
					<image src="/static/images/iti4.png" mode="aspectFill"></image>
				</view>
				<view class="index_tui_li_text">急速年检</view>
			</view>
			<view class="index_tui_li">
				<view class="index_tui_li_img">
					<image src="/static/images/iti5.png" mode="aspectFill"></image>
				</view>
				<view class="index_tui_li_text">免费评估</view>
			</view>
			<view class="index_tui_li">
				<view class="index_tui_li_img">
					<image src="/static/images/iti6.png" mode="aspectFill"></image>
				</view>
				<view class="index_tui_li_text">车型识别</view>
			</view>
			<view class="index_tui_li">
				<view class="index_tui_li_img">
					<image src="/static/images/iti7.png" mode="aspectFill"></image>
					<view class="index_tui_jz">精准</view>
				</view>
				<view class="index_tui_li_text">人工查违章</view>
			</view>
			<view class="index_tui_li">
				<view class="index_tui_li_img">
					<image src="/static/images/iti8.png" mode="aspectFill"></image>
				</view>
				<view class="index_tui_li_text">靠谱二手车</view>
			</view>
		</view>
		<view class="indext2_ul dis_flex fww">
			<view class="indext2_li">
				<image class="indext2_libg" src="/static/images/it2i1.png" mode="aspectFill"></image>
				<view class="indext2_liinr">
					<view>车型识别</view>
					<text>识别高低配</text>
				</view>
			</view>
			<view class="indext2_li">
				<image class="indext2_libg" src="/static/images/it2i2.png" mode="aspectFill"></image>
				<view class="indext2_liinr">
					<view>人工查违章</view>
					<text>1对1快速</text>
				</view>
			</view>
			<view class="indext2_li">
				<image class="indext2_libg" src="/static/images/it2i3.png" mode="aspectFill"></image>
				<view class="indext2_liinr" style="color: #305380;">
					<view>一键评估</view>
					<text>免费快捷</text>
				</view>
			</view>
		</view>
		<view class="indext3_ul dis_flex fww">
			<view class="indext3_li">
				<image class="indext3_libg" src="/static/images/it3bg1.png" mode="aspectFill"></image>
				<view class="indext3_liinr">
					<image src="/static/images/it3i1.png" mode="aspectFit"></image>
					<view class="flex_1">开通商家会员</view>
					<text class="icon icon-next"></text>
				</view>
			</view>
			<view class="indext3_li">
				<image class="indext3_libg" src="/static/images/it3bg2.png" mode="aspectFill"></image>
				<view class="indext3_liinr">
					<image src="/static/images/it3i2.png" mode="aspectFit"></image>
					<view class="flex_1">开通商家会员</view>
					<text class="icon icon-next"></text>
				</view>
			</view>
		</view>
		<scroll-view class="scroll_x order_list" scroll-x="true" >
			<view>
				<view class="order_li" v-for="(item,index) in 4">
					<image class="order_libg" src="/static/images/order_libg.png" mode="aspectFill"></image>
					<view class="order_li_box">
						<view class="order_li_l">
							<image class="order_li_img" src="/static/images/order_img.png" mode="aspectFit"></image>
							<view class="order_li_carid">京A 12345</view>
							<view class="order_li_goorder">
								查看订单<text class="icon icon-next"></text>
							</view>
						</view>
						<view class="order_li_r">
							<image v-if="index==2" class="order_img_type" src="/static/images/order_ok.png" mode="aspectFit"></image>
							<image v-if="index==3" class="order_img_type" src="/static/images/order_wait.png" mode="aspectFit"></image>
							<view v-if="index==1" class="order_tip order_tip1">状态查询成功</view>
							<view v-else-if="index==2" class="order_tip order_tip1">恭喜您该车无违章</view>
							<view v-else-if="index==3" class="order_tip order_tip1">正在查询中请稍等</view>
							<view v-else class="order_tip">该车有违章</view>
							<view v-if="index<2" class="order_btn">一键下载</view>
							<view class="order_code">订单编号：4001234923814</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="index_main_tit dis_flex aic">
			<view class="i_tit_li" :class="{active:cur==0}" @click="setcur(0)"><text>洗车店</text></view>
			<view class="i_tit_li" :class="{active:cur==1}" @click="setcur(1)"><text>加油站</text></view>
			<view class="flex_1"></view>
			<view class="i_tit_r dis_flex aic ju_b">快速入驻<image src="/static/images/i_tit_r.png" mode="aspectFit"></image></view>
		</view>
		<view class="data_list">
			<view  v-if="cur==0" class="data_li" v-for="(item,index) in 3">
				<view class="datali_top" @click="$service.jump" :data-url="'/pages/bus_index/bus_index?id='+1">
					<image class="datali_top_img" src="/static/images/banner_car.png" mode="aspectFill"></image>
					<view class="datali_top_msg">
						<view class="datalimsg_tit">南中环美容洗车店</view>
						<view class="datalimsg_add">北京市朝阳区朝外街道108号</view>
						<view class="dis_flex aic ju_b">
							<view class="datalimsg_dh"><image src="/static/images/iaddicon.png" mode="aspectFit"></image>导航</view>
							<view class="datalimsg_jl">1.71km</view>
						</view>
					</view>
				</view>
				<view class="data_sli dis_flex aic" @click.stop="$service.jump" data-url="/pages/details_qcmr/details_qcmr">
					<text class="data_sli_l"></text>
					<view class="flex_1 data_sli_c">标准洗车-五座轿车</view>
					<view class="data_sli_r">￥<text>43</text></view>
				</view>
				<view class="data_sli dis_flex aic" @click.stop="$service.jump" data-url="/pages/details_qcmr/details_qcmr">
					<text class="data_sli_l"></text>
					<view class="flex_1 data_sli_c">五座轿车全车打蜡</view>
					<view class="data_sli_r">￥<text>98</text></view>
				</view>
				<view class="data_sli dis_flex aic" @click.stop="$service.jump" data-url="/pages/details_qcmr/details_qcmr">
					<text class="data_sli_l"></text>
					<view class="flex_1 data_sli_c">内饰清洗-五座轿车</view>
					<view class="data_sli_r">￥<text>438</text></view>
				</view>
				<view class="datasli_more"  @click="$service.jump" :data-url="'/pages/bus_index/bus_index?id='+1">查看全部<text class="icon icon-next"></text></view>
			</view>
			<view  v-if="cur==1" class="data_li" v-for="(item,index) in 3">
				<view class="datali_top" @click="$service.jump" :data-url="'/pages/bus_index/bus_index?type=3&id='+1">
					<image class="datali_top_img" src="/static/images/banner_car.png" mode="aspectFill"></image>
					<view class="datali_top_msg">
						<view class="datalimsg_tit">南中环加油站</view>
						<view class="datalimsg_add">北京市朝阳区朝外街道108号</view>
						<view class="dis_flex aic ju_b">
							<view class="datalimsg_dh"><image src="/static/images/iaddicon.png" mode="aspectFit"></image>导航</view>
							<view class="datalimsg_jl">1.71km</view>
						</view>
					</view>
				</view>
				<view class="data_sli dis_flex aic" @click.stop="$service.jump" data-url="/pages/details_jyz/details_jyz">
					<text class="data_sli_l"></text>
					<view class="flex_1 data_sli_c">90#汽油</view>
					<view class="data_sli_r">￥<text>7.18</text></view>
				</view>
				<view class="data_sli dis_flex aic" @click.stop="$service.jump" data-url="/pages/details_jyz/details_jyz">
					<text class="data_sli_l"></text>
					<view class="flex_1 data_sli_c">92#汽油</view>
					<view class="data_sli_r">￥<text>7.28</text></view>
				</view>
				<view class="data_sli dis_flex aic" @click.stop="$service.jump" data-url="/pages/details_jyz/details_jyz">
					<text class="data_sli_l"></text>
					<view class="flex_1 data_sli_c">93#汽油</view>
					<view class="data_sli_r">￥<text>8.18</text></view>
				</view>
				<view class="datasli_more"  @click="$service.jump" :data-url="'/pages/bus_index/bus_index?id='+1">查看全部<text class="icon icon-next"></text></view>
			</view>
			<view v-if="cur==0" class="go_more" @click="$service.jump" data-url="/pagesA/qcmr_list/qcmr_list">查看更多洗车店<text class="icon icon-next"></text></view>
			<view v-if="cur==1" class="go_more" @click="$service.jump" data-url="/pagesA/jyz_list/jyz_list">查看更多加油站<text class="icon icon-next"></text></view>
		</view>
		<view class="index_main_tit dis_flex aic">
			<view class="i_tit_li active" ><text>二手车</text></view>
		</view>
		<view class="car_list dis_flex fww">
			<view class="car_li" v-for="(item,index) in 20"  @click="$service.jump" data-url="/pages/details_car/details_car">
				<view class="car_li_box">
					<image class="car_li_img" src="/static/images/car.jpg" mode="aspectFill"></image>
					<view class="car_li_msg">
						<view class="car_li_tit oh2">大众ID.4 X 2021款 Pure+ 纯净长续航版</view>
						<view class="car_li_jl oh1">2021年/0.80万公里</view>
						<view class="car_li_num">17.66万</view>
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
						'/static/images/banner.png',
						'/static/images/banner.png',
						'/static/images/banner.png',
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
	.banner_box {
		width: 100%;
	}
	.index_tui_list{
		width: 100%;
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
	.indext2_ul{
		width: 100%;
		padding: 22rpx 22rpx;
		.indext2_li{
			width: 33.33%;
			padding: 0 5rpx;
			height: 158rpx;
			position: relative;
			.indext2_libg{
				position: absolute;
				top: 0;
				left: 5rpx;
				right: 5rpx;
				bottom: 0;
				z-index: 10;
				width: 224rpx;
				height: 158rpx;
			}
			.indext2_liinr{
				position: relative;
				z-index: 20;
				width: 100%;
				padding-top: 30rpx;
				padding-left: 30rpx;
				font-size: 28rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #84363A;
				line-height: 36rpx;
				text{
					font-size: 22rpx;
					margin-top: 17rpx;
				}
			}
		}
	}
	.indext3_ul{
			width: 100%;
			padding: 22rpx 17rpx;
			.indext3_li{
				width: 50%;
				height: 110rpx;
				border-radius: 10rpx;
				position: relative;
				.indext3_libg{
					position: absolute;
					top: 0;
					left: 11rpx;
					right: 11rpx;
					width: 336rpx;
					height: 110rpx;
					z-index: 10;
				}
				.indext3_liinr{
					width: 100%;
					height: 110rpx;
					display: flex;
					align-items: center;
					position: relative;
					padding: 0 25rpx;
					z-index: 20;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					image{
						width: 60rpx;
						height: 60rpx;
					}
				}
			}
	}
	.order_list{
		width: 100%;
		// padding: 0 28rpx;
		padding-left: 28rpx;
		height: 245rpx;
		.order_li{
			display: inline-flex;
			width: 674rpx;
			height: 226rpx;
			// border: 1px solid #DAE7F8;
			// background: linear-gradient(0deg, #E9EEF5 0%, #FFFFFF 100%);
			border-radius: 10rpx;
			position: relative;
			&+.order_li{
				margin-left: 20rpx;
			}
			.order_libg{
				position: absolute;
				top: 0;
				z-index: 10;
				width: 100%;
				height: 100%;
			}
			.order_li_box{
				width: 100%;
				height: 100%;
				position: relative;
				z-index: 20;
				display: flex;
				.order_li_l{
					width: 248rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.order_li_img{
						width: 126rpx;
						height: 65rpx;
						margin-bottom: 12rpx;
					}
					.order_li_carid{
						font-size: 30rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #000000;
						line-height: 32rpx;
						margin-bottom: 10rpx;
					}
					.order_li_goorder{
						font-size: 24rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #4680E6;
						text{
							font-size: 26rpx;
						}
					}
				}
				.order_li_r{
					flex:1;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.order_img_type{
						width: 58rpx;
						height: 58rpx;
						margin-bottom: 15rpx;
					}
					.order_tip{
						font-size: 30rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #FE392F;
						line-height: 34rpx;
						margin-bottom: 15rpx;
						&.order_tip1{
							color: #4680E6;
						}
					}
					.order_btn{
						width: 248rpx;
						height: 58rpx;
						background: #4680E6;
						border-radius: 29rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 28rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #FFFFFF;
						margin-bottom: 15rpx;
					}
					.order_code{
						font-size: 24rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #999999;
						line-height: 26rpx;
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
