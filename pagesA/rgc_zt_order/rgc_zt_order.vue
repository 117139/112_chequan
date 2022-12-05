<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<view class="cz_box">
			<view class="cz_tip"><text class="iconfont icon-jinggao"></text>请核对输入信息，如有误请修改</view>
			<view class="car_li">
				<view class="car_li_l">京NTP686</view>
				<view class="car_li_r" @click="$service.back">重新编辑</view>
			</view>
			<view class="cm_li">
				<view class="cm_l">车辆识别号</view>
				<view class="cm_r">LSVWY4180KN246094</view>
			</view>
			<view class="cm_li">
				<view class="cm_l">发动机型号</view>
				<view class="cm_r">0N2185</view>
			</view>
			<view class="cm_li">
				<view class="cm_l">车辆类型</view>
				<view class="cm_r">小型轿车</view>
			</view>
			
		</view>
		<view class="shop_vip_box" @click="$service.jump" data-url="/pagesA/openVIp/openVIp?type=0"  :data-login="true">
			<image class="shop_vip_bg" src="/static/images/uservurl.png" mode="aspectFill"></image>
			<view class="shop_vip_btn">去开通</view>
		</view>
		<view class="fwf_tit">
			服务费
		</view>
		<view class="fw_list">
			<view class="fw_li">
				<view class="fw_r1">查北京地区</view>
				<view class="fw_r2">￥5.00</view>
				<view class="fw_box" :class="{active:fw_type==0}" @click="fw_type=0">
					<text class="iconfont icon-duigou2"></text>
				</view>
			</view>
			<view class="fw_li">
				<view class="fw_r1">查全国地区</view>
				<view class="fw_r2">￥20.00</view>
				<view class="fw_box" :class="{active:fw_type==1}" @click="fw_type=1">
					<text class="iconfont icon-duigou2"></text>
				</view>
			</view>
		</view>
		<view class="fwf_tit">
			选择支付方式
		</view>
		<view class="fw_list">
			<view class="fw_li">
				<image class="fw_img" src="/static/images/icon_Wechat.png" mode="aspectFit"></image>
				<view class="fw_r1">微信</view>
				<view class="fw_r2"></view>
				<view class="fw_box" :class="{active:pay_type==0}" @click="pay_type=0">
					<text class="iconfont icon-duigou2"></text>
				</view>
			</view>
			<view class="fw_li">
				<image class="fw_img" src="/static/images/icon_Alipay.png" mode="aspectFit"></image>
				<view class="fw_r1">支付宝</view>
				<view class="fw_r2"></view>
				<view class="fw_box" :class="{active:pay_type==1}" @click="pay_type=1">
					<text class="iconfont icon-duigou2"></text>
				</view>
			</view>
			<view class="fw_li">
				<image class="fw_img" src="/static/images/icon_vippay.png" mode="aspectFit"></image>
				<view class="fw_r1">会员支付</view>
				<view class="fw_r_num">今日免费还剩10次</view>
				<view class="fw_r2"></view>
				<view class="fw_box" :class="{active:pay_type==2}" @click="pay_type=2">
					<text class="iconfont icon-duigou2"></text>
				</view>
			</view>
		</view>
		<checkbox-group @change="checkboxChange">
			<view class="xieyi_box">
				<label class="dis_flex aic">
				<checkbox value="cb" checked="true" style="transform:scale(0.7)"/>
				我已阅读并同意此<text @click="$service.jump" data-url="/pagesA/xieyi/xieyi?type=0">《用户协议》</text>和<text @click="$service.jump" data-url="/pagesA/xieyi/xieyi?type=1">《隐私协议》</text>
				</label>
			</view>
		</checkbox-group>
		<view class="b_box">
			<view class="b_box1">
				<view class="b_btn1" @click="pay_fuc">
					<view class="b_btn1_tip" @click.stop="test">每日3次，免费支付</view>
					看广告
				</view>
				<view class="b_btn" @click="pay_fuc">确认支付￥{{fw_type==0?'5.00':'20.00'}}</view>
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
				fw_type:0,
				pay_type:0,
				xy_type:true
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
			//type 1 查状态    2 年检   3 车型识别   4 查违章
			console.log(e)
			
			// that.getdata()
		},
		onShow() {
			// that.onRetry()
		},
		
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			pay_fuc(){
				uni.redirectTo({
					url:'/pagesA/rgc_zt_jg/rgc_zt_jg?type='+that.options.type
				})
			},
			checkboxChange: function (e) {
				console.log(e.detail.value)
				var arr=e.detail.value
				if(arr.length>0){
					this.xy_type=true
				}else{
					this.xy_type=false
				}
				
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
.wrap_box{
	background: #f8f8f8;
	padding: 28rpx 28rpx 240rpx;
}
.cz_box{
	width: 100%;
	background: #FFFFFF;
	border-radius: 10rpx;
	padding: 20rpx 0 0;
	margin-bottom: 20rpx;
	.cz_tip{
		width: 100%;
		height: 64rpx;
		background: rgba(70, 128, 230, .1);
		display: flex;
		align-items: center;
		font-size: 24rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #4680E6;
		padding: 0 28rpx;
		text{
			font-size: 24rpx;
			margin-right: 10rpx;
		}
	}
	.car_li{
		width: 100%;
		border-bottom: 1px solid #eee;
		padding: 0 28rpx;
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.car_li_l{
			font-size: 32rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			position: relative;
			color: #333333;
			padding-left: 18rpx;
			&:before{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				margin-top: -14rpx;
				width: 6rpx;
				height: 28rpx;
				background: #4680E6;
				border-radius: 3rpx;
			}
		}
		.car_li_r{
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #4680E6;
		}
	}
	.cm_li{
		width: 100%;
		border-bottom: 1px solid #eee;
		padding: 0 28rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 30rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #333333;
		.cm_l{
			width: 220rpx;
		}
		.cm_r{
			flex: 1;
		}
	}
}
.shop_vip_box{
	width: 100%;
	height: 134rpx;
	border-radius: 20rpx;
	margin-bottom: 22rpx;
	position: relative;
	.shop_vip_bg{
		position: absolute;
		z-index: 1;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.shop_vip_btn{
		position: absolute;
		top: 38rpx;
		right: 32rpx;
		width: 180rpx;
		height: 58rpx;
		background: linear-gradient(-90deg, #FFA537 0%, #FFEB78 100%);
		border-radius: 29rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #64441D;
		z-index: 10;
	}
}
.fwf_tit{
	width: 100%;
	font-size: 30rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #999999;
	// line-height: 80rpx;
	margin-bottom: 20rpx;
}
.fw_list{
	width: 100%;
	background: #FFFFFF;
	border-radius: 10rpx;
	margin-bottom: 30rpx;
	.fw_li{
		width: 100%;
		height: 92rpx;
		display: flex;
		align-items: center;
		padding: 0 28rpx;
		&+.fw_li{
			border-top: 1px solid #eee;
		}
		.fw_img{
			width: 48rpx;
			height: 48rpx;
			margin-right: 15rpx;
		}
		.fw_r1{
			font-size: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
		}
		.fw_r2{
			flex: 1;
			text-align: right;
			padding-right: 60rpx;
			font-size: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #E2382F;
		}
		.fw_r_num{
			margin-left: 10rpx;
			font-size: 24rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #FF9C00;
		}
		.fw_box{
			width: 30rpx;
			height: 30rpx;
			border: 1px solid #BBBBBB;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			&.active{
				background: #4680E6;
				border: 1px solid #4680E6;
			}
			text{
				font-size: 22rpx;
				color: #fff;
			}

		}
	}
}
.b_box{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: 990;
	background: #FFFFFF;
	box-shadow: 0px 0px 30px 0px rgba(151,154,162,0.2);
	padding-bottom: 0;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	.b_box1{
		width: 100%;
		padding: 10rpx 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.b_btn1{
			width: 328rpx;
			height: 90rpx;
			background: #FF7214;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #F5F5F5;
			position: relative;
			margin-right: 30rpx;
			.b_btn1_tip{
				position: absolute;
				bottom: 110rpx;
				width: 264rpx;
				height: 58rpx;
				background: #333333;
				border-radius: 10rpx;
				z-index: 999;
				font-size: 24rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
				&::after{
					content: '';
					position: absolute;
					bottom: -20rpx;
					right: 50rpx;
					width: 0;
					height: 0;
					border:10rpx solid transparent;
					border-top-color: #333;
					z-index: 999;
				}
			}
		}
		.b_btn{
			// width: 328rpx;
			flex: 1;
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
}
.xieyi_box{
	margin-top: 20rpx;
	width: 100%;
	font-size: 26rpx;
	color: #999;
	display: flex;
	align-items: center;
	text{
		color: #007aff;
	}
}
</style>
