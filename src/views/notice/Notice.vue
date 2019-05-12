<template>
<div id="notice">
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
		<header>
			<span>系统公告</span>
		</header>
		<section id="notice-detail">
			<ul>
				<li v-for="notice in noticeList">
					<h3 @click="goNoticeDetail(notice.noticeId)">{{notice.noticeTitle}}</h3>
					<p>{{notice.noticeContent}}</p>
					<span id="notice-date">{{notice.noticeCreateDate.split("T")[0]}}</span>
				</li>
			</ul>
		</section>
		<el-pagination
  			background
  			layout="prev, pager, next"
  			:total="total" :page-size.sync="pagesize" :current-page.sync="currentpage" 
  			@current-change="pagechange">
		</el-pagination>
	</section>
</div>
</template>
<script>
import { getlist, queryList } from '@/api/notice';

export default{
	data(){
		return {
			total: 1000,
			pagesize: 10,
			currentpage: 1,
			searchForm:{

			},
			noticeList: []
		}
	},
	created(){
		this.fetchData();
	},
	methods: {
		fetchData(){
			getlist(this.currentpage, this.pagesize).then(response => {
				this.noticeList = response.data;
				this.total = response.total;
			})
		},
		login(){

		},
		queryData(){

		},
		pagechange(){
			alert(this.currentpage);
			this.fetchData();
		},
		goNoticeDetail(id){
			this.$router.push({
				path: '/noticeDetail',
				query: {
					noticeId: id
				}
			})
		}
	}
}
</script>
<style style="stylesheet/scss" lang="scss">
@import '../../styles/notice/notice.scss';
/* 分页样式 */
.el-pagination.is-background .el-pager li:not(.disabled).active{
	background-color: #ABBFFA;
}
.el-pagination{
	width: 300px;
	margin: 0 auto;
	margin-top: 40px;
}
</style>