<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<view v-if="datas.result" class="banner_box">
			<u-swiper  :list="list1" @click="click_fuc" height="384rpx" radius='5' :circular="true" 
				:indicator="true"
			  :autoplay="false" 
				indicatorMode="dot"></u-swiper>
		</view>
		
		<view v-if="options.type==1" class="jg_box jg_box_wz">
			<!-- 状态 1、待支付 2、待办 3、信息有误 4、已完成 -->
			<view class="jg_tit">{{datas.province||''}}{{datas.car_code||''}}</view>
			<image v-if="datas.status==1" class="datas_li_st" src="/static/images/o_type.png" mode="aspectFill"></image> 
			<image v-if="datas.status==2" class="datas_li_st" src="/static/images/o_type0.png" mode="aspectFill"></image> <!-- 待办 -->
			<image v-if="datas.status==3" class="datas_li_st" src="/static/images/o_type4.png" mode="aspectFill"></image><!-- 有误 -->
			<!-- <image v-if="datas.status==1" class="datas_li_st" src="/static/images/o_type1.png" mode="aspectFill"></image> --> <!-- 完成 -->
			<!-- <image v-else-if="datas.status==2" class="datas_li_st" src="/static/images/o_type2.png" mode="aspectFill"></image> --> <!-- 已查 -->
			<image v-if="datas.status==4" class="datas_li_st" src="/static/images/o_type1.png" mode="aspectFill"></image><!-- 正常 -->
			<view v-if="datas.status==1" class="order_text" style="color: #E2382F;">订单待支付</view>
			<view v-if="datas.status==2" class="order_text" style="color: #999999;">{{p_config.order_tips||'正在处理中，请稍后查看'}}</view>
			<view v-if="datas.status==3" class="order_text" style="color: #E2382F;">您输入的车牌号或车辆识别代号有误</view>
			<view v-if="datas.status==4" class="order_text" style="color: #4680E6;">状态查询已完成</view>
		</view>
		<view v-if="options.type==4" class="jg_box jg_box_wz">
			<!-- //订单状态 1、待支付 2、信息有误 3、待处理 4、无违章 5、有违章 -->
			<view class="jg_tit">{{datas.province||''}}{{datas.car_code||''}}</view>
			<image v-if="datas.status==1" class="datas_li_st" src="/static/images/o_type.png" mode="aspectFill"></image> 
			<image v-if="datas.status==2" class="datas_li_st" src="/static/images/o_type4.png" mode="aspectFill"></image><!-- 有误 -->
			<image  v-if="datas.status==3" class="datas_li_st" src="/static/images/o_type0.png" mode="aspectFill"></image> <!-- 待办 -->
			<image v-if="datas.status==4" class="datas_li_st" src="/static/images/o_type3.png" mode="aspectFill"></image><!-- 正常 -->
			<image v-if="datas.status==5" class="datas_li_st" src="/static/images/o_type5.png" mode="aspectFill"></image><!-- 违章 -->
			<view v-if="datas.status==1" class="order_text" style="color: #E2382F;">订单待支付</view>
			<view v-if="datas.status==2" class="order_text" style="color: #E2382F;">您输入的车牌号或车辆识别代号有误</view>
			<view v-if="datas.status==3" class="order_text" style="color: #999999;">{{p_config.order_tips||'正在处理中，请稍后查看'}}</view>
			<view v-if="datas.status==4" class="order_text" style="color: #4680E6;">恭喜您暂无违章记录</view>
			<view v-if="datas.status==5" class="order_text" style="color: #E2382F;">该车有违章记录</view>
		</view>
		<view class="jg_box">
			<view class="jg_tit">订单信息</view>
			<view class="jg_li">
				订单编号：{{datas.code||''}}
			</view>
			<view class="jg_li">
				下单时间：{{datas.create_time||''}}
			</view>
			<view v-if="datas.pay_time" class="jg_li">
				支付时间：{{datas.pay_time||''}}
			</view>
			<view class="jg_li">
				支付金额：￥{{datas.price||''}}
			</view>
			<view v-if="datas.pay_status" class="jg_li">
				支付方式：
				<text v-if="datas.pay_status==1">微信</text>
				<text v-if="datas.pay_status==2">支付宝</text>
				<text v-if="datas.pay_status==3">会员支付</text>
				<text v-if="datas.pay_status==4">广告</text>
				<text v-if="datas.pay_status==5">分享</text>
			</view>
		</view>
		<block v-if="datas.status==1">
			
			<view class="fwf_tit">
				选择支付方式
			</view>
			<view class="fw_list">
				<view class="fw_li">
					<image class="fw_img" src="/static/images/icon_Wechat.png" mode="aspectFit"></image>
					<view class="fw_r1">微信</view>
					<view class="fw_r2"></view>
					<view class="fw_box" :class="{active:pay_type==1}" @click="pay_type=1">
						<text class="iconfont icon-duigou2"></text>
					</view>
				</view>
				<view class="fw_li">
					<image class="fw_img" src="/static/images/icon_Alipay.png" mode="aspectFit"></image>
					<view class="fw_r1">支付宝</view>
					<view class="fw_r2"></view>
					<view class="fw_box" :class="{active:pay_type==2}" @click="pay_type=2">
						<text class="iconfont icon-duigou2"></text>
					</view>
				</view>
			</view>
		</block>
		<block v-if="options.type==1">
			<!-- 状态 1、待支付 2、待办 3、信息有误 4、已完成 -->
			<view v-if="datas.status==4&&datas.result&&datas.result.length>0" class="jg_btn" @click="down_fuc(1)">一键下载图片</view>
			<view v-if="datas.status==3" class="jg_btn" @click="reset_fuc(datas,1)">重新提交</view>
			<view v-if="datas.status==1" class="jg_btn" @click="pay_fuc">支付</view>
		</block>
		<block v-else>
			<!-- //订单状态 1、待支付 2、信息有误 3、待处理 4、无违章 5、有违章 -->
			<view v-if="datas.status==5&&datas.result&&datas.result.length>0" class="jg_btn" @click="down_fuc(1)">一键下载图片</view>
			<view v-if="datas.status==2" class="jg_btn" @click="reset_fuc(datas,4)">重新提交</view>
			<view v-if="datas.status==1" class="jg_btn" @click="pay_fuc">支付</view>
		</block>
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
				list1: [
						// '/static/images/car2.png',
						// '/static/images/car2.png',
						// '/static/images/car2.png',
				],
				order_type:3,
				pay_type:1
			}
		},
		computed: {
		...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','loginDatas','p_config']),
		},
		// onReachBottom() {
		// 	that.getdata()
		// },
		onLoad(e) {
			that=this
			that.options=e||{}
			//type 1 查状态    2 年检   3 车型识别   4 查违章
			console.log(e)
			if(e.type==1){
				uni.setNavigationBarTitle({
					title:'人工查状态'
				})
			}
			if(e.type==4){
				uni.setNavigationBarTitle({
					title:'订单详情'
				})
			}
			that.getdata()
		},
		onShow() {
			// that.onRetry()
		},
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			reset_fuc(item,type){
				item=JSON.stringify(item)
				if(type==1){
					uni.redirectTo({
						url:'/pagesA/rgc_zt/rgc_zt?code='+item.code+'&datas='+item
					})
				}
				if(type==4){
					uni.redirectTo({
						url:'/pagesA/rgc_wz/rgc_wz?code='+item.code+'&datas='+item
					})
				}
			},
			getdata(){
				var that=this
				var datas={
					code: that.options.code,
				}
				var jkurl='/order/cstatusdetail'
				if(that.options.type==4){
					jkurl='/order/violationdetail'
				}
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
						if(datas.result.length>0){
							that.list1=datas.result.map((e)=>{
								return that.$service.getimg(e)
							})
						}
						
						
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
			pay_fuc(){
				var that =this
				var jkurl='/operate/pay'
				var datas={
					code :that.options.code,
					type:that.pay_type
				}
				if(that.btnkg==1){
					return
				}
				that.btnkg=1
				that.$service.P_post(jkurl, datas).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						that.htmlReset = 0
						var datas = res.data
						console.log(typeof datas)
						var provider=''
						// 支付宝
						if (that.pay_type == 2) {
							provider='alipay'
							
						}
						//微信
						if (that.pay_type == 1) {
							console.log('datas----------------------------------------->')
							console.log(typeof datas)
							console.log(datas)
							provider='wxpay'
							
						}
						uni.requestPayment({
							provider: provider,
							orderInfo: datas, //微信、支付宝订单数据
							success: function(res) {
								console.log('success:' + JSON.stringify(res));
								that.gook_fuc(code)
							},
							fail: function(err) {
								that.btnkg = 0
								console.log('fail:' + JSON.stringify(err));
								uni.showModal({
									content: "支付失败",
									showCancel: false
								})
							}
						});
						
					} else {
							that.btnkg=0
					
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
			gook_fuc(code){
				uni.showToast({
					icon:'none',
					title:'支付成功'
				})
				setTimeout(function(){
					that.getdata()
				},1000)
			},
			down_fuc(num){
				if(!num){
					num=1
				}
				if(that.list1.length<1){
					return
				}
				uni.showLoading({
					mask:true,
					title:"正在保存图片"+num+'/'+that.list1.length
				})
				var idx=num-1
				var url=that.$service.getimg(that.list1[idx])
				const downloadTask = uni.downloadFile({
					url: url,
					success: (res) => {
						if (res.statusCode === 200) {
							console.log('下载成功');
							uni.hideLoading()
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success(res_m) {
									if(num==that.list1.length){
										uni.showToast({
											icon:'none',
											title:'保存成功'
										})
									}else{
										num++
										uni.hideLoading()
										that.down_fuc(num)
									}
								}
							})
							
							
						}
					},
					fail() {
						uni.hideLoading()
						uni.showToast({
							icon:'none',
							title:'保存失败'
						})
					}
				});
				
				downloadTask.onProgressUpdate((res) => {
					console.log('下载进度' + res.progress);
					console.log('已经下载的数据长度' + res.totalBytesWritten);
					console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
				
					// 满足测试条件，取消下载任务。
					// if (res.progress > 50) {
					// 	downloadTask.abort();
					// }
				});
				
			},
			sub_fuc(){
				// uni.showToast({
				// 	icon:'none',
				// 	title:'提交成功'
				// })
				if(that.options.type==1){
					uni.redirectTo({
						url:'/pagesA/rgc_zt/rgc_zt'
					})
				}
				if(that.options.type==4){
					uni.redirectTo({
						url:'/pagesA/rgc_wz/rgc_wz'
					})
				}
			},
			click_fuc(e){
				console.log(e)
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
	background: #F8F8F8;
	padding: 28rpx;
}
.banner_box{
	width: 100%;
	margin-bottom: 20rpx;
}
.jg_box{
	width: 100%;
	background: #FFFFFF;
	border-radius: 10rpx;
	padding: 28rpx;
	margin-bottom: 80rpx;
	position: relative;
	&.jg_box_wz{
		margin-bottom: 22rpx;
	}
	.jg_tit{
		font-size: 32rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #333333;
		position: relative;
		padding-left: 20rpx;
		margin-bottom: 15rpx;
		&:before{
			content:'';
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
	.jg_li{
		font-size: 28rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #999999;
		line-height: 35rpx;
		padding: 5rpx 0;
	}
	
	
	.datas_li_st{
		position: absolute;
		top: 0;
		right: 0;
		width: 104rpx;
		height: 104rpx;
	}
	.order_text{
		font-size: 32rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #999;
		width: 100%;
		height: 110rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
.jg_btn{
	font-size: 32rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #FFFFFF;
	width: 100%;
	height: 90rpx;
	background: #4680E6;
	border-radius: 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 22rpx;
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
</style>
