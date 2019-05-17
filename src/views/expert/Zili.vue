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
			<el-steps :active="2" simple>
  				<el-step title="资格认证" icon="el-icon-edit"></el-step>
  				<el-step title="上传证书" icon="el-icon-upload"></el-step>
  				<el-step title="入驻" icon="el-icon-picture"></el-step>
			</el-steps>
		</div>
    <section class="zili">
      <h3>上传职业资格证书图片</h3>
      <span class="zili-tip">(证书信息请与身份证信息保持一致，保证图片清晰，最多上传十张。)</span>
      <el-upload class="zili-update"
        action="/api/expert/upzige"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-button class="up-btn" @click="confirmup();" type="primary">确定</el-button>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </section>
	</div>
</template>
<script type="text/javascript">
import { getAdsList } from '@/api/picture';
import { getHotEssay } from '@/api/essay';
import { getLastNotice } from '@/api/notice';
import { getLastEUC } from '@/api/expert';
import * as SixinService from '@/api/sixin'

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
      dialogImageUrl: '',
      dialogVisible: false,
      quaLevel: '',
      reportingTime: '',
      occupation: '',
      certificateNo: '',
      ruleForm: {
        idcard: '',
        name: ''
      }
		}
	},
	created(){
    	this.name = this.$route.query.name;
      this.quaLevel = this.$route.query.quaLevel;
      this.reportingTime = this.$route.query.reportingTime;
      this.occupation = this.$route.query.occupation;
      this.certificateNo = this.$route.query.certificateNo;
      this.ruleForm.name = this.$route.query.name;
      this.ruleForm.idcard = this.$route.query.idcard;
    	if (this.$store.getters.token != null){
      	this.getWeiduCount();
    	}
	},
	methods: {
    // 确定上传图片[其实选完图片就自动上传了]，跳转到下一页面
    confirmup(){
      this.$router.push({
        path: '/ruzhu',
        query: {
          quaLevel: this.quaLevel,
          reportingTime: this.reportingTime,
          occupation: this.occupation,
          certificateNo: this.certificateNo,
          name: this.ruleForm.name,
          idcard: this.ruleForm.idcard
        }
      });
    },
		handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
@import '../../styles/expert/zili.scss';
</style>