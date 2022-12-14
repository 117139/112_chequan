import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// import Http from '../common/js/http.js'

const store = new Vuex.Store({
	state: {
		loginDatas:'',//登录返回信息
		hasLogin:false,
		loginDatas_user:'', //系统用户信息
		token:'',
		loginPage:'',
		userDatas:'', //微信用户信息
		
		
		cityList:'',
		basedata:'',
		cityinfo:'',
		BaseCityId:'',
		platform:'',
		jl_data:[],
		app_type:1,
		sf_type:0,
		rz_datas:'',
		
		
		isLogin: false,
		isSDKReady: false, // TIM SDK 是否 ready
		conversationActive: {}, //聊天进行中的会话
		toUserId: '', //聊天对象id
		conversationList: [], //会话列表
		currentMessageList: [], //消息列表
		
		
		
		Storedatas:'', //店长信息
		
		addmsg:'',
		p_config:'',
		navdata:'',
	},
	mutations: {
		// 金刚区数据
		setnavdata(state, navdata){
			state.navdata = navdata||{}
		},
		// 公共数据
		setconfig(state, p_config){
			state.p_config = p_config||{}
		},
		// 设置经纬度
		setaddmsg(state, addmsg){
			state.addmsg = addmsg||{}
		},
		setStoredatas(state, Storedatas){
			state.Storedatas = Storedatas||{}
		},
		setsf_type(state, sf_type) {
			state.sf_type = sf_type||[]
		},
		set_rz_datas(state, rz_datas) {
			state.rz_datas = rz_datas||[]
		},
		set_basedata(state, basedata) {
			state.basedata = basedata||[]
		},
		setplatform(state, platform) {
			state.platform = platform
		},
		login(state, loginDatas) {
			state.hasLogin = true
			state.loginDatas = loginDatas
			console.log('loginDatas---->')
			console.log(state.loginDatas)
			uni.setStorageSync('loginDatas', loginDatas)
			
			console.log('token',uni.getStorageSync('token'))
			
			
			// setTimeout(()=>{
			// 	uni.$emit('login_call', {
			// 		title: ' 登录了 ',
			// 		content: ''
			// 	});
			// },1000)
		},
		login_com(state, loginDatas) {
			state.loginDatas_user_com = loginDatas.data[0];
			state.loginPage_com = loginDatas.page;
			state.userDatas_com = uni.getStorageSync('userInfo')
			state.hasLogin_com = true
			console.log(state.hasLogin_com)
			if(loginDatas.token){
				state.token_com = loginDatas.token;
				uni.setStorageSync('token_com',loginDatas.token)
			}else{
				loginDatas.token=state.token
			}
			
				state.loginDatas_com = loginDatas
			uni.setStorageSync('loginDatas_com', loginDatas)
			
			console.log('token_com',uni.getStorageSync('token'))
		},
		logout(state) {
			console.log('logout')
			state.loginDatas = ''
			state.token = ''
			// uni.removeStorageSync('token')
			uni.clearStorageSync()
			state.hasLogin = false
		},
		logout_com(state) {
			console.log('logout_com')
			state.loginDatas_com = ''
			state.token_com = ''
			// uni.removeStorageSync('token_com')
			state.hasLogin_com = false
		},
		
		
		
		
		setBaseCityId(state, BaseCityId) {
			state.BaseCityId = BaseCityId
		},
		setcityinfo(state, cityinfo) {
			state.cityinfo = cityinfo
		},
		setcityList(state, cityList) {
			state.cityList = cityList
		},
		setbasedata(state, basedata) {
			state.basedata = basedata
		},
		
		
		
		//更新登录状态
		toggleIsLogin(state, isLogin) {
			state.isLogin = typeof isLogin === 'undefined' ? !state.isLogin : isLogin
		},
		//更新TIMSDK状态
		toggleIsSDKReady(state, isSDKReady) {
			state.isSDKReady = typeof isSDKReady === 'undefined' ? !state.isSDKReady : isSDKReady
		},
		//退出登录重置状态
		reset(state) {
			state.isLogin = false
			state.isSDKReady = false
		},
		//选择好友聊天--创建会话/拼接会话id
		createConversationActive(state, toUserId) {
			state.conversationActive.conversationID = 'C2C' + toUserId
			console.log(toUserId)
			state.toUserId = toUserId
			state.currentMessageList = []
		},
		//选择已有会话聊天--更新选中会话详情
		updateConversationActive(state, conversationItem) {
			state.conversationActive = Object.assign({}, conversationItem);
			state.toUserId = conversationItem.userProfile.userID
			state.currentMessageList = []
		},
		//更新会话列表
		updateConversationList(state, newConversationList) {
			state.conversationList = newConversationList
		},
		/**
		 * 将消息插入当前会话列表
		 * 调用时机：收/发消息事件触发时
		 * @param {Object} state
		 * @param {Message[]|Message} data
		 * @returns
		 */
		pushCurrentMessageList(state, data) {
			// 还没当前会话，则跳过
			if (Array.isArray(data)) {
				// 筛选出当前会话的消息
				const result = data.filter(item => item.conversationID === state.conversationActive.conversationID)
				state.currentMessageList = [...state.currentMessageList, ...result]
			} else if (data.conversationID === state.conversationActive.conversationID) {
				state.currentMessageList = [...state.currentMessageList, data]
			}
			console.log('1111')
			console.log(state.currentMessageList)
		},
		/**
		 * 滑到顶部请求更多的历史消息
		 * */
		unshiftCurrentMessageList(state, data) {
			console.log(data)
			if (data) {
				state.currentMessageList = [...data, ...state.currentMessageList]
			}
		},
	},
	
})
export default store
