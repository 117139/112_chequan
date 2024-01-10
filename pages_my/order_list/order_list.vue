<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<u-sticky>
		<scroll-view class="tab_list scroll_x" scroll-x="true">
			<view>
				<view class="tab_li" :class="{active:active==index}" @click="setcur(index)" v-for="(item,index) in tabs">
					{{item.title}}
				</view>
			</view>
		</scroll-view>
		</u-sticky>
		<view v-if="active==0" class="datas_list">
			<!-- 状态 1、待支付 2、待办 3、信息有误 4、已完成 -->
			<view class="datas_li" v-for="(item,index) in datas" @click="$service.jump" :data-url="'/pagesA/rgc_zt_jg/rgc_zt_jg?type=1&code='+item.code">
				<image v-if="item.status==1" class="datas_li_st" src="/static/images/o_type.png" mode="aspectFill"></image>
				<image v-if="item.status==2" class="datas_li_st" src="/static/images/o_type0.png" mode="aspectFill"></image>
				<image v-if="item.status==3" class="datas_li_st" src="/static/images/o_type4.png" mode="aspectFill"></image>
				<image v-if="item.status==4" class="datas_li_st" src="/static/images/o_type2.png" mode="aspectFill"></image>
				<view class="datas_li_cname">
					{{item.province||''}}{{item.car_code||''}}
				</view>
				<view class="datas_li_msg">
					支付金额：￥{{item.price||'0'}}
				</view>
				<view class="datas_li_msg">
					车辆状态：-
				</view>
				<view class="datas_li_msg">
					订单编号：{{item.code||''}}
				</view>
				<view class="datas_li_msg">
					下单时间：{{item.create_time||''}}
				</view>
				<view class="down_btn" v-if="item.status==4&&item.result&&item.result.length>0" @click.stop="down_fuc(1,item.result)">
					一键下载图片
				</view>
				<view class="down_btn" v-if="item.status==3" @click.stop="reset_fuc(item,1)">
					重新提交
				</view>
			</view>
			
			<uni-load-more v-if="listc_status" :status="listc_status" :contentText="contentText"></uni-load-more>
		</view>
		<view v-if="active==1" class="datas_list">
			<view class="datas_li" v-for="(item,index) in datas" @click="jump_nj(item)" :data-url="'/pagesA/rgc_nj_order3/rgc_nj_order3?type=1'">
				<image v-if="item.status==1" class="datas_li_st" src="/static/images/o_type.png" mode="aspectFill"></image>
				<image v-if="item.status==2" class="datas_li_st" src="/static/images/o_type01.png" mode="aspectFill"></image>
				<image v-if="item.status==3" class="datas_li_st" src="/static/images/o_type0.png" mode="aspectFill"></image>
				<image v-if="item.status==4" class="datas_li_st" src="/static/images/o_type2.png" mode="aspectFill"></image>
				<!-- <image v-if="index==2" class="datas_li_st" src="/static/images/o_type2.png" mode="aspectFill"></image> -->
				<!-- <image v-if="index==3" class="datas_li_st" src="/static/images/o_type3.png" mode="aspectFill"></image> -->
				<!-- <image v-else-if="index==4" class="datas_li_st" src="/static/images/o_type4.png" mode="aspectFill"></image> -->
				<view class="datas_li_cname">
					{{item.province||''}}{{item.car_code||''}}
				</view>
				<view class="datas_li_msg">
					支付金额：￥{{item.price||'0'}}
				</view>
				<view class="datas_li_msg">
					办理方式：{{item.nj_type==1?'线上年检':'线下年检'}}
				</view>
				<view class="datas_li_msg">
					订单编号：{{item.code||''}}
				</view>
				<view class="datas_li_msg">
					下单时间：{{item.create_time||''}}
				</view>
			</view>
			
			<uni-load-more v-if="listc_status" :status="listc_status" :contentText="contentText"></uni-load-more>
		</view>
		<view v-if="active==2" class="datas_list">
			<view class="datas_li" v-for="(item,index) in datas" @click="$service.jump" :data-url="'/pagesA/rgc_sb_jg/rgc_sb_jg?code='+item.code">
				<!-- <image v-if="index==1" class="datas_li_st" src="/static/images/o_type1.png" mode="aspectFill"></image> -->
				<!-- <image v-if="index==2" class="datas_li_st" src="/static/images/o_type2.png" mode="aspectFill"></image> -->
				<!-- <image v-if="index==3" class="datas_li_st" src="/static/images/o_type3.png" mode="aspectFill"></image> -->
				<!-- <image v-else-if="index==4" class="datas_li_st" src="/static/images/o_type4.png" mode="aspectFill"></image> -->
				<!-- <image v-else class="datas_li_st" src="/static/images/o_type0.png" mode="aspectFill"></image> -->
				<view class="datas_li_cname">
					车型识别
				</view>
				<!-- <view class="datas_li_msg">
					支付金额：￥{{item.price||'0'}}
				</view> -->
				<view class="datas_li_msg">
					车辆识别号：{{item.vin||''}}
				</view>
				<view class="datas_li_msg">
					订单编号：{{item.code||''}}
				</view>
				<view class="datas_li_msg">
					下单时间：{{item.create_time||''}}
				</view>
			</view>
			
			<uni-load-more v-if="listc_status" :status="listc_status" :contentText="contentText"></uni-load-more>
		</view>
		<view v-if="active==3" class="datas_list">
			<!-- 订单状态 1、待支付 2、信息有误 3、待处理 4、无违章 5、有违章 -->
			<view class="datas_li" v-for="(item,index) in datas" @click="jump_fuc(item)"  :data-url="'/pagesA/rgc_zt_jg/rgc_zt_jg?type=4&code='+item.code">
				<!-- <image v-if="index==1" class="datas_li_st" src="/static/images/o_type1.png" mode="aspectFill"></image> -->
				<!-- <image v-if="index==2" class="datas_li_st" src="/static/images/o_type2.png" mode="aspectFill"></image> -->
				<image v-if="item.status==1" class="datas_li_st" src="/static/images/o_type.png" mode="aspectFill"></image>
				<image v-if="item.status==2" class="datas_li_st" src="/static/images/o_type4.png" mode="aspectFill"></image>
				<image v-if="item.status==3" class="datas_li_st" src="/static/images/o_type0.png" mode="aspectFill"></image>
				<image v-if="item.status==4" class="datas_li_st" src="/static/images/o_type3.png" mode="aspectFill"></image>
				<image v-if="item.status==5" class="datas_li_st" src="/static/images/o_type5.png" mode="aspectFill"></image>
				<view class="datas_li_cname">
					{{item.province||''}}{{item.car_code||''}}
				</view>
				<view class="datas_li_msg">
					支付金额：￥{{item.price||'0'}}
				</view>
				<view class="datas_li_msg">
					<text  v-if="item.status==4">违章信息：恭喜您该车无违章</text>
					<text v-else-if="item.status==5">违章信息：该车有违章</text>
					<text v-else>违章信息：-</text>
				</view>
				<view class="datas_li_msg">
					订单编号：{{item.code||''}}
				</view>
				<view class="datas_li_msg">
					下单时间：{{item.create_time||''}}
				</view>
				<view class="down_btn" v-if="item.status==5&&item.result&&item.result.length>0" @click.stop="down_fuc(1,item.result)">
					一键下载图片
				</view>
				<view class="down_btn" v-if="item.status==2" @click.stop="reset_fuc(item,4)">
					重新提交
				</view>
			</view>
			
			<uni-load-more v-if="listc_status" :status="listc_status" :contentText="contentText"></uni-load-more>
		</view>
		<view v-if="active==4" class="datas_list">
			<!-- 订单状态 1、待支付 2、信息有误 3、待处理 4、无违章 5、有违章 -->
			<view class="datas_li" v-for="(item,index) in datas" @click="$service.jump"  :data-url="'/pagesA/rgc_mfpg_jg/rgc_mfpg_jg?type=4&code='+item.code">
				<!-- <image v-if="index==1" class="datas_li_st" src="/static/images/o_type1.png" mode="aspectFill"></image> -->
				<!-- <image v-if="index==2" class="datas_li_st" src="/static/images/o_type2.png" mode="aspectFill"></image> -->
				<image v-if="item.status==1" class="datas_li_st" src="/static/images/o_type.png" mode="aspectFill"></image>
				<image v-if="item.status==2" class="datas_li_st" src="/static/images/o_type4.png" mode="aspectFill"></image>
				<image v-if="item.status==3" class="datas_li_st" src="/static/images/o_type0.png" mode="aspectFill"></image>
				<image v-if="item.status==4" class="datas_li_st" src="/static/images/o_type3.png" mode="aspectFill"></image>
				<image v-if="item.status==5" class="datas_li_st" src="/static/images/o_type5.png" mode="aspectFill"></image>
				<view class="datas_li_cname">
					{{item.car_version||''}}{{item.car_code||''}}
				</view>
				<!-- <view class="datas_li_msg">
					支付金额：￥{{item.price||'0'}}
				</view>
				<view class="datas_li_msg">
					<text  v-if="item.status==4">违章信息：恭喜您该车无违章</text>
					<text v-else-if="item.status==5">违章信息：该车有违章</text>
					<text v-else>违章信息：-</text>
				</view> -->
				<view class="datas_li_msg">
					订单编号：{{item.code||''}}
				</view>
				<view class="datas_li_msg">
					下单时间：{{item.create_time||''}}
				</view>
				<!-- <view class="down_btn" v-if="item.status==5&&item.result&&item.result.length>0" @click.stop="down_fuc(1,item.result)">
					一键下载图片
				</view>
				<view class="down_btn" v-if="item.status==2" @click.stop="reset_fuc(item,4)">
					重新提交
				</view> -->
			</view>
			
			<uni-load-more v-if="listc_status" :status="listc_status" :contentText="contentText"></uni-load-more>
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
				tabs:[
					{
						title:'人工查状态',
						idx:'2'
					},
					{
						title:'急速年检',
						idx:'3'
					},
					{
						title:'车型识别',
						idx:'5'
					},
					{
						title:'人工查违章',
						idx:'6'
					},
					{
						title:'免费评估',
						idx:'6'
					},
				],
				options:'',
				datas:'',
				page:1,
				active:0,
				listc_status:'loading',
				contentText:{contentdown: "上拉显示更多",contentrefresh: "正在加载...",contentnomore: "暂无数据"},
			}
		},
		computed: {
		...mapState(['hasLogin', 'forcedLogin', 'userName','navdata', 'userinfo','loginDatas']),
		},
		
		onLoad(e) {
			that=this
			that.options=e||{}
			that.active=e.type||0
			console.log(e)
			
			// that.getdata()
		},
		onShow() {
			that.onRetry()
		},
		onReachBottom() {
			that.getlist()
		},
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			jump_nj(item){
				// 状态 1、待支付 2、待上传 3、待办理 4、已完成/已寄出
				if(item.status==1){
					uni.navigateTo({
						url:'/pagesA/rgc_nj_order0/rgc_nj_order0?code='+item.code
					})
				}
				if(item.status==2){
					uni.navigateTo({
						url:'/pagesA/rgc_nj_order1/rgc_nj_order1?code='+item.code
					})
				}
				if(item.status==3){
					uni.navigateTo({
						url:'/pagesA/rgc_nj_order2/rgc_nj_order2?code='+item.code
					})
				}
				if(item.status==4){
					uni.navigateTo({
						url:'/pagesA/rgc_nj_order3/rgc_nj_order3?code='+item.code
					})
				}
			},
			reset_fuc(item,type){
				item=JSON.stringify(item)
				if(that.active==0){
					uni.redirectTo({
						url:'/pagesA/rgc_zt/rgc_zt?code='+item.code+'&datas='+item
					})
				}
				if(that.active==3){
					uni.redirectTo({
						url:'/pagesA/rgc_wz/rgc_wz?code='+item.code+'&datas='+item
					})
				}
			},
			onRetry(){
					that.page=1
					that.datas=[]
					that.getlist()
			},
			/**
			 * 列表
			 */
			getlist(){
				// /index/store
				var datas={
					// store_id:'',
					// lat:that.addmsg.latitude||'',
					// lng:that.addmsg.longitude||'',
					// is_hot:'',//是否热门推荐 1、是 2、否
					// search:'',
					page:that.page,
					limit:20,
				}
				var jkurl='/order/cstatus'
				if(that.active==0){
					jkurl='/order/cstatus'
				}
				if(that.active==1){
					jkurl='/order/yearly'
				}
				if(that.active==2){
					jkurl='/order/carvin'
				}
				if(that.active==3){
					jkurl='/order/violation'
				}
				if(that.active==4){
					jkurl='/Publics/assessList'
				}
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
			down_fuc(num,datas){
				if(!num){
					num=1
				}
				if(datas.length<1){
					return
				}
				uni.showLoading({
					mask:true,
					title:"正在保存图片"+num+'/'+datas.length
				})
				var idx=num-1
				var url=that.$service.getimg(datas[idx])
				const downloadTask = uni.downloadFile({
					url: url,
					success: (res) => {
						if (res.statusCode === 200) {
							console.log('下载成功');
							uni.hideLoading()
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success(res_m) {
									if(num==datas.length){
										uni.showToast({
											icon:'none',
											title:'保存成功'
										})
									}else{
										num++
										uni.hideLoading()
										that.down_fuc(num,datas)
									}
								}
							})
							
							
						}
					},
					fail() {
						uni.hideLoading()
						uni.showToast({
							icon:'none',
							title:'保存失败'
						})
					}
				});
				
				downloadTask.onProgressUpdate((res) => {
					console.log('下载进度' + res.progress);
					console.log('已经下载的数据长度' + res.totalBytesWritten);
					console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
				
					// 满足测试条件，取消下载任务。
					// if (res.progress > 50) {
					// 	downloadTask.abort();
					// }
				});
				
			},
			sub_fuc(){
				// uni.showToast({
				// 	icon:'none',
				// 	title:'提交成功'
				// })
				if(that.active==0){
					uni.navigateTo({
						url:'/pagesA/rgc_zt/rgc_zt'
					})
				}
				if(that.active==3){
					uni.navigateTo({
						url:'/pagesA/rgc_wz/rgc_wz'
					})
				}
			},
			jump_fuc(item){
				if(item.status!=4){
					uni.navigateTo({
						url:'/pagesA/rgc_zt_jg/rgc_zt_jg?type=4&code='+item.code
					})
				}
			},
			setcur(index){
				that.active=index
				that.onRetry()
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
.tab_list{
	width: 100%;
	height: 100rpx;
	padding: 0 28rpx;
	background: #f8f8f8;
	box-sizing: border-box;
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
			margin-left: 60rpx;
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
.datas_list{
	width: 100%;
	padding:10rpx 28rpx 28rpx;
	.datas_li{
		width: 100%;
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 42rpx 28rpx;
		position: relative;
		&+.datas_li{
			margin-top: 22rpx;
		}
		.datas_li_st{
			position: absolute;
			top: 0;
			right: 0;
			width: 100rpx;
			height: 100rpx;
		}
		.datas_li_cname{
			font-size: 32rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
			padding-left: 19rpx;
			position: relative;
			margin-bottom: 14rpx;
			&::after{
				position: absolute;
				left: 0;
				content: '';
				width: 6rpx;
				height: 28rpx;
				background: #4680E6;
				border-radius: 3rpx;
				top: 50%;
				margin-top: -14rpx;
			}
		}
		.datas_li_msg{
			font-size: 28rpx;
			line-height: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #999999;
			padding: 12rpx 0;
		}
		.down_btn{
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 80rpx;
			background: #4680E6;
			border-radius: 10rpx;
			margin-top: 22rpx;
		}
	}
}
</style>
