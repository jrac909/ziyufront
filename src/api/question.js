import request from '@/utils/request'

export function getQuesList(currentpage, pagesize){
	return request({
		url: '/question/list',
		method: 'get',
		params: {
			currentpage,
			pagesize
		}
	})
}

export function queryQuesList(currentpage, pagesize, name, type){
	return request({
		url: '/question/query',
		method: 'post',
		data: {
			currentpage, pagesize, name, type
		}
	})
}

export function getQues(id){
	return request({
		url: '/question/get',
		method: 'get',
		params: {
			id
		}
	})
}

export function delQues(id){
	return request({
		url: '/question/del',
		method: 'get',
		params: {
			id
		}
	})
}

export function addQues(userId, title, content, niming, tag){
	return request({
		url: '/question/add',
		method: 'post',
		data: {
			userId, title, content, niming, tag
		}
	})
}

export function listTop(userId, len){
	return request({
		url: '/question/listTop',
		method: 'post',
		data: {
			userId, len
		}
	})
}