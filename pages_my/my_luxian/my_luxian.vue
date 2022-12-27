<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<u-sticky>
		<view class="tab_list dis_flex ju_a" scroll-x="true">
			<view class="tab_li" :class="{active:active==index}" @click="setcur(index)" v-for="(item,index) in tabs">
				{{item.title}}
			</view>
		</view>
		</u-sticky>
		<view class="zan_list" v-if="active==0">
			<view class="zan_li" v-for="(item,index) in datas" @click="$service.jump" :data-url="'/pages/lx_details/lx_details?id='+item.id">
				<image class="zan_img" :src="$service.getimg(item.banner)" mode="aspectFill"></image>
				<view class="zan_msg">
					 <view class="zan_tit oh2">{{item.title}}</view>
					 <view class="lx_num dis_flex aic" >
						<!-- <view v-if="index==1" class="car_li_sc car_li_sc1 dis_flex aic" >
							<text class="icon icon-xihuan1"></text>
							256
						</view> v-else -->
						<view class="car_li_sc dis_flex aic" >
							<text class="icon icon-xihuan"></text>
							{{item.zan||0}}
						</view>
						<view class="li_cz" @click.stop="edit_fuc(item)">编辑</view>
						<view class="li_cz" @click.stop="del_fuc(item)">删除</view>
					 </view>
				</view>
			</view>
			<uni-load-more v-if="listc_status" :status="listc_status" :contentText="contentText"></uni-load-more>
		</view>
		<view class="fb_box" v-if="active==1">
			<view class="fb_imgs"  @click="upimg_fuc" data-type="2"  data-idx="0">
				<image class="fb_imgs_i" src="/static/images/icon_upimg.png" mode="aspectFit"></image>
				<view class="fb_imgs_t">添加图片</view>
			</view>
			<view class="fb_img_box dis_flex fww">
				<view class="fb_img_li" v-for="(item,index) in banner">
					<image class="fb_img_p" :src="$service.getimg(item)" mode="aspectFill"></image>
					<view class="fb_img_i "  @click="delimg_fuc"  data-type="2" :data-idx="index">
						<text class="iconfont icon-shanchu1"></text>
					</view>
				</view>
			</view>
			<view class="fb_list">
				<view class="fb_li">
					<view class="fb_li_l">
						<text>*</text>标题
					</view>
					<input class="fb_li_r" type="text" v-model="title" placeholder="请填写标题">
				</view>
				<view class="fb_li" @click="getadd">
					<view class="fb_li_l">
						<text>*</text>地址
					</view>
					<view class="fb_li_r">{{address||'请选择地址'}}<text class="iconfont icon-next"></text></view>
				</view>
				<view class="fb_li" style="overflow: hidden;">
					<view class="fb_li_l">
						<text>*</text>内容描述
					</view>
					<textarea class="fb_li_area" v-model="content" placeholder="请填写内容描述" maxlength="-1"></textarea>
				</view>
				
				<view class="fb_btn" @click="fub_fuc">确认发布</view>
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
				listc_status:'loading',
				contentText:{contentdown: "上拉显示更多",contentrefresh: "正在加载...",contentnomore: "暂无数据"},
				datas:[],
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
				title:'',
				content:'',
				address:'',
				address1:'',
				lat:'',
				lng:'',
				banner:[],   ///照片
				
				datas_edit:''
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
			if(e.type){
				that.active=e.type
			}
			// that.getdata()
		},
		onShow() {
			that.onRetry()
		},
		onReachBottom() {
			if(that.active==0){
				that.getdatas()
			}
			
			
		},
		
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			edit_fuc(item){
				var jkurl='/detail/routes'
				var datas={
					id:item.id
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
				
						// if (typeof datas == 'string') {
						// 	datas = JSON.parse(datas)
						// }
						console.log(res)
						
						that.datas_edit=datas
						that.set_fuc(datas)
						setTimeout(function(){
							that.active=1
						},100)
					} else {
							that.btnkg=0
					
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
			onRetry(){
					that.page=1
					that.datas=[]
					that.getdatas()
			},
			set_fuc(datas){
				if(!datas){
					datas={
						title:'',
						banner:'',
						address:'',
						lat:'',
						lng:'',
						content:'',
					}
					that.datas_edit=''
				}
				that.title=datas.title||''
				that.banner=datas.banner||''
				that.address=datas.address||''
				that.lat=datas.lat||''
				that.lng=datas.lng||''
				that.content=datas.content||''
			},
			/**
			 * 列表
			 */
			getdatas(){
				// /index/store
				var datas={
					// store_id:'',
					// lat:that.addmsg.latitude||'',
					// lng:that.addmsg.longitude||'',
					// is_hot:'',//是否热门推荐 1、是 2、否
					// search:'',
					page:that.page,
					limit:16,
					is_my:1
				}
				var jkurl='/index/routes'
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
			
			fub_fuc(){
				var jkurl='/sub/routes'
				var datas={
					title:that.title,
					banner:that.banner.join(','),
					address:that.address,
					lat:that.lat,
					lng:that.lng,
					content:that.content,
				}
				if(that.datas_edit.id){
					datas={
						id:that.datas_edit.id,
						...datas
					}
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
				
						// if (typeof datas == 'string') {
						// 	datas = JSON.parse(datas)
						// }
						console.log(res)
						
						uni.showToast({
							icon:'none',
							title:'提交成功'
						})
						that.set_fuc()
						setTimeout(function(){
							that.active=0
							that.btnkg=0
							that.onRetry()
						},1000)
					} else {
							that.btnkg=0
					
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
			getadd(){
				console.log(1)
				uni.chooseLocation({
					success: res => {
						// this.value5 = res.name
						console.log('当前位置的：');
						console.log(res);
						that.address1=res.address//地址
						that.lng=res.longitude//经度  
						that.lat=res.latitude//纬度  
						that.address=res.name
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
										// var type=that.active+1
										var type=4
										var datas={
											id: item.id,
											type:type
										}
													
										var jkurl='/operate/del'
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
												that.onRetry()
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
						 that.banner.push(datas)
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
							 that.banner.push(datas)
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
								that.banner.splice(datas.idx,1)
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
	background: #fff;
}
.zan_list{
	width: 100%;
	.zan_li{
		width: 100%;
		padding: 22rpx 28rpx;
		display: flex;
		.zan_img{
			width: 240rpx;
			height: 160rpx;
			margin-right: 29rpx;
		}
		.zan_msg{
			flex: 1;
			.zan_tit{
				font-size: 32rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #333333;
				line-height: 42rpx;
				height: 84rpx;
			}
			.lx_num{
				margin-top: 40rpx;
				width: 100%;
				.car_li_sc{
					font-size: 28rpx;
					font-family: Arial;
					font-weight: 400;
					color: #999999;
					flex: 1;
					text{
						margin-right: 15rpx;
					}
					&.car_li_sc1{
						color: #E2382F;
					}
				}
				.li_num{
					font-size: 28rpx;
					font-family: Arial;
					font-weight: 400;
					color: #E2382F;
				}
				.li_cz{
					margin-left: 20rpx;
					font-size: 24rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #999999;
				}
			}
		}
	}
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
		padding: 0 28rpx 30rpx;
		.fb_li{
			width: 100%;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding: 10rpx 0;
			&+.fb_li{
				border-top: 1px solid #eee;
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
			}
			.fb_li_area{
				width: 100%;
				font-size: 28rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				// color: #DDDDDD;
				line-height: 42rpx;
				height: 300rpx;
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
	}
}
</style>
