<template>
<div>
<h1>单选框</h1>
<el-radio v-model="sex" label="1" disabled>性别男</el-radio>
<el-radio v-model="sex" label="5">性别女</el-radio>
<el-radio-group v-model="gender">
	<el-radio :label="2" border>性别男</el-radio>
	<el-radio :label="3">性别女</el-radio>
	<el-radio :label="4">双性</el-radio>
</el-radio-group>
<el-radio-group v-model="city" size="small">
	<el-radio-button label="北京"></el-radio-button>
	<el-radio-button label="上海"></el-radio-button>
	<el-radio-button label="深圳"></el-radio-button>
	<el-radio-button label="成都"> </el-radio-button>
</el-radio-group>
<h1>多选框</h1>
<el-checkbox v-model="checked">备选项</el-checkbox>
<el-checkbox v-model="checked" disabled>备选项</el-checkbox>
<el-checkbox-group v-model="checkList">
	<el-checkbox label="6">备选项A</el-checkbox>
	<el-checkbox label="7">备选项B</el-checkbox>
	<el-checkbox label="8">备选项C</el-checkbox>
	<el-checkbox label="9" disabled>禁用</el-checkbox>
	<el-checkbox label="10" disabled>选中且禁用</el-checkbox>
</el-checkbox-group>
<h1>输入框</h1>
<el-input></el-input>
</div>
</template>
<script>
export default{
	name: 'Form',
	data(){
		return {
			sex: 0,
			gender: 1,
			city:2,
			checked: true,
			checkList: ['6', '7', '8', '10']
		}
	}
}
</script>
<style>
	
</style>