export function randomCode(){
	/* Math.round(Math.random()*L+X) */
	/* 随机获取一个六位数验证码 */
	return Math.floor(Math.random()*99999+10000);
}