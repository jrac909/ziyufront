<template>
<div id="userPanel">
	<img src="static/image/img2.jpg" id="userPanel_bg">
	<img :src="this.user.userPhoto" id="userPanel_photo">
	<a href="" id="userPanel_username">{{this.user.userNickname}}</a>
	<ul>
		<li>
			<span @click="$router.push('myQuestion')" class="count">{{this.user.userCollectCount}}</span>
			<span @click="$router.push('myQuestion')">收藏</span>
		</li>
		<li>
			<span @click="$router.push('myQuestion')" class="count">{{this.user.userAnswerCount}}</span>
			<span @click="$router.push('myQuestion')">回答</span>
		</li>
		<li>
			<span @click="$router.push('myQuestion')" class="count">{{this.user.userQuesCount}}</span>
			<span @click="$router.push('myQuestion')">提问</span>
		</li>
	</ul>
	<button @click="$router.push('/tiwen')">去提问</button>
</div>
</template>
<script>
import { listuser, getuser } from '@/api/user';

export default{
	name: 'UserPanel',
	data(){
		return {
			user: {}
		}
	},
	created(){
		this.fetchData();
	},
	methods: {
		fetchData(){
			getuser(this.$store.getters.id).then(response => {
				this.user = response.data;
			})
		}
	}
}
</script>
<style>
#userPanel{
	width: 290px;
	height: 342px;
	background-color: #FFF;
}
#userPanel_bg{
	width: 290px;
	height: 100px;
}
#userPanel_photo{
	width: 100px;
	height: 100px;
	border-radius: 50%;
	border: 2px solid #FFF;
	margin-top: -50px;
}
#userPanel_username{
	display: inline-block;
	width: 290px;
	color: #000;
	text-decoration: none;
	font-size: 14px;
	margin-top: 5px;
	margin-bottom: 10px;
	cursor: pointer;
}
#userPanel ul{
	width: 240px;
	margin: 0px 25px;
	list-style: none;
}
#userPanel ul > li{
	float: left;
	width: 80px;
}
.count{
	display: inline-block;
	width: 80px;
	font-size: 30px;
	color: #567FF5;
	/* 700 = bold */
	font-weight: 900;
}
#userPanel button{
	width: 140px;
	height: 40px;
	border-radius: 5px;
	background-color: #FFF;
	border: 1px solid #797979;
	margin-top: 26px;
	cursor: pointer;
}
#userPanel button:hover{
	background-color: #F4F9FF;
	color: #3D91FF; border: 1px solid #3D91FF;
}
</style>