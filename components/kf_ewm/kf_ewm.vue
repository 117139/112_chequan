<template>
	<view class="popup_content_wrap dis_flex_c aic">
		<view class="popup_tit">
			在线客服
		</view>
		<view class="popup_img_wrap flex_cen">
			<image :src="imgUrl" mode="aspectFit"></image>
		</view>
		<!-- <view class="">
			广州汇金易智科技有限公司
		</view> -->
		<view class="sweep_code">
			扫描二维码，添加我的企业微信
		</view>
	</view>
</template>

<script>
	export default {
		name:"kf_ewm",
		data() {
			return {
				// userImg: "/static/v2/tx.png",
				userName: "风向数据最多是十个字",
				userNum: 20220812,
				// imgUrl:"/static/v2/kfewm.png",
				imgUrl:'https://www.winddatas.com/res/profile/consultant.png',
			}
		}
	}
</script>

<style lang="scss">
.popup_content_wrap{
		width: 626rpx;
		height: auto;
		background: linear-gradient(0deg, #FFFFFF 66%, #FFF1DF 100%);
		border-radius: 20rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #BBBBBB;
		padding-bottom: 40rpx;
		border-radius: 20rpx;
		.popup_img_wrap{
			width: 266rpx;
			height: 266rpx;
			background: rgba(255, 147, 7, .2);
			border-radius: 10rpx;
			margin-bottom: 26rpx;
			image{
				width: 250rpx;
				height: 250rpx;
				background: #FF9307;
				border-radius: 6rpx;
				padding: 6rpx;
			}
		}
		.popup_tit{
			width: 100%;
			height: 98rpx;
			line-height: 98rpx;
			text-align: center;
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
		}
		.sweep_code{
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #BBBBBB;
			margin-top: 14rpx;
		}
	}
</style>