import './md5.js';
import CryptoJS from "./crypto-js/crypto-js.js";
import Pkcs7 from './crypto-js/crypto-js_pad-pkcs7.js';

var LOGIN_BODY_SALT = "(**Ulearning__Login##by$$project&&team@@)";//优学院的盐,只是参考,不应该参与计算,浪费性能
var LOGIN_BODY_SALT_MD5 = "416b0426293a1b2e8f129f23e9ac1eef";//盐的md5,固定值
var AES_KEY = "ulearning2021331";// 优学院AES的加密密钥

CryptoJS.pad.Pkcs7 = Pkcs7;

// 来自https://github.com/xmexg/YXYLocheck/blob/main/src/yxyLoginEncrypt/Main.java
var device="android",
			registrationId="13065ffa4f1842c0297",
			appVersion="20230315",
			webEnv="1",
			User_Agent="App ulearning Android",
			Version="1.9.31",
			Uversion="2",
			Platform="android";

var NetPrefix="https://courseapi.ulearning.cn",
			URL_LoginUrl_POST="https://apps.ulearning.cn/user/enter/v2",// 用户登录
			URL_GetCoursesList_GET=NetPrefix+"/courses/students",// 用户所有课程
			URL_GetCourseHomeActivity_GET=NetPrefix+"/appHomeActivity/v3",// 用户某个课程的首页活动(/课程id)
			URL_GetCourseAttendance_GET=NetPrefix+"/newAttendance/getAttendanceForStu",// 某课程中的所有活动(/课程的relationId/用户id)
			URL_LocSign_POST="https://apps.ulearning.cn/newAttendance/signByStu";//完成定位签到
			
var HEAD={
	"Accept-Language": "zh-cn",
	"User-Agent": User_Agent,
	"Uversion": Uversion,
	"Version": Version,
	"Versioncode": appVersion,
	"Platform": Platform,
	"Clientid": registrationId,
	"Accept-Encoding": "identity",
	"Connection": "close"
}

// 生成账号登录时的请求体
// 请在需要使用md5的地方,使用safeMd5
function loginBody(phone, passwd){
	let phoneMd5 = safeMd5(phone);
	let passwdMd5 = safeMd5(passwd);
	let time = Date.now();
	let timestampMd5 = safeMd5(time);
	let ut_half = safeMd5(phoneMd5 + passwdMd5.toLowerCase() + timestampMd5 + LOGIN_BODY_SALT_MD5);
	let timestampMd5_half = timestampMd5.slice(0, 18);
	let ut = timestampMd5.slice(0, 18) + ut_half + timestampMd5.substring(18);
	let hashMap = new Map();// 如果登录不上，有可能是java的hashMap会改变元素位置，js的Map不会改变元素位置
	/*
	 * js Map()
	 * .set: 向Map中添加新的键值对，如果键已经存在，则会更新该键的值, 和java中HashMap的.put像
	 * .put: 向Map中添加新的键值对，如果键已经存在，则会保持旧的值
	 */
	hashMap.set("loginName", phone);// 原始手机号
	hashMap.set("password", passwdMd5);// md5密码
	hashMap.set("ut", ut);
	hashMap.set("device", device);
	hashMap.set("appVersion", appVersion);
	hashMap.set("webEnv", webEnv);
	hashMap.set("registrationId", registrationId);
	/*
	 * 在 JavaScript 中，如果你直接将 Map 对象传给 JSON.stringify() 方法，它会输出一个空对象 {}。
	 * 这是因为 Map 对象是一个复杂的数据结构，它不是标准的 JSON 数据类型。
	 * 因此，需要将 Map 对象转换为某种标准的数据类型，然后才能将其转换为 JSON 格式的字符串。
	 * 一种常见的方法是将 Map 对象转换为数组，数组中的每个元素都是一个由键值对组成的二元数组。
	 * 如果 Map 对象的键值对都是字符串类型，那么可以不使用拓展运算符，直接将 Map 对象传给 Array.from() 方法，然后将其传给 JSON.stringify() 方法。
	 * 例如：JSON.stringify(Array.from(hashMap))。
	 * 但如果 Map 对象的键值对不都是字符串类型，直接使用 Array.from(hashMap) 方法会把键序列化成字符串。
	 * 因此，需要使用拓展运算符创建一个新的数组来避免这个问题。例如：JSON.stringify([...hashMap])。
	 * 总之，使用 ([...hashMap]) 的方式，更加通用，能够保证在所有情况下都可以正确地将 Map 对象转换为 JSON 格式的字符串。
	 * 输出格式类似于 '[["key1","value1"],["key2","value2"],[123,"value3"],[true,"value4"]]'
	 * 
	 * 使用了 reduce 方法，将 Map 对象中的键值对转换为格式正确的对象。然后将该对象作为 JSON.stringify() 方法中的参数，转换为符合期望的 JSON 字符串。其中，null 参数表示不使用任何缩进。
	 * 输出格式类似于 {"key1":"value1","key2":"value2","123":"value3","true":"value4"}
	 */
	let jsonStr = JSON.stringify([...hashMap].reduce((obj, [key, value]) => (Object.assign(obj, {[key]: value})), {}), null, null);
	/*
	 * AES加密
	 * 根据 https://github.com/xmexg/YXYLocheck/blob/main/src/yxyLoginEncrypt/StringUtil.java#L53
	 */
	let y = getCStr(jsonStr);
	return JSON.stringify({"y":y});
	// return y;
}

/**
 * 用户登录请求
 * @param {Object} phone 手机号
 * @param {Object} passwd 密码
 */
function UserLogin(phone, passwd){
	let body = loginBody(phone, passwd);// 生成请求体
	return new Promise((resolve, reject) => {
	    uni.request({
			url: URL_LoginUrl_POST,
			data: body,
			method: 'POST',
			header: {
				...HEAD,
				"Content-Type": "application/json;charset=utf-8"
			},
			success: (res) => {
				resolve(res.data);
			},
			fail: (err) => {
				reject(err);
			}
		});
	});
}

/**
 * 用户登录的密文
 * @param {Object} ciphertext
 */
function DeLoginResult(ciphertext){
	let rightciphertext = ciphertext.replace(/\n/g, "")
	return getRStr(rightciphertext);
}

/**
 * 获取用户课程列表
 * @param {Object} Authorization 用户token
 */
function UserCourseList(Authorization){
	return new Promise((resolve, reject) => {
		uni.request({
			url: URL_GetCoursesList_GET,
			data: {
				publishStatus: 1,
				pn: 1,
				ps: 20,
				type: 1
			},
			header: {
				...HEAD,
				"Authorization": Authorization
			},
			success: (res) => {
				resolve(res.data);
			},
			fail: (err) => {
				reject(err);
			}
		});
	});
}

/**
 * 获取课程首页活动
 * @param {Object} id 课程id
 * @param {Object} Authorization 用户token
 */
function AppHomeActivityList(id, Authorization){
	return new Promise((resolve, reject) => {
		uni.request({
			url: URL_GetCourseHomeActivity_GET+'/'+id,
			header: {
				...HEAD,
				"Authorization": Authorization
			},
			success: (res) => {
				resolve(res.data);
			},
			fail: (err) => {
				reject(err);
			}
		});
	});
}


/**
 * 完成位置签到
 * @param {Object} relationId
 * @param {Object} classId
 * @param {Object} userID
 * @param {Object} lonlat
 * @param {Object} Authorization
 */
function LocSign(relationId, classId, userID, lonlat, Authorization){
	let body = {
		"attendanceID": relationId,
		"classID": classId,
		"userID": userID,
		"location": lonlat,
		"address": "",
		"enterWay": 1,
		"attendanceCode": ""
	};
	return new Promise((resolve, reject) => {
		uni.request({
			url: URL_LocSign_POST,
			data: body,
			method: 'POST',
			header: {
				...HEAD,
				'Authorization': Authorization,
				'Content-Type': 'application/json;charset=utf-8',
				'Origin': 'https://umobile.ulearning.cn',
				'X-Requested-With': 'cn.ulearning.yxy',
				'Sec-Fetch-Site': 'same-site',
				'Sec-Fetch-Mode': 'cors',
				'Sec-Fetch-Dest': 'empty',
				'Referer': 'https://umobile.ulearning.cn/'
			},
			success: (res) => {
				resolve(res.data);
			},
			fail: (err) => {
				reject(err);
			}
		});
	});
}

// 安全的md5,如何是数字类型,则转换为string类型再md5
function safeMd5(input){
	let inputStr = (typeof input === 'number') ? String(input) : input;
	let md5Hash = md5(inputStr);
	return md5Hash;
}

/**
 * 下面3个函数完全还原优学院的y值加密 
 * https://github.com/xmexg/YXYLocheck/blob/main/src/yxyLoginEncrypt/StringUtil.java
 */
function getCStr(str) {// public static String getCStr(String str)
	try {
		const encryptedBytes = encrypt(str, AES_KEY);
		// const encryptedString = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encryptedBytes));// bug
		const encryptedString = CryptoJS.enc.Base64.stringify(encryptedBytes);
		return getCString(encryptedString);
	} catch (e) {
		console.error(e);
		return "";
	}
}
function encrypt(str, str2) {// public static byte[] encrypt(String str, String str2)
	const key = CryptoJS.enc.Utf8.parse(str2);
	const encrypted = CryptoJS.AES.encrypt(str, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	// 获取加密后的字节数组
	const ciphertext = encrypted.ciphertext;
    // 使用CryptoJS提供的Hex对象将字节数组转为16进制字符串
 //    const hex = CryptoJS.enc.Hex.stringify(ciphertext)
	// console.log("每个加密块:"+hex);
	// const base64string = CryptoJS.enc.Base64.stringify(ciphertext);
	// console.log("测试base64:"+base64string);
	return ciphertext;
}
// 优学院在y值中插入了随机字符
// 参考 https://github.com/xmexg/YXYLocheck/blob/main/src/yxyLoginEncrypt/StringUtil.java#L69 
function getCString(str){// private static String getCString(String str)
	let sb = "";
	for (let i = 0; i < str.length; i++) {
	  if (sb.length < 10) {
	    sb += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
	  }
	  sb += str.charAt(i);
	}
	return sb;
}

/**
 * 下面3个函数完全还原优学院的登陆包解密
 * https://github.com/xmexg/YXYLocheck/blob/main/src/yxyLoginEncrypt/StringUtil.java
 */
function getRStr(str){
	try{
		const decryptionByte = CryptoJS.enc.Base64.parse(getRString(str));
		return decrypt(decryptionByte, AES_KEY);
	} catch (e) {
		console.error(e);
		return "";
	}
}
function getRString(str) {
    let sb = "";
    for (let i = 0; i < str.length; i++) {
        if (i >= 10 || (i + 1) % 2 == 0) {
            sb+=str.charAt(i);
        }
    }
    return sb;
}
function decrypt(str, str2) {
    const key = CryptoJS.enc.Utf8.parse(str2);
    const decrypted = CryptoJS.AES.decrypt({ ciphertext: str}, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
	const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
    return plaintext;
}
export {
	UserLogin,
	DeLoginResult,
	UserCourseList,
	AppHomeActivityList,
	LocSign
}