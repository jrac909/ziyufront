<template>
<div id="essay">
	<header>
      <div class="header-box">
				<img @click="$router.push('/')" src="/static/image/title.png" alt="自愈心理在线咨询" title="在线心理咨询网站" />
				<ul>
					<li @click="$router.push('/')">首页</li>
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
				<button v-if="$store.getters.token !== null">个人中心</button>
      </div>
		</header>
	<div id="main">
		<header>
			<button @click="fetchData" id="all-btn">全部</button>
			<button @click="listByCollect" id="hot-btn">热门</button>
		</header>
		<ul>
			<li v-for="essay in essays">
				<img src="/static/image/bgessay.jpeg">
				<div id="essay-content">
					<h3 @click="goessayDetail(essay.essayId)">{{essay.essayTitle}}</h3>
					<p>{{essay.essayContent}}</p>
					<span>{{ essay.essayCreateDate.split('T')[0] }}&nbsp;&nbsp;&nbsp;{{ essay.essayCreateDate.split('T')[1].split('.')[0] }}</span>
				</div>
				<p @click="gofollow(essay.essayUserId)">{{essay.essayUsername}}</p>
			</li>
		</ul>
		<el-pagination
  			background
  			layout="prev, pager, next"
  			:total="total" :page-size.sync="pagesize" :current-page.sync="currentpage" 
  			@current-change="pagechange">
		</el-pagination>
	</div>
</div>	
</template>
<script>
import { getList, getListByCollect } from '@/api/essay';

export default{ 
	name: "Essay",
	data(){
		return {
			total: 1000,
			pagesize: 10,
			currentpage: 1,
			searchForm: {
				name: ''
			},
			essays: [],
			listType: true
		}
	},
	created(){
		this.fetchData();
	},
	methods: {
		fetchData(){
			getList(this.currentpage, this.pagesize).then(response => {
				this.essays = response.data;
				this.total = response.total;
			}).catch(error => {
				this.$message({
            		type: 'error',
            		message: '数据拉取失败!'
            	});
			})
			this.listType = true;
		},
		queryData(){
			this.$router.push({
        		path: '/zixun',
        		query: {
          			name: this.searchForm.name
        		}
      		});
		},
		listByCollect(){
			getListByCollect(this.currentpage, this.pagesize).then(response => {
				this.essays = response.data;
				this.total = response.total;
			})
			this.listType = false;
		},
		login(){},
		pagechange(){
			if(this.listType){
				this.fetchData();
			}else {
				this.listByCollect();
			}
		},
		goessayDetail(essayId){
      		this.$router.push({
        		path: '/essayDetail',
        		query: {
          			essayId: essayId
        		}
      		})
    	},
    	gofollow(userId){
      		this.$router.push({
      			path: '/follow',
      			query: {
      				userId: userId
      			}
      		})
      	}
	}
}	
</script>
<style style="stylesheet/scss" lang="scss" scoped>
@import '../../styles/essay/essay.scss';
</style>