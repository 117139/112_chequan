<template>
	<view class="wrap_box">
		
		<view class="main_box">
			<view class="cz_box">
				<view class="cz_tip"><text class="iconfont icon-yanzhengma"></text>为全网95%二手车交易提供估值服务</view>
				<view class="jg_top">
					<view class="jgt_tit">奔驰A级 2022款 A 180L</view>
					<view class="jgt_msg">
						估值价：<view class="msg_pri"><text>13.99 </text>万</view>	<text class="msg_tip"> (仅供参考)</text>
					</view>
				</view>
				<view class="jg_msg">
					<view class="jg_mli">
						<view class="jg_m_v">北京</view>
						<view class="jg_m_n">所在城市</view>
					</view>
					<view class="jg_mli">
						<view class="jg_m_v">2021-02</view>
						<view class="jg_m_n">上牌日期</view>
					</view>
					<view class="jg_mli">
						<view class="jg_m_v">1.0万公里</view>
						<view class="jg_m_n">行驶里程</view>
					</view>
					<view class="jg_mli">
						<view class="jg_m_v">国6</view>
						<view class="jg_m_n">排放标准</view>
					</view>
				</view>
				<view class="jgbz_box">
					<view class="jgbz_tit">当前价格车况参考标准</view>
					<view class="jgbz_a">
						<view><text>外观：</text>几乎无色差，喷漆不超过2个面；车窗玻璃完好</view>
						<view><text>内饰：</text>方向盘见见轻微磨损；座椅及内饰轻微磨损；车内轻微异味</view>
						<view><text>工况：</text>发动机运行正常且无维修；变速箱、底盘及电气系统运行正常；保养记录较为完整</view>
					</view>
				</view>
				
				<view class="xq_btn" @click="go_fuc">重新评估</view>
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
				fb_add:['北京市','市辖区','东城区']
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
					url:'/pagesA/rgc_mfpg/rgc_mfpg'
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
	background-image: url(/static/images/bg_pinggu.png);
	background-repeat: no-repeat;
	background-size: 100% auto;
	background-position: 0 -130rpx;
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
	.jg_top{
		width: 100%;
		padding: 28rpx;
		.jgt_tit{
			font-size: 32rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
			padding-left: 20rpx;
			position: relative;
			margin-bottom: 25rpx;
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
		.jgt_msg{
			width: 100%;
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
			display: flex;
			align-items: baseline;
			.msg_pri{
				color:#E2382F;
				text{
					font-size: 48rpx;
					line-height: 52rpx;
				}
			}
			.msg_tip{
				color: #bbb;
			}
		}
	}
	.jg_msg{
		width: 100%;
		border-top: 1px solid #eee;
		padding: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		.jg_mli{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.jg_m_v{
				font-size: 26rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #333333;
				margin-bottom: 20rpx;
			}
			.jg_m_n{
				font-size: 26rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #999999;
			}
		}
	}
	.jgbz_box{
		border-top: 1px solid #eee;
		padding: 28rpx;
		.jgbz_tit{
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
			margin-bottom: 25rpx;
		}
		.jgbz_a{
			width: 100%;
			background: #F8F8F8;
			border-radius: 10rpx;
			padding: 28rpx;
			font-size: 24rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #666666;
			line-height: 36rpx;
			text{
				font-weight: bolder;
			}
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
