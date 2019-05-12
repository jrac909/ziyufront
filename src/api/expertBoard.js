import request from '@/utils/request'

export function get(expertId){
	return request({
		url: '/expertBoard/get',
		method: 'get',
		params: {
			expertId
		}
	})
}

export function delBoard(ebId){
	return request({
		url: '/expertBoard/del',
		method: 'get',
		params: {
			ebId
		}
	})
}

export function addReply(erCommentId, expertId, content){
	return request({
		url: '/expertBoard/reply',
		method: 'post',
		data: {
			erCommentId, expertId, content
		}
	})
}

export function listReply(){
	return request({
		url: '/expertBoard/listReply',
		method: 'get'
	})
}

export function getReply(expertId){
	return request({
		url: '/expertBoard/listReply',
		method: 'get',
		params: {
			expertId
		}
	})
}

export function delReply(id){
	return request({
		url: '/expertBoard/delReply',
		method: 'post',
		data: {
			id
		}
	})
}