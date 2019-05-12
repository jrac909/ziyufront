<template>
	<div class="app-container">
		<header>
			<img @click="$router.push('/')" src="/static/image/title.png">
		</header>
		<p>个性签名：{{ user.userJianjie }}</p>
		<div class="main">
			<div class="left">
				<section class="userinfo">
					<div class="userinfo-left">
						<img :src="user.userPhoto">
						<p>
							<span class="userinfo-icon"><svg-icon icon-class="user" /></span>
							<span class="userinfo-text">{{ user.userNickname }}</span>
						</p>
						<p>
							<span class="userinfo-icon"><svg-icon icon-class="address" /></span>
							<span class="userinfo-text">{{ user.userAddress }}</span>
						</p>
						<p>
							<span class="userinfo-icon"><svg-icon icon-class="sex" /></span>
							<span class="userinfo-text">{{ user.gender == 0? '男':'女' }}</span>
							<span style="cursor: pointer;" @click="$router.push('upinfo')"><svg-icon icon-class="name" /></span>
						</p>
					</div>
					<div class="userinfo-right">
						<ul>
							<li>
								<span>{{ user.userFansCount }}</span>
								<p>粉丝</p>
							</li>
							<li>
								<span>{{ user.userFollowCount }}</span>
								<p>关注</p>
							</li>
							<li>
								<span>{{ user.userAnswerCount }}</span>
								<p>回答</p>
							</li>
							<li>
								<span>{{ user.userCollectCount }}</span>
								<p>收藏</p>
							</li>
						</ul>
						<button class="sixin-btn">查看私信</button>
						<button class="sq-btn">申请入驻</button>
					</div>
				</section>
				<h2>我的提问</h2>
				<section class="myques">
					<ul>
						<li v-for="(item, index) in queslist" :key="index">
							<img src="/static/image/img101.png">
							<h6>{{ item.quesTitle }}</h6>
							<p>{{ item.quesContent }}</p>
						</li>
					</ul>
					<a>更多>></a>
				</section>
				<h2>我的文章</h2>
				<section class="mycollect">
					<ul>
						<li v-for="(item, index) in essaylist" :key="index">
							<img src="/static/image/img101.png">
							<h6>{{ item.essayTitle }}</h6>
							<p>{{ item.essayContent }}</p>
						</li>
					</ul>
					<a>更多>></a>
				</section>
			</div>
			<aside>
				<el-tabs :stretch="true" class="aside-main" v-model="activeName" @tab-click="handleClick">
    				<el-tab-pane style="width: 150px !important;" class="aside-tab" label="我的关注" name="follow">
    					<ul>
    						<li v-for="(item, index) in fanslist" :key="index">
    							<img :src="item.userPhoto">
    							<span @click="gofollow(item.userId)" style="cursor: pointer;">{{ item.userNickname }}</span>
    							<p>{{ item.userJianjie }}</p>
    						</li>
    					</ul>
    				</el-tab-pane>
    				<el-tab-pane class="aside-tab" label="我的粉丝" name="fans">
    					<ul>
    						<li v-for="(item, index) in followlist" :key="index">
    							<img :src="item.userPhoto">
    							<span @click="gofollow(item.userId)" style="cursor: pointer;">{{ item.userNickname }}</span>
    							<p>{{ item.userJianjie }}</p>
    						</li>
    					</ul>
    				</el-tab-pane>
  				</el-tabs>
			</aside>
		</div>
	</div>
</template>
<script>
import { getuser, getUserFans, getUserFollowed } from '@/api/user';
import { listTop } from '@/api/question';
import { listTopEssay } from '@/api/essay';

export default{
	name: 'user',
	data(){
		return {
			user: {},
			queslist: [],
			essaylist: [],
			activeName: 'follow',
			fanslist: [],
			followlist: []
		}
	},
	created(){
		this.fetchData();
		this.listTopQues();
		this.listTopEssay();
		this.getUserFans();
		this.getUserFollowed();
	},
	methods: {
		fetchData(){
			getuser(this.$store.getters.id).then(response => {
				this.user = response.data;
			});
		},
		listTopQues(){
			listTop(this.$store.getters.id, 2).then(response => {
				this.queslist = response.data;
			})
		},
		listTopEssay(){
			listTopEssay(this.$store.getters.id, 2).then(response => {
				this.essaylist = response.data;
			})
		},
		getUserFans(){
			getUserFans(this.$store.getters.id).then(response => {
				this.fanslist = response.data;
			})
		},
		getUserFollowed(){
			getUserFollowed(this.$store.getters.id).then(response => {
				this.followlist = response.data;
			})
		},
		handleClick(tab, event) {
        	console.log(tab, event);
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
@import '../../styles/user/user.scss';
</style>