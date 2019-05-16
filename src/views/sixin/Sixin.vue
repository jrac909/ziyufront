<template>
	<div class="app-container">
		<header>
			<img @click="$router.push('/')" src="/static/image/title.png">
		</header>
		<div class="main">
			<div class="left"> 
        
      </div>
			<div class="right">
				<div class="title">
					<h4>{{ this.acceptUser.userNickname }}</h4>
				</div>
				<section class="show">	
          <ul v-if="this.newslist && this.newslist.length !== 0">
            <li :id="'news'+index" v-for="(news, index) in newslist" :key="index">
              <!-- <p class="sendTime" v-if="news.newSendId == $store.getters.id">{{ news.newDate.split('T')[0] }}&nbsp;&nbsp;&nbsp;{{ news.newDate.split('T')[1].split('.')[0] }}</p>
              <p class="sendTime" v-if="news.newSendId != $store.getters.id">{{ news.newDate.split('T')[0] }}&nbsp;&nbsp;&nbsp;{{ news.newDate.split('T')[1].split('.')[0] }}</p> -->
              <img class="sendPhoto" v-if="news.newSendId == $store.getters.id" :src="sendUser.userPhoto">
              <img class="rePhoto" v-if="news.newReceiveId == $store.getters.id" :src="acceptUser.userPhoto">
              <p class="sendMsg" v-if="news.newSendId == $store.getters.id">{{news.newContent}}</p>
              <p class="reMsg" v-if="news.newSendId != $store.getters.id">{{news.newContent}}</p>
            </li>
          </ul>
				</section>
				<section class="input-panel">
					<textarea v-model="content">
					</textarea>
					<button @click="sendMsgToUser()">发送</button>
				</section>
			</div>
		</div>
	</div>
</template>
<script>
import { getuser } from '@/api/user';
import { qunfa } from '@/api/sixin';
import * as ExpertService from '@/api/expert';
import * as SixinService from '@/api/sixin';

export default{
	data(){
		return {
			websocket: {},
			searchForm: {

			},
			acceptUserId: 0,
			acceptUser: {},
			sendUserId: this.$store.getters.id,
			sendUser: {},
			activeNames: ['1'],
      expert: {},
      newslist: [],
      content: ''
		}
	},
	created(){
		this.acceptUserId = this.$route.query.acceptUserId;
		this.getAcceptUser();
		this.getSendUser();
    this.cancelWeidu();
    this.getCurNews();
		/*this.initWebSocket();*/
    this.initWebSocket();
	},
  updated(){
    // var a = document.getElementById('news2');
    // console.log(a); 享受着现在得到的爱，却也清醒的知道这爱并不会长久，没关系就享受当下，不要跟我说以后
    if (document.getElementById('news'+(this.newslist.length-1))){
      document.getElementById('news'+(this.newslist.length-1)).scrollIntoView(false);
    }
  },
  destroyed(){
    this.websocketclose();
  },
	methods: {
    cancelWeidu(){
      SixinService.cancelWeidu(this.$store.getters.id, this.acceptUserId).then(res => {
        console.log("成功取消未读");
      }).catch(err => {
        console.log(err)
      })
    },
    getCurNews(){
      SixinService.getCurNews(this.$store.getters.id, this.acceptUserId).then(res => {
        this.newslist = res.data;
        console.log(this.newslist);
      })
    },
    getAcceptUser(){
      getuser(this.acceptUserId).then(response => {
        this.acceptUser = response.data;
        if (this.acceptUser.userRole == 1){
          ExpertService.getById(this.acceptUserId).then(res => {
            this.expert = res.data
          });
        }
      })
    },
    getSendUser(){
      getuser(this.sendUserId).then(response => {
        this.sendUser = response.data;
      })
    },
		initWebSocket(){
			   const URL = `ws://localhost:9988/websocket/${this.$store.getters.id}`;
            // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
            this.websock = new WebSocket(URL);
            this.websock.onopen = this.websocketonopen;
            this.websock.onerror = this.websocketonerror;
            this.websock.onmessage = this.websocketonmessage;
            this.websock.onclose = this.websocketclose;

        console.log(this.websock);
		},
		websocketonopen() {
      console.log("WebSocket连接成功");
    },
    websocketonerror(e) {
      console.log("WebSocket连接发生错误");
    },
    websocketonmessage(e) {
      if (e.data) {
          /*let len = this.newslist.length;
          let obj = {};
          obj.newReceiveId= this.$store.getters.id;
          obj.newSendId= this.acceptUserId;
          /*obj.newDate = new Date();*/
          /*obj.newContent = e.data;
          this.newslist.push(obj);*/
          this.getCurNews();

          console.log(this.newslist);
      }
    },
    websocketclose(e) {
        this.websock.close(); //关闭TCP连接
        console.log("connection closed");
        /*alert("conn close");*/
        SixinService.close(this.$store.getters.id).then(res=>{})
    },
		queryData(){
			console.log("a");
		},
    test(){
      alert("发送前");
      /*this.websock.send(JSON.stringify({
          name: 'Tom'
      }));*/
      qunfa().then(response => {

      })
    },
    sendMsgToUser(){
      SixinService.sendMsgToUser(this.$store.getters.id, this.acceptUserId, this.content).then(res => {
          let len = this.newslist.length;
          let obj = {};
          obj.newSendId = this.$store.getters.id;
          obj.newReceiveId= this.acceptUserId;
          /*obj.newDate = new Date();*/
          obj.newContent = this.content;
          this.newslist.push(obj);
          this.content = '';
        })
    }
  }
}	
</script>
<style style="stylesheet/scss" lang="scss" scoped>
@import '../../styles/sixin/sixin.scss';
</style>