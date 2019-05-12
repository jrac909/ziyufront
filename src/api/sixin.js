import request from '@/utils/request'

export function qunfa(){
	return request({
		url: '/news/test',
		method: 'get'
	})
}