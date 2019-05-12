<template>
	<div class="app-container">
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
		<section class="banner" role="banner">
			<el-carousel :interval="3000" arrow="always">
    			<el-carousel-item v-for="(item, index) in adslist" :key="index">
      				<img :src="item.picPath">
    			</el-carousel-item>
  			</el-carousel>
		</section>
    <div class="main">
      <h2 style="cursor: pointer;" @click="$router.push('essay')">热门文章</h2>
      <section>
        <ul>
          <li v-for="(item, index) in hotessay" :key="index">
            <img @click="goessayDetail(item.essayId)" src="/static/image/bgessay.jpeg">
            <div>
              <h3 @click="goessayDetail(item.essayId)">{{item.essayTitle}}</h3>
              <p>{{item.essayContent}}</p>
            </div>
          </li>
        </ul>
      </section> 
      <aside>
        <img @click="$router.push('notice')" src="/static/image/img5.jpg">
        <ul>
          <li v-for="(item, index) in lastnotice" :key="index">
            {{item.noticeTitle}}
          </li>
        </ul>
      </aside>
    </div>
    <div class="main zixun">
      <h2>心理咨询</h2>
      <section>
        <ul>
          <li v-for="(item, index) in lasteuc" :key="index">
            <img src="/static/image/timg.jpg">
            <img :src="item.userPhoto" class="zj-photo">
            <h6>{{item.expertTrueName}}</h6>
            <p>{{item.expertShuoming}}</p>
            <button class="ly-btn">{{item.expertFieldFirst}}</button>
            <button class="ly-btn">{{item.expertFieldSecond}}</button>
            <button class="ly-btn">{{item.expertFieldThird}}</button>
            <button @click="goexpert(item.expertId)" class="yuyue-btn">查看</button>
          </li>
        </ul>
      </section>
    </div>   
</div>
</template>
<script>
import { getAdsList } from '@/api/picture';
import { getHotEssay } from '@/api/essay';
import { getLastNotice } from '@/api/notice';
import { getLastEUC } from '@/api/expert';

export default{
	name: 'Home',
	data(){
		return {
			searchForm: {
				name: ''
			},
			adslist: [],
      hotessay: [],
      lastnotice: [],
      lasteuc: []
		}
	},
	created(){
		this.fetchData();
	},
	methods: {
		fetchData(){
			getAdsList().then(response => {
				this.adslist = response.data;
			});
      getHotEssay(3).then(response => {
        this.hotessay = response.data;
      });
      getLastNotice(6).then(response => {
        this.lastnotice = response.data;
      });
      getLastEUC(4).then(response => {
        this.lasteuc = response.data;
      })
		},
		queryData: function(){
      this.$router.push({
        path: '/zixun',
        query: {
          name: this.searchForm.name
        }
      });
		},
    login(){
      this.$router.push({
        path: 'login'
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
<style type="stylesheet/scss" lang="scss">
li, button{
	cursor: pointer;
}
</style>
<style style="stylesheet/scss" lang="scss" scoped>
@import '../styles/home.scss'
</style>