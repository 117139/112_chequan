<template>
	<view class="wrap_box">
		
		<view class="fb_box">
			<view class="fb_imgs"  @click="upimg_fuc" data-type="2"  data-idx="0">
				<image class="fb_imgs_i" src="/static/images/icon_upimg.png" mode="aspectFit"></image>
				<view class="fb_imgs_t">添加店铺图片</view>
			</view>
			<view class="fb_img_box dis_flex fww">
				<view class="fb_img_li" v-for="(item,index) in real_work">
					<image class="fb_img_p" :src="$service.getimg(item)" mode="aspectFill"></image>
					<view class="fb_img_i "  @click="delimg_fuc"  data-type="2" :data-idx="index">
						<text class="iconfont icon-shanchu1"></text>
					</view>
				</view>
			</view>
			<view class="fb_list">
				<view class="fb_li">
					<view class="fb_li_l">
						店铺名称
					</view>
					<input class="fb_li_r" type="text" v-model="fb_tit" placeholder="请填写店铺名称">
				</view>
				<view class="fb_li">
					<view class="fb_li_l">
						联系方式
					</view>
					<input class="fb_li_r" type="number" v-model="fb_tel" placeholder="请填写真实手机号">
				</view>
				<picker @change="bindPickerChange" :value="index" :range="array" range-key="title">
					<view class="fb_li fb_li1">
						<view class="fb_li_l">
							<text>*</text>店铺类型
						</view>
						<view class="fb_li_r">{{array[tp_index].title}}<text class="iconfont icon-next"></text></view>
					</view>
				</picker>
				<view class="fb_li">
					<view class="fb_li_l">
						<!-- <text>*</text> -->
						服务详细
					</view>
					<textarea class="fb_li_area" v-model="fb_content" placeholder="在此输入服务内容不超过30个字符" maxlength="30"></textarea>
				</view>
				<view class="fb_li" @click="getadd">
					<view class="fb_li_l">
						<!-- <text>*</text> -->商家地址
					</view>
					<view class="fb_li_r">{{fb_add||'请选择地址'}}<text class="iconfont icon-next"></text></view>
				</view>
				<!-- <region-picker @change="region_change" :value="fb_add">
				<view class="fb_li fb_li1">
					<view class="fb_li_l">
						<text>*</text>商家地址
					</view>
					<view v-if="fb_add.length>0" class="fb_li_r">{{fb_add.join(' ')}}<text class="iconfont icon-next"></text></view>
					<view v-else class="fb_li_r">请选择地区<text class="iconfont icon-next"></text></view>
				</view>
				</region-picker>
				<view class="fb_li">
					<input class="fb_li_r fb_li_r1" type="text" v-model="fb_add_xq" placeholder="详细地址（如街道、小区、乡镇、村）">
					<view class="fb_li_l">
						
					</view>
				</view> -->
			</view>
			<view class="fb_btn" @click="fub_fuc">确认入驻</view>
			<view class="fb_xy">
				点击确认入驻表示同意<text>商家入驻规则协议</text>
			</view>
		</view>
		<!-- 阻止滑动 -->
		<!-- <view @touchmove.stop.prevent='test'></view> -->
	</view>
</template>

<script>
	import Vue from 'vue'
	import regionPicker from "@/components/region-picker/region-picker.vue"
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
				tabs:[
					{
						title:' 我的分享',
					},
					{
						title:'发布分享',
					},
				],
				active:0,
				fb_tit:'',
				fb_tel:'',
				fb_content:'',
				fb_add:'',
				fb_add_xq:'',
				real_work:[],   ///照片
				array:[
					{
						title:' 汽车美容',
						id:1
					},
					{
						title:'摩托车',
						id:2
					},
					{
						title:'二手车',
						id:3
					},
					{
						title:'加油站',
						id:4
					},
				],
				tp_index:0
			}
		},
		components: {  
				regionPicker  
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
			 bindPickerChange: function(e) {
					console.log('picker发送选择改变，携带值为', e.detail.value)
					this.tp_index = e.detail.value
			},
			region_change(e){
				console.log(e)
				that.fb_add=e.detail.value
			},
			fub_fuc(){
				var datas={
					fb_tit:that.fb_tit,
					fb_tel:that.fb_tel,
					fb_content:that.fb_content,
					fb_add:that.fb_add,
					type:that.array[that.tp_index].title
					// fb_add_xq:that.fb_add_xq,
				}
				uni.showToast({
					icon:'none',
					title:'发布成功'
				})
				setTimeout(function(){
					uni.navigateTo({
						url:'/pages_my/store_join1/store_join1'
					})
				},1000)
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
						that.fb_add=res.name
					},fail(err) {
						console.log(err);
					}
				});
			},
			del_fuc(item){
				uni.showModal({
				    title: '提示',
				    content: '是否删除该信息',
				    success: function (res) {
				        if (res.confirm) {
										uni.showToast({
											title:'删除成功',
											icon:'none'
										})
				           
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			upimg_fuc(e){
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
							count: 9,
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
					if(edatas.type==2){ //持有证书和荣誉
						 that.real_work.push(datas)
					}
					if (i<imgs.length-1) {
						i++
						that.upimg(imgs, i,e)
					}
					return
					// }
				}
				
				that.$service.wx_upload(imgs[i]).then(res => {
							
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(i)
						// that.img_arr.push(datas)
						
						if(edatas.type==2){ //持有证书和荣誉
							 that.real_work.push(datas)
						}
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
			delimg_fuc(e){
				console.log(e.currentTarget.dataset.idx)
				var datas=e.currentTarget.dataset
				wx.showModal({
					title: '提示',
					content: '确定要删除这张图片吗',
					success (res) {
						if (res.confirm) {
							console.log('用户点击确定')
							if(datas.type==2){
								that.real_work.splice(datas.idx,1)
							}
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			
			
			setcur(index){
				that.active=index
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
.tab_list{
	width: 100%;
	height: 100rpx;
	padding: 0 28rpx;
	background: #fff;
	border-bottom: 1px solid #eee;
	.tab_li{
		display: inline-flex;
		height: 100rpx;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #666666;
		&+.tab_li{
			margin-left: 88rpx;
		}
		&.active{
			color: #4680E6;
			position: relative;
			&::after{
				content: '';
				position: absolute;
				bottom: 14rpx;
				left: 50%;
				width: 68rpx;
				height: 6rpx;
				background: #4680E6;
				border-radius: 3rpx;
				margin-left: -34rpx;
			}
		}
	}
}
.wrap_box{
	width: 100%;
	min-height: 100vh;
	// #ifdef H5
	min-height: calc(100vh -  44px);
	// #endif
	background: #f8f8f8;
	padding-bottom: 30rpx;
}

.fb_box{
	width: 100%;
	.fb_imgs{
		width: 100%;
		height: 364rpx;
		background: #F8F8F8;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.fb_imgs_i{
			width: 51rpx;
			height: 41rpx;
			margin-bottom: 25rpx;
		}
		.fb_imgs_t{
			font-size: 24rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #BBBBBB;
		}
	}
	.fb_img_box{
		width: 100%;
		padding: 18rpx;
		.fb_img_li{
			width: 33.3%;
			height: 170rpx;
			padding: 10rpx;
			position: relative;
			.fb_img_p{
				width: 100%;
				height: 100%;
				border-radius: 12rpx;
				position: relative;
				z-index: 1;
			}
			.fb_img_i{
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 30rpx;
				color: #fff;
				width: 35rpx;
				height: 35rpx;
				position: absolute;
				top: 15rpx;
				right: 15rpx;
				z-index: 100;
			}
		}
	}
	.fb_list{
		width: 100%;
		padding: 0 28rpx ;
		background: #fff;
		.fb_li{
			width: 100%;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding: 10rpx 0;
			&+.fb_li{
				border-top: 1px solid #eee;
			}
			&.fb_li1{
				border-top: 1px solid #eee;
				border-bottom: 1px solid #eee;
			}
			.fb_li_l{
				height: 80rpx;
				display: flex;
				align-items: center;
				font-size: 32rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #333;
				text{
					color: #ED4149;
				}
			}
			.fb_li_r{
				flex: 1;
				text-align: right;
				font-size: 28rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				&.fb_li_r1{
					text-align: left;
				}
			}
			.fb_li_area{
				width: 100%;
				font-size: 28rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #333;
				line-height: 42rpx;
				height: 300rpx;
			}
		}
		
		
	}
}

.fb_btn{
	font-size: 32rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #F5F5F5;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 694rpx;
	height: 90rpx;
	background: #4680E6;
	border-radius: 10rpx;
	margin: 50rpx auto 0;
}
.fb_xy{
	margin-top: 30rpx;
	width: 100%;
	font-size: 24rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #666666;
	text-align: center;
	text{
		color: #4680E6;
	}
}
</style>
