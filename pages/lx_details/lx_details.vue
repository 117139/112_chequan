<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<view class="swiper_box">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration"
			 indicator-active-color='#8e8e8e' :circular="circular" @change="swiper_change">
				<!-- <block v-for="(item,idx) in goodsData.img"> -->
				<block v-for="(item,idx) in goodsData.imageList ">
					<swiper-item>
						<image :src="$service.getimg(item.url)" class="slide-image" mode="aspectFill" :data-src="$service.getimg(item.url)"  />
						<!-- <image :src="getimg(item)" class="slide-image" mode="aspectFill" width="355" height="150" :data-src="getimg(item)"
						 :data-array="filter.getgimgarrIP(goodsData.img)" @tap.stop="pveimg" /> -->
					</swiper-item>
				</block>
		
			</swiper>
			<!-- <view class="br_box">{{cur_swiper}}/{{goodsData.img.length}}</view> -->
			<view v-if="goodsData.imageList.length>0" class="br_box">{{cur_swiper}}/{{goodsData.imageList.length}}</view>
		</view>
		<view class="xq_tmsg dis_flex aic">
			<image class="xq_ttx" src="/static/images/lx1.jpg" mode="aspectFill"></image>
			<view class="flex_1">
				<view class="xq_tname">Nicy</view>
				<view class="xq_ttime">2022.06.08发布</view>
			</view>
			<view v-if="sc_type" class="car_li_sc car_li_sc1 dis_flex aic" >
				<text class="icon icon-xihuan1"></text>
				256
			</view>
			<view v-else class="car_li_sc dis_flex aic" >
				<text class="icon icon-xihuan"></text>
				256
			</view>
			<text class="iconfont icon-zhuanfa3" @click="share_fuc"></text>
		</view>
		<view class="xq_tmsg">
			<view class="xq_add">
				<image class="xq_add_i" src="/static/images/icon_address.png" mode="aspectFit"></image>南京溧水石臼湖
			</view>
			<view class="xq_tit">
				骑着摩托去看石臼湖，那片天空之境 长啥样
			</view>
			<view class="xq_tags dis_flex aic">
				<view class="xq_tag">
					<image src="/static/images/icon_Wechat.png" mode="aspectFit"></image> 微信
				</view>
				<view class="xq_tag" @click="$service.jump" :data-url="'/pagesA/jubao/jubao'">
					<text class="iconfont icon-xinfangjubao"></text> 举报
				</view>
			</view>
			<view class="xq_text">
				20年刷爆网络的南京“天空之镜”石臼湖，到了最佳观赏期，每年11到1月中旬的秋冬色是一-年中最美的时期 
				<br>推荐这几个观赏地 
				<br>
				<br>◆>明觉地铁站旁四岔路口 
				<br>
				<br>石臼湖大桥的入口就在明觉站附近，因为桥上不能停车看风景，所以可以入口处的大堤.上远眺，全长12.6km的石臼湖大桥，水天一色之间，地铁S9飞驰而过，像极了千与千寻里的场景，空中俯拍的效果会更佳 
				<br>
				<br>◆>和凤镇张许村 
				<br>
				<br>一般两个时间段来这里，一是一大早，二是日落前，两个时间段各有各的美 
				<br>春天的时候这里会有大片细长的野草，随风摆.动的样子很像龙猫里的场景 
				<br>旁边是有一条长长的栈桥，站桥头还有一个嘹望塔，这里是在石臼湖看日落的最佳地，日落时刻的石臼湖唯美如画，充满诗意 
				<br>其实旁边的嘹望塔也是不错的观赏地，不过长期无人管理，已经封起来不让
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
				indicatorDots: false,
				autoplay: false,
				circular: true,
				interval: 3000,
				duration: 1000,
				goodsData:{
					imageList:[
						{
							url:'/static/images/lx1.jpg'
						},
						{
							url:'/static/images/lx2.jpg'
						},
						{
							url:'/static/images/lx1.jpg'
						},
						{
							url:'/static/images/lx2.jpg'
						},
					]
				},
				cur_swiper:1,
				sc_type:false
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
			
			share_fuc(){
				var code='111'
				uni.shareWithSystem({
				  summary: 'chequan',
				  href: 'https://www.baidu.com?code='+code,
				  success(){
				    // 分享完成，请注意此时不一定是成功分享
				  },
				  fail(){
				    // 分享失败
				  }
				})
			},
			swiper_change(e) {
				// console.log(e.detail )
				var num = e.detail.current + 1
				this.cur_swiper = num
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
	min-height: calc(100vh -  44px);
	// #endif
	background: #f8f8f8;
}
.swiper_box {
	width: 750rpx;
	height: 500rpx;
	position: relative;
	.swiper {
		width: 100%;
		height: 500rpx;
		position: relative;
		z-index: 99;
		image {
			width: 100%;
			max-width: 750rpx;
			height: 500rpx;
		}
	}
	.br_box {
		z-index: 100;
		position: absolute;
		bottom: 40rpx;
		right: 40rpx;
		width: 66rpx;
		height: 36rpx;
		background: rgba(0, 0, 0, .5);
		border-radius: 18rpx;
		font-size: 26rpx;
		color: #eee;
		text-align: center;
		line-height: 36rpx;
	}
}
.xq_tmsg{
	width: 100%;
	background: #fff;
	padding: 37rpx 28rpx;
	margin-bottom: 22rpx;
	.xq_ttx{
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}
	.xq_tname{
		font-size: 38rpx;
		font-family: Arial;
		font-weight: 400;
		color: #000000;
		margin-bottom: 10rpx;
	}
	.xq_ttime{
		font-size: 24rpx;
		font-family: Arial;
		font-weight: 400;
		color: #999999;
	}
	.car_li_sc{
		font-size: 28rpx;
		font-family: Arial;
		font-weight: 400;
		color: #333333;
		margin-right: 20rpx;
		text{
			margin-right: 15rpx;
		}
		&.car_li_sc1{
			color: #E2382F;
		}
	}
	.icon-zhuanfa3{
		font-size: 34rpx;
		color: #333333;
	}
	
	
	
	.xq_add{
		font-size: 28rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #333333;
		line-height: 42rpx;
		display: flex;
		align-items: center;
		.xq_add_i{
			width: 26rpx;
			height: 30rpx;
			margin-right: 10rpx;
		}
	}
	.xq_tit{
		font-size: 38rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #333333;
		line-height: 52rpx;
	}
	.xq_tags{
		margin-top: 10rpx;
		border-bottom: 1px solid #eee;
		padding-bottom: 28rpx;
		.xq_tag{
			width: 160rpx;
			height: 64rpx;
			background: #F8F8F8;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #666666;
			margin-right: 20rpx;
			image{
				width: 34rpx;
				height: 34rpx;
				margin-right: 10rpx;
			}
			text{
				
				margin-right: 10rpx;
			}
		}
	}
	.xq_text{
		padding: 20rpx 0;
		font-size: 30rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #333333;
		line-height: 52rpx;
	}
}

	

	

	
</style>
