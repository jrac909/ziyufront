<template>
<div>
	<el-button type="primary" @click="show = !show">Click Me</el-button>
	<div style="display: flex; margin-top: 20px; height: 100px;">
		<transition name="el-fade-in-linear">
			<div v-show="show" class="transition-box">.el-fade-in-linear</div>
		</transition>
		<transition name="el-fade-in">
			<div v-show="show" class="transition-box">.el-fade-in</div>
		</transition>
	</div>
	<el-row>
		<el-button type="info" @click="suo = !suo">缩放按钮</el-button>
		<div style="display: flex; margin-top: 30px;">
			<transition name="el-zoom-in-center">
				<div v-show="suo" class="transition-box">一</div>
			</transition>
			<transition name="el-zoom-in-top">
				<div v-show="suo" class="transition-box">二</div>
			</transition>
			<transition name="el-zoom-in-bottom">
				<div v-show="suo" class="transition-box">三</div>
			</transition>
		</div>
	</el-row>
	<el-row>
		<el-button type="warning" @click="zhan = !zhan">展开折叠</el-button>
		<el-collapse-transition>
			<div v-show="zhan">
				<div class="transition-box">kun</div>
				<div class="transition-box">fan</div>
			</div>
		</el-collapse-transition>
	</el-row>
</div>

</template>
<script>
export default{
	name: 'Donghua',
	data(){
		return {
			show: true,
			suo: true,
			zhan: true
		}
	}
}
</script>
<style>
	.transition-box{
		margin-bottom: 10px;
		width: 200px;
		height: 100px;
		border-radius: 4px;
		background-color: #66b1ff;
		text-align: center;
		color: #fff;
		padding: 40px 20px;
		box-sizing: border-box;
		margin-right: 20px;
	}
</style>