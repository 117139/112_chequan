<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<view v-if="type1!=1" class="fb_tabs">
			<view class="tabs_li" v-for="(item,index) in tabs" :class="{active:active==index}" @click="setcur_fuc(index)">{{item.title}}</view>
		</view>
		<view v-if="active==0" class="fb_tip">
			<text>发布服务</text>
			<text class="hztip">需开通商家会员后才能发布</text>
		</view>
		<view v-if="active==1" class="fb_tip">
			<text>发布摩托车</text>
			<text class="hztip">普通用户仅能发布3条</text>
		</view>
		<view v-if="active==2" class="fb_tip">
			<text>发布二手车</text>
			<text class="hztip">普通用户仅能发布3条</text>
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
				<view class="flex_1 fb_hyzk">商家会员85折</view>
				<view class="fb_mon">
					￥20
				</view>
			</view>
		</view>
		<!-- 摩托车 -->
		<view class="fb_box" v-if="active==1">
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
				<view class="flex_1 fb_hyzk">商家会员85折</view>
				<view class="fb_mon">
					￥20
				</view>
			</view>
		</view>
		<!-- 二手车 -->
		<!-- 加油站 -->
		
		<view class="b_box" v-if="active<2">
			<view class="b_box1">
				<view class="b_btn" @click="sub_fuc">确认发布</view>
			</view>
		</view>
		<fbCar v-if="active==2" :type1="options.type1"></fbCar>
		<fbJyz  v-if="active==3"></fbJyz>
		<!-- 阻止滑动 -->
		<!-- <view @touchmove.stop.prevent='test'></view> -->
	</view>
</template>

<script>
	import Vue from 'vue'
	import fbCar from '@/components/fb_car/fb_car.vue'
	import fbJyz from '@/components/fb_jyz/fb_jyz.vue'
	
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that 
	export default {
		components:{fbCar,fbJyz },
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
				type1:4
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
			if(e.type){
				that.active=e.type
			}
			if(e.type1){
				that.type1=e.type1
			}
			console.log(e)
			
			// that.getdata()
		},
		onShow() {
			// that.onRetry()
		},
		
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			dzchange(e){
				console.log(e)
			},
			sub_fuc(){
				var goods_img=that.goods_img.join(',')
				var goodsxq_img=that.goodsxq_img.join(',')
				var datas={
					fb_tit:that.fb_tit,
					fb_pri:that.fb_pri,
					fb_content:that.fb_content,
					goods_img:goods_img,
					fb_content1:that.fb_content1,
					goodsxq_img:goodsxq_img,
					dz_type:that.dz_type
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
				if(that.active==1){
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
					var mtxq_img=that.mtxq_img.join(',')
					datas={
						fb_tit_mt:that.fb_tit_mt,
						fb_pri_cj_mt:that.fb_pri_cj_mt,
						fb_pri_mt:that.fb_pri_mt,
						mt_img:mt_img,
						mt_content:that.mt_content,
						mtxq_img:mtxq_img
					}
				}
				console.log(datas)
				uni.showToast({
					icon:'none',
					title:'发布成功'
				})
				setTimeout(function(){
					uni.redirectTo({
						// url:'/pages_my/my_fabu/my_fabu'
						url:'/pages_my/store_fb_ok/store_fb_ok?type='+that.options.type+'&type1='+that.options.type1
					})
				},1000)
			},
			setcur_fuc(index){
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
