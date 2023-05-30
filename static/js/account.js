import './md5.js';
import '../../.vite/deps/crypto-js.js';
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
	let timestampMd5 = safeMd5(Date.now());
	let ut_half = safeMd5(phoneMd5 + passwdMd5 + timestampMd5 + LOGIN_BODY_SALT_MD5);
	let timestampMd5_half = timestampMd5.slice(0, 18);
	let ut = timestampMd5.slice(0, 18) + ut_half + timestampMd5_half.substring(18);
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
	const cipher = crypto.createCipher('aes256', AES_KEY);
	let encrypted = cipher.update(jsonStr, 'utf8', 'hex');
	encrypted += cipher.final('hex');
	let base64str = base64.encode(encrypted);
	let y = getCString(base64str);
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
 * 优学院在y值中插入了随机字符
 * 参考 https://github.com/xmexg/YXYLocheck/blob/main/src/yxyLoginEncrypt/StringUtil.java#L69
 */
function getCString(base64str){
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