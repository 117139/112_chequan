<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<view class="xq_box">
			<view class="xq_li">
				<view class="xq_l">车辆类型</view>
				<view class="xq_r">小型轿车</view>
			</view>
			<view class="xq_li">
				<view class="xq_l">车牌号码</view>
				<view class="xq_r">京A12345</view>
			</view>
			<view class="xq_li">
				<view class="xq_l">处罚书编号</view>
				<view class="xq_r">2202000004858</view>
			</view>
			<view class="xq_li">
				<view class="xq_l">违法时间</view>
				<view class="xq_r">2022-01-21 20:46:00</view>
			</view>
			<view class="xq_li">
				<view class="xq_l">违法地址</view>
				<view class="xq_r">北京市东城区某某路</view>
			</view>
			<view class="xq_li">
				<view class="xq_l">执法大队</view>
				<view class="xq_r">北京市公安局交通警察支队东城大队</view>
			</view>
			<view class="xq_li">
				<view class="xq_l">违法行为</view>
				<view class="xq_r">机动车违反规定停放、临时停车，妨碍其他车辆、行人通行的</view>
			</view>
			<view class="xq_li">
				<view class="xq_l">罚款金额</view>
				<view class="xq_r" style="color: #E2382F;">200元</view>
			</view>
			<view class="xq_li">
				<view class="xq_l">违法扣分</view>
				<view class="xq_r" style="color: #E2382F;">0分</view>
			</view>
			<view class="xq_li">
				<view class="xq_l">违章图片</view>
				<view class="xq_r">
					<view class="xq_imgs">
						<view class="xq_img" v-for="(item,index) in 4">
							<image src="/static/images/car1.png" mode="aspectFill"></image>
						</view>
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
	width: 100%;
	padding: 28rpx;
	background: #f8f8f8;
}
.xq_box{
	width: 100%;
	background: #FFFFFF;
	border-radius: 10rpx;
	.xq_li{
		width: 100%;
		padding: 25rpx 28rpx;
		display: flex;
		&+.xq_li{
			border-top: 1px solid #EEEEEE;
		}
		.xq_l{
			font-size: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
			width: 212rpx;
		}
		.xq_r{
			flex: 1;
			font-size: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
			.xq_imgs{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				.xq_img{
					width: 33.33%;
					height: 144rpx;
					padding: 5rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
}
</style>
