# Lua应用之Redis

> 参考博客：
> 
> [一网打尽Redis Lua脚本并发原子组合操作-51CTO.COM](https://www.51cto.com/article/628941.html)

## 前言

我们知道Redis的单个命令是原子性的。

但是Redis的事务不保证原子性，因此我们希望能够组合多个Redis命令，让其变成一个原子性操作。

在Redis2.6版本引入了一个特性来解决这个问题，就是支持执行Lua脚本

> redis脚本在实践中不要使用全局变量，局部变量效率更高

## Redis中的Lua

**1、eval命令**

> 注意KEYS要大写否则无法识别

```shell
127.0.0.1:6379 > set lock 1 nx ex 100
OK
127.0.0.1:6379 > ttl lock
(integer) 49
127.0.0.1:6379 > eval "return redis.call('del',KEYS[1])" 1 lock
(integer) 1
127.0.0.1:6379 > ttl lock
(integer) -2
```

**2、call和pcall**

```shell
127.0.0.1:6379 > EVAL "return redis.call('no_command')" 0 
(error) ERR Error running script (call to f_1e6efd00ab50dd564a9f13e5775e27b966c2141e): @user_script:1: @user_script: 1: Unknown Redis command called from Lua script 
127.0.0.1:6379 > EVAL "return redis.pcall('no_command')" 0 
(error) @user_script: 1: Unknown Redis command called from Lua script 
```

这就像 Java 遇到一个异常，前者会直接抛出一个异常;后者会把异常处理成 JSON 返回。

**3、值转换**

由于在 Redis 中存在 Redis 和 Lua 两种不同的运行环境，在 Redis 和 Lua 互相传递数据时必然发生对应的转换操作，这种转换操作是我们在实践中不能忽略的。

例如如果 Lua 脚本向 Redis 返回小数，那么会损失小数精度。

因此转换为字符串则是安全的。

```shell
127.0.0.1:6379 > EVAL "return 3.14" 0 
(integer) 3 
127.0.0.1:6379 > EVAL "return tostring(3.14)" 0 
"3.14" 
```

**4、原子执行**

Lua 脚本在 Redis 中是以原子方式执行的，在 Redis 服务器执行EVAL命令时，在命令执行完毕并向调用者返回结果之前，只会执行当前命令指定的 Lua 脚本包含的所有逻辑，其它客户端发送的命令将被阻塞，直到EVAL命令执行完毕为止。

**因此 LUA 脚本不宜编写一些过于复杂了逻辑，必须尽量保证 Lua 脚本的效率，否则会影响其它客户端。**

**5、脚本管理**

- script load
  
  加载脚本到缓存以达到重复使用，避免多次加载浪费带宽，每一个脚本都会通过 SHA 校验返回唯一字符串标识。需要配合EVALSHA命令来执行缓存后的脚本。
  
  ```shell
  127.0.0.1:6379 > SCRIPT LOAD "return 'hello'" 
  "1b936e3fe509bcbc9cd0664897bbe8fd0cac101b" 
  127.0.0.1:6379 > EVALSHA 1b936e3fe509bcbc9cd0664897bbe8fd0cac101b 0 
  "hello" 
  ```

- script flush
  
  既然有缓存就有清除缓存，但是遗憾的是<mark>并没有根据 SHA 来删除脚本缓存</mark>，而是清除所有的脚本缓存，所以在生产中一般不会再生产过程中使用该命令。

- script exists
  
  以 SHA 标识为参数检查一个或者多个缓存是否存在。
  
  ```shell
  127.0.0.1:6379 > SCRIPT EXISTS 1b936e3fe509bcbc9cd0664897bbe8fd0cac101b  1b936e3fe509bcbc9cd0664897bbe8fd0cac1012 
  1) (integer) 1 
  2) (integer) 0 
  ```

- script kill
  
  终止正在执行的脚本。但是为了数据的完整性此命令并不能保证一定能终止成功。如果当一个脚本执行了一部分写的逻辑而需要被终止时，该命令是不凑效的。需要执行SHUTDOWN nosave在不对数据执行持久化的情况下终止服务器来完成终止脚本。

## 注意点

- 务必对 Lua 脚本进行全面测试以保证其逻辑的健壮性，**当 Lua 脚本遇到异常时，已经执行过的逻辑是不会回滚的。**
- **尽量不使用 Lua 提供的具有随机性的函数，参见相关官方文档。**
- 在 Lua 脚本中不要编写function函数,整个脚本作为一个函数的函数体。
- 在脚本编写中声明的变量**全部使用local关键字**。
- 在集群中使用 Lua 脚本要确保逻辑中所有的key分到相同机器，也就是同一个插槽(slot)中，可采用**Redis Hash Tag技术。**
- 再次重申 Lua 脚本一定不要包含过于耗时、过于复杂的逻辑。
