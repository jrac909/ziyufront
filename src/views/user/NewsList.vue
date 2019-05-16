<template>
	<div class="app-container">
		<header>
			<img @click="$router.push('/')" src="/static/image/title.png">
		</header>
		<div class="main">
			<div class="left">
				<h3>信息管理</h3>
				<ul>
					<li class="cur-li">聊天消息</li>
					<li @click="$router.push('/upinfo')">基本信息</li>
					<li @click="$router.push('/upphoto')">更新头像</li>
					<li @click="$router.push('/uppwd')">修改密码</li>
				</ul>
			</div>
			<div class="right">
				<div class="title"><svg-icon icon-class="xiaoxi" />&nbsp;&nbsp;聊天消息</div>
				<section>
					<ul v-if="newslist && newslistone.length !== 0">
						<li v-for="(news, index) in newslistone" :key="index">
							<p style="cursor: pointer;" @click="gosixin(news.newReceiveId)" v-if="news.newSendId == $store.getters.id"><svg-icon icon-class="user2" />&nbsp;{{news.newReceiveName}}</p>
							<p style="cursor: pointer;" @click="gosixin(news.newSendId)" v-if="news.newSendId != $store.getters.id"><svg-icon icon-class="user2" />&nbsp;{{news.newSendName}}</p>
							<p class="new_content">{{news.newContent}}</p>
							<p class="new_date">{{ news.newDate.split('T')[0] }}&nbsp;&nbsp;&nbsp;{{ news.newDate.split('T')[1].split('.')[0] }}</p>
							<svg-icon v-if="news.newReceiveId == $store.getters.id && news.newTypeR == 0" class="tip" icon-class="weidu" />
							<svg-icon v-else="news.newType == 1" class="tip" icon-class="yidu" />
						</li>
					</ul>
				</section>
			</div>
		</div>
	</div>
</template>
<script>
import * as NewsService from '@/api/sixin'
export default{
	name: 'upinfo',
	data(){
		return {
			newslist: [],
			newslistone: []
		}
	},
	created(){
		this.getAllById();
	},
	methods: {
		getAllById(){
			NewsService.getAllById(this.$store.getters.id).then(res => {
				this.newslist = res.data;
				this.removesame();
			}).catch(err => {
				console.log(err);
			})
		},
		// 去掉重复的消息，每一对发送用户与接受用户，只显示一条
		removesame(){
			this.newslistone[0] = this.newslist[0];
			
			for (var i=1; i<this.newslist.length; i++){
				var cur = 0;
				if (this.newslist[i].newSendId == this.$store.getters.id){
					// 当前用户是发送者
					cur = 1;
				} else {
					cur = 0;
				}
				
				let len = this.newslistone.length;
				var j = 0;
				for (j=0; j<this.newslistone.length; j++){
				
					if (cur == 1 && (this.newslist[i].newReceiveId != this.newslistone[j].newReceiveId && this.newslist[i].newReceiveId != this.newslistone[j].newSendId)){
					} else if(cur == 0 && (this.newslist[i].newSendId != this.newslistone[j].newReceiveId && this.newslist[i].newSendId != this.newslistone[j].newSendId)){
					} else {
						break;
					}
				
				}
				if (j == len){
					this.newslistone[this.newslistone.length] = this.newslist[i];
				}
				
			}
		},
		gosixin(id){
      		this.$router.push({
      			path: '/sixin',
      			query: {
      				acceptUserId: id
      			}
      		})
      	}
	}
}
</script>
<style style="stylesheet/scss" lang="scss" scoped>
@import '../../styles/user/newslist.scss';	
</style>