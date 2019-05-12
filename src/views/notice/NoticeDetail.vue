<template>
<div>
	<header>
      	<div class="header-box">
				<img src="/static/image/title.png" alt="自愈心理在线咨询" title="在线心理咨询网站" />
				<ul>
					<li>首页</li>
					<span>|</span>
					<li @click="$router.push('question')">问答</li>
					<li @click="$router.push('zixun')">咨询</li>
					<li @click="$router.push('essay')">文章</li>
				</ul>
				<form :model="searchForm" auto-complete="on" >
					<input v-model="searchForm.name" type="text" placeholder="请输入专家名字/领域关键字">
					<button @click="queryData">搜&nbsp;&nbsp;索</button>
				</form>
				<button @click="login" v-if="$store.getters.token === null">登录</button>
				<button @click="$router.push('user')" v-if="$store.getters.token !== null">个人中心</button>
      	</div>
	</header>
	<section id="main">
		<section id="notice-panel">
			<h2>{{ this.curnotice.noticeTitle }}</h2>
			<span id="notice-time">发布时间：{{ this.curnotice.noticeCreateDate.split('T')[0] }}</span>
			<p>{{ this.curnotice.noticeContent }}</p>
		</section>
		<section id="notice-list">
			<div id="userInfo">
				<img src="/static/image/img9.jpg">
				<div id="infobox">
					<h3>系统管理员</h3>
					<span>有问题可私信</span>
					<button>私信</button>
				</div>
			</div>
			<div id="xitong-notice">
				<h4>系统公告</h4>
				<a href="">更多>></a>
				<ul>
					<li v-for="notice in notices"><a href="">{{notice.title}}</a></li>
				</ul>
			</div>
		</section>
	</section>
</div>
</template>
<script>
import { getnotice } from '@/api/notice';

export default{
	name: 'NoticeDetail',
	data(){
		return {
			noticeId: 0,
			curnotice: {},
			searchForm: {
				name: ''
			},
			notices: [
				{
					"title": "关于一个什么的测试，还挺有意思的。"
				},
				{
					"title": "做了一个梦，你猜是什么?"
				},
				{
					"title": "如果感兴趣就点进来啊"
				}
			]
		}
	},
	created(){
		this.noticeId = this.$route.query.noticeId;
		this.fetchData();

	},
	methods: {
		fetchData(){
			getnotice(this.noticeId).then(response => {
				this.curnotice = response.data;
			})
		},
		queryData(){

		},
		login(){
			 
		}
	}
}
</script>
<style style="stylesheet/scss" lang="scss" scoped>
@import '../../styles/notice/noticeDetail.scss'
</style>