<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<scroll-view scroll-x="true" class="scroll_x topZ_box"  :scroll-into-view="'t'+active">
			<view class="topZ_li" :id="'t'+0" :class="{active:active==0}" @click="active=0">车辆参数</view>
			<view v-if="car_params.body" class="topZ_li" :id="'t'+1" :class="{active:active==1}" @click="active=1">车身尺寸</view>
			<view v-if="car_params.engine" class="topZ_li" :id="'t'+2" :class="{active:active==2}" @click="active=2">动力系统</view>
			<view v-if="car_params.chassisbrake" class="topZ_li" :id="'t'+201" :class="{active:active==201}" @click="active=201">底盘制动</view>
			<view v-if="car_params.drivingauxiliary" class="topZ_li" :id="'t'+3" :class="{active:active==3}" @click="active=3">驾驶辅助</view>
			<view v-if="car_params.safe" class="topZ_li" :id="'t'+4" :class="{active:active==4}" @click="active=4">安全配置</view>
			<view v-if="car_params.internalconfig" class="topZ_li" :id="'t'+5" :class="{active:active==5}" @click="active=5">内部配置</view>
			<view v-if="car_params.entcom" class="topZ_li" :id="'t'+6" :class="{active:active==6}" @click="active=6">信息娱乐</view>
			<view  v-if="car_params.seat" class="topZ_li" :id="'t'+7" :class="{active:active==7}" @click="active=7">座椅配置</view>
			<!-- <view class="topZ_li" :id="'t'+index" :class="{active:active==index}" @click="active=index" v-for="(item,index) in tabs">{{item.title}}</view> -->
		</scroll-view>
		<scroll-view v-if="car_params" scroll-y="true" class="scroll_y" :scroll-into-view="'a'+active">
			<view class="msg_box" id="a0">
				<view class="msg_box_li">
					<view class="msg_box_li1">长*宽*高[mm]</view>
					<view class="msg_box_li2">{{car_params.body.len||'--'}}*{{car_params.body.weight||'--'}}*{{car_params.body.height||'--'}}</view>
				</view>
				<view class="msg_box_li">
					<view class="msg_box_li1">乘员人数[个]</view>
					<view class="msg_box_li2">{{car_params.seatnum||0}}</view>
				</view>
				<view class="msg_box_li">
					<view class="msg_box_li1">发动机</view>
					<view class="msg_box_li2">{{car_params.engine.displacement||''}}/{{car_params.engine.maxhorsepower||''}}马力/{{car_params.engine.fuelmethod||''}}</view>
				</view>
				<view class="msg_box_li">
					<view class="msg_box_li1">最大扭矩[N.m]</view>
					<view class="msg_box_li2">{{car_params.engine.maxtorque||''}}</view>
				</view>
				<view class="msg_box_li">
					<view class="msg_box_li1">燃料类型</view>
					<view class="msg_box_li2">{{car_params.engine.fueltype||''}}</view>
				</view>
				<view class="msg_box_li">
					<view class="msg_box_li1">混合工况油耗[L/100km]</view>
					<view class="msg_box_li2">{{car_params.basic.comfuelconsumption||''}}</view>
				</view>
				<view class="msg_box_li">
					<view class="msg_box_li1">变速箱类型</view>
					<view class="msg_box_li2">{{car_params.gearbox.gearbox||''}}</view>
				</view>
				<view class="msg_box_li">
					<view class="msg_box_li1">环保标准</view>
					<view class="msg_box_li2">{{car_params.environmentalstandards||''}}</view>
				</view>
			</view>
			<view v-if="car_params.body" class="msg_box1" id="a1" >
				<view class="msg_box1_tit">车身尺寸</view>
				<view class="msg_box1_li">
					<view>长*宽*高[mm]</view>
					<view>{{car_params.body.len||'--'}}*{{car_params.body.weight||'--'}}*{{car_params.body.height||'--'}}</view>
				</view>
				<view class="msg_box1_li">
					<view>燃料类型</view>
					<view>{{car_params.engine.fueltype||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>轴距[mm]</view>
					<view>{{car_params.body.wheelbase||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>整备质量[kg]</view>
					<view>{{car_params.body.weight||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>乘员人数[个]</view>
					<view>{{car_params.seatnum||0}}</view>
				</view>
				<view class="msg_box1_li">
					<view>行李箱容积[L]</view>
					<view>{{car_params.body.luggagevolume||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>前轮胎规格</view>
					<view>{{car_params.wheel.fronttiresize||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>后轮胎规格</view>
					<view>{{car_params.wheel.reartiresize||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>备胎类型</view>
					<view>{{car_params.wheel.sparetiretype||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>整车质保</view>
					<view>{{car_params.basic.warrantypolicy||''}}</view>
				</view>
			</view>
			
			<view v-if="car_params.engine" class="msg_box1" id="a2">
				<view class="msg_box1_tit">动力系统</view>
				<view class="msg_box1_li">
					<view>排气量[mL]</view>
					<view>{{car_params.engine.displacementml||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>排气量[L]</view>
					<view>{{car_params.engine.displacement||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>最大马力[Ps]</view>
					<view>{{car_params.engine.maxhorsepower||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>最大功率[kW]</view>
					<view>{{car_params.engine.maxpower||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>最大扭矩[N.m]</view>
					<view>{{car_params.engine.maxtorque||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>最大扭矩转速[rpm]</view>
					<view>{{car_params.engine.maxtorquespeed||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>气缸排列型式</view>
					<view>{{car_params.engine.cylinderarrangetype||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>气缸数</view>
					<view>{{car_params.engine.cylindernum||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>进气型式</view>
					<view>{{car_params.engine.intakeform||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>供油方式</view>
					<view>{{car_params.engine.fuelmethod||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>燃油标号</view>
					<view>{{car_params.engine.fuelgrade||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>变速箱类型</view>
					<view>{{car_params.gearbox.gearbox||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>档位个数</view>
					<view>{{car_params.gearbox.gearnum||''}}</view>
				</view>
			</view>
			<view v-if="car_params.chassisbrake" class="msg_box1" id="a201">
				<view class="msg_box1_tit">底盘制动</view>
				<view class="msg_box1_li">
					<view>车体结构</view>
					<view>{{car_params.chassisbrake.bodystructure||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>转向助力</view>
					<view>{{car_params.chassisbrake.powersteering||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>驱动方式</view>
					<view>{{car_params.chassisbrake.drivemode||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>前制动类型</view>
					<view>{{car_params.chassisbrake.frontbraketype||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>后制动类型</view>
					<view>{{car_params.chassisbrake.rearbraketype||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>驻车制动类型</view>
					<view>{{car_params.chassisbrake.parkingbraketype||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>空气悬挂</view>
					<view>{{car_params.chassisbrake.airsuspension||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>可调悬挂</view>
					<view>{{car_params.chassisbrake.adjustablesuspension||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>前悬挂类型</view>
					<view>{{car_params.chassisbrake.frontsuspensiontype||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>后悬挂类型</view>
					<view>{{car_params.chassisbrake.rearsuspensiontype||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>中央差速器锁</view>
					<view>{{car_params.chassisbrake.centerdifferentiallock||''}}</view>
				</view>
				
			</view>
			<view v-if="car_params.drivingauxiliary" class="msg_box1" id="a3">
				<view class="msg_box1_tit">驾驶辅助</view>
				<view class="msg_box1_li">
					<view>巡航系统</view>
					<view>{{car_params.drivingauxiliary.cruisecontrol||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>碰撞预警/主动刹车</view>
					<view>{{car_params.drivingauxiliary.activebraking||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>自动泊车</view>
					<view>{{car_params.drivingauxiliary.automaticparkingintoplace||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>自动驻车</view>
					<view>{{car_params.drivingauxiliary.automaticparking||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>上坡辅助</view>
					<view>{{car_params.drivingauxiliary.hillstartassist||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>陡坡缓降</view>
					<view>{{car_params.drivingauxiliary.hilldescent||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>夜视系统</view>
					<view>{{car_params.drivingauxiliary.nightvisionsystem||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>盲点检测</view>
					<view>{{car_params.drivingauxiliary.blindspotdetection||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>车辆偏离预警系统</view>
					<view>{{car_params.drivingauxiliary.ldws||''}}</view>
				</view>
			</view>
			<view v-if="car_params.safe" class="msg_box1" id="a4" key="safe">
				<view class="msg_box1_tit">安全配置</view>
				<view class="msg_box1_li">
					<view>刹车防抱死(ABS)</view>
					<view>{{car_params.drivingauxiliary.abs||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>刹车辅助(EBA/BAS/BA/EVA等)</view>
					<view>{{car_params.drivingauxiliary.brakeassist||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>牵引力控制(ASR/TCS/TRC/ATC等)</view>
					<view>{{car_params.drivingauxiliary.tractioncontrol||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>动态稳定控制系统(ESP/DSC等)</view>
					<view>{{car_params.drivingauxiliary.esp||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>驾驶位安全气囊</view>
					<view>{{car_params.safe.airbagdrivingposition||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>副驾驶位安全气囊</view>
					<view>{{car_params.safe.airbagfrontpassenger||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>前排侧安全气囊</view>
					<view>{{car_params.safe.airbagfrontside||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>后排侧安全气囊</view>
					<view>{{car_params.safe.airbagrearside||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>膝部安全气囊</view>
					<view>{{car_params.safe.airbagknee||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>零压续行</view>
					<view>{{car_params.safe.zeropressurecontinued||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>儿童座位固定装置</view>
					<view>{{car_params.seat.childseatfixdevice||''}}</view>
				</view>
			</view>
			<view v-if="car_params.internalconfig" class="msg_box1" id="a5" key="internalconfig">
				<view class="msg_box1_tit">内部配置</view>
				<view class="msg_box1_li">
					<view>车内氛围灯</view>
					<view>{{car_params.light.interiorairlight||''}}</view>
				</view>
				
				<view class="msg_box1_li">
					<view>后排独立空调</view>
					<view>{{car_params.aircondrefrigerator.rearairconditioning||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>车载冰箱</view>
					<view>{{car_params.aircondrefrigerator.carrefrigerator||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>方向盘调节</view>
					<view>{{car_params.internalconfig.steeringwheeladjustmentmode||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>方向盘加热</view>
					<view>{{car_params.internalconfig.steeringwheelheating||''}}</view>
				</view>
			</view>
			<view v-if="car_params.entcom" class="msg_box1" id="a6" key="entcom">
				<view class="msg_box1_tit">信息娱乐</view>
				<view class="msg_box1_li">
					<view>中控台液晶屏</view>
					<view>{{car_params.entcom.consolelcdscreen||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>行车电脑显示器</view>
					<view>{{car_params.internalconfig.computerscreen||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>HUD显示</view>
					<view>{{car_params.entcom.huddisplay||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>CD</view>
					<view>{{car_params.entcom.cd||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>DVD</view>
					<view>{{car_params.entcom.dvd||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>车载电视</view>
					<view>{{car_params.entcom.cartv||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>蓝牙系统</view>
					<view>{{car_params.entcom.bluetooth||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>后排液晶屏</view>
					<view>{{car_params.entcom.rearlcdscreen||''}}</view>
				</view>
			</view>
			<view v-if="car_params.seat" class="msg_box1" id="a7" key="seat">
				<view class="msg_box1_tit">座椅配置</view>
				<view class="msg_box1_li">
					<view>座椅材质</view>
					<view>{{car_params.seat.seatmaterial||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>运动座椅</view>
					<view>{{car_params.seat.sportseat||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>主座椅调节</view>
					<view>{{car_params.seat.driverseatelectricadjustment||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>副座椅调节</view>
					<view>{{car_params.seat.auxiliaryseatelectricadjustment||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>后排座椅调节</view>
					<view>{{car_params.seat.rearseatadjustmentmode||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>座椅通风</view>
					<view>{{car_params.seat.seatventilation||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>座椅加热</view>
					<view>{{car_params.seat.seatheating||''}}</view>
				</view>
				<view class="msg_box1_li">
					<view>座椅按摩</view>
					<view>{{car_params.seat.seatmassage||''}}</view>
				</view>
			</view>
			
			<!-- <view class="msg_box1" :id="item.id" v-for="(item,index) in datas_list">
				<view class="msg_box1_tit">{{item.title}}</view>
				<view class="msg_box1_li" v-for="(item1,index1) in item.list">
					<view>{{item1.title}}</view>
					<view>{{item1.value}}</view>
				</view>
			</view> -->
		</scroll-view>
		<view v-if="datas.store" class="bb_box">
			<view class="bb_box_btn" @click="$service.call"  :data-tel="datas.store.phone">联系商家</view>
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
				options:'',
				datas:'',
				page:1,
				tabs:[
					{
						title:'车辆参数',
						key:'basic',
						id:1
					},
					{
						title:'车身尺寸',
						key:'body',
						id:2
					},
					{
						title:'动力系统',
						key:'engine',
						id:2
					},
					{
						title:'底盘制动',
						key:'chassisbrake',
						id:2
					},
					{
						title:'驾驶辅助',
						key:'drivingauxiliary',
						id:2
					},
					{
						title:'安全配置',
						key:'safe',
						id:2
					},
					{
						title:'内部配置',
						key:'internalconfig',
						id:2
					},
					// {
					// 	title:'外部配置',
					// 	key:'safe',
					// 	id:2
					// },
					{
						title:'信息娱乐',
						key:'entcom',
						id:2
					},
					{
						title:'座椅配置',
						key:'seat',
						id:2
					},
				],
				active:0,
				car_params:{},
				datas_list:[
					{
						title:'车身尺寸',
						id:'a1',
						list:[
							{
								title:'长*宽*高[mm]',
								value:'4933*1836*1469'
							},
							{
								title:'燃料类型',
								value:'汽油'
							},
							{
								title:'轴距[mm]',
								value:'2871'
							},
							{
								title:'整备质量[kg]',
								value:'1575'
							},
							{
								title:'成员人数[个]',
								value:'5'
							},
							{
								title:'行李箱容积[L]',
								value:'521'
							},
							{
								title:'前轮胎规格',
								value:'235/45 R18'
							},
							{
								title:'后轮胎规格',
								value:'235/45 R18'
							},
							{
								title:'备胎类型',
								value:'非全尺寸'
							},
							{
								title:'整车质保',
								value:'3年或10万公里'
							},
						]
					},
					{
						title:'动力系统',
						id:'a2',
						list:[
							{
								title:'排气量[mL]',
								value:'1984'
							},
							{
								title:'排气量[L]',
								value:'2.0'
							},
							{
								title:'最大马力[Ps]',
								value:'186'
							},
							{
								title:'最大功率[kW]',
								value:'137'
							},
							{
								title:'最大功率转速[rpm]',
								value:'4100-6000'
							},
							{
								title:'最大扭矩[N.m]',
								value:'320'
							},
							{
								title:'最大扭矩转速[rpm]',
								value:'1500-4000'
							},
							{
								title:'气缸排列型式',
								value:'直列'
							},
							{
								title:'气缸数',
								value:'4'
							},
							{
								title:'进气型式',
								value:'涡轮增压'
							},
							{
								title:'供油方式',
								value:'混合喷射'
							},
							{
								title:'燃油标号',
								value:'95号'
							},
							{
								title:'变速箱类型',
								value:'双离合'
							},
							{
								title:'档位个数',
								value:'7'
							},
						]
						
					},
					{
						title:'底盘制动',
						id:'a3',
						list:[
							{
								title:'排气量[mL]',
								value:'1984'
							},
							{
								title:'排气量[L]',
								value:'2.0'
							},
							{
								title:'最大马力[Ps]',
								value:'186'
							},
							{
								title:'最大功率[kW]',
								value:'137'
							},
							{
								title:'最大功率转速[rpm]',
								value:'4100-6000'
							},
							{
								title:'最大扭矩[N.m]',
								value:'320'
							},
						]
					},
					{
						title:'驾驶辅助',
						id:'a4',
						list:[
							{
								title:'排气量[mL]',
								value:'1984'
							},
							{
								title:'排气量[L]',
								value:'2.0'
							},
							{
								title:'最大马力[Ps]',
								value:'186'
							},
							{
								title:'最大功率[kW]',
								value:'137'
							},
							{
								title:'最大功率转速[rpm]',
								value:'4100-6000'
							},
							{
								title:'最大扭矩[N.m]',
								value:'320'
							},
						]
					}
				]
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
			console.log(e)
			
			that.getdata()
		},
		onShow() {
			// that.onRetry()
		},
		
		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test(){},
			getdata(){
				var that=this
				var datas={
					id: that.options.id,
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
						that.datas=datas
						var car_params=datas.car_params
						that.car_params=car_params
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
.wrap_box{
	// background: #fff;
	background: #f8f8f8;
}
.topZ_box{
	width: 100%;
	height: 111rpx;
	border-bottom: 1px solid #eee;
	background: #fff;
	.topZ_li{
		font-size: 30rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #333333;
		height: 110rpx;
		display: inline-flex;
		align-items: center;
		position: relative;
		padding: 0 20rpx;
		&.active{
			color: #4680E6;
			position: relative;
			&::after{
				content: '';
				position: absolute;
				bottom: 26rpx;
				left: 50%;
				margin-left: -21rpx;
				width: 42rpx;
				height: 5rpx;
				background: #4680E6;
				border-radius: 3rpx;
			}
		}
	}
}
.scroll_y{
	width: 100%;
	height: calc(100vh - 111rpx - 140rpx);
	// #ifdef H5
	
	height: calc(100vh - 111rpx - 140rpx - 44px);
	// #endif
}
.bb_box{
	margin-top: 20rpx;
	width: 100%;
	height: 120rpx;
	background: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	.bb_box_btn{
		width: 694rpx;
		height: 90rpx;
		background: #4680E6;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #F5F5F5;
	}
}
.msg_box{
	width: 100%;
	background: #fff;
	padding: 20rpx 28rpx;	
	display: flex;
	flex-wrap: wrap;
	.msg_box_li{
		width: 50%;
		padding: 20rpx 0;
	
		.msg_box_li1{
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #999999;
			line-height: 32rpx;
			margin-bottom: 10rpx;
		}
		.msg_box_li2{
			font-size: 28rpx;
			font-family: Arial;
			font-weight: 400;
			color: #333333;
			line-height: 32rpx;
		}
	}
}
.msg_box1{
	margin-top: 20rpx;
	width: 100%;
	background: #fff;
	padding: 20rpx 28rpx;	
	.msg_box1_tit{
		font-size: 36rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #333333;
		line-height: 46rpx;
		margin-bottom: 20rpx;
	}
	.msg_box1_li{
		width: 100%;
		padding: 20rpx 0;
		line-height: 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
		font-family: Arial;
		font-weight: 400;
		color: #333333;
	}
}
</style>
