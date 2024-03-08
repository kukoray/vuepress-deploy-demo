# Linux手册

<img src="https://s2.loli.net/2022/10/05/oWHpsFDQIgZTCk2.png" alt="截图" style="zoom:67%;" />



/bin：该目录是存放linux中最经常使用的命令

/sbin：存放的是管理员使用的系统管理程序（相当于Super bin）

/etc：存放所有的系统管理所需要的配置文件和子目录

/home：存放用户

/lib：存放系统最基本的动态链接共享库，类似于windows下的DDL

/opt：给主机额外安装软件所摆放的目录，比如安装oracle数据库就可以放在这个文件夹中，默认是空的

/root：管理员主目录

/tmp：存放临时文件

/usr：用户的很多应用程序和文件都放在这个目录下，类似于windows下的program files。这个目录包含用户程序和数据。它包含许多子目录，如 `/usr/bin`（非必需的可执行文件）、`/usr/sbin`（非必需的系统可执行文件）、`/usr/local`（本地安装的软件）等。

/proc：进程，linux运行时的进程

/root ：root用户的家目录





ls -a全部文件 -l详细数据  -rt 按时间排序  -sh 显示文件的占用空间

nl 显示的时候输出行号

more 文件名   ctrl+f 下一屏  ctrl+b 上一屏  enter下一行

less 文件名 比more好用

head 看头几行

tail 看后几行  tail -f

cat 从第一行开始输出

tac 从最后一行开始输出

echo  $PATH 输出到控制台

echo   "SDADADADA"   > hello.txt  写覆盖

echo   "SDADADADA"   >> hello.txt  写追加





df -h 磁盘空间 查看（-h以更好的 可读性）df  -sh 文件夹内容之和的大小

free 查看内存使用情况  free -m ； free -g ； free -h；



ssh的配置，比如更改默认连接时间、更改端口号

配置文件的地址在：/etc/ssh/sshd_config  





## Ubuntu

/etc/profile 系统环境变量

/etc下需要root权限

/etc/profile.d 里可以写自己的脚本文件.sh 开机自启动 系统全局！

<img src="https://s2.loli.net/2022/10/05/wSGenzgsvaAx18H.png" alt="截图" style="zoom:50%;" />

/home/jacky/.profile 用户环境变量







## apt 和 apt-get的区别



apt的镜像源的配置地址是在  `/etc/apt/sources.list` 这个文件中

如果需要换镜像源的话，最好先把原先的镜像源进行一个备份

```shell
cp /etc/apt/sources.list /etc/apt/sources.list.bak
```





换种说法来说，就是最常用的 Linux 包管理命令都被分散在了 apt-get、apt-cache 和 apt-config 这三条命令当中。

apt 命令的引入就是为了解决命令过于分散的问题，它包括了 apt-get 命令出现以来使用最广泛的功能选项，以及 apt-cache 和 apt-config 命令中很少用到的功能。

在使用 apt 命令时，用户不必再由 apt-get 转到 apt-cache 或 apt-config，而且 apt 更加结构化，并为用户提供了管理软件包所需的必要选项。

> **简单来说就是：apt = apt-get、apt-cache 和 apt-config 中最常用命令选项的集合。**



<img src="https://s2.loli.net/2022/10/05/mBp9Ag8VvcNToWr.png" alt="截图" style="zoom:67%;" />

<img src="https://s2.loli.net/2022/10/05/ex7bGOnT5rJDZPa.png" alt="截图" style="zoom:67%;" />





## 常用命令



### screen

当然screen也可以用nohup来代替

screen -S demo   创建

screen -ls

screen -r demo 进入

^D 结束会话

^AD退出会话









### npm

npm常用命令

npm -v

node -v

npm run docs:dev

npm install

hash -r  刷新配置文件





### 干掉占用端口的程序

fuser -k 80/tcp



### 生成rsa密钥

在 /root/.ssh/做

ssh-keygen -t rsa

把windows下的pub公钥 放到 连接服务器linux 的authorized_keys





### firewall

> 端口的开放步骤：
>
> 1. 先检查云服务器的安全组
> 2. 再检查防火墙端口
> 3. 再检查服务的配置文件

linux 防火墙  开放端口  

https://blog.csdn.net/weixin_43871182/article/details/104788143

systemctl status firewalld 查看防火墙状态

我们开启Linux服务器防火墙状态，命令为：systemctl start firewalld

我们停止Linux服务器防火墙状态，命令为：systemctl stop firewalld

我们查询Linux服务器防火墙所有开放端口，命令为：firewall-cmd --list-ports

我们重启Linux服务器防火墙，命令为：firewall-cmd --reload

```shell
firewall-cmd --state ##查看防火墙状态，是否是running
firewall-cmd --reload ##重新载入配置，比如添加规则之后，需要执行此命令
firewall-cmd --get-zones ##列出支持的zone
firewall-cmd --get-services ##列出支持的服务，在列表中的服务是放行的
firewall-cmd --query-service ftp ##查看ftp服务是否支持，返回yes或者no
firewall-cmd --add-service=ftp ##临时开放ftp服务
firewall-cmd --add-service=ftp --permanent ##永久开放ftp服务
firewall-cmd --remove-service=ftp --permanent ##永久移除ftp服务
firewall-cmd --add-port=80/tcp --permanent ##永久添加80端口
firewall-cmd --remove-port=80/tcp --permanent ##永久移除80端口
firewall-cmd --zone=public --list-ports ##查看已开放的端口
（当有docker时，有些命令加上--zone=public会更好）

```



### scp

从一台服务器传到另外一台

送过去：

scp -r /work_space root@120.48.33.220:/    传文件 -r

scp /work_space/blog_update.py root@120.48.33.220:/    传文件

取过来：

scp root@8.130.23.72:/work_space/young_learn.py /home/jacky/



/etc/passwd - 使 用 者 帐 号 资 讯，可以查看用户信息





### fg

对于后台stopped的进程，重新进入使用  fg [数字]

例如：`fg 1`





### 查找文件目录

```shell
在指定的文件夹中查找指定的文件
find . -name "*.java"
find /root -name "*.txt"

在指定文件中查找指定的文本内容
grep hello helloworld.java
grep hello *.java

tree 可以看到目录的属性结构
tree -L 3  展开三级
```





### 搜索进程、杀死进程

```shell
ps -ef | grep java
查看运行的进程号
```

后台运行一个web程序

```shell
nohup java -jar helloworld-1.0-SNAPSHOT.jar >hellow.log &
```

结束的话，得用kill -9 来杀掉启动的进程

- &

指在后台运行，但当用户推出(挂起)的时候，命令自动也跟着退出。

- nohup

不挂断的运行，注意并没有后台运行的功能就是指，用nohup运行命令可以使命令永久的执行下去，和用户终端没有关系，例如我们断开SSH连接都不会影响他的运行，注意了nohup没有后台运行的意思；&才是后台运行。

`nohup COMMAND &`

这样就能使命令永久的在后台执行。

操作系统中有三个常用的流：
　　0：标准输入流 stdin
　　1：标准输出流 stdout
　　2：标准错误流 stderr

> 示例用法1：nohup ./start-dishi.sh >output 2>&1 &
>
> 解释：
> 1. 带&的命令行，即使terminal（终端）关闭，或者电脑死机程序依然运行（前提是你把程序递交到服务器上)； 
> 2. 2>&1的意思
> 3. \>output是 1>output的简写
>
> 　　这个意思是把标准错误（2）重定向到标准输出中（1），而标准输出又导入文件output里面，所以结果是标准错误和标准输出都导入文件output里面了。 至于为什么需要将标准错误重定向到标准输出的原因，那就归结为标准错误没有缓冲区，而stdout有。这就会导致 >output 2>output 文件output被两次打开，而stdout和stderr将会竞争覆盖，这肯定不是我门想要的. 这就是为什么有人会写成： nohup ./command.sh >output 2>output出错的原因了 。
> 

### 环境变量配置

环境变量脚本文件的执行顺序如下：

/etc/profile->/etc/profile.d->/etc/bashrc->用户的.bash_profile->用户的.bashrc

关系和区别总结：

- `/etc/profile` 和 `/etc/profile.d` 是全局登录脚本配置，适用于所有用户。
- `/etc/bashrc` 是全局非登录 shell 配置，适用于所有用户。
- 用户的 `.bash_profile` 或 `.profile` 是用户特定的登录脚本配置。
- 用户的 `.bashrc` 是用户特定的非登录 shell 配置。
- 通常，全局配置文件在用户特定配置文件之前执行。这样，用户特定配置文件中的设置可以覆盖全局设置。

[Linux环境变量](https://blog.csdn.net/qq_41962968/article/details/122152904)

添加环境变量

```sh
export PATH=$PATH:/home/jacky
```







### 文件无法删除 

1.检查一下是否有文件的root权限  chmod

2.lsattr 查看属性  有i 有a 删除不了

3.chattr -i XXX.txt  移除权限 +i是增加权限





### 端口映射

远程连接 `ssh -p 22 user@1.2.3.4`

端口映射：`ssh -p 22 user@1.2.3.4 -L 127.0.0.1:12123:127.0.0.1:5003`

- 作用：将远程服务器1.2.3.4的5003端口，映射到本地的12123端口，并且服务器那边不需要开防火墙端口
- 不过一般好像直接可以用浏览器访问，如果不行，那么上面这条命令肯定可以！

端口映射二：在电脑C上，通过公网服务器A，访问局域网服务器B

```shell
ssh -P 22 root@1.2.3.4 -L 127.0.0.1:13389:10.0.0.102:3389
		  【服务器A】       【本机C】        【服务器B】
#通过 1.2.3.4 的 ssh 用户 root，将 10.0.0.102服务器的 3389 端口映射到本地的13389端口，从而实现，通过127.0.0.1：13389连接远程win server
```



## Linux系统运维



运行模式，也叫做**运行级别**

在linux中，存在一个进程：init（是所有孤儿节点的父进程），进程id为1

该进程存在一个对应的配置文件：inittab（系统运行级别配置文件，在/etc/inittab）

ps：在ubuntu中，inittab软件包已经被 [upstart](http://upstart.ubuntu.com/)软件包替换了，所有的配置信息都在/etc/init.d







### crontab

```
# Example of job definition:
# .---------------- minute (0 - 59)
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
# |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
# |  |  |  |  |
# *  *  *  *  * user-name command to be executed
```

- 【系统级的】做系统级配置我们会直接配置 /etc/crontab
    - 15 10   * * *   root    /bin/python3 /home/jacky/autoSubmit/autoSubmit.py

- 【用户级的】一般还是建议大家使用 crontab -e ，这样系统也会帮着检查我们配置的脚本语法。
    - 使用命令 crontab -e 然后直接编辑定时脚本。
    - 这样执行以后，属于用户自定义的，会被写到 **/var/spool/cron** 目录下，生成一个和用户名一致的文件，文件内容就是我们编辑的定时脚本。

查看是否启动cron   ： ps aux | grep cron

查看用户的crontab内容：crontab -l

编辑用户的crontab内容：crontab -e



关于crontab的日志，Ubuntu系统都是存在`/var/log/syslog`里





## 系统启动过程

**内核引导**



**运行init**

linux的第一个进程，PID为1，且没有父进程；

配置文件：/etc/inittab





**运行级别**



**系统初始化**







## 用户操作

usermod -s  /sbin/nologin jacky

指定jacky用户的默认的shell解释器，/sbin/nologin 所以jacky用户就会无法登陆到操作系统

一般用户的shell解释器都是/bin/bash

