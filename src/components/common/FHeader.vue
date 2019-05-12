<template>
<div id="header">
	<div class="box">
		<router-link to="/"><img id="header-logo" src="/static/image/title.png" alt="自愈心理在线咨询" title="在线心理咨询网站" /></router-link>
		<ul>
			<li><router-link to="/"><a href="" id="header_shouye">首页</a></router-link></li>
			<span>|</span>
			<li><router-link to="question"><a href="" id="">问答</a></router-link></li>
			<li><router-link to="/zixun"><a href="">咨询</a></router-link></li>
			<li><router-link to="/essay"><a href="">文章</a></router-link></li>
		</ul>
		<form id="search">
			<input v-model="searchText" type="text" placeholder="请输入专家名字/领域关键字">
			<button v-on:click="toZixun" id="search-btn">搜索</button>
		</form>
		<router-link v-if="this.logined == false" to="/fLogin"><button class="login">登录</button></router-link>
		<router-link v-if="this.logined == true && this.userRole == 0" to="/TiWen"><button class="login">个人中心</button></router-link>
		<router-link v-if="this.logined == true && this.userRole == 1" to="/TiWen"><button class="login">管理中心</button></router-link>
	</div>
</div>
</template>
<script>
import {getExpertByNameAndField} from '@/assets/js/expert.js';
import {getToken, setToken, removeToken} from '@/utils/auth.js'

export default{
	name: 'FHeader',
	data(){
		return {
			searchText: "",
			expertList: [],
			logined: false,
			userRole: 0
		}
	},
	methods: {
		toZixun: function(){
			this.$router.push({
					path: '/zixun',
					query: {
						keyWord: this.searchText
					}
				});
		}
	},
/*	created: function(){
		setToken("jdiahaih");
		alert(getToken());
		if (getToken() != ""){
			a = 2;

			alert("a");
		}
	},*/
	mounted: function(){
		if (getToken() != null){
			this.logined = true;
		}
	}
}
</script>
<style scoped>
@import '../../assets/css/fheader.css'
</style>