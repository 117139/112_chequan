<template>
	<view class="wrap_box">
		
		<view class="main_box">
			<image v-if="navdata[3].banner" class="main_bg" :src="$service.getimg(navdata[3].banner)" mode="widthFix"></image>
			<image v-else class="main_bg" :src="$service.getimg('/static_wx/images/rgcnj_bg.png')" mode="widthFix"></image>
			<view class="cz_box">
				<view class="cz_tip"><text class="iconfont icon-yanzhengma"></text>以下信息仅供交管局查询使用，我们将严格保密</view>
				
				<view class="xq_li fww">
					<view class="xq_l" style="width: 300rpx;">本人行驶证信息</view>
					<view class="xq_r">
						
					</view>
					<view class="pz_btn" @click="$service.jump" data-url="/pagesA/pzsb/pzsb?type=2">
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
				<view class="xq_li">
					<view class="xq_l ">车牌号</view>
					<!-- <picker @change="bindPickerChange_c" :value="car_type" :range="cc_array" range-key="title"> -->
						<view class="xq_l1"  @click="focus">{{province}}<text class="iconfont icon-xiasanjiao"></text></view>			
					<!-- </picker> -->
					<input class="xq_r" type="text" v-model="car_code" placeholder="请输入车牌号码" maxlength="12">
					<!-- <view class="xq_r">{{car_code||'请输入车牌号码'}}</view> -->
				</view>
				<!-- <view class="xq_li">
					<view class="xq_l">车辆识别号</view>
					<input type="text" class="xq_r" v-model="car_num" placeholder="请输入车辆识别号后4位">
				</view>
				<view class="xq_li">
					<view class="xq_l">发动机号</view>
					<input type="text" class="xq_r" v-model="pow_num" placeholder="请输入发动机号后4位">
				</view> -->
				<picker @change="bindPickerChange_c" :value="car_type" :range="cc_array" range-key="title">
					<view class="xq_li">
						<view class="xq_l">车辆类型</view>
						<!-- <input type="text" class="xq_r" v-model="pow_num" placeholder="请输入发动机号后4位"> -->
						<view class="xq_r">{{cc_array[car_type].title||'请选择车辆类型'}} <text class="iconfont icon-next"></text></view>
					</view>				
				</picker>
				<picker @change="bindDateChange_cz" mode="date" :value="sign_time" :start="startDate" :end="endDate1">
					<view class="xq_li">
						<view class="xq_l">注册日期</view>
						<!-- <input type="text" class="xq_r" v-model="pow_num" placeholder="请输入发动机号后4位"> -->
						<view class="xq_r">{{sign_time||'请选择注册日期'}}<text class="iconfont icon-next"></text></view>
					</view>	
					
				</picker>
				<picker @change="bindDateChange_jc" mode="date" :value="nj_time" :start="startDate" :end="endDate1">
					<view class="xq_li">
						<view class="xq_l">检测有效期</view>
						<!-- <input type="text" class="xq_r" v-model="pow_num" placeholder="请输入发动机号后4位"> -->
						<view class="xq_r">{{nj_time||'请选择检测有效期'}}<text class="iconfont icon-next"></text></view>
					</view>	
					
				</picker>
				<picker @change="bindPickerChange_nj" :value="nj_type" :range="nj_array" range-key="title">
					<view class="xq_li">
						<view class="xq_l">年检方式</view>
						<!-- <input type="text" class="xq_r" v-model="pow_num" placeholder="请输入发动机号后4位"> -->
					<view class="xq_r">{{nj_array[nj_type].title||'请选择年检方式'}} <text class="iconfont icon-next"></text></view>
					</view>				
				</picker>
				<view class="xq_li">
					<view class="xq_l" style="width: 300rpx;">未造成伤亡事故</view>
					<view class="flex_1"></view>
					<!-- <input type="text" class="xq_r" v-model="car_num" placeholder="请输入车辆识别号后4位"> -->
					<u-switch v-model="is_accident" @change="dzchange" activeColor="#4680E6"></u-switch>
				</view>
				<view class="xq_btn" @click="go_fuc">立即查询</view>
				<view class="xq_yx" @click="active=!active">
					<view class="xy_box" :class="{active: active}">
						<text class="icon icon-duigou2"></text>
					</view>
					我已阅读并同意
					<text @click.stop="$service.jump" data-url="/pagesA/xieyi/xieyi?id=yhxy">《用户协议》</text>和
					<text @click.stop="$service.jump" data-url="/pagesA/xieyi/xieyi?id=grxx">《个人信息处理单独同意书》</text>
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
				province:'京',
				car_code:'',
				car_num:'',
				pow_num:'',
				cc_array:[
					{
						title:'小型轿车'
					},
					{
						title:'中型轿车'
					},
					{
						title:'大型轿车'
					},
					{
						title:'微型轿车'
					},
					{
						title:'中型客车'
					},
					{
						title:'大型客车'
					},
					{
						title:'牵引车'
					},
					{
						title:'公交车'
					},
				],
				car_type:0,
				nj_array:[
					{
						title:'线上年检'
					},
					{
						title:'线下年检'
					},
				],
				nj_type:0,
				is_accident:false,
				sign_time:'',
				nj_time:'',
				img:'',
				active:false,
				xy_show:false
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
			console.log(e)
			uni.$on('setimg_fuc', (data) => {
					console.log('标题：' + data.title)
					console.log('内容：' + data.content)
					// that.getbasedata()
					that.img=data.content.img_url
					that.car_number=data.content.vin
					that.engine=data.content.engine_no
					var  car_id=data.content.plate_no
					car_id=car_id.split('')
					that.province=car_id.shift()
					that.car_code=car_id.join('')
					if(data.content.vehicle_type){
						for (var i = 0; i < that.cc_array.length; i++) {
							if(that.cc_array[i].title==data.content.vehicle_type){
								that.car_type=i
							}
						}
					}else{
						that.car_type=0
					}
					var sign_time=data.content.register_date
					var sign_time_yy=sign_time.substr(0,4)
					var sign_time_mm=sign_time.substr(4,2)
					var sign_time_dd=sign_time.substr(6,2)
					that.sign_time=sign_time_yy+'-'+sign_time_mm+'-'+sign_time_dd
					var nj_time=data.content.issue_date
					var nj_time_yy=nj_time.substr(0,4)
					var nj_time_mm=nj_time.substr(4,2)
					var nj_time_dd=nj_time.substr(6,2)
					that.nj_time=nj_time_yy+'-'+nj_time_mm+'-'+nj_time_dd
					// that.imgmsg()
			})
			// that.getdata()
		},
		onShow() {
			// that.onRetry()
		},
		
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			bindDateChange_cz: function(e) {
					this.sign_time = e.detail.value
			},
			bindDateChange_jc: function(e) {
					this.nj_time = e.detail.value
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
				if(!this.car_code){
					uni.showToast({
						icon:'none',
						title:'请输入车牌号'
					})
					return
				}
				if(!this.sign_time){
					uni.showToast({
						icon:'none',
						title:'请选择注册日期'
					})
					return
				}
				if(!this.nj_time){
					uni.showToast({
						icon:'none',
						title:'请选择检测有效期'
					})
					return
				}
			
				if(!that.active){
					uni.showToast({
						icon:'none',
						title:"请先阅读并同意用户协议和隐私协议",
						duration:3000
					})
					return
				}
				var cs={
					img:that.img,
					province:that.province,
					car_code:that.car_code,
					car_number:that.car_number,
					engine:that.engine,
					car_type:that.cc_array[that.car_type].title,
					sign_time:that.sign_time,
					nj_time:that.nj_time,
					nj_type:that.nj_type==1?2:1,
					is_accident:that.is_accident?1:2
				}
				cs=JSON.stringify(cs)
				uni.navigateTo({
					url:'/pagesA/rgc_nj_order/rgc_nj_order?type='+that.nj_type+'&cs='+cs
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
					that.province=val.val
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
					this.car_type = e.detail.value
			},
			bindPickerChange_nj: function(e) {
					console.log('picker发送选择改变，携带值为', e.detail.value)
					this.nj_type = e.detail.value
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
</style>
