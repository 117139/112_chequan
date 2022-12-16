<template>
	<view class="w100">
		<view class="fb_box">
			<!-- <view class="fb_li">
				<view class="fb_li_l">
					<text>*</text>
					服务标题
				</view>
				<input class="fb_li_r" type="text" v-model="fb_tit" placeholder="请填写服务标题">
			</view> -->
			<view class="fb_li">
				<view class="fb_li_l">
					<!-- <text>*</text> -->
					92号汽油
				</view>
				<input class="fb_li_r" type="number" v-model="price_92" placeholder="请填写价格">
			</view>
			<view class="fb_li">
				<view class="fb_li_l">
					<!-- <text>*</text> -->
					95号汽油
				</view>
				<input class="fb_li_r" type="number" v-model="price_95" placeholder="请填写价格">
			</view>
			<view class="fb_li">
				<view class="fb_li_l">
					<!-- <text>*</text> -->
					98号汽油
				</view>
				<input class="fb_li_r" type="number" v-model="price_98" placeholder="请填写价格">
			</view>
			<view class="fb_li">
				<view class="fb_li_l">
					<!-- <text>*</text> -->
					0号柴油
				</view>
				<input class="fb_li_r" type="number" v-model="price_0" placeholder="请填写价格">
			</view>
			<!-- <view class="fb_li">
				<view class="fb_li_l">
					<text>*</text>
					商品描述
				</view>
				<textarea class="fb_li_area" v-model="fb_content" placeholder="请填写商品描述" maxlength="-1"></textarea>
			</view>
			<view class="fb_li">
				<view class="fb_li_l">
					<text>*</text>
					上传商品图片
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
			<view class="fb_li">
				<view class="fb_li_l">
					上传商品视频
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
					服务详情
				</view>
				<textarea class="fb_li_area" v-model="fb_content1" placeholder="请填写服务详情" maxlength="-1"></textarea>
			</view>
			<view class="fb_li">
				<view class="fb_li_l">
					<text>*</text>
					上传服务详情图片
				</view>
				<view class="imgs_list">
					<view class="imgs_li">
						<view class="imgs_li_box" @click="upimg_fuc" data-type="2"  data-idx="0">
							<text class="iconfont icon-paizhao-xianxing"></text>
						</view>
					</view>
					<view class="imgs_li"  v-for="(item,index) in goodsxq_img">
						<view class="imgs_li_box">
							<image class="imgs_li_img" :src="$service.getimg(item)" mode="aspectFill"></image>
							<view class="imgs_li_del dis_flex aic ju_c"  @click="delimg_fuc"  data-type="2" :data-idx="index">
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
			</view> -->
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
		name:"fb_jyz",
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
		computed: {
				
				...mapState(['loginDatas','p_config','car_info','car_info_hot','car_info_all']),
		},
		mounted() {
			if(this.loginDatas.store.id){
				console.log(this.loginDatas.store.id)
				// this.getdata()
				this.price_92=this.loginDatas.store.price_92
				this.price_95=this.loginDatas.store.price_95
				this.price_98=this.loginDatas.store.price_98
				this.price_0=this.loginDatas.store.price_0
			}
			// if(this.car_info_all){
			// 	this.pp_list=this.car_info_all
			// 	console.log(this.car_info_all)
			// 	this.getdata1()
			// }
		},
		data() {
			return {
				fb_tit:'', //*服务标题
				fb_pri:'',//*价格
				fb_content:'', //商品描述
				goods_img:[],
				fb_content1:'', //*服务详情
				goodsxq_img:[],
				dz_type:false,
				mt_video:[],
				
				
				price_92:'',
				price_95:'',
				price_98:'',
				price_0:'',
			};
		},
		methods:{
			test(){},
			dzchange(e){
				console.log(e)
			},
			getdata(){
				var that=this
				var datas={
					id: this.loginDatas.store.id,
					is_my:1
				}
				var jkurl='/detail/store'
				
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
						// that.fb_tit_mt=datas.title
						
						// that.fb_pri_cj_mt=datas.y_price
						// that.fb_pri_mt=datas.price
						// that.mt_content=datas.content
						
						// that.mt_img=datas.banner||[]
						// that.mt_video=datas.banner_video||[]
						// that.mtxq_img=datas.content_img||[]
						// that.dz_typ=datas.is_top==1?true:false
						
						
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
				var datas={
					price_92:that.price_92,
					price_95:that.price_95,
					price_98:that.price_98,
					price_0:that.price_0,
					
				}
				
				// if(!that.fb_tit){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'请填写服务标题'
				// 	})
				// 	return
				// }
				if(!that.price_92&&!that.price_95&&!that.price_98&&!that.price_0){
					uni.showToast({
						icon:'none',
						title:'请填写价格'
					})
					return
				}
				// if(!that.fb_content){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'请填写商品描述'
				// 	})
				// 	return
				// }
				// if(that.goods_img.length==0){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'请上传商品图'
				// 	})
				// 	return
				// }
				// if(!that.fb_content1){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'请填写服务详情'
				// 	})
				// 	return
				// }
				// if(that.goodsxq_img.length==0){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'请上传服务详情图片'
				// 	})
				// 	return
				// }
				if(this.loginDatas.store.id){
					console.log(this.loginDatas.store.id)
					datas={
						id:this.loginDatas.store.id,
						...datas
					}
				}
				
				
				
				
				
				console.log(datas)
				// return
				var jkurl='/sub/gasoline'
				
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
						setTimeout(function(){
							uni.$emit('login_fuc', {
								title: ' 刷新信息 ',
								content: 'item.id'
							});
							that.btnkg=0
							uni.redirectTo({
								// url:'/pages_my/my_fabu/my_fabu'
								url:'/pages_my/store_fb_ok/store_fb_ok?edit=1&type=3&type1='+that.type1
							})
							return
							if(that.options.id){
								uni.redirectTo({
									// url:'/pages_my/my_fabu/my_fabu'
									url:'/pages_my/store_fb_ok/store_fb_ok?edit=1&type=3&type1='+that.type1
								})
								return
							}
							uni.redirectTo({
								// url:'/pages_my/my_fabu/my_fabu'
								url:'/pages_my/store_fb_ok/store_fb_ok?type=3&type1='+that.type1
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
				// 		url:'/pages_my/store_fb_ok/store_fb_ok?type=3'
				// 	})
				// },1000)
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
</style>