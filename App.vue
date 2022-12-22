<script>
	import Vue from 'vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	export default {
		onLaunch: function() {
			console.log('App Launch')
			that=this
			that.getconfig()
			that.getcar_datas()
			if(that.$service.appVN==0){
				that.$service.wxlogin('token')
			}
			// #ifdef H5
			// uni.setStorageSync('token','o6O8n5I0LAOGSnDLBWTo-H4PzKOM')
			// uni.setStorageSync('token','o6O8n5ILchBly_V5kHHyTA8CGUbE')
			// #endif
			var token =uni.getStorageSync('token')
			if(token){
				that.$service.wxlogin('token')
			}
			uni.$on('login_fuc', (data) => {
					console.log('标题：' + data.title)
					console.log('内容：' + data.content)
					// that.getbasedata()
					that.$service.wxlogin('token')
			})
			uni.getSystemInfo({
				success: function(e) {
					that.$store.commit('setplatform', e.platform)
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif       
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			getcar_datas() {
			
				var datas = {}
				var jkurl = '/publics/car_info'
			
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
						that.$store.commit('setcardatas',datas)
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
			
			getconfig(){
				var datas={}
				var jkurl='/publics/info'
				
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
						that.$store.commit('setconfig',res.data)
						// that.getdata_tz()
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
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	@import "./common/fonts/iconfont.css";
	uni-page-body,
	html,
	body {
		margin: 0;
		font-family: PingFang SC, DINCond-Bold, '微软雅黑';
		background-color: #F8F8F8;
		box-sizing: border-box;
	}
	
	*,
	view,
	text,
	image,
	input {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		letter-spacing: 1rpx;
	}
	
	button {
		margin: 0;
		padding: 0;
	}
	
	button::after {
		border: none;
		margin: 0;
		padding: 0;
	}
	
	.flex {
		display: flex;
		display: -webkit-box;
		display: -moz-box;
		display: -webkit-flex;
		display: -moz-flex;
		display: -ms-flexbox;
	}
	
	// .area {
	// 	width: 694rpx;
	// 	margin: 0 auto;
	// }
	
	.bottom-of-page {
		position: relative;
		padding-bottom: 120rpx;
		padding-bottom: calc(120rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
	}
	
	.bottom-button {//底部按钮
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	.bottom-button1::after{
		content: '';
		display: block;
		clear: both;
		width: 100%;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	.prefix {//标题栏左边小竖条
		width: 8rpx;
		height: 30rpx;
		background: #FB595A;
		border-radius: 4rpx;
		margin-right: 14rpx;
	}
	
	.uni-input {
		color: #333333;
		font-size: 26rpx;
	}
	
	.bg_divorced {
		//背景色渐变
		width: 100%;
		height: 214rpx;
		position: absolute;
		top: 0;
		left: 0;
		background-image: linear-gradient(#FB595A 0%, #ffffff 90%, #f8f8f8 100%);
	}
	
	// 默认指示点样式
	wx-swiper .wx-swiper-dot {
		width: 32rpx;
		height: 6rpx;
		background: #FFFFFF;
		border-radius: 4rpx;
		// margin-top: 900rpx!important;
	}
	
	// 当前选中样式
	wx-swiper .wx-swiper-dot-active {
		width: 32rpx;
		height: 6rpx;
		background: #FF7272;
		border-radius: 4rpx;
	}
	
	
	
	.dis_flex {
		/*  #ifndef APP-PLUS-NVUE  */
		display: flex;
		/*  #endif  */
		flex-direction: row;
	}
		
	.dis_flex_c {
		/*  #ifndef APP-PLUS-NVUE  */
		display: flex;
		/*  #endif  */
		flex-direction: column;
	}
		
	.fww {
		flex-wrap: wrap;
	}
		
	.aic {
		align-items: center;
	}
		
	.ais {
		align-items: stretch !important;
	}
		
	.aift {
		align-items: flex-start!important;
	}
		
	.aife {
		align-items: flex-end;
	}
		
	.ju_a {
		justify-content: space-around;
	}
		
	.ju_b {
		justify-content: space-between;
	}
		
	.ju_c {
		justify-content: center;
	}
		
	.flex_1 {
		flex: 1;
	}
		
	.flex_0 {
		flex: none;
	}
		
	.oh1 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box !important;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		// text-align: center;
	}
		
	.oh2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		
	}
		
	view {
		word-break: break-all;
		
		word-wrap: break-word;
	}
		
	.oh3 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}
		
	.oh4 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
	}
		
	.zanwu {
		width: 100%;
		line-height: 140rpx;
		text-align: center;
		/* font-size: 28rpx; */
		font-size: 24rpx;
		color: #333;
	}
		
	.data_last {
		line-height: 300rpx;
		text-align: center;
		width: 100%;
		font-size: 24rpx;
		color: #666;
	}
		
	.data_null {
		width: 480upx;
		height: 480upx;
		margin-top: 260upx;
	}
		
		
	.xmfwb_box {
		line-height: normal !important;
	}
		
	.xmfwb_box image,
	.xmfwb_box img,
	.xmfwb_box table,
	rich-text p,
	rich-text img,
	rich-text table {
		max-width: 100% !important;
	}
		
	.xcx_fwb_img {
		max-width: 100% !important;
	}
		
		
		
	.scroll_x {
		width: 100%;
		white-space: nowrap;
	}
		
	.pof_b {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 900;
	}
	.wrap_box{
		width: 100%;
		min-height: 100vh;
		// #ifdef H5
		min-height: calc(100vh - 44px);
		// #endif
		background: #fff;
	}
	.wrap_box1{
		width: 100%;
		min-height: 100vh;
		// #ifdef H5
		min-height: calc(100vh - 94px);
		// #endif
		background: #fff;
	}
	
	.my_status_bar {
			height: var(--status-bar-height);
			width: 100%;
	}
</style>
