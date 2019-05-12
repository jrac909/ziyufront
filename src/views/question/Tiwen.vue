<template>
<div class="tiwen">
	<header>
      	<div class="header-box">
			<router-link to="/"><img src="/static/image/title.png" alt="自愈心理在线咨询" title="在线心理咨询网站" /></router-link>
			<ul>
				<li @click="$router.push('/')">首页</li>
				<span>|</span>
				<li @click="$router.push('question')">问答</li>
				<li>咨询</li>
				<li>文章</li>
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
		<p id="niming">
			<img src="/static/image/img12.png">
			<span>匿名：</span>
			<el-switch v-model="value" active-color="#409EFF" inactive-color="#DCDFE6"></el-switch>
		</p>
		<div id="tiwen-panel">
			<p id="ques-title">问题标题</p>
			<input v-model="question.quesTitle" id="ques-title-input" placeholder="5~25字，必填" type="text" name="">
			<p id="ques-desc">问题描述</p>
			<textarea v-model="question.quesContent" id="ques-desc-input"></textarea>
			<p id="ques-type">分类</p>
			<div id="ques-type-btns">
    			<el-radio-group v-model="radio3">
      				<el-radio-button v-for="(item, index) in taglist" :key="index" :label="item.qtName"></el-radio-button>
    			</el-radio-group>
  			</div>
  			<button @click.prevent="fabu" id="fabu-btn">发布</button>
		</div>
	</div>
</div>
</template>
<script>
import { addQues } from '@/api/question';
import { getQuesTagList } from '@/api/questionTag';

export default{
	name: 'Tiwen',
	data(){
		return {
			question: {
				quesTitle: '', quesContent: ''
			},
			searchForm: {
				name: ''
			},
			value: true,
			radio3: '行为',
			taglist: []
		}
	},
	created(){
		this.getTagList();
	},
	methods: {
		queryData(){

		},
		getTagList(){
			getQuesTagList(1, 1000).then(response => {
				this.taglist = response.data;
			})
		},
		fabu(){
			addQues(this.$store.getters.id, this.question.quesTitle, this.question.quesContent, this.value == true?1:0, this.radio3).then(response => {
				this.$confirm('确认发布?', '提示', {
          			confirmButtonText: '确定',
          			cancelButtonText: '取消',
          			type: 'confirm'
        		}).then(() => {
          			this.$message({
            			type: 'success',
            			message: '发布成功!'
          			});
          			this.$router.push('/question');
        		}).catch(() => {
          			this.$message({
            			type: 'info',
            			message: '已取消'
          			});          
       		 	});
			})
		}
	}
}
</script>
<style style="stylesheet/scss" lang="scss" scoped>
@import '../../styles/question/tiwen.scss';
</style>