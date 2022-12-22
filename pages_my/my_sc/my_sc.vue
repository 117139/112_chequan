<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<!-- <u-sticky>
		<scroll-view class="tab_list scroll_x" scroll-x="true">
			<view>
				<view class="tab_li" :class="{active:active==index}" @click="setcur(index)" v-for="(item,index) in tabs">
					{{item.title}}
				</view>
			</view>
		</scroll-view>
		</u-sticky> -->
		<view class="tab_list">
			<view class="tab_li" :class="{active:active==index}" @click="setcur(index)" v-for="(item,index) in tabs">
				{{item.title}}
			</view>
		</view>
		<view class="zan_list">
			<view class="zan_li" v-for="(item,index) in datas" @click="jump_fuc(item)">
				<image class="zan_img" :src="$service.getimg(item.banner)" mode="aspectFill"></image>
				<view class="zan_msg">
					 <view class="zan_tit">{{item.title}}</view>
					 <view @click.stop="del_fuc(item)" class="car_li_sc car_li_sc1 dis_flex aic" >
					 	<text class="icon icon-shoucang1"></text>
					 	已收藏
					 </view>
				</view>
			</view>
			<uni-load-more v-if="listc_status" :status="listc_status" :contentText="contentText"></uni-load-more>
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
				tabs:[
					{
						title:' 汽车美容',
					},
					{
						title:'摩托车',
					},
					{
						title:'二手车',
					},
					// {
					// 	title:'加油站',
					// },
				],
				active:0,
				listc_status:'loading',
				contentText:{contentdown: "上拉显示更多",contentrefresh: "正在加载...",contentnomore: "暂无数据"},
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
			console.log(e)
			
			// that.getdata()
		},
		onShow() {
			that.onRetry()
		},
		
		onReachBottom() {
			that.getlist()
		},
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			jump_fuc(item){
				if(that.active==0){
					uni.navigateTo({
						url:'/pages/details_qcmr/details_qcmr?id='+item.pid
					})
				}
				if(that.active==1){
					uni.navigateTo({
						url:'/pages/details_motor/details_motor?id='+item.pid
					})
				}
				if(that.active==2){
					uni.navigateTo({
						url:'/pages/details_car/details_car?id='+item.pid
					})
				}
				if(that.active==3){
					uni.navigateTo({
						url:'/pages/details_jyz/details_jyz'
					})
				}
			},
			setcur(index){
				that.active=index
				that.onRetry()
			},
			del_fuc(item){
				uni.showModal({
				    title: '提示',
				    content: '是否取消收藏该信息',
				    success: function (res) {
				        if (res.confirm) {
									var type=that.active+1
										var datas={
											id: item.pid,
											type:type
										}
													
										var jkurl='/operate/collection'
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
												that.onRetry()
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
				           
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			onRetry(){
					that.page=1
					that.datas=[]
					that.getlist()
			},
			/**
			 * 列表
			 */
			getlist(){
				var type=that.active+1
				var datas={
					type:type,
					page:that.page,
					limit:20,
					is_my:1
				}
				var jkurl='/index/collection'
				
				that.listc_status='loading'
				
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
							that.datas=[]
							that.datas=datas.data
						}else{
							that.datas=that.datas.concat(datas.data)
						}
						
						if(datas.total==0){
							that.listc_status='noMore'
							
						}else{
							that.listc_status=''
						}
						if(datas.data>length>0){
							that.page++
						}
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
.tab_list{
	width: 100%;
	height: 100rpx;
	padding: 0 28rpx;
	background: #fff;
	border-bottom: 1px solid #eee;
	position: fixed;
	top: 0;
	// #ifdef H5
	top: 44px;
	// #endif
	z-index: 900;
	display: flex;
	align-items: center;
	justify-content: space-around;
	.tab_li{
		display: inline-flex;
		height: 100rpx;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #666666;
		&+.tab_li{
			// margin-left: 88rpx;
		}
		&.active{
			color: #4680E6;
			position: relative;
			&::after{
				content: '';
				position: absolute;
				bottom: 14rpx;
				left: 50%;
				width: 68rpx;
				height: 6rpx;
				background: #4680E6;
				border-radius: 3rpx;
				margin-left: -34rpx;
			}
		}
	}
}
.wrap_box{
	width: 100%;
	min-height: 100vh;
	// #ifdef H5
	min-height: calc(100vh -  44px);
	// #endif
	background: #fff;
	padding-top: 100rpx;
}
.zan_list{
	width: 100%;
	.zan_li{
		width: 100%;
		padding: 22rpx 28rpx;
		display: flex;
		.zan_img{
			width: 240rpx;
			height: 160rpx;
			margin-right: 29rpx;
		}
		.zan_msg{
			flex: 1;
			.zan_tit{
				font-size: 32rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #333333;
				line-height: 42rpx;
				height: 84rpx;
			}
			.car_li_sc{
				margin-top: 40rpx;
				font-size: 28rpx;
				font-family: Arial;
				font-weight: 400;
				color: #999999;
				text{
					margin-right: 15rpx;
					color: #FDC113;
				}
			}
		}
	}
}
</style>
