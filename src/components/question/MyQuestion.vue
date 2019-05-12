<template>
<div id="my-question">
	<header>
		<div id="header-box">
			<h1>我的问答</h1>
			<img src="/static/image/img6.jpg">
			<span>做个梦</span>
		</div>
	</header>
	<div id="main">
		<el-carousel :interval="5000" arrow="always" :autoplay="false">
    		<el-carousel-item>
      			<h3>我的回答</h3>
      			<ul id="huida-ul" class="my-ul">
      				<li>
      					<h4>暴躁、易怒、没耐心，悲观厌世。</h4>
      					<p>
      						<span class="huida-mine">我的回答：</span>
      						<span>既然是这样那就这样吧哈哈哈哈哈哈哈</span>
      					</p>
      					<button>删除</button>
      				</li>
      				<li>
      					<h4>暴躁、易怒、没耐心，悲观厌世。</h4>
      					<p>
      						<span class="huida-mine">我的回答：</span>
      						<span>既然是这样那就这样吧哈哈哈哈哈哈哈</span>
      					</p>
      					<button>删除</button>
      				</li>
      			</ul>
    		</el-carousel-item>
    		<el-carousel-item>
      			<h3>我的提问</h3>
      			<ul id="tiwen-ul" class="my-ul">
      				<li>
      					<h4>暴躁、易怒、没耐心，悲观厌世。</h4>
      					<p>
      						提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容
      					</p>
      					<button>删除</button>
      				</li>
      				<li>
      					<h4>暴躁、易怒、没耐心，悲观厌世。</h4>
      					<p>
      						提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容提问内容
      					</p>
      					<button>删除</button>
      				</li>
      			</ul>
    		</el-carousel-item>
    		<el-carousel-item>
      			<h3>我的收藏</h3>
      			<ul id="collect-ul" class="my-ul">
      				<li>
      					<h4>暴躁、易怒、没耐心，悲观厌世。</h4>
      					<p>收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容</p>
      				</li>
      				<li>
      					<h4>暴躁、易怒、没耐心，悲观厌世。</h4>
      					<p>收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容收藏内容</p>
      				</li>
      			</ul>
    		</el-carousel-item>
  		</el-carousel>
	</div>
</div>
</template>
<script>
export default{
	name: 'MyQuestion',
	data(){
		return {

		}
	}
}
</script>
<style scoped>
@import '../../assets/css/myQuestion.css'
</style>