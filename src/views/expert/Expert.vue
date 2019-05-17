<template>
	<div id="app-container">
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
					<button style="cursor: pointer;" @click="queryData">搜&nbsp;&nbsp;索</button>
				</form>
				<button @click="login" v-if="$store.getters.token === null">登录</button>
				<button @click="$router.push('user')" v-if="$store.getters.token !== null">个人中心</button>
      		</div>
		</header>
		<nav>
			<img src="https://lapp.xinli001.com/images/consultation/bg-banner-teacher-homepage.jpg">
			<h1>{{ this.curexpert.expertTrueName }}</h1>
			<p>{{ this.curexpert.expertStatus }}</p>
		</nav>
		<section class="base-info">
			<ul>
				<li>
					<p class="base-info-title">擅长领域</p>
					<p class="base-info-content">{{ this.curexpert.expertFieldFirst }}/
					{{ this.curexpert.expertFieldSecond }}/{{ this.curexpert.expertFieldThird }}</p>
				</li>
				<li>
					<p class="base-info-title">所在地</p>
					<p class="base-info-content">{{ this.curexpert.userAddress }}</p>
				</li>
			</ul>
			<button @click="gosixin()" class="sixin-btn"><svg-icon icon-class="message" />&nbsp;&nbsp;私信</button>
			<img :src="this.curexpert.userPhoto">	
		</section>
		<section class="expert-info">
			<h2><svg-icon style="color: #3D91FF;" icon-class="user" />&nbsp;&nbsp;基本信息</h2>
			<ul>
				<li>
					<div class="expert-info-left">
						<svg-icon style="font-size: 68px;" icon-class="VIP" />
						<h3>资历认证</h3>
					</div>
					<div class="expert-info-right expert-status">
						<p>{{ this.curexpert.expertStatus }}</p>
						<p>{{ this.curexpert.expertStatusDetail }}</p>
					</div>
				</li>
				<li>
					<div class="expert-info-left">
						<svg-icon style="font-size: 68px;" icon-class="shanchang" />
						<h3>擅长方向</h3>
					</div>
					<div class="expert-info-right expert-status">
						<p>{{ this.curexpert.expertFieldFirst }}/
					{{ this.curexpert.expertFieldSecond }}/{{ this.curexpert.expertFieldThird }}</p>
						<p>{{ this.curexpert.expertFieldDetail }}</p>
					</div>
				</li>
				<li>
					<div class="expert-info-left">
						<svg-icon style="font-size: 68px;" icon-class="users" />
						<h3>咨询对象</h3>
					</div>
					<div class="expert-info-right expert-status">
						<p>{{ this.curexpert.expertUserType }}</p>
					</div>
				</li>
			</ul>
			<h2><svg-icon style="color: #3D91FF;" icon-class="Board" />&nbsp;&nbsp;留言信息</h2>
			<ul class="liuyan-board">
				<li v-for="(item, index) in curexpertboard" :key="index">
					<div class="liuyan-left">
						<img @click="gofollow(item.userId)" :src="item.userPhoto">
					</div>
					<div class="liuyan-right">
						<p>
							<b>{{ item.userNickname }}</b>
							<span style="float: right;">{{ item.ebCreateDate.split('T')[0] }}&nbsp;&nbsp;&nbsp;{{ item.ebCreateDate.split('T')[1].split('.')[0] }}</span>
						</p>
						<p>{{ item.ebContent }}<span @click="delExpertBoard(item.ebId)" style="float: right; cursor: pointer;" v-if="item.userId == $store.getters.id"><svg-icon icon-class="delete" /></span></p>
						<p @click="openReply(item.ebId)" class="zj-reply" v-if="curexpert.userRole == 1">回复</p>
						<el-dialog :visible.sync="replyDialogFormVisible">
  							<el-form :model="form">
    							<el-form-item label="回复：" :label-width="formLabelWidth">
      								<el-input type="textarea" v-model="form.reply"></el-input>
    							</el-form-item>
  							</el-form>
  							<div slot="footer" class="dialog-footer">
    							<el-button><p @click="replyDialogFormVisible = false">取 消</p></el-button>
    							<el-button type="primary" @click="reply()">确 定</el-button>
  							</div>
						</el-dialog>
						<ul class="reply-list">
							<li v-for="(ritem, rindex) in replylist" v-if="ritem.erCommentId == item.ebId" :key="rindex">
								<p style="font-size: 14px;">{{ ritem.erCreateDate.split('T')[0] }}&nbsp;&nbsp;&nbsp;{{ ritem.erCreateDate.split('T')[1].split('.')[0] }}</p>
								<p>{{ ritem.erContent }}<span @click="delreply(ritem.erId)" style="float: right; margin-right: 10px; cursor: pointer;"><svg-icon icon-class="delete-o" /></span></p>
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</section>
	</div>
</template>
<script type="text/javascript">
import { getById } from '@/api/expert';
import { get, delBoard, addReply, listReply, getReply, delReply } from '@/api/expertBoard';

export default{
	data(){
		return {
			formLabelWidth: '80px',
			searchForm: {
				name: ''
			},
			expertId: 0,
			curexpert: {},
			curexpertboard: {},
			replyDialogFormVisible: false,
			form:{
				reply:''
			},
			replylist: [],
			curEbId: 0
		}
	},
	created(){
		this.expertId = this.$route.query.expertId;
		this.fetchData();
	},
	methods: {
		fetchData(){
			getById(this.expertId).then(response => {
				this.curexpert = response.data;
			});
			get(this.expertId).then(response => {
				this.curexpertboard = response.data;
			})
			getReply(this.expertId).then(response => {
				this.replylist = response.data;
			})
		},
		queryData(){
			this.$router.push({
        		path: '/zixun',
        		query: {
          			name: this.searchForm.name
        		}
      		});
		},
		delExpertBoard(ebId){
			this.$confirm('留言删除将无法恢复, 是否继续?', '提示', {
          			confirmButtonText: '删除',
          			cancelButtonText: '取消',
          			type: 'error'
        		}).then(() => {
        			delBoard(ebId).then(response => {
						this.fetchData();
          				this.$message({
            				type: 'success',
            				message: '删除成功!'
          				});
					})
        		}).catch(() => {
          			this.$message({
            			type: 'info',
            			message: '已取消删除'
          			});          
        		});
		},
		gofollow(userId){
      		this.$router.push({
      			path: '/follow',
      			query: {
      				userId: userId
      			}
      		})
      	},
      	openReply(ebId){
      		this.curEbId = ebId;
      		this.replyDialogFormVisible = true;
      	},
      	reply(){
      		const erCommentId = this.curEbId;
      		
      		addReply(erCommentId, this.expertId, this.form.reply).then(response => {
      			this.replyDialogFormVisible = false;
      			this.fetchData();
      		})
      	},
      	delreply(id){
      		delReply(id).then(response => {
      			this.$message({
            		type: 'success',
            		message: '删除成功!'
          		});
          		this.fetchData();
      		})
      	},
      	gosixin(){
      		this.$router.push({
      			path: '/sixin',
      			query: {
      				acceptUserId: this.expertId
      			}
      		})
      	},
		login(){

		}
	}
}
</script>
<style style="stylesheet/scss" lang="scss" scoped>
@import '../../styles/expert/expert.scss'
</style>