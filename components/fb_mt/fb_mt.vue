<template>
	<view>
		<view class="fb_box">
			<view class="fb_li">
				<view class="fb_li_l">
					<text>*</text>摩托名称
				</view>
				<input class="fb_li_r" type="text" v-model="fb_tit_mt" placeholder="请填写摩托名称">
			</view>
			<view class="fb_li">
				<view class="fb_li_l">
					<text>*</text>厂商价
				</view>
				<input class="fb_li_r" type="number" v-model="fb_pri_cj_mt" placeholder="请填写厂商价">
			</view>
			<view class="fb_li">
				<view class="fb_li_l">
					<text>*</text>价格
				</view>
				<input class="fb_li_r" type="number" v-model="fb_pri_mt" placeholder="请填写价格">
			</view>
			<!-- <view class="fb_li">
				<view class="fb_li_l">
					<text>*</text>
					商品描述
				</view>
				<textarea class="fb_li_area" v-model="fb_content" placeholder="请填写商品描述" maxlength="-1"></textarea>
			</view> -->
			<view class="fb_li">
				<view class="fb_li_l">
					<text>*</text>
					上传摩托图片
				</view>
				<view class="imgs_list">
					<view class="imgs_li">
						<view class="imgs_li_box" @click="upimg_fuc" data-type="3"  data-idx="0">
							<text class="iconfont icon-paizhao-xianxing"></text>
						</view>
					</view>
					<view class="imgs_li"  v-for="(item,index) in mt_img">
						<view class="imgs_li_box">
							<image class="imgs_li_img" :src="$service.getimg(item)" mode="aspectFill"></image>
							<view class="imgs_li_del dis_flex aic ju_c"  @click="delimg_fuc"  data-type="3" :data-idx="index">
								<image src="/static/images/del_img.png" mode="aspectFit"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="fb_li">
				<view class="fb_li_l">
					<!-- <text>*</text> -->
					上传摩托视频
				</view>
				<view class="imgs_list">
					<view class="imgs_li">
						<view class="imgs_li_box" @click="upvideo_fuc" data-type="v1"  data-idx="0">
							<text class="iconfont icon-paizhao-xianxing"></text>
						</view>
					</view>
					<view class="imgs_li"  v-for="(item,index) in mt_video">
						<view class="imgs_li_box">
							<image class="imgs_li_img" :src="$service.getimg(item)" mode="aspectFill"></image>
							<view class="imgs_li_del dis_flex aic ju_c"  @click="delimg_fuc1"  data-type="v1" :data-idx="index">
								<image src="/static/images/del_img.png" mode="aspectFit"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="fb_li">
				<view class="fb_li_l">
					<text>*</text>
					摩托详情
				</view>
				<textarea class="fb_li_area" v-model="mt_content" placeholder="请填写摩托详情" maxlength="-1"></textarea>
			</view>
			<view class="fb_li">
				<view class="fb_li_l">
					<text>*</text>
					上传摩托详情图片
				</view>
				<view class="imgs_list">
					<view class="imgs_li">
						<view class="imgs_li_box" @click="upimg_fuc" data-type="4"  data-idx="0">
							<text class="iconfont icon-paizhao-xianxing"></text>
						</view>
					</view>
					<view class="imgs_li"  v-for="(item,index) in mtxq_img">
						<view class="imgs_li_box">
							<image class="imgs_li_img" :src="$service.getimg(item)" mode="aspectFill"></image>
							<view class="imgs_li_del dis_flex aic ju_c"  @click="delimg_fuc"  data-type="4" :data-idx="index">
								<image src="/static/images/del_img.png" mode="aspectFit"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="fb_li">
				<view class="fb_li_l">
					信息置顶
				</view>
				<view class="flex_1"></view>
				<u-switch v-model="dz_type" @change="dzchange" activeColor="#4680E6"></u-switch>
				<!-- <input class="fb_li_r" type="text" v-model="fb_tit" placeholder="请填写服务标题"> -->
			</view>
			<view v-if="dz_type" class="fb_li">
				<view class="fb_li_l">
					扣除金额
				</view>
				<view class="flex_1 fb_hyzk"><!-- 商家会员85折 --></view>
				<view class="fb_mon">
					￥{{p_config.top_price2}}
				</view>
			</view>
			<picker v-if="dz_type" @change="bindPickerChange_pay" :value="pay_index" :range="pay_array" range-key="title">
			<view class="fb_li fb_li2">
				<view class="fb_li_l">
					<text>*</text>支付方式
				</view>
				<!-- <input class="fb_li_r" type="text" v-model="color" placeholder="请填写车辆颜色"> -->
				<view class="fb_li_r fb_li_r2">{{pay_array[pay_index].title||'请选择支付方式'}}</view>
				<text class="iconfont icon-31xiala"></text>
			</view>
			</picker>
		</view>
		<view class="b_box">
			<view class="b_box1">
				<view class="b_btn" @click="sub_fuc">确认发布</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		name:"fb_mt",
		props: {
			type1:{
				type: String,
				default: ''
			},
			options:{
				type: Object,
				default: function(){
					return {}
				}
			},
		},
		data() {
			return {
				btnkg:0,
				datas:'',
				
				fb_tit_mt:'',
				fb_pri_cj_mt:'',
				fb_pri_mt:'',
				mt_img:[],
				mt_video:[],
				mt_content:'',
				mtxq_img:[],
				
				dz_type:false,
				pay_array:[
					{
						title:'微信支付',
						id:1
					},
					{
						title:'支付宝',
						id:2
					},
				],
				pay_index:0,
			};
		},
		computed: {
				
				...mapState(['loginDatas','p_config','car_info','car_info_hot','car_info_all']),
		},
		mounted() {
			if(this.options.id){
				console.log(this.options.id)
				this.getdata()
			}
			// if(this.car_info_all){
			// 	this.pp_list=this.car_info_all
			// 	console.log(this.car_info_all)
			// 	this.getdata1()
			// }
		},
		methods:{
			test(){},
			dzchange(e){
				console.log(e)
			},
			bindPickerChange_pay: function(e) {
					this.pay_index = e.detail.value
			},
			getdata(){
				var that=this
				var datas={
					id: that.options.id,
					is_my:1
				}
				var jkurl='/detail/motorcycle'
				
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
						that.fb_tit_mt=datas.title
						
						that.fb_pri_cj_mt=datas.y_price
						that.fb_pri_mt=datas.price
						that.mt_content=datas.content
						
						that.mt_img=datas.banner||[]
						that.mt_video=datas.banner_video||[]
						that.mtxq_img=datas.content_img||[]
						that.dz_typ=datas.is_top==1?true:false
						
						
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
			
			sub_fuc(){
				var that=this
				// var goods_img=that.goods_img.join(',')
				// var goodsxq_img=that.goodsxq_img.join(',')
				
				
					if(!that.fb_tit_mt){
						uni.showToast({
							icon:'none',
							title:'请填写摩托名称'
						})
						return
					}
					if(!that.fb_pri_cj_mt){
						uni.showToast({
							icon:'none',
							title:'请填写厂商价'
						})
						return
					}
					if(!that.fb_pri_mt){
						uni.showToast({
							icon:'none',
							title:'请填写价格'
						})
						return
					}
					if(that.mt_img.length==0){
						uni.showToast({
							icon:'none',
							title:'请上传商品图'
						})
						return
					}
					if(!that.mt_content){
						uni.showToast({
							icon:'none',
							title:'请填写摩托详情'
						})
						return
					}
					if(that.mtxq_img.length==0){
						uni.showToast({
							icon:'none',
							title:'请上传摩托详情图片'
						})
						return
					}
					var mt_img=that.mt_img.join(',')
					var mt_video=that.mt_video.join(',')
					var mtxq_img=that.mtxq_img.join(',')
					var datas={
						title:that.fb_tit_mt,
						y_price:that.fb_pri_cj_mt,
						price:that.fb_pri_mt,
						banner:mt_img,
						banner_video:mt_video,
						content:that.mt_content,
						content_img:mtxq_img,
						is_top:that.dz_type?1:2
					}
				if(this.options.id){
					console.log(this.options.id)
					datas={
						id:this.options.id,
						...datas
					}
				}
				
				
				
				
				
				console.log(datas)
				// return
				var jkurl='/sub/motorcycle'
				
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
						if(that.dz_type){
							that.pay_fuc(datas)
							return
						}
						uni.showToast({
							icon:'none',
							title:'提交成功'
						})
						setTimeout(function(){
							that.btnkg=0
							if(that.options.id){
								uni.redirectTo({
									// url:'/pages_my/my_fabu/my_fabu'
									url:'/pages_my/store_fb_ok/store_fb_ok?edit=1&type=1&type1='+that.type1
								})
								return
							}
							uni.redirectTo({
								// url:'/pages_my/my_fabu/my_fabu'
								url:'/pages_my/store_fb_ok/store_fb_ok?type=1&type1='+that.type1
							})
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
					
				// console.log(datas)
				// uni.showToast({
				// 	icon:'none',
				// 	title:'发布成功'
				// })
				// setTimeout(function(){
				// 	uni.redirectTo({
				// 		// url:'/pages_my/my_fabu/my_fabu'
				// 		url:'/pages_my/store_fb_ok/store_fb_ok?type='+that.options.type+'&type1='+that.options.type1
				// 	})
				// },1000)
			},
			pay_fuc(code){
				var that =this
				var jkurl='/sub/usedcar'
				var datas={
					code :code,
					type:that.pay_array[that.pay_index].id
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
						var provider=''
						// 支付宝
						if (that.pay_type == 2) {
							provider='alipay'
							
						}
						//微信
						if (that.pay_type == 1) {
							console.log('datas----------------------------------------->')
							console.log(typeof datas)
							console.log(datas)
							provider='wxpay'
							
						}
						uni.requestPayment({
							provider: provider,
							orderInfo: datas, //微信、支付宝订单数据
							success: function(res) {
								console.log('success:' + JSON.stringify(res));
								that.gook_fuc()
							},
							fail: function(err) {
								that.btnkg = 0
								console.log('fail:' + JSON.stringify(err));
								uni.showModal({
									content: "支付失败",
									showCancel: false
								})
							}
						});
						
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
			gook_fuc(){
				uni.showToast({
					icon:'none',
					title:'发布成功'
				})
				setTimeout(function(){
					that.btnkg=0
					uni.redirectTo({
						// url:'/pages_my/my_fabu/my_fabu'
						url:'/pages_my/store_fb_ok/store_fb_ok?type=1&type1='+that.type1
					})
				},1000)
			},
			upimg_fuc(e){
				var that=this
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
			  
			  	var that=this
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
							that.goods_img.push(datas)
						}else if(edatas.type==2){ //商品详情图
							 that.goodsxq_img.push(datas)
						}else if(edatas.type==3){ //工作照片
							that.mt_img.push(datas)
						}else if(edatas.type==4){ //工作照片
							that.mtxq_img.push(datas)
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
				var that=this
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
			upvideo_fuc(e){
				var that=this
				var edatas=e.currentTarget.dataset
				uni.showActionSheet({
					itemList: ['拍摄', '相册选择'],
					success: function(res) {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						var sourceType = ['camera', 'album']
						if (res.tapIndex == 0) {
							sourceType = ['camera']
						} else {
							sourceType = ['album']
						}
						// var len=that.img_arr
						uni.chooseVideo({
							sourceType: sourceType,
							success: function(res) {
								console.log(res)
								const tempFilePath = res.tempFilePath
								
								// const imglen = that.img_list.length
								var arr=[]
								arr.push(tempFilePath)
								that.upimg1(arr, 0,e)
								
							}
						});
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			upimg1(imgs, i,e) {
			  
			  	var that=this
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
							that.goods_img.push(datas)
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
			delimg_fuc1(e){
				var that=this
				console.log(e.currentTarget.dataset.idx)
				var datas=e.currentTarget.dataset
				wx.showModal({
					title: '提示',
					content: '确定要删除该视频吗',
					success (res) {
						if (res.confirm) {
							console.log('用户点击确定')
							
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
			
		}
	}
</script>

<style lang="scss" scoped>
@import "@/common/css/fabu.scss";
page{
	// background: #fff;
}
.wrap_box{
	background: #f8f8f8;
	padding-bottom: 200rpx;
}
.fb_tabs{
	width: 100%;
	height: 112rpx;
	background: #FFFFFF;
	padding: 0 28rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.tabs_li{
		font-size: 30rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #333333;
		position: relative;
		&.active{
			color: #4680E6;
			&::after{
				content: '';
				position: absolute;
				bottom: -10rpx;
				width: 42rpx;
				height: 5rpx;
				background: #4680E6;
				border-radius: 3rpx;
				left: 50%;
				margin-left: -21rpx;
			}
		}
	}
}

</style>