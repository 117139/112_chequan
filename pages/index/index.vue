<template>
	<view class="content">
		<view class="banner_box">
			<u-swiper  v-if="list1.length>0"  :list="list1"  keyName="img" @click="click_fuc" height="320rpx" radius='0' :circular="true"></u-swiper>
		</view>
		<!-- 金刚区 -->
		<view class="index_tui_list dis_flex fww">
			<view class="index_tui_li" @click="$service.jump" data-url="/pagesA/jyz_list/jyz_list">
				<view class="index_tui_li_img">
					<image v-if="navdata[0].img" :src="$service.getimg(navdata[0].img)" mode="aspectFill"></image>
					<image v-else src="/static/images/iti1.png" mode="aspectFill"></image>
				</view>
				<view class="index_tui_li_text">{{navdata[0].title||'加油站'}}</view>
			</view>
			<view class="index_tui_li" @click="$service.jump" data-url="/pagesA/qcmr_list/qcmr_list">
				<view class="index_tui_li_img">
					<image v-if="navdata[1].img" :src="$service.getimg(navdata[1].img)" mode="aspectFill"></image>
					<image v-else src="/static/images/iti2.png" mode="aspectFill"></image>
				</view>
				<view class="index_tui_li_text">{{navdata[1].title||'汽车美容'}}</view>
			</view>
			<view class="index_tui_li" @click="$service.jump" data-url="/pagesA/rgc_zt/rgc_zt" :data-login="true">
				<view class="index_tui_li_img">
					<image v-if="navdata[2].img" :src="$service.getimg(navdata[2].img)" mode="aspectFill"></image>
					<image v-else src="/static/images/iti3.png" mode="aspectFill"></image>
				</view>
				<view class="index_tui_li_text">{{navdata[2].title||'人工查状态'}}</view>
			</view>
			<view class="index_tui_li" @click="$service.jump" data-url="/pagesA/rgc_nj/rgc_nj" :data-login="true">
				<view class="index_tui_li_img">
					<image v-if="navdata[3].img" :src="$service.getimg(navdata[3].img)" mode="aspectFill"></image>
					<image v-else src="/static/images/iti4.png" mode="aspectFill"></image>
				</view>
				<view class="index_tui_li_text">{{navdata[3].title||'急速年检'}}</view>
			</view>
			<view class="index_tui_li" @click="$service.jump" data-url="/pagesA/rgc_mfpg/rgc_mfpg" :data-login="true">
				<view class="index_tui_li_img">
					<image v-if="navdata[4].img" :src="$service.getimg(navdata[4].img)" mode="aspectFill"></image>
					<image v-else src="/static/images/iti5.png" mode="aspectFill"></image>
				</view>
				<view class="index_tui_li_text">{{navdata[4].title||'免费评估'}}</view>
			</view>
			<view class="index_tui_li" @click="$service.jump" data-url="/pagesA/rgc_sb/rgc_sb" :data-login="true">
				<view class="index_tui_li_img">
					<image v-if="navdata[5].img" :src="$service.getimg(navdata[5].img)" mode="aspectFill"></image>
					<image v-else src="/static/images/iti6.png" mode="aspectFill"></image>
				</view>
				<view class="index_tui_li_text">{{navdata[5].title||'车型识别'}}</view>
			</view>
			<view class="index_tui_li" @click="$service.jump" data-url="/pagesA/rgc_wz/rgc_wz" :data-login="true">
				<view class="index_tui_li_img">
					<image v-if="navdata[6].img" :src="$service.getimg(navdata[6].img)" mode="aspectFill"></image>
					<image v-else src="/static/images/iti7.png" mode="aspectFill"></image>
					<view class="index_tui_jz">精准</view>
				</view>
				<view class="index_tui_li_text">{{navdata[6].title||'人工查违章'}}</view>
			</view>
			<view class="index_tui_li" @click="$service.jump" data-url="/pages/car/car" data-type="2">
				<view class="index_tui_li_img">
					<image v-if="navdata[7].img" :src="$service.getimg(navdata[7].img)" mode="aspectFill"></image>
					<image v-else src="/static/images/iti8.png" mode="aspectFill"></image>
				</view>
				<view class="index_tui_li_text">{{navdata[7].title||'靠谱二手车'}}</view>
			</view>
		</view>
		<view class="indext2_ul dis_flex fww">
			<view class="indext2_li" @click="$service.jump" data-url="/pagesA/rgc_sb/rgc_sb" :data-login="true">
				<image v-if="p_config.img1" class="indext2_libg" :src="$service.getimg(p_config.img1)" mode="aspectFill"></image>
				<image v-else class="indext2_libg" src="/static/images/it2i1.png" mode="aspectFill"></image>
				<!-- <view class="indext2_liinr">
					<view>车型识别</view>
					<text>识别高低配</text>
				</view> -->
			</view>
			<view class="indext2_li" @click="$service.jump" data-url="/pagesA/rgc_zt/rgc_zt" :data-login="true">
				<image v-if="p_config.img2" class="indext2_libg" :src="$service.getimg(p_config.img2)" mode="aspectFill"></image>
				<image v-else class="indext2_libg" src="/static/images/it2i2.png" mode="aspectFill"></image>
				<!-- <view class="indext2_liinr">
					<view>人工查违章</view>
					<text>1对1快速</text>
				</view> -->
			</view>
			<view class="indext2_li" @click="$service.jump" data-url="/pagesA/rgc_mfpg/rgc_mfpg" :data-login="true">
				<image v-if="p_config.img3" class="indext2_libg" :src="$service.getimg(p_config.img3)" mode="aspectFill"></image>
				<image v-else class="indext2_libg" src="/static/images/it2i3.png" mode="aspectFill"></image>
				<!-- <view class="indext2_liinr" style="color: #305380;">
					<view>一键评估</view>
					<text>免费快捷</text>
				</view> -->
			</view>
		</view>
		<view class="indext3_ul dis_flex fww">
			<!-- <view class="indext3_li" @click="go_vip(2)"> -->
			<view class="indext3_li" @click="$service.jump" data-url="/pagesA/openVIp/openVIp?type=0"  :data-login="true">
				<image v-if="p_config.vip_img" class="indext3_libg" :src="$service.getimg(p_config.vip_img)" mode="aspectFill"></image>
				<image v-else class="indext3_libg" src="/static/images/it3bg1.png" mode="aspectFill"></image>
				<!-- <view class="indext3_liinr">
					<image src="/static/images/it3i1.png" mode="aspectFit"></image>
					<view class="flex_1">开通用户会员</view>
					<text class="icon icon-next"></text>
				</view> -->
			</view>
			<!-- <view class="indext3_li" @click="go_vip(1)"> -->
			<view class="indext3_li" @click="$service.jump" data-url="/pagesA/openVIp/openVIp?type=1"  :data-login="true">
				<image v-if="p_config.vip_img1" class="indext3_libg" :src="$service.getimg(p_config.vip_img1)" mode="aspectFill"></image>
				<image v-else class="indext3_libg" src="/static/images/it3bg2.png" mode="aspectFill"></image>
				<!-- <view class="indext3_liinr">
					<image src="/static/images/it3i2.png" mode="aspectFit"></image>
					<view class="flex_1">开通商户会员</view>
					<text class="icon icon-next"></text>
				</view> -->
			</view>
		</view>
		<scroll-view v-if="my_order.length>0" class="scroll_x order_list" scroll-x="true" >
			<view>
				<view class="order_li" v-for="(item,index) in my_order">
					<image class="order_libg" src="/static/images/order_libg.png" mode="aspectFill"></image>
					<view class="order_li_box">
						<view class="order_li_l">
							<image class="order_li_img" src="/static/images/order_img.png" mode="aspectFit"></image>
							<view class="order_li_carid">{{item.province}}{{item.car_code}}</view>
							<!-- 状态 1、待支付 2、待办 3、信息有误 4、已完成 -->
							<!-- 订单状态 1、待支付 2、信息有误 3、待处理 4、无违章 5、有违章 -->
							<view v-if="item.type==1" class="order_li_goorder" @click="$service.jump" :data-url="'/pagesA/rgc_zt_jg/rgc_zt_jg?type=1&code='+item.code"  :data-login="true">
								查看订单<text class="icon icon-next"></text>
							</view>
							<view v-if="item.type==3&&item.status!=4" class="order_li_goorder" @click="$service.jump" :data-url="'/pagesA/rgc_zt_jg/rgc_zt_jg?type=4&code='+item.code"  :data-login="true">
								查看订单<text class="icon icon-next"></text>
							</view>
						</view>
						<view class="order_li_r">
							
							<block v-if="item.type==1&&item.status==2">
								<image class="order_img_type" src="/static/images/order_wait.png" mode="aspectFit"></image>
								<view class="order_tip order_tip1">{{p_config.order_tips}}</view>
							</block>
							<view  v-if="item.type==1&&item.status==3" class="order_tip">信息有误</view>
							<view v-if="item.type==1&&item.status==4" class="order_tip order_tip1">状态查询成功</view>
							
							<view  v-if="item.type==3&&item.status==2" class="order_tip">信息有误</view>
							<block v-if=" item.type==3&&item.status==3">
								<image class="order_img_type" src="/static/images/order_wait.png" mode="aspectFit"></image>
								<view class="order_tip order_tip1">{{p_config.order_tips}}</view>
							</block>
							<block v-if="item.type==3&&item.status==4">
								<image class="order_img_type" src="/static/images/order_ok.png" mode="aspectFit"></image>
								<view class="order_tip order_tip1">恭喜您该车无违章</view>
							</block>
							<view  v-if="item.type==3&&item.status==5" class="order_tip">该车有违章</view>
							<view v-if="item.result&&item.result.length>0" class="order_btn" @click="down_fuc(1,item.result)">一键下载</view>
							<view class="order_code">订单编号：{{item.code}}</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="index_main_tit dis_flex aic">
			<view class="i_tit_li" :class="{active:cur==1}" @click="setcur(1)"><text>汽车美容</text></view>
			<view class="i_tit_li" :class="{active:cur==4}" @click="setcur(4)"><text>加油站</text></view>
			<view class="flex_1"></view>
			<view v-if="loginDatas.store" class="i_tit_r dis_flex aic ju_b" @tap="$service.jump" data-url="/pages_my/store_join1/store_join1" :data-login="true">
				快速入驻<image src="/static/images/i_tit_r.png" mode="aspectFit"></image>
			</view>
			<view v-else class="i_tit_r dis_flex aic ju_b" @tap="$service.jump" data-url="/pages_my/store_join/store_join" :data-login="true">
				快速入驻<image src="/static/images/i_tit_r.png" mode="aspectFit"></image>
			</view>
		</view>
		<view class="data_list">
			<block v-if="cur==1">
				<view  class="data_li" v-for="(item,index) in datas">
					<view class="datali_top" @click="$service.jump" :data-url="'/pages/bus_index/bus_index?id='+item.id">
						<image class="datali_top_img" :src="$service.getimg(item.banner)" mode="aspectFill"></image>
						<view class="datali_top_msg">
							<view class="datalimsg_tit">{{item.title||''}}</view>
							<view class="datalimsg_add">{{item.address||''}}</view>
							<view class="dis_flex aic ju_b">
								<view class="datalimsg_dh"><image src="/static/images/iaddicon.png" mode="aspectFit"></image>导航</view>
								<view class="datalimsg_jl">{{item.juli||'--'}}</view>
							</view>
						</view>
					</view>
					<view class="data_sli dis_flex aic" v-for="(item1,index1) in item.child" @click.stop="$service.jump" :data-url="'/pages/details_qcmr/details_qcmr?id='+item1.id">
						<text class="data_sli_l"></text>
						<view class="flex_1 data_sli_c">{{item1.title}}</view>
						<view class="data_sli_r">￥<text>{{item1.price}}</text></view>
					</view>
					<view class="datasli_more"  @click="$service.jump" :data-url="'/pages/bus_index/bus_index?id='+1">查看全部<text class="icon icon-next"></text></view>
				</view>
				<view  v-if="datas.length>0" class="go_more" @click="$service.jump" data-url="/pagesA/qcmr_list/qcmr_list">查看更多洗车店<text class="icon icon-next"></text></view>
				
			</block>
			<block v-if="cur==4">
				<view class="data_li" v-for="(item,index) in datas" @click="$service.jump" :data-url="'/pages/bus_index/bus_index?type=3&id='+item.id">
					<view class="datali_top">
						<image class="datali_top_img" :src="$service.getimg(item.banner)" mode="aspectFill"></image>
						<view class="datali_top_msg">
							<view class="datalimsg_tit">{{item.title||''}}</view>
							<view class="datalimsg_add">{{item.address||''}}</view>
							<view class="dis_flex aic ju_b">
								<view class="datalimsg_dh"><image src="/static/images/iaddicon.png" mode="aspectFit"></image>导航</view>
								<view class="datalimsg_jl">{{item.juli||'--'}}</view>
							</view>
						</view>
					</view>
					<!-- <view class="data_sli dis_flex aic" @click.stop="$service.jump" data-url="/pages/details_jyz/details_jyz"> -->
					
					<view class="data_sli dis_flex aic" v-for="(item1,index1) in item.child">
						<text class="data_sli_l"></text>
						<view class="flex_1 data_sli_c">{{item1.title}}</view>
						<view class="data_sli_r">￥<text>{{item1.price}}</text></view>
					</view>
					<view class="datasli_more">查看全部<text class="icon icon-next"></text></view>
				</view>
				<view v-if="datas.length>0" class="go_more" @click="$service.jump" data-url="/pagesA/jyz_list/jyz_list">查看更多加油站<text class="icon icon-next"></text></view>
			</block>
			<uni-load-more v-if="list_status" :status="list_status" :contentText="contentText"></uni-load-more>
		</view>
		<view class="index_main_tit dis_flex aic">
			<view class="i_tit_li active" ><text>二手车</text></view>
		</view>
		<view class="car_list dis_flex fww">
			<view class="car_li" v-for="(item,index) in datas_car"  @click="$service.jump" :data-url="'/pages/details_car/details_car?id='+item.id">
				<view class="car_li_box">
					<image class="car_li_img" :src="$service.getimg(item.banner)" mode="aspectFill"></image>
					<view class="car_li_msg">
						<view class="car_li_tit oh2">{{item.title}}</view>
						<view class="car_li_jl oh1">{{item.brand_time||''}}年/{{item.km}}万公里</view>
						<view class="car_li_num">{{item.price}}万</view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more v-if="listc_status" :status="listc_status" :contentText="contentText"></uni-load-more>
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
				list1: [
						// '/static/images/banner.png',
						// '/static/images/banner.png',
						// '/static/images/banner.png',
				],
				cur:1,
				datas:[],
				list_status:'loading',
				listc_status:'loading',
				contentText:{contentdown: "上拉显示更多",contentrefresh: "正在加载...",contentnomore: "暂无数据"},
				datas_car:[],
				page:1,
				my_order:[]
			}
		},
		onLoad() {
			that =this
			that.getnav()
			that.getadd()
			that.getbanner()
			that.getlist(1)
			that.onRetry()
		},
		onShow() {
			if(that.hasLogin){
				that.getmy_order()
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin','loginDatas','addmsg','p_config','navdata']),
		},
		onReachBottom() {
			that.getlist_car()
		},
		watch:{
			hasLogin(val){
				
				if(that.hasLogin){
					that.getmy_order()
				}else{
					that.my_order=[]
				}
			},
			addmsg(val){
				var index=that.cur
				that.getlist(index)
				that.onRetry()
			}
		},
		methods: {
			/**
			 * 首页订单
			 */
			getmy_order(){
				var datas={}
				var jkurl='/order/index'
				
				that.$service.P_get(jkurl, datas).then(res => {
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
						that.my_order=datas
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
			/**
			 * @Description 获取金刚区数据
			 * 
			 */
			getnav(){
				var datas={}
				var jkurl='/index/nav'
				
				that.$service.P_get(jkurl, datas).then(res => {
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
						that.$store.commit('setnavdata',res.data)
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
			
			/**
			 * @Description 获取地理位置信息
			 * 
			 */
			getadd(){
				uni.getLocation({
					type: 'gcj02',
					// #ifdef APP
					geocode:true,
					// #endif
					success: function (res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						that.$store.commit('setaddmsg',res)
						// that.getdata()
					},
					fail: function (res) {
						console.log(res)
					}
				});
			},
			/**
			 * @Description 获取banner
			 * 
			 */
			getbanner(){
				var datas={
					type:1,
				}
				var jkurl='/publics/banner'
				
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
						that.list1=datas.map(function(item){
							return {
								id: item.id,
								img: that.$service.getimg(item.img),
								is_jump: item.is_jump,
								jump_url: item.jump_url,
								title: item.title,
							}
						})
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
			/**
			 * 店铺列表
			 * @param  status = [1|2|3|4] 类型 1、汽车美容 2、摩托车 3、二手车 4、加油站
			 */
			getlist(status){
				// /index/store
				var datas={
					status:status,
					lat:that.addmsg.latitude||'',
					lng:that.addmsg.longitude||'',
					page:1,
					limit:3
				}
				var jkurl='/index/store'
				that.list_status='loading'
				that.datas=[]
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
						that.datas=datas.data
						if(datas.total==0){
							that.list_status='noMore'
							
						}else{
							that.list_status=''
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
			onRetry(){
					that.page=1
					that.datas_car=[]
					that.getlist_car()
			},
			/**
			 * 二手车列表
			 */
			getlist_car(){
				// /index/store
				var datas={
					// store_id:'',
					lat:that.addmsg.latitude||'',
					lng:that.addmsg.longitude||'',
					// is_hot:'',//是否热门推荐 1、是 2、否
					// search:'',
					page:that.page,
					limit:16
				}
				var jkurl='/index/usedcar'
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
							that.datas_car=[]
							that.datas_car=datas.data
						}else{
							that.datas_car=that.datas_car.concat(datas.data)
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
			
			go_vip(num){
				console.log(num)
				uni.setStorageSync('vipnum',num)
				uni.switchTab({
					url:'/pages/vip/vip'
				})
			},
			setcur(index){
				that.cur=index
				that.getlist(index)
			},
			click_fuc(e){
				console.log(e)
				var item=that.list1[e]
				if(item.is_jump==2){
					if(item.jump_url==1){
						uni.navigateTo({
							url:'/pagesA/jyz_list/jyz_list'
						})
					}else if(item.jump_url==2){
						uni.navigateTo({
							url:'/pagesA/qcmr_list/qcmr_list'
						})
					}else if(item.jump_url==3){
						uni.navigateTo({
							url:'/pagesA/rgc_zt/rgc_zt'
						})
					}else if(item.jump_url==4){
						uni.navigateTo({
							url:'/pagesA/rgc_nj/rgc_nj'
						})
					}else if(item.jump_url==5){
						uni.navigateTo({
							url:'/pagesA/rgc_mfpg/rgc_mfpg'
						})
					}else if(item.jump_url==6){
						uni.navigateTo({
							url:'/pagesA/rgc_sb/rgc_sb'
						})
					}else{
						uni.navigateTo({
							url:'/pagesA/rgc_wz/rgc_wz'
						})
					}
				}
				if(item.is_jump==3){
					uni.navigateTo({
						url:'/pagesA/xieyi/xieyi?type=2&id='+item.id
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.banner_box {
		width: 100%;
	}
	.index_tui_list{
		width: 100%;
		.index_tui_li{
			width: 25%;
			padding: 20rpx 0;
			display: flex;
			align-items: center;
			flex-direction: column;
			.index_tui_li_img{
				width: 80rpx;
				height: 80rpx;
				position: relative;
				image{
					width: 100%;
					height: 100%;
				}
				.index_tui_jz{
					min-width:55rpx;
					display: flex;
					align-items: center;
					position: absolute;
					top: -10rpx;
					// left: 70rpx;
					right: -25rpx;
					font-size: 18rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #333333;
					padding: 2rpx 4rpx;
					background: #FDC113;
					border-radius: 10rpx 10rpx 10rpx 0px;
				}
			}
			.index_tui_li_text{
				font-size: 26rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #323233;
				margin-top: 28rpx;
			}
		}
	}
	.indext2_ul{
		width: 100%;
		padding: 22rpx 22rpx;
		.indext2_li{
			width: 33.33%;
			padding: 0 5rpx;
			height: 158rpx;
			position: relative;
			.indext2_libg{
				position: absolute;
				top: 0;
				left: 5rpx;
				right: 5rpx;
				bottom: 0;
				z-index: 10;
				width: 224rpx;
				height: 158rpx;
			}
			.indext2_liinr{
				position: relative;
				z-index: 20;
				width: 100%;
				padding-top: 30rpx;
				padding-left: 30rpx;
				font-size: 28rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #84363A;
				line-height: 36rpx;
				text{
					font-size: 22rpx;
					margin-top: 17rpx;
				}
			}
		}
	}
	.indext3_ul{
			width: 100%;
			padding: 22rpx 17rpx;
			.indext3_li{
				width: 50%;
				height: 110rpx;
				border-radius: 10rpx;
				position: relative;
				.indext3_libg{
					position: absolute;
					top: 0;
					left: 11rpx;
					right: 11rpx;
					width: 336rpx;
					height: 110rpx;
					z-index: 10;
				}
				.indext3_liinr{
					width: 100%;
					height: 110rpx;
					display: flex;
					align-items: center;
					position: relative;
					padding: 0 25rpx;
					z-index: 20;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					image{
						width: 60rpx;
						height: 60rpx;
					}
				}
			}
	}
	.order_list{
		width: 100%;
		// padding: 0 28rpx;
		padding-left: 28rpx;
		height: 245rpx;
		.order_li{
			display: inline-flex;
			width: 674rpx;
			height: 226rpx;
			// border: 1px solid #DAE7F8;
			// background: linear-gradient(0deg, #E9EEF5 0%, #FFFFFF 100%);
			border-radius: 10rpx;
			position: relative;
			&+.order_li{
				margin-left: 20rpx;
			}
			.order_libg{
				position: absolute;
				top: 0;
				z-index: 10;
				width: 100%;
				height: 100%;
			}
			.order_li_box{
				width: 100%;
				height: 100%;
				position: relative;
				z-index: 20;
				display: flex;
				.order_li_l{
					width: 248rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.order_li_img{
						width: 126rpx;
						height: 65rpx;
						margin-bottom: 12rpx;
					}
					.order_li_carid{
						font-size: 30rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #000000;
						line-height: 32rpx;
						margin-bottom: 10rpx;
					}
					.order_li_goorder{
						font-size: 24rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #4680E6;
						text{
							font-size: 26rpx;
						}
					}
				}
				.order_li_r{
					flex:1;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.order_img_type{
						width: 58rpx;
						height: 58rpx;
						margin-bottom: 15rpx;
					}
					.order_tip{
						font-size: 30rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #FE392F;
						line-height: 34rpx;
						margin-bottom: 15rpx;
						&.order_tip1{
							color: #4680E6;
						}
					}
					.order_btn{
						width: 248rpx;
						height: 58rpx;
						background: #4680E6;
						border-radius: 29rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 28rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #FFFFFF;
						margin-bottom: 15rpx;
					}
					.order_code{
						font-size: 24rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #999999;
						line-height: 26rpx;
					}
				}
			}
		}
	}
	.index_main_tit{
		width: 100%;
		padding:25rpx 28rpx 18rpx;
		.i_tit_r{
			width: 164rpx;
			height: 52rpx;
			background: #FDC113;
			border-radius: 26rpx;
			padding: 0 10rpx;
			font-size: 24rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 30rpx;
			image{
				width: 26rpx;
				height: 26rpx;
				margin-left: 10rpx;
			}
		}
		.i_tit_li{
			font-size: 32rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #646566;
			position: relative;
			margin-right: 98rpx;
			text{
				position: relative;
				z-index: 20;
			}
			&.active{
				font-size: 36rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #323233;
				&:before{
					content: '';
					position: absolute;
					bottom: 0;
					left: 0;
					width: 160rpx;
					height: 14rpx;
					background: linear-gradient(90deg, #FDC113 0%, #f8f8f8 80%);
					border-radius: 7rpx;
					z-index: 10;
				}
			}
		}
	}
	.data_list{
		width: 100%;
		padding: 0 28rpx;
		.data_li{
			width: 100%;
			background: #fff;
			border-radius: 10rpx;
			margin-bottom: 22rpx;
			.datali_top{
				width: 100%;
				padding: 30rpx 25rpx;
				display: flex;
				align-items: flex-start;
				.datali_top_img{
					width: 138rpx;
					height: 138rpx;
					border-radius: 10rpx;
					margin-right: 20rpx;
				}
				.datali_top_msg{
					flex:1;
					.datalimsg_tit{
						font-size: 32rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #333333;
						line-height: 40rpx;
						margin-bottom: 18rpx;
					}
					.datalimsg_add{
						font-size: 24rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #BBBBBB;
						line-height: 38rpx;
						margin-bottom: 18rpx;
					}
					.datalimsg_dh{
						width: 96rpx;
						height: 41rpx;
						background: rgba(70,128,230,0.1);
						border: 1px solid #4680E6;
						border-radius: 10rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 24rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #4680E6;
						image{
							width: 18rpx;
							height: 18rpx;
							margin-right: 10rpx;
						}
					}
					.datalimsg_jl{
						font-size: 24rpx;
						font-family: Arial;
						font-weight: 400;
						color: #979898;
					}
				}
			}
			.data_sli{
				border-top: 1px solid #EEEEEE;
				width: 100%;
				height: 96rpx;
				padding: 0 32rpx;
				.data_sli_l{
					width: 12rpx;
					height: 12rpx;
					background: #DDDDDD;
					border-radius: 50%;
					margin-right: 14rpx;
				}
				.data_sli_c{
					font-size: 28rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #333333;
				}
				.data_sli_r{
					font-size: 28rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #E2382F;
					text{
						font-size: 36rpx;
					}
				}
			}
			.datasli_more{
				width: 100%;
				height: 96rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #999999;
				border-top: 1px solid #eee;
				text{
					font-size: 28rpx;
				}
			}
		}
		.go_more{
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 694rpx;
			height: 80rpx;
			background: #FDC113;
			border-radius: 10rpx;
			text{
				font-size: 28rpx;
			}
		}
	}
	.car_list{
		width: 100%;
		padding: 0 20rpx;
		.car_li{
			width: 50%;
			padding:11rpx 8rpx;
			.car_li_box{
				width: 100%;
				height: 428rpx;
				background: #FFFFFF;
				border-radius: 10rpx;
				.car_li_img{
					width: 100%;
					height: 224rpx;
					border-radius: 10rpx 10rpx 0rpx 0rpx;
				}
				.car_li_msg{
					width: 100%;
					padding: 12rpx 20rpx 0; 
				}
				.car_li_tit{
					font-size: 30rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #323233;
					line-height: 42rpx;
					height: 84rpx;
					margin-bottom: 8rpx;
				}
				.car_li_jl{
					font-size: 24rpx;
					font-family: Arial;
					font-weight: 400;
					color: #999999;
					margin-bottom: 8rpx;
					line-height: 30rpx;
					height: 30rpx;
				}
				.car_li_num{
					font-size: 28rpx;
					font-family: Arial;
					font-weight: 400;
					color: #E2382F;
				}
			}
		}
	}
</style>
