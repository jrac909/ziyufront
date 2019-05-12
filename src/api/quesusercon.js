import request from '@/utils/request';

export function listQUC(currentpage, pagesize){
	return request({
		url: '/quesUserCon/list',
		method: 'get',
		params: {
			currentpage,
			pagesize
		}
	})
}

export function queryQUC(currentpage, pagesize, name){
	return request({
		url: '/quesUserCon/query',
		method: 'post',
		data: {
			currentpage, pagesize, name
		}
	})
}

export function queryQUCByHot(currentpage, pagesize){
	return request({
		url: '/quesUserCon/queryByHot',
		method: 'get',
		params: {
			currentpage,
			pagesize
		}
	})
}

export function queryQUCByType(currentpage, pagesize, type){
	return request({
		url: '/quesUserCon/queryByType',
		method: 'get',
		params: {
			currentpage,
			pagesize,
			type
		}
	})
}

export function getQUCById(quesId){
	return request({
		url: '/quesUserCon/get',
		method: 'get',
		params: {
			quesId: quesId
		}
	})
}