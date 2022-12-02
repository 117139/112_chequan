<template>
	<view class="wrap_box">
		
		<view class="main_box">
			<view class="cz_box">
				<view class="cz_tip"><text class="iconfont icon-yanzhengma"></text>以下信息仅供交管局查询使用，我们将严格保密</view>
				
				<view class="xq_li fww">
					<view class="xq_l" style="width: 300rpx;">本人行驶证信息</view>
					<view class="xq_r">
						
					</view>
					<view class="pz_btn" @click="$service.jump" data-url="/pagesA/pzsb/pzsb?type=2">
						<text class="iconfont icon-saoyisao"></text>拍照识别
					</view>
					<view class="pz_jg dis_flex aic ju_c">
						<view class="pz_jgbox">
							<view class="pz_jgbox1">
								<image class="pz_jgbox_img" src="/static/images/banner.png" mode="aspectFill"></image>
								<view class="pz_jgbox_msg">
									<view class="pz_i">
										<text class="iconfont icon-paizhao-xianxing"></text>
									</view>
								</view>
								<image class="pz_jgbox_ss" src="/static/images/pzsb_i.png" mode="aspectFill"></image>
							</view>
						</view>
					</view>
					<view class="pz_tip">
						<text class="iconfont icon-jinggao"></text>请核对识别的信息，如有误请修改
					</view>
				</view>
				<view class="xq_li">
					<view class="xq_l ">车牌号</view>
					<!-- <picker @change="bindPickerChange_c" :value="cc_index" :range="cc_array" range-key="title"> -->
						<view class="xq_l1"  @click="focus">{{car_id_n}}<text class="iconfont icon-xiasanjiao"></text></view>			
					<!-- </picker> -->
					<input class="xq_r" type="text" v-model="car_id" placeholder="请输入车牌号码" maxlength="12">
					<!-- <view class="xq_r">{{car_id||'请输入车牌号码'}}</view> -->
				</view>
				<!-- <view class="xq_li">
					<view class="xq_l">车辆识别号</view>
					<input type="text" class="xq_r" v-model="car_num" placeholder="请输入车辆识别号后4位">
				</view>
				<view class="xq_li">
					<view class="xq_l">发动机号</view>
					<input type="text" class="xq_r" v-model="pow_num" placeholder="请输入发动机号后4位">
				</view> -->
				<picker @change="bindPickerChange_c" :value="cc_index" :range="cc_array" range-key="title">
					<view class="xq_li">
						<view class="xq_l">车辆类型</view>
						<!-- <input type="text" class="xq_r" v-model="pow_num" placeholder="请输入发动机号后4位"> -->
						<view class="xq_r">{{cc_array[cc_index].title||'请选择车辆类型'}} <text class="iconfont icon-next"></text></view>
					</view>				
				</picker>
				<picker @change="bindDateChange_cz" mode="date" :value="car_cz" :start="startDate" :end="endDate1">
					<view class="xq_li">
						<view class="xq_l">注册日期</view>
						<!-- <input type="text" class="xq_r" v-model="pow_num" placeholder="请输入发动机号后4位"> -->
						<view class="xq_r">{{car_cz||'请选择注册日期'}}<text class="iconfont icon-next"></text></view>
					</view>	
					
				</picker>
				<picker @change="bindDateChange_jc" mode="date" :value="car_jc" :start="startDate" :end="endDate1">
					<view class="xq_li">
						<view class="xq_l">检测有效期</view>
						<!-- <input type="text" class="xq_r" v-model="pow_num" placeholder="请输入发动机号后4位"> -->
						<view class="xq_r">{{car_jc||'请选择检测有效期'}}<text class="iconfont icon-next"></text></view>
					</view>	
					
				</picker>
				<picker @change="bindPickerChange_nj" :value="nj_index" :range="nj_array" range-key="title">
					<view class="xq_li">
						<view class="xq_l">年检方式</view>
						<!-- <input type="text" class="xq_r" v-model="pow_num" placeholder="请输入发动机号后4位"> -->
					<view class="xq_r">{{nj_array[nj_index].title||'请选择年检方式'}} <text class="iconfont icon-next"></text></view>
					</view>				
				</picker>
				<view class="xq_li">
					<view class="xq_l" style="width: 300rpx;">未造成伤亡事故</view>
					<view class="flex_1"></view>
					<!-- <input type="text" class="xq_r" v-model="car_num" placeholder="请输入车辆识别号后4位"> -->
					<u-switch v-model="dz_type" @change="dzchange" activeColor="#4680E6"></u-switch>
				</view>
				<view class="xq_btn" @click="go_fuc">立即查询</view>
				<view class="xq_yx">点击立即查询表示同意<text @click="$service.jump" data-url="/pagesA/xieyi/xieyi?type=0">用户协议</text>和<text @click="$service.jump" data-url="/pagesA/xieyi/xieyi?type=1">隐私协议</text></view>
			</view>
		</view>
		
		<keyboard-package :disableDot="true" :type="3"  @input="inputVal" ref="keyboard"></keyboard-package>
		<!-- 阻止滑动 -->
		<!-- <view @touchmove.stop.prevent='test'></view> -->
	</view>
</template>

<script>
	import Vue from 'vue'
	
	import keyboardPackage from '@/components/keyboard-package/keyboard-package.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that 
	export default {
		components:{keyboardPackage},
		data() {
			const currentDate = this.getDate({
			            format: true
			        })
			return {
				options:'',
				datas:'',
				page:1,
				car_id_n:'京',
				car_id:'',
				car_num:'',
				pow_num:'',
				cc_array:[
					{
						title:'小型车'
					},
					{
						title:'中型车'
					},
					{
						title:'大型车'
					},
					{
						title:'重型车'
					},
				],
				cc_index:0,
				nj_array:[
					{
						title:'线上年检'
					},
					{
						title:'线下年检'
					},
				],
				nj_index:0,
				dz_type:false,
				car_cz:'',
				car_jc:''
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','loginDatas']),
			startDate() {
					return this.getDate('start');
			},
			endDate() {
					return this.getDate('end');
			},
			endDate1() {
					return this.getDate('end1');
			}
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
			bindDateChange_cz: function(e) {
					this.car_cz = e.detail.value
			},
			bindDateChange_jc: function(e) {
					this.car_jc = e.detail.value
			},
			getDate(type) {
					const date = new Date();
					let year = date.getFullYear();
					let month = date.getMonth() + 1;
					let day = date.getDate();
			
					if (type === 'start') {
							year = year - 60;
					} else if (type === 'end') {
							year = year;
					} else if (type === 'end1') {
							year = year+7;
					}
					month = month > 9 ? month : '0' + month;
					day = day > 9 ? day : '0' + day;
					return `${year}-${month}-${day}`;
			},
			dzchange(e){
				console.log(e)
			},
			go_fuc(){
				if(!this.car_id){
					uni.showToast({
						icon:'none',
						title:'请输入车牌号'
					})
					return
				}
				if(!this.car_cz){
					uni.showToast({
						icon:'none',
						title:'请选择注册日期'
					})
					return
				}
				if(!this.car_jc){
					uni.showToast({
						icon:'none',
						title:'请选择检测有效期'
					})
					return
				}
				uni.navigateTo({
					url:'/pagesA/rgc_nj_order/rgc_nj_order?type='+that.nj_index
				})
			},
			focus ( type ) {
				// let typeArr = {
				// 	phone: 1,
				// 	checkcode:1,
				// 	idcard: 2,
				// 	plateNumber: 3
				// }
				// if(this.borderFor != type)	{
				// 	this.keyboardFor = type
				// 	this.keyboardType = typeArr[type]
				// 	clearInterval(this.timer)
				// 	this.timer = setInterval(()=>{
				// 		this.borderFor = this.borderFor == type ? false : type
				// 	},500)
				// }
				this.$refs.keyboard.open()
			},
			inputVal ( val ) {
				// val = val.toString()
				console.log(val)
				if(val.active==2){
					that.car_id_n=val.val
				}else{
					
				}
				// let key = this.keyboardFor
				// let _this = this
				
				// const writeValue = (key, maxlength)=>{
				// 	let len = _this.login[key].length
				// 	if(!val){
				// 		_this.login[key] = _this.login[key].substring(0, len-1)
				// 		return
				// 	}
				// 	if(len === maxlength) return
				// 	_this.login[key] += val
				// }
				
				// const funArr = {
				// 	phone () {
				// 		writeValue (key, 11)
				// 	},
				// 	idcard () {
				// 		writeValue (key, 18)
				// 	},
				// 	plateNumber () {
				// 		writeValue (key, 7)
				// 	},
				// 	checkcode () {
				// 		writeValue (key, 6)
				// 	}
				// }
				// funArr[key]()
			
			},
			bindPickerChange_c: function(e) {
					console.log('picker发送选择改变，携带值为', e.detail.value)
					this.cc_index = e.detail.value
			},
			bindPickerChange_nj: function(e) {
					console.log('picker发送选择改变，携带值为', e.detail.value)
					this.nj_index = e.detail.value
			},
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
	background-image: url(/static/images/rgcnj_bg.png);
	background-repeat: no-repeat;
	background-size: 100% auto;
	background-position: 0 0;
	padding: 322rpx 28rpx 30rpx;
	
}
.cz_box{
	width: 100%;
	background: #FFFFFF;
	border-radius: 10rpx;
	padding: 20rpx 0;
	.cz_tip{
		width: 100%;
		height: 64rpx;
		background: rgba(70, 128, 230, .1);
		display: flex;
		align-items: center;
		font-size: 24rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #4680E6;
		padding: 0 28rpx;
		text{
			font-size: 24rpx;
			margin-right: 10rpx;
		}
	}
	.xq_li{
		width: 100%;
		padding: 25rpx 28rpx;
		display: flex;
		border-bottom: 1px solid #EEEEEE;
		.xq_l{
			font-size: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
			width: 200rpx;
		}
		.xq_l1{
			width: 200rpx;
			text-align: right;
			font-size: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
			text{
				font-size: 20rpx;
				margin-left: 8rpx;
			}
		}
		.xq_r{
			flex: 1;
			font-size: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
			text-align: right;
		}
		.pz_btn{
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #4680E6;
			text{
				font-size: 26rpx;
				margin-right: 10rpx;
			}
		}
	}
	.pz_jg{
		width: 100%;
		padding: 30rpx;
		.pz_jgbox{
			width: 250rpx;
			height: 178rpx;
			background: #F8F8F8;
			border-radius: 4rpx;
			padding: 7rpx 10rpx;
			.pz_jgbox1{
				width: 100%;
				height: 100%;
				position: relative;
			}
			.pz_jgbox_img{
				width: 100%;
				height: 100%;
				position: relative;
				z-index: 1;
				border-radius: 4rpx;
			}
			.pz_jgbox_ss{
				width: 98rpx;
				height: 36rpx;
				position: absolute;
				z-index: 20;
				top: -10rpx;
				right: -40rpx;
			}
			.pz_jgbox_msg{
				width: 100%;
				height: 100%;
				position: absolute;
				z-index: 10;
				top: 0;
				left: 0;
				background: rgba(0, 0, 0, .2);
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 4rpx;
				.pz_i{
					width: 66rpx;
					height: 66rpx;
					background: rgba(0, 0, 0, .2);
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					text{
						font-size: 32rpx;
						color: #fff;
					}
				}
			}
		}
	}
	.pz_tip{
		width: 100%;
		font-size: 24rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #BBBBBB;
		// line-height: 80rpx;
		// border-bottom: 1px solid #eee;
		// padding: 0 28rpx;
		text{
			font-size: 28rpx;
			color: #bbb;
			margin-right: 10rpx;
		}
	}
}
.xq_btn{
	width: 638rpx;
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
	margin: 40rpx auto 20rpx;
}
.xq_yx{
	width: 100%;
	text-align: center;
	font-size: 24rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #666666;
	padding-bottom: 20rpx;
	text{
		color: #4680e6;
	}
}
</style>
