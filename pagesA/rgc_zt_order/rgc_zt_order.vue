<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<view class="cz_box">
			<view class="cz_tip"><text class="iconfont icon-jinggao"></text>请核对输入信息，如有误请修改</view>
			<view class="car_li">
				<view class="car_li_l">{{datas_cs.province}}{{datas_cs.car_code}}</view>
				<view class="car_li_r" @click="$service.back">重新编辑</view>
			</view>
			<view class="cm_li">
				<view class="cm_l">车辆识别号</view>
				<view class="cm_r">{{datas_cs.car_number}}</view>
			</view>
			<view class="cm_li">
				<view class="cm_l">发动机型号</view>
				<view class="cm_r">{{datas_cs.engine}}</view>
			</view>
			<view class="cm_li">
				<view class="cm_l">车辆类型</view>
				<view class="cm_r">{{datas_cs.car_type}}</view>
			</view>
			
		</view>
		<block v-if="datas_cs.code">
			<view class="b_box">
				<view class="b_box1">
					
					<view class="b_btn flex_1" @click="reset_fuc">提交</view>
				</view>
			</view>
		</block>
		<block v-else>
			<view class="shop_vip_box" @click="$service.jump" data-url="/pagesA/openVIp/openVIp?type=0"  :data-login="true">
				<image class="shop_vip_bg" src="/static/images/uservurl.png" mode="aspectFill"></image>
				<view class="shop_vip_btn">去开通</view>
			</view>
			<view class="fwf_tit">
				服务费
			</view>
			<view class="fw_list">
				<view class="fw_li">
					<view class="fw_r1">{{p_config.fw_title||''}}</view>
					<view class="fw_r2">￥{{bj_price||'0'}}</view>
					<view class="fw_box" :class="{active:fw_type==0}" @click="fw_type=0">
						<text class="iconfont icon-duigou2"></text>
					</view>
				</view>
				<view class="fw_li">
					<view class="fw_r1">{{p_config.fw_title1||''}}</view>
					<view class="fw_r2">￥{{or_price||'0'}}</view>
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
					<view class="fw_box" :class="{active:pay_type==1}" @click="pay_type=1">
						<text class="iconfont icon-duigou2"></text>
					</view>
				</view>
				<!-- #ifdef APP -->
				<view class="fw_li">
					<image class="fw_img" src="/static/images/icon_Alipay.png" mode="aspectFit"></image>
					<view class="fw_r1">支付宝</view>
					<view class="fw_r2"></view>
					<view class="fw_box" :class="{active:pay_type==2}" @click="pay_type=2">
						<text class="iconfont icon-duigou2"></text>
					</view>
				</view>
				<!-- #endif -->
				<view class="fw_li"  v-if="pp_datas.is_pay==1&&loginDatas.u_day_num>0">
					<image class="fw_img" src="/static/images/icon_vippay.png" mode="aspectFit"></image>
					<view class="fw_r1">会员支付</view>
					<view class="fw_r_num">今日免费还剩{{loginDatas.u_day_num}}次</view>
					<view class="fw_r2"></view>
					<view class="fw_box" :class="{active:pay_type==3}" @click="pay_type=3">
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
					<block  v-if="pp_datas.is_gg==1">
					<view v-if="loginDatas.u_gg>0" class="b_btn1" @click="ad_fuc">
						<view class="b_btn1_tip" @click.stop="test">每日3次，免费支付</view>
						看广告
					</view>
					<!-- #ifdef APP -->
					<view v-else-if="loginDatas.u_fx>0" class="b_btn1" @click="share_fuc">
						分享
					</view>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<view v-else-if="loginDatas.u_fx>0" class="b_btn1" style="position: relative;">
						<button type="default" open-type="share" style="position: absolute;opacity: 0; top: 0;left: 0;right: 0;bottom: 0;" :data-id="1"></button>
						分享
					</view>
					<!-- #endif -->
					</block>
					<view class="b_btn flex_1" @click="mk_fuc">确认支付￥{{fw_type==0?bj_price:or_price}}</view>
				</view>
			</view>
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
	var timestr=null
	export default {
		data() {
			return {
				options:'',
				datas:'',
				page:1,
				fw_type:0,
				pay_type:1,
				xy_type:true,
				datas_cs:'',
				bj_price:'',
				or_price:'',
				pp_datas:'',
				btnkg:0
			}
		},
		computed: {
		...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','loginDatas','addmsg','p_config']),
		},
		// onReachBottom() {
		// 	that.getdata()
		// },
		onLoad(e) {
			that=this
			that.options=e||{}
			//type 1 查状态    2 年检   3 车型识别   4 查违章
			console.log(e)
			var cs=JSON.parse(e.cs)
			that.datas_cs=cs
			that.getdata_pri()
		},
		onShow() {
			// that.onRetry()
			if(this.hasLogin){
				uni.$emit('login_fuc', {
					title: ' 刷新信息 ',
					content: 'item.id'
				});
			}
			clearTimeout(timestr)
			if(that.share_type==1){
				that.share_ok()
			}
		},
		
		onShareAppMessage() {
			var userid=uni.getStorageSync('userid')||''
			that.share_type=1
			return {
				path: '/pages/index/index?id=' + userid,
				success: function(res) {
					console.log('成功', res)
					// that.share_ok()
				}
			}
		},
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			ad_fuc(){
				that.pay_type=4
				that.mk_fuc()
			},
			share_ok(){
				that.pay_type=5
				that.mk_fuc()
			},
			share_fuc(){
				var code=''
				// if(that.loginDatas.identification_id){
				// 	code=that.loginDatas.identification_id
				// }
				uni.shareWithSystem({
				  summary: '懂车圈',
				  // href: 'https://yibeitong.com.aa.800123456.top/h5/#/?code='+code,
				  href: 'https://www.baidu.com?code='+code,
				  success(){
				    // 分享完成，请注意此时不一定是成功分享
						timestr=setTimeout(()=>{
							that.share_type=1
							console.log('1111')
						},2000)
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
			getdata_pri(){
				var datas={
					province: that.datas_cs.province,
					type:that.options.type==1?1:3
				}
				var jkurl='/publics/price'
				
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
						that.pp_datas=datas
						that.bj_price=datas.bj_price
						that.or_price=datas.or_price
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
			reset_fuc(){
				var pay_status=that.pay_type
				var datas={
					code:that.datas_cs.code,
					img: that.datas_cs.img,
					province:that.datas_cs.province,
					car_code:that.datas_cs.car_code,
					car_number:that.datas_cs.car_number,
					engine:that.datas_cs.engine,
					car_type:that.datas_cs.car_type,
					// address:that.fw_type==1?2:1,
					// pay_status:pay_status
				}
				var jkurl='/car/cstatusagain'
				if(that.options.type==4){
					jkurl='/car/violationagain'
				}
				that.$service.P_post(jkurl, datas).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						that.htmlReset = 0
						var datas = res.data
						console.log(typeof datas)
						
						that.gook_fuc(datas)
						// if (typeof datas == 'string') {
						// 	datas = JSON.parse(datas)
						// }
						// console.log(res)
						// that.datas=datas.content
						// // if(datas.title){
						// // 	uni.setNavigationBarTitle({
						// // 		title:datas.title
						// // 	})
						// // }
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
			// 首次提交
			mk_fuc(){
				var pay_status=that.pay_type
				var datas={
					img: that.datas_cs.img,
					province:that.datas_cs.province,
					car_code:that.datas_cs.car_code,
					car_number:that.datas_cs.car_number,
					engine:that.datas_cs.engine,
					car_type:that.datas_cs.car_type,
					address:that.fw_type==1?2:1,
					pay_status:pay_status
				}
				var jkurl='/car/cstatus'
				if(that.options.type==4){
					jkurl='/car/violation'
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
						if(that.pay_type<3){
							that.pay_fuc(datas)
							return
						}
						that.gook_fuc(datas)
						// if (typeof datas == 'string') {
						// 	datas = JSON.parse(datas)
						// }
						// console.log(res)
						// that.datas=datas.content
						// // if(datas.title){
						// // 	uni.setNavigationBarTitle({
						// // 		title:datas.title
						// // 	})
						// // }
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
				return
				uni.redirectTo({
					url:'/pagesA/rgc_zt_jg/rgc_zt_jg?type='+that.options.type
				})
			},
			pay_mp_fuc(data,code){
				console.log(data)
				// return
				that.$service.wxpay(data).then(res => {
					
					that.gook_fuc(code)
					
					// setTimeout(()=>{
					// 	uni.navigateBack({
					// 		delta:1
					// 	})
					// },1000)
				}).catch(e => {
					that.btn_kg=0
					uni.showToast({
						icon: 'none',
						title: '微信支付失败'
					})
				})
			},
			pay_fuc(code){
				var that =this
				
				var jkurl='/operate/pay'
				var datas={
					code :code,
					type:that.pay_type
				}
				// #ifdef MP-WEIXIN
				datas={
					code :code,
					type:3
				}
				// #endif
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
						// #ifdef MP-WEIXIN
						that.pay_mp_fuc(datas,code)
						return
						// #endif
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
						if(!datas){
							that.gook_fuc(code)
							return
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
								setTimeout(()=>{
									uni.redirectTo({
										url:'/pagesA/rgc_zt_jg/rgc_zt_jg?type='+that.options.type+'&code='+code
									})
								},1000)
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
						
						setTimeout(()=>{
							uni.redirectTo({
								url:'/pagesA/rgc_zt_jg/rgc_zt_jg?type='+that.options.type+'&code='+code
							})
						},1000)
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
					
					setTimeout(()=>{
						uni.redirectTo({
							url:'/pagesA/rgc_zt_jg/rgc_zt_jg?type='+that.options.type+'&code='+code
						})
					},1000)
				})
			},
			gook_fuc(code){
				uni.showToast({
					icon:'none',
					title:'提交成功'
				})
				setTimeout(function(){
					that.btnkg=0
					// uni.redirectTo({
					// 	// url:'/pages_my/my_fabu/my_fabu'
					// 	url:'/pages_my/store_fb_ok/store_fb_ok?type=2&type1='+that.type1
					// })
					uni.redirectTo({
						url:'/pagesA/rgc_zt_jg/rgc_zt_jg?type='+that.options.type+'&code='+code
					})
				},1000)
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
