import './md5.js';

// 生成账号登录时的请求体
export default function loginBody(phone, passwd){
	const phoneMd5 = md5(phone);
	console.log("phone: "+phone+"  md5: "+phoneMd5);
}	