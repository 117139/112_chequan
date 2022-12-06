<template>
	<view class="w100">
		<view class="fb_box">
			<view class="fb_li">
				<view class="fb_li_l">
					<text>*</text>车辆名称
				</view>
				<view class="fb_li_l" style="width:100%">
					<input class="fb_li_r fb_li_r1" type="text" v-model="fb_tit" placeholder="请填写车辆的名称">
				</view>
				
			</view>
			<picker @change="bindPickerChange" :value="ct_index" :range="ct_array" range-key="title">
			<view class="fb_li fb_li2">
				<view class="fb_li_l">
					<text>*</text>车型
				</view>
				<!-- <input class="fb_li_r" type="number" v-model="ct_array[ct_index].title" placeholder="请选择车型" disabled="true"> -->
				<view class="fb_li_r fb_li_r2">{{ct_array[ct_index].title||'请选择车型'}}</view>
				<text class="iconfont icon-31xiala"></text>
			</view>
			</picker>
			<picker @change="bindPickerChange_c" :value="cc_index" :range="cc_array" range-key="title">
			<view class="fb_li fb_li2">
				<view class="fb_li_l">
					<text>*</text>颜色
				</view>
				<!-- <input class="fb_li_r" type="number" v-model="ct_array[ct_index].title" placeholder="请选择车型" disabled="true"> -->
				<view class="fb_li_r fb_li_r2">{{cc_array[cc_index].title||'请选择车身颜色'}}</view>
				<text class="iconfont icon-31xiala"></text>
			</view>
			</picker>
			
			<view class="fb_li fb_li2">
				<view class="fb_li_l">
					首付款
				</view>
				<input class="fb_li_r fb_li_r2" type="number" v-model="car_sf" placeholder="请填写首付款" >
				<view>万</view>
			</view>
			<view class="fb_li fb_li2">
				<view class="fb_li_l">
					<text>*</text>价格
				</view>
				<input class="fb_li_r fb_li_r2" type="number" v-model="car_pri" placeholder="请填写车辆的价格" >
				<view>万</view>
			</view>
			
			<view class="fb_li">
				<view class="fb_li_l">
					包含过户费
				</view>
				<view class="flex_1"></view>
				<u-switch v-model="car_gh" @change="dzchange" activeColor="#4680E6"></u-switch>
				<!-- <input class="fb_li_r" type="text" v-model="fb_tit" placeholder="请填写服务标题"> -->
			</view>
		</view>
			
		<view class="fb_box" style="margin-top: 20rpx;">
			
			<view class="fb_li fb_li2">
				<view class="fb_li_l">
					<text>*</text>行驶里程
				</view>
				<input class="fb_li_r fb_li_r2" type="number" v-model="car_xslc" placeholder="请填写行驶里程" >
				<view>万公里</view>
			</view>
			
			<picker @change="bindDateChange" mode="date" :value="car_sp" :start="startDate" :end="endDate">
				<view class="fb_li fb_li2">
					<view class="fb_li_l">
						<text>*</text>上牌时间
					</view>
					<!-- <input class="fb_li_r" type="number" v-model="ct_array[ct_index].title" placeholder="请选择车型" disabled="true"> -->
					<view class="fb_li_r fb_li_r2">{{car_sp||'请选择上牌的时间'}}</view>
					<text class="iconfont icon-31xiala"></text>
				</view>
			</picker>
			<region-picker @change="region_change" :value="car_sp_add">
			<view class="fb_li fb_li2">
				<view class="fb_li_l">
					<text>*</text>上牌地
				</view>
				<!-- <input class="fb_li_r" type="number" v-model="ct_array[ct_index].title" placeholder="请选择车型" disabled="true"> -->
				<view class="fb_li_r fb_li_r2">{{car_sp_add.join(' ')||'请选择上牌地'}}</view>
				<text class="iconfont icon-31xiala"></text>
			</view>
			</region-picker>
			<region-picker @change="region_change1" :value="car_sp_add">
			<view class="fb_li fb_li2">
				<view class="fb_li_l">
					<text>*</text>所在地
				</view>
				<!-- <input class="fb_li_r" type="number" v-model="ct_array[ct_index].title" placeholder="请选择车型" disabled="true"> -->
				<view class="fb_li_r fb_li_r2">{{car_sz_add.join(' ')||'请选择所在地'}}</view>
				<text class="iconfont icon-31xiala"></text>
			</view>
			</region-picker>
			
			<view class="fb_li fb_li2">
				<view class="fb_li_l">
					<text>*</text>过户次数
				</view>
				<input class="fb_li_r fb_li_r2" type="number" v-model="car_ghnum" placeholder="请输入过户次数" >
				<!-- <view>万</view> -->
			</view>
			<picker @change="bindDateChange_bxdq" mode="date" :value="car_bxdq" :start="startDate" :end="endDate1">
				<view class="fb_li fb_li2">
					<view class="fb_li_l">
						<text>*</text>保险到期
					</view>
					<!-- <input class="fb_li_r" type="number" v-model="ct_array[ct_index].title" placeholder="请选择车型" disabled="true"> -->
					<view class="fb_li_r fb_li_r2">{{car_bxdq||'请选择保险到期时间'}}</view>
					<text class="iconfont icon-31xiala"></text>
				</view>
			</picker>
			
			<picker @change="bindDateChange_njdq" mode="date" :value="car_njdq" :start="startDate" :end="endDate1">
				<view class="fb_li fb_li2">
					<view class="fb_li_l">
						<text>*</text>年检到期
					</view>
					<!-- <input class="fb_li_r" type="number" v-model="ct_array[ct_index].title" placeholder="请选择车型" disabled="true"> -->
					<view class="fb_li_r fb_li_r2">{{car_njdq||'请选择年检到期时间'}}</view>
					<text class="iconfont icon-31xiala"></text>
				</view>
			</picker>
			<view class="fb_li">
				<view class="fb_li_l">
					<text>*</text>
					车况描述
				</view>
				<textarea class="fb_li_area" v-model="fb_content" placeholder="请输入车辆的情况" maxlength="500"></textarea>
				<view class="fb_num dis_flex aic">
					<view class="flex_1"></view>
					<view>{{fb_content.length}}/500</view>
				</view>
			</view>
			<view class="fb_li">
				<view class="fb_li_l">
					<text>*</text>
					上传图片
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
					<!-- <text>*</text> -->
					上传视频
				</view>
				<view class="imgs_list">
					<view class="imgs_li">
						<view class="imgs_li_box" @click="upvideo_fuc" data-type="v1"  data-idx="0">
							<text class="iconfont icon-paizhao-xianxing"></text>
						</view>
					</view>
					<view class="imgs_li"  v-for="(item,index) in mt_video">
						<view class="imgs_li_box">
							<!-- <image class="imgs_li_img" :src="$service.getimg(item)" mode="aspectFill"></image> -->
							<image class="imgs_li_img" src="/static/images/banner.png" mode="aspectFill"></image>
							<view class="imgs_li_del dis_flex aic ju_c"  @click="delimg_fuc1"  data-type="v1" :data-idx="index">
								<image src="/static/images/del_img.png" mode="aspectFit"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="fb_li">
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
			</view> -->
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
		
		<view class="b_box">
			<view class="b_box1">
				<view class="b_btn" @click="sub_fuc">确认发布</view>
			</view>
		</view>
	</view>
</template>

<script>
	import regionPicker from "@/components/region-picker/region-picker.vue"
	export default {
		name:"fb_car",
		components: {  
				regionPicker  
		},
		props: {
			type1:{
				type: String,
				default: ''
			},
			
		},
		data() {
			const currentDate = this.getDate({
			            format: true
			        })
			return {
				fb_tit:'', //*服务标题
				car_type:'',//*价格
				fb_content:'', //商品描述
				goods_img:[],
				fb_content1:'', //*服务详情
				goodsxq_img:[],
				dz_type:false,
				mt_video:[],
				
				ct_array:[
					{
						title:'阿尔法-罗密欧 Stelvio斯坦维'
					},
					{
						title:'阿斯顿·马丁 DB11'
					},
					{
						title:'奥迪A7L'
					},
					{
						title:'宝马1系'
					},
					{
						title:'保时捷 911'
					},
					{
						title:'奔驰 AMG A'
					},
					{
						title:'本田 CR-V'
					},
					{
						title:'标致2008'
					},
					{
						title:'别克 昂科拉'
					},
				],
				ct_index:0,
				cc_array:[
					{
						title:'白色'
					},
					{
						title:'黑色'
					},
					{
						title:'红色'
					},
					{
						title:'紫色'
					},
					{
						title:'其他'
					},
				],
				cc_index:0,
				car_sf:'',
				car_pri:'',
				car_gh:false, //包含过户费
				car_xslc:'',
				car_sp:'',
				car_sp_add:['北京市','市辖区','东城区'],
				car_sz_add:['北京市','市辖区','东城区'],
				car_ghnum:'',
				car_bxdq:'',
				car_njdq:''
			};
		},
		 computed: {
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
		methods:{
			test(){},
			// 车型
			bindPickerChange: function(e) {
					console.log('picker发送选择改变，携带值为', e.detail.value)
					this.ct_index = e.detail.value
			},
			// 颜色
			bindPickerChange_c: function(e) {
					console.log('picker发送选择改变，携带值为', e.detail.value)
					this.cc_index = e.detail.value
			},
			bindDateChange: function(e) {
					this.car_sp = e.detail.value
			},
			bindDateChange_bxdq: function(e) {
					this.car_bxdq = e.detail.value
			},
			bindDateChange_njdq: function(e) {
					this.car_njdq = e.detail.value
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
			region_change(e){
				console.log(e)
				this.car_sp_add=e.detail.value
			},
			region_change1(e){
				console.log(e)
				this.car_sz_add=e.detail.value
			},
			dzchange(e){
				console.log(e)
			},
			sub_fuc(){
				var that=this
				var goods_img=that.goods_img.join(',')
				var goodsxq_img=that.goodsxq_img.join(',')
				var mt_video=that.mt_video.join(',')
				
				var datas={
					fb_tit:that.fb_tit,
					
					ct_index:that.ct_array[that.ct_index].title,
					cc_index:that.cc_array[that.cc_index].title,
					
					car_sf:that.car_sf,
					car_pri:that.car_pri,
					car_gh:that.car_gh,
					car_xslc:that.car_xslc,
					car_sp_add:that.car_sp_add.join(','),
					car_sz_add:that.car_sz_add.join(','),
					car_ghnum:that.car_ghnum,
					car_bxdq:that.car_bxdq,
					car_njdq:that.car_njdq,
					
					fb_content:that.fb_content,
					goods_img:goods_img,
					mt_video:that.mt_video,
					dz_type:that.dz_type
				}
				
				// if(!that.fb_tit){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'请填写车辆的名称'
				// 	})
				// 	return
				// }
				// if(!that.car_pri){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'请填写车辆的价格'
				// 	})
				// 	return
				// }
				// if(!that.car_xslc){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'请填写行驶里程'
				// 	})
				// 	return
				// }
				
				// if(!that.car_sp){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'请选择上牌的时间'
				// 	})
				// 	return
				// }
				// if(that.car_sp_add.length==0){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'请选择上牌地'
				// 	})
				// 	return
				// }
				// if(that.car_sz_add.length==0){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'请选择所在地'
				// 	})
				// 	return
				// }
				
				// if(!that.car_ghnum){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'请输入过户次数'
				// 	})
				// 	return
				// }
				
				// if(!that.car_bxdq){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'请选择保险到期时间'
				// 	})
				// 	return
				// }
				// if(!that.car_njdq){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'请选择年检到期时间'
				// 	})
				// 	return
				// }
				// if(!that.fb_content){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'请输入车辆的情况'
				// 	})
				// 	return
				// }
				// if(that.goods_img.length==0){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'请上传图片'
				// 	})
				// 	return
				// }
				
				console.log(datas)
				uni.showToast({
					icon:'none',
					title:'发布成功'
				})
				setTimeout(function(){
					uni.redirectTo({
						// url:'/pages_my/my_fabu/my_fabu'
						url:'/pages_my/store_fb_ok/store_fb_ok?type=2&type1='+that.type1
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