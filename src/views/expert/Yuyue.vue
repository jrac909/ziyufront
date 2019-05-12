<template>
<div id="yuyue">	
	<FHeader></FHeader>
	<div id="main">
		<header>
			<div id="head-title">
				<h3>咨<br>询<br>时<br>段</h3>
			</div>
			<div id="head-content">
				<p>回应时间：收到订单后我会在24小时内回复是否接受咨询，且在接受预约后会立即通过平台私信发送预约确认信息给您。请注意您的站内私信。</p>
				<p>可预约时间：北京时间早6:00至下午4:30我可以安排咨询。因时差原因，可在北京时间凌晨2:30以后为海外居住的来访者提供咨询。</p>
				<p>若变更预约：若因为不可抗力需要变更/取消已协商好的咨询预约，请务必提前48小时联络我，好另外安排咨询时间。每位来访有两次变更／改期机
会，第三次会收取当次咨询费用</p>
				<p>爽约/迟到：如来访超过五分钟未联系，我会立刻微信或QQ文字或语音信息联系以避免打电</p>
			</div>
		</header>
		<h4>填写预约信息</h4>
		<div id="yuyue-info">
			<p id="chenhu-info">
				<span>您的称呼</span>
				<input type="text" name="">
			</p>
			<p id="age-info">
				<span>年龄</span>
				<input type="number" name="">
			</p>
			<p id="sex-info">
				<span>性别</span>
				<el-radio v-model="radio1" label="1">男</el-radio>
  				<el-radio v-model="radio1" label="2">女</el-radio>
			</p>
			<p id="zixun-info">
				<span>咨询方式</span>
				<el-radio v-model="radio" label="1">面对面咨询</el-radio>
  				<el-radio v-model="radio" label="2">视频咨询</el-radio>
			</p>
			<p id="desc-info">
				<span>问题描述</span>
				<textarea></textarea>
			</p>
			<p id="phone-info">
				<span>手机号码</span>
				<input type="number" name="">
			</p>
			<button id="yuyue-btn">完成</button>
		</div>
	</div>
</div>	
</template>
<script>
import FHeader from '@/components/common/FHeader'

export default{
	name: 'Yuyue',
	data(){
		return {
			radio: '1',
			radio1: '1'
		}
	},
	components: {
		FHeader
	}
}
</script>
<style style="stylesheet/scss" lang="scss" scoped>
@import '../../styles/expert/yuyue.scss';
</style>