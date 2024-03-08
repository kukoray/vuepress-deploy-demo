# Docker

## docker概述

### docker为什么出现？

项目能不能带上环境安装打包（镜像）

主要是为了解决环境配置复杂麻烦的问题

Docker通过隔离机制，可以将服务器利用到极致



Docker是基于go语言开发的

### docker能干嘛？

什么是虚拟化技术？

> 虚拟化，是指通过虚拟化技术将一台计算机虚拟为多台逻辑计算机。在一台计算机上同时运行多个逻辑计算机，每个逻辑计算机可运行不同的操作系统，并且应用程序都可以在相互独立的空间内运行而互不影响，从而显著提高计算机的工作效率。

什么是hypervisor？

> Hypervisor一种运行在基础物理[服务器](https://cloud.tencent.com/product/cvm?from=10680)和操作系统之间的中间软件层，可允许多个操作系统和应用共享硬件。也可叫做VMM( virtual machine monitor )，即虚拟机监视器。
>
>  Hypervisor是一种在虚拟环境中的“元”操作系统。他们可以访问服务器上包括磁盘和内存在内的所有物理设备。Hypervisor不但协调着这些硬件资源的访问，也同时在各个虚拟机之间施加防护。当服务器启动并执行Hypervisor时，它会加载所有虚拟机客户端的操作系统同时会分配给每一台虚拟机适量的内存，CPU，网络和磁盘。

容器和虚拟机之间的区别？

>  **Q1：Container技术和服务器虚拟化是一样的技术吗?**
>
>  A：不是。`两者虽然都属于虚拟化的技术`，目标都是为了将一套应用程序所需的执行环境打包起来，建立一个孤立环境，方便在不同的硬件中移动，但两者的运作思维截然不同。简单来说，常见的传统虚拟化技术如vSphere或Hyper-V是以操作系统为中心，而Container技术则是一种以应用程序为中心的虚拟化技术。
>
>  传统虚拟化技术从操作系统层下手，目标是建立一个可以用来执行整套操作系统的沙盒独立执行环境，习惯以虚拟机(Virtual Machine)来称呼。而Container技术则是直接将一个应用程序所需的相关程序代码、函式库、环境配置文件都打包起来建立沙盒执行环境，为了和传统虚拟化技术产生的虚拟机区分，Container技术产生的环境就称为Container。
>
>  **Q2：一般常见的虚拟机和Container有何不同?**
>
>  A：最明显的差别是，虚拟机需要安装操作系统(安装Guest OS)才能执行应用程序，而Container内不需要安装操作系统就能执行应用程序。Container技术不是在OS外来建立虚拟环境，而是在OS内的核心系统层来打造虚拟执行环境，透过共享Host OS的作法，取代一个一个Guest OS的功用。Container也因此被称为是OS层的虚拟化技术。
>
>  **Q3：为何Container是轻量级虚拟化技术?**
>
>  A：因为Container技术采取共享Host OS的作法，而不需在每一个Container内执行Guest OS，因此建立Container不需要等待操作系统开机时间，不用1分钟或几秒钟就可以启用，远比需要数分钟甚至数十分钟才能开启的传统虚拟机来的快。

<img src="https://s2.loli.net/2022/10/27/HA3697EqZszOfrL.png" alt="image-20221027195123052" style="zoom:67%;" />

## docker安装

**镜像images：**

```shell
docker 镜像（Image）就是一个只读的模板。镜像可以用来创建 Docker 容器，一个镜像可以创建很多容器。 就好似 Java 中的 类和对象，类就是镜像，容器就是对象！
```

**容器container：**

容器和镜像的关系，更像是对象和类的关系。

```shell
Docker 利用容器（Container）独立运行的一个或一组应用。容器是用镜像创建的运行实例。
它可以被启动、开始、停止、删除。每个容器都是相互隔离的，保证安全的平台。
可以把容器看做是一个简易版的 Linux 环境（包括root用户权限、进程空间、用户空间和网络空间等）和运行在其中的应用程序。
容器的定义和镜像几乎一模一样，也是一堆层的统一视角，唯一区别在于容器的最上面那一层是可读可写的。
```

**仓库repository：**

```shell
仓库（Repository）是集中存放镜像文件的场所。
仓库（Repository）和仓库注册服务器（Registry）是有区别的。仓库注册服务器上往往存放着多个仓库，每个仓库中又包含了多个镜像，每个镜像有不同的标签（tag）。
仓库分为公开仓库（Public）和私有仓库（Private）两种形式。
最大的公开仓库是 Docker Hub(https://hub.docker.com/)，存放了数量庞大的镜像供用户下载。
国内的公开仓库包括阿里云 、网易云 等
```



测试是否安装成功

```shell
docker version
docker run hello-world
docker images
```



卸载

```shell
systemctl stop docker
apt-get remove docker-ce docker-ce-cli containerd.io

rm -rf /var/lib/docker
```



### Docker运行逻辑

（run方法的具体流程步骤）

![image-20221025201543479](https://s2.loli.net/2022/10/27/HWbjaJv6uLzfIkh.png)



## docker常用命令



### 帮助命令

```shell
docker version
docker info   # 显示 docker 系统信息，包括镜像和容器数
docker --help
```

### 镜像命令

**docker images**

```shell 
docker images 查看所有本地的镜像
# 可选项
-a: #列出本地所有镜像
-q: #只显示镜像id
-aq: #列出本地所有镜像的id号

root@localhost:~# docker images -aq
8fad08b3c84b
feb5d9fea6a5
5d0da3dc9764
root@localhost:~# docker images -a
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
mysql         latest    8fad08b3c84b   5 days ago      535MB
hello-world   latest    feb5d9fea6a5   13 months ago   13.3kB
centos        latest    5d0da3dc9764   13 months ago   231MB
root@localhost:~#
```

**docker search**

```shell
root@localhost:~# docker search nginx
NAME                                              DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
nginx                                             Official build of Nginx.                        17584     [OK]
linuxserver/nginx                                 An Nginx container, brought to you by LinuxS…   179
bitnami/nginx                                     Bitnami nginx Docker Image                      141                  [OK]
ubuntu/nginx                                      Nginx, a high-performance reverse proxy & we…   64
bitnami/nginx-ingress-controller                  Bitnami Docker Image for NGINX Ingress Contr…   20                   [OK]
rancher/nginx-ingress-controller                                                                  11
webdevops/nginx                                   Nginx container                                 10                   [OK]
```

**docker pull**

```shell
root@localhost:~# docker pull nginx
Using default tag: latest   # 不写tag 默认是latest
latest: Pulling from library/nginx
e9995326b091: Downloading [===============>                                   ]  9.505MB/31.42MB
71689475aec2: Downloading [===============================================>   ]  24.37MB/25.41MB
f88a23025338: Downloading [==================================================>]     627B/627B
0df440342e26: Download complete   #这里采用了分层下载
eef26ceb3309: Download complete
8e3ed6a9e43a: Download complete


# 指定版本下载
[root@kuangshen ~]# docker pull mysql:5.7
....
```

**docker rmi**

意思是docker **re**move **i**mages

```shell
# 删除镜像
docker rmi -f 镜像id # 删除单个
docker rmi -f 镜像名:tag 镜像名:tag # 删除多个
docker rmi -f $(docker images -qa) # 删除全部
```



### 容器命令

**说明：有镜像才可以创建容器！**

**新建容器并启动**

```shell
docker run [options] image [command] [arg..]
# 常用参数说明
--name="Name" # 给容器指定一个名字
-d # 后台方式运行容器，并返回容器的id！
-i # 以交互模式运行容器，通过和 -t 一起使用
-t # 给容器重新分配一个终端，通常和 -i 一起使用
-P # 随机端口映射（大写）
-p # 指定端口映射（小结），一般可以有四种写法

root@localhost:~# docker run -it centos /bin/bash
[root@1aa6548d4635 /]# ls
bin  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
[root@1aa6548d4635 /]#

[root@1aa6548d4635 /]# exit
exit
root@localhost:~#

这里使用快捷键ctrl+D  同样也是exit的效果！退出并停止容器的运行。
使用快捷键ctrl+P+Q 是退出，但是保留容器的运行。


端口映射
docker run -d --name nginx01 -p 3344:80 nginx 
# 在后台运行  nginx容器  把服务器的3344外部端口 映射 容器内部端口80  并对该容器起了别名nginx01

root@localhost:~# docker run -d --name nginx01 -p 3344:80 nginx
cb7e020cf886c51c9a5574510f2af39d9dae4529a2a82fd4fa64674a67150d84
root@localhost:~# curl localhost:3344
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
root@localhost:~#

root@localhost:~# docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS                                   NAMES
cb7e020cf886   nginx     "/docker-entrypoint.…"   39 seconds ago   Up 38 seconds   0.0.0.0:3344->80/tcp, :::3344->80/tcp   nginx01
```

**列出所有运行的容器**

```shell
root@localhost:~# docker ps
CONTAINER ID   IMAGE     COMMAND       CREATED       STATUS       PORTS     NAMES
66674cb229f1   centos    "/bin/bash"   2 hours ago   Up 2 hours             inspiring_ritchie
f096a83a8eff   centos    "/bin/bash"   2 hours ago   Up 2 hours             vibrant_kepler
root@localhost:~# docker ps -a
CONTAINER ID   IMAGE         COMMAND       CREATED              STATUS                          PORTS     NAMES
1aa6548d4635   centos        "/bin/bash"   About a minute ago   Exited (0) About a minute ago             suspicious_raman
66674cb229f1   centos        "/bin/bash"   2 hours ago          Up 2 hours                                inspiring_ritchie
f096a83a8eff   centos        "/bin/bash"   2 hours ago          Up 2 hours                                vibrant_kepler
160ff4c9a651   centos        "/bin/bash"   2 hours ago          Exited (0) 2 hours ago                    kind_lumiere
cb42d37479e3   centos        "/bin/bash"   2 hours ago          Exited (0) 2 hours ago                    pensive_hugle
430e7fc7b6e8   centos        "/bin/bash"   2 hours ago          Exited (0) 2 hours ago                    jovial_dijkstra
e9d7a074d624   centos        "/bin/bash"   3 hours ago          Exited (0) 2 hours ago                    dreamy_swartz
ac3169b94675   centos        "/bin/bash"   3 hours ago          Exited (0) 3 hours ago                    magical_lumiere
c6544e906e57   centos        "/bin/bash"   3 hours ago          Exited (0) 3 hours ago                    vigilant_davinci
67c96603bdfd   hello-world   "/hello"      2 days ago           Exited (0) 2 days ago                     stupefied_blackwell
root@localhost:~# docker ps -aq
1aa6548d4635
66674cb229f1
f096a83a8eff
160ff4c9a651
cb42d37479e3
430e7fc7b6e8
e9d7a074d624
ac3169b94675
c6544e906e57
67c96603bdfd
root@localhost:~#
```

**退出容器**

```shell
exit # 容器停止退出
ctrl+P+Q # 容器不停止退出

root@localhost:/# docker run -d tomcat
20858f07fb6dc3285c565b2de5fae2f10f4980430c771032874d1b93c9dbd755
root@localhost:/# docker ps
CONTAINER ID   IMAGE     COMMAND             CREATED         STATUS         PORTS      NAMES
20858f07fb6d   tomcat    "catalina.sh run"   5 seconds ago   Up 4 seconds   8080/tcp   ecstatic_mclaren
root@localhost:/# docker exec -it 20858f07fb6d /bin/bash
root@20858f07fb6d:/usr/local/tomcat# exit
exit
root@localhost:/# docker ps
CONTAINER ID   IMAGE     COMMAND             CREATED          STATUS          PORTS      NAMES
20858f07fb6d   tomcat    "catalina.sh run"   31 seconds ago   Up 30 seconds   8080/tcp   ecstatic_mclaren
root@localhost:/# 

这里注意一点，exit对于本身就是在后台运行的容器，就是说启动时-d启动的，使用exit时容器是不会关闭的。
但是用-it前台启动的，使用exit会退出并停止
```

**启动停止容器**

```shell
docker start (容器id or 容器名) # 启动容器
docker restart (容器id or 容器名) # 重启容器
docker stop (容器id or 容器名) # 停止容器
docker kill (容器id or 容器名) # 强制停止容器
```

**删除容器**

```shell
docker rm 容器id # 删除指定容器
docker rm -f $(docker ps -a -q) # 删除所有容器
docker ps -a -q|xargs docker rm # 删除所有容器
```



### 常用其他命令

**后台启动容器**

```shell
# 命令
docker run -d 容器名
# 例子
docker run -d centos # 启动centos，使用后台方式启动

# 问题： 使用docker ps 查看，发现容器已经退出了！
# 解释：Docker容器后台运行，就必须有一个前台进程，容器运行的命令如果不是那些一直挂起的命令，就会自动退出。
# 比如，你运行了nginx服务，但是docker前台没有运行应用，这种情况下，容器启动后，会立即自杀，因为他觉得没有程序了，所以最好的情况是，将你的应用使用前台进程的方式运行启动。
```

**查看日志**

```shell
# -t 显示时间戳
# -f 打印最新的日志
# --tail 数字 显示多少条！
[root@kuangshen ~]# docker logs -tf --tail 10 c8530dbbe3b4
2020-05-11T08:46:40.656901941Z kuangshen
2020-05-11T08:46:41.658765018Z kuangshen
2020-05-11T08:46:42.661015375Z kuangshen
2020-05-11T08:46:43.662865628Z kuangshen
2020-05-11T08:46:44.664571547Z kuangshen
2020-05-11T08:46:45.666718583Z kuangshen
2020-05-11T08:46:46.668556725Z kuangshen
2020-05-11T08:46:47.670424699Z kuangshen
2020-05-11T08:46:48.672324512Z kuangshen
2020-05-11T08:46:49.674092766Z kuangshen
```



**查看容器中运行的进程信息，支持 ps 命令参数**

```shell
docker top 容器id

[root@kuangshen ~]# docker top c8530dbbe3b4
UID PID PPID C STIME TTY TIME CMD
root 27437 27421 0 16:43 ? 00:00:00 /bin/sh -c ....
```

**查看容器/镜像的原数据**

```shell
root@localhost:~# docker inspect 66674cb229f1
[
    {
        "Id": "66674cb229f1a2622d25229a20aa251124511473815ed9c9faf1464df0e9936f",
        "Created": "2022-10-27T12:02:56.089059143Z",
        "Path": "/bin/bash",
        "Args": [],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 1427120,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2022-10-27T12:02:56.481827573Z",
            "FinishedAt": "0001-01-01T00:00:00Z"
...
```

**进入正在运行的容器**

```shell
#命令一
docker exec -it 容器id bashShell
# 测试1
docker exec -it c8530dbbe3b4 /bin/bash

# 命令2
docker attach 容器id

#测试2
root@localhost:~#
root@localhost:~# docker ps
CONTAINER ID   IMAGE     COMMAND       CREATED       STATUS       PORTS     NAMES
66674cb229f1   centos    "/bin/bash"   2 hours ago   Up 2 hours             inspiring_ritchie
f096a83a8eff   centos    "/bin/bash"   2 hours ago   Up 2 hours             vibrant_kepler
root@localhost:~# docker attach 66674cb229f1
[root@66674cb229f1 /]# ls
bin  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var


# 区别
# exec 是在容器中打开新的终端，并且可以启动新的进程
# attach 直接进入容器启动命令的终端，不会启动新的进程

```

**把容器内拷贝文件到主机上**

```shell
root@localhost:~# docker ps
CONTAINER ID   IMAGE     COMMAND       CREATED       STATUS          PORTS     NAMES
66674cb229f1   centos    "/bin/bash"   2 hours ago   Up 56 seconds             inspiring_ritchie
f096a83a8eff   centos    "/bin/bash"   2 hours ago   Up 2 hours                vibrant_kepler
root@localhost:~# docker cp 66674cb229f1:/home/test.java /home/
root@localhost:~# cd /home/
root@localhost:/home# ls
jacky  test.java
root@localhost:/home#
```



![Docker命令总结](https://s2.loli.net/2022/10/27/B9GQ3gyFsWCLRma.jpg)

### 可视化

Portainer可视化面板





## docker镜像讲解

### 镜像是什么

镜像是一种轻量级、可执行的独立软件包，**用来打包软件运行环境和基于环境开发的软件**

它包含运行某个软件所需要的所有内容，像代码、运行时库、环境变量、配置文件等

### docker镜像加载原理

> UnionFS 联合文件系统

UnionFS（联合文件系统）：Union文件系统（UnionFS）是一种**分层、轻量级并且高性能的文件系统**， 它支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文件系 统下(unite several directories into a single virtual filesystem)。Union 文件系统是 Docker 镜像的基 础。**镜像可以通过分层来进行继承，基于基础镜像（没有父镜像），可以制作各种具体的应用镜像**。

![image-20221028161022232](https://s2.loli.net/2022/10/28/7jiSmoG2LEbzTZr.png)

在读的时候又做了屏蔽目录差异的方式来看起来只有一个文件

<img src="https://s2.loli.net/2022/10/28/Hq9RUYa1I7ncvmK.png" alt="image-20221028161449305" style="zoom:67%;" />

容器运行起来的所有修改记录都会保留在容器层，容器层所依赖的镜像层的数据都是只读的；

容器内的修改只对当前容器生效，被隔离开来的

所以删除容器时，只是删除这个容器层（删除容器时，容器外部所挂载的目录不会被删除，但是容器内部的所有数据删除）

当我们提交我们的容器时，也只是提交我们的容器层，下面的镜像层都不需要去被分发



> docker镜像分层加载原理

docker的镜像实际上由一层一层的文件系统组成，这种层级的文件系统UnionFS。 

bootfs(boot file system)主要包含bootloader和kernel, bootloader主要是引导加载kernel, Linux刚启 动时会加载bootfs文件系统，在Docker镜像的最底层是bootfs。这一层与我们典型的Linux/Unix系统是 一样的，包含boot加载器和内核。当boot加载完成之后整个内核就都在内存中了，此时内存的使用权已 由bootfs转交给内核，此时系统也会卸载bootfs。 

rootfs (root file system) ，在bootfs之上。包含的就是典型 Linux 系统中的 /dev, /proc, /bin, /etc 等标 准目录和文件。rootfs就是各种不同的操作系统发行版，比如Ubuntu，Centos等等。 

![image-20221029104056356](https://s2.loli.net/2022/10/29/rnFVu4sXUWejSMy.png)

平时我们安装进虚拟机的CentOS都是好几个G，为什么Docker这里才200M？ 

对于一个精简的OS，rootfs 可以很小，只需要包含最基本的命令，工具和程序库就可以了，因为底层直 接用Host的kernel，自己只需要提供rootfs就可以了。由此可见对于不同的linux发行版, bootfs基本是一 致的, rootfs会有差别, 因此不同的发行版可以公用bootfs。

### 分层原理

[Docker的镜像分层_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV178411W7bd/?spm_id_from=333.337.search-card.all.click&vd_source=3142cd6018b75d190e83bdb6e8d24478)

<img src="https://s2.loli.net/2022/10/28/5K1HvifjDhRtXxa.png" alt="image-20221028160243699" style="zoom:67%;" />

对于每一个镜像层，这一层只包含自己有变更的文件，并不包含他所依赖的基础层的文件

每一个变更可以理解为是一种补丁，在基础镜像层上所作的优化与更新（板本升级）

**总结就是：变更会加新层，基础镜像共享，提升存储效率**



### commit镜像

docker commit 从容器创建一个新的镜像

```shell
# 语法
docker commit -m="提交的描述信息" -a="作者" 容器id 要创建的目标镜像名:[标签名]
```



```shell
root@kuko:/var/lib/docker/volumes# docker run -d -p 8080:8080 tomcat
d9bcc79f457c865a449b93f92edbe8dfe0f90bef4eb8689005ec7d27e360b06f
root@kuko:/var/lib/docker/volumes# curl localhost:8080

<!doctype html><html lang="en"><head><title>HTTP Status 404 – Not Found</title><style type="text/css">body {font-family:Tahoma,Arial,sans-serif;} h1, h2, h3, b {color:white;background-color:#525D76;} h1 {font-size:22px;} h2 {font-size:16px;} h3 {font-size:14px;} p {font-size:12px;} a {color:black;} .line {height:1px;background-color:#525D76;border:none;}</style></head><body><h1>HTTP Status 404 – Not Found</h1><hr class="line" /><p><b>Type</b> Status Report</p><p><b>Description</b> The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.</p><hr class="line" /><h3>Apache Tomcat/10.1.1</h3></body></html>

root@kuko:/var/lib/docker/volumes# 


# 注意：坑爹：docker启动官方tomcat镜像的容器，发现404是因为使用了加速器，而加速器里的tomcat的webapps下没有root等文件！
# 下载tomcat官方镜像，就是这个镜像（阿里云里的tomcat的webapps下没有任何文件）
# 进入tomcat查看cd到webapps下发现全部空的，反而有个webapps.dist里有对应文件，cp -r到webapps下！


# 注意：commit的时候，容器的名字不能有大写，否则报错：invalid reference format
docker commit -a="kuangshen" -m="no tomcat docs" 1e98a2f815b0 tomcat02:1.1
sha256:cdccd4674f93ad34bf73d9db577a20f027a6d03fd1944dc0e628ee4bf17ec748
[root@kuangshen /]# docker images # 查看，我们自己提交的镜像已经OK了！
REPOSITORY TAG IMAGE ID CREATED
SIZE
tomcat02 1.1 cdccd4674f93 About a minute
ago 649MB
redis latest f9b990972689 9 days ago
104MB
tomcat latest 927899a31456 2 weeks ago
647MB
centos latest 470671670cac 3 months ago
237MB
# 这个时候，我们的镜像都是可以使用的，大家可以启动原来的tomcat，和我们新的tomcat02来
测试看看！
[root@kuangshen ~]# docker run -it -p 8080:8080 tomcat02:1.1
# 如果你想要保存你当前的状态，可以通过commit，来提交镜像，方便使用，类似于 VM 中的快照！
```







## 容器数据卷

### 什么是数据卷

容器之间可以有一个数据共享的技术！docker容器中产生的数据同步到本地！

这就是卷技术！目录的挂载，将我们容器内的目录，挂载到linux上面！

> 特点： 
>
> 1、数据卷可在容器之间共享或重用数据 
>
> 2、卷中的更改可以直接生效 
>
> 3、数据卷中的更改不会包含在镜像的更新中 
>
> 4、数据卷的生命周期一直持续到没有容器使用它为止 

**所以：总结一句话： 就是容器的持久化，以及容器间的继承和数据共享！**



docker管理数据的方式有两种：

- 数据卷

    - 数据卷本质就是一个文件夹，他可以实现宿主机和容器之间的数据共享

    ```
    * 数据卷可以在容器之间共享和重用，容器间传递数据将变得高效方便
    
    * 对数据卷内数据的修改会立马生效，无论是容器内操作还是本地操作
    
    * 对数据卷的更新不会影响镜像，解耦了应用和数据
    
    * 卷会一直存在，直到没有容器使用，可以安全地卸载它
    ```

- 数据卷容器：挂载数据卷的容器叫做`数据卷容器`

    - 通过数据卷容器可以实现容器间的数据共享



### 使用数据卷

> 方式一：使用-v 命令

 值得注意的是，主机目录会直接覆盖掉容器中要挂载的目录

```shell
root@localhost:/# docker run -it -v /home/ceshi:/home centos /bin/bash
```

如果说，宿主机/home/ceshi这个文件夹不是空的，那么在创建容器时，会自动用/home/ceshi这个目录去覆盖容器内/home这个目录



当docker容器内的挂载目录是有文件的，但是宿主机的目录是空的，那么docker会把容器内的目录拷贝到宿主机的目录下

查看数据卷是否挂载成功`docker inspect 容器id`

![image-20221028230427742](https://s2.loli.net/2022/10/28/DRjUa2Y6nxluKPA.png)

对于已经挂载完成的容器，二者就实现了双向绑定，无论容器是否启动，两个互相挂载的目录都是连通同步的。





当使用一个新的镜像时，可以去dockerhub官网去查看启动命令，如何使用，这是一个好方法！

### 匿名挂载和具名挂载

```shell
# 匿名挂载

root@kuko:/var/lib/docker/volumes# docker run -d -p 3344:80 --name nginx01 -v /etc/nginx nginx
0ec1edc853b844fc61a081da9e0a3e2252a3e2a6c3f3d3a39518f3219c091499
root@kuko:/var/lib/docker/volumes# docker volume ls
DRIVER    VOLUME NAME
local     4a13a782a71914ca115547f026a365d968c062617a2853dc0f6280fbb17d49be
root@kuko:/var/lib/docker/volumes# 



#具名挂载

root@kuko:/var/lib/docker/volumes# docker run -d -p 3345:80 --name nginx02 -v nginxconfig:/etc/nginx nginx
c46b74b15b781cb8e307279989452a421c2c30d27ff7b5ef7e8a3349f43eff02
root@kuko:/var/lib/docker/volumes# docker volume ls
DRIVER    VOLUME NAME
local     4a13a782a71914ca115547f026a365d968c062617a2853dc0f6280fbb17d49be
local     nginxconfig
root@kuko:/var/lib/docker/volumes# docker volume inspect nginxconfig
[
    {
        "CreatedAt": "2022-10-29T10:05:44+08:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/nginxconfig/_data",
        "Name": "nginxconfig",
        "Options": null,
        "Scope": "local"
    }
]


#如何判断？
#匿名挂载：-v 容器内部路径
#具名挂载：-v 具名：容器内部命令
#指定目录挂载： -v /宿主机目录:容器内部路径


ps:除了指定目录挂载，具名挂载和匿名挂载都是在/var/lib/docker/volumes/..这个目录下的


# 改变文件的读写权限
# ro: readonly   容器内部无法操作，只有外部能够操作
# rw: readwrite  容器内外都可以操作
# 指定容器对我们挂载出来的内容的读写权限
# 默认是rw
docker run -d -P --name nginx02 -v nginxconfig:/etc/nginx:ro nginx
docker run -d -P --name nginx02 -v nginxconfig:/etc/nginx:rw nginx


```



### 数据卷容器

容器和容器间同步

 docker01创建的内容同步到了docker02（这种同步是双向的，不在乎谁volumes-from谁）

**Volume原理**

想要了解`Docker Volume`，首先我们需要知道`Docker`的文件系统是如何工作的。`Docker`镜像是由多个文件系统（`只读层`）叠加而成。当我们启动一个容器的时候，`Docker`会加载只读镜像层并在其上（译者注：镜像栈顶部）添加一个读写层。如果运行中的容器修改了现有的一个已经存在的文件，那该文件将会从读写层下面的只读层复制到读写层，该文件的只读版本仍然存在，只是已经被读写层中该文件的副本所隐藏。当删除`Docker`容器，并通过该镜像重新启动时，之前的更改将会丢失。在`Docker`中，只读层及在顶部的读写层的组合被称为`Union File System（联合文件系统）`。

为了能够保存（持久化）数据以及共享容器间的数据，`Docker`提出了`Volume`的概念。简单来说，`Volume`就是目录或者文件，它可以`绕过`默认的联合文件系统，而以正常的文件或者目录的形式存在于宿主机上。



**如何使用**

创建父容器，并在父容器的数据卷中添加数据，以挂载父容器生成子容器，实现数据共享

- 启动父容器，并在父容器的 `dataVolumeContainer1`目录下新增内容

![在这里插入图片描述](https://s2.loli.net/2022/10/29/OmrFAx8pzSQC5hy.png)

- 基于父容器生成子容器`son-centos`，注意是在宿主机中使用如下指令

```shell
docker run -it --name=son-centos --volumes-from father-centos new-centos
```

![在这里插入图片描述](https://s2.loli.net/2022/10/29/63JefBMsYWESjTt.png)

- 子容器添加数据，父容器查看数据

![在这里插入图片描述](https://s2.loli.net/2022/10/29/BDI7rj1eXYLK5QV.png)

- 删除父容器，子容器数据依然保留

![在这里插入图片描述](https://s2.loli.net/2022/10/29/I9pngPytklFCuHQ.png)



**结论：容器之间配置信息的传递，数据卷的生命周期一直持续到没有容器使用它为止。**



个人理解：不同容器之间的继承关系，他们之间的一个数据卷共享，本质都是一个`软链接 `，链接到本地的一个文件目录。所以不管容器之间的关系，或者容器怎么删除，只要本地的那个文件还在，那就生命周期还在。





## DockerFile

### 初识DockerFile



在宿主机的 `/root`目录下创建一个`DockerFile`文件 (名称随意)，并通过`docker build`指令生成镜像来添加数据卷

- 在宿主机的 `/root`目录下创建一个`DockerFile`文件，并添加如下内容到文件中

```dockerfile
#基于centos镜像进行构建
FROM centos

#数据卷只能指定容器数据卷，不能指定宿主机数据卷，英文并不能够保证在所有的宿主机上都存在这样的特定目录。
VOLUME ["/dataVolumeContainer1","/dataVolumeContainer2"]

#以 /bin/bash方式启动
CMD /bin/bash
```

使用如下指令，把编写的`DockerFile`文件执行生成镜像，注意：命令最后面是空格 + `.`

```shell
docker build -f 宿主机中DockerFile文件的绝对路径 -t 新镜像名称[:版本号] .
```

![在这里插入图片描述](https://s2.loli.net/2022/10/29/RbYr3tPQTwfKXka.png)

运行我们生成的`new-centos镜像`，就能够查看到在容器内中生成的数据卷

![在这里插入图片描述](https://s2.loli.net/2022/10/29/5wRvE2icKPVxsSa.png)

那么容器内的数据卷文件/目录地址已经知道，对应的宿主机文件/目录的地址怎么查看？通过如下指令

```shell
docker inspect 容器ID/容器名称
```

![在这里插入图片描述](https://s2.loli.net/2022/10/29/FtnUXv31P6buhDf.png)



### DockerFile介绍

 DockerFile是用来构建docker镜像的构建文件（有点类似于c++的Makefile），是由一系列命令和参数构成的脚本。

构建步骤

- 编写DockerFile文件
- docker build 构建镜像
- docker run



### DockerFile构建过程

<img src="https://s2.loli.net/2022/10/29/7hpAivH8YMnkldG.png" alt="image-20221029161003387" style="zoom:50%;" />



**基础知识：** 

1. 每条保留字指令都必须为大写字母且后面要跟随至少一个参数 
2. 指令按照从上到下，顺序执行 
3. \# 表示注释 
4. 每条指令都会创建一个新的镜像层，并对镜像进行提交 

**流程：** 

1. docker从基础镜像运行一个容器 
2. 执行一条指令并对容器做出修改 
3. 执行类似 docker commit 的操作提交一个新的镜像层 
4. Docker再基于刚提交的镜像运行一个新容器 
5. 执行dockerfile中的下一条指令直到所有指令都执行完成！ 

**说明：** 

从应用软件的角度来看，DockerFile，docker镜像与docker容器分别代表软件的三个不同阶段。 

- DockerFile 是软件的原材料 （代码） 
- Docker 镜像则是软件的交付品 （.apk） 
- Docker 容器则是软件的运行状态 （客户下载安装执行） 

DockerFile 面向开发，Docker镜像成为交付标准，Docker容器则涉及部署与运维，三者缺一不可！

<img src="https://s2.loli.net/2022/10/29/algHZc7tiu8J4mw.png" alt="image-20221029200140891" style="zoom: 67%;" />

DockerFile：需要定义一个DockerFile，DockerFile定义了进程需要的一切东西。DockerFile涉及的内容 包括执行代码或者是文件、环境变量、依赖包、运行时环境、动态链接库、操作系统的发行版、服务进程和内核进程（当引用进行需要和系统服务和内核进程打交道，这时需要考虑如何设计 namespace的权限控制）等等。 

Docker镜像：在DockerFile 定义了一个文件之后，Docker build 时会产生一个Docker镜像，当运行 Docker 镜像时，会真正开始提供服务； 

Docker容器：容器是直接提供服务的。



### DockerFile指令

```shell
FROM         # 基础镜像，当前镜像是基于那个镜像的；一般比如：centos、Ubuntu、sketch
MAINTAINER   # 所有者信息，Jacky<kukoray@163.com>
RUN          # 容器构建时所需要运行的命令；比如下载安装包，比如拷贝文件
EXPOSE       # 容器对外保留的端口
WORKDIR      # 创建容器后，运行后，进入容器的工作目录
ENV          # 配置环境变量
ADD          # 将宿主机目录下的文件拷贝进镜像，并且会自动处理URL和解压tar压缩包
COPY         # 类似于ADD，不过这个只是将宿主机目录下的文件拷贝进镜像
VOLUME       # 容器数据卷
CMD          # 指定一个容器启动时要运行的命令，  dockerFile中可以有多个CMD指令，但只有最后一个生效！
ENTRYPOINT   # 和CMD相似，不过CMD不可追加，这个可以追加
ONBUILD      # 当构建一个被继承的DockerFile时运行命令，父镜像在被子镜像继承后，父镜像的ONBUILD被触发
```



### 实战测试

Docker Hub 中99% 的镜像都是通过在base镜像（Scratch，大小只有几十k）中安装和配置需要的软件构建出来的

对于DockerFile的名字，如果是 `Dockerfile` 那么在build命令中，就不需要显式指明，会自动去寻找；如果是其他名字的话，就需要显式指明。

**1、编写DockerFile文件**

```dockerfile
FROM ubuntu
MAINTAINER jacky<kukoray@163.com>

ENV MYPATH /usr/local

WORKDIR $MYPATH

RUN apt-get update --fix-missing && apt-get install -y vim --fix-missing
RUN apt-get install -y net-tools

EXPOSE 80

CMD echo $MYPATH                            #这两句本质上是没有用的
CMD echo "-------------end-----------"      #这两句本质上是没有用的
CMD /bin/bash
```



**2、build构建镜像**

```shell
docker build -f dockerfile地址 -t 新镜像名字:TAG .
```

一定记住最后是有个 `. `  的 ，这个点代表的意思是当前目录，不然的话就需要使用绝对路径。

然后由于我这里使用的是官方默认的命名方式 `DockerFile` ，所以不需要指明dockerfile的地址

**3、运行镜像**

![image-20221029220256509](https://s2.loli.net/2022/10/29/mO4n1gaHAG2Dq5u.png)



**4、列出镜像的变更历史**

```shell
docker history 镜像名

root@kuko:/etc/ssh# docker history myubuntu:1.0
IMAGE          CREATED             CREATED BY                                      SIZE      COMMENT
805c0aab3b15   About an hour ago   /bin/sh -c #(nop)  CMD ["/bin/sh" "-c" "/bin…   0B        
61ddb9acac96   About an hour ago   /bin/sh -c #(nop)  CMD ["/bin/sh" "-c" "echo…   0B        
b03f851acadd   About an hour ago   /bin/sh -c #(nop)  CMD ["/bin/sh" "-c" "echo…   0B        
cafd1560d60b   About an hour ago   /bin/sh -c #(nop)  EXPOSE 80                    0B        
d63d2612c9ad   About an hour ago   /bin/sh -c apt-get install -y net-tools         1.46MB    
8124a8b358fd   About an hour ago   /bin/sh -c apt-get update --fix-missing && a…   98.7MB    
e18a2d827245   2 hours ago         /bin/sh -c #(nop) WORKDIR /usr/local            0B        
c5fa3f5c96da   2 hours ago         /bin/sh -c #(nop)  ENV MYPATH=/usr/local        0B        
ad3343a70b79   2 hours ago         /bin/sh -c #(nop)  MAINTAINER jacky<kukoray@…   0B        
cdb68b455a14   4 days ago          /bin/sh -c #(nop)  CMD ["bash"]                 0B        
<missing>      4 days ago          /bin/sh -c #(nop) ADD file:ba96f963bbfd429a0…   77.8MB    
```





### 发布镜像

```shell
# 1、登陆dockerhub
docker login -u kukoray

# 2、将镜像发布出去
docker push kukoray/myubuntu:1.0
```

当然发布到自己的阿里云镜像或者百度云镜像都是一样的操作，看官方文档即可

<img src="https://s2.loli.net/2022/10/29/YwJzjdW2rB1ubEK.png" alt="image-20221029224137079" style="zoom:50%;" />

## docker网络

## 理解docker0

本质：docker0就是路由器

![image-20221029224657780](https://s2.loli.net/2022/10/29/weoiOl8MWnAqmVc.png)



```shell
# 这里讲一个东西
# 我们平时用 
docker run -it tomcat /bin/bash
# 其实最后的/bin/bash的意思是，在进入容器后，执行这条命令

# 同理，我们有时候可以精简我们的操作
# 例如：
docker run -it tomcat ip addr
# 就是进入tomcat容器后，展示容器的内部网络地址
```

![image-20221029230859396](https://s2.loli.net/2022/10/29/8sADG7TPunNtqZB.png)



docker中所有的网络接口都是虚拟的，虚拟的转发效率高（内网传递文件 10mb/s）