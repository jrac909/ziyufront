<template>
<div id="zy-footer">
	<div id="footer-box">
		<ul class="question">
			<li>常见问题</li>
			<li><a href="">注册登录</a></li>
			<li><a href="">账号密码</a></li>
		</ul>
		<ul class="about">
			<li>关于网站</li>
			<li><a href="">关于我们</a></li>
			<li><a href="">加入我们</a></li>
		</ul>
		<ul class="zixun-info">
			<li>客服咨询</li>
			<li><span class="el-icon-phone"></span>13330754958</li>
			<li><span class="el-icon-message"></span>909149244@qq.com</li>
		</ul>
		<hr>
		<p>作者：成都信息工程大学软件工程 152 班王海雪</p>
	</div>
</div>
</template>
<script>
export default{
	name: "FFooter"
}
</script>
<!-- 注意：scoped 不是为了不受外面样式的影响，而是不影响其他样式，所以最好不要用，像公用这种，命名一定要唯一，就是要保证在被使用的地方也唯一 -->
<style>
#zy-footer{
	width: 100%;
	height: 150px;
	background-color: #FFF;
}
#footer-box{
	height: 150px;
	width: 1000px;
	margin: 0 auto;
	border-top: 1px solid #CCC;
}
#footer-box ul{ 
	list-style-type: none;
	margin-top: 20px;
	float: left;
}
.question{
	width: 200px;
}
.question li{
	line-height: 20px;
}
.question li a{
	font-size: 12px;
	text-decoration: none;
	color: #9A9A9A;
}
.question li a:hover{
	text-decoration: underline;
	color: #797979;
}
.question li:first-child{
	margin-bottom: 12px;
	font-size: 14px;
	font-weight: bold;
}
.about{
	width: 200px;
}
.about li{
	line-height: 20px;
}
.about li a{
	font-size: 12px;
	text-decoration: none;
	color: #9A9A9A;
}
.about li a:hover{
	text-decoration: underline;
	color: #797979;
}
.about li:first-child{
	margin-bottom: 12px;
	font-size: 14px;
	font-weight: bold;
}
.zixun-info{
	width: 200px;
	margin-left: 200px;
}
.zixun-info li{
	text-align: left;
	line-height: 25px;
	font-size: 14px;
}
.zixun-info li:first-child{
	font-weight: bold;
	margin-bottom: 20px;
	font-size: 18px;
}
#footer-box hr{
	width: 1000px;
	float: left;
}
#footer-box p{
	float: right;
	color: #9A9A9A;
	font-size: 14px;
}
</style>