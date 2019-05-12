<template>
<div class="app-container">
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
			<button @click="login" v-if="$store.getters.token === null">登录</button>
			<button v-if="$store.getters.token !== null">个人中心</button>
     	</div>
	</header>
	<section class="head">
		<span>分类</span>
		<select style="background-color: #FFAD76;">
			<option>不限</option>
			<option>职场</option>
		</select>
		<span>方式</span>
		<select style="background-color: #AD76AD;">
			<option>面对面咨询</option>
			<option>视频咨询</option>
		</select>
		<span>城市</span>
		<select style="background-color: #FF7676;">
			<option>北京</option>
			<option>上海</option>
		</select>
		<div class="ruzhu-panel">
			<p>已有{{ this.expertCount }}位专家入驻</p>
			<button v-if="$store.getters.role == 0">申请入驻</button>
			<button v-if="$store.getters.role == 2">审核情况</button>
			<h3 v-if="$store.getters.role == 1">感谢您的入驻！</h3>
		</div>
	</section>
	<section class="experts">
		<ul class="zj-info">
        	<li v-for="expert in expertList">
          		<img class="zj-bg" src="/static/image/img19.jpg">
          		<img class="zj-photo" v-bind:src="expert.userPhoto">
          		<p class="zj-name">{{expert.expertTrueName}}</p>
          		<p class="zj-shuoming">{{expert.expertShuoming}}</p>
          		<ul class="zj-shanchang">
            		<li>
              			<button>{{expert.expertFieldFirst}}</button>
              			<button>{{expert.expertFieldSecond}}</button>
              			<button>{{expert.expertFieldThird}}</button>
            		</li>
          		</ul>
          		<button @click="goexpert(expert.expertId)" class="zj-yuyue">查看 </button>
        	</li>
      	</ul>
    </section>
      <div style='clear:both'></div>
      <div></div>
      <el-pagination
  			background
  			layout="prev, pager, next"
  			:total="total" :page-size.sync="pagesize" :current-page.sync="currentpage" 
  			@current-change="pagechange">
		</el-pagination>
	  <div id="zhan"></div>
	<div style='clear:both'></div>
</div>	
</template>
<script>
import { listEUC, queryEUC, getExpertCount } from '@/api/expert';

export default{
	name: 'Zixun',
	data(){
		return {
			expertCount: 0,
			total: 1000,
			currentpage: 1,
			pagesize: 10,
			searchForm: { name: ''},
      		expertList: [],
      		expertFieldList: [],
		}
	},
  created(){
  	const name = this.$route.query.name;
  		if (name !== '' && name != null){
  			this.searchForm.name = name;
  		}
  	this.fetchData();
  	this.getExpertCount();
  },
  methods: {
  	fetchData(){
  		queryEUC(this.currentpage, this.pagesize, this.searchForm.name).then(response => {

  			this.expertList = response.data;
  			this.total = response.total;
  		})
  	},
  	queryData(){
  		this.fetchData();
  	},
  	pagechange(){
  		this.fetchData();
  	},
  	login(){
 		},
 		getExpertCount(){
 			getExpertCount().then(response => {
 				this.expertCount = response.data;
 			})
  	},
  	goexpert(expertId){
      this.$router.push({
        path: '/expert',
        query: {
          expertId: expertId
        }
      })
    }
  }
}
</script>
<style style="stylesheet/scss" lang="scss" scoped>
@import '../../styles/expert/zixun.scss';
</style>