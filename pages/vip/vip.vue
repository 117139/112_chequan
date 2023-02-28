<template>
	<view>
		<vip :curtype="cur" :key="'ivip'+cur"></vip>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var _that
	export default {
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
				current: 0,//套餐选择 当前搜索引
				sele: false, //阅读并同意
				
				cur:0,
				bg_color:'#FF9E54'
			}
		},
		computed: {
			...mapState(['hasLogin', 'loginDatas','vipDatas'])
		},
		onLoad(options) {
			_that=this
			// _that.getviplist()
		},
		onShow() {
			var vipnum = uni.getStorageSync('vipnum')
				console.log(vipnum)
			if(vipnum){
				if(vipnum==1){
					_that.bg_color='#282A4F'
					_that.cur=1
				}else{
					_that.bg_color='#FF9E54'
					_that.cur=0
				}
				uni.removeStorageSync('vipnum')
			}
		},
		methods: {
			setcur(index){
				_that.cur=index
				if(index==1){
					_that.bg_color='#282A4F'
				}else{
					_that.bg_color='#FF9E54'
				}
			},
			
			// getviplist(){
			// 	var datas={
			// 		dtProdID:'1'
			// 	}
			// 	// datas=JSON.stringify(datas)
			// 	_that.$proBase.getviplist(datas).then((response) => {
			// 		console.log(response)
			// 		const datas = response.data
			// 		if(datas.code==200){
			// 			_that.list=datas.data.dataSkus
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
					color: #735546;
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
</style>
