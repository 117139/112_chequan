<template>
	<view class="wrap_box">
		
		<view class="main_box">
			<image v-if="navdata[5].banner" class="main_bg" :src="$service.getimg(navdata[5].banner)" mode="widthFix"></image>
			<image v-else class="main_bg" :src="$service.getimg('/static_wx/images/rgcsb_bg.png')" mode="widthFix"></image>
			<view class="cz_box">
				<view class="xq_li fww">
					<input class="car_id" type="text" placeholder="请输入车架号或扫描行驶证" v-model="vin">
					<view class="pz_btn" @click="$service.jump" data-url="/pagesA/pzsb/pzsb?type=5">
						<text class="iconfont icon-saoyisao"></text>拍照识别
					</view>
					<view v-if="img" class="pz_jg dis_flex aic ju_c">
						<view class="pz_jgbox">
							<view class="pz_jgbox1">
								<image class="pz_jgbox_img" :src="$service.getimg(img)" mode="aspectFill"></image>
								<view class="pz_jgbox_msg">
									<view class="pz_i">
										<text class="iconfont icon-paizhao-xianxing"></text>
									</view>
								</view>
								<image class="pz_jgbox_ss" src="/static/images/pzsb_i.png" mode="aspectFill"></image>
							</view>
						</view>
					</view>
					<view v-if="img" class="pz_tip">
						<text class="iconfont icon-jinggao"></text>请核对识别的信息，如有误请修改
					</view>
				</view>
			
			
				
				<view class="xq_btn" @click="go_fuc">开始查询</view>
				<view class="xq_yx" @click="active=!active">
					<view class="xy_box" :class="{active: active}">
						<text class="icon icon-duigou2"></text>
					</view>
					我已阅读并同意
					<text @click.stop="$service.jump" data-url="/pagesA/xieyi/xieyi?id=yhxy">《用户协议》</text>和
					<text @click.stop="$service.jump" data-url="/pagesA/xieyi/xieyi?id=grxx">《个人信息处理单独同意书》</text>
				</view>
			</view>
			<view class="ls_box">
				<view class="ls_tit">经典案例</view>
				<image class="ls_img" :src="$service.getimg('/static_wx/images/ls_img.png')" mode="widthFix"></image>
			</view>
		</view>
		
		<u-popup :show="xy_show" mode="center" :round="14" :safeAreaInsetBottom="false">
			<view class="use_tkbox">
				<view class="usetk_tip">
					继续使用本功能，请阅读并同意
				</view>
				<text @click.stop="$service.jump" data-url="/pagesA/xieyi/xieyi?id=yhxy">《用户协议》</text>
				<text @click.stop="$service.jump" data-url="/pagesA/xieyi/xieyi?id=grxx">《个人信息处理单独同意书》</text>
				<view class="ty_btn" @click="ty_fuc">
					已阅读并同意
				</view>
				<view class="bty_btn" @click="xy_show=false">
					暂不同意
				</view>
			</view>
		</u-popup>
		<!-- <keyboard-package :disableDot="true" :type="3"  @input="inputVal" ref="keyboard"></keyboard-package> -->
		<!-- 阻止滑动 -->
		<!-- <view @touchmove.stop.prevent='test'></view> -->
	</view>
</template>

<script>
	import Vue from 'vue'
	
	import regionPicker from "@/components/region-picker/region-picker.vue"
	// import keyboardPackage from '@/components/keyboard-package/keyboard-package.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that 
	export default {
		components:{
			regionPicker,
			// keyboardPackage
		},
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
						title:'奔驰A级 2022款 A 180 L'
					},
					{
						title:'奔驰A级 2021款 A 180 L'
					},
					{
						title:'奔驰A级 2020款 A 180 L'
					},
					{
						title:'奔驰A级 2019款 A 180 L'
					},
				],
				cc_index:'0',
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
				car_jc:'',
				fb_add:['北京市','市辖区','东城区'],
				active:false,
				xy_show:false,
				img:'',
				vin:''
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','loginDatas','addmsg','p_config','navdata']),
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
			if(e.code){
				that.vin=e.vin
				that.active=true
			}
			uni.$on('setimg_fuc', (data) => {
					console.log('标题：' + data.title)
					console.log('内容：' + data.content)
					// that.getbasedata()
					that.img=data.content.img_url
					that.vin=data.content.vin
					// that.engine=data.content.engine_no
					// var  car_id=data.content.plate_no
					// car_id=car_id.split('')
					// that.province=car_id.shift()
					// that.car_code=car_id.join('')
					// if(data.content.vehicle_type){
					// 	for (var i = 0; i < that.cc_array.length; i++) {
					// 		if(that.cc_array[i].title==data.content.vehicle_type){
					// 			that.car_type=i
					// 		}
					// 	}
					// }else{
					// 	that.car_type=0
					// }
					// that.imgmsg()
			})
			console.log(e)
			
			// that.getdata()
		},
		onShow() {
			// that.onRetry()
		},
		
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			region_change(e){
				console.log(e)
				that.fb_add=e.detail.value
			},
			bindDateChange_cz: function(e) {
					this.car_cz = e.detail.value
			},
			bindDateChange_jc: function(e) {
				console.log(e)
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
			ty_fuc(){
				that.active=true
				this.xy_show=false
				this.go_fuc()
			},
			go_fuc(){
				if(!that.active){
					// uni.showToast({
					// 	icon:'none',
					// 	title:"请先阅读并同意用户协议和隐私协议",
					// 	duration:3000
					// })
					this.xy_show=true
					return
				}
				if(!this.vin){
					uni.showToast({
						icon:'none',
						title:'请输入车架号或扫描行驶证'
					})
					return
				}
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
				
				if(!that.active){
					uni.showToast({
						icon:'none',
						title:"请先阅读并同意用户协议和隐私协议",
						duration:3000
					})
					return
				}
				var datas={
					vin: that.vin,
					img: that.img,
					pay_status:3
				}
				var jkurl='/car/car_vin'
				if(that.options.code){
					datas={
						vin: that.vin,
						img: that.img,
						code:that.options.code
					}
					jkurl='/car/car_vin_again'
				}
				that.$service.P_post(jkurl, datas).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						that.htmlReset = 0
						var datas = res.data
						console.log(typeof datas)
				
						// if (typeof datas == 'string') {
						// 	datas = JSON.parse(datas)
						// }
						console.log(res)
						uni.showToast({
							icon:'none',
							title:'提交成功'
						})
						setTimeout(()=>{
							uni.redirectTo({
								url:'/pagesA/rgc_sb_jg/rgc_sb_jg?code='+datas
							})
						},1000)
						// that.datas=datas.content
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
	// background-repeat: no-repeat;
	// background-size: 100% auto;
	// background-position: 0 -130rpx;
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
.cz_box{
	width: 100%;
	background: #FFFFFF;
	border-radius: 10rpx;
	padding: 20rpx 0;
	position: relative;
	z-index: 2;
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
		.car_id{
			flex:1;
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333;
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
	font-size: 22rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #666666;
	padding-bottom: 20rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	text{
		color: #4680e6;
	}
	.xy_box{
		width: 30rpx;
		height: 30rpx;
		background: #ddd;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		margin-right: 10rpx;
		border-radius: 50%;
		text{
			font-size: 24rpx;
			color: #fff;
		}
		&.active{
			background: #4680E6;
		}
	}
}

.ls_box{
	margin-top: 20rpx;
	width: 100%;
	background: #FFFFFF;
	border-radius: 10rpx;
	padding: 28rpx;
	.ls_tit{
		font-size: 32rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		position: relative;
		color: #333333;
		padding-left: 18rpx;
		&:before{
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			margin-top: -14rpx;
			width: 6rpx;
			height: 28rpx;
			background: #4680E6;
			border-radius: 3rpx;
		}
	}
	.ls_img{
		width: 100%;
	}
}
</style>
