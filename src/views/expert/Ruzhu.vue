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
			<el-steps :active="3" simple>
  				<el-step title="资格认证" icon="el-icon-edit"></el-step>
  				<el-step title="上传证书" icon="el-icon-upload"></el-step>
  				<el-step title="入驻" icon="el-icon-picture"></el-step>
			</el-steps>
		</div>
    <section class="ruzhu">
      <h4><svg-icon icon-class="qiang"></svg-icon>&nbsp;&nbsp;请输入真实信息，确保审核能够通过。</h4>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="证书名称" prop="zili">
            <el-input v-model="ruleForm.zili" placeholder="二级心理咨询师"></el-input>
          </el-form-item>
          <el-form-item label="资历描述" prop="zilidesc">
            <el-input placeholder="从业15年，日本临床心理士（日本临床心理士资格认定协会认定）台湾临床心理师（台湾考试院高考通过证明）" class="text-common" :rows="3" type="textarea" v-model="ruleForm.zilidesc"></el-input>
          </el-form-item>
          <el-form-item label="擅长领域" prop="field">
            <el-input placeholder="情绪/ 职场/青少年" v-model="ruleForm.field"></el-input>
          </el-form-item>
          <el-form-item label="领域描述" prop="fielddesc">
            <el-input placeholder="个人成长跨文化适应、跨地区适应、人生规划、自我成长、身份认同" label="领域描述" class="text-common" :rows="3" type="textarea" v-model="ruleForm.fielddesc"></el-input>
          </el-form-item>
          <el-form-item label="咨询对象" prop="client">
            <el-input placeholder="青少年、中年人、留学生、职场人、LGBTQ" v-model="ruleForm.client"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="shenhe()">审核</el-button>
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
import * as ShenheService from '@/api/shenhe'

export default{
	data(){
		return {
			searchForm: {
				name: ''
			},
      isdot: true, // 未读消息红色小点
      websocket: {},
      name: '',
      weiduCount: 0,
      ruleForm: {
        zili: '',
        zilidesc: '',
        field: '',
        fielddesc: '',
        client: ''
      },
      quaLevel: '',
      reportingTime: '',
      occupation: '',
      certificateNo: '',
      rules: {
          zili: [
            { required: true, message: '请输入资历名称', trigger: 'blur' }
          ],
          zilidesc: [
            { required: true, message: '请输入资历描述', trigger: 'blur' }
          ],
          field: [
            { required: true, message: '请输入擅长领域', trigger: 'blur' }
          ],
          fielddesc: [
            { required: true, message: '请输入领域描述', trigger: 'blur' }
          ],
          client: [
            { required: true, message: '请输入面向对象', trigger: 'blur' }
          ]
      },
      shenfen: {
        name: '',
        idcard: '' 
      }
		}
	},
	created(){
      this.quaLevel = this.$route.query.quaLevel;
      this.reportingTime = this.$route.query.reportingTime;
      this.occupation = this.$route.query.occupation;
      this.certificateNo = this.$route.query.certificateNo;
      this.shenfen.name = this.$route.query.name;
      this.shenfen.idcard = this.$route.query.idcard;
      alert(this.quaLevel+this.reportingTime+this.occupation+this.certificateNo);
    	this.name = this.$route.query.name;
    		if (this.$store.getters.token != null){
      			this.getWeiduCount();
    		}
	},
	methods: {
		shenhe(){
      /*alert(this.ruleForm.zili+this.ruleForm.zilidesc+this.ruleForm.field+this.ruleForm.fielddesc+this.ruleForm.client);*/
      ShenheService.addShenhe(this.quaLevel, this.reportingTime, this.occupation, this.certificateNo, this.ruleForm.zili, this.ruleForm.zilidesc, this.ruleForm.field, this.ruleForm.fielddesc, this.ruleForm.client, this.$store.getters.id, this.shenfen.name, this.shenfen.idcard).then(res => {
          this.$router.push('/zixun')
      }).catch(err => {
        alert(err);
      })
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
@import '../../styles/expert/ruzhu.scss';
</style>