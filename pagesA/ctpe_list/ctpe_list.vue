<template>
	<u-index-list :index-list="indexList">
		
		<template v-for="(item, index) in itemArr">
			<!-- #ifdef APP-NVUE -->
			<u-index-anchor :text="indexList[index]"></u-index-anchor>
			<!-- #endif -->
			<u-index-item>
				<!-- #ifndef APP-NVUE -->
				<u-index-anchor :text="indexList[index]"></u-index-anchor>
				<!-- #endif -->
				<view v-if="options.type==1" class="list-cell" v-for="(cell, cindex) in item" @tap="getcx(cell)"
					:data-url="'/pagesA/search/search?type=2&key='+cell.name">
					<!-- <myLazyLoad  class="exPimg"  :src="$service.getimg(cell.img)" :loadTime="index" mode="aspectFit"></myLazyLoad> -->
					{{cell.name}}
					<!-- <image :src="$service.getimg(cell.img)" mode="aspectFit"></image>{{cell.name}} -->
				</view>
				<view v-else class="list-cell" v-for="(cell, cindex) in item" @tap="$service.jump"
					:data-url="'/pagesA/search/search?type=2&key='+cell.name">
					<myLazyLoad  class="exPimg"  :src="$service.getimg(cell.img)" :loadTime="index" mode="aspectFit"></myLazyLoad>
					{{cell.name}}
					<!-- <image :src="$service.getimg(cell.img)" mode="aspectFit"></image>{{cell.name}} -->
				</view>
			</u-index-item>
		</template>
	</u-index-list>
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
				options: '',
				page: 1,
				indexList: [],
				itemArr: [],
				datas: ''
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo', 'loginDatas','car_info','car_info_hot']),
		},
		// onReachBottom() {
		// 	that.getdata()
		// },
		onLoad(e) {
			that = this
			that.options = e || {}
			console.log(e)
			that.setdata()
		},
		onShow() {
			// that.onRetry()
		},

		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test() {},
			getcx(item){
				uni.$emit('carpp_fuc', {
					title: ' 品牌信息 ',
					content: item
				});
				uni.navigateBack()
			},
			setdata(){
				that.indexList=that.car_info.letter||[]
				that.itemArr=that.car_info.list||[]
				// that.getdata()
				if(that.indexList.length==0){
					that.getdata()
				}
			},
			onRetry() {
				that.page = 1
				that.datas = []
				that.getdata()
			},
			getdata1() {

				var datas = {
					// day:that.date,
					page: that.page
				}
				uni.showLoading({
					mask: true,
					title: '正在获取数据'
				})
				var jkurl = '/history'
				var nowpage = that.page
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
						if (nowpage == 1) {
							that.datas = datas.data
						} else {
							if (datas.data.length == 0) {
								return
							}
							that.datas = that.datas.concat(datas.data)
						}
						if (datas.data.length == 0) {
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
			getdata() {

				var datas = {
					id: that.options.id
				}
				var jkurl = '/publics/car_info'

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
						that.indexList = datas.car_info.letter
						that.itemArr = datas.car_info.list
						that.$store.commit('setcardatas',datas)
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

			goback() {
				uni.navigateBack()
			},
			func() {
				// that.$store.commit('setSystem',datas.system)
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		// background: #fff;
	}

	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		height: 80rpx;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
		border-bottom: 1px solid #eee;
		image{
			width: 60rpx;
			height: 60rpx;
			margin-right: 20rpx;
		}
		.exPimg{
			width: 60rpx;
			height: 60rpx;
			margin-right: 20rpx;
		}
	}
</style>
