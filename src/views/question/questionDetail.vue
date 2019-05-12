<template>
<div id="question-detail">
	<FHeader></FHeader>
	<div id="main">
		<div id="qd-panel">
			<section id="qd-desc">
				<h3>{{ this.curquestion.quesTitle }}</h3>
				<p id="other-desc">
					<span id="other-desc-date">{{ this.curquestion.quesCreateDate.split('T')[0] }}</span>
					<span id="other-desc-name" v-if="this.curquestion.quesNiming == 0">By: {{ this.curquestion.userNickname }}</span>
					<span id="other-desc-name" v-if="this.curquestion.quesNiming == 1">By: 匿名</span>
					<span id="other-desc-count">{{ this.curquestion.quesAnsCount }} 回答</span>
				</p>
				<p id="qd-content">
					{{ this.curquestion.quesContent }} 
				</p>
				<p id="qt-type">
					<span id="qt-type-collect">{{ this.curquestion.quesCollectCount }} 收藏</span>
				</p>
			</section>
			<p id="cur-username">@{{ this.curuser.userNickname }}</p>
			<textarea id="ques-input"></textarea>
			<button id="ans-btn">我来回答</button>
			<p id="zj-sign">专家解答</p>
			<div id="zj-ans">
				<div id="zj-photo">
					<img src="/static/image/img5.jpg">
					<span>李教授</span>
				</div>
				<div id="zj-ans-detail">
					<p id="zj-ans-date">2019-2-24 14:49</p>
					<p id="zj-ans-content">你好！也许这个问题很值得和你的咨询师谈，咨询里非常有必要的一件事情是让咨询师清楚你的处境和艰难，以及你在咨询中的艰难。从你的描述看，你的核心问题可能是和父母的依恋关系的问题（从小父母没有给我照料，关注和呵护，只有打骂，有些情节和经历太疼，有可能已经形成创伤），也许是这个部分决定了你社交的困难，即社交困难也许是在和父母依恋的问题上生长出来的：童年的经历、焦虑、恐惧、无助或许都会一 一反映在社交上，让社交非常变得的困难。咨询了四十多次，自己有些绝望、有些抑郁，痛苦得让你难以喘息，这也许在告诉你：看到的希望不够，改变也不够。咨询很重要的一部分是要看到希望，另一个是要带来改变，感受改变带来的希望感，当然被理解、被接纳和被抱持也是非常重要的部分。如果过去的创伤太痛，不太建议做精神分析，太多的回到过去会让自己太难受。</p>
				</div>
			</div>
			<button id="zj-huifu-btn">回复</button>
			<ul id="pl-ul">
				<li>
					<p id="pl-ul-user">
						<span id="pl-ul-user-name">@小困第一可爱</span>
						<span id="pl-ul-user-date">2019-2-24 15:02</span>
					</p>
					<p id="pl-ul-content">	
好有意思的，嘿嘿。今天和一只灰色兔子合照了，她们好像很开心的样子，说兔兔抱
兔兔，是什么意思嘞？
					</p>
				</li>
				<li>
					<p id="pl-ul-user">
						<span id="pl-ul-user-name">@小困第一可爱</span>
						<span id="pl-ul-user-date">2019-2-24 15:02</span>
					</p>
					<p id="pl-ul-content">	
好有意思的，嘿嘿。今天和一只灰色兔子合照了，她们好像很开心的样子，说兔兔抱
兔兔，是什么意思嘞？
					</p>
				</li>
			</ul>
		</div>
		<div id="user-panel">
			<UserPanel></UserPanel>
		</div>
	</div>
</div>
</template>
<script>
import { getQUCById } from '@/api/quesusercon'; 
import { getuser } from '@/api/user';

import FHeader from '@/components/common/FHeader'
import UserPanel from '@/components/common/UserPanel'

export default{
	name: 'QuestionDetail',
	data(){
		return {
			questionId: 0,
			curquestion: {},
			curuser: {}
		}
	},
	created(){
		this.questionId = this.$route.query.quesId;
		this.fetchData();
	},
	methods: {
		fetchData(){
			getQUCById(this.questionId).then(response => {
				this.curquestion = response.data
			})
			getuser(this.$store.getters.id).then(response => {
				this.curuser = response.data;
			})
		}
	},
	components: {
		FHeader,
		UserPanel
	}
}
</script>
<style scoped>
@import '../../assets/css/questionDetail.css';
</style>