<template>
	<div class="app-container">
		<header>
			<img @click="$router.push('/')" src="/static/image/title.png">
		</header>
		<div class="main">
			<div class="left">
				<h3>信息管理</h3>
				<ul>
					<li class="cur-li">基本信息</li>
					<li @click="$router.push('/upphoto')">更新头像</li>
					<li @click="$router.push('/uppwd')">修改密码</li>
				</ul>
			</div>
			<div class="right">
				<div class="title">基本信息</div>
				<section>
					<el-form ref="form" :model="curuser" label-width="80px">
  						<el-form-item label="姓名">
    						<el-input v-model="curuser.userNickname"></el-input>
  						</el-form-item>
  						<el-form-item label="咨询地址">
    						<el-input v-model="curuser.userAddress"></el-input>
  						</el-form-item>
  						<el-form-item label="性别">
    						<el-radio-group v-model="curuser.userGender">
      							<el-radio label="0">男</el-radio>
      							<el-radio label="1">女</el-radio>
    						</el-radio-group>
  						</el-form-item>
						<el-form-item label="我的简介">
    						<el-input type="textarea" v-model="curuser.userJianjie"></el-input>
  						</el-form-item>
  						<el-form-item>
    						<el-button type="primary" @click.prevent="onSubmit">确认修改</el-button>
  						</el-form-item>
					</el-form>
				</section>
			</div>
		</div>
	</div>
</template>
<script>
import { updateUser, getuser } from '@/api/user';

export default{
	name: 'upinfo',
	data(){
		return {
			curuser: {

			}
		}
	},
	created(){
		this.fetchData();
	},
	methods: {
		fetchData(){
			getuser(this.$store.getters.id).then(response => {
				this.curuser = response.data;
			})
		},
		onSubmit(){
			updateUser(this.$store.getters.id, this.curuser.userNickname, this.curuser.userAddress, this.curuser.userGender, this.curuser.userJianjie).then(response => {
				 this.$notify({
          			title: '成功',
          			message: '资料更新成功！',
          			type: 'success'
        		});
			})
		}
	}
}
</script>
<style style="stylesheet/scss" lang="scss" scoped>
@import '../../styles/user/upinfo.scss';	
</style>