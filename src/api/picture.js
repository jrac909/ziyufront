import request from '@/utils/request'

/* 获取 Banner 图片 */
export function getAdsList(){
	return request({
		url: '/pic/getAdsList',
		method: 'get'
	})
}