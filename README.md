# jacky的个人博客

采用vuepress搭建个人博客

## 涉及技术

Git、Vue、Node、Flask、Shell

## 本地运行

1. 下载项目
2. npm install下载相关依赖
3. npm run docs:dev



## requirement

npm：8.5.0

node：16.14.2



## 项目部署

### 同步思路

采用第三方git方式进行同步，本地push.bat脚本进行推送，服务端启动flask服务监听更新请求进行文档更新，同时对config.js进行无效修改使得运行中的项目进行更新

### 部署过程

1. 前提条件
   
   自备图床、Git仓库（Gitee）、Linux服务器

2. 环境准备
   
   Windows和Linux上有Node、Npm、Python环境

3. Windows、Linux、Gitee进行项目绑定，即Git管理，并添加ssh公钥到Gitee

4. Linux将项目下的update.sh以及docs/.vuepress/refresh.sh添加运行权限，chmod 777即可

5. Linux上运行npm run docs:dev（博客，默认端口80）

6. Linux上运行python flask-syn.py（更新服务，默认端口5001）

7. 在Windows上的docs目录下进行编写markdown文档，完成后双击执行一键提交.bat即可一键更新

## vuepress工具类介绍

在.vuepress中自定义了get-sidebar-by-dir工具进行博客目录解析，并在config.js中引入作为sidebar即可
