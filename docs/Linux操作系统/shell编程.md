# shell编程

## 1 sh

这里指的shell是指shell脚本编程，不是指shell 本身

Linux 的 Shell 种类众多，常见的有：

- Bourne Shell（/usr/bin/sh或/bin/sh）
- Bourne Again Shell（/bin/bash）
- C Shell（/usr/bin/csh）
- K Shell（/usr/bin/ksh）
- Shell for Root（/sbin/sh）

**我们一般常用 `sh` 或者 `bash`**

**#!/bin/sh**，它同样也可以改为 **#!/bin/bash**。

**#!** 告诉系统其后路径所指定的程序即是解释此脚本文件的 Shell 程序。



### 1.1 运行 Shell 

**1、作为可执行程序**

将上面的代码保存为 test.sh，并 cd 到相应目录：

```
chmod +x ./test.sh  #使脚本具有执行权限
./test.sh  #执行脚本
```

注意，一定要写成 **./test.sh**，而不是 **test.sh**，运行其它二进制的程序也一样，直接写 test.sh，linux 系统会去 PATH 里寻找有没有叫 test.sh 的，而只有 /bin, /sbin, /usr/bin，/usr/sbin 等在 PATH 里，你的当前目录通常不在 PATH 里，所以写成 test.sh 是会找不到命令的，要用 ./test.sh 告诉系统说，就在当前目录找。

**2、作为解释器参数**

这种运行方式是，直接运行解释器，其参数就是 shell 脚本的文件名，如：

```
/bin/sh test.sh
/bin/php test.php
```



### 1.2 编写shell

==变量名和等号之间不能有空格==

==单引号包裹的变量无法解析，双引号的可以实现解析==

```shell
#!/bin/bash
name="Shell"
url="http://c.biancheng.net/shell/"
str1=$name$url  #中间不能有空格
str2="$name $url"  #如果被双引号包围，那么中间可以有空格
str3=$name": "$url  #中间可以出现别的字符串
str4="$name: $url"  #这样写也可以
str5="${name}Script: ${url}index.html"  #这个时候需要给变量名加上大括号
```



| command | 解释                                                         | 返回                      |
| ------- | ------------------------------------------------------------ | ------------------------- |
| -d file | 检测文件是否是目录，如果是，则返回 true。                    | [ -d $file ] 返回 false。 |
| -f file | 检测文件是否是普通文件（既不是目录，也不是设备文件），如果是，则返回 true。 | [ -f $file ] 返回 true。  |
| -e file | 检测文件（包括目录）是否存在，如果是，则返回 true。          | [ -e $file ] 返回 true。  |

**判断文件是否存在**

```shell
if [ ! -e trainingandtestdata.zip ]; then
    wget --no-check-certificate http://cs.stanford.edu/people/alecmgo/trainingandtestdata.zip
fi
```

当文件夹中有同名的文件夹和文件时，可以使用`-d` 或者 `-f `  来区分



**解压zip文件**

```shell
unzip trainingandtestdata.zip
```



**变量的使用**

```shell
NAME="sent140"

cd ../utils

python3 stats.py --name $NAME

cd ../$NAME

```





**转移字符$**

| command | 解释                                                  |
| ------- | ----------------------------------------------------- |
| $#      | 传给脚本的参数个数                                    |
| $0      | 脚本本身的名字                                        |
| $1      | 传递给该shell脚本的第一个参数                         |
| $2      | 传递给该shell脚本的第二个参数                         |
| $@      | 传给脚本的所有参数的列表                              |
| $$      | 脚本运行的当前进程ID号                                |
| $?      | 显示最后命令的退出状态，0表示没有错误，其他表示有错误 |

建立脚本peng.sh如下：

```bash
#/bin/bash
total=$[ $1 * $2 + $3 ]
echo "$1 * $2 + $3 = $total"
123
```

运行如下：

```bash
./peng.sh 4 5 6
```



```shell
#!/bin/sh
echo "参数个数:$#"
echo "脚本名字:$0"
echo "参数1:$1"
echo "参数2:$2"
echo "所有参数列表:$@"
echo "pid:$$"
if [ $1 = 100 ]
then
     echo "命令退出状态：$?" 
     exit 0 #参数正确，退出状态为0
else
     echo "命令退出状态：$?"
     exit 1 #参数错误，退出状态1
fi
```

<img src="https://img-blog.csdnimg.cn/37e37dd76e0f42eb8e7c4c0bb3aab3cd.png" alt="img" style="zoom:50%;" />





## pushd 和 popd

`cd -` 可以回到之前切换过来的目录



pushd  xx/xx/xx

切换到该路径，并将该路径压到栈顶

![image-20221206132733541](https://s2.loli.net/2022/12/06/e8thfQpuMF7PETH.png)

`popd`

删除栈顶的路径，并切换到此时的栈顶路径

![image-20221206132928346](https://s2.loli.net/2022/12/06/KwO2B3iAEPqlzuX.png)

`pushd +3` 切换到栈目录中下标为3的路径，并将该路径置到栈顶，后面的路径也跟随放到栈顶

![image-20221206133129690](https://s2.loli.net/2022/12/06/X7OdwETfbACBWQF.png)



**通常用法**

```shell
# Check that GloVe embeddings are available; else, download them
pushd models/sent140
 if [ ! -f glove.6B.300d.txt ]; then
  ./get_embs.sh
 fi
popd
```







## 接受用户变量

read -p '请输入需要创建的文件路径：'   filePath





```shell
$@ 和 $* 都表示传递给函数或脚本的所有参数
当 $* 和 $@ 不被双引号" "包围时，它们之间没有任何区别，都是将接收到的每个参数看做一份数据，彼此之间以空格来分隔。
但是当它们被双引号" "包含时，就会有区别了：
"$*"会将所有的参数从整体上看做一份数据，而不是把每个参数都看做一份数据。
"$@"仍然将每个参数都看作一份数据，彼此之间是独立的。
```

