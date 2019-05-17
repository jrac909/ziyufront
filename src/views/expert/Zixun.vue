<template>
<div class="app-container">
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
        <button @click="login" class="login_btn" v-if="$store.getters.token === null">登录</button>
        <div class="user_center" v-if="$store.getters.token !== null">
          <el-row class="block-col-2">
            <el-col :span="12">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <img class="user_photo" :src="$store.getters.photo">
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="$router.push('user')" icon="el-icon-s-custom">个人中心</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-plus">
                    <el-badge :is-dot="isdot" @click.native="$router.push('newslist')" class="item">消&nbsp;&nbsp;息</el-badge>
                  </el-dropdown-item>
                  <el-dropdown-item @click.native="checkout" icon="el-icon-circle-plus-outline">退&nbsp;&nbsp;出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </div>
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
      <svg-icon v-if="status==3" class="ruzhu-icon" icon-class="ruzhu"></svg-icon>
			<button v-if="status == 3" @click="$router.push('/shiming')">申请入驻</button>
      <svg-icon v-if="status == 0" class="shenhe-icon" icon-class="wait"></svg-icon>
			<h3 v-if="status == 0">&nbsp;&nbsp;审核中...</h3>
      <svg-icon v-if="status == 1" style="margin-left: 60px;" class="shenhe-icon" icon-class="thx"></svg-icon>
			<h3 v-if="status == 1">&nbsp;&nbsp;感谢您的入驻！</h3>
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

import { getAdsList } from '@/api/picture';
import { getHotEssay } from '@/api/essay';
import { getLastNotice } from '@/api/notice';
import { getLastEUC } from '@/api/expert';
import * as SixinService from '@/api/sixin'
import * as ShenheService from '@/api/shenhe'

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
      isdot: true, // 未读消息红色小点
      websocket: {},
      name: '',
      weiduCount: 0,
      status: 0
		}
	},
  created(){
  	const name = this.$route.query.name;
  		if (name !== '' && name != null){
  			this.searchForm.name = name;
  		}
  	this.fetchData();
  	this.getExpertCount();
    if (this.$store.getters.token != null){
      this.getWeiduCount();
    }
    this.getStatus();
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
    },
    login(){
      this.$router.push({
        path: 'login'
      });
    },
    /**
     * 退出登录，成功退出跳转到登录页面
     **/
    checkout(){
      this.$store.dispatch('Checkout').then(res => {
        this.$router.push({ path: '/login' });
      
       
      }).catch(err => {
        console.log(err);
      });
    },
    gozixun(){

    },
    goessayDetail(essayId){
      this.$router.push({
        path: '/essayDetail',
        query: {
          essayId: essayId
        }
      })
    },
    getWeiduCount(){
      SixinService.getWeiduCount(this.$store.getters.id).then(res => {
        this.weiduCount = res.data;
        this.isdot = this.weiduCount == 0?false:true;
      }).catch(err => {
        console.log(err);
      })
    },
    getStatus(){
      ShenheService.getStatus(this.$store.getters.id).then(res => {
        this.status = res.data;
        alert("成功");
      }).catch(err => {
        alert("错");
        console.log(err);
      })
    }
  }
}
</script>
<style style="stylesheet/scss" lang="scss" scoped>
@import '../../styles/expert/zixun.scss';
</style>