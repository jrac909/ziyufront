<template>
<div class="registerSuccess">
	<header class="regHeader">
		<h1 class="regSuccessH"><span style="margin-right: 10px;"><svg-icon icon-class="yezi" /></span>自愈心理咨询网站</h1>
	</header>
	<p>
		<i class="el-icon-check" style="color: #38ABFA; font-size: 40px;"></i>&nbsp;&nbsp;您已成功注册自愈咨询网
	</p>
	<div class="regUser">
		<a @click="gologin">立即登录>></a>
	</div>	
</div>
</template>
<script>
export default{
	name: 'RegisterSuccess',
	methods: {
		gologin(){
			this.$router.push({ path: '/login' });
		}
	}
}
</script>
<style>
.registerSuccess{
	background-color: #FFF;
	height: 100px;
}
.regHeader{
	height: 80px;
	background-color: #5193B1;
}
.regHeader .regSuccessH{
	color: #FFF;
	font-weight: 700;
	float: left;
	font-size: 24px;
	line-height: 80px;
	margin-left: 50px;
}
.registerSuccess > p{
	font-size: 40px;
	font-weight: 700;
	margin-top: 140px;
}
.regUser{
	margin-top: 30px;
	margin-bottom: 200px;
}
.regUser a{
	text-decoration: none;
	color: #38ABFA;
	font-size: 14px;
	margin-left: 380px;
	cursor: pointer;
}
</style>