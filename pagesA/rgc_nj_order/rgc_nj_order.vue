<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<view class="steps_box">
			<u-steps current="0" :dot="true" inactiveColor="#EEEEEE" activeColor="#4680E6">
					<u-steps-item title="支付订单" ></u-steps-item>
					<u-steps-item title="上传资料"  ></u-steps-item>
					<u-steps-item title="年检办理"></u-steps-item>
					<u-steps-item title="回寄标志"></u-steps-item>
				</u-steps>
		</view>
		<view class="cz_box">
			<view class="cz_tip"><text class="iconfont icon-jinggao"></text>资料无误,1至2天闪电办完,不需要跑车管所(后台设置)</view>
			<view class="car_li fww">
				<view class="car_li_l">京NTP686-{{nj_array[nj_index].title}}</view>
				<!-- <view class="car_li_r" @click="$service.back">重新编辑</view> -->
				<view class="nj_tg dis_flex aic">
					<view class="nj_tg_li">代预约</view>
					<view class="nj_tg_li">代办理</view>
				</view>
			</view>
			<view class="cm_li">
				<view class="cm_l"><text>*</text>车主姓名</view>
				<input type="text" class="cm_r" placeholder="请输入车主姓名" v-model="user_name">
			</view>
			<view class="cm_li">
				<view class="cm_l"><text>*</text>车主手机号</view>
				<input type="number" class="cm_r" placeholder="请输入车主手机号" v-model="user_tel">
			</view>
			<view v-if="nj_index==0" class="cm_li" style="border-bottom: 0;" @click="getadd">
				<view class="cm_l"><text>*</text>联系地址</view>
				<input type="text" class="cm_r" placeholder="请选择联系地址" v-model="user_add" :disabled="true">
				<text class="iconfont icon-next"></text>
			</view>
			<view v-if="nj_index==1" class="cm_li" style="border-bottom: 0;" @click="getadd">
				<view class="cm_l"><text>*</text>邮寄地址</view>
				<input type="text" class="cm_r" placeholder="请选择收件地址" v-model="user_add" :disabled="true">
				<text class="iconfont icon-next"></text>
			</view>
			<view v-if="nj_index==0" class="nj_text_box">
				<textarea class="nj_text" placeholder="请输入详细地址，会有专业人员为您代驾年检" v-model="address"></textarea>
			</view>
			<view v-if="nj_index==1" class="nj_text_box">
				<textarea class="nj_text" placeholder="请输入详细地址，年检办完将回寄合格标志给您" v-model="address"></textarea>
			</view>
		</view>
		<view class="shop_vip_box" @click="$service.jump" data-url="/pagesA/openVIp/openVIp?type=0"  :data-login="true">
			<image class="shop_vip_bg" src="/static/images/vip_bg_u.png" mode="aspectFill"></image>
			<image class="shop_vip_i" src="/static/images/vip_u.png" mode="aspectFill"></image>
			<view class="shop_vip_btn">去开通</view>
			<view class="shop_vip_msg">
				<view class="sd1">开通会员</view>
				<!-- <view class="sd2">年检办理服务费立减98元</view> -->
				<view class="sd2">免费查车型/查状态/查违章</view>
			</view>
		</view>
		<view v-if="nj_index==1" class="xx_txm">
			<view class="xxtxm1">
				<view class="xxt1">行驶证条形码</view>
				<input type="text" class="xxt2" placeholder="请输入条形码后6位（选填）">
			</view>
			<view class="xxtxm2">快至2小时办完</view>
		</view>
		<!-- <view class="fwf_tit">
			服务费
		</view> -->
		<view class="fw_list">
			<view class="fw_li">
				<view class="fw_r1">服务费</view>
				<view class="fw_r2" style="padding-right: 0;">￥98.00</view>
				<!-- <view class="fw_box" :class="{active:fw_type==0}" @click="fw_type=0">
					<text class="iconfont icon-duigou2"></text>
				</view> -->
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
			<!-- <view class="fw_li">
				<image class="fw_img" src="/static/images/icon_vippay.png" mode="aspectFit"></image>
				<view class="fw_r1">会员支付</view>
				<view class="fw_r_num">今日免费还剩10次</view>
				<view class="fw_r2"></view>
				<view class="fw_box" :class="{active:pay_type==2}" @click="pay_type=2">
					<text class="iconfont icon-duigou2"></text>
				</view>
			</view> -->
		</view>
		<checkbox-group @change="checkboxChange">
			<view class="xieyi_box">
				<label class="dis_flex aic">
				<checkbox value="cb" checked="true" style="transform:scale(0.7)"/>
				我已阅读并同意此<text @click="$service.jump" data-url="/pagesA/xieyi/xieyi?type=0">《年检代办服务协议》</text>
				</label>
			</view>
		</checkbox-group>
		<view class="b_box">
			<view class="b_box1">
				<!-- <view class="b_btn1" @click="pay_fuc">
					<view class="b_btn1_tip" @click.stop="test">每日3次，免费支付</view>
					看广告
				</view> -->
				<view class="order_pri">
					合计: <text>￥98.00</text>
				</view>
				<view class="b_btn" @click="pay_fuc">去支付</view>
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
				xy_type:true,
				nj_array:[
					{
						title:'线上年检'
					},
					{
						title:'线下年检'
					},
				],
				nj_index:0,
				user_name:'',
				user_tel:'',
				user_add:'',
				lat:'',
				lng:'',
				address:''
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
			that.nj_index=e.type||0
			console.log(e)
			
			// that.getdata()
		},
		onShow() {
			// that.onRetry()
		},
		
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			getadd(){
				console.log(1)
				uni.chooseLocation({
					success: res => {
						// this.value5 = res.name
						console.log('当前位置的：');
						console.log(res);
						that.address=res.address//地址
						that.lng=res.longitude//经度  
						that.lat=res.latitude//纬度  
						that.user_add=res.name
					},fail(err) {
						console.log(err);
					}
				});
			},
			pay_fuc(){
				//上传资料
				uni.redirectTo({
					url:'/pagesA/rgc_nj_order1/rgc_nj_order1?type='+that.options.type
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
.steps_box{
	width: 100%;
	height: 134rpx;
	background: #FFFFFF;
	border-radius: 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 22rpx;
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
		margin-bottom: 20rpx;
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
		.nj_tg{
			width: 100%;
			padding-bottom: 10rpx;
			.nj_tg_li{
				display: flex;
				padding: 5rpx 10rpx;
				background:rgba(70, 128, 230, .1);
				border-radius: 4rpx;
				font-size: 24rpx;
				line-height: 26rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #4680E6;
				margin-right: 10rpx;
			}
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
			text{
				color: #e2382f;
			}
		}
		.cm_r{
			flex: 1;
			font-size: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
		}
		.icon-next{
			font-size: 28rpx;
		}
	}
	.nj_text_box{
		width: 100%;
		padding:0 28rpx 28rpx;
	}
	.nj_text{
		font-size: 26rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #333;
		width: 638rpx;
		height: 132rpx;
		background: #F8F8F8;
		border-radius: 10rpx;
		padding: 10rpx 24rpx;
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
	.shop_vip_i{
		position: absolute;
		top: 37rpx;
		left: 28rpx;
		width: 69rpx;
		height: 61rpx;
		z-index: 10;
	}
	.shop_vip_msg{
		position: absolute;
		z-index: 9;
		left: 117rpx;
		top: 0;
		height: 134rpx;
		display: flex;
		flex-direction:column;
		justify-content: center;
		.sd1{
			font-size: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 45rpx;
		}
		.sd2{
			font-size: 24rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #FFFFFF;
		}
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
			width: 250rpx;
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
		.order_pri{
			font-size: 32rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
			text{
				color: #e2382f;
			}
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
/deep/ .u-text__value{
	font-size: 26rpx;
	color: #999;
}
.xx_txm{
	width: 100%;
	background: #FFFFFF;
	border-radius: 10rpx;
	padding: 28rpx;
	margin-bottom: 22rpx;
	.xxtxm1{
		width: 100%;
		display: flex;
		align-items: center;
		margin-bottom: 8rpx;
		.xxt1{
			width: 260rpx;
			font-size: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
		}
		.xxt2{
			flex: 1;
			font-size: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
		}
	}
	.xxtxm2{
		font-size: 24rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FF7214;
	}
}
</style>
