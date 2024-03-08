# Redis入门



# 简介

Redis是一个开源的内存中的数据结构存储系统，它可以用作︰数据库、缓存和消息中间件。

官网: https://redis.io

Redis是用C语言开发的一个开源的高性能键值对(**key-value**)数据库

它存储的value类型比较丰富，也被称为结构化的NoSql数据库。（非关系型数据库，NoSql数据库并不是要取代关系型数据库，而是关系数据库的补充）

另外redis为用户默认提供了16个数据库，当然这个值可以在配置文件中修改

> 总结：
>
> redis的三个特点：
>
> 1、基于内存
>
> 2、Key-Value结构
>
> 3、NoSql



## 启动命令

Linux下

```shell
在redis的文件目录下，我的是在/usr/local/redis-7.0.5

在该目录下，有几个比较重要的文件，一个是redis.conf 这是redis启动的配置文件，当然启动时需要显式加载配置
还有一个比较重要的文件夹是src文件夹，在该文件夹下有几个重要的启动命令，redis-server，和redis-cli

在redis-7.0.5文件目录下
启动命令
src/redis-server
src/redis-server redis.conf   //加载配置启动，可以在配置里配置后台启动
nohup src/redis-server &> redis.log &

启动客户端
src/redis-cli
src/redis -h 120.48.33.220 -p 6379 -a [password]

关闭服务端
127.0.0.1:6379>shutdown

关闭客户端
127.0.0.1:6379>exit
```





## 数据类型

Redis支持五种数据类型：string（字符串），hash（哈希），list（列表），set（集合）及zset(sorted set：有序集合)。

### String

string 是 redis 最基本的类型，你可以理解成与 Memcached 一模一样的类型，一个 key 对应一个 value。

string 类型是二进制安全的。意思是 redis 的 string 可以包含任何数据。比如jpg图片或者序列化的对象。

string 类型是 Redis 最基本的数据类型，string 类型的值最大能存储 512MB。

```shell
redis 127.0.0.1:6379> SET runoob "菜鸟教程"
OK
redis 127.0.0.1:6379> GET runoob
"菜鸟教程"
```

在以上实例中我们使用了 Redis 的 **SET** 和 **GET** 命令。键为 runoob，对应的值为 **菜鸟教程**。

**注意：**一个键最大能存储 512MB。

------

### Hash

Redis hash 是一个键值(key=>value)对集合。

Redis hash 是一个 string 类型的 field 和 value 的映射表，hash 特别适合用于存储对象。

**DEL runoob** 用于删除前面测试用过的 key，不然会报错：**(error) WRONGTYPE Operation against a key holding the wrong kind of value**

![img](https://s2.loli.net/2022/10/19/qpnXutdrbVOol9g.jpg)

```shell
redis 127.0.0.1:6379> DEL runoob
redis 127.0.0.1:6379> HMSET runoob field1 "Hello" field2 "World"
"OK"
redis 127.0.0.1:6379> HGET runoob field1
"Hello"
redis 127.0.0.1:6379> HGET runoob field2
"World"
```

实例中我们使用了 Redis **HMSET, HGET** 命令，**HMSET** 设置了两个 **field=>value** 对, HGET 获取对应 **field** 对应的 **value**。

每个 hash 可以存储 232 -1 键值对（40多亿）。



------

### List

Redis 列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）。

```shell
redis 127.0.0.1:6379> DEL runoob
redis 127.0.0.1:6379> lpush runoob redis
(integer) 1
redis 127.0.0.1:6379> lpush runoob mongodb
(integer) 2
redis 127.0.0.1:6379> lpush runoob rabbitmq
(integer) 3
redis 127.0.0.1:6379> lrange runoob 0 10
1) "rabbitmq"
2) "mongodb"
3) "redis"
redis 127.0.0.1:6379>
```

列表最多可存储 232 - 1 元素 (4294967295, 每个列表可存储40多亿)。

------

### Set

Redis 的 Set 是 string 类型的无序集合。

集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。

sadd 命令：添加一个 string 元素到 key 对应的 set 集合中，成功返回 1，如果元素已经在集合中返回 0。

```shell
sadd key member
```

```shell
redis 127.0.0.1:6379> DEL runoob
redis 127.0.0.1:6379> sadd runoob redis
(integer) 1
redis 127.0.0.1:6379> sadd runoob mongodb
(integer) 1
redis 127.0.0.1:6379> sadd runoob rabbitmq
(integer) 1
redis 127.0.0.1:6379> sadd runoob rabbitmq
(integer) 0
redis 127.0.0.1:6379> smembers runoob

1) "redis"
2) "rabbitmq"
3) "mongodb"
```

**注意：**以上实例中 rabbitmq 添加了两次，但根据集合内元素的唯一性，第二次插入的元素将被忽略。

集合中最大的成员数为 232 - 1(4294967295, 每个集合可存储40多亿个成员)。

------

### zset

Redis zset 和 set 一样也是string类型元素的集合,且不允许重复的成员。

不同的是每个元素都会关联一个double类型的分数。redis正是通过分数来为集合中的成员进行从小到大的排序。

zset的成员是唯一的,但分数(score)却可以重复。

zadd 命令：添加元素到集合，元素在集合中存在则更新对应score

```shell
zadd key score member 
```

```shell
redis 127.0.0.1:6379> DEL runoob
redis 127.0.0.1:6379> zadd runoob 0 redis
(integer) 1
redis 127.0.0.1:6379> zadd runoob 0 mongodb
(integer) 1
redis 127.0.0.1:6379> zadd runoob 0 rabbitmq
(integer) 1
redis 127.0.0.1:6379> zadd runoob 0 rabbitmq
(integer) 0
redis 127.0.0.1:6379> ZRANGEBYSCORE runoob 0 1000
1) "mongodb"
2) "rabbitmq"
3) "redis"
```

### 常用命令

```shell
KEYS pattern
EXISTS key
TYPE key
TTL key
DEL key
```





## Jedis

```xml
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>2.8.0</version>
</dependency>
```



```java
public class Testdemo {

    @Test
    public void testRedis(){
//        1.获取连接
        Jedis jedis = new Jedis("localhost",6379);
//        2.执行具体操作
        jedis.set("username","xiaoming");
        String username = jedis.get("username");

        jedis.del("username");
//        3.关闭连接
        jedis.close();
    }

}
```



## SpringDataRedis

导入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```



配置文件

```xml
redis:
    host: 172.17.2.94
    port: 6379
    password: root@123456
    database: 0
```



```java
public class SpringDataRedisTest {

    @Autowired
    private RedisTemplate redisTemplate;
    //这个是redis为Spring高度封装的一个类

    /**
     * 操作String类型数据
     */
    @Test
    public void testString(){
        redisTemplate.opsForValue().set("city123","beijing");

        String value = (String) redisTemplate.opsForValue().get("city123");
        System.out.println(value);

        redisTemplate.opsForValue().set("key1","value1",10l, TimeUnit.SECONDS);

        Boolean aBoolean = redisTemplate.opsForValue().setIfAbsent("city1234", "nanjing");
        System.out.println(aBoolean);
    }

    /**
     * 操作Hash类型数据
     */
    @Test
    public void testHash(){
        HashOperations hashOperations = redisTemplate.opsForHash();

        //存值
        hashOperations.put("002","name","xiaoming");
        hashOperations.put("002","age","20");
        hashOperations.put("002","address","bj");

        //取值
        String age = (String) hashOperations.get("002", "age");
        System.out.println(age);

        //获得hash结构中的所有字段
        Set keys = hashOperations.keys("002");
        for (Object key : keys) {
            System.out.println(key);
        }

        //获得hash结构中的所有值
        List values = hashOperations.values("002");
        for (Object value : values) {
            System.out.println(value);
        }
    }

    /**
     * 操作List类型的数据
     */
    @Test
    public void testList(){
        ListOperations listOperations = redisTemplate.opsForList();

        //存值
        listOperations.leftPush("mylist","a");
        listOperations.leftPushAll("mylist","b","c","d");

        //取值
        List<String> mylist = listOperations.range("mylist", 0, -1);
        for (String value : mylist) {
            System.out.println(value);
        }

        //获得列表长度 llen
        Long size = listOperations.size("mylist");
        int lSize = size.intValue();
        for (int i = 0; i < lSize; i++) {
            //出队列
            String element = (String) listOperations.rightPop("mylist");
            System.out.println(element);
        }
    }

    /**
     * 操作Set类型的数据
     */
    @Test
    public void testSet(){
        SetOperations setOperations = redisTemplate.opsForSet();

        //存值
        setOperations.add("myset","a","b","c","a");

        //取值
        Set<String> myset = setOperations.members("myset");
        for (String o : myset) {
            System.out.println(o);
        }

        //删除成员
        setOperations.remove("myset","a","b");

        //取值
        myset = setOperations.members("myset");
        for (String o : myset) {
            System.out.println(o);
        }

    }

    /**
     * 操作ZSet类型的数据
     */
    @Test
    public void testZset(){
        ZSetOperations zSetOperations = redisTemplate.opsForZSet();

        //存值
        zSetOperations.add("myZset","a",10.0);
        zSetOperations.add("myZset","b",11.0);
        zSetOperations.add("myZset","c",12.0);
        zSetOperations.add("myZset","a",13.0);

        //取值
        Set<String> myZset = zSetOperations.range("myZset", 0, -1);
        for (String s : myZset) {
            System.out.println(s);
        }

        //修改分数
        zSetOperations.incrementScore("myZset","b",20.0);

        //取值
        myZset = zSetOperations.range("myZset", 0, -1);
        for (String s : myZset) {
            System.out.println(s);
        }

        //删除成员
        zSetOperations.remove("myZset","a","b");

        //取值
        myZset = zSetOperations.range("myZset", 0, -1);
        for (String s : myZset) {
            System.out.println(s);
        }
    }

    /**
     * 通用操作，针对不同的数据类型都可以操作
     */
    @Test
    public void testCommon(){
        //获取Redis中所有的key
        Set<String> keys = redisTemplate.keys("*");
        for (String key : keys) {
            System.out.println(key);
        }

        //判断某个key是否存在
        Boolean itcast = redisTemplate.hasKey("itcast");
        System.out.println(itcast);

        //删除指定key
        redisTemplate.delete("myZset");

        //获取指定key对应的value的数据类型
        DataType dataType = redisTemplate.type("myset");
        System.out.println(dataType.name());

    }
}

```



redis序列化配置

```java

/**
 * Redis配置类
 */

@Configuration
public class RedisConfig extends CachingConfigurerSupport {

    @Bean
    public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory connectionFactory) {

        RedisTemplate<Object, Object> redisTemplate = new RedisTemplate<>();

        //默认的Key序列化器为：JdkSerializationRedisSerializer
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashKeySerializer(new StringRedisSerializer());

        redisTemplate.setConnectionFactory(connectionFactory);

        return redisTemplate;
    }

}

```





## 缓存优化



在Spring-Context这个包内提供了api

SpringCache注解

```java
@EnableCaching   开启缓存注解功能，一般放在启动类上
@Cacheable 放在方法上面，在方法执行之前spring查看缓存中是否有数据，如果有数据的话，那就直接返回数据；如果没有数据那就将方法返回值放到缓存中
@CachePut  将方法的返回值放到缓存中
@CacheEvict  将一条或多条数据从缓存中删除
```



SpringCache支持多种缓存产品，redis也是其中一种；

至于具体SpringCache使用的是哪一种缓存产品，具体得根据pom.xml里加载的是哪个缓存产品；**针对不同的缓存产品，需要去实现不同的CacheManager**

如果说没有配置缓存产品，默认使用的是java内存，也及时说java程序终止时，缓存数据也同时被清空

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
```



```java
@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {

    @Autowired
    private CacheManager cacheManager;

    @Autowired
    private UserService userService;

    /**
     * CachePut：将方法返回值放入缓存
     * value：缓存的名称，每个缓存名称下面可以有多个key
     * key：缓存的key
     */
    @CachePut(value = "userCache",key = "#user.id")
    @PostMapping
    public User save(User user){
        userService.save(user);
        return user;
    }

    /**
     * CacheEvict：清理指定缓存
     * value：缓存的名称，每个缓存名称下面可以有多个key
     * key：缓存的key
     */
    @CacheEvict(value = "userCache",key = "#p0")
    //@CacheEvict(value = "userCache",key = "#root.args[0]")
    //@CacheEvict(value = "userCache",key = "#id")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        userService.removeById(id);
    }

    //@CacheEvict(value = "userCache",key = "#p0.id")
    //@CacheEvict(value = "userCache",key = "#user.id")
    //@CacheEvict(value = "userCache",key = "#root.args[0].id")
    @CacheEvict(value = "userCache",key = "#result.id")
    @PutMapping
    public User update(User user){
        userService.updateById(user);
        return user;
    }

    /**
     * Cacheable：在方法执行前spring先查看缓存中是否有数据，如果有数据，则直接返回缓存数据；若没有数据，调用方法并将方法返回值放到缓存中
     * value：缓存的名称，每个缓存名称下面可以有多个key
     * key：缓存的key
     * condition：条件，满足条件时才缓存数据
     * unless：满足条件则不缓存
     */
    @Cacheable(value = "userCache",key = "#id",unless = "#result == null")
    @GetMapping("/{id}")
    public User getById(@PathVariable Long id){
        User user = userService.getById(id);
        return user;
    }

    @Cacheable(value = "userCache",key = "#user.id + '_' + #user.name")
    @GetMapping("/list")
    public List<User> list(User user){
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(user.getId() != null,User::getId,user.getId());
        queryWrapper.eq(user.getName() != null,User::getName,user.getName());
        List<User> list = userService.list(queryWrapper);
        return list;
    }
}

```



缓存击穿访问热点数据key，缓存穿透访问不存在的key

还有就是存入缓存的对象，需要实现序列化接口，不然是无法缓存成功的；比如result返回类就需要实现序列化接口





## redis备份与恢复

启动redis-cli，并且登陆auth

执行命令save或者bgsave

即可生成redis的备份文件，将备份文件放到指定目录，重启即可重新恢复备份的文件