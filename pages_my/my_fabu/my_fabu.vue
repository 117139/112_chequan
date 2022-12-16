<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<u-sticky>
		<scroll-view class="tab_list scroll_x" scroll-x="true">
			<view>
				<view class="tab_li" :class="{active:active==index}" @click="setcur(index)" v-for="(item,index) in tabs">
					{{item.title}}
				</view>
			</view>
		</scroll-view>
		</u-sticky>
		<view class="zan_list">
			<view class="zan_li" v-for="(item,index) in datas" @click="jump_fuc(item)">
				<image class="zan_img" :src="$service.getimg(item.banner)" mode="aspectFill"></image>
				<view class="zan_msg">
					 <view class="zan_tit">{{item.title}}</view>
					 <view class="car_li_sc car_li_sc1 dis_flex aic" >
						<view v-if="active==0" class="li_num flex_1">{{item.price}}元</view>
						<view v-if="active==1" class="li_num flex_1">{{$service.getnum(item.price)||''}}</view>
						<view v-if="active==2" class="li_num flex_1">{{item.price}}万</view>
						<!-- 
						<view v-if="active==3" class="li_num flex_1">7.8元</view> -->
						<view class="li_cz" @click.stop="$service.jump" :data-url="'/pages_my/store_fb/store_fb?type1=1&type='+active+'&id='+item.id">编辑</view>
						<view class="li_cz" @click.stop="del_fuc(item)">删除</view>
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
				
				tabs:[
					{
						title:' 汽车美容',
						id:1
					},
					{
						title:'摩托车',
						id:2
					},
					{
						title:'二手车',
						id:3
					},
					// {
					// 	title:'加油站',
					// 	id:4
					// },
				],
				active:0,
				datas:[],
				page:1,
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
			setcur(index){
				that.active=index
				that.onRetry()
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
				// /index/store
				var datas={
					// store_id:'',
					// lat:that.addmsg.latitude||'',
					// lng:that.addmsg.longitude||'',
					// is_hot:'',//是否热门推荐 1、是 2、否
					// search:'',
					page:that.page,
					limit:20,
					is_my:1
				}
				var jkurl='/index/carbeauty'
				if(that.active==0){
					jkurl='/index/carbeauty'
				}
				if(that.active==1){
					jkurl='/index/motorcycle'
				}
				if(that.active==2){
					jkurl='/index/usedcar'
				}
				if(that.active==3){
					jkurl='/index/routes'
				}
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
			jump_fuc(item){
				if(that.active==0){
					uni.navigateTo({
						url:'/pages/details_qcmr/details_qcmr?id='+item.id
					})
				}
				if(that.active==1){
					uni.navigateTo({
						url:'/pages/details_motor/details_motor?id='+item.id
					})
				}
				if(that.active==2){
					uni.navigateTo({
						url:'/pages/details_car/details_car?id='+item.id
					})
				}
				if(that.active==3){
					uni.navigateTo({
						url:'/pages/details_jyz/details_jyz?id='+item.id
					})
				}
			},
			del_fuc(item){
				uni.showModal({
				    title: '提示',
				    content: '是否删除该信息',
				    success: function (res) {
				        if (res.confirm) {
										uni.showToast({
											title:'删除成功',
											icon:'none'
										})
				           
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			
			// onRetry(){
			// 	that.page=1
			// 	that.datas=[]
			// 	that.getdata()
			// },
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
.tab_list{
	width: 100%;
	height: 100rpx;
	padding: 0 28rpx;
	background: #fff;
	border-bottom: 1px solid #eee;
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
			margin-left: 88rpx;
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
				.li_num{
					font-size: 28rpx;
					font-family: Arial;
					font-weight: 400;
					color: #E2382F;
				}
				.li_cz{
					margin-left: 20rpx;
					font-size: 24rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #999999;
				}
			}
		}
	}
}
/deep/ .uni-load-more{
	height: 140px;
}
</style>
