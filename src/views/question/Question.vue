<template>
<div id="question">
	<header>
      	<div class="header-box">
			<router-link to="/"><img src="/static/image/title.png" alt="自愈心理在线咨询" title="在线心理咨询网站" /></router-link>
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
			<button @click="login" class="login_btn" v-if="$store.getters.token === null">登录</button>
			<button v-if="$store.getters.token !== null">个人中心</button>
     	</div>
	</header>
	<div id="ques_main">
		<section id="ques_list">
			<div id="ques_list_header">
				<span>提问</span>
				<button @click="fetchData">按时间</button>
				<button @click="queryQUCByHot">按热度</button>
				<select v-model="quesType" @change="queryByType">
					<option v-for="(item, index) in typesops" :key="index">{{item.qtName}}</option>
				</select>
			</div>
			<ul>
				<li v-for="item in queslist">
					<div class="ques_user">
						<img v-bind:src="item.userPhoto">
					</div>
					<div class="ques_detail">
						<p class="ques-user-info"><span>{{item.userNickname}}</span><button>去回答</button></p>
						<p><span class="ques_item_time">{{ item.quesCreateDate.split("T")[0] }}</span></p>
						<h3 @click="godetail(item.quesId)">{{item.quesTitle}}</h3>
						<span class="ques_item_count">{{item.quesAnsCount}}回答</span>
						<p class="ques-item-content">{{item.quesContent}}</p>
						<p class="ques-item-footer">
							<span style="cursor: pointer; color: #999; font-size: 14px;"><svg-icon style="color: #BCC2CF;" icon-class="shoucang" />&nbsp;收藏</span>
						</p>
					</div>
				</li>
			</ul>
			<el-pagination
  			background
  			layout="prev, pager, next"
  			:total="total" :page-size.sync="pagesize" :current-page.sync="currentpage" 
  			@current-change="pagechange">
			</el-pagination>
		</section>
		<section id="userInfo">
			<div id="ques_search">
				<input v-model="searchQues" id="ques_sear_input" type="search" name="search" placeholder="请输入问题">
				<button @click="queryQues" id="ques_sear_btn"><span><svg-icon style="font-size: 28px; color: #C5CAD6;" icon-class="search" /></span></button>
			</div>
			<UserPanel></UserPanel>
		</section>
	</div>
</div>
</template>
<script>
import UserPanel from '@/components/common/UserPanel'

import { getQuesList } from '@/api/question';
import { getQuesTagList } from '@/api/questionTag';
import { listQUC, queryQUC, queryQUCByHot, queryQUCByType } from '@/api/quesusercon';

export default{
	name: 'Question',
	data(){
		return {
			total: 1000,
			pagesize: 10,
			currentpage: 1,
			searchForm: {
				name: ''
			},
			searchQues: '',
			quesType: '青少年',
			queslist: [],
			typesops: []
		}
	},
	components: {
		UserPanel
	},
	created(){
		this.fetchData();
	},
	methods: {
		fetchData(){
			listQUC(this.currentpage, this.pagesize).then(response => {
				this.queslist = response.data;
				this.total = response.total;
			})
			getQuesTagList(1, 1000).then(response => {
				this.typesops = response.data
			})
		},
		queryData(){

		},
		queryQues(){
			queryQUC(this.currentpage, this.pagesize, this.searchQues).then(response => {
				this.queslist = response.data;
				this.total = response.total;
			})
		},
		queryQUCByHot(){
			queryQUCByHot(this.currentpage, this.pagesize).then(response => {
				this.queslist = response.data;
			}).catch(error => {

			})
		},
		queryByType(){
			queryQUCByType(this.currentpage, this.pagesize, this.quesType).then(response => {
				this.queslist = response.data;
				this.total = response.total;
			})
		},
		pagechange(){
			this.fetchData();
		},
		godetail(id){
			this.$router.push({
				path:'questionDetail',
				query: {
					quesId: id 
				}
			})
		},
		login(){
      		this.$router.push({
        		path: 'login'
      		});
    	}
	}
}
</script>
<style style="stylesheet/scss" lang="scss">
@import '../../styles/question/question.scss';
</style>