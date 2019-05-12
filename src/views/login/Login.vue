<template>
<div class="login-container">
	<header></header>
	<el-tabs type="border-card">
  		<el-tab-pane>
    		<span slot="label">登录</span>
    		<div class="loginPanel">
                <el-form ref="loginForm" auto-complete="on" :model="loginInfo" :rules="loginRules" label-position="left">
                    <el-form-item prop="username">
    					<span class="svg-container"><svg-icon icon-class="user" /></span>
                        <el-input auto-complete="on" v-model="loginInfo.username" type="text" name="username"></el-input>
                    </el-form-item>
    				<el-form-item prop="password">
    					<span class="svg-container"><svg-icon icon-class="password" /></span>
    					<el-input auto-complete="on" v-model="loginInfo.password" type="password" name="password"></el-input>
                    </el-form-item>
                    <!-- prevent 是阻止默认行为，比如表单的自动提交，如果不加 prevent，一点击按钮页面就会跳转，因为form 会自动提交，如果这里是 el-button ，还需要写成 @click.native.prevent，native 是保证把阻止事件绑定在 button 上，而不是 el-button -->
    				<button @click.prevent="login" class="loginBtn">登录</button>
    			</el-form>
    		</div>
  		</el-tab-pane>
  		<el-tab-pane label="注册">
  			<div class="registerPanel">
  				<el-form ref="regForm" auto-complete="on" :model="registerInfo" :rules="regRules" label-position="left">
                    <el-form-item prop="username">
    					<span class="svg-container"><svg-icon icon-class="user" /></span>
    					<el-input v-model="registerInfo.username" type="text" name="account"></el-input>
    				</el-form-item>
                    <el-form-item prop="password">
    					<span class="svg-container"><svg-icon icon-class="password" /></span>
    					<el-input v-model="registerInfo.password" type="password" name="password"></el-input>
    				</el-form-item>
                    <el-form-item prop="code">
    				    <span class="svg-container"><svg-icon icon-class="yanzm" /></span>
    				    <el-input v-model="registerInfo.code" type="text" name="code" class="yanzhengInput"></el-input>
    				    <button class="yanzhengBtn" @click.prevent="yanzheng">获取验证码</button>
                    </el-form-item>
    				<button @click.prevent="register" class="registerBtn">注册</button>
    			</el-form>
  			</div>
  		</el-tab-pane>
	</el-tabs>
</div>
</template>
<script>
import axios from 'axios'
import { getYZM, checkName, register, login } from '@/api/login';
import { randomCode } from '@/utils/util';
import { Message, MessageBox } from 'element-ui';

export default{
	name: 'Login',

	data(){
        const validateUsername = (rule, value, callback) => {
          checkName(this.loginInfo.username).then(response => {
                const admin = response.data;
                if (admin == null){
                    callback(new Error('该用户不存在！'));
                } else {
                    callback();
                }
            }).catch(error => {
                callback(new Error('该用户不存在！'));
            })
        }
        const validatePass = (rule, value, callback) => {
           if (value.length < 6) {
                callback(new Error('密码不能小于6位'))
            } else {
                callback()
            }
        }
        const validateRegUsername = (rule, value, callback) => {
            checkName(this.registerInfo.username).then(response => {
                const admin = response.data;
                const reg = /^1[3|4|5|7|8][0-9]\d{8}$/

                if (admin != null){
                    callback(new Error('该账号已注册，请直接登录！'));
                } else if (!reg.test(value)){
                    callback(new Error('账号格式不正确，请重新输入！'))
                }else {
                    callback();
                }
            })
        }
        const validateRegPass = (rule, value, callback) => {
           if (value.length < 6) {
                callback(new Error('密码不能小于6位'))
            } else {
                callback()
            }
        }

        const validateRegCode = (rule, value, callback) => {
            alert("v"+value);
            if( this.registerInfo.code == value){
                callback();
            } else{
                callback(new Error('验证码错误！'))
            }
            if(value.length < 5){
                callback(new Error('请输入5位数验证码'));
            } else {
                callback();
            }
        }

		return {
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePass }]
            },
            regRules: {
                username: [{ required: true, trigger: 'blur', validator: validateRegUsername }],
                password: [{ required: true, trigger: 'blur', validator: validateRegPass }],
                code: [{ required: true, trigger: 'blur', validator: validateRegCode }]
            },
            registerInfo: {
                username: '',
                password: '',
                code: ''
            },
            loginInfo: {
                username: '',
                password: ''
            },
            yanzhengInfo: {
                code: 0,
                msg: '',
                count: 0,
                create_date: '',
                uid: '',
                smsid: '',
                mobile: ''
            },
            loginNameTip: false,
            loginPwdTip: false,
            nameSuccess: false,
            pwdSuccess: false,
            tempCode: 0
		}
	},
    methods: {
        checkName: function(){
            checkName(this.loginInfo.username).then(response => {
                if (response.data == null){
                    this.loginNameTip = true;
                }
                else {
                    this.loginNameTip = false;
                }
            }).catch(error => {
            })
        },
        checkUser(){

        },
        gohome(){
            this.$router.push({path: '/'})
        },
        yanzheng(){
            this.tempCode = randomCode();
            getYZM(this.registerInfo.username, this.tempCode).then(res => {
                if(res.stat == 100){
                    console.log("验证码发送成功");
                } else {
                    console.log("验证码发送失败！");
                }
            }).catch(err => {
            })
        },
        login(){
            this.$refs.loginForm.validate(valid => {
                if (valid){
                    this.$store.dispatch('Login', this.loginInfo).then(response => {
                        this.$router.push({ path: '/' });
                    }).catch(error => {
                    })
                } else {
                    return false;
                }
            })
        },
        register(){
            this.$refs.regForm.validate(valid => {
                if (valid){
                    register(this.registerInfo.username, this.registerInfo.password).then(response => {
                        this.$router.push({path: '/registerSuccess'})
                    }).catch(error => {

                    })
                }
            })
        }
    }
}	
</script>
<style style="stylesheet/scss" lang="scss">
@import '../../styles/login/login.scss'
</style>  