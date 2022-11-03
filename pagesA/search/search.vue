<template>
	<view class="wrap_box">
		<topbar>
			<view class="search_box dis_flex aic">
				<text class="iconfont icon-back" @click="$service.back"></text>
				<view class="search_b">
					<text class="iconfont icon-sousuo"></text>
					<input type="text" placeholder="请输入" v-model="keyword">
					<text class="iconfont icon-shanchu" @click="keyword=''"></text>
				</view>
				<view class="reset_btn" @click="$service.back">取消</view>
			</view>
		</topbar>
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
			<view class="zan_li" v-for="(item,index) in 10">
				<image class="zan_img" src="/static/images/car1.png" mode="aspectFill"></image>
				<view class="zan_msg">
					 <view class="zan_tit">入驻泉州最著名的西街旁 | 安 静清幽的小阁楼</view>
					 <view class="car_li_sc car_li_sc1 dis_flex aic" >
						<view class="li_num flex_1">12万</view>
						<!-- <view class="li_cz">编辑</view>
						<view class="li_cz" @click="del_fuc">删除</view> -->
					 </view>
				</view>
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
					{
						title:'加油站',
					},
				],
				active:0,
				keyword:''
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
			// that.onRetry()
		},
		
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
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
			setcur(index){
				that.active=index
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
.search_box{
	width: 100%;
	padding: 0 14rpx;
	.icon-back{
		font-size: 30rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #323233;
		margin-right: 20rpx;
	}
	.reset_btn{
		margin-left: 30rpx;
		font-size: 30rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #323233;
	}
	.search_b{
		flex: 1;
		height: 72rpx;
		background: #F8F8F8;
		border-radius: 36rpx;
		padding: 0 22rpx;
		display: flex;
		align-items: center;
		.icon-sousuo{
			font-size: 36rpx;
			color: #DDDDDD;
		}
		.icon-shanchu{
			font-size: 38rpx;
			color: #BABBBD;
		}
		input{
			flex:1;
			padding: 0 10rpx;
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #6A6A77;
		}
	}
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
</style>
