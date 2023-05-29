import './md5.js';
var LOGIN_BODY_SALT = "(**Ulearning__Login##by$$project&&team@@)";//只是参考,不应该参与计算,浪费性能
var LOGIN_BODY_SALT_MD5 = "416b0426293a1b2e8f129f23e9ac1eef";//盐的md5,固定值

// 生成账号登录时的请求体
function loginBody(phone, passwd){
	let phoneMd5 = md5(phone);
	let passwdMd5 = md5(passwd);
	let timestampMd5 = md5(Date.now());
	let ut_half = md5(phoneMd5 + passwdMd5 + timestampMd5 + LOGIN_BODY_SALT_MD5);
	let timestampMd5_half = timestampMd5.slice(0, 18);
	let ut = timestampMd5.slice(0, 18) + ut_half + timestampMd5_half.substring(18);
	console.log("ut: "+ut);
}

function updateUser(phone, passwd){
	let body = loginBody(phone, passwd);
}

export {
	loginBody,
	updateUser
}