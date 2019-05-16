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
					<li @click="$router.push('upphoto')">更新头像</li>
					<li @click="$router.push('uppwd')" class="cur-li">修改密码</li>
				</ul>
			</div>
			<div class="right">
				<div class="title">修改密码</div>
				<section>
					<el-form ref="form" auto-complete="on" label-position="right" :rules="pwdRules" :model="pwd" label-width="80px">
  						<el-form-item prop="oldpwd" label="原始密码">
    						<el-input v-model="pwd.oldpwd"></el-input>
  						</el-form-item>
  						<el-form-item prop="newpwd" label="新密码">
    						<el-input v-model="pwd.newpwd"></el-input>
  						</el-form-item>
  						<el-form-item prop="repwd" label="确认密码">
    						<el-input v-model="pwd.repwd"></el-input>
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
import { getuser, updatePwd } from '@/api/user';

export default{
	data(){
		const validateOldpwd = (rule, value, callback) => {
        	getuser(this.$store.getters.id).then(response => {
        		const user = response.data;

        		if (user.userPassword != this.pwd.oldpwd){
        			callback(new Error('密码错误！'));
        		} else {
        			callback();
        		}
        	})
        }
        const validateNewpwd = (rule, value, callback) => {
        	if (value.length < 6) {
        		callback(new Error('密码不能小于6位，请重新输入！'));
        	} else if(this.pwd.oldpwd == this.pwd.newpwd){
        		callback(new Error('新密码不要与旧密码相同，请重新输入！'));
        	} else {
        		callback();
        	}
        }
        const validateRepwd = (rule, value, callback) => {
      		if (this.pwd.newpwd != this.pwd.repwd){
      			callback(new Error('两次密码不一样，请重新输入！'));
      		} else {
      			callback();
      		}
        }

		return {
			pwd: {
				oldpwd: '', newpwd: '', repwd: ''
			},
			pwdRules: {
                oldpwd: [{ required: true, trigger: 'blur', validator: validateOldpwd }],
                newpwd: [{ required: true, trigger: 'blur', validator: validateNewpwd }],
                repwd: [{ required: true, trigger: 'blur', validator: validateRepwd }],
            },
		}
	},
	created(){

	},
	methods: {
		onSubmit(){
			this.$refs.form.validate(valid => {
                if (valid){
                    updatePwd(this.$store.getters.id, this.pwd.newpwd).then(response => {
                    	this.$notify({
          					title: '成功',
          					message: '密码修改成功！',
          					type: 'success'
        				});
                    })
                }
            })
		}
	}
}
</script>
<style style="stylesheet/scss" lang="scss" scoped>
@import '../../styles/user/uppwd.scss';	
</style>