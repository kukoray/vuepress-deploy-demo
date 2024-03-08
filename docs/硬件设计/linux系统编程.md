# linux系统编程



## c语言编译过程



![preview](https://s2.loli.net/2022/09/19/jX4QsTJ1iVgCfYF.jpg)

- hello.i 预处理器产生的文件     gcc -E hello.c -o hello.i
- hello.s 编译器编译后产生的文件     gcc -S hello.i -o hello.s
- hello.o 汇编程序翻译后的目标文件   gcc -c hello.s -o hello.o
- hello.exe 可执行文件(Linux系统会产生hello.out文件)    gcc hello.o -o a.out

![img](https://s2.loli.net/2022/09/19/wXaI7vfEgmpehUB.jpg)



文件IO和标准IO

文件IO：直接调用内核所提供的系统调用函数





静态库和动态库

静态库在a.out中也会占用内存空间，调用库函数的速度快，和代码区自己写的函数调用速度一致；

静态库：对空间要求较低，时间要求较高的核心程序中。

动态库是共享库，只占用一份内存。调用库函数的速度慢

动态库：对时间要求较低，对空间要求较高



## 静态库制作与使用 

静态库名字以lib开头，以.a结尾

例如：libmylib.a



静态库制作及使用步骤：

​	1. 将 .c 生成 .o 文件

​		gcc -c add.c -o add.o

​	2. 使用 ar 工具制作静态库

​		ar rcs  lib库名.a  add.o sub.o div.o

​	3. 编译静态库到可执行文件中：

​		gcc test.c lib库名.a -o a.out





-rw-r--r--

0123456798

0代表文件类型

123代表所有者读写执行权限     rwx：读写执行

456代表同组用户读写执行权限

789代表其他人读写执行权限







## MakeFile



1 个规则：
目标：依赖条件
	（一个tab缩进）命令

```makefile
hello:hello.c
	gcc hello.c -o hello
```

src = $(wildcard *.c)
匹配当前工作用户下的所有.c文件。将文件名组成列表，赋值给变量src。
找到当前目录下所有后缀为.c的文件，赋值给src

obj = \$(patsubset \*.c,\*.o, $(src))
将参数3中，包含参数1的部分，替换成参数2
把src变量里所有后缀为.c的文件替换成.o

加了clean部分
模拟执行clean部分

![img](https://s2.loli.net/2022/09/17/QYpLWwjEfdnND2T.png)

rm前面的-，代表出错依然执行。
删除不存在文件不加这-，就会报错，告诉你有一个文件找不到。加了-就不会因为这个报错。

由于没有文件变动，a.out的时间戳晚于所有依赖文件，这里make就没干活
于是，执行时加新指令，先模拟执行clean部分





3个自动变量
\$@ ：在规则命令中，表示规则中的**目标**
\$< ：在规则命令中，表示规则中的**第一个条件**，<u>如果将该变量用在模式规则中，它可以将依赖条件列表中的依赖依次取出，套用模式规则</u>
$^ ：在规则命令中，表示规则中的**所有条件**，组成一个列表，以空格隔开，如果这个列表中有重复项，则去重

```makefile
a.out:test.c add.c sub.c mutiply.c
	gcc $^ -o $@
```

模式规则

```makefile
# 模式匹配
%.o:%.c
	gcc -c $< -o $@
```



静态模式规则

继续优化makefile，使用静态模式规则，就是指定模式规则给谁用，这里指定模式规则给obj用，以后文件多了，文件集合会有很多个，就需要指定哪个文件集合用什么规则

```makefile
$(obj):%.o:%.c
	gcc -c $< -o $@
```



伪目标

再来一个扩展
当前文件夹下有ALL文件或者clean文件时，会导致makefile瘫痪，如下所示，make clean没有工作
用**伪目标**来解决，添加一行   

```makefile
.PHONY: clean ALL
```





还有一个扩展就是，编译时的参数，-g,-Wall, ... 这些，可以放在makefile里面

![img](https://s2.loli.net/2022/09/17/Y4k7xdtghrW2noc.png)





## 文件IO



系统调用：内核提供的函数（内核，操作系统中的核心代码。直接和硬件打交道，内核主要的东西就是驱动）





