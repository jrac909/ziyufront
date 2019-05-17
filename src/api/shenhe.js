import request from '@/utils/request'

export function addShenhe(quaLevel, reportingTime, occupation, certificateNo, zili, zilidesc, field, fielddesc, client, userid, name, idcard){
	return request({
		url: '/shenhe/addShenhe',
		method: 'post',
		data: {
			quaLevel,reportingTime, occupation, certificateNo, zili, zilidesc, field, fielddesc, client, userid, name, idcard
		}
	})
}

// 获取指定 id 用户的审核状态
export function getStatus(userid){
	return request({
		url: '/shenhe/getStatus',
		method: 'get',
		params: {
			userid
		}
	})
}