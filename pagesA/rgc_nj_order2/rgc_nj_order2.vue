<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<view class="steps_box">
			<u-steps current="2" :dot="true" inactiveColor="#EEEEEE" activeColor="#4680E6">
					<u-steps-item title="支付订单" ></u-steps-item>
					<u-steps-item title="上传资料"  ></u-steps-item>
					<u-steps-item title="年检办理"></u-steps-item>
					<u-steps-item title="回寄标志"></u-steps-item>
				</u-steps>
		</view>
		<view class="tip_box dis_flex_c aic ju_c">
			<image class="tip_img" src="/static/images/order_wait.png" mode="aspectFit"></image>
			<view class="tip_d1">年检办理中</view>
			<view class="tip_d2">预计在2个工作日内办理完成</view>
		</view>
		<!-- <view class="cz_box">
			<view class="car_li fww">
				<view class="car_li_l">上传驾驶证</view>
			</view>
			<view class="yh_add">北京市朝阳区望京东路8号锐创国际A座</view>
		</view> -->
		
	
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
				fw_type:0,
				pay_type:0,
				xy_type:true,
				nj_array:[
					{
						title:'线上年检'
					},
					{
						title:'线下年检'
					},
				],
				nj_index:0,
				user_name:'',
				user_tel:'',
				user_add:'',
				lat:'',
				lng:'',
				address:'',
				
				
				sfz1:'',
				sfz2:'',
				xsz1:'',
				xsz2:'',
				jsz1:'',
				jsz2:'',
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
			that.nj_index=e.type||0
			console.log(e)
			
			// that.getdata()
		},
		onShow() {
			// that.onRetry()
		},
		
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			next_fuc(){
				// if(!that.sfz1){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'请上传身份证正面'
				// 	})
				// 	return
				// }
				// if(!that.sfz2){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'请上传身份证反面'
				// 	})
				// 	return
				// }
				uni.redirectTo({
					url:'/pagesA/rgc_nj_order2/rgc_nj_order2?type='+that.options.type
				})
			},
			upimg_fuc(e){
				var edatas=e.currentTarget.dataset
				uni.showActionSheet({
					itemList: ['拍照', '相册选择'],
					success: function(res) {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						var sourceType = ['camera', 'album']
						if (res.tapIndex == 0) {
							sourceType = ['camera']
						} else {
							sourceType = ['album']
						}
						// var len=that.img_arr
						uni.chooseImage({
							count:1,
							sizeType: ['original', 'compressed'],
							sourceType: sourceType,
							success: function(res) {
								console.log(res)
								const tempFilePaths = res.tempFilePaths
								
								// const imglen = that.img_list.length
								
								that.upimg(tempFilePaths, 0,e)
								
							}
						});
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			upimg(imgs, i,e) {
			  
				var edatas=e.currentTarget.dataset
				if(that.$service.appVN==0){
					var datas=imgs[i]
					
					if(edatas.type==1){ //上传商品图
						 that.sfz1=datas
					}else if(edatas.type==2){ //商品详情图
						 that.sfz2=datas
					}else if(edatas.type==3){ //mt照片
						that.xsz1=datas
					}else if(edatas.type==4){ //mt照片
						that.xsz2=datas
					}else if(edatas.type==5){ //身份证
						that.jsz1=datas
					}else{ //上传本人照片
						that.jsz2=datas
					}
					if(edatas.type=='v1'){
						that.mt_video.push(datas)
					}
					if (i<imgs.length-1) {
					  i++
					  that.upimg(imgs, i,e)
					}
					return
				}
				that.$service.wx_upload(imgs[i]).then(res => {
							
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(i)
						// that.img_arr.push(datas)
						
						if(edatas.type==1){ //上传商品图
							that.goods_img=datas
						}else if(edatas.type==2){ //商品详情图
							 that.goodsxq_img.push(datas)
						}else if(edatas.type==3){ //工作照片
							that.mt_img.push(datas)
						}else if(edatas.type==4){ //工作照片
							that.self_img.push(datas)
						}else if(edatas.type==5){ //身份证
							that.certificate.push(datas)
						}
						
						if(edatas.type=='v1'){
							that.mt_video.push(datas)
						}
						// 	newdata.push(datas)
							
						// 	that.img_list= newdata
						// 	var news1 = that.img_list.length
							if (i<imgs.length-1) {
							  i++
							  that.upimg(imgs, i,e)
							}
						// }
						
					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: "none",
								title: "上传失败"
							})
						}
					}
				}).catch(e => {
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
				
			},
			
			getadd(){
				console.log(1)
				uni.chooseLocation({
					success: res => {
						// this.value5 = res.name
						console.log('当前位置的：');
						console.log(res);
						that.address=res.address//地址
						that.lng=res.longitude//经度  
						that.lat=res.latitude//纬度  
						that.user_add=res.name
					},fail(err) {
						console.log(err);
					}
				});
			},
			pay_fuc(){
				//上传资料
				uni.redirectTo({
					url:'/pagesA/rgc_nj_order1/rgc_nj_order1?type='+that.options.type
				})
			},
			checkboxChange: function (e) {
				console.log(e.detail.value)
				var arr=e.detail.value
				if(arr.length>0){
					this.xy_type=true
				}else{
					this.xy_type=false
				}
				
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
	background: #f8f8f8;
	padding: 28rpx 28rpx 240rpx;
}
.steps_box{
	width: 100%;
	height: 134rpx;
	background: #FFFFFF;
	border-radius: 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 22rpx;
}
.tip_box{
	width: 100%;
	height: 476rpx;
	background: #FFFFFF;
	border-radius: 10rpx;
	padding: 20rpx 0 ;
	margin-bottom: 20rpx;
	.tip_img{
		width: 116rpx;
		height: 116rpx;
		margin-bottom: 26rpx;
	}
	.tip_d1{
		font-size: 30rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #333333;
		margin-bottom: 15rpx;
	}
	.tip_d2{
		font-size: 24rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #999999;
	}
}
.cz_box{
	width: 100%;
	background: #FFFFFF;
	border-radius: 10rpx;
	padding: 20rpx 0 ;
	margin-bottom: 20rpx;
	.car_li{
		width: 100%;
		// border-bottom: 1px solid #eee;
		padding: 0 28rpx;
		margin-bottom: 10rpx;
		// height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.car_li_l{
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
		
	}
	.yh_add{
		width: 100%;
		padding: 0 28rpx;
		font-size: 28rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #999999;
	}
}

/deep/ .u-text__value{
	font-size: 26rpx;
	color: #999;
}
</style>
