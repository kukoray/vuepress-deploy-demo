# javaWeb



## json接口数据请求

```java
    public JSONObject getJson(String path) throws Exception {

        // 保存整个html文档的数据
        StringBuffer html = new StringBuffer();

        // 发起一个url网址的请求
        URL url = new URL(path);
        URLConnection connection = url.openConnection();

        // 设置请求头
        connection.addRequestProperty("Accept", "application/json");

        // 获取网页的数据流
        InputStream input = connection.getInputStream();
        InputStreamReader reader = new InputStreamReader(input, "utf-8");
        BufferedReader bufferedReader = new BufferedReader(reader);

        // 解析并且获取InputStream中具体的数据，并且输出到控制台
        String line = "";
        while ((line = bufferedReader.readLine()) != null) {
            html.append(line);
        }

//        return new String(html.toString().getBytes("UTF-8"), "UTF-8");

        return JSON.parseObject(unicodeDecode(html.toString()));
    }



```





## unicode转码

    public String unicodeDecode(String string) {
        Pattern pattern = Pattern.compile("(\\\\u(\\p{XDigit}{4}))");
        Matcher matcher = pattern.matcher(string);
        char ch;
        while (matcher.find()) {
            ch = (char) Integer.parseInt(matcher.group(2), 16);
            string = string.replace(matcher.group(1), ch + "");
        }
        return string;
    }




![image-20221014105110462](https://s2.loli.net/2022/10/14/CLrvFPzEXxQRt8p.png)





## Cookie，Session，Token

三者都是为了解决http请求时，身份验证的方式

**1、Cookie**

cookie像是一种载体，用于http请求之间的传输

> 用户登陆，会发送http请求
>
> 服务器那边接受到请求后，验证身份成功后，会在浏览器这边 设置cookie
>
> 之后浏览器的每次请求都会带上，这个cookie发送

![image-20221101170810696](https://s2.loli.net/2022/11/01/FrivpIzKfqLUlyN.png)

**2、session**

session其实是一种利用了cookie来传输，间接隐藏了cookie内的信息的一种方式

但是这里的session Id诞生于服务器，并且存在服务器这边的，浏览器那边cookie只是一个副本

> 同样，用户会发送http请求
>
> 服务器验证成功后，会根据用户的信息，生成一个session Id 来表示这个用户
>
> 并将该session Id 存入 浏览器的cookie中
>
> 浏览器的之后的每次请求都会带上这个session Id
>
> 结束会话时，会删除服务器中的session id，cookie也会随着时间的流逝而消失

![image-20221101171331407](https://s2.loli.net/2022/11/01/aw8WSDrMI7OKYCc.png)



**3、token**

token是运用了一种`JWT` 的技术

> token诞生与服务器，但是保存在浏览器那边（可以放在cookie和storage里面）
>
> 但是服务器要保存密码

身份验证方式

> 那就对数据做一个签名吧， 比如说我用HMAC-SHA256 算法，加上一个只有我才知道的密钥，  对数据做一个签名， 把这个签名和数据一起作为token ，   由于密钥别人不知道， 就无法伪造token了。
>
> 这个token 我不保存，当小F把这个token 给我发过来的时候，我再用同样的HMAC-SHA256 算法，对数据再计算一次签名（解密），将本地保存的签名 和token 中的解密出来的签名做个比较， 如果相同， 我就知道小F已经登录过了，并且可以直接取到小F的user id ,  如果不相同， 数据部分肯定被人篡改过， 我就告诉发送者： 对不起，没有认证。



![image-20221101171512895](https://s2.loli.net/2022/11/01/As4BvgLtnPMyEdH.png)

![image-20221101171744020](https://s2.loli.net/2022/11/01/5OcGWIReS2rug3i.png)

## SpringBoot常用注解



@RequestParam 和 @RequestBody

@RequestParam 用于处理 Content-Type 为 application/x-www-form-urlencoded 编码的内容

@RequestBody用于处理非 Content-Type: application/x-www-form-urlencoded编码格式的数据，比如：application/json、application/xml等类型的数据。







## 读写分离

从库：查询任务

主库：增删改

使用Sharding-JDBC框架

可以理解为增强版的JDBC框架，完全兼容JDBC和各种ORM框架

```xml
        <dependency>
            <groupId>org.apache.shardingsphere</groupId>
            <artifactId>sharding-jdbc-spring-boot-starter</artifactId>
            <version>4.0.0-RC1</version>
        </dependency>
```

```yml
spring:
  application:
    #应用的名称，可选
    name: reggie_take_out
  shardingsphere:
    datasource:
      names:
        master,slave
      # 主数据源
      master:
        type: com.alibaba.druid.pool.DruidDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://192.168.138.100:3306/reggie?characterEncoding=utf-8
        username: root
        password: root
      # 从数据源
      slave:
        type: com.alibaba.druid.pool.DruidDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://192.168.138.101:3306/reggie?characterEncoding=utf-8
        username: root
        password: root
    masterslave:
      # 读写分离配置,从库的负载均衡策略
      load-balance-algorithm-type: round_robin #轮询
      # 最终的数据源名称
      name: dataSource
      # 主库数据源名称
      master-data-source-name: master
      # 从库数据源名称列表，多个逗号分隔
      slave-data-source-names: slave
    props:
      sql:
        show: true #开启SQL显示，默认false
  main:
    allow-bean-definition-overriding: true
    # 允许bean定义覆盖
```

java代码不需要发生任何改变，可以自动完成读写分离





## Swagger

使用knife4j框架，底层是集成了swagger的操作

```xml
        <dependency>
            <groupId>com.github.xiaoymin</groupId>
            <artifactId>knife4j-spring-boot-starter</artifactId>
            <version>3.0.2</version>
        </dependency>
```



```java
@Slf4j
@Configuration
<-------------------------
@EnableSwagger2
@EnableKnife4j
------------------------->
public class WebMvcConfig extends WebMvcConfigurationSupport {


    /**
     * 设置静态资源映射
     * @param registry
     */
    @Override
    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
        log.info("启动静态资源映射...");
<-------------------------
        registry.addResourceHandler("doc.html").addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
------------------------->
        registry.addResourceHandler("/backend/**").addResourceLocations("classpath:/backend/");
        registry.addResourceHandler("/front/**").addResourceLocations("classpath:/front/");

    }

<-------------------------
    @Bean
    public Docket createRestApi() {
        // 文档类型
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.jacky.reggie.controller"))
                .paths(PathSelectors.any())
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("瑞吉外卖")
                .version("1.0")
                .description("瑞吉外卖接口文档")
                .build();
    }
------------------------->
}

```



如果有过滤器，需要在过滤器里在配置一下

```java
String[] urls = new String[]{
        "/backend/**",
        "/employee/login",
        "/employee/logout",
        "/front/**",
        "/common/**",
        "/user/sendMsg",
        "/user/login",
<-------------------------
        "/doc.html",
        "/webjars/**",
        "/swagger-resources",
        "/v2/api-docs"
------------------------->
};
```





Swagger常用注解

会让接口文档的可读性更好

| 注解               | 说明                                                     |
| ------------------ | -------------------------------------------------------- |
| @Api               | 用在请求的类上，Controller，表示对类的说明               |
| @ApiModel          | 用在类上，通常是实体类，表示一个返回相应数据的信息       |
| @ApiModelProperty  | 用在属性上，描述响应类的属性                             |
| @ApiOperation      | 用在请求方法上，说明方法的用途                           |
| @ApiImplicitParams | 用在请求的方法上，表示一组参数的说明                     |
| @ApiImplicitParam  | 用在@ApiImplicitParams注解中，指定一个请求参数的各个方面 |





## 注解

注解的本质是**接口**，在字节码层面，jvm会将注解编译成接口；给注解增加属性，本质是在接口中定义了抽象方法

### 元注解

**@Documented | @Retention | @Target | @Inherited**

分别解释下

@Documented

> 代表着此注解会被javadoc工具提取成文档

@Retention：

> 代表该注解的有效期
> `SOURCE` 表示编译期，如@Override，只做编译时的提示，不会写入字节码中。
> `CLASS`表示类加载期，会保存在class文件中，但在运行class文件被丢弃，也是默认值
> `RUNTIME` 表示运行期，也是最常用的，可以在代码运行时进行反射执行相关的操作
>
> RUNTIME > CLASS > SOURCE
>
> 大多数情况我们都是使用RUNTIME

@Target：

> 表示这个注解可以放在哪
> `TYPE`：接口、类、枚举、注解
> `FIELD`：字段、枚举的常量
> `METHOD`：方法
> `PARAMETER`：参数
> `CONSTRUCTOR`：构造函数
> `LOCAL_VARIABLE`：局部变量
> `ANNOTATION_TYPE`：注解
> `PACKAGE`：包

@Inherited：

> 表示子类可以继承该类的注解

### 自定义注解

```java
package com.hfut.plus.common.annoation;

import java.lang.annotation.*;

@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface RequireAdmin {
    //注解的参数：参数类型+参数名();
    String value(); //使用value可以在使用注解声明时，不写value这个属性，否则要写；
}
```

注解三板斧：1、创建注解 2、使用注解 3、读取注解

读取注解：反射机制，我们可以通过反射机制实现对这些元数据的一个访问





## 反射机制

reflection是java实现**动态语言**的关键，反射机制允许程序在执行过程中借助于Reflection API来实现取得任何类的内部信息，并能直接操作任意对象的内部属性及方法。



<img src="https://s2.loli.net/2022/10/22/xDEXs9UQGSmMHRa.png" alt="image-20221022100216734" style="zoom:67%;" />

但是反射是比较耗时的

```java
public class Test {
    public static void main(String[] args) throws ClassNotFoundException {

        Person person = new Student();
        System.out.println(person.name);
--------------------------------------------------------------------------------
        Class c1 = person.getClass();

        Class c2 = Class.forName("com.reflection.Student");

        Class c3 = Student.class;

        Class superclass = c1.getSuperclass();
--------------------------------------------------------------------------------
    }
}

class Person{
    String name;
    public Person() {
    }
}

class Student extends Person{
    public Student() {
        this.name = "学生";
    }
}


class Teacher extends Person{
    public Teacher() {
        this.name = "老师";
    }
}
```



## 开发常识

 **开发环境（dev)**：开发环境是程序猿们专门用于开发的服务器，配置可以比较随意，为了开发调试方便，一般打开全部错误报告。

 **测试环境 (test)**：一般是克隆一份生产环境的配置，一个程序在测试环境工作不正常，那么肯定不能把它发布到生产机上。

 **灰度环境（pre）**：灰度环境，外部用户可以访问，但是服务器配置相对低，其它和生产一样。 <很多企业将test环境作为Pre环境 >

 **生产环境（prod）**：是值正式提供对外服务的，一般会关掉错误报告，打开错误日志。