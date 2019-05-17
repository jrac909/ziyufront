import request from '@/utils/request'
import requestid from '@/utils/requestid';
import requestzg from '@/utils/requestzg';

export function yzIdcard(name, number){
	return requestid({
		url: '/cert/id-card',
		method: 'get',
		params: {
			name:name,
			number:number,
			appcode: '6b9b031e9b3b4df3b545ee080458c8f0'
		}
	})
}

export function yzZige(idName, idCardNum){
	return requestzg({
		url: '/1491-1',
		method: 'post',
		data: {
        	showapi_appid: '95334', //这里需要改成自己的appid
        	showapi_sign: 'b322fb7c0a64430ab61852feb8aa3a97',  //这里需要改成自己的应用的密钥secret
        	idName: idName,
        	idCardNum:idCardNum
		}
	})
}

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