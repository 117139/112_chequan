<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<view class="sbjg_tit">
			<view class="jgtl">精准度</view>
			<view class="jgtr">结果已通过人工校验，请放心使用</view>
		</view>
		<view class="jg_list">
			<view class="jg_li">
				<view class="jg_l">车辆识别号</view>
				<view class="jg_r">LSVWY4180KN246094</view>
			</view>
		</view>
		<view class="jg_list">
			<view class="jg_li">
				<view class="jg_l">品牌车系</view>
				<view class="jg_r">大众朗逸</view>
			</view>
			<view class="jg_li">
				<view class="jg_l">厂家指导价</view>
				<view class="jg_r">11.89万</view>
			</view>
			<view class="jg_li">
				<view class="jg_l">上市时间</view>
				<view class="jg_r">2017-02</view>
			</view>
		</view>
		<view class="jg_list">
			<view class="jg_li">
				<view class="jg_l">发动机</view>
				<view class="jg_r">1.6L 110马力 L4</view>
			</view>
			<view class="jg_li">
				<view class="jg_l">排量</view>
				<view class="jg_r">1.6</view>
			</view>
			<view class="jg_li">
				<view class="jg_l">进气形式</view>
				<view class="jg_r">-</view>
			</view>
			<view class="jg_li">
				<view class="jg_l">排放标准</view>
				<view class="jg_r">国5</view>
			</view>
			<view class="jg_li">
				<view class="jg_l">燃油类型</view>
				<view class="jg_r">汽油</view>
			</view>
			<view class="jg_li">
				<view class="jg_l">燃油标号</view>
				<view class="jg_r">92号</view>
			</view>
			<view class="jg_li">
				<view class="jg_l">变速箱</view>
				<view class="jg_r">6档 手自一体</view>
			</view>
			<view class="jg_li">
				<view class="jg_l">变速箱类型</view>
				<view class="jg_r">手自一体变速箱(AT)</view>
			</view>
			<view class="jg_li">
				<view class="jg_l">档位数</view>
				<view class="jg_r">6</view>
			</view>
		</view>
		<view class="jg_list">
			<view class="jg_li">
				<view class="jg_l">车身结构</view>
				<view class="jg_r">4门5座三厢车</view>
			</view>
			<view class="jg_li">
				<view class="jg_l">级别</view>
				<view class="jg_r">紧凑型车</view>
			</view>
			<view class="jg_li">
				<view class="jg_l">驱动方式</view>
				<view class="jg_r">前置前驱</view>
			</view>
			<view class="jg_li">
				<view class="jg_l">前轮胎规格</view>
				<view class="jg_r">205/55 R16</view>
			</view>
			<view class="jg_li">
				<view class="jg_l">后轮胎规格</view>
				<view class="jg_r">205/55 R16</view>
			</view>
		</view>
		<view class="xq_btn" @click="go_fuc">重新查询</view>
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
			go_fuc(){
				
				// if(!this.cc_index){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'请选择车辆型号'
				// 	})
				// 	return
				// }
				// if(!this.car_jc){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'请选择首次上牌时间'
				// 	})
				// 	return
				// }
				
				
				// if(!this.pow_num){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'请输入行驶里程'
				// 	})
				// 	return
				// }
				uni.redirectTo({
					url:'/pagesA/rgc_sb/rgc_sb'
				})
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
	// background: #fff;
	width: 100%;
	padding: 28rpx;
	background: #f8f8f8;
}
.sbjg_tit{
	width: 100%;
	margin-bottom: 28rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.jgtl{
		font-size: 28rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #666666;
	}
	.jgtr{
		font-size: 28rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #42BD56;
	}
}
.jg_list{
	width: 100%;
	background: #FFFFFF;
	border-radius: 10rpx;
	margin-bottom: 22rpx;
	.jg_li{
		width: 100%;
		padding: 20rpx 28rpx;
		// height: 94rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		line-height: 54rpx;
		&+.jg_li{
			border-top: 1px solid #eee;
		}
		.jg_l{
			font-size: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #666666;
		}
		.jg_l{
			font-size: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333;
		}
	}
}
.xq_btn{
	width: 100%;
	height: 90rpx;
	background: #4680E6;
	border-radius: 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 30rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #FFFFFF;
	margin: 40rpx auto 0;
}
</style>
