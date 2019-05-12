import request from '@/utils/request'

export function getLastEUC(len){
	return request({
		url: '/expert/getLast',
		method: 'get',
		params: {
			len
		}
	})
}

export function listEUC(currentpage, pagesize){
	return request({
		url: '/expert/listTrue',
		method: 'get',
		params: {
			currentpage, pagesize
		}
	})
}

export function queryEUC(currentpage, pagesize, name){
	return request({
		url: '/expert/queryTrue',
		method: 'get',
		params: {
			currentpage, pagesize, name
		}
	})
}

export function getExpertCount(){
	return request({
		url: '/expert/getCount',
		method: 'get'
	})
}

export function getById(expertId){
	return request({
		url: '/expert/getById',
		method: 'get',
		params: {
			expertId
		}
	})
}