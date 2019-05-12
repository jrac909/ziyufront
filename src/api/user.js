import request from '@/utils/request'

export function listuser(currentpage, pagesize){
	return request({
		url: '/user/list',
		method: 'get',
		params: {
			currentpage, pagesize
		}
	})
}

export function getuser(id){
	return request({
		url: '/user/get',
		method: 'get',
		params: { id }
	})
}

export function getUserFans(id){
	return request({
		url: '/user/getUserFan',
		method: 'get',
		params: {
			id
		}
	})
}

export function getUserFollowed(id){
	return request({
		url: '/user/getUserFollowed',
		method: 'get',
		params: {
			id
		}
	})
}

export function updateUser(id, name, address, gender, jianjie){
	return request({
		url: '/user/updateUser',
		method: 'post',
		data: {
			id, name, address, gender, jianjie
		}
	})
}

export function savephoto(id){
	return request({
		url: '/user/savephoto',
		method: 'post',
		data: {
			id
		}
	})
}

export function updatePwd(id, pwd){
	return request({
		url: '/user/updatePwd',
		method: 'post',
		data: {
			id, pwd
		}
	})
}

export function isFollow(followId, followedId){
	return request({
		url: '/user/isFollow',
		method: 'post',
		data: {
			followId, followedId
		}
	})
}

export function follow(followId, followedId){
	return request({
		url: '/user/follow',
		method: 'post',
		data: {
			followId, followedId
		}
	})
}

export function cancelFollow(followId, followedId){
	return request({
		url: '/user/cancelFollow',
		method: 'post',
		data: {
			followId, followedId
		}
	})
}