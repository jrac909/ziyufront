import request from '@/utils/request'

/* 获取热门文章 */
export function getHotEssay(len){
	return request({
		url: '/essay/getHot',
		method: 'get',
		params: {
			len
		}
	})
}

export function getList(currentpage, pagesize){
	return request({
		url: '/essay/list',
		method: 'get',
		params: {
			currentpage,
			pagesize
		}
	})
}

export function getListByCollect(currentpage, pagesize){
	return request({
		url: '/essay/listByCollect',
		method: 'get',
		params: {
			currentpage,
			pagesize
		}
	})
}

export function listTopEssay(userId, len){
	return request({
		url: '/essay/listTop',
		method: 'post',
		data: {
			userId, len
		}
	})
}

export function getessay(id){
	return request({
		url: '/essay/get',
		method: 'get',
		params: {
			id
		}
	})
}

export function getDetailCom(essayId){
	return request({
		url: '/essayBoard/getDetail',
		method: 'post',
		data: {
			essayId
		}
	})
}

export function addEssayCom(userId, comment, essayId){
	return request({
		url: '/essayBoard/add',
		method: 'post',
		data: {
			userId, comment, essayId
		}
	})
}