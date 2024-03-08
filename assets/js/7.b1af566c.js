(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{433:function(t,a,s){"use strict";s.r(a);var e=s(65),v=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"linux手册"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#linux手册"}},[t._v("#")]),t._v(" Linux手册")]),t._v(" "),s("img",{staticStyle:{zoom:"67%"},attrs:{src:"https://s2.loli.net/2022/10/05/oWHpsFDQIgZTCk2.png",alt:"截图"}}),t._v(" "),s("p",[t._v("/bin：该目录是存放linux中最经常使用的命令")]),t._v(" "),s("p",[t._v("/sbin：存放的是管理员使用的系统管理程序（相当于Super bin）")]),t._v(" "),s("p",[t._v("/etc：存放所有的系统管理所需要的配置文件和子目录")]),t._v(" "),s("p",[t._v("/home：存放用户")]),t._v(" "),s("p",[t._v("/lib：存放系统最基本的动态链接共享库，类似于windows下的DDL")]),t._v(" "),s("p",[t._v("/opt：给主机额外安装软件所摆放的目录，比如安装oracle数据库就可以放在这个文件夹中，默认是空的")]),t._v(" "),s("p",[t._v("/root：管理员主目录")]),t._v(" "),s("p",[t._v("/tmp：存放临时文件")]),t._v(" "),s("p",[t._v("/usr：用户的很多应用程序和文件都放在这个目录下，类似于windows下的program files。这个目录包含用户程序和数据。它包含许多子目录，如 "),s("code",[t._v("/usr/bin")]),t._v("（非必需的可执行文件）、"),s("code",[t._v("/usr/sbin")]),t._v("（非必需的系统可执行文件）、"),s("code",[t._v("/usr/local")]),t._v("（本地安装的软件）等。")]),t._v(" "),s("p",[t._v("/proc：进程，linux运行时的进程")]),t._v(" "),s("p",[t._v("/root ：root用户的家目录")]),t._v(" "),s("p",[t._v("ls -a全部文件 -l详细数据  -rt 按时间排序  -sh 显示文件的占用空间")]),t._v(" "),s("p",[t._v("nl 显示的时候输出行号")]),t._v(" "),s("p",[t._v("more 文件名   ctrl+f 下一屏  ctrl+b 上一屏  enter下一行")]),t._v(" "),s("p",[t._v("less 文件名 比more好用")]),t._v(" "),s("p",[t._v("head 看头几行")]),t._v(" "),s("p",[t._v("tail 看后几行  tail -f")]),t._v(" "),s("p",[t._v("cat 从第一行开始输出")]),t._v(" "),s("p",[t._v("tac 从最后一行开始输出")]),t._v(" "),s("p",[t._v("echo  $PATH 输出到控制台")]),t._v(" "),s("p",[t._v('echo   "SDADADADA"   > hello.txt  写覆盖')]),t._v(" "),s("p",[t._v('echo   "SDADADADA"   >> hello.txt  写追加')]),t._v(" "),s("p",[t._v("df -h 磁盘空间 查看（-h以更好的 可读性）df  -sh 文件夹内容之和的大小")]),t._v(" "),s("p",[t._v("free 查看内存使用情况  free -m ； free -g ； free -h；")]),t._v(" "),s("p",[t._v("ssh的配置，比如更改默认连接时间、更改端口号")]),t._v(" "),s("p",[t._v("配置文件的地址在：/etc/ssh/sshd_config")]),t._v(" "),s("h2",{attrs:{id:"ubuntu"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ubuntu"}},[t._v("#")]),t._v(" Ubuntu")]),t._v(" "),s("p",[t._v("/etc/profile 系统环境变量")]),t._v(" "),s("p",[t._v("/etc下需要root权限")]),t._v(" "),s("p",[t._v("/etc/profile.d 里可以写自己的脚本文件.sh 开机自启动 系统全局！")]),t._v(" "),s("img",{staticStyle:{zoom:"50%"},attrs:{src:"https://s2.loli.net/2022/10/05/wSGenzgsvaAx18H.png",alt:"截图"}}),t._v(" "),s("p",[t._v("/home/jacky/.profile 用户环境变量")]),t._v(" "),s("h2",{attrs:{id:"apt-和-apt-get的区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#apt-和-apt-get的区别"}},[t._v("#")]),t._v(" apt 和 apt-get的区别")]),t._v(" "),s("p",[t._v("apt的镜像源的配置地址是在  "),s("code",[t._v("/etc/apt/sources.list")]),t._v(" 这个文件中")]),t._v(" "),s("p",[t._v("如果需要换镜像源的话，最好先把原先的镜像源进行一个备份")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("cp")]),t._v(" /etc/apt/sources.list /etc/apt/sources.list.bak\n")])])]),s("p",[t._v("换种说法来说，就是最常用的 Linux 包管理命令都被分散在了 apt-get、apt-cache 和 apt-config 这三条命令当中。")]),t._v(" "),s("p",[t._v("apt 命令的引入就是为了解决命令过于分散的问题，它包括了 apt-get 命令出现以来使用最广泛的功能选项，以及 apt-cache 和 apt-config 命令中很少用到的功能。")]),t._v(" "),s("p",[t._v("在使用 apt 命令时，用户不必再由 apt-get 转到 apt-cache 或 apt-config，而且 apt 更加结构化，并为用户提供了管理软件包所需的必要选项。")]),t._v(" "),s("blockquote",[s("p",[s("strong",[t._v("简单来说就是：apt = apt-get、apt-cache 和 apt-config 中最常用命令选项的集合。")])])]),t._v(" "),s("img",{staticStyle:{zoom:"67%"},attrs:{src:"https://s2.loli.net/2022/10/05/mBp9Ag8VvcNToWr.png",alt:"截图"}}),t._v(" "),s("img",{staticStyle:{zoom:"67%"},attrs:{src:"https://s2.loli.net/2022/10/05/ex7bGOnT5rJDZPa.png",alt:"截图"}}),t._v(" "),s("h2",{attrs:{id:"常用命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#常用命令"}},[t._v("#")]),t._v(" 常用命令")]),t._v(" "),s("h3",{attrs:{id:"screen"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#screen"}},[t._v("#")]),t._v(" screen")]),t._v(" "),s("p",[t._v("当然screen也可以用nohup来代替")]),t._v(" "),s("p",[t._v("screen -S demo   创建")]),t._v(" "),s("p",[t._v("screen -ls")]),t._v(" "),s("p",[t._v("screen -r demo 进入")]),t._v(" "),s("p",[t._v("^D 结束会话")]),t._v(" "),s("p",[t._v("^AD退出会话")]),t._v(" "),s("h3",{attrs:{id:"npm"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#npm"}},[t._v("#")]),t._v(" npm")]),t._v(" "),s("p",[t._v("npm常用命令")]),t._v(" "),s("p",[t._v("npm -v")]),t._v(" "),s("p",[t._v("node -v")]),t._v(" "),s("p",[t._v("npm run docs:dev")]),t._v(" "),s("p",[t._v("npm install")]),t._v(" "),s("p",[t._v("hash -r  刷新配置文件")]),t._v(" "),s("h3",{attrs:{id:"干掉占用端口的程序"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#干掉占用端口的程序"}},[t._v("#")]),t._v(" 干掉占用端口的程序")]),t._v(" "),s("p",[t._v("fuser -k 80/tcp")]),t._v(" "),s("h3",{attrs:{id:"生成rsa密钥"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#生成rsa密钥"}},[t._v("#")]),t._v(" 生成rsa密钥")]),t._v(" "),s("p",[t._v("在 /root/.ssh/做")]),t._v(" "),s("p",[t._v("ssh-keygen -t rsa")]),t._v(" "),s("p",[t._v("把windows下的pub公钥 放到 连接服务器linux 的authorized_keys")]),t._v(" "),s("h3",{attrs:{id:"firewall"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#firewall"}},[t._v("#")]),t._v(" firewall")]),t._v(" "),s("blockquote",[s("p",[t._v("端口的开放步骤：")]),t._v(" "),s("ol",[s("li",[t._v("先检查云服务器的安全组")]),t._v(" "),s("li",[t._v("再检查防火墙端口")]),t._v(" "),s("li",[t._v("再检查服务的配置文件")])])]),t._v(" "),s("p",[t._v("linux 防火墙  开放端口")]),t._v(" "),s("p",[t._v("https://blog.csdn.net/weixin_43871182/article/details/104788143")]),t._v(" "),s("p",[t._v("systemctl status firewalld 查看防火墙状态")]),t._v(" "),s("p",[t._v("我们开启Linux服务器防火墙状态，命令为：systemctl start firewalld")]),t._v(" "),s("p",[t._v("我们停止Linux服务器防火墙状态，命令为：systemctl stop firewalld")]),t._v(" "),s("p",[t._v("我们查询Linux服务器防火墙所有开放端口，命令为：firewall-cmd --list-ports")]),t._v(" "),s("p",[t._v("我们重启Linux服务器防火墙，命令为：firewall-cmd --reload")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("firewall-cmd --state "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("##查看防火墙状态，是否是running")]),t._v("\nfirewall-cmd --reload "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("##重新载入配置，比如添加规则之后，需要执行此命令")]),t._v("\nfirewall-cmd --get-zones "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("##列出支持的zone")]),t._v("\nfirewall-cmd --get-services "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("##列出支持的服务，在列表中的服务是放行的")]),t._v("\nfirewall-cmd --query-service "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ftp")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("##查看ftp服务是否支持，返回yes或者no")]),t._v("\nfirewall-cmd --add-service"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("ftp "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("##临时开放ftp服务")]),t._v("\nfirewall-cmd --add-service"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("ftp --permanent "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("##永久开放ftp服务")]),t._v("\nfirewall-cmd --remove-service"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("ftp --permanent "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("##永久移除ftp服务")]),t._v("\nfirewall-cmd --add-port"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),t._v("/tcp --permanent "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("##永久添加80端口")]),t._v("\nfirewall-cmd --remove-port"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),t._v("/tcp --permanent "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("##永久移除80端口")]),t._v("\nfirewall-cmd --zone"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("public --list-ports "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("##查看已开放的端口")]),t._v("\n（当有docker时，有些命令加上--zone"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("public会更好）\n\n")])])]),s("h3",{attrs:{id:"scp"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#scp"}},[t._v("#")]),t._v(" scp")]),t._v(" "),s("p",[t._v("从一台服务器传到另外一台")]),t._v(" "),s("p",[t._v("送过去：")]),t._v(" "),s("p",[t._v("scp -r /work_space root@120.48.33.220:/    传文件 -r")]),t._v(" "),s("p",[t._v("scp /work_space/blog_update.py root@120.48.33.220:/    传文件")]),t._v(" "),s("p",[t._v("取过来：")]),t._v(" "),s("p",[t._v("scp root@8.130.23.72:/work_space/young_learn.py /home/jacky/")]),t._v(" "),s("p",[t._v("/etc/passwd - 使 用 者 帐 号 资 讯，可以查看用户信息")]),t._v(" "),s("h3",{attrs:{id:"fg"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#fg"}},[t._v("#")]),t._v(" fg")]),t._v(" "),s("p",[t._v("对于后台stopped的进程，重新进入使用  fg [数字]")]),t._v(" "),s("p",[t._v("例如："),s("code",[t._v("fg 1")])]),t._v(" "),s("h3",{attrs:{id:"查找文件目录"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#查找文件目录"}},[t._v("#")]),t._v(" 查找文件目录")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("在指定的文件夹中查找指定的文件\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("find")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v(" -name "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"*.java"')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("find")]),t._v(" /root -name "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"*.txt"')]),t._v("\n\n在指定文件中查找指定的文本内容\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("grep")]),t._v(" hello helloworld.java\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("grep")]),t._v(" hello *.java\n\ntree 可以看到目录的属性结构\ntree -L "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v("  展开三级\n")])])]),s("h3",{attrs:{id:"搜索进程、杀死进程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#搜索进程、杀死进程"}},[t._v("#")]),t._v(" 搜索进程、杀死进程")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ps")]),t._v(" -ef "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("grep")]),t._v(" java\n查看运行的进程号\n")])])]),s("p",[t._v("后台运行一个web程序")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("nohup")]),t._v(" java -jar helloworld-1.0-SNAPSHOT.jar "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("hellow.log "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("\n")])])]),s("p",[t._v("结束的话，得用kill -9 来杀掉启动的进程")]),t._v(" "),s("ul",[s("li",[t._v("&")])]),t._v(" "),s("p",[t._v("指在后台运行，但当用户推出(挂起)的时候，命令自动也跟着退出。")]),t._v(" "),s("ul",[s("li",[t._v("nohup")])]),t._v(" "),s("p",[t._v("不挂断的运行，注意并没有后台运行的功能就是指，用nohup运行命令可以使命令永久的执行下去，和用户终端没有关系，例如我们断开SSH连接都不会影响他的运行，注意了nohup没有后台运行的意思；&才是后台运行。")]),t._v(" "),s("p",[s("code",[t._v("nohup COMMAND &")])]),t._v(" "),s("p",[t._v("这样就能使命令永久的在后台执行。")]),t._v(" "),s("p",[t._v("操作系统中有三个常用的流：\n　　0：标准输入流 stdin\n　　1：标准输出流 stdout\n　　2：标准错误流 stderr")]),t._v(" "),s("blockquote",[s("p",[t._v("示例用法1：nohup ./start-dishi.sh >output 2>&1 &")]),t._v(" "),s("p",[t._v("解释：")]),t._v(" "),s("ol",[s("li",[t._v("带&的命令行，即使terminal（终端）关闭，或者电脑死机程序依然运行（前提是你把程序递交到服务器上)；")]),t._v(" "),s("li",[t._v("2>&1的意思")]),t._v(" "),s("li",[t._v(">output是 1>output的简写")])]),t._v(" "),s("p",[t._v("这个意思是把标准错误（2）重定向到标准输出中（1），而标准输出又导入文件output里面，所以结果是标准错误和标准输出都导入文件output里面了。 至于为什么需要将标准错误重定向到标准输出的原因，那就归结为标准错误没有缓冲区，而stdout有。这就会导致 >output 2>output 文件output被两次打开，而stdout和stderr将会竞争覆盖，这肯定不是我门想要的. 这就是为什么有人会写成： nohup ./command.sh >output 2>output出错的原因了 。")])]),t._v(" "),s("h3",{attrs:{id:"环境变量配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#环境变量配置"}},[t._v("#")]),t._v(" 环境变量配置")]),t._v(" "),s("p",[t._v("环境变量脚本文件的执行顺序如下：")]),t._v(" "),s("p",[t._v("/etc/profile->/etc/profile.d->/etc/bashrc->用户的.bash_profile->用户的.bashrc")]),t._v(" "),s("p",[t._v("关系和区别总结：")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("/etc/profile")]),t._v(" 和 "),s("code",[t._v("/etc/profile.d")]),t._v(" 是全局登录脚本配置，适用于所有用户。")]),t._v(" "),s("li",[s("code",[t._v("/etc/bashrc")]),t._v(" 是全局非登录 shell 配置，适用于所有用户。")]),t._v(" "),s("li",[t._v("用户的 "),s("code",[t._v(".bash_profile")]),t._v(" 或 "),s("code",[t._v(".profile")]),t._v(" 是用户特定的登录脚本配置。")]),t._v(" "),s("li",[t._v("用户的 "),s("code",[t._v(".bashrc")]),t._v(" 是用户特定的非登录 shell 配置。")]),t._v(" "),s("li",[t._v("通常，全局配置文件在用户特定配置文件之前执行。这样，用户特定配置文件中的设置可以覆盖全局设置。")])]),t._v(" "),s("p",[s("a",{attrs:{href:"https://blog.csdn.net/qq_41962968/article/details/122152904",target:"_blank",rel:"noopener noreferrer"}},[t._v("Linux环境变量"),s("OutboundLink")],1)]),t._v(" "),s("p",[t._v("添加环境变量")]),t._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("PATH")])]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("$PATH")]),t._v(":/home/jacky\n")])])]),s("h3",{attrs:{id:"文件无法删除"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#文件无法删除"}},[t._v("#")]),t._v(" 文件无法删除")]),t._v(" "),s("p",[t._v("1.检查一下是否有文件的root权限  chmod")]),t._v(" "),s("p",[t._v("2.lsattr 查看属性  有i 有a 删除不了")]),t._v(" "),s("p",[t._v("3.chattr -i XXX.txt  移除权限 +i是增加权限")]),t._v(" "),s("h3",{attrs:{id:"端口映射"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#端口映射"}},[t._v("#")]),t._v(" 端口映射")]),t._v(" "),s("p",[t._v("远程连接 "),s("code",[t._v("ssh -p 22 user@1.2.3.4")])]),t._v(" "),s("p",[t._v("端口映射："),s("code",[t._v("ssh -p 22 user@1.2.3.4 -L 127.0.0.1:12123:127.0.0.1:5003")])]),t._v(" "),s("ul",[s("li",[t._v("作用：将远程服务器1.2.3.4的5003端口，映射到本地的12123端口，并且服务器那边不需要开防火墙端口")]),t._v(" "),s("li",[t._v("不过一般好像直接可以用浏览器访问，如果不行，那么上面这条命令肯定可以！")])]),t._v(" "),s("p",[t._v("端口映射二：在电脑C上，通过公网服务器A，访问局域网服务器B")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("ssh")]),t._v(" -P "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("22")]),t._v(" root@1.2.3.4 -L "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("127.0")]),t._v(".0.1:13389:10.0.0.102:3389\n\t\t  【服务器A】       【本机C】        【服务器B】\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#通过 1.2.3.4 的 ssh 用户 root，将 10.0.0.102服务器的 3389 端口映射到本地的13389端口，从而实现，通过127.0.0.1：13389连接远程win server")]),t._v("\n")])])]),s("h2",{attrs:{id:"linux系统运维"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#linux系统运维"}},[t._v("#")]),t._v(" Linux系统运维")]),t._v(" "),s("p",[t._v("运行模式，也叫做"),s("strong",[t._v("运行级别")])]),t._v(" "),s("p",[t._v("在linux中，存在一个进程：init（是所有孤儿节点的父进程），进程id为1")]),t._v(" "),s("p",[t._v("该进程存在一个对应的配置文件：inittab（系统运行级别配置文件，在/etc/inittab）")]),t._v(" "),s("p",[t._v("ps：在ubuntu中，inittab软件包已经被 "),s("a",{attrs:{href:"http://upstart.ubuntu.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("upstart"),s("OutboundLink")],1),t._v("软件包替换了，所有的配置信息都在/etc/init.d")]),t._v(" "),s("h3",{attrs:{id:"crontab"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#crontab"}},[t._v("#")]),t._v(" crontab")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("# Example of job definition:\n# .---------------- minute (0 - 59)\n# |  .------------- hour (0 - 23)\n# |  |  .---------- day of month (1 - 31)\n# |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...\n# |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat\n# |  |  |  |  |\n# *  *  *  *  * user-name command to be executed\n")])])]),s("ul",[s("li",[s("p",[t._v("【系统级的】做系统级配置我们会直接配置 /etc/crontab")]),t._v(" "),s("ul",[s("li",[t._v("15 10   * * *   root    /bin/python3 /home/jacky/autoSubmit/autoSubmit.py")])])]),t._v(" "),s("li",[s("p",[t._v("【用户级的】一般还是建议大家使用 crontab -e ，这样系统也会帮着检查我们配置的脚本语法。")]),t._v(" "),s("ul",[s("li",[t._v("使用命令 crontab -e 然后直接编辑定时脚本。")]),t._v(" "),s("li",[t._v("这样执行以后，属于用户自定义的，会被写到 "),s("strong",[t._v("/var/spool/cron")]),t._v(" 目录下，生成一个和用户名一致的文件，文件内容就是我们编辑的定时脚本。")])])])]),t._v(" "),s("p",[t._v("查看是否启动cron   ： ps aux | grep cron")]),t._v(" "),s("p",[t._v("查看用户的crontab内容：crontab -l")]),t._v(" "),s("p",[t._v("编辑用户的crontab内容：crontab -e")]),t._v(" "),s("p",[t._v("关于crontab的日志，Ubuntu系统都是存在"),s("code",[t._v("/var/log/syslog")]),t._v("里")]),t._v(" "),s("h2",{attrs:{id:"系统启动过程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#系统启动过程"}},[t._v("#")]),t._v(" 系统启动过程")]),t._v(" "),s("p",[s("strong",[t._v("内核引导")])]),t._v(" "),s("p",[s("strong",[t._v("运行init")])]),t._v(" "),s("p",[t._v("linux的第一个进程，PID为1，且没有父进程；")]),t._v(" "),s("p",[t._v("配置文件：/etc/inittab")]),t._v(" "),s("p",[s("strong",[t._v("运行级别")])]),t._v(" "),s("p",[s("strong",[t._v("系统初始化")])]),t._v(" "),s("h2",{attrs:{id:"用户操作"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#用户操作"}},[t._v("#")]),t._v(" 用户操作")]),t._v(" "),s("p",[t._v("usermod -s  /sbin/nologin jacky")]),t._v(" "),s("p",[t._v("指定jacky用户的默认的shell解释器，/sbin/nologin 所以jacky用户就会无法登陆到操作系统")]),t._v(" "),s("p",[t._v("一般用户的shell解释器都是/bin/bash")])])}),[],!1,null,null,null);a.default=v.exports}}]);