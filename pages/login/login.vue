<template>
	<view class="wrap_box dis_flex_c aic">
		<!-- <image class="logo" :src="$service.getimg('/static/mobile/images/logo1.png')" mode="aspectFit"></image> -->
		<!-- <image class="logo_img" src="/static/images/app/logo.png" mode="aspectFit"></image> -->
		<view v-if="v_type==0" class="login_types ju_b">
			<view class="active" >
				注册
			</view>
			<!-- <view :class="{active:v_type==2}" @click="v_type=2">
				验证码登录
			</view> -->
		</view>
		<view v-if="v_type==1" class="login_types ju_b">
			<view class="active" >
				您好，欢迎登录
			</view>
			<!-- <view :class="{active:v_type==2}" @click="v_type=2">
				验证码登录
			</view> -->
		</view>
		<view v-if="v_type==3" class="login_types ju_b">
			<view class="active" >
				忘记密码
			</view>
			<!-- <view :class="{active:v_type==2}" @click="v_type=2">
				验证码登录
			</view> -->
		</view>
		<!-- {{v_type}} -->
		<block v-if="v_type==1">
			<view class="login_li login_li1 dis_flex">
				<text class="iconfont icon-zhanghao icon_l"></text>
				<input class="login_int" type="text"  v-model="tel" placeholder="请输入手机号"/>
			</view>
			<view v-if="!look_type" class="login_li login_li1 dis_flex">
				<text class="iconfont icon-mima icon_l"></text>
				<input class="login_int" type="password"  v-model="pwd" placeholder="请输入密码"/>
				<text class="iconfont icon-yanjing" @click="look_type=true"></text>
			</view>
			<view v-else class="login_li login_li1 dis_flex">
				<text class="iconfont icon-mima icon_l"></text>
				<input class="login_int" type="text"  v-model="pwd" placeholder="请输入密码"/>
				<text class="iconfont icon-biyanjing" @click="look_type=false"></text>
			</view>
		</block>
		
		<block v-if="v_type==0">
			<view class="login_li dis_flex">
				<text class="iconfont icon-zhanghao icon_l"></text>
				<input class="login_int" type="text"  v-model="tel" placeholder="请输入手机号"/>
			</view>
			<view v-if="!look_type" class="login_li login_li1 dis_flex">
				<text class="iconfont icon-mima icon_l"></text>
				<input class="login_int" type="password"  v-model="pwd" placeholder="请输入密码"/>
				<text class="iconfont icon-yanjing" @click="look_type=true"></text>
			</view>
			<view v-else class="login_li login_li1 dis_flex">
				<text class="iconfont icon-mima icon_l"></text>
				<input class="login_int" type="text"  v-model="pwd" placeholder="请输入密码"/>
				<text class="iconfont icon-biyanjing" @click="look_type=false"></text>
			</view>
			<view class="login_li dis_flex">
				<text class="iconfont icon-yanzhengma icon_l"></text>
				<input class="login_int" type="text"  v-model="yzm" placeholder="请输入验证码"/>
				<view v-if="yzm_time==60" @click="getCode" class="login_yzm">获取验证码</view>
				<view v-else class="login_yzm">{{yzm_time}}s</view>
			</view>
			
			<view class="login_li dis_flex">
				<text class="iconfont icon-zhanghao icon_l"></text>
				<input class="login_int" type="text"  v-model="sfz_name" placeholder="请输入真实姓名"/>
			</view>
			
			<view class="login_li dis_flex">
				<text class="iconfont icon-zhanghao icon_l"></text>
				<input class="login_int" type="text"  v-model="sfz_id" placeholder="请输入身份证号"/>
			</view>
			<!-- <view class="login_li dis_flex">
				<image src="/static/images/app/incode_i.png" mode="aspectFit"></image>
				<input class="login_int" type="text"  v-model="yq_code" placeholder="请输入邀请码(非必填)"/>
			</view> -->
		</block>
		<block v-if="v_type==3">
			<view class="login_li dis_flex">
				<text class="iconfont icon-zhanghao icon_l"></text>
				<input class="login_int" type="text"  v-model="tel" placeholder="请输入手机号"/>
			</view>
			<view class="login_li dis_flex">
				<text class="iconfont icon-yanzhengma icon_l"></text>
				<input class="login_int" type="text"  v-model="yzm" placeholder="请输入验证码"/>
				<view v-if="yzm_time==60" @click="getCode" class="login_yzm">获取验证码</view>
				<view v-else class="login_yzm">{{yzm_time}}s</view>
			</view>
			<view v-if="!look_type" class="login_li login_li1 dis_flex">
				<text class="iconfont icon-mima icon_l"></text>
				<input class="login_int" type="password"  v-model="pwd" placeholder="请输入密码"/>
				<text class="iconfont icon-yanjing" @click="look_type=true"></text>
			</view>
			<view v-else class="login_li login_li1 dis_flex">
				<text class="iconfont icon-mima icon_l"></text>
				<input class="login_int" type="text"  v-model="pwd" placeholder="请输入密码"/>
				<text class="iconfont icon-biyanjing" @click="look_type=false"></text>
			</view>
			<!-- <view class="login_li dis_flex">
				<input class="login_int" type="password"  v-model="pwd1" placeholder="请输入确认密码"/>
			</view> -->
		</block>
		<view v-if="v_type==0" class="sub_btn" @click="zhuce_fuc">注 册</view>
		<view v-else-if="v_type==3" class="sub_btn" @click="reset_fuc">确 认</view>
		<view v-else class="sub_btn" @click="login_fuc">登录</view>
		<view v-if="v_type==1" class="login_cz dis_flex aic ju_a">
			<view @click="v_type=3" style="opacity: 0.5;">忘记密码？</view>
			<view  @click="v_type=0" style="opacity: 0.5;">没有账号？<text>注册</text></view>
		</view>
		<!-- <view v-if="v_type==2" class="login_cz dis_flex aic ju_b">
			<view style="opacity: 0.5;"></view>
			<view @click="v_type=1">账号密码登录</view>
			<view></view>
		</view> -->
		<view v-if="v_type==1||v_type==2" style="width:100%;height:160rpx"></view>
		<view class="login_type">
			<!-- <view  v-if="v_type==1||v_type==2" class="login_type_tit">- 其他登录方式 -</view> -->
			<view v-if="v_type==0" class="login_type_tit" @click="v_type=1" style="opacity: 1;">已有账号，去登录</view>
			<view v-if="v_type==3" class="login_type_tit" @click="v_type=1" style="opacity: 1;">去登录</view>
			<!-- #ifndef MP-WEIXIN -->
			<!-- <view v-if="v_type==1||v_type==2" class="dis_flex aic login_type_list">
				<image  @click="loginByWeixin" src="/static/images/app/wx_login.png" mode="aspectFit"></image>
				<image v-if="v_type==1" @click="v_type=2" src="/static/images/app/tel_code.png" mode="aspectFit"></image>
				<image v-if="v_type==2" @click="v_type=1" src="/static/images/app/tel_pwd.png" mode="aspectFit"></image>
				<image v-if="platform=='ios'" @click="ios_app" src="/static/images/app/ios_login.png" mode="aspectFit"></image>
			</view> -->
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view v-if="v_type==1||v_type==2" class="dis_flex aic login_type_list">
				<button v-if="canIUseGetUserProfile" @tap="getUserProfile" class="login-box-wxbtn"></button>
				<button v-else  open-type="getUserInfo" @getuserinfo="getUserInfo" class="login-box-wxbtn"></button>
				<image :src="$service.getimg('/static/mobile/images/wechat.png')" mode="aspectFit"></image>
			</view>
			<!-- #endif -->
		</view>
		<!-- <view v-if="v_type!=3" class="xieyi_box" @click="xy_active=!xy_active"> -->
		<view v-if="v_type==0" class="xieyi_box" @click="xy_active=!xy_active">
			<view class="xieyi_k" :class="{active:xy_active}">
				<text class="iconfont icon-duigou"></text>
			</view>
			我已阅读并同意<text style="color: #FDC113;" @click.stop="$service.jump" data-url="/pagesA/xieyi/xieyi?id=yhxy">《用户协议》</text>和<text style="color: #FDC113;" @click.stop="$service.jump" data-url="/pagesA/xieyi/xieyi?id=ysxy">《隐私政策》</text>
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
				v_type:1, // 0注册 1账号密码登录 2手机号登录 3忘记密码
				options:'',
				tel:'',   //手机号
				pwd:'',  //密码
				yzm:'',  //验证码
				yq_code:'', //邀请码
				pwd1:'',  //确认密码
				sfz_name:'',
				sfz_id:'',
				yzm_time:60,
				xy_active:false,
				canIUseGetUserProfile:false,
				res_code:'',
				look_type:false
			}
		},
		computed: {
		...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','nowtime','platform']),
		},
		onLoad(e) {
			that=this
			that.options=e||{}
			if(e.v_type==1){
				that.v_type=0
			}
			// #ifdef MP-WEIXIN
			if (wx.getUserProfile) {
				that.canIUseGetUserProfile = true
			}
			// #endif
			if(e.invite){
				that.v_type=0
				that.yq_code=e.invite
			}
			console.log(e)
			console.log(that.platform)
			// uni.setNavigationBarColor({
			//     frontColor: '#000000',
			//     backgroundColor: '#f6f6f6',
			//     animation: {
			//         duration: 400,
			//         timingFunc: 'easeIn'
			//     }
			// })
		},
		onShow() {
			
		},
		watch:{
			// v_type(val){
				
			// 	if(val==1||val==2){
			// 		console.log(val)
			// 		uni.setNavigationBarColor({
			// 		    frontColor: '#000000',
			// 		    backgroundColor: '#f6f6f6',
			//     animation: {
			//         duration: 400,
			//         timingFunc: 'easeIn'
			//     }
			// 		})
			// 	}else{
			// 		console.log(val)
			// 		uni.setNavigationBarColor({
			// 		    frontColor: '#000000',
			// 		    backgroundColor: '#ffffff',
			// 				animation: {
			// 						duration: 400,
			// 						timingFunc: 'easeIn'
			// 				}
			// 		})
			// 	}
			// }
		},
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			//ios登录
			ios_app(){
				if(!that.xy_active){
					wx.showToast({
						icon: 'none',
						title: '请先阅读用户协议'
					})
					return
				}
				
				uni.showLoading({
					mask:true,
					title:'正在登录'
				})
				uni.login({
				    provider: 'apple',
				    success: function (loginRes) {
				        // 登录成功
				        uni.getUserInfo({
				            provider: 'apple',
				            success: function(info) {
											console.log(info)
				                // 获取用户信息成功, info.authResult中保存登录认证数据
											//1：小程序授权登录   2：手机号验证码登录    3：账号密码登录   4:token登录  5:微信授权登录 （必传unionid，不传手机号phone字段就是检验账号是否存在，如果返回的是code=-2那就是去携带手机号和验证码登录，发送验证码调用接口的type=3） 6:苹果登录
											var  jkurl='/login'
											var datas={
												type:6,
												// apple_id:info.userInfo.nickName, //苹果登录
												access_token:info.userInfo.identityToken  //苹果登录
											}
											
											
											that.$service.P_post(jkurl, datas).then(res => {
												that.btn_kg = 0
												console.log(res)
												if (res.code == -2) {
													uni.showToast({
														icon: 'none',
														title: res.msg
													})
													
													setTimeout(()=>{
														uni.redirectTo({
															url: '/pages/bind_tel/bind_tel?unionid=' + loginRes.authResult.unionid+'&type='+2
														})
													},1000)
													
													return
												}
												if (res.code == 1) {
													var datas = res.data
													console.log(typeof datas)
											
													if (typeof datas == 'string') {
														datas = JSON.parse(datas)
													}
												
													uni.showToast({
														icon: 'none',
														title: '登录成功'
													});
													that.$store.commit('login',datas)
													setTimeout(()=>{
														uni.navigateBack({
															delta:1
														})
													},1000)
													
												} else {
													if (res.msg) {
														uni.showToast({
															icon: 'none',
															title: res.msg
														})
													} else {
														uni.showToast({
															icon: 'none',
															title: '操作失败'
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
				            }
				        })
				    },
				    fail: function (err) {
							console.log(err)
				        // 登录授权失败  
				        // err.code错误码参考`授权失败错误码(code)说明`
				    }
				});
			},
			// 旧版本
			getUserInfo(e) {
				// 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
				if(!that.xy_active){
					wx.showToast({
						icon: 'none',
						title: '请先阅读用户协议'
					})
					return
				}
				wx.login({
					success: function(res_login) {
						if (res_login.code) {
							wx.getUserInfo({
								withCredentials: true,
								success: function(res_user) {
									// console.log(res_user)
									uni.setStorageSync('res_code', res_login.code);
									uni.setStorageSync('encryptedData', res_user
										.encryptedData);
									uni.setStorageSync('iv', res_user.iv);
									uni.setStorageSync('userInfo', e.detail.userInfo);
									// that.$service.wxlogin(that.in_type)
									that.res_code=res_login.code
									that.getopenid()
								}
							});
						}
					}
			
				})
			},
			// 新版本
			getUserProfile(e) {
				if(!that.xy_active){
					wx.showToast({
						icon: 'none',
						title: '请先阅读用户协议'
					})
					return
				}
				if(that.btnkg==1){
					return
				}
				that.btnkg=1
				setTimeout(()=>{
					that.btnkg=0
				},1000)
				// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
				// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				wx.login({
					success: function(res_login) {
						console.log(res_login)
						uni.setStorageSync('res_code', res_login.code);
						that.res_code=res_login.code
					}
				})
				wx.getUserProfile({
					desc: '用于获取用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						console.log(res)
						uni.setStorageSync('userInfo', res.userInfo);
						uni.setStorageSync('encryptedData', res.encryptedData);
						uni.setStorageSync('iv', res.iv);
						// that.$service.wxlogin(that.in_type)
						that.getopenid()
					}
				})
			},
				
			getopenid(){
				var  jkurl='/sign/xcx_login'
				var datas={
					code:that.res_code
				}
				
				
				that.$service.P_post(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
					
						that.login_xcx(datas)
						
					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
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
			login_xcx(openid){
				var  jkurl='/sign/sign_x'
				var datas={
					type:6,
					wx_applet_openid:openid
				}
				
				
				that.$service.P_post(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == -2) {
						uni.showToast({
							icon: 'none',
							title: res.msg
						})
						
						setTimeout(()=>{
							uni.redirectTo({
								url: '/pages_index/weixin/weixin?openid=' + openid+'&type='+4
							})
						},1000)
						
						return
					}
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
					
						uni.showToast({
							icon: 'none',
							title: '登录成功'
						});
						that.$store.commit('login',datas)
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
						
					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
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
			wx_app(){
				if(that.$service.appVN==0){
					wx.showToast({
						icon: 'none',
						title: '登录成功'
					})
					that.$service.wxlogin('token')
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1000)
					return
				}
				if(that.platform=='ios'){
					return
				}
				if(!that.xy_active){
					wx.showToast({
						icon: 'none',
						title: '请先阅读使用条款和服务协议'
					})
					return
				}
				uni.showLoading({
					mask:true,
					title:'正在登录'
				})
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
				    console.log(loginRes.authResult);
				    // 获取用户信息
				    uni.getUserInfo({
				      provider: 'weixin',
				      success: function (infoRes) {
				        console.log('用户昵称为：' + infoRes.userInfo.nickName);
								
								
								
								var  jkurl='/sign/sign_x'
								var datas={
									type:2,
									wx_applet_openid:loginRes.authResult.openid
								}
								
								
								that.$service.P_post(jkurl, datas).then(res => {
									that.btn_kg = 0
									console.log(res)
									if (res.code == -2) {
										uni.showToast({
											icon: 'none',
											title: res.msg
										})
										
										setTimeout(()=>{
											uni.redirectTo({
												url: '/pages_index/weixin/weixin?openid=' + loginRes.authResult.openid+'&type='+2
											})
										},1000)
										
										return
									}
									if (res.code == 1) {
										var datas = res.data
										console.log(typeof datas)
								
										if (typeof datas == 'string') {
											datas = JSON.parse(datas)
										}
									
										uni.showToast({
											icon: 'none',
											title: '登录成功'
										});
										that.$store.commit('login',datas)
										setTimeout(()=>{
											uni.navigateBack({
												delta:1
											})
										},1000)
										
									} else {
										if (res.msg) {
											uni.showToast({
												icon: 'none',
												title: res.msg
											})
										} else {
											uni.showToast({
												icon: 'none',
												title: '操作失败'
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
				      }
				    });
				  },
					fail: function (err) {
						console.log(err);
						uni.showToast({  
								title: '登陆失败',  
								icon: 'none'  
						})
					}
				});
			},
			//微信登录
			loginByWeixin(){
				// if(that.platform=='ios'){
				// 	return
				// }
				if(!that.xy_active){
					uni.showToast({
						icon:'none',
						title:'请先阅读用户协议'
					})
					return
				}
				uni.showLoading({
					mask:true,
					title:'正在登录'
				})
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
				    console.log(loginRes.authResult);
				    // 获取用户信息
				    uni.getUserInfo({
				      provider: 'weixin',
				      success: function (infoRes) {
				        console.log('用户昵称为：' + infoRes.userInfo.nickName);
								
								var  jkurl='/login'
								var datas={
									type:5,
									nickname:infoRes.userInfo.nickName,
									avatarUrl:infoRes.userInfo.nickName,
									unionid:loginRes.authResult.unionid
								}
								
								
								that.$service.P_post(jkurl, datas).then(res => {
									that.btn_kg = 0
									console.log(res)
									if (res.code == -2) {
										uni.showToast({
											icon: 'none',
											title: res.msg
										})
										
										setTimeout(()=>{
											uni.redirectTo({
												url: '/pages/bind_tel/bind_tel?unionid=' + loginRes.authResult.unionid+'&type='+2
											})
										},1000)
										
										return
									}
									if (res.code == 1) {
										var datas = res.data
										console.log(typeof datas)
								
										if (typeof datas == 'string') {
											datas = JSON.parse(datas)
										}
									
										uni.showToast({
											icon: 'none',
											title: '登录成功'
										});
										that.$store.commit('login',datas)
										setTimeout(()=>{
											uni.navigateBack({
												delta:1
											})
										},1000)
										
									} else {
										if (res.msg) {
											uni.showToast({
												icon: 'none',
												title: res.msg
											})
										} else {
											uni.showToast({
												icon: 'none',
												title: '操作失败'
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
				      }
				    });
				  },
					fail: function (err) {
						console.log(err);
						uni.showToast({  
								title: '登陆失败',  
								icon: 'none'  
						})  
						
						
						
					}
				});
			},
			
			// 注册
			zhuce_fuc(){
				if(that.$service.appVN==0){
					wx.showToast({
						icon: 'none',
						title: '注册成功'
					})
					setTimeout(()=>{
						that.v_type=1
					},1000)
					return
				}
				if(!that.xy_active){
					wx.showToast({
						icon: 'none',
						title: '请先阅读用户协议'
					})
					return
				}
				if (that.tel == '' || !(/^1\d{10}$/.test(that.tel))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}
				if (!that.yzm) {
					wx.showToast({
						icon: 'none',
						title: '请输入验证码'
					})
					return
				}
				if (!that.pwd) {
					wx.showToast({
						icon: 'none',
						title: '请输入密码'
					})
					return
				}
				if (!that.sfz_name) {
					wx.showToast({
						icon: 'none',
						title: '请输入真实姓名'
					})
					return
				}
				if (!that.sfz_id) {
					wx.showToast({
						icon: 'none',
						title: '请输入身份证号'
					})
					return
				}
				// if (that.pwd!=that.pwd1) {
				// 	wx.showToast({
				// 		icon: 'none',
				// 		title: '两次密码不一致'
				// 	})
				// 	return
				// }
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				var datas={
					type:1,
					phone:that.tel,
					code:that.yzm,
					// invite_code:that.yq_code,
					pass:that.pwd,
					// pass:that.pwd1,
					name:that.sfz_name,
					idcard:that.sfz_id,
				}
				
				
				var jkurl='/login/register'
				
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
						wx.showToast({
							icon: 'none',
							title: '注册成功'
						})
						setTimeout(()=>{
							that.v_type=1
						},1000)
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
			// 登录
			login_fuc(){
				
				// if(!that.xy_active){
				// 	uni.showToast({
				// 		icon:'none',
				// 		title:'请先阅读用户协议'
				// 	})
				// 	return
				// }
				if(that.$service.appVN==0){
					uni.showToast({
						icon: 'none',
						title: '登录成功'
					})
					return
				}
				// 1账号密码登录 2手机号登录
				var datas
				if(that.v_type==1){
					if (!that.tel) {
						wx.showToast({
							icon: 'none',
							title: '请输入账号(邮箱/手机号)'
						})
						return
					}
					if (!that.pwd) {
						wx.showToast({
							icon: 'none',
							title: '请输入密码'
						})
						return
					}
					//弃用 1、手机号 2、微信 3、手机号密码 4、token 5、apple
					// 1：小程序授权登录   2：手机号验证码登录    3：账号密码登录   4:token登录  5:微信授权登录  6:苹果登录
					datas={
						type:3,
						phone:that.tel,
						pass:that.pwd,
					}
				}
				if(that.v_type==2){
					if (that.tel == '' || !(/^1\d{10}$/.test(that.tel))) {
						wx.showToast({
							icon: 'none',
							title: '手机号有误'
						})
						return
					}
					if (!that.yzm) {
						wx.showToast({
							icon: 'none',
							title: '请输入验证码'
						})
						return
					}
					//弃用 1、手机号 2、微信 3、手机号密码 4、token 5、apple
					// 1：小程序授权登录   2：手机号验证码登录    3：账号密码登录   4:token登录  5:微信授权登录  6:苹果登录
					datas={
						type:2,
						phone:that.tel,
						code:that.yzm,
					}
				}
				console.log(datas)
				// wx.showToast({
				// 	icon: 'none',
				// 	title: '登录成功'
				// })
				// setTimeout(function(){
				// 	uni.navigateBack()
				// },1000)
				var jkurl='/login/login'
				
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
							icon: 'none',
							title: '登录成功'
						})
						uni.setStorageSync('token',res.data)
						uni.$emit('login_fuc', {
							title: ' 刷新信息 ',
							content: 'item.id'
						});
						// that.$store.commit('login',datas)
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
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
			// 修改密码
			reset_fuc(){
				
				if(that.$service.appVN==0){
					wx.showToast({
						icon: 'none',
						title: '提交成功'
					})
					setTimeout(()=>{
						that.v_type=1
					},1000)
					return
				}
				if (that.tel == '' || !(/^1\d{10}$/.test(that.tel))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}
				if (!that.yzm) {
					wx.showToast({
						icon: 'none',
						title: '请输入验证码'
					})
					return
				}
				if (!that.pwd) {
					wx.showToast({
						icon: 'none',
						title: '请输入密码'
					})
					return
				}
				// if (that.pwd!=that.pwd1) {
				// 	wx.showToast({
				// 		icon: 'none',
				// 		title: '两次密码不一致'
				// 	})
				// 	return
				// }
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				var datas={
					phone:that.tel,
					code:that.yzm,
					pass:that.pwd,
					// new_password:that.pwd1,
				}
				// wx.showToast({
				// 	icon: 'none',
				// 	title: '提交成功'
				// })
				// that.v_type=1
				var jkurl='/login/pass_refund'
				
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
						wx.showToast({
							icon: 'none',
							title: '提交成功'
						})
						setTimeout(()=>{
							that.v_type=1
						},1000)
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
			getCode() {
				let that = this
				if(that.$service.appVN==0){
					uni.showToast({
						icon: 'none',
						title: '发送成功'
					})
					// that.verification_key = res.data.data.key
					that.codetime()
					return
				}
				if (that.tel == '' || !(/^1\d{10}$/.test(that.tel))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				// uni.showToast({
				// 	icon: 'none',
				// 	title: '发送成功'
				// })
				// that.codetime()
				// that.btnkg = 0
				// return
				var jkurl = '/publics/send_sms'
				//type：类型 1、注册 2、忘记密码
				//页面 0注册 1账号密码登录 2手机号登录 3忘记密码
				var data = {
					// type:that.login_type==0?2:that.login_type==2?1:1,
					type:that.v_type==0?1:that.v_type==3?2:0,
					phone: that.tel
				}
				that.$service.P_post(jkurl, data).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
				
						uni.showToast({
							icon: 'none',
							title: '发送成功'
						})
						console.log(res)
						// that.verification_key = res.data.data.key
						that.codetime()
				
					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				}).catch(e => {
					that.btnkg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
				
			
			},
			codetime() {
				let that = this
				let time =that.yzm_time
				let code_type=that.v_type
				let st = setInterval(function() {
					if(code_type!=that.v_type){
						clearInterval(st);
						that.yzm_time=60
						return
					}
					if (time == 0) {
						// that.yzm_type = 0
						clearInterval(st);
						that.yzm_time=60
					} else {
						let news = time--;
						// console.log(news)
						// that.yzm_type = 1
						that.yzm_time = news
			
					}
				}, 1000);
			},
			getimg(img){
				return service.getimg(img)
			},
			jump(e) {
				var that = this
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
					setTimeout(function() {
						that.btnkg = 0
					}, 2000)
				}
				console.log(e.currentTarget.dataset.type)
				service.jump(e)
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

<style  lang="scss" scoped>
.wrap_box{
	padding-top: 30rpx;
	width: 100%;
	min-height: 100vh;
	background: #fff;
	&.wrap_box1{
		background: #F6F6F6;
	}
}
.logo_img{
	// width: 150rpx;
	width: 328rpx;
	height: 247rpx;
	// background: linear-gradient(90deg, #FF9900, #FF6D00);
	// box-shadow: 0px 4px 21px 3px rgba(153, 153, 153, 0.06);
	border-radius: 22rpx;
	margin-bottom: 80rpx;
}
.login_li{
	width: 620rpx;
	margin-bottom: 15rpx;
	// border-bottom: 1px solid #999;
	height: 88rpx;
	background: #fff;
	// border-radius: 44rpx;
	display: flex;
	align-items: center;
	padding-left: 25rpx;
	padding-right: 20rpx;
	border-bottom: 1px solid #ddd;
	text{
		font-size: 30rpx;
		color: #ccc;
	}
	.icon_l{
		font-size: 40rpx;
		color: #c2c2c2;
		// margin: 0 45rpx;
		margin-right: 25rpx;
	}
	// &.login_li1{
	// 	border-bottom: 1px solid #ddd;	
	// 	border-radius: 0;
	// 	// background: #f6f6f6;
	// 	padding-left: 0;
	// }
}
.login_int{
	flex: 1;
	height: 88rpx;
	// font-size: 28rpx;
	font-size: 32rpx;
	color: #333;
	padding: 0 10rpx;
	line-height: 88rpx;
}
.login_yzm{
	height: 100rpx;
	// font-size: 28rpx;
	font-size: 32rpx;
	// color: #333;
	color: #FDC113;
	padding-left: 10rpx;
	display: flex;
	align-items: center;
}
.sub_btn{
	margin-top: 100rpx;
	width: 620rpx;
	height: 84rpx;
	// background: linear-gradient(90deg, #FF9900, #FF6D00);
	background: #FDC113;
	box-shadow: 0px 4rpx 21rpx 3rpx rgba(153, 153, 153, 0.06);
	border-radius: 42rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	// font-size: 28rpx;
	font-size: 32rpx;
	font-weight: bold;
	color: #FFFFFF;
	letter-spacing: 15rpx;
}
.login_cz{
	margin-top: 55rpx;
	width: 620rpx;
	// font-size: 28rpx;
	font-size: 32rpx;
	font-weight: 400;
	color: #333333;
	text{
		color: #fdc113;
	}
}
.login_type{
	margin-top: 60rpx;
}
.login_type_tit{
	// font-size: 24rpx;
	font-size: 30rpx;
	font-weight: 400;
	color: #333333;
	opacity: 0.5;
	text-align: center;
}
.login_type_list{
	margin-top: 35rpx;
	position: relative;
	.login-box-wxbtn{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
		opacity: 0;
	}
	image{
		position: relative;
		z-index: 1;
		width: 66rpx;
		height: 66rpx;
		border-radius: 50%;
		margin: 0 55rpx;
	}
}
.xieyi_box{
	// font-size: 22rpx;
	font-size: 26rpx;
	font-weight: 400;
	color: rgba(51, 51, 51, .5);
	margin-top: 60rpx;
	display: flex;
	align-items: center;
}
.xieyi_k{
	width: 24rpx;
	height: 24rpx;
	border: 1px solid rgba(51, 51, 51, .5);
	border-radius: 50%;
	margin-right: 11rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 18rpx;
	color: #fff;
	overflow: hidden;
	&.active{
		background: #FF9900;
	}
}
.qh_sg{
	width: 2px;
	height: 20px;
	background: #E7E7E7;
	margin: 0 65rpx;
}



// 
.login_types{
	width: 100%;
	// font-size: 52rpx;
	font-size: 42rpx;
	font-family: FZHei-B01S;
	font-weight: 400;
	color: #B3B2B2;
	margin-bottom: 150rpx;
	display: flex;
	align-items: center;
	padding: 0 75rpx;
	// justify-content: space-around;
	.active{
		color: #313131;
	}
}
</style>
