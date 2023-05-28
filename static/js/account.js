import a from './md5.min.js';

// 生成账号登录时的请求体
function loginBody(phone, passwd){
	let phoneMd5 = a.md5(phone);
	console.log("phone: "+phone+"  md5: "+phoneMd5);
}