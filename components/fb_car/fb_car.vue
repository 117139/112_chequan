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
			<!-- <picker @change="bindPickerChange_pp" :value="pp_index" :range="pp_list" range-key="name"> -->
			<view class="fb_li fb_li2" @tap="$service.jump" data-url="/pagesA/ctpe_list/ctpe_list?type=1">
				<view class="fb_li_l">
					<text>*</text>品牌
				</view>
				<!-- <input class="fb_li_r" type="number" v-model="ct_array[ct_index].title" placeholder="请选择车型" disabled="true"> -->
				<view  class="fb_li_r fb_li_r2">{{pp_msg.name||'请选择品牌'}}</view>
				<text class="iconfont icon-31xiala"></text>
			</view>
			<!-- </picker> -->
			<picker v-if="pp_msg" @change="bindPickerChange" :value="ct_index" :range="ct_array" range-key="name">
			<view class="fb_li fb_li2">
				<view class="fb_li_l">
					<text>*</text>品牌型号
				</view>
				<!-- <input class="fb_li_r" type="number" v-model="ct_array[ct_index].title" placeholder="请选择车型" disabled="true"> -->
				<view v-if="ct_msg" class="fb_li_r fb_li_r2">{{$service.LNum(ct_msg.name,20)}}</view>
				<view v-else class="fb_li_r fb_li_r2">请选择品牌型号</view>
				<text class="iconfont icon-31xiala"></text>
			</view>
			</picker>
			<picker v-if="ct_msg&&cx_list.length>0" @change="bindPickerChange_cx" :value="cx_index" :range="cx_list" range-key="name">
			<view class="fb_li fb_li2">
				<view class="fb_li_l">
					<text>*</text>车型
				</view>
				<!-- <input class="fb_li_r" type="number" v-model="ct_array[ct_index].title" placeholder="请选择车型" disabled="true"> -->
				<view v-if="cx_msg" class="fb_li_r fb_li_r2">{{$service.LNum(cx_msg.name,20)}}</view>
				<view v-else class="fb_li_r fb_li_r2">请选择车型</view>
				<text class="iconfont icon-31xiala"></text>
			</view>
			</picker>
			<picker v-if="cx_msg&&ks_list.length>0" @change="bindPickerChange_ks" :value="ks_index" :range="ks_list" range-key="name">
			<view class="fb_li fb_li2">
				<view class="fb_li_l">
					<text>*</text>款式
				</view>
				<!-- <input class="fb_li_r" type="number" v-model="ct_array[ct_index].title" placeholder="请选择车型" disabled="true"> -->
				<view v-if="ks_msg" class="fb_li_r fb_li_r2">{{$service.LNum(ks_msg.name,20)}}</view>
				<view v-else class="fb_li_r fb_li_r2">请选择款式</view>
				<text class="iconfont icon-31xiala"></text>
			</view>
			</picker>
			<!-- <picker @change="bindPickerChange_c" :value="cc_index" :range="cc_array" range-key="title"> -->
			<view class="fb_li fb_li2">
				<view class="fb_li_l">
					<text>*</text>颜色
				</view>
				<input class="fb_li_r" type="text" v-model="color" placeholder="请填写车辆颜色">
				<!-- <view class="fb_li_r fb_li_r2">{{cc_array[cc_index].title||'请选择车身颜色'}}</view>
				<text class="iconfont icon-31xiala"></text> -->
			</view>
			<!-- </picker> -->
			
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
							<!-- <image class="imgs_li_img" src="/static/images/banner.png" mode="aspectFill"></image> -->
							<video  class="imgs_li_img" :src="$service.getimg(item)" 
								:controls="false"
								:show-play-btn="false"  
								:show-fullscreen-btn="false"
								:show-center-play-btn="false"
								@click="$service.jump" :data-url="'/pages_my/v_box/v_box?url='+item"
								></video>
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
				<view class="flex_1 fb_hyzk">
					<!-- 商家会员85折 -->
				</view>
				<view class="fb_mon">
					￥{{p_config.top_price3}}
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
	import regionPicker from "@/components/region-picker/region-picker.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
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
			options:{
				type: Object,
				default: function(){
					return {}
				}
			},
		},
		data() {
			const currentDate = this.getDate({
			            format: true
			        })
			return {
				fb_tit:'', //*服务标题
				color:'',
				car_type:'',//*价格
				fb_content:'', //商品描述
				goods_img:[],
				fb_content1:'', //*服务详情
				goodsxq_img:[],
				dz_type:false,
				mt_video:[],
				
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
				car_njdq:'',
				btnkg:0,
				pp_list:[],
				pp_index:0,
				
				
				
				pp_msg:'',
				
				ct_array:[],
				ct_index:0,
				ct_msg:'',
				cx_list:[],
				cx_index:0,
				cx_msg:'',
				
				ks_list:[],
				ks_index:0,
				ks_msg:'',
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
				datas:''
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
				},
				...mapState(['loginDatas','p_config','car_info','car_info_hot','car_info_all']),
		},
		mounted() {
			uni.$on('carpp_fuc', (data) => {
					console.log('标题：' + data.title)
					console.log('内容：' )
					console.log(data.content)
					this.pp_msg=data.content
					this.ct_msg = ''
					this.cx_msg = ''
					this.ks_msg=''
					this.getdata1()
					// that.getbasedata()
					// that.$service.wxlogin('token')
			})
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
		// watch:{
		// 	car_info_all(val){
		// 		console.log(val)
		// 		this.pp_list=this.car_info_all
		// 		this.getdata1()
		// 	},
		// 	pp_index(val){
		// 		console.log(val)
		// 		this.getdata1()
		// 		// this.pp_list=this.car_info.list[0]
		// 	},
		// },
		methods:{
			test(){},
			getdata(){
				var that=this
				var datas={
					id: that.options.id,
					is_my:1
				}
				var jkurl='/detail/usedcar'
				
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
						// car_type:that.pp_msg.id||'',
						var car_params=datas.car_params
						that.pp_msg={
							name:car_params.brandname,
							id:datas.car_type
						}
						that.datas=datas
						that.getdata1()
						// that.ct_msg={
						// 	id:datas.car_status,
						// 	name:''
						// }
						that.color=datas.color
						that.car_sf=datas.first_price
						that.car_pri=datas.price
						that.car_gh=datas.is_gh==1?true:false
						that.car_xslc=datas.km
						that.car_sp=datas.brand_time_
						that.car_sp_add=datas.brand_add.split(',')
						that.car_sz_add=datas.brand_address.split(',')
						that.car_ghnum=datas.gh_num
						that.car_bxdq=datas.bx_end_
						that.car_njdq=datas.nj_end_
						that.fb_content=datas.content
						
						that.goods_img=datas.banner||[]
						that.mt_video=datas.banner_video||[]
						that.dz_typ=datas.is_top==1?true:false
						
						
						
						
						// is_top:that.dz_type?1:2
						
						// that.ct_array=datas
						// if(datas[0].carlist.length>0){
						// 	that.cx_list=datas[0].carlist
							
						// 	that.cx_msg=that.cx_list[0]
						// 	if(that.cx_list[0].list.length>0){
						// 		that.ks_list=that.cx_list[0].list
						// 		that.ks_msg=that.ks_list[0]
						// 	}
						// }
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
			getdata1(){
				var that=this
				var datas={
					id: that.pp_msg.id
				}
				var jkurl='/publics/carbrand'
				
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
						that.ct_array=datas
						// car_status:that.ct_msg.id||'',
						// car_lx:that.cx_msg.id||'',
						// car_info:that.ks_msg.id||'',
						for (var i = 0; i < datas.length; i++) {
							if(datas[i].id==that.datas.car_status){
								that.ct_msg={
									id:datas[i].id,
									name:datas[i].name
								}
								that.cx_list=datas[i].carlist
								var cx_list=that.cx_list
								for (var c = 0; c < cx_list.length; c++) {
									if(cx_list[c].id==that.datas.car_lx){
										that.cx_msg = {
											id:cx_list[c].id,
											name:cx_list[c].name,
										}
										that.ks_list=cx_list[c].list
										var ks_list=cx_list[c].list
										if(ks_list.length>0){
											for (var k = 0; k < ks_list.length; k++) {
												if(ks_list[k].id==that.datas.car_info){
													that.ks_msg = {
														id:ks_list[k].id,
														name:ks_list[k].name,
													}
												}
											}
										}
										
									}
								}
							}
						}
						// that.ct_msg = ''
						// that.cx_msg = ''
						// that.ks_msg=''
						// if(datas[0].carlist.length>0){
						// 	that.cx_list=datas[0].carlist
							
						// 	that.cx_msg=that.cx_list[0]
						// 	if(that.cx_list[0].list.length>0){
						// 		that.ks_list=that.cx_list[0].list
						// 		that.ks_msg=that.ks_list[0]
						// 	}
						// }
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
			
			bindPickerChange_pp: function(e) {
					console.log('picker发送选择改变，携带值为', e.detail.value)
					this.pp_index = e.detail.value
			},
			// 车型
			bindPickerChange: function(e) {
					console.log('picker发送选择改变，携带值为', e.detail.value)
					this.ct_index = e.detail.value
					this.ct_msg = this.ct_array[e.detail.value]
					this.cx_list = this.ct_array[e.detail.value].carlist
					this.cx_msg = ''
					this.ks_msg=''
			},
			bindPickerChange_cx: function(e) {
					console.log('picker发送选择改变，携带值为', e.detail.value)
					this.cx_index = e.detail.value
					this.cx_msg = this.cx_list[e.detail.value]
					this.ks_list = this.cx_list[e.detail.value].list||[]
					this.ks_msg=''
			},
			bindPickerChange_ks: function(e) {
					console.log('picker发送选择改变，携带值为', e.detail.value)
					this.ks_index = e.detail.value
					this.ks_msg = this.ks_list[e.detail.value]
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
			bindPickerChange_pay: function(e) {
					this.pay_index = e.detail.value
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
				if(!that.fb_tit){
					uni.showToast({
						icon:'none',
						title:'请填写车辆的名称'
					})
					return
				}
				if(!that.pp_msg){
					uni.showToast({
						icon:'none',
						title:'请选择车辆品牌'
					})
					return
				}
				if(!that.ct_msg){
					uni.showToast({
						icon:'none',
						title:'请选择品牌型号'
					})
					return
				}
				if(!that.cx_msg){
					uni.showToast({
						icon:'none',
						title:'请选择车型'
					})
					return
				}
				if(that.ks_list.length>0){
					if(!that.ks_msg){
						uni.showToast({
							icon:'none',
							title:'请选择款式'
						})
						return
					}
				}
				
				if(!that.color){
					uni.showToast({
						icon:'none',
						title:'请填写车辆颜色'
					})
					return
				}
				if(!that.car_pri){
					uni.showToast({
						icon:'none',
						title:'请填写车辆的价格'
					})
					return
				}
				if(!that.car_xslc){
					uni.showToast({
						icon:'none',
						title:'请填写行驶里程'
					})
					return
				}
				
				if(!that.car_sp){
					uni.showToast({
						icon:'none',
						title:'请选择上牌的时间'
					})
					return
				}
				if(that.car_sp_add.length==0){
					uni.showToast({
						icon:'none',
						title:'请选择上牌地'
					})
					return
				}
				if(that.car_sz_add.length==0){
					uni.showToast({
						icon:'none',
						title:'请选择所在地'
					})
					return
				}
				if(!that.car_ghnum){
					uni.showToast({
						icon:'none',
						title:'请输入过户次数'
					})
					return
				}
				if(!that.car_bxdq){
					uni.showToast({
						icon:'none',
						title:'请选择保险到期时间'
					})
					return
				}
				if(!that.car_njdq){
					uni.showToast({
						icon:'none',
						title:'请选择年检到期时间'
					})
					return
				}
				if(!that.fb_content){
					uni.showToast({
						icon:'none',
						title:'请输入车辆的情况'
					})
					return
				}
				if(that.goods_img.length==0){
					uni.showToast({
						icon:'none',
						title:'请上传图片'
					})
					return
				}
				var datas={
					title:that.fb_tit,
					
					car_type:that.pp_msg.id||'',
					car_status:that.ct_msg.id||'',
					car_lx:that.cx_msg.id||'',
					car_info:that.ks_msg.id||'',
					color:that.color,
					
					first_price:that.car_sf,
					price:that.car_pri,
					is_gh:that.car_gh?1:2,
					
					km:that.car_xslc,
					brand_time:that.car_sp,
					brand_add:that.car_sp_add.join(','),
					brand_address:that.car_sz_add.join(','),
					gh_num:that.car_ghnum,
					bx_end:that.car_bxdq,
					nj_end:that.car_njdq,
					
					content:that.fb_content,
					banner:goods_img,
					banner_video:mt_video,
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
				var jkurl='/sub/usedcar'
				
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
									url:'/pages_my/store_fb_ok/store_fb_ok?edit=1&type=2&type1='+that.type1
								})
								return
							}
							uni.redirectTo({
								// url:'/pages_my/my_fabu/my_fabu'
								url:'/pages_my/store_fb_ok/store_fb_ok?type=2&type1='+that.type1
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
			pay_mp_fuc(data){
				console.log(data)
				// return
				that.$service.wxpay(data).then(res => {
					
					that.gook_fuc()
					
					// setTimeout(()=>{
					// 	uni.navigateBack({
					// 		delta:1
					// 	})
					// },1000)
				}).catch(e => {
					that.btn_kg=0
					uni.showToast({
						icon: 'none',
						title: '微信支付失败'
					})
				})
			},
			pay_fuc(code){
				var that =this
				var jkurl='/operate/pay'
				var datas={
					code :code,
					type:that.pay_array[that.pay_index].id
				}
				// #ifdef MP-WEIXIN
				datas={
					code :code,
					type:3
				}
				// #endif
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
						// #ifdef MP-WEIXIN
						that.pay_mp_fuc(datas)
						return
						// #endif
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
					uni.$emit('login_fuc', {
						title: ' 刷新信息 ',
						content: 'item.id'
					});
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