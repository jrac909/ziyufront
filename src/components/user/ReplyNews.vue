<template>
	<h1>ReplyNews</h1>
</template>
<script>
export default{
	name: 'ReplyNews',
	created(){
		this.$http.get('/api/expert/getExpertByNameAndField')
		.then(res => {
			alert(res.getExpertId());
			console.log(res.expertId);
		})
		.catch(error => {
			alert("aa");
			console.log("cc");
		})
	}
}	
</script>
<style scoped>
	
</style>