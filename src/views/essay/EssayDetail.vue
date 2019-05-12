<template>
<div class="essayDetail">
	<header>
		<h1>{{ this.curessay.essayTitle }}</h1>
		<div class="user-photo">
			<img :src="this.author.userPhoto">
			<button @click="follow" v-if="this.followStatus == 0">关注+</button>
			<button @click="cancelFollow" v-if="this.followStatus != 0">已关注</button>
		</div>
	</header>
	<section class="essay-main">
		<p class="essay-time">发布时间：{{ this.curessay.essayCreateDate }}</p>
		<p class="essay-username" @click="gofollow()">{{ this.author.userNickname }}</p>
		<p class="content">
			{{ this.curessay.essayContent }}
		</p>
		<div class="agreeAndColloct">
			<!-- <span>6赞</span>
			<span>7收藏</span> -->
		</div>
	</section>
	<div class="cur-username">
		<p>@{{ $store.getters.nickname }}</p>
	</div>
	<textarea v-model="comment" class="pl-input"></textarea>
	<button @click="addEssayComment" class="pl-btn">评&nbsp;&nbsp;论</button>
	<ul class="pl-ul">
		<li v-for="(item, index) in commentList" :key="index">
			<p class="pl-ul-info">
				<span class="pl-ul-username">@{{ item.userNickname }}</span>
				<span class="pl-ul-date">{{ item.ebCreateDate.split('T')[0] }}&nbsp;&nbsp;&nbsp;{{ item.ebCreateDate.split('T')[1].split('.')[0] }}</span>
			</p>
			<p class="pl-ul-content">
				{{ item.ebComment }}
			</p>
		</li>
	</ul>
</div>
</template>
<script>
import { getessay, getDetailCom, addEssayCom } from '@/api/essay';
import { getuser, isFollow, follow, cancelFollow } from '@/api/user';

export default{
	name: 'EssayDetail',
	data(){
		return {
			essayId: 0,
			authorId: 0,
			curessay: {},
			author: {},
			followStatus: 0,
			commentList: [],
			comment:'  ',
		}
	},
	created(){
		this.essayId = this.$route.query.essayId;
		this.fetchData();
	},
	methods: {
		fetchData(){
			getessay(this.essayId).then(response => {
				this.curessay = response.data;
				this.curessay.essayCreateDate = this.curessay.essayCreateDate.split('T')[0];
				this.authorId = this.curessay.essayUserId;
				getuser(this.authorId).then(response => {
					this.author = response.data;
					isFollow(this.$store.getters.id, this.author.userId).then(response => {
						this.followStatus = response.data;
					})
				})
				getDetailCom(this.curessay.essayId).then(response => {
					this.commentList = response.data;
				})
			})
		},
		follow(){
			follow(this.$store.getters.id, this.author.userId).then(response => {
				this.followStatus = 1;
			})
		},
		cancelFollow(){
			cancelFollow(this.$store.getters.id, this.author.userId).then(response => {
				this.followStatus = 0;
			})
		},
		addEssayComment(){
			addEssayCom(this.$store.getters.id, this.comment, this.essayId).then(response => {
				getDetailCom(this.curessay.essayId).then(response => {
					this.commentList = response.data;
					this.comment = "";
				})
			});
		},
		gofollow(){
      		this.$router.push({
      			path: '/follow',
      			query: {
      				userId: this.author.userId
      			}
      		})
      	}
	}
}
</script>
<style style="stylesheet/scss" lang="scss" scoped>
@import '../../styles/essay/essaydetail.scss'
</style>