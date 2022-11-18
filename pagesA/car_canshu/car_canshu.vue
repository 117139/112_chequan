<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<scroll-view scroll-x="true" class="scroll_x topZ_box">
			<view class="topZ_li" :class="{active:active==index}" @click="active=index" v-for="(item,index) in tabs">{{item.title}}</view>
		</scroll-view>
		<scroll-view scroll-y="true" class="scroll_y" :scroll-into-view="'a'+active">
			<view class="msg_box" id="a0">
				<view class="msg_box_li">
					<view class="msg_box_li1">长*宽*高[mm]</view>
					<view class="msg_box_li2">4933*1836*1469</view>
				</view>
				<view class="msg_box_li">
					<view class="msg_box_li1">成员人数[个]</view>
					<view class="msg_box_li2">5</view>
				</view>
				<view class="msg_box_li">
					<view class="msg_box_li1">发动机</view>
					<view class="msg_box_li2">2.0L/186马力/直列</view>
				</view>
				<view class="msg_box_li">
					<view class="msg_box_li1">最大扭矩[N.m]</view>
					<view class="msg_box_li2">320</view>
				</view>
				<view class="msg_box_li">
					<view class="msg_box_li1">燃料类型</view>
					<view class="msg_box_li2">汽油</view>
				</view>
				<view class="msg_box_li">
					<view class="msg_box_li1">混合工况油耗[L/100km]</view>
					<view class="msg_box_li2">6.3</view>
				</view>
				<view class="msg_box_li">
					<view class="msg_box_li1">变速箱类型</view>
					<view class="msg_box_li2">双离合</view>
				</view>
				<view class="msg_box_li">
					<view class="msg_box_li1">环保标准</view>
					<view class="msg_box_li2">国五</view>
				</view>
			</view>
			<view class="msg_box1" :id="item.id" v-for="(item,index) in datas_list">
				<view class="msg_box1_tit">{{item.title}}</view>
				<view class="msg_box1_li" v-for="(item1,index1) in item.list">
					<view>{{item1.title}}</view>
					<view>{{item1.value}}</view>
				</view>
			</view>
		</scroll-view>
		<view class="bb_box">
			<view class="bb_box_btn">联系商家</view>
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
						title:'车辆参数',
						id:1
					},
					{
						title:'车身尺寸',
						id:2
					},
					{
						title:'动力系统',
						id:2
					},
					{
						title:'底盘制动',
						id:2
					},
					{
						title:'驾驶辅助',
						id:2
					},
				],
				active:0,
				datas_list:[
					{
						title:'车身尺寸',
						id:'a1',
						list:[
							{
								title:'长*宽*高[mm]',
								value:'4933*1836*1469'
							},
							{
								title:'燃料类型',
								value:'汽油'
							},
							{
								title:'轴距[mm]',
								value:'2871'
							},
							{
								title:'整备质量[kg]',
								value:'1575'
							},
							{
								title:'成员人数[个]',
								value:'5'
							},
							{
								title:'行李箱容积[L]',
								value:'521'
							},
							{
								title:'前轮胎规格',
								value:'235/45 R18'
							},
							{
								title:'后轮胎规格',
								value:'235/45 R18'
							},
							{
								title:'备胎类型',
								value:'非全尺寸'
							},
							{
								title:'整车质保',
								value:'3年或10万公里'
							},
						]
					},
					{
						title:'动力系统',
						id:'a2',
						list:[
							{
								title:'排气量[mL]',
								value:'1984'
							},
							{
								title:'排气量[L]',
								value:'2.0'
							},
							{
								title:'最大马力[Ps]',
								value:'186'
							},
							{
								title:'最大功率[kW]',
								value:'137'
							},
							{
								title:'最大功率转速[rpm]',
								value:'4100-6000'
							},
							{
								title:'最大扭矩[N.m]',
								value:'320'
							},
							{
								title:'最大扭矩转速[rpm]',
								value:'1500-4000'
							},
							{
								title:'气缸排列型式',
								value:'直列'
							},
							{
								title:'气缸数',
								value:'4'
							},
							{
								title:'进气型式',
								value:'涡轮增压'
							},
							{
								title:'供油方式',
								value:'混合喷射'
							},
							{
								title:'燃油标号',
								value:'95号'
							},
							{
								title:'变速箱类型',
								value:'双离合'
							},
							{
								title:'档位个数',
								value:'7'
							},
						]
						
					},
					{
						title:'底盘制动',
						id:'a3',
						list:[
							{
								title:'排气量[mL]',
								value:'1984'
							},
							{
								title:'排气量[L]',
								value:'2.0'
							},
							{
								title:'最大马力[Ps]',
								value:'186'
							},
							{
								title:'最大功率[kW]',
								value:'137'
							},
							{
								title:'最大功率转速[rpm]',
								value:'4100-6000'
							},
							{
								title:'最大扭矩[N.m]',
								value:'320'
							},
						]
					},
					{
						title:'驾驶辅助',
						id:'a4',
						list:[
							{
								title:'排气量[mL]',
								value:'1984'
							},
							{
								title:'排气量[L]',
								value:'2.0'
							},
							{
								title:'最大马力[Ps]',
								value:'186'
							},
							{
								title:'最大功率[kW]',
								value:'137'
							},
							{
								title:'最大功率转速[rpm]',
								value:'4100-6000'
							},
							{
								title:'最大扭矩[N.m]',
								value:'320'
							},
						]
					}
				]
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
	// background: #fff;
	background: #f8f8f8;
}
.topZ_box{
	width: 100%;
	height: 111rpx;
	border-bottom: 1px solid #eee;
	background: #fff;
	.topZ_li{
		font-size: 30rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #333333;
		height: 110rpx;
		display: inline-flex;
		align-items: center;
		position: relative;
		padding: 0 20rpx;
		&.active{
			color: #4680E6;
			position: relative;
			&::after{
				content: '';
				position: absolute;
				bottom: 26rpx;
				left: 50%;
				margin-left: -21rpx;
				width: 42rpx;
				height: 5rpx;
				background: #4680E6;
				border-radius: 3rpx;
			}
		}
	}
}
.scroll_y{
	width: 100%;
	height: calc(100vh - 111rpx - 140rpx);
	// #ifdef H5
	
	height: calc(100vh - 111rpx - 140rpx - 44px);
	// #endif
}
.bb_box{
	margin-top: 20rpx;
	width: 100%;
	height: 120rpx;
	background: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	.bb_box_btn{
		width: 694rpx;
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
.msg_box{
	width: 100%;
	background: #fff;
	padding: 20rpx 28rpx;	
	display: flex;
	flex-wrap: wrap;
	.msg_box_li{
		width: 50%;
		padding: 20rpx 0;
	
		.msg_box_li1{
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #999999;
			line-height: 32rpx;
			margin-bottom: 10rpx;
		}
		.msg_box_li2{
			font-size: 28rpx;
			font-family: Arial;
			font-weight: 400;
			color: #333333;
			line-height: 32rpx;
		}
	}
}
.msg_box1{
	margin-top: 20rpx;
	width: 100%;
	background: #fff;
	padding: 20rpx 28rpx;	
	.msg_box1_tit{
		font-size: 36rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #333333;
		line-height: 46rpx;
		margin-bottom: 20rpx;
	}
	.msg_box1_li{
		width: 100%;
		padding: 20rpx 0;
		line-height: 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
		font-family: Arial;
		font-weight: 400;
		color: #333333;
	}
}
</style>
