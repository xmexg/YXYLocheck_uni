import './md5.js';
import CryptoJS from "../../node_modules/.vite/deps/crypto-js.js";
import Pkcs7 from '../../node_modules/.vite/deps/crypto-js_pad-pkcs7.js';

CryptoJS.pad.Pkcs7 = Pkcs7;


// export default crypto
var LOGIN_BODY_SALT = "(**Ulearning__Login##by$$project&&team@@)";//优学院的盐,只是参考,不应该参与计算,浪费性能
var LOGIN_BODY_SALT_MD5 = "416b0426293a1b2e8f129f23e9ac1eef";//盐的md5,固定值
var AES_KEY = "ulearning2021331";// 优学院AES的加密密钥

// 来自https://github.com/xmexg/YXYLocheck/blob/main/src/yxyLoginEncrypt/Main.java
var device="android",
			registrationId="13065ffa4f1842c0297",
			appVersion="20230315",
			webEnv="1",
			User_Agent="App ulearning Android",
			Version="1.9.31",
			Uversion="2",
			Platform="android";

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
	console.log("拼接时间戳："+time);
	console.log("密码小写："+passwdMd5);
	console.log("时间戳md5："+timestampMd5);
	console.log("手机号md5："+phoneMd5);
	console.log("固定值md5："+LOGIN_BODY_SALT_MD5);
	console.log("拼接："+phoneMd5+passwdMd5+timestampMd5+LOGIN_BODY_SALT_MD5);
	console.log("拼接后md5："+ut_half);
	console.log("时间戳md5截取："+timestampMd5_half);
	console.log("最终："+timestampMd5.slice(0, 18) + ut_half + timestampMd5_half.substring(18));
	console.log("最终md5："+ut);
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
	// const cipher = CryptoJS.createCipher('aes256', AES_KEY);
	// let encrypted = cipher.update(jsonStr, 'utf8', 'hex');
	// encrypted += cipher.final('hex');
	// let base64str = base64.encode(encrypted);
	// let y = getCString(base64str);
	console.log("请求数组："+jsonStr);
	let y = getCStr(jsonStr);
	console.log("y:"+y);
}

function updateUser(phone, passwd){
	let body = loginBody(phone, passwd);
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
		console.log("原始的base64编码:");
		console.log(encryptedString);
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

export {
	loginBody,
	updateUser
}