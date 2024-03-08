# jenkins

## 持续部署







## 持续集成







## 持续交付

小版本间不断迭代

不断去接近用户的需求





## 使用指南

- 本地环境要求

目前jenkins官网的新版本已经不支持java8

所以在部署前，机器的java环境最好是java11或者java17。

- 下载jenkins

下载最新的jenkins.war到本地，也有其他本地构建的方法，个人觉得下载war包的方式比较简单快捷

- 启动jenkins

```shell
java -jar jenkins.war --httpPort=8888
nohup java -jar jenkins.war --httpPort=8888 &
```

- 登录访问 8888端口

登录之后一般是下载**推荐的插件**即可



推荐的一些配置

1. 配置jenkins插件的下载源，加快插件的下载速度
2. 下载ssh plugin 、 maven intergation 等插件
3. 配置jenkins 中的JAVA_HOME、MAVEN_HOME（还需要配置settings.xml文件位置）
4. git码云的ssh需要在本地配置好（将机器中的id_rsa.pub内容放到码云平台，实现免密登录）
5. 一般部署的话，我们会在本地也会放一个start.sh启动脚本；也可以配置一下build成功后让jenkins删除workspace



jenkins后台和项目部署  是同一台机器的话，不需要配置ssh

