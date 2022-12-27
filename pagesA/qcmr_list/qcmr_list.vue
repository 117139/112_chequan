<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<topbar >
			<view class="bus_head dis_flex aic ju_b">
				<text class="iconfont icon-back" @click="$service.back"></text>
				<text class="bus_title">洗车店</text>
				<picker @change="confirm" :value="index" :range="columns" range-key="title">
					<!-- <view class="bus_jl"  @click="showpick">{{columns[index].title}} <image src="/static/images/icon_dropdown.png" mode="aspectFit"></image></view> -->
					<view v-if="index==-1" class="bus_jl"  >请选择 <image src="/static/images/icon_dropdown.png" mode="aspectFit"></image></view>
					<view v-else class="bus_jl"  >{{columns[index].title}} <image src="/static/images/icon_dropdown.png" mode="aspectFit"></image></view>
				</picker>
			</view>
		</topbar>
		<u-picker :show="show_sx" :columns="columns" @confirm="confirm_sx" @cancel="cancel_sx" />
		<view class="main_box">
			<image v-if="navdata[1].banner" class="main_bg" :src="$service.getimg(navdata[1].banner)" mode="aspectFill"></image>
			<image v-else class="main_bg" src="/static/images/bg_carwash.png" mode="widthFix"></image>
			<view class="data_list">
				<view  class="data_li" v-for="(item,index) in datas">
					<view class="datali_top" @click="$service.jump" :data-url="'/pages/bus_index/bus_index?id='+item.id">
						<image class="datali_top_img" :src="$service.getimg(item.banner)" mode="aspectFill"></image>
						<view class="datali_top_msg">
							<view class="datalimsg_tit">{{item.title||''}}</view>
							<view class="datalimsg_add">{{item.address||''}}</view>
							<view class="dis_flex aic ju_b">
								<view class="datalimsg_dh"><image src="/static/images/iaddicon.png" mode="aspectFit"></image>导航</view>
								<view class="datalimsg_jl">{{item.juli||'--'}}</view>
							</view>
						</view>
					</view>
					<view class="data_sli dis_flex aic" v-for="(item1,index1) in item.child" @click.stop="$service.jump" :data-url="'/pages/details_qcmr/details_qcmr?id='+item1.id">
						<text class="data_sli_l"></text>
						<view class="flex_1 data_sli_c">{{item1.title}}</view>
						<view class="data_sli_r">￥<text>{{item1.price}}</text></view>
					</view>
					<view class="datasli_more"  @click="$service.jump" :data-url="'/pages/bus_index/bus_index?id='+1">查看全部<text class="icon icon-next"></text></view>
				</view>
				<!-- <view class="go_more">查看更多洗车店<text class="icon icon-next"></text></view> -->
				<uni-load-more v-if="listc_status" :status="listc_status" :contentText="contentText"></uni-load-more>
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
				columns:[
					{
						title:'1km'
					},
					{
						title:'5km'
					},
					{
						title:'10km'
					},
					{
						title:'15km'
					},
					{
						title:'20km'
					},
				],
				index:-1,
				show_sx:false,
				listc_status:'loading',
				contentText:{contentdown: "上拉显示更多",contentrefresh: "正在加载...",contentnomore: "暂无数据"},
				datas:[],
				page:1
			}
		},
		computed: {
		...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','loginDatas','addmsg','p_config','navdata']),
		},
		// onReachBottom() {
		// 	that.getdata()
		// },
		onLoad(e) {
			that=this
			that.options=e||{}
			console.log(e)
			
			that.onRetry()
		},
		onShow() {
			// that.onRetry()
		},
		
		onReachBottom() {
			that.getdatas()
		},
		
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			showpick(){
				console.log(111)
				that.show_sx=true
			},
			confirm(e) { //选择性别 确定
				console.log(e)
				this.index = e.detail.value
			},
			confirm_sx(e) { //选择工作时间
				this.ay_zodiac = e.value[0]
				this.show_sx = false;
			},
			cancel_sx() { //取消
				this.show_sx = false;
			},
			onRetry(){
					that.page=1
					that.datas=[]
					that.getdatas()
			},
			/**
			 * 店铺列表
			 * @param  status = [1|2|3|4] 类型 1、汽车美容 2、摩托车 3、二手车 4、加油站
			 */
			getdatas(){
				var km=''
				if(that.index!=-1){
					km=that.columns[that.index].id
				}
				var datas={
					status:1,
					lat:that.addmsg.latitude||'',
					lng:that.addmsg.longitude||'',
					km:km,
					page:that.page,
					limit:10
				}
				var jkurl='/index/store'
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
						if(datas.data.length>0){
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

.bus_head{
	width: 100%;
	height: 100%;
	// padding: 0 14rpx;
	position: relative;
	text{
		font-size: 30rpx;
		color: #333;
		position: relative;
		z-index: 999;
	}
	.bus_title{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 990;
	}
	.bus_jl{
		font-size: 28rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #000000;
		padding-right: 14rpx;
		position: relative;
		z-index: 999;
		image{
			width: 17rpx;
			height: 13rpx;
			margin-left: 10rpx;
		}
	}
}
.wrap_box{
	width: 100%;
	min-height: 100vh;
	background: #f8f8f8;
}
.main_box{
	width: 100%;
	// background: #f8f8f8;
	// background-image: url(/static/images/bg_carwash.png);
	// background-repeat: no-repeat;
	// background-size: 100% 421rpx;
	// background-position: top;
	padding: 322rpx 28rpx 30rpx;
	position: relative;
		
}
.main_bg{
	position: absolute;
	top: 0;
	width: 100%;
	left: 0;
	z-index: 1;
}
.data_list{
		width: 100%;
		position: relative;
		z-index: 2;
		// padding: 0 28rpx;
		.data_li{
			width: 100%;
			background: #fff;
			border-radius: 10rpx;
			margin-bottom: 22rpx;
			.datali_top{
				width: 100%;
				padding: 30rpx 25rpx;
				display: flex;
				align-items: flex-start;
				.datali_top_img{
					width: 138rpx;
					height: 138rpx;
					border-radius: 10rpx;
					margin-right: 20rpx;
				}
				.datali_top_msg{
					flex:1;
					.datalimsg_tit{
						font-size: 32rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #333333;
						line-height: 40rpx;
						margin-bottom: 18rpx;
					}
					.datalimsg_add{
						font-size: 24rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #BBBBBB;
						line-height: 38rpx;
						margin-bottom: 18rpx;
					}
					.datalimsg_dh{
						width: 96rpx;
						height: 41rpx;
						background: rgba(70,128,230,0.1);
						border: 1px solid #4680E6;
						border-radius: 10rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 24rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #4680E6;
						image{
							width: 18rpx;
							height: 18rpx;
							margin-right: 10rpx;
						}
					}
					.datalimsg_jl{
						font-size: 24rpx;
						font-family: Arial;
						font-weight: 400;
						color: #979898;
					}
				}
			}
			.data_sli{
				border-top: 1px solid #EEEEEE;
				width: 100%;
				height: 96rpx;
				padding: 0 32rpx;
				.data_sli_l{
					width: 12rpx;
					height: 12rpx;
					background: #DDDDDD;
					border-radius: 50%;
					margin-right: 14rpx;
				}
				.data_sli_c{
					font-size: 28rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #333333;
				}
				.data_sli_r{
					font-size: 28rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #E2382F;
					text{
						font-size: 36rpx;
					}
				}
			}
			.datasli_more{
				width: 100%;
				height: 96rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #999999;
				border-top: 1px solid #eee;
				text{
					font-size: 28rpx;
				}
			}
		}
		.go_more{
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 694rpx;
			height: 80rpx;
			background: #FDC113;
			border-radius: 10rpx;
			text{
				font-size: 28rpx;
			}
		}
	}
</style>
