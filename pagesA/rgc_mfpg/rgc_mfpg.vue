<template>
	<view class="wrap_box">
		
		<view class="main_box">
			<image v-if="navdata[4].banner" class="main_bg" :src="$service.getimg(navdata[4].banner)" mode="widthFix"></image>
			<image v-else class="main_bg" :src="$service.getimg('/static_wx/images/bg_pinggu.png')" mode="widthFix"></image>
			<view class="cz_box">
				<view class="cz_tip"><text class="iconfont icon-yanzhengma"></text>为全网95%二手车交易提供估值服务</view>
				
				<view class="xq_li fww">
					<view class="xq_l" style="width: 300rpx;">评估车辆信息</view>
					<view class="xq_r">
						
					</view>
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
				
				<!-- <picker @change="bindPickerChange_c" :value="cc_index" :range="cc_array" range-key="title">
					<view class="xq_li">
						<view class="xq_l">车辆型号</view>
						<view class="xq_r">{{cc_array[cc_index].title||'请选择车辆型号'}} <text class="iconfont icon-next"></text></view>
					</view>				
				</picker> -->
				<view class="xq_li"  @tap="$service.jump" data-url="/pagesA/ctpe_list/ctpe_list?type=1">
					<view class="xq_l">车辆型号</view>
					<view class="xq_r">
						<!-- {{cc_array[cc_index].title||'请选择车辆型号'}} -->
						{{pp_msg.name||'请选择车辆型号'}}
						<text class="iconfont icon-next"></text>
					</view>
				</view>	
				<region-picker @change="region_change" :value="fb_add">
					<view class="xq_li">
						<view class="xq_l">所在城市</view>
						<view class="xq_r">{{fb_add.join(' ')||'请选择所在城市'}}<text class="iconfont icon-next"></text></view>
					</view>	
					
				</region-picker>
				<picker @change="bindDateChange_jc" mode="date" fields="month" :value="car_jc" :start="startDate" :end="endDate">
					<view class="xq_li">
						<view class="xq_l">首次上牌</view>
						<view class="xq_r">{{car_jc||'请选择首次上牌时间'}}<text class="iconfont icon-next"></text></view>
					</view>	
					
				</picker>
				<view class="xq_li">
					<view class="xq_l">行驶里程</view>
					<input type="text" class="xq_r" v-model="pow_num" placeholder="请输入行驶里程">
					<view class="xq_r_dw">万公里</view>
				</view>
				<view class="xq_li">
					<view class="xq_l">排放标准</view>
					<input type="text" class="xq_r" v-model="paifang" placeholder="请输入排放标准">
					<!-- <view class="xq_r_dw">万公里</view> -->
				</view>
				
				<view class="xq_btn" @click="go_fuc">一键评估</view>
				<!-- <view class="xq_yx">点击立即查询表示同意<text @click="$service.jump" data-url="/pagesA/xieyi/xieyi?type=0">用户协议</text>和<text @click="$service.jump" data-url="/pagesA/xieyi/xieyi?type=1">隐私协议</text></view> -->
			</view>
		</view>
		
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
				
				
				
				img:'',
				
				
				
				pp_msg:'',
				
				ct_array:[],
				ct_index:0,
				ct_msg:'',
				cx_list:[],
				cx_index:0,
				cx_msg:'',
				
				ks_list:[],
				ks_index:0,
				ks_msg:'',
				
				
				
				
				paifang:''
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
					// that.imgmsg()
			})
			
			
			uni.$on('carpp_fuc', (data) => {
					console.log('标题：' + data.title)
					console.log('内容：' )
					console.log(data.content)
					that.pp_msg=data.content
					that.ct_msg = ''
					that.cx_msg = ''
					that.ks_msg=''
					that.getdata1()
					// that.getbasedata()
					// that.$service.wxlogin('token')
			})
			// that.getdata()
		},
		onShow() {
			// that.onRetry()
		},
		
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			getdata1(){
				// var that=this
				var datas={
					id: that.pp_msg.id
				}
				var jkurl='/publics/carbrand'
				
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
						that.ct_array=datas
						// car_status:that.ct_msg.id||'',
						// car_lx:that.cx_msg.id||'',
						// car_info:that.ks_msg.id||'',
						for (var i = 0; i < datas.length; i++) {
							if(datas[i].id==that.datas.car_status){
								that.ct_msg={
									id:datas[i].id,
									name:datas[i].name
								}
								that.cx_list=datas[i].carlist
								var cx_list=that.cx_list
								for (var c = 0; c < cx_list.length; c++) {
									if(cx_list[c].id==that.datas.car_lx){
										that.cx_msg = {
											id:cx_list[c].id,
											name:cx_list[c].name,
										}
										that.ks_list=cx_list[c].list
										var ks_list=cx_list[c].list
										if(ks_list.length>0){
											for (var k = 0; k < ks_list.length; k++) {
												if(ks_list[k].id==that.datas.car_info){
													that.ks_msg = {
														id:ks_list[k].id,
														name:ks_list[k].name,
													}
												}
											}
										}
										
									}
								}
							}
						}
						// that.ct_msg = ''
						// that.cx_msg = ''
						// that.ks_msg=''
						// if(datas[0].carlist.length>0){
						// 	that.cx_list=datas[0].carlist
							
						// 	that.cx_msg=that.cx_list[0]
						// 	if(that.cx_list[0].list.length>0){
						// 		that.ks_list=that.cx_list[0].list
						// 		that.ks_msg=that.ks_list[0]
						// 	}
						// }
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
			go_fuc(){
				
				// if(!this.cc_index){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'请选择车辆型号'
				// 	})
				// 	return
				// }
				if(!this.car_jc){
					uni.showToast({
						icon:'none',
						title:'请选择首次上牌时间'
					})
					return
				}
				
				
				if(!this.pow_num){
					uni.showToast({
						icon:'none',
						title:'请输入行驶里程'
					})
					return
				}
				
				if(!this.paifang){
					uni.showToast({
						icon:'none',
						title:'请输入排放标准'
					})
					return
				}
				
				var jkurl='/Publics/submitAssess'
				var  datas={
					car_version:that.pp_msg.name,
					province:that.fb_add[0],
					city:that.fb_add[1],
					county:that.fb_add[2],
					registration_time:this.car_jc,
					travel_mileage:this.pow_num,
					paifang:that.paifang
				}
				if(that.btnkg==1){
					return
				}
				that.btnkg=1
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
						uni.showToast({
							icon: 'none',
							title: '提交成功'
						})
						setTimeout(function(){
							uni.navigateBack()
						},1000)
					} else {
						that.btnkg = 0
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
				return
				uni.redirectTo({
					url:'/pagesA/rgc_mfpg_jg/rgc_mfpg_jg'
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
			getdata1111(){
				
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
		.xq_r_dw{
			margin-left: 10rpx;
			font-size: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
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
