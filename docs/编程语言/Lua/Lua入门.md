# Lua入门

> 参考博客：
> 
> [Lua 教程 | 菜鸟教程](https://www.runoob.com/lua/lua-tutorial.html)

## 概念

Lua 是一种轻量小巧的脚本语言，用标准C语言编写并以源代码形式开放。

设计目的是为了嵌入应用程序中，从而为应用程序提供灵活的扩展和定制功能。

## 特性

- **轻量级**: 它用标准C语言编写并以源代码形式开放，编译后仅仅一百余K，可以很方便的嵌入别的程序里。
- **可扩展**: Lua提供了非常易于使用的扩展接口和机制：由宿主语言(通常是C或C++)提供这些功能，Lua可以使用它们，就像是本来就内置的功能一样。
- **其它特性**:
  - 支持面向过程(procedure-oriented)编程和函数式编程(functional programming)；
  - 自动内存管理；只提供了一种通用类型的表（table），用它可以实现数组，哈希表，集合，对象；
  - 语言内置模式匹配；闭包(closure)**；函数也可以看做一个值**；提供多线程（**协程**，协同进程，并非操作系统所支持的线程）支持；
  - 通过闭包和table可以很方便地支持面向对象编程所需要的一些关键机制，比如数据抽象，虚函数，继承和重载等。

## 应用场景

- 游戏开发
- 独立应用脚本
- Web 应用脚本
- 扩展和数据库插件如：MySQL Proxy 和 MySQL WorkBench
- 安全系统，如入侵检测系统

## 安装

ubuntu

```shell
curl -R -O http://www.lua.org/ftp/lua-5.4.4.tar.gz
tar zxf lua-5.4.4.tar.gz
cd lua-5.4.4
make all test
make install
```

```shell
root@VM-4-9-ubuntu:/opt/lua/lua-5.4.4# lua
Lua 5.4.4  Copyright (C) 1994-2022 Lua.org, PUC-Rio
> print('hello world')
hello world
```

## 数据类型

Lua 是动态类型语言，变量不要类型定义,只需要为变量赋值。 值可以存储在变量中，作为参数传递或结果返回。

Lua 中有 8 个基本类型分别为：nil、boolean、number、string、userdata、function、thread 和 table。

| 数据类型     | 描述                                                                                                                    |
| -------- | --------------------------------------------------------------------------------------------------------------------- |
| nil      | 这个最简单，只有值nil属于该类，表示一个无效值（在条件表达式中相当于false）。                                                                            |
| boolean  | 包含两个值：false和true。                                                                                                     |
| number   | 表示双精度类型的实浮点数                                                                                                          |
| string   | 字符串由一对双引号或单引号来表示                                                                                                      |
| function | 由 C 或 Lua 编写的函数                                                                                                       |
| userdata | 表示任意存储在变量中的C数据结构                                                                                                      |
| thread   | 表示执行的独立线路，用于执行协同程序                                                                                                    |
| table    | Lua 中的表（table）其实是一个"关联数组"（associative arrays），数组的索引可以是数字、字符串或表类型。在 Lua 里，table 的创建是通过"构造表达式"来完成，最简单构造表达式是{}，用来创建一个空表。 |

## 基本语法

**1、循环**

```lua
while( true )
do
   print("循环将永远执行下去")
end
```

**2、流程控制**

> 注意elseif 和 else if是有区别的。
> 
> 前者是我们熟悉的elseif分支；
> 
> 后者是：
> 
> ```lua
> else
>     if
> ```

```lua
if(布尔表达式 1) then
    --[ 布尔表达式 1 为 true 时执行该语句块 --]
elseif (布尔表达式 2) then
    --[ 布尔表达式 2 为 true 时执行该语句块 --]
else
    -- [前两者都不满足时执行该语句块]
end
```

**3、函数**

```lua
function max(num1, num2)

   if (num1 > num2) then
      result = num1;
   else
      result = num2;
   end

   return result;
end
```
