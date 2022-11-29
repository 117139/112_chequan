<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<view class="jb_tip">填写详细资料有助于我们更快地帮您解决</view>
		<view class="jb_text">
			<view class="jb_tit">
				举报原因<text>*</text>
			</view>
			<textarea maxlength="200" class="jb_content" v-model="jb_content" placeholder="请填写您举报的原因（字数200字以内）"></textarea>
		</view>
		<view class="jb_text">
			<view class="jb_tit">
				相关凭证
			</view>
			<view class="imgs_list">
				<view class="imgs_li">
					<view class="imgs_li_box" @click="upimg_fuc" data-type="1"  data-idx="0">
						<text class="iconfont icon-paizhao-xianxing"></text>
					</view>
				</view>
				<view class="imgs_li"  v-for="(item,index) in goods_img">
					<view class="imgs_li_box">
						<image class="imgs_li_img" :src="$service.getimg(item)" mode="aspectFill"></image>
						<view class="imgs_li_del dis_flex aic ju_c"  @click="delimg_fuc"  data-type="1" :data-idx="index">
							<image src="/static/images/del_img.png" mode="aspectFit"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="sub_btn" @click="sub_fuc">提交</view>
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
				jb_content:'',
				goods_img:[]
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
			
			// that.getdata()
		},
		onShow() {
			// that.onRetry()
		},
		
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			sub_fuc(){
				
				if(!that.jb_content){
					uni.showToast({
						icon:'none',
						title:'请填写您举报的原因'
					})
					return
				}
				uni.showToast({
					icon:'none',
					title:'提交成功'
				})
				setTimeout(function(){
					uni.navigateBack()
				},1000)
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
							count:9,
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
						 that.goods_img.push(datas)
					}else if(edatas.type==2){ //商品详情图
						 that.goodsxq_img.push(datas)
					}else if(edatas.type==3){ //mt照片
						that.mt_img.push(datas)
					}else if(edatas.type==4){ //mt照片
						that.mtxq_img.push(datas)
					}else if(edatas.type==5){ //身份证
						that.certificate.push(datas)
					}else{ //上传本人照片
						that.real_img=datas
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
			delimg_fuc(e){
				console.log(e.currentTarget.dataset.idx)
				var datas=e.currentTarget.dataset
				wx.showModal({
					title: '提示',
					content: '确定要删除这张图片吗',
					success (res) {
						if (res.confirm) {
							console.log('用户点击确定')
							if(datas.type==1){
								that.goods_img.splice(datas.idx,1)
							}else if(datas.type==2){
								that.goodsxq_img.splice(datas.idx,1)
							}else if(datas.type==3){
								that.mt_img.splice(datas.idx,1)
							}else if(datas.type==4){
								that.mtxq_img.splice(datas.idx,1)
							}else if(datas.type==5){
								that.certificate.splice(datas.idx,1)
							}
							if(datas.type=='v1'){
								that.mt_video.splice(datas.idx,1)
							}
							// that.sethd()
							// that.img_list=that.img_list
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
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
}
.jb_tip{
	width: 100%;
	padding: 0 28rpx;
	height: 72rpx;
	display: flex;
	align-items: center;
	font-size: 24rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #999999;
}
.jb_text{
	margin-bottom: 20rpx;
	width: 100%;
	padding: 28rpx;
	background: #fff;
	.jb_tit{
		font-size: 32rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #333333;
		margin-bottom: 20rpx;
		text{
			color: #ed4149;
		}
	}
	.jb_content{
		width: 100%;
		height: 200rpx;
		font-size: 28rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #333;
		line-height: 40rpx;
	}
	.imgs_list{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		.imgs_li{
			width: 180rpx;
			height: 180rpx;
			padding: 10rpx;
			.imgs_li_box{
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #F8F8F8;
				border-radius: 10rpx;
				position: relative;
				text{
					font-size: 50rpx;
					color: #ddd;
				}
				.imgs_li_img{
					border-radius: 10rpx;
					width: 100%;
					height: 100%;
					position: relative;
					z-index: 1;
				}
				.imgs_li_del{
					position: absolute;
					top: -4rpx;
					right: -4rpx;
					z-index: 100;
					width: 30rpx;
					height: 30rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
}
.sub_btn{
	width: 694rpx;
	height: 90rpx;
	background: #FDC113;
	border-radius: 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 32rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #FFFFFF;
	margin: 100rpx auto;
}
</style>
