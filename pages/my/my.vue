<template>
	<!-- <view class="wrap_box" :style="'background-image: url('+$service.imgurl+'/static_wx/images/bg_mine.png);'"> -->
	<view class="wrap_box" :style="'background-image: url('+$service.getimg('static_wx/images/bg_mine.png')+');'">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		
		<view v-if="hasLogin" class="my_top dis_flex aic ">
			
			<image v-if="loginDatas.img" class="my_head" :src="$service.getimg(loginDatas.img)" mode="aspectFill"></image>
			<image v-else class="my_head" src="/static/images/pic_head.png" mode="aspectFill"></image>
			<view class="my_name  dis_flex aic ">
				{{loginDatas.name}}
				<image v-if="loginDatas.user_vip.length>0" src="/static/images/user_vip.png" mode="heightFix"></image>
				<image v-if="loginDatas.store_vip.length>0" src="/static/images/shop_vip.png" mode="heightFix"></image>
			</view>
			<text @click="$service.jump" data-url="/pages_my/my_msg/my_msg" class="iconfont icon-shezhi my_shehzi"></text>
		</view>
		<view v-else class="my_top dis_flex aic " @click="$service.jump" data-url="/pages/login/login">
			<image class="my_head" src="/static/images/pic_head.png" mode="aspectFill"></image>
			<view class="my_name  dis_flex aic ">
				登录
			</view>
		</view>
		<view  v-if="p_config.onoff==1" class="shop_vip_box" @click="$service.jump" data-url="/pagesA/openVIp/openVIp?type=1"  :data-login="true">
			<!-- <image class="shop_vip_bg" src="/static/images/shopvurl.png" mode="aspectFill"></image> -->
			<image class="shop_vip_bg" src="/static/images/shopvurl.png" mode="aspectFill"></image>
			<view class="shop_vip_btn">立即开通</view>
		</view>
		<view  v-if="p_config.onoff==1" class="shop_vip_box" @click="$service.jump" data-url="/pagesA/openVIp/openVIp?type=0"  :data-login="true">
			<image class="shop_vip_bg" src="/static/images/uservurl.png" mode="aspectFill"></image>
			<view class="shop_vip_btn">立即开通</view>
		</view>
		<!-- 订单 onoff 1显示 2隐藏-->
		<view class="order_box" v-if="hasLogin&&p_config.onoff==1">
			<view class="order_top dis_flex aic ju_b">
				<view>我的订单</view>
				<view class="go_more dis_flex aic"  @tap="$service.jump" :data-url="'/pages_my/order_list/order_list?type='+0">
					全部订单<text class="iconfont icon-next"></text>
				</view>
			</view>
			<!--  v-if="navdata.length>0" -->
			<view class="order_urls dis_flex aic fww">
					 <!-- v-if="navdata[2].is_show==1" -->
				<view  class="order_url dis_flex_c aic ju_c" @tap="$service.jump" :data-url="'/pages_my/order_list/order_list?type='+0">
					<image v-if="navdata[2].img" :src="$service.getimg(navdata[2].img)" mode="aspectFill"></image>
					<image v-else :src="$service.getimg('/static_wx/images/iti3.png')" mode="aspectFill"></image>
					<text>人工查状态</text>
				</view>
				 <!-- v-if="navdata[3].is_show==1" -->
				<view class="order_url dis_flex_c aic ju_c" @tap="$service.jump" :data-url="'/pages_my/order_list/order_list?type='+1">
					<!-- <image  src="/static/images/iti4.png" mode="aspectFit"></image> -->
					<image v-if="navdata[3].img" :src="$service.getimg(navdata[3].img)" mode="aspectFill"></image>
					<image v-else :src="$service.getimg('/static_wx/images/iti4.png')" mode="aspectFill"></image>
					<text>急速年检</text>
				</view>
					 <!-- v-if="navdata[5].is_show==1" -->
				<view  class="order_url dis_flex_c aic ju_c" @tap="$service.jump" :data-url="'/pages_my/order_list/order_list?type='+2">
					<!-- <image  src="/static/images/iti6.png" mode="aspectFit"></image> -->
					<image v-if="navdata[5].img" :src="$service.getimg(navdata[5].img)" mode="aspectFill"></image>
					<image v-else :src="$service.getimg('/static_wx/images/iti6.png')" mode="aspectFill"></image>
					<text>车型识别</text>
				</view>
					 <!-- v-if="navdata[6].is_show==1" -->
				<view  class="order_url dis_flex_c aic ju_c" @tap="$service.jump" :data-url="'/pages_my/order_list/order_list?type='+3">
					<!-- <image  src="/static/images/iti7.png" mode="aspectFit"></image> -->
					<image v-if="navdata[6].img" :src="$service.getimg(navdata[6].img)" mode="aspectFill"></image>
					<image v-else :src="$service.getimg('/static_wx/images/iti7.png')" mode="aspectFill"></image>
					<text>人工查违章</text>
				</view>
				<view  class="order_url dis_flex_c aic ju_c" @tap="$service.jump" :data-url="'/pages_my/order_list/order_list?type='+4">
					<!-- <image  src="/static/images/iti7.png" mode="aspectFit"></image> -->
					<image v-if="navdata[4].img" :src="$service.getimg(navdata[4].img)" mode="aspectFill"></image>
					<image v-else :src="$service.getimg('/static_wx/images/iti5.png')" mode="aspectFill"></image>
					<text>免费评估</text>
				</view>
			</view>
		</view>
		<!-- 服务 -->
		<view class="fuwu_box">
			<!-- <view class="fw_zzc" v-if="appstatus!=1"></view> -->
			<view class="fuwu_tit">我的服务</view>
			<view class="fuwu_list">
				<view class="fuwu_li dis_flex_c aic ju_c" @tap="$service.jump" data-url="/pages_my/my_fabu/my_fabu"  :data-login="true">
					<!-- <image  src="/static/images/iti3.png" mode="aspectFit"></image> -->
					<image src="/static/images/icon_publish.png" mode="aspectFit"></image>
					<text>我的发布</text>
				</view>
				<view class="fuwu_li dis_flex_c aic ju_c" @tap="$service.jump" data-url="/pages_my/my_luxian/my_luxian"  :data-login="true">
					<!-- <image  src="/static/images/iti3.png" mode="aspectFit"></image> -->
					<image src="/static/images/icon_roadshare.png" mode="aspectFit"></image>
					<text>路线分享</text>
				</view>
				<view class="fuwu_li dis_flex_c aic ju_c" @tap="$service.jump" data-url="/pages_my/my_zan/my_zan"  :data-login="true">
					<!-- <image  src="/static/images/iti3.png" mode="aspectFit"></image> -->
					<image src="/static/images/icon_mylike.png" mode="aspectFit"></image>
					<text>我的点赞</text>
				</view>
				<view class="fuwu_li dis_flex_c aic ju_c" @tap="$service.jump" data-url="/pages_my/my_sc/my_sc"  :data-login="true">
					<!-- <image  src="/static/images/iti3.png" mode="aspectFit"></image> -->
					<image src="/static/images/icon_mycollect.png" mode="aspectFit"></image>
					<text>我的收藏</text>
				</view>
				<view v-if="loginDatas.store&&loginDatas.store.id" class="fuwu_li dis_flex_c aic ju_c" @tap="$service.jump" data-url="/pages_my/store_join1/store_join1"  :data-login="true">
					<image src="/static/images/icon_enter.png" mode="aspectFit"></image>
					<text>商家入驻</text>
				</view>
				<view v-else class="fuwu_li dis_flex_c aic ju_c" @tap="$service.jump" data-url="/pages_my/store_join/store_join"  :data-login="true">
					<!-- <image  src="/static/images/iti3.png" mode="aspectFit"></image> -->
					<image src="/static/images/icon_enter.png" mode="aspectFit"></image>
					<text>商家入驻</text>
				</view>
				
				<view class="fuwu_li dis_flex_c aic ju_c"  @click="kf_open" >
					<!-- <image  src="/static/images/iti3.png" mode="aspectFit"></image> -->
					<image src="/static/images/icon_mykefu.png" mode="aspectFit"></image>
					<text>我的客服</text>
				</view>
				<!-- #ifdef APP -->
				<view class="fuwu_li dis_flex_c aic ju_c" @click="share_fuc" data-url="/pages_my/vip_home/vip_home" >
					<!-- <image  src="/static/images/iti3.png" mode="aspectFit"></image> -->
					<image src="/static/images/icon_share.png" mode="aspectFit"></image>
					<text>分享转发</text>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<view class="fuwu_li dis_flex_c aic ju_c"  >
					
						<button type="default" open-type="share" style="position: absolute;opacity: 0; top: 0;left: 0;right: 0;bottom: 0;" :data-id="1"></button>
					<image src="/static/images/icon_share.png" mode="aspectFit"></image>
					<text>分享转发</text>
				</view>
				<!-- #endif -->
				<!-- <view v-if="hasLogin" class="fuwu_li dis_flex_c aic ju_c" @tap="logout_fuc" data-url="/pagesA/about/about?type=ysxy">
					<image src="/static/images/logout.png" mode="aspectFit"></image>
					<text>退出登录</text>
				</view>
				<view v-if="hasLogin" class="fuwu_li dis_flex_c aic ju_c" @click="id_del">
					<image src="/static/images/logdel.png" mode="aspectFit"></image>
					<text>注销账号</text>
				</view> -->
			</view>
		</view>
		
		<uni-popup ref="popup" type="center" background-color="#fff" border-radius="14">
			<kfewm></kfewm>
		</uni-popup>
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
				page:1
			}
		},
		computed: {
		...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','navdata','loginDatas','p_config']),
		},
		// onReachBottom() {
		// 	that.getdata()
		// },
		onLoad(e) {
			that=this
			that.options=e||{}
			console.log(e)
			
			// that.getdata()
		},
		onShareAppMessage() {
			var userid=uni.getStorageSync('userid')||''
			return {
				path: '/pages/index/index?id=' + userid,
				success: function(res) {
					console.log('成功', res)
				}
			}
		},
		onShow() {
			// that.onRetry()
		},
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			share_fuc(){
				// #ifndef MP-WEIXIN
				
				var code='111'
				uni.shareWithSystem({
					summary: '车圈',
					href: 'https://www.baidu.com?code='+code,
					success(){
						// 分享完成，请注意此时不一定是成功分享
					},
					fail(){
						// 分享失败
					}
				})
				
				// #endif
				
			
			},
			kf_open() { //筛选 弹窗
				this.$refs.popup.open('center')
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
page{
	// background: #fff;
}
.wrap_box{
	width: 100%;
	min-height: 100vh;
	// #ifdef H5
	min-height: calc(100vh - 50px);
	// #endif
	background-image: url(/static/images/bg_mine.png);
	background-repeat: no-repeat;
	background-size: 100% 369rpx;
	background-position: top;
	padding: 140rpx 28rpx 20rpx; 
	background-color: #f8f8f8;
	.my_top{
		width: 100%;
		padding-top: 6rpx;
		margin-bottom: 38rpx;
		.my_head{
			width: 78rpx;
			height: 78rpx;
			margin-right: 25rpx;
			border-radius: 50%;
		}
		.my_name{
			flex: 1;
			font-size: 36rpx;
			font-family: Arial;
			font-weight: 400;
			color: #333333;
			image{
				width: auto;
				min-width: 48rpx;
				height: 48rpx;
				margin-left: 15rpx;
				
			}
		}
		.my_shehzi{
			font-size: 48rpx;
			color: #333;
			margin-left: 20rpx;
		}
	}
	.shop_vip_box{
		width: 694rpx;
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
}


/* order_box */
	.order_box {
		width: 690upx;
		min-height: 296upx;
		background: #FFFFFF;
		border-radius: 10upx;
		margin: 0 auto;
	}

	.order_top {
		width: 100%;
		height: 100upx;
		padding: 0 30upx;
		border-bottom: 1px solid #F8F8F8;
		color: #333;
		font-weight: bold;
		font-size: 32rpx;
	}

	.go_more {
		font-weight: normal;
		font-size: 28upx;
		color: #666;
		display: flex;
		align-items: center;
	}

	.go_more text {
		font-size: 16upx;
		color: #666;
		margin-left: 5upx;
	}

	.order_urls {
		width: 100%;
		min-height: 196upx;
		.order_url {
			width: 25%;
			font-size: 26upx;
			color: #333;
			padding-bottom: 40rpx;
			image {
				width: 80upx;
				height: 80upx;
				margin-bottom: 15upx;
			}
		}
	}

	

	
	.fuwu_box{
		margin: 20upx auto 0;
		width: 690upx;
		min-height: 465upx;
		background: #FFFFFF;
		border-radius: 10upx;
		position: relative;
	}
	.fuwu_tit{
		width: 100%;
		padding: 0 30upx;
		height: 100upx;
		font-size: 32upx;
		color: #333;
		display: flex;
		align-items: center;
		font-weight: bold;
	}
	.fuwu_list{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 20upx;
	}
	.fuwu_li{
		width: 25%;
		height: 180upx;
		font-size: 26upx;
		color: #333;
		position: relative;
	}
	.fuwu_li image{
		width: 80upx;
		height: 80upx;
		margin-bottom: 20upx;
	}
	
	.zzc_box{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 999;
		background: rgba(0,0,0,.5);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.fk_box{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 404upx;
		height: 229upx;
		background: #FFFFFF;
		border-radius: 10upx;
		position: relative;
		padding-bottom: 56upx;
	}
	.fk_box .d1{
		font-size: 28upx;
		color: #333;
		/* margin: 60upx auto; */
	}
	.fk_box .d2{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 56upx;
		font-size: 28upx;
		color: #666;
		border-top: 1px solid #E8E8E8;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.fw_zzc{
		position: absolute;
		z-index: 10000;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #F8F8F8;
	}
	::v-deep .uni-popup__wrapper{
		border-radius: 20rpx;
	}
</style>
