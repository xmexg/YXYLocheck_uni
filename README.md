## 这是个半成品，无法运行，大家别再克隆了！  

# YXYLocheck_uni  
 - 优学院定位签到项目，同时也是我的uni结课项目  
 - 优学院定位签到原理: [YXYLocheck](https://github.com/xmexg/YXYLocheck)  

# 目前存在的问题 
 - 第2页修改密码功能不会写    

希望好心人能帮忙解决这些问题  

# 如何运行

## 一般运行
 1. 找一个目录，打开终端执行 `git clone https://github.com/xmexg/YXYLocheck_uni.git`  
 2. 下载安装并打开 [HBuilderX](https://www.dcloud.io/hbuilderx.html)  
 3. HBuilderX中打开本地克隆的项目目录
 4. HBuilderX内打开 `pages/index/index.vue`
 5. 点击 HBuilderX 顶栏的 `运行` 按钮即可  

## 常见问题
  <details>
  <summary>浏览器终端提示 CORS 错误</summary>
    <image src="./readmeRes/images/chromeErr_CORS.jpg"><br><br>
    以chrome浏览器为例:<br>
    1. 打开<a href="chrome://flags/#block-insecure-private-network-requests">chrome实验室</a>并将Block insecure private network requests设置为Disabled<br>
    <image src="./readmeRes/images/chromeExper_CORS.jpg"><br>
    2. 安装并运行<a href="./readmeRes/extensions">CORS_Unblock</a>扩展,打开<a href="https://webbrowsertools.com/test-cors/">网页</a>测试是否成功<br>
    <image src="./readmeRes/images/chromeExper_CORS_test.jpg"><br>
  </details>

 