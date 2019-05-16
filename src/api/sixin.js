import request from '@/utils/request'

export function qunfa(){
	return request({
		url: '/news/test',
		method: 'get'
	})
}

export function getWeiduCount(id){
	return request({
		url: '/news/getWeiduCount',
		method: 'get',
		params: {
			id
		}
	})
}

export function getAllById(id){
	return request({
		url: '/news/getAllById',
		method: 'get',
		params: {
			id
		}
	})
}

export function cancelWeidu(id1, id2){
	return request({
		url: '/news/cancelWeidu',
		method: 'get',
		params: {
			id1, id2
		}
	})
}

export function getCurNews(id1, id2){
	return request({
		url: '/news/getCurNews',
		method: 'get',
		params: {
			id1, id2
		}
	})
}

export function sendMsgToUser(sendId, receiveId, content){
	return request({
		url: '/news/sendMsg',
		method: 'post',
		data: {
			sendId, receiveId, content
		}
	})
}

export function close(id){
	return request({
		url: '/news/close',
		method: 'get',
		params: {id}
	})
}