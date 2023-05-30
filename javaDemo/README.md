# java演示
一些开发辅助  

# 文件列表
 - lib : java运行时需要用到的第三方库  
 - out : 暂时无用,用于存放工具打包后的jar文件  
 - *.java : java源码  
 - *.class : java二进制文件  
 - *.bat : windows批处理文件

# 如何运行java
## 如何编译java源码(*.java -> *.class)
javac -cp ./lib/用到的库 文件名.jar

## 如何运行.class
java -cp .;./lib用到的库 文件名  
