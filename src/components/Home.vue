<template>
<div id="home">
  <FHeader></FHeader>
  <div id="homeBox">
    <!-- 直接使用 ElementUI 的走马灯了 -->
    <el-carousel :interval="3000" arrow="always">
      <el-carousel-item v-for="adsPicture in adsPictureList" :key="adsPicture.picId">
        <img v-bind:src="adsPicture.picPath">
        <span></span>
      </el-carousel-item>
    </el-carousel>
    <router-link to="/notice"><button class="more-btn">更多</button></router-link>
    <div class="case">
      <ul id="hot">
        <li v-for="(essay, index) in essayList" v-if="index == 0">
          <img src="/static/image/img5.jpg">
          <span class="hot-type-bg">   
            <p class="hot-type">文章</p>
          </span>
          <div class="hot-con">
            <h3>{{essay.essayTitle}}</h3>
            <p>{{essay.essayContent}}</p>
          </div>
        </li>
        <li v-for="(ques, index) in quesList" v-if="index == 0">
          <img src="/static/image/img6.jpg">
          <span class="hot-type-bg">   
            <p class="hot-type">提问</p>
          </span>
          <div class="hot-con">
            <h3>{{ques.quesTitle}}</h3>
            <p>{{ques.quesContent}}</p>
          </div>
        </li>
        <li v-for="(essay, index) in essayList" v-if="index == 1">
          <img src="/static/image/img7.jpg">
          <span class="hot-type-bg">   
            <p class="hot-type">文章</p>
          </span>
          <div class="hot-con">
            <h3>{{essay.essayTitle}}</h3>
            <p>{{essay.essayContent}}</p>
          </div>
        </li>
      </ul>
      <div id="notice">
        <ul>
          <li v-for="(notice, index) in noticeList" v-if="index < 6">
            <a href="">{{notice.noticeTitle}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="zixun">
      <h1 class="top-title">心理咨询</h1>
      <button v-on:click="toZixun" class="more-btn">更多</button>
      <ul class="zj-info">
        <li v-for="(expert, index) in expertList" v-if="index < 4">
          <img class="zj-bg" src="/static/image/img19.jpg">
          <img class="zj-photo" v-bind:src="expert.userPhoto">
          <p class="zj-name">{{expert.expertTrueName}}</p>
          <p class="zj-shuoming">{{expert.expertShuoming}}</p>
          <ul class="zj-shanchang">
            <li>
              <button v-for="field in expertFieldList" v-if="expert.expertFieldFirst == field.efId">{{field.efName}}</button>
              <button v-for="field in expertFieldList" v-if="expert.expertFieldSecond == field.efId">{{field.efName}}</button>
              <button v-for="field in expertFieldList" v-if="expert.expertFieldThird == field.efId">{{field.efName}}</button>
            </li>
          </ul>
          <button class="zj-yuyue">预约</button>
        </li>
      </ul>
    </div>
  </div>  
  <FFooter></FFooter> 
</div>
</template>

<script>
import FHeader from '@/components/common/FHeader';
import FFooter from '@/components/common/FFooter';
import {getBannerImgs} from '@/assets/js/image.js';
import {getToken} from '@/utils/auth.js'

export default {
  name: 'Home',
  data () {
    return {
      adsPictureList:[],
      expertList: [],
      expertFieldList: [],
      essayList: [],
      quesList: [],
      noticeList: []
    }
  },
  components: {
    FHeader,
    FFooter
  },
  methods: {
    toZixun: function(){
      this.$router.push({
          path: '/zixun',
          query: {
            keyWord: ""
          }
        });
    }
  },
  mounted: 
    function(){
    this.$http.get('/api/picture/getAdsPicture')
    .then(response => {
      this.adsPictureList = response.data;
    })
    .catch(error => {
      console.log(error);
    });

    this.$http.get('/api/expert/getAllExpert')
      .then(response => {
        this.expertList = response.data;
      }).catch((error => {
        console.log(error);
      }));

    this.$http.get('/api/expertField/getAllExpertField')
      .then(response => {
        this.expertFieldList = response.data;
      }).catch((error => {
        console.log(error);
      }));

    this.$http.get('/api/essay/getAllEssay')
    .then(response => {
      this.essayList = response.data;
    })
    .catch(error => {
      console.log(error);
    });

    this.$http.get('/api/question/getAllQuestion')
    .then(response => {
      this.quesList = response.data;
    })
    .catch(error => {
      console.log(error);
    });

    this.$http.get('/api/notice/getAllNotice')
    .then(response => {
      this.noticeList = response.data;
    })
    .catch(error => {
      console.log(error);
    });
    }
}
</script>
<!-- 在父组件修改子组件样式：父组件不能加 scoped。但是我们已经使用了 scoped，如果去掉会污染样式，我们可以混用本地
和全局样式，即<style>和<style scoped>可以同时存在。 注意：使用 !important 提高优先级 -->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/css/home.css';
</style>