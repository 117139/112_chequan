<template>
	<view class="wrap_box">
		<!-- <uParse v-if="datas" :content="datas"></uParse> -->
		<view v-if="options.type==1">
			<rich-text :nodes="nodes"></rich-text>
		</view>
		<view v-else>
			
			<rich-text :nodes="nodes1"></rich-text>
			
		</view>

		<!-- 阻止滑动 -->
		<!-- <view @touchmove.stop.prevent='test'></view> -->
	</view>
</template>

<script>
	// import Vue from 'vue'
	// import {
	// 	mapState,
	// 	mapMutations
	// } from 'vuex'
	var that
	export default {
		data() {
			return {
				options: '',
				datas: '',
				page: 1,
				nodes:'',
				nodes1:'',
			}
		},
		computed: {
			// ...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','loginDatas']),
		},
		// onReachBottom() {
		// 	that.getdata()
		// },
		onLoad(e) {
			that = this
			that.options = e || {}
			console.log(e)
			 that.onRetry()
			 that.onRetry1()
			// that.getdata()
		},
		onShow() {
			// that.onRetry()
		},

		methods: {
			// ...mapMutations(['wxshouquan','login']),
			test() {},
			// 用户协议
			onRetry(){
				this.nodes=`
				
				<p style="margin-bottom:10px;text-align:center">
				    <strong><span style=";font-family:宋体;font-size:21px">用户</span></strong><strong><span style=";font-family:宋体;font-size:21px">协议</span></strong>
				</p>
				<p style="margin-bottom:10px">
				    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
				</p>
				<p style="margin-bottom:10px">
				    <strong><span style=";font-family:宋体;font-size:14px">一、总则</span></strong>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">1.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">您确认：您在使用本服务之前，请您充分阅读、理解并接受本协议的全部内容，一旦您选择</span><span style="font-family:宋体">“同意”并完成注册开启流程或使用本服务，即表示您同意遵循本协议及与之相关的所有约定。</span></span>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">2.&nbsp;</span><span style=";font-family:宋体;font-size:14px">您同意：本公司有权随时对本协议及相应的服务规则内容进行单方面的变更，并以消息推送、网页公告等方式予以公布，无需另行单独通知您；若您在本协议内容公告变更后继续使用本服务的，表示您已充分阅读、理解并接受修改后的协议内容，也将遵循修改后的协议内容使用本服务；若您不同意修改后的协议内容，您应立即停止使用本服务。</span>
				</p>
				<p style="margin-bottom:10px">
				    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
				</p>
				<p style="margin-bottom:10px">
				    <strong><span style=";font-family:宋体;font-size:14px">二、账户</span></strong>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">1.&nbsp;</span><strong><span style=";font-family:宋体;font-size:14px">注册</span></strong>
				</p>
				<p style="margin-bottom:10px;margin-left:56px">
				    <span style="font-family:宋体;font-size:14px">1)&nbsp;</span><strong><span style=";font-family:宋体;font-size:14px">注册者资格</span></strong>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:14px">您确认，在您完成注册程序或以其他本公司允许的方式实际使用本服务时，您应当是具备完全民事权利能力和完全民事行为能力的自然人、法人或其他组织。若您不具备前述主体资格，则您及您的监护人应承担因此而导致的一切后果，且本公司有权注销（永久冻结）您的账户，并向您及您的监护人索偿。</span>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:14px">注册者应确认注册前已获得内容所有权人的合法授权，只有在获我司或其他相关权利人的授权之后才能使用这些内容，而不能擅自复制、再造这些内容、或创造与内容有关的派生产品。</span>
				</p>
				<p style="margin-bottom:10px;margin-left:56px">
				    <span style="font-family:宋体;font-size:14px">2)&nbsp;</span><strong><span style=";font-family:宋体;font-size:14px">注册和账户</span></strong>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:14px">在您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，或在您按照激活页面提示填写信息、阅读并同意本协议且完成全部激活程序后，或您以其他本公司允许的方式实际使用小程序服务时，您即受本协议约束。您可以使用您提供或确认的用户名或者本公司允许的其它方式作为登录手段进入小程序。</span>
				</p>
				<p style="margin-bottom:10px;margin-left:56px">
				    <span style="font-family:宋体;font-size:14px">3)&nbsp;</span><strong><span style=";font-family:宋体;font-size:14px">信息</span></strong>
				</p>
				<p style="margin-bottom:10px;margin-left:56px">
				    <span style="font-family:宋体;font-size:14px">①&nbsp;</span><span style=";font-family:宋体;font-size:14px">在完成注册或激活流程时，您应当按照法律法规要求，按相应页面的提示准确提供并及时更新您的资料，以使之真实、及时，完整和准确。如有合理理由怀疑您提供的资料错误、不实、过时或不完整的，本公司有权向您发出询问或要求改正的通知，并有权直接做出删除相应资料的处理，直至中止、终止对您提供部分或全部服务。本公司对此不承担任何责任，您将承担因此产生的任何直接或间接损失及不利后果。</span>
				</p>
				<p style="margin-bottom:10px;margin-left:56px">
				    <span style="font-family:宋体;font-size:14px">②&nbsp;</span><span style=";font-family:宋体;font-size:14px">您应当准确填写并及时更新您提供的电子邮件地址、联系电话等联系方式，以便本公司需要与您进行联系，因通过这些联系方式无法与您取得联系，导致您在使用我司服务过程中产生任何损失或增加费用的，应由您完全独自承担。您了解并同意，您有义务保持您提供的联系方式的有效性和及时畅通性，如有变更需要更新的，您应按本公司的要求进行操作。</span>
				</p>
				<p style="margin-bottom:10px">
				    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">2.&nbsp;</span><strong><span style=";font-family:宋体;font-size:14px">账户安全</span></strong>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">您须自行负责对您的登录名和密码保密，且须对您在该登录名和密码下发生的所有活动（包括但不限于信息披露、发布信息、网上点击同意或提交各类规则协议、网上续签协议或购买服务等）承担责任。您同意：（</span><span style="font-family:宋体">a）如发现任何人未经授权使用您的登录名和密码，或发生违反保密规定的任何其他情况，您会立即通知本公司，并授权本公司将该信息同步给小程序；（b）确保您在每个上网时段结束时，以正确步骤离开小程序。本公司不能也不会对因您未能遵守本款规定而发生的任何损失或因此需要承担的任何责任负责。您理解本公司对您的请求采取行动需要合理时间，本公司对在采取行动前已经产生的后果（包括但不限于您的任何损失）不承担任何责任，且对本公司已经采取合理行动后但仍未能避免的任何损失负责。除非有法律规定或司法裁定，且征得本公司的同意，否则，您的登录名和密码不得以任何方式转让、赠与或继承（与账户相关的财产权益除外）。</span></span>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">3.&nbsp;</span><strong><span style=";font-family:宋体;font-size:14px">账户注销</span></strong>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:14px">本公司保留在您违反国家、地方法律法规规定或违反本服务条款的情况下中止或终止为您提供服务的权利。</span>
				</p>
				<p style="margin-bottom:10px">
				    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
				</p>
				<p style="margin-bottom:10px">
				    <strong><span style=";font-family:宋体;font-size:14px">三、服务使用与守则</span></strong>
				</p>
				<p style="margin-bottom:10px">
				    <span style=";font-family:宋体;font-size:14px">为有效保障您使用本服务的合法权益，您理解并同意接受以下规则：</span>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">1.&nbsp;</span><span style=";font-family:宋体;font-size:14px">您在使用本服务过程中，本协议内容、页面上出现的关于交易操作的提示或本公司发送到您手机的信息（短信或电话等）内容是您使用本服务的相关规则，您使用本服务即表示您同意接受本服务的相关规则。您了解并同意本公司有权单方修改服务的相关规则，而无须征得您的同意，服务规则应以您使用服务时的页面提示（或发送到该手机的短信或电话等）为准，您同意并遵照服务规则是您使用本服务的前提。</span>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">2.&nbsp;</span><span style=";font-family:宋体;font-size:14px">本公司可能会以电子邮件（或发送到您手机的短信或电话等）方式通知您服务进展情况以及提示您进行下一步的操作，但本公司不保证您能够收到或者及时收到该邮件（或发送到该手机的短信或电话等），且对此承担任何后果。因此，在服务过程中您应当及时登录到小程序查看和进行交易操作。因您没有及时查看和对服务状态进行修改或确认或未能提交相关申请而导致的任何纠纷或损失，本公司不负任何责任。</span>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">3.&nbsp;</span><span style=";font-family:宋体;font-size:14px">您授权本公司可以通过向第三方审核您的身份和资格，并取得您使用本服务的相关资料。您授权本公司可以通过向第三方审核您的身份和资格，并取得您使用本服务的相关资料。</span>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">4.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">在您使用本服务时，本公司有权依照相应的服务收费介绍、订单及</span><span style="font-family:宋体">/或相关协议向您收取服务费用。本公司拥有制订及调整服务费之权利，具体服务费用以您与本公司达成的其他书面协议为准。</span></span>
				</p>
				<p style="margin-bottom:10px">
				    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
				</p>
				<p style="margin-bottom:10px">
				    <strong><span style=";font-family:宋体;font-size:14px">四、您的权利与义务</span></strong>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">1.&nbsp;</span><span style=";font-family:宋体;font-size:14px">您有权利享受我司提供的互联网技术和信息服务，并有权利在接受本公司提供的服务时获得本公司的技术支持、咨询等服务，服务内容详见小程序相关产品介绍。</span>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">2.&nbsp;</span><span style=";font-family:宋体;font-size:14px">您在使用本平台提供的数据类产品或服务时，应遵守本平台关于用户每天调取数据的限制，若您的账户超过正常使用限制，本平台将采取包括但不限于禁止您的账户当天使用权限、删除您爬取的数据等方式维护本平台数据类产品或服务的正常使用规则，并视情况保留对您追索损失的权利。</span>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">3.&nbsp;</span><span style=";font-family:宋体;font-size:14px">您保证不会利用技术或其他手段破坏或扰乱小程序及我司其他客户的小程序。</span>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">4.&nbsp;</span><span style=";font-family:宋体;font-size:14px">您应尊重本公司及其他第三方的知识产权和其他合法权利，并保证在发生侵犯上述权益的违法事件时尽力保护本公司及其股东、雇员、合作伙伴等免于因该等事件受到影响或损失；本公司保留您侵犯本公司合法权益时终止向您提供服务、不退还任何款项并追究所有法律责任的权利。</span>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">5.&nbsp;</span><span style=";font-family:宋体;font-size:14px">对由于您向我司提供的联络方式有误或者联系渠道不畅通以及您用于接受电子邮件</span><span style=";font-family:宋体;font-size:14px">的</span><span style=";font-family:宋体;font-size:14px">安全性、稳定性不佳而导致的一切后果，您应自行承担责任，包括但不限于因您未能及时收到我司的相关通知而导致的后果和损失。</span>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">6.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">您保证您使用本服务时将遵从国家、地方法律法规、行业惯例和社会公共道德，不会利用本公司提供的服务进行存储、发布、传播如下信息和内容：违反国家法律法规政策的任何内容（信息）；违反国家规定的政治宣传和</span><span style="font-family:宋体">/或新闻信息；涉及国家秘密和/或安全的信息；封建迷信和/或淫秽、色情、下流的信息或教唆犯罪的信息；博彩有奖、赌博游戏；违反国家民族和宗教政策的信息；防碍互联网运行安全的信息，侵害他人合法权益的信息和/或其他有损于社会秩序、社会治安、公共道德的信息或内容。您同时承诺不得为他人发布上述不符合国家规定和/或本服务条款约定的信息内容提供任何便利，包括但不限于设置URL、BANNER链接等。您承认本公司有权在您违反上述约定时有权终止向您提供服务并不予退还任何款项，因您上述行为给本公司造成损失的，您应予赔偿。</span></span>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">7.&nbsp;</span><span style=";font-family:宋体;font-size:14px">在使用本软件产品时所涉及到的所有信息和数据：包括但不限于客户资料、信息、数据、文字、软件、声音、相片、录像、图表等均为本公司的商业信息，所有这些信息的内容受版权、商标权、其它知识产权和所有权法律的保护。所以，用户只能在您（个人或单一机构团体）范围内使用。更不得传播至您（个人或单一机构团体）以外的范围，或者用于商业用途。</span>
				</p>
				<p style="margin-bottom:10px">
				    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
				</p>
				<p style="margin-bottom:10px">
				    <strong><span style=";font-family:宋体;font-size:14px">五、我司的权利与义务</span></strong>
				</p>
				<p style="margin-bottom:10px;margin-left:24px">
				    <span style="font-family:宋体;font-size:14px">1.&nbsp;</span><span style=";font-family:宋体;font-size:14px">我司不对用户是否取得信息所有权人合法授权进行实质审查，用户获取或发表信息的行为均系用户个人行为。</span>
				</p>
				<p style="margin-bottom:10px;margin-left:24px">
				    <span style="font-family:宋体;font-size:14px">2.&nbsp;</span><span style=";font-family:宋体;font-size:14px">我司应根据您选择的服务以及交纳款项的情况向您提供合格的网络技术和信息服务。</span>
				</p>
				<p style="margin-bottom:10px;margin-left:24px">
				    <span style="font-family:宋体;font-size:14px">3.&nbsp;</span><span style=";font-family:宋体;font-size:14px">我司承诺对您资料采取对外保密措施，不主动向第三方披露您资料，不授权第三方使用您资料，除非：</span>
				</p>
				<p style="margin-bottom:10px;margin-left:52px">
				    <span style="font-family:宋体;font-size:14px">1)&nbsp;</span><span style=";font-family:宋体;font-size:14px">依据本协议条款或者您与我司之间其他服务协议、合同、在线条款等规定可以提供；</span>
				</p>
				<p style="margin-bottom:10px;margin-left:52px">
				    <span style="font-family:宋体;font-size:14px">2)&nbsp;</span><span style=";font-family:宋体;font-size:14px">依据法律法规的规定应当提供；</span>
				</p>
				<p style="margin-bottom:10px;margin-left:52px">
				    <span style="font-family:宋体;font-size:14px">3)&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">行政、司法等职权部门</span><span style="font-family:宋体">]要求我司提供；</span></span>
				</p>
				<p style="margin-bottom:10px;margin-left:52px">
				    <span style="font-family:宋体;font-size:14px">4)&nbsp;</span><span style=";font-family:宋体;font-size:14px">您同意我司向第三方提供；</span>
				</p>
				<p style="margin-bottom:10px;margin-left:52px">
				    <span style="font-family:宋体;font-size:14px">5)&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">我司解决举报事件、提起诉讼而提交的；</span> </span>
				</p>
				<p style="margin-bottom:10px;margin-left:52px">
				    <span style="font-family:宋体;font-size:14px">6)&nbsp;</span><span style=";font-family:宋体;font-size:14px">我司为防止严重违法行为或涉嫌犯罪行为发生而采取必要合理行动所必须提交的；</span>
				</p>
				<p style="margin-bottom:10px;margin-left:52px">
				    <span style="font-family:宋体;font-size:14px">7)&nbsp;</span><span style=";font-family:宋体;font-size:14px">我司为向您提供产品、服务、信息而向第三方提供的，包括我司通过第三方的技术及服务向您提供产品、服务、信息的情况。</span>
				</p>
				<p style="margin-bottom:10px">
				    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
				</p>
				<p style="margin-bottom:10px">
				    <strong><span style=";font-family:宋体;font-size:14px">六、产品风险提示</span></strong>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">1.&nbsp;</span><span style=";font-family:宋体;font-size:14px">用户应充分认识到投资的风险。公司所提供的所有服务和信息，仅供用户参考使用，不构成用户进行投资操作的直接依据，用户据此操作，风险自担，公司不承担任何经济和法律责任。</span>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">2.&nbsp;</span><span style=";font-family:宋体;font-size:14px">公司通过产品为用户提供财经金融资讯等信息，公司对用户的投资决策可能带来的风险或损失不承担任何违约、赔偿或其他民事责任。</span>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">3.&nbsp;</span><span style=";font-family:宋体;font-size:14px">使用本公司产品由用户自己承担风险，在任何情况下我司不就因使用或不能使用本公司产品所发生的特殊的、意外的、直接的或间接的损失承担赔偿责任。</span>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">4.&nbsp;</span><span style=";font-family:宋体;font-size:14px">本公司无义务对本公司旗下所有平台上第三方提供的数据、信息或其它任何形式的内容进行审核。数据、信息或其它任何形式的内容提供方应当保证其在本公司平台，上展示或以任何方式提供的数据、信息或其它任何形式的内容均不违反国家相关法律法规的规定或涉及侵犯他人权益。用户若要使用本公司旗下任何平台上第三方提供的数据、信息或其它任何形式的内容的，无论是否付费，本公司均只提供平台服务，用户并不就第三方提供的数据、信息或其它任何形式的内容的使用与本公司建立任何关系，用户使用第三方提供的数据、信息或其它任何形式的内容相关的权责均仅与数据、信息或其它任何形式的内容的提供方相关。</span>
				</p>
				<p style="margin-bottom:10px">
				    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
				</p>
				<p style="margin-bottom:10px">
				    <strong><span style=";font-family:宋体;font-size:14px">七、系统中断或故障</span></strong>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:14px">系统可能因下列状况无法正常运作，使您无法使用各项联网服务时，本公司不承担损害赔偿责任，该状况包括但不限于：</span>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">1.&nbsp;</span><span style=";font-family:宋体;font-size:14px">本公司在系统维护</span><span style=";font-family:宋体;font-size:14px">、</span><span style=";font-family:宋体;font-size:14px">停机维护期间；</span>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">2.&nbsp;</span><span style=";font-family:宋体;font-size:14px">电信设备出现故障不能进行数据传输的；</span>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">3.&nbsp;</span><span style=";font-family:宋体;font-size:14px">因台风、地震、海啸、洪水、停电、战争、恐怖袭击等不可抗力之因素，造成本公司系统障碍不能执行业务的；</span>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">4.&nbsp;</span><span style=";font-family:宋体;font-size:14px">由于黑客攻击、电信部门技术调整或故障、小程序升级、银行方面的问题等原因而造成的服务中断或者延迟。</span>
				</p>
				<p style="margin-bottom:10px">
				    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
				</p>
				<p style="margin-bottom:10px">
				    <strong><span style=";font-family:宋体;font-size:14px">八、责任范围及责任限制</span></strong>
				</p>
				<p style="margin-bottom:10px;margin-left:24px">
				    <span style="font-family:宋体;font-size:14px">1.&nbsp;</span><span style=";font-family:宋体;font-size:14px">本公司仅对本协议中列明的责任承担范围负责；</span>
				</p>
				<p style="margin-bottom:10px;margin-left:24px">
				    <span style="font-family:宋体;font-size:14px">2.&nbsp;</span><span style=";font-family:宋体;font-size:14px">本服务之合作单位、顾问及代理等，所提供之服务品质及内容由其自行负责；</span>
				</p>
				<p style="margin-bottom:10px;margin-left:24px">
				    <span style="font-family:宋体;font-size:14px">3.&nbsp;</span><span style=";font-family:宋体;font-size:14px">在法律允许的情况下，本公司对于与本协议有关或由本协议引起的任何间接的、惩罚性的、特殊的、派生的损失（包括业务损失、收益损失、利润损失、使用数据或其他经济利益的损失），不论是如何产生的，也不论是由对本协议的违约（包括违反保证）还是由侵权造成的，均不负有任何责任，即使事先已被告知此等损失的可能性。另外即使本协议规定的排他性救济没有达到其基本目的，也应排除本公司对上述损失的责任；</span>
				</p>
				<p style="margin-bottom:10px;margin-left:24px">
				    <span style="font-family:宋体;font-size:14px">4.&nbsp;</span><span style=";font-family:宋体;font-size:14px">除本协议另有规定外，在任何情况下，您同意本公司对本协议所承担的赔偿责任总额不超过向您收取的当次服务费用总额。</span>
				</p>
				<p style="margin-bottom:10px">
				    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
				</p>
				<p style="margin-bottom:10px">
				    <strong><span style=";font-family:宋体;font-size:14px">九、完整协议</span></strong>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:14px">本协议由本协议条款与小程序公示的各项规则组成，相关名词可互相引用参照，如有不同理解，以本协议条款为准。您对本协议理解和认同，即对本协议所有组成部分的内容理解并认同，一旦您使用本服务，您和本公司即受本协议所有组成部分的约束。</span>
				</p>
				<p style="margin-bottom:10px">
				    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
				</p>
				<p style="margin-bottom:10px">
				    <strong><span style=";font-family:宋体;font-size:14px">十、商标和知识产权的保护</span></strong>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">1.&nbsp;</span><span style=";font-family:宋体;font-size:14px">除第三方产品或服务外，小程序上所有内容，包括但不限于著作、图片、档案、资讯、资料、架构、页面设计，均由本公司或本公司关联企业依法拥有其知识产权，包括但不限于商标权、专利权、著作权、商业秘密等。任何被授权的浏览、复制、打印和传播属于莫尼塔研究小程序内信息内容都不得用于商业目的且所有信息内容及其任何部分的使用都必须包括此版权声明；</span>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">2.&nbsp;</span><span style=";font-family:宋体;font-size:14px">非经本公司或本公司关联企业书面同意，任何人不得擅自截图、使用、修改、复制、公开传播、改变、散布、发行或公开发表小程序上的报告或内容；</span>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style="font-family:宋体;font-size:14px">3.&nbsp;</span><span style=";font-family:宋体;font-size:14px">尊重知识产权是您应尽的义务，如有违反，您应承担损害赔偿责任。</span>
				</p>
				<p style="margin-bottom:10px">
				    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
				</p>
				<p style="margin-bottom:10px">
				    <strong><span style=";font-family:宋体;font-size:14px">十一、法律适用与管辖</span></strong>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:14px">本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律。因本协议产生之争议，各方均有权将争议提交本公司所在地法院予以诉讼。</span>
				</p>
				<p>
				    <br/>
				</p>
				
				
				`
				
			},
			// 隐私政策
			onRetry1(){
				this.nodes1=`
				
				<p style="margin-bottom:10px;text-align:center">
				    <strong><span style=";font-family:宋体;font-size:21px">隐私政策</span></strong>
				</p>
				<p style="margin-bottom:10px;text-align:center">
				    <strong><span style=";font-family:宋体;font-size:16px">&nbsp;</span></strong>
				</p>
				<p style="margin-bottom:10px;text-indent:32px">
				    <span style=";font-family:宋体;font-size:16px">非常</span><span style=";font-family:宋体;font-size:16px">欢迎您使用</span><span style=";font-family:宋体;font-size:16px">莫尼塔研究</span><span style=";font-family:宋体;font-size:16px">小程序</span><span style=";font-family:宋体;font-size:16px">！莫尼塔研究非常重视个人</span><span style=";font-family:宋体;font-size:16px">隐私信息的</span><span style=";font-family:宋体;font-size:16px">保护。请在</span><span style=";font-family:宋体;font-size:16px">使用小程序前仔细阅读并了解此《</span><span style=";font-family:宋体;font-size:16px">隐私</span><span style=";font-family:宋体;font-size:16px">政策》</span><span style=";font-family:宋体;font-size:16px">，</span><span style=";font-family:宋体;font-size:16px">以便</span><span style=";font-family:宋体;font-size:16px">了解</span><span style=";font-family:宋体;font-size:16px">我们对于</span><span style=";font-family:宋体;font-size:16px">收集</span><span style=";font-family:宋体;font-size:16px">信息以及</span><span style=";font-family:宋体;font-size:16px">用途</span><span style=";font-family:宋体;font-size:16px">的操作</span><span style=";font-family:宋体;font-size:16px">方式，</span><span style=";font-family:宋体;font-size:16px">我们会按照</span><span style=";font-family:宋体;font-size:16px">市场关于</span><span style=";font-family:宋体;font-size:16px">隐私的</span><span style=";font-family:宋体;font-size:16px">保护</span><span style=";font-family:宋体;font-size:16px">标准</span><span style=";font-family:宋体;font-size:16px">来</span><span style=";font-family:宋体;font-size:16px">更好的保护您的个人隐私。</span>
				</p>
				<p style="margin-bottom:10px;text-indent:32px">
				    <span style=";font-family:宋体;font-size:16px">当您使用我们的</span><span style=";font-family:宋体;font-size:16px">小程序提供的</span><span style=";font-family:宋体;font-size:16px">产品</span><span style=";font-family:宋体;font-size:16px">及</span><span style=";font-family:宋体;font-size:16px">服务时，即表示您已经同意了本《隐私政策》，否则您不应使用莫尼塔</span><span style=";font-family:宋体;font-size:16px">研究小程序</span><span style=";font-family:宋体;font-size:16px">。除本隐私政策之外</span><span style=";font-family:宋体;font-size:16px">的内容</span><span style=";font-family:宋体;font-size:16px">，在未征得您事先许可的清况下，我们不会向第三方提供您</span><span style=";font-family:宋体;font-size:16px">的个人信息</span><span style=";font-family:宋体;font-size:16px">。如有任何</span><span style=";font-family:宋体;font-size:16px">问题可以随时联系我们。</span>
				</p>
				<p style="margin-bottom:10px;text-indent:32px">
				    <span style=";font-family:宋体;font-size:16px">莫尼塔研究</span><span style=";font-family:宋体;font-size:16px">小</span><span style=";font-family:宋体;font-size:16px">程序</span><span style=";font-family:宋体;font-size:16px">的《</span><span style=";font-family:宋体;font-size:16px">隐私</span><span style=";font-family:宋体;font-size:16px">政策》</span><span style=";font-family:宋体;font-size:16px">主要</span><span style=";font-family:宋体;font-size:16px">包含以下内容：</span>
				</p>
				<p style="margin-bottom:10px;text-indent:32px">
				    <strong><span style=";font-family:宋体;font-size:16px">&nbsp;</span></strong>
				</p>
				<p style="margin-bottom:10px;text-indent:32px">
				    <strong><span style=";font-family:宋体;font-size:16px">一、我们如何收集和使用您的个人信息</span></strong>
				</p>
				<p style="margin-bottom:10px;text-indent:32px">
				    <span style=";font-family:宋体;font-size:16px">个人信息是指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动清况的各种信息。小程序中与您个人无关的信息不属于您的个人信息。</span>
				</p>
				<p style="margin-bottom:10px;text-indent:32px">
				    <span style=";font-family:宋体;font-size:16px">我们会以下列方式收集和使用您的个人信息：为了遵守中国法律的规定，</span><span style=";font-family:宋体;font-size:16px">以及</span><span style=";font-family:宋体;font-size:16px">向您提供相关的服务，我们会收集您在使用我们的小程序过程中产生的相关信息，包括：当您注册登录账号时需要向我们提供以下信息：您的</span><span style=";font-family:宋体;font-size:16px">姓名、微信</span><span style=";font-family:宋体;font-size:16px">昵称、性别</span><span style=";font-family:宋体;font-size:16px">、</span><span style=";font-family:宋体;font-size:16px">头像和您的微信</span><span style=";font-family:宋体;font-size:16px">绑定的</span><span style=";font-family:宋体;font-size:16px">手机号码、</span><span style=";font-family:宋体;font-size:16px">您上传的名片</span><span style=";font-family:宋体;font-size:16px">。这些信息</span><span style=";font-family:宋体;font-size:16px">主要用于验证您的身份</span><span style=";font-family:宋体;font-size:16px">、</span><span style=";font-family:宋体;font-size:16px">接收</span><span style=";font-family:宋体;font-size:16px">参会</span><span style=";font-family:宋体;font-size:16px">提醒</span><span style=";font-family:宋体;font-size:16px">、收集</span><span style=";font-family:宋体;font-size:16px">服务反馈、提升产品及服务体验。</span>
				</p>
				<p style="margin-bottom:10px;text-indent:32px">
				    <span style=";font-family:宋体;font-size:16px">在您</span><span style=";font-family:宋体;font-size:16px">使用小程序期间将授权我们使用上述信息，在您注销账号</span><span style=";font-family:宋体;font-size:16px">时</span><span style=";font-family:宋体;font-size:16px">我们会停止使用并将您的上述信息删除。</span><span style=";font-family:宋体;font-size:16px">在您申请使用</span><span style=";font-family:宋体;font-size:16px">小程序提供的</span><span style=";font-family:宋体;font-size:16px">产品</span><span style=";font-family:宋体;font-size:16px">及服务权限</span><span style=";font-family:宋体;font-size:16px">时，我们会使用手机号码</span><span style=";font-family:宋体;font-size:16px">和</span><span style=";font-family:宋体;font-size:16px">名片</span><span style=";font-family:宋体;font-size:16px">信息</span><span style=";font-family:宋体;font-size:16px">对您进行实名验证，以及经</span><span style=";font-family:宋体;font-size:16px">您授权我们使用的其他</span><span style=";font-family:宋体;font-size:16px">用途</span><span style=";font-family:宋体;font-size:16px">。</span><span style=";font-family:宋体;font-size:16px">如您拒绝提供手机号码</span><span style=";font-family:宋体;font-size:16px">和</span><span style=";font-family:宋体;font-size:16px">名片</span><span style=";font-family:宋体;font-size:16px">信息</span><span style=";font-family:宋体;font-size:16px">可能导致部分功能无法正常使用。</span>
				</p>
				<p style="margin-bottom:10px;text-indent:32px">
				    <span style=";font-family:宋体;font-size:16px">&nbsp;</span>
				</p>
				<p style="margin-bottom:10px;text-indent:32px">
				    <strong><span style=";font-family:宋体;font-size:16px"><span style="font-family:宋体">二、我们如何使用</span><span style="font-family:宋体">Cookie和同类技术</span></span></strong>
				</p>
				<p style="margin-bottom:10px;text-indent:32px">
				    <span style=";font-family:宋体;font-size:16px">Cookie是</span><span style=";font-family:宋体;font-size:16px">互联网中存储和检索信息的一种方式。</span><span style=";font-family:宋体;font-size:16px">在</span><span style=";font-family:宋体;font-size:16px">您使用莫尼塔研究小程序期间，我们</span><span style=";font-family:宋体;font-size:16px">可能</span><span style=";font-family:宋体;font-size:16px">会使用</span><span style=";font-family:宋体;font-size:16px">C</span><span style=";font-family:宋体;font-size:16px">ookie</span><span style=";font-family:宋体;font-size:16px">服务。</span><span style=";font-family:宋体;font-size:16px">我们</span><span style=";font-family:宋体;font-size:16px">不会</span><span style=";font-family:宋体;font-size:16px">将</span><span style=";font-family:宋体;font-size:16px">C</span><span style=";font-family:宋体;font-size:16px">ookie</span><span style=";font-family:宋体;font-size:16px">用于</span><span style=";font-family:宋体;font-size:16px">此《</span><span style=";font-family:宋体;font-size:16px">隐私</span><span style=";font-family:宋体;font-size:16px">政策》</span><span style=";font-family:宋体;font-size:16px">之外</span><span style=";font-family:宋体;font-size:16px">的其他用途。</span>
				</p>
				<p style="margin-bottom:10px;text-indent:32px">
				    <span style=";font-family:宋体;font-size:16px">&nbsp;</span>
				</p>
				<p style="margin-bottom:10px;text-indent:32px">
				    <strong><span style=";font-family:宋体;font-size:16px">三、我们如何共享、转让、公开披露您的个人信息</span></strong>
				</p>
				<p style="margin-bottom:10px;text-indent:32px">
				    <span style=";font-family:宋体;font-size:16px">我们</span><span style=";font-family:宋体;font-size:16px">只会</span><span style=";font-family:宋体;font-size:16px">将</span><span style=";font-family:宋体;font-size:16px">您的个人信息用于提供更好的</span><span style=";font-family:宋体;font-size:16px">产品</span><span style=";font-family:宋体;font-size:16px">和服务</span><span style=";font-family:宋体;font-size:16px">，</span><span style=";font-family:宋体;font-size:16px">不会将您的个人信息分享</span><span style=";font-family:宋体;font-size:16px">、</span><span style=";font-family:宋体;font-size:16px">转让和公开给其他组织或个体，以下情况除外：</span>
				</p>
				<p style="margin-bottom:10px;margin-left:76px">
				    <span style="font-family:宋体;font-size:16px">（1）&nbsp;</span><span style=";font-family:宋体;font-size:16px">经</span><span style=";font-family:宋体;font-size:16px">您</span><span style=";font-family:宋体;font-size:16px">同意</span><span style=";font-family:宋体;font-size:16px">的</span><span style=";font-family:宋体;font-size:16px">信息；</span>
				</p>
				<p style="margin-bottom:10px;margin-left:76px">
				    <span style="font-family:宋体;font-size:16px">（2）&nbsp;</span><span style=";font-family:宋体;font-size:16px">在法律</span><span style=";font-family:宋体;font-size:16px">法规</span><span style=";font-family:宋体;font-size:16px">的规定</span><span style=";font-family:宋体;font-size:16px">内，经政府等上级部门强制要求的信息；</span>
				</p>
				<p style="margin-bottom:10px;margin-left:76px">
				    <span style="font-family:宋体;font-size:16px">（3）&nbsp;</span><span style=";font-family:宋体;font-size:16px">我司进行合并、</span><span style=";font-family:宋体;font-size:16px">被收购</span><span style=";font-family:宋体;font-size:16px">等活动时需要提供给合作主体的</span><span style=";font-family:宋体;font-size:16px">信息，</span><span style=";font-family:宋体;font-size:16px">我们</span><span style=";font-family:宋体;font-size:16px">会要求其签署保密协议</span><span style=";font-family:宋体;font-size:16px">；</span>
				</p>
				<p style="margin-bottom:10px">
				    <span style=";font-family:宋体;font-size:16px">&nbsp;</span>
				</p>
				<p style="margin-bottom:10px;text-indent:32px">
				    <strong><span style=";font-family:宋体;font-size:16px">四、我们如何保存及保护您的个人信息</span></strong>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:16px">我们</span><span style=";font-family:宋体;font-size:16px">非常重视</span><span style=";font-family:宋体;font-size:16px">您个人信息的安全，将努力采取合理的安全措施（包括技术方面和管理方面）来保护您的个人信息。我们会建立安全管理制度、数据安全流程来保障您的个人信息安全。我们采取严格的数据使用和访问制度，确保只有授权人员才可访问您的个人信息，并适时对数据和技术进行安全审计。</span>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:16px">尽管已经采取了上述合理有效措施，并已经遵守了相关法律规定要求的标准，但请您理解，由于技术的限制以及可能存在的各种恶意手段，在互联网行业，即便竭尽所能加强安全措施，也不可能始终保证信息百分之百的安全，我们将尽力确保您提供给我们的个人信息的安全性。您知悉并理解，您接入我们的服务所用的系统和通讯网络，有可能因我们可控范围外的因素而出现问题。因此，我们强烈建议您采取积极措施保护个人信息的安全，不将自己的个人信息透露给他人。</span>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:16px">在不幸发生个人信息安全事件后，我们将按照法律法规的要求，及时向您告知安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们将及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。同时，我们还将按照监管部门要求，主动上报个人信息安全事件的处置情况。</span>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:16px">&nbsp;</span>
				</p>
				<p style="margin-bottom:10px;text-indent:32px">
				    <strong><span style=";font-family:宋体;font-size:16px">五、您的权利</span></strong>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:16px">按照中国相关的法律、法规、标准，以及其他国家、地区的通行做法，我们保障您对自己的个人信息行使以下权利：</span>
				</p>
				<p style="margin-bottom:10px;margin-left:52px">
				    <span style="font-family:宋体;font-size:16px">1.&nbsp;</span><span style=";font-family:宋体;font-size:16px">访问、修改及更新您的个人信息。</span>
				</p>
				<p style="margin-bottom:10px;text-indent:32px">
				    <span style=";font-family:宋体;font-size:16px">您有权通过小程序访问及修改、更新您的个人信息，法律法规另有规定的除外。您有责任及时更新您的个人信息。</span>
				</p>
				<p style="margin-bottom:10px;margin-left:52px">
				    <span style="font-family:宋体;font-size:16px">2.&nbsp;</span><span style=";font-family:宋体;font-size:16px">删除权。</span>
				</p>
				<p style="margin-bottom:10px;margin-left:28px">
				    <span style=";font-family:宋体;font-size:16px">在以下情形中，您可以向我们提出删除个人信息的请求：</span>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:16px">①如果我们终止小程序系统</span><span style=";font-family:宋体;font-size:16px">的</span><span style=";font-family:宋体;font-size:16px">运营及服务；</span>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:16px">②如果您注销了帐号，我们会删除您的个人信息或做匿名化处理</span><span style=";font-family:宋体;font-size:16px">；</span>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:16px">③涉及商业秘密的。</span>
				</p>
				<p style="margin-bottom:10px;margin-left:52px">
				    <span style="font-family:宋体;font-size:16px">3.&nbsp;</span><span style=";font-family:宋体;font-size:16px">注销权。</span>
				</p>
				<p style="margin-bottom:10px;text-indent:32px">
				    <span style=";font-family:宋体;font-size:16px">您可以在个人资料中设置、查阅您的身份信息、账户信息，修改您的个人资料，或者解绑手机号、邮箱、第三方登录信息；如果您申请注销账户，我们会将该账户内的所有信息清空，并不再收集、使用或共享与该账户相关的所有个人信息，根据相关法律法规的要求，我们需要在规定的时间内对您的历史信息另行保存，相关监管部门有权依法进行查询。此外，您也可以通过您的专属销售联系人进行个人信息错误修正或注销账户申请。</span>
				</p>
				<p style="margin-bottom:10px;margin-left:52px">
				    <span style="font-family:宋体;font-size:16px">4.&nbsp;</span><span style=";font-family:宋体;font-size:16px">提前获知产品和服务停止运营权。</span>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:16px"><span style="font-family:宋体">若因特殊原因导致莫尼塔小程序被迫停止运营，我们将提前</span><span style="font-family:宋体">3日以电话</span></span><span style=";font-family:宋体;font-size:16px">、消息、</span><span style=";font-family:宋体;font-size:16px">提醒等</span><span style=";font-family:宋体;font-size:16px">方式</span><span style=";font-family:宋体;font-size:16px">通知您，并将停止对您个人信息的收集，同时会按照法律规定对所持有的您的个人信息进行删除或匿名化处理等。</span>
				</p>
				<p style="margin-bottom:10px;margin-left:52px">
				    <span style="font-family:宋体;font-size:16px">5.&nbsp;</span><span style=";font-family:宋体;font-size:16px">在以下情形中，我们将无法响应您的请求：</span>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:16px">①与个人信息控制者履行法律法规规定的义务相关的；</span>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:16px">②与国家安全、国防安全、公共安全、公共卫生、重大公共利益相关的；</span>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:16px">③与犯罪侦查、起诉、审判和执行判决等直接相关的；</span>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:16px">④</span><span style=";font-family:宋体;font-size:16px">涉及商业秘密的。</span>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:16px">&nbsp;</span>
				</p>
				<p style="margin-bottom:10px;text-indent:32px">
				    <strong><span style=";font-family:宋体;font-size:16px">六、敏感</span></strong><strong><span style=";font-family:宋体;font-size:16px">权限与使用目的</span></strong>
				</p>
				<p style="margin-bottom:10px;margin-left:52px">
				    <span style="font-family:宋体;font-size:16px">1.&nbsp;</span><span style=";font-family:宋体;font-size:16px">相机权限：用户上传身份证或其他文件选择拍照使用</span><span style=";font-family:宋体;font-size:16px">；</span>
				</p>
				<p style="margin-bottom:10px;margin-left:52px">
				    <span style="font-family:宋体;font-size:16px">2.&nbsp;</span><span style=";font-family:宋体;font-size:16px">相册权限：用户上传身份证或其他文件选择图片使用</span><span style=";font-family:宋体;font-size:16px">；</span>
				</p>
				<p style="margin-bottom:10px;margin-left:52px">
				    <span style="font-family:宋体;font-size:16px">3.&nbsp;</span><span style=";font-family:宋体;font-size:16px">通知权限：通知用户个人信息修改成功或使用小程序</span><span style=";font-family:宋体;font-size:16px">参加我司活动成功或者</span><span style=";font-family:宋体;font-size:16px">因</span><span style=";font-family:宋体;font-size:16px">故取消的通知；</span>
				</p>
				<p style="margin-bottom:10px;margin-left:52px">
				    <span style="font-family:宋体;font-size:16px">4.&nbsp;</span><span style=";font-family:宋体;font-size:16px"><span style="font-family:宋体">备注：您可以通过您设备的</span><span style="font-family:宋体">“设置”路径，查看、开启或关闭敏感权限。在不同的设备或系统版本中，相关查看或操作路径可能有所不同，具体请参考设备使用说明或指引。</span></span>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:16px">&nbsp;</span>
				</p>
				<p style="margin-bottom:10px;text-indent:32px">
				    <strong><span style=";font-family:宋体;font-size:16px">七</span></strong><strong><span style=";font-family:宋体;font-size:16px">、隐私政策的更新</span></strong>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:16px">我们的隐私政策可能变更。未经您明确同意，我们不会削减您按照本隐私政策所应享有的权利。我们会在本页面上发布对本隐私政策所做的任何变更。对于重大变更，我们会在产品或服务的主要曝光页面或站内信或其他合适的能触达您的方式通知您。若您不同意该等变更，请您立即停止使用。</span>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:16px">本政策所指的重大变更包括但不限于：</span>
				</p>
				<p style="margin-bottom:10px;margin-left:52px">
				    <span style="font-family:宋体;font-size:16px">1.&nbsp;</span><span style=";font-family:宋体;font-size:16px">服务模式发生重大变化。如处理个人信息的目的、处理的个人信息类型、个人信息的使用方式等；</span>
				</p>
				<p style="margin-bottom:10px;margin-left:52px">
				    <span style="font-family:宋体;font-size:16px">2.&nbsp;</span><span style=";font-family:宋体;font-size:16px">在所有权结构、组织架构等方面发生重大变化。如业务调整、破产并购等引起的所有者变更等；</span>
				</p>
				<p style="margin-bottom:10px;margin-left:52px">
				    <span style="font-family:宋体;font-size:16px">3.&nbsp;</span><span style=";font-family:宋体;font-size:16px">信息共享、转让或公开披露的主要对象发生变化；</span>
				</p>
				<p style="margin-bottom:10px;margin-left:52px">
				    <span style="font-family:宋体;font-size:16px">4.&nbsp;</span><span style=";font-family:宋体;font-size:16px">与个人信息处理方面的权利及其行使方式发生重大变化；</span>
				</p>
				<p style="margin-bottom:10px;margin-left:52px">
				    <span style="font-family:宋体;font-size:16px">5.&nbsp;</span><span style=";font-family:宋体;font-size:16px">负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化时；</span>
				</p>
				<p style="margin-bottom:10px;margin-left:52px">
				    <span style="font-family:宋体;font-size:16px">6.&nbsp;</span><span style=";font-family:宋体;font-size:16px">信息安全影晌评估报告表明存在高风险</span><span style=";font-family:宋体;font-size:16px">时</span><span style=";font-family:宋体;font-size:16px">我们还会将本政策的旧版本存档，供您查阅。</span>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:16px">&nbsp;</span>
				</p>
				<p style="margin-bottom:10px;text-indent:32px">
				    <strong><span style=";font-family:宋体;font-size:16px">八</span></strong><strong><span style=";font-family:宋体;font-size:16px">、如何联系我们</span></strong>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:16px">莫尼塔研究</span><span style=";font-family:宋体;font-size:16px">小程序由</span><span style=";font-family:宋体;font-size:16px">莫尼塔（上海）</span><span style=";font-family:宋体;font-size:16px">信息</span><span style=";font-family:宋体;font-size:16px">咨询有限公司</span><span style=";font-family:宋体;font-size:16px">提供，如果您对小程序有任何</span><span style=";font-family:宋体;font-size:16px">意见或建议</span><span style=";font-family:宋体;font-size:16px">，您可以直接</span><span style=";font-family:宋体;font-size:16px">联系您的销售联系人或者</span><span style=";font-family:宋体;font-size:16px">发邮件至（</span><a href="mailto:sales@cebm.com.cn"><span style="text-decoration:underline;"><span style="font-family: 宋体;color: rgb(5, 99, 193);font-size: 16px">sales</span></span><span style="text-decoration:underline;"><span style="font-family: 宋体;color: rgb(5, 99, 193);font-size: 16px"><span style="font-family:宋体">@</span></span></span><span style="text-decoration:underline;"><span style="font-family: 宋体;color: rgb(5, 99, 193);font-size: 16px">cebm.com</span></span><span style="text-decoration:underline;"><span style="font-family: 宋体;color: rgb(5, 99, 193);font-size: 16px"><span style="font-family:宋体">.</span></span></span><span style="text-decoration:underline;"><span style="font-family: 宋体;color: rgb(5, 99, 193);font-size: 16px">cn</span></span></a><span style=";font-family:宋体;font-size:16px">）。</span>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:16px">&nbsp;</span>
				</p>
				<p style="margin-bottom:10px;text-indent:28px">
				    <span style=";font-family:宋体;font-size:16px">感谢</span><span style=";font-family:宋体;font-size:16px">您</span><span style=";font-family:宋体;font-size:16px">的使用</span><span style=";font-family:宋体;font-size:16px">与理解</span><span style=";font-family:宋体;font-size:16px">！</span>
				</p>
				<p>
				    <br/>
				</p>
				
				
				`
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap_box {
		// background: #fff;
		width: 100%;
		padding: 28rpx;
		min-height: 100vh;
	}
	.xy_tit{
		text-align: center;
		font-size: 40rpx;
		font-weight: bold;
	}
</style>
