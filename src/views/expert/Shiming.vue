<template>
	<div>
		<header>
      <div class="header-box">
				<img src="/static/image/title.png" alt="自愈心理在线咨询" title="在线心理咨询网站" />
				<ul>
					<li>首页</li>
					<span>|</span>
					<li @click="$router.push('question')">问答</li>
					<li @click="$router.push('zixun')">咨询</li>
					<li @click="$router.push('essay')">文章</li>
				</ul>
				<form :model="searchForm" auto-complete="on" >
					<input v-model="searchForm.name" type="text" placeholder="请输入专家名字/领域关键字">
					<button @click="queryData">搜&nbsp;&nbsp;索</button>
				</form>
				<button @click="login" class="login_btn" v-if="$store.getters.token === null">登录</button>
        		<div class="user_center" v-if="$store.getters.token !== null">
          			<el-row class="block-col-2">
            			<el-col :span="12">
              				<el-dropdown>
                				<span class="el-dropdown-link">
                  					<img class="user_photo" :src="$store.getters.photo">
                				</span>
                				<el-dropdown-menu slot="dropdown">
                  					<el-dropdown-item @click.native="$router.push('user')" icon="el-icon-s-custom">个人中心</el-dropdown-item>
                  					<el-dropdown-item icon="el-icon-circle-plus">
                    					<el-badge :is-dot="isdot" @click.native="$router.push('newslist')" class="item">消&nbsp;&nbsp;息</el-badge>
                  					</el-dropdown-item>
                  					<el-dropdown-item @click.native="checkout" icon="el-icon-circle-plus-outline">退&nbsp;&nbsp;出</el-dropdown-item>
                				</el-dropdown-menu>
              				</el-dropdown>
           				</el-col>
          			</el-row>
        		</div>
      		</div>
		</header>
		<div class="process_bar">
			<el-steps :active="1" simple>
  				<el-step title="资格认证" icon="el-icon-edit"></el-step>
  				<el-step title="上传证书" icon="el-icon-upload"></el-step>
  				<el-step title="入驻" icon="el-icon-picture"></el-step>
			</el-steps>
		</div>
    <section class="shiming">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="身份证号" prop="idcard">
            <el-input v-model="ruleForm.idcard"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">验证</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
    </section>
	</div>
</template>
<script type="text/javascript">
import { getAdsList } from '@/api/picture';
import { getHotEssay } from '@/api/essay';
import { getLastNotice } from '@/api/notice';
import { getLastEUC } from '@/api/expert';
import * as SixinService from '@/api/sixin'
import * as ExpertService from '@/api/expert'

export default{
	data(){
    var validateIdcard = (rule, value, callback) => {
        if(value==''||value==undefined){
            new Error("请输入身份证号码");
        }else{
            let reg=/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
              if(!reg.test(value)){callback(new Error('身份证号码不正确'))} else {
                callback();
              }
        }
      };
    var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入真实姓名'));
        } else {
          let regExpr = /^[a-zA-Z0-9 \u4e00-\u9fa5]+$/;
          if(!regExpr.test(value)){
            callback(new Error('姓名输入不正确'));
          } else if(value && value.trim().length>30) {
            callback(new Error('长度超出限制'));
          } else {
            this.correct = true; // 标记contact是否校验通过
            callback();
          }
        }
    }; 
		return {
			searchForm: {
				name: ''
			},
      isdot: true, // 未读消息红色小点
      websocket: {},
      name: '',
      weiduCount: 0,
      ruleForm: {
        idcard: '',
        name: ''
      },
      resdata: {},
      zigedata: {},
      rules: {
          idcard: [
            { required: true, message: '身份证格式不正确', validator: validateIdcard, trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入真实姓名', validator: validateName, trigger: 'blur' }
          ]
      },
      quaLevel: '二级',
      reportingTime: '2015-07-31 02:58:48 PM',
      occupation: '心理咨询师',
      certificateNo: '1234567890'
    }
	},
	created(){
    	this.name = this.$route.query.name;
    		if (this.$store.getters.token != null){
      			this.getWeiduCount();
    		}
	},
	methods: {
		submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push({
              path: '/zili',
              query: {
                quaLevel: this.quaLevel,
                reportingTime: this.reportingTime,
                occupation: this.occupation,
                certificateNo: this.certificateNo,
                name: this.ruleForm.name,
                idcard: this.ruleForm.idcard
              }
            });
            // 正式用的时候把下面的注释打开就好了
            // 资格审核
            // 不要打开实名认证，没用
            /*ExpertService.yzZige(this.ruleForm.name, this.ruleForm.idcard).then(res => {
              this.zigedata = res.showapi_res_body;
              console.log(this.zigedata);
              if (this.zigedata.ret_code == 0){
                  this.$router.push({
                    path: '/zili',
                    query: {
                      zigedata: this.zigedata
                    }
                  });
              } else {
                this.$message({
                  showClose: true,
                  message: '未查到资格证书，请重新提交！',
                  type: 'error'
                });
              }
            }).catch(err => {
            })*/

                // 实名认证
           /* ExpertService.yzIdcard(this.ruleForm.name, this.ruleForm.idcard).then(res => {
              this.resdata = res.data;
              alert("zaizhixing");
              alert("code:"+this.resdata.code);
              console.log(res);
              if (this.resdata.code == 0){

                this.$router.push('/zili');
              } else if(this.resdata.code == 1){
                this.$message({
                  showClose: true,
                  message: '信息不一致认证失败，请重新输入身份信息！',
                  type: 'error'
                });
              }
            }).catch(err => {
              console.log(err);
            })*/
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    // 重置身份证表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
		queryData: function(){
      		this.$router.push({
        		path: '/zixun',
        		query: {
          		name: this.searchForm.name
        		}
      		});
		},
    login(){
      this.$router.push({
        path: 'login'
      });
    },
    /**
     * 退出登录，成功退出跳转到登录页面
     **/
    checkout(){
      this.$store.dispatch('Checkout').then(res => {
        this.$router.push({ path: '/login' });
      
       
      }).catch(err => {
        console.log(err);
      });
    },
    gozixun(){

    },
    goessayDetail(essayId){
      this.$router.push({
        path: '/essayDetail',
        query: {
          essayId: essayId
        }
      })
    },
    goexpert(expertId){
      this.$router.push({
        path: '/expert',
        query: {
          expertId: expertId
        }
      })
    },
    getWeiduCount(){
      SixinService.getWeiduCount(this.$store.getters.id).then(res => {
        this.weiduCount = res.data;
        this.isdot = this.weiduCount == 0?false:true;
      }).catch(err => {
        console.log(err);
      })
    }
	}
}	
</script>
<style lang="scss" stylesheet="text/scss" scoped>
@import '../../styles/expert/shiming.scss';
</style>