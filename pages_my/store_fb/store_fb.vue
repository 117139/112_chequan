<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<view v-if="type1!=1" class="fb_tabs">
			<view class="tabs_li" v-for="(item,index) in tabs" :class="{active:active==index}" @click="setcur_fuc(index)">{{item.title}}</view>
		</view>
		<view v-if="active==0" class="fb_tip">
			<text>发布服务</text>
			<text class="hztip">汽车美容仅能免费上架{{p_config.show_num1}}条</text>
		</view>
		<view v-if="active==1" class="fb_tip">
			<text>发布摩托车</text>
			<text class="hztip">摩托车仅能免费上架{{p_config.show_num2}}条</text>
		</view>
		<view v-if="active==2" class="fb_tip">
			<text>发布二手车</text>
			<text class="hztip">二手车仅能免费上架{{p_config.show_num3}}条</text>
		</view>
		<view v-if="active==3" class="fb_tip">
			<text>发布服务</text>
			<text class="hztip">需开通商家会员后才能发布</text>
		</view>
		<!-- 汽车美容 -->
		<view class="fb_box" v-if="active==0">
			<view class="fb_li">
				<view class="fb_li_l">
					<text>*</text>服务标题
				</view>
				<input class="fb_li_r" type="text" v-model="fb_tit" placeholder="请填写服务标题">
			</view>
			<view class="fb_li">
				<view class="fb_li_l">
					<text>*</text>价格
				</view>
				<input class="fb_li_r" type="number" v-model="fb_pri" placeholder="请填写价格">
			</view>
			<view class="fb_li">
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
				<!-- <input class="fb_li_r" type="text" v-model="fb_tit" placeholder="请填写服务标题"> -->
			</view>
			<view v-if="dz_type" class="fb_li">
				<view class="fb_li_l">
					扣除金额
				</view>
				<view class="flex_1 fb_hyzk"><!-- 商家会员85折 --></view>
				<view class="fb_mon">
					￥{{p_config.top_price1}}
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
		
		
		
		
		<view class="b_box" v-if="active==0">
			<view class="b_box1">
				<view class="b_btn" @click="sub_fuc">确认发布</view>
			</view>
		</view>
		<!-- 摩托车 -->
		<fbMt v-if="active==1" :type1="options.type1" :options="options"></fbMt>
		<!-- 二手车 -->
		<fbCar v-if="active==2" :type1="options.type1" :options="options"></fbCar>
		<!-- 加油站 -->
		<fbJyz  v-if="active==3" :type1="options.type1" :options="options"></fbJyz>
		<!-- 阻止滑动 -->
		<!-- <view @touchmove.stop.prevent='test'></view> -->
	</view>
</template>

<script>
	import Vue from 'vue'
	import fbMt from '@/components/fb_mt/fb_mt.vue'
	import fbCar from '@/components/fb_car/fb_car.vue'
	import fbJyz from '@/components/fb_jyz/fb_jyz.vue'
	
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that 
	export default {
		components:{fbMt,fbCar,fbJyz },
		data() {
			return {
				options:'',
				datas:'',
				page:1,
				tabs:[
					{
						title:'汽车美容',
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
				active:0,
				fb_tit:'', //*服务标题
				fb_pri:'',//*价格
				fb_content:'', //商品描述
				goods_img:[],
				fb_content1:'', //*服务详情
				goodsxq_img:[],
				dz_type:false,
				
				fb_tit_mt:'',
				fb_pri_cj_mt:'',
				fb_pri_mt:'',
				mt_img:[],
				mt_video:[],
				mt_content:'',
				mtxq_img:[],
				type1:4,
				btnkg:0,
				// #ifdef APP
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
				// #endif
				// #ifdef MP-WEIXIN
				pay_array:[
					{
						title:'微信支付',
						id:1
					},
				],
				// #endif
				pay_index:0,
			}
		},
		computed: {
		...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','loginDatas','p_config']),
		},
		// onReachBottom() {
		// 	that.getdata()
		// },
		onLoad(e) {
			that=this
			that.options=e||{}
			if(e.type){
				that.active=e.type
			}
			if(e.type1){
				that.type1=e.type1
			}
			console.log(e)
			if(this.options.id&&that.active==0){
				console.log(this.options.id)
				this.getdata()
			}
			// that.getdata()
		},
		onShow() {
			// that.onRetry()
		},
		
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			bindPickerChange_pay: function(e) {
					this.pay_index = e.detail.value
			},
			pay_fuc(code){
				var that =this
				var jkurl='/operate/pay'
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
						url:'/pages_my/store_fb_ok/store_fb_ok?type=0&type1='+that.type1
					})
				},1000)
			},
			dzchange(e){
				console.log(e)
			},
			getdata(){
				var that=this
				var datas={
					id: that.options.id,
					is_my:1
				}
				var jkurl='/detail/car_beauty'
				
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
						that.fb_tit=datas.title
						that.fb_pri=datas.price
						that.fb_content=datas.sub_title
						that.goods_img=datas.banner
						that.fb_content1=datas.content
						that.goodsxq_img=datas.content_img
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
				var goods_img=that.goods_img.join(',')
				var goodsxq_img=that.goodsxq_img.join(',')
				var datas={
					title:that.fb_tit,
					price:that.fb_pri,
					sub_title:that.fb_content,
					banner:goods_img,
					content:that.fb_content1,
					content_img:goodsxq_img,
					is_top:that.dz_type?1:2
				}
				
				if(that.active==0){
					if(!that.fb_tit){
						uni.showToast({
							icon:'none',
							title:'请填写服务标题'
						})
						return
					}
					if(!that.fb_pri){
						uni.showToast({
							icon:'none',
							title:'请填写价格'
						})
						return
					}
					if(!that.fb_content){
						uni.showToast({
							icon:'none',
							title:'请填写商品描述'
						})
						return
					}
					if(that.goods_img.length==0){
						uni.showToast({
							icon:'none',
							title:'请上传商品图'
						})
						return
					}
					if(!that.fb_content1){
						uni.showToast({
							icon:'none',
							title:'请填写服务详情'
						})
						return
					}
					if(that.goodsxq_img.length==0){
						uni.showToast({
							icon:'none',
							title:'请上传服务详情图片'
						})
						return
					}
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
				var jkurl='/sub/car_beauty'
				
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
							// uni.redirectTo({
							// 	// url:'/pages_my/my_fabu/my_fabu'
							// 	url:'/pages_my/store_fb_ok/store_fb_ok?edit=1&type=3&type1='+that.type1
							// })
							// return
							if(that.options.id){
								uni.redirectTo({
									// url:'/pages_my/my_fabu/my_fabu'
									url:'/pages_my/store_fb_ok/store_fb_ok?edit=1&type=0&type1='+that.type1
								})
								return
							}
							uni.redirectTo({
								// url:'/pages_my/my_fabu/my_fabu'
								url:'/pages_my/store_fb_ok/store_fb_ok?type=0&type1='+that.type1
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
				
				
				
			},
			setcur_fuc(index){
				that.active=index
			},
			onRetry(){
				that.page=1
				that.datas=[]
				that.getdata()
			},
			getdata2(){
				
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
