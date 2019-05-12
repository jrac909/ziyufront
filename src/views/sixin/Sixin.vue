<template>
	<div class="app-container">
		<header>
			<img @click="$router.push('/')" src="/static/image/title.png">
		</header>
		<div class="main">
			<div class="left">
				<el-collapse v-model="activeNames" @change="handleChange">
  					<el-collapse-item name="2">
  						<template slot="title">
      						<span style=" margin-left: 40px;">已读消息</span>
    					</template>
    					<ul>
    						<li>
    							<img src="">
    							<span></span>
    						</li>
    					</ul>
  					</el-collapse-item>
  					<el-collapse-item name="1" class="weidu">
  						<template slot="title">
      						<span style=" margin-left: 40px;">未读消息</span>
    					</template>
    					<ul>
    						<li>
    							<img src="/static/image/img9.jpg">
    							<span>透明的玻璃</span>
    						</li>
    						<li>
    							<img src="/static/image/img9.jpg">
    							<span>透明的玻璃</span>
    						</li>
    						<li>
    							<img src="/static/image/img9.jpg">
    							<span>透明的玻璃</span>
    						</li>
    						<li>
    							<img src="/static/image/img9.jpg">
    							<span>透明的玻璃</span>
    						</li>
    						<li>
    							<img src="/static/image/img9.jpg">
    							<span>透明的玻璃</span>
    						</li>
    						<li>
    							<img src="/static/image/img9.jpg">
    							<span>透明的玻璃</span>
    						</li>
    						<li>
    							<img src="/static/image/img9.jpg">
    							<span>透明的玻璃</span>
    						</li>
    						<li>
    							<img src="/static/image/img9.jpg">
    							<span>透明的玻璃</span>
    						</li>
    						<li>
    							<img src="/static/image/img9.jpg">
    							<span>透明的玻璃</span>
    						</li>
    					</ul>
  					</el-collapse-item>
				</el-collapse>
			</div>
			<div class="right">
				<div class="title">
					<h4>{{ this.acceptUser.userNickname }}</h4>
				</div>
				<section class="show">	
				</section>
				<section class="input-panel">
					<textarea>
					</textarea>
					<button @click="test()">发送</button>
				</section>
			</div>
		</div>
	</div>
</template>
<script>
import { getuser } from '@/api/user';
import { qunfa } from '@/api/sixin';

export default{
	data(){
		return {
			websock: {},
			searchForm: {

			},
			acceptUserId: 0,
			acceptUser: {},
			sendUserId: this.$store.getters.id,
			sendUser: {},
			activeNames: ['1']
		}
	},
	created(){
		const acceptUserId = this.$route.query.acceptUserId;
		this.acceptUserId = acceptUserId;
		this.getAcceptUser();
		this.getSendUser();
		this.initWebSocket();
	},
	methods: {
		initWebSocket(){
			   const URL = `ws://localhost:9988/websocket/${this.$store.getters.id}`;
            // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
            this.websock = new WebSocket(URL);
            this.websock.onopen = this.websocketonopen;
            this.websock.onerror = this.websocketonerror;
            this.websock.onmessage = this.websocketonmessage;
            this.websock.onclose = this.websocketclose;

		    },
		    websocketonopen() {
            console.log("WebSocket连接成功");
        },
        websocketonerror(e) {
            console.log("WebSocket连接发生错误");
        },
        websocketonmessage(e) {
            if (e.data) {
                alert("Test:"+e.data);
            }
        },
        websocketclose(e) {
            this.websock.close(); //关闭TCP连接
            console.log("connection closed");
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
		handleChange(val) {
			console.log(val);
      	},
      	getAcceptUser(){
      		getuser(this.acceptUserId).then(response => {
      			this.acceptUser = response.data;
      		})
      	},
      	getSendUser(){
      		getuser(this.sendUserId).then(response => {
      			this.sendUser = response.data;
      		})
      	}
	}
}	
</script>
<style style="stylesheet/scss" lang="scss" scoped>
@import '../../styles/sixin/sixin.scss';
</style>