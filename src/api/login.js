import request from '@/utils/request';
import requestyz from '@/utils/requestyz';

export function getYZM(mobile, code){
	return requestyz({
		url: '/sms',
		method: 'get',
		params: {
			ac: 'send',
            uid: 'jrac909',
            pwd: 'e29245eba05dd68200488dc96cb0beb0',
            template: '100000',
            mobile: mobile,
            content: {
                code: code,
            }
		}
	})
}

export function checkName(username){
	return request({
		url: '/user/checkName',
		method: 'get',
		params: {
			username
		}
	})
}

export function register(username, password){
	return request({
		url: '/user/register',
		method: 'post',
		data: {
			username, password
		}
	})
}

export function login(username, password){
	return request({
		url: '/user/login',
		method: 'post',
		data: {
			username, password
		}
	})
}