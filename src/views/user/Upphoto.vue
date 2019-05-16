<template>
	<div class="app-container">
		<header>
			<img @click="$router.push('/')" src="/static/image/title.png">
		</header>
		<div class="main">
			<div class="left">
				<h3>信息管理</h3>
				<ul>
					<li class="">聊天消息</li>
					<li @click="$router.push('upinfo')">基本信息</li>
					<li @click="$router.push('upphoto')" class="cur-li">更新头像</li>
					<li @click="$router.push('/uppwd')">修改密码</li>
				</ul>
			</div>
			<div class="right">
				<div class="title">修改头像</div>
				<section>
					<div class="new-photo">
						<span>选择头像</span>
						<div>
							<el-upload
  								action="/api/user/updatePhoto"
  								list-type="picture-card"
  								:on-preview="handlePictureCardPreview"
  								:limit="limit"
  								:on-remove="handleRemove"
  								:before-upload="beforeAvatarUpload">
  								<i class="el-icon-plus"></i>
							</el-upload>
							<el-dialog :visible.sync="dialogVisible">
  								<img width="100%" :src="dialogImageUrl" alt="">
							</el-dialog>
						</div>
					</div>
					<div class="old-photo">
						<span>原头像</span>
						<img :src="curuser.userPhoto">
					</div>
					<button @click="save">保存</button>
				</section>
			</div>
		</div>
	</div>
</template>
<script>
import { getuser, savephoto } from '@/api/user';
import { Message, MessageBox } from 'element-ui';

export default{
	data(){
		return {
			limit: 1,
			dialogImageUrl: '',
        	dialogVisible: false,
        	curuser: {}
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
		handleRemove(file, fileList) {
        	console.log(file, fileList);
      	},
      	handlePictureCardPreview(file) {
        	this.dialogImageUrl = file.url;
        	this.dialogVisible = true;
      	},
      	beforeAvatarUpload(file) {//文件上传之前调用做一些拦截限制
        	console.log(file);
        	const isJPG = file.type === 'image/jpeg';
        	if (!isJPG) {
           		Message({
      				message: '上传头像图片只能是 JPG 格式!',
      				type: 'error',
      				duration: 5 * 1000
    			})
        	}
        	const isLt2M = file.size / 1024 / 1024 < 2;
        	if (!isLt2M) {
          		Message({
      				message: '上传图片大小不能超过 2MB!',
      				type: 'error',
      				duration: 5 * 1000
    			})
        	}
        	return isJPG && isLt2M;
      	},
      	save(){
      		savephoto(this.$store.getters.id).then(response => {
      			this.$notify({
          			title: '成功',
          			message: '头像修改成功！',
          			type: 'success'
        		});
      		})
      	}
	}
}
</script>
<style style="stylesheet/scss" lang="scss" scoped>
@import '../../styles/user/upphoto.scss';	
</style>