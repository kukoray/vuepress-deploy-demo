# Spring

## 1、spring

### 1.1、简介

spring理念：使现有的技术更加容易使用，同时他是一个大杂烩，整合了现有的技术框架！

SSM：SpringMVC + Spring + Mybatis

### 1.2、优点

最大重点：控制反转（IOC），面对切面编程（AOP）

三大核心思想：DI（依赖注入）、IOC（控制反转）、AOP（面向切面编程）

总结一句话：Spring就是一个轻量级的控制反转、面向切面编程的框架

## 2、IOC控制反转

### 2.1、理论基础

IOC的意思是控制反转，反转的其实是控制的主动权！

> 这是一种思想，下面我将用自己的话来描述。
>
> 程序一般都是写完之后，主动的按照我们写的逻辑去创建对象，控制权在我们程序员手里。
>
> 但是用户会有不同的需求！
>
> 我们可以使用set的方法，将这个程序的主动性交给用户，程序从主动创建对象变成被动创建对象

**从主动的创建对象，到被动的接收对象**

所谓IOC，就是对象有spring来创建，管理，装配！

bean就是IOC容器初始化、装配及管理的对象

### 2.2、IOC创建对象

![image-20221109122623939](https://s2.loli.net/2022/11/09/bhGPQlEc8mj3JnX.png)

①Hello实体类代码

```java
public class Hello {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void show(){
        System.out.println("Hello,"+ name );
    }

}
```

②beans.xml代码（这个文件名叫什么都行，官方是叫做applicationContext.xml）

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">


    <!--bean就是java对象 , 由Spring创建和管理-->
    这里创建对象的默认方式是调用类的无参构造，要是没有无参构造（只显示的定义了有参构造），那么就会创建失败
    <bean id="hello" class="com.jacky.pojo.Hello">
        <property name="name" value="Spring"/>
        <!--这里spring设置对象属性的本质其实是调用了他的set方法-->
    </bean>

</beans>
```

③test测试类

```java
public class myTest {
    public static void main(String[] args) {

        //这一步很关键，获取applicationContext：拿到spring的容器
        //还有这里的beans.xml配置文件，如果有多个，一定要选主配置文件（在主配置文件中import其他的配置文件），当然这里也可以同时加载多个配置文件
        ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");
        //容器在手，天下我有，需要什么，get什么
        Hello hello = (Hello) context.getBean("hello");

        hello.show();
    }
}
```

**结论：在配置文件加载的时候。其中管理的对象都已经初始化了！**



### 2.3、bean的多种创建对象方式

- 通过无参构造方法来创建（默认）

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">

    <bean id="hello" class="com.jacky.pojo.Hello">
        <property name="name" value="Spring"/>
    </bean>

</beans>

```

- 通过有参构造方法来创建

其中第三种采用类型创建的方式并不推荐

![image-20221109134509382](https://s2.loli.net/2022/11/09/JGkKd4ypnRUfQoH.png)

![image-20221109135249923](https://s2.loli.net/2022/11/09/3cr8SxpnYkB2a7U.png)





## 3、DI依赖注入

### 3.1、构造器注入

也可以理解是手动注入

```

```



### 3.2、set方式注入【重点】



### 3.3、其他方式注入





### 3.4、bean的作用域

什么是bean：在Spring中，那些组成应用程序的主体及由Spring IoC容器所管理的对象，被称之为bean。简单地讲， **bean就是由IoC容器初始化、装配及管理的对象**

<img src="https://s2.loli.net/2022/11/20/jzZp1EqILxXfSsa.png" alt="image-20221120211826193" style="zoom:67%;" />

其中request、session作用域仅在基于web的应用中使用，只能在基于在spring applicationContext的环境

1. 单例模式

    ```java
    <bean id="hello" class="com.jacky.pojo.Hello" scope="singleton">
    ```

    单例模式下所有的bean对象都是同一个

2. 原型模式

    ```java
    <bean id="hello" class="com.jacky.pojo.Hello" scope="prototype">
    ```

    原型模式下，所有的bean对象都不同
    
3. request作用域

    每一个request请求会自动创建这个对应bean实例，该实例会在request生命周期中保持存活，request销毁时失效。

    ```xml
     <bean id="loginAction" class=cn.csdn.LoginAction" scope="request"/>
    ```

4. session作用域

    每一个session会话中会产生对应的bean实例，该实例会在session生命周期中保持存活，session销毁时失效

    ```xml
    <bean id="userPreferences" class="com.foo.UserPreferences" scope="session"/>
    ```

    



## 4、Bean的自动装配

**spring中常见有三种装配方式**

- xml手动装配
- java中new对象、set属性，手动装配
- 隐式的bean发现机制和自动装配



之前讲的都是我们的xml手动装配（手动在xml里将bean的属性值设置进去）

自动装配的两个步骤、操作：

1. 组件扫描：spring会自动发现应用上下文中创建的bean
2. 自动装配：spring会自动满足bean之期的依赖关系，也就是DI



### 4.0、前提

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd">
    
        <bean id="dog" class="com.kuang.pojo.Dog"/>
        <bean id="cat" class="com.kuang.pojo.Cat"/>
        <bean id="user" class="com.kuang.pojo.User">
            <property name="cat" ref="cat"/>
            <property name="dog" ref="dog"/>
        <property name="str" value="qinjiang"/>
    </bean>
</beans>

```

```java
public class MyTest {
    @Test
    public void testMethodAutowire() {
        ApplicationContext context = new
                ClassPathXmlApplicationContext("beans.xml");
        User user = (User) context.getBean("user");
        user.getCat().shout();
        user.getDog().shout();
    }
}
```

### 4.1、byName

```xml
<bean id="user" class="com.kuang.pojo.User" autowire="byName">
	<property name="str" value="qinjiang"/>  //这样写依旧成功
</bean>
```

实现原理：

当一个bean节点带有 autowire byName的属性时

1. 将查找其类中所有的set方法名，例如setCat，获得将set去掉并且首字母小写的字符串，即cat
2. 去spring容器中寻找是否有此字符串名称id的对象
3. 如果有，就取出注入；如果没有，就报空指针异常



**所以即使xml文件里bean对象 User里的属性一点不写，那也可以完成属性的注入，他的原理是set方法**

### 4.2、byType

```xml
<bean id="dog" class="com.kuang.pojo.Dog"/>
<bean id="cat" class="com.kuang.pojo.Cat"/>
<bean id="cat2" class="com.kuang.pojo.Cat"/>
<bean id="user" class="com.kuang.pojo.User" autowire="byType">
    <property name="str" value="qinjiang"/>
</bean>
```

这里加了一个cat2类，当有两个相同的类型的bean后，会出现注入失败

去掉后即可注入成功，本质是按照他的类别来识别注入的（当然有多个类的时候，type匹配失败，可以指定id来唯一匹配）

### 4.3、使用注解



@Autowired注解优先按照类型查找bean（bytype）,找不到就报错，找到多个则按照名字，若还是找不到则报错

使用autowired注解，类可以不需要set方法

直接在属性上使用即可， 也可以在set方法上使用

[(106条消息) @Autowired注解到底是byType还是byName？_杨家昌的博客-CSDN博客](https://blog.csdn.net/yangjiachang1203/article/details/52128830)



当注入容器存在多个同一类型的对象时，就是根据byName进行装配（也可以使用Qualifier注解来指定bean对象名字来装配）

当注入在Ioc容器中该类型只有一个时，就通过byType进行装配

@resource注解是，默认按照byName去找，找不到再去按照byType去找bean对象，都找不到才报错





```xml
<?xml version="1.0" encoding="UTF-8"?>

引入context头文件
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd">

    
    开启属性注解支持！
    <context:annotation-config/>
```





## 5、使用注解开发

### 5.1、说明

spring4之后想要用注解，必须导入aop的包

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aop</artifactId>
    <version>5.1.10.RELEASE</version>
</dependency>
```



## 6、代理模式

> 代理模式的好处：
>
> - 可以使得真实角色操作更加纯粹，不需要关注一些公共的业务（代码可以横向发展）
> - 公共的业务可以交给代理角色去完成！实现业务的分工
> - 公共业务发生拓展时，方便集中管理
>
> 缺点：
>
> - 一个真实角色就会产生一个代理角色，代码量会翻倍（可以使用动态代理解决）

### 6.1、静态代理

角色分类：

- 抽象角色

    ```java
    public interface Rent {
    
        void rent();
    }
    ```

- 代理角色

    ```java
    public class Proxy implements Rent{
    
        private Host host;
    
        public Proxy(Host host) {
            this.host = host;
        }
    
        @Override
        public void rent() {
            System.out.println("i am proxy, i help host to rent this house");
            host.rent();
            System.out.println("finish this house rent");
        }
    
    
    }
    ```

- 真实角色

    ```java
    public class Host implements Rent {
        @Override
        public void rent() {
            System.out.println("I am host of the house, i want to rent this house");
        }
    }
    ```

- 客户

    ```java
    public class Client {
        public static void main(String[] args) {
    
            Host host = new Host();
    
            Proxy proxy = new Proxy(host);
            proxy.rent();
        }
    }
    ```

    

### 6.2、动态代理

**关键：动态代理，代理的是接口**

> 动态代理的好处：
>
> - 一个动态代理类代理的就是一个接口，一般是对应一类的业务
> - 一个动态代理类可以代理多个类，只要是继承同一个接口

具体实现：

- 客户角色，Client类

    ```java
    public class Client {
        public static void main(String[] args) {
            UserServiceImpl userService = new UserServiceImpl();
            ProxyInvocationHandler pih = new ProxyInvocationHandler();
            pih.setTarget(userService);
            UserService proxy = (UserService) pih.getProxy();
            proxy.rent();
        }
    }
    ```

- 代理角色，ProxyInvocationHandler（动态生成代理对象）：

    ```java
    public class ProxyInvocationHandler implements InvocationHandler {
    
        //真实角色 Host房东
        private Object target;
    
        //设置代理的对象
        public void setTarget(Object target) {
            this.target = target;
        }
    
        //创建一个代理对象(一般返回值 我们会把其类型强转为 代理对象所继承的接口)
        public Object getProxy(){
            return Proxy.newProxyInstance(this.getClass().getClassLoader(),
                    target.getClass().getInterfaces(),this);
        }
    
        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            Object result = method.invoke(target,args);
            return result;
        }
    }
    ```

- UserService接口

    ```java
    public interface UserService {
         void rent();
    }
    ```

- 接口实现类，真实角色，UserServiceImpl

    ```java
    public class UserServiceImpl implements UserService {
        @Override
        public void rent() {
            System.out.println("host rent house");
        }
    }
    ```

## 7、AOP

### 7.1、什么是AOP

AOP（Aspect Oriented Programming）意为：面向切面编程，通过预编译方式和运行期动态代理实现 程序功能的统一维护的一种技术。AOP是OOP的延续，是软件开发中的一个热点，也是Spring框架中的 一个重要内容，是函数式编程的一种衍生范型。利用AOP可以对业务逻辑的各个部分进行隔离，从而使 得业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率。

![image-20221124140548336](https://s2.loli.net/2022/11/24/LvpB4tjYlhbz79g.png)



### 7.2、实现AOP（一）

导入maven

```xml
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.9.7</version>
</dependency>
```



​	切面代码：

1. ```java
    public class AfterLog implements AfterReturningAdvice {
    
        /**
         *
         * @param returnValue 返回值
         * @param method 被调用对象的方法
         * @param args 被调用方法的参数
         * @param target 被调用的对象
         * @throws Throwable
         */
        @Override
        public void afterReturning(Object returnValue, Method method, Object[] args, Object target) throws Throwable {
            System.out.println(target.getClass().getName()+"类的"+method.getName()+"方法调用结束，返回值为"+returnVaue);
        }
    }
    ```

2. ```java
    public class Log implements MethodBeforeAdvice {
    
        /**
         *
         * @param method 被调用对象类的方法
         * @param objects 类方法所需要的参数
         * @param o 被调用的类对象
         * @throws Throwable
         */
        @Override
        public void before(Method method, Object[] objects, Object o) throws Throwable {
            System.out.println(o.getClass().getName()+"的"+method.getName()+"方法被执行了");
        }
    }
    ```

service代码

1. ```java
    public interface UserService {
    
        void add();
    
        void delete();
    
        void update();
    
        void query();
    }
    ```

2. ```java
    public class UserServiceImpl implements UserService {
        @Override
        public void add() {
            System.out.println("add");
        }
    
        @Override
        public void delete() {
            System.out.println("delete");
        }
    
        @Override
        public void update() {
            System.out.println("update");
        }
    
        @Override
        public void query() {
            System.out.println("query");
        }
    }
    ```

注册bean，让spring托管，配置XML文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop
        https://www.springframework.org/schema/aop/spring-aop.xsd">


    <bean id="beforelog" class="com.jacky.log.Log"></bean>
    <bean id="afterlog" class="com.jacky.log.AfterLog"></bean>
    <bean id="userservice" class="com.jacky.service.UserServiceImpl"></bean>

    <aop:config>
        <aop:pointcut id="pointcut" expression="execution(* com.jacky.service.UserServiceImpl.*(..))"/>
        <aop:advisor advice-ref="beforelog" pointcut-ref="pointcut"/>
        <aop:advisor advice-ref="afterlog" pointcut-ref="pointcut"/>
    </aop:config>
    
</beans>
```

测试类

```java
public class test {

    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        UserService userservice = (UserService) context.getBean("userservice");
        userservice.add();
    }
}
```

### 7.3、实现AOP（二）

第二种方法，相对来说简单，但是可操作性没有第一种强，第一种可以操作类的很多属性和方法。。

自定义切面类

```java
public class DiyPointcut {

    void before(){
        System.out.println("===================方法开始前==========================");
    }

    void after(){
        System.out.println("===================方法开始后==========================");
    }
}
```

配置xml文件

```xml
    <bean id="diy" class="com.jacky.diy.DiyPointcut"/>
<!--    方法二-->
    <aop:config>
        <aop:aspect ref="diy">
            <aop:pointcut id="pointcut" expression="execution(* com.jacky.service.UserServiceImpl.*(..))"/>
            <aop:before method="before" pointcut-ref="pointcut"/>
            <aop:after method="after" pointcut-ref="pointcut"/>
        </aop:aspect>
    </aop:config>

</beans>
```

### 7.4、实现AOP（三）

> 方式一：使用spring的API接口【主要SpringApi接口实现】
>
> 方法二：自定义来实现AOP【主要是切面定义】
>
> 方法三：使用注解实现AOP【简化方法二的写法】



自定义切面类

```java
@Aspect
public class AnnotationPointcut {

    @Before("execution(* com.jacky.service.UserServiceImpl.*(..))")
    void before(){
        System.out.println("===================方法三开始前==========================");
    }

    @After("execution(* com.jacky.service.UserServiceImpl.*(..))")
    void after(){
        System.out.println("===================方法三开始后==========================");
    }

    @Around("execution(* com.jacky.service.UserServiceImpl.*(..))")
    void around(ProceedingJoinPoint pj) throws Throwable {
        System.out.println("环绕前");
        pj.proceed();  //执行
        System.out.println("环绕后");
    }
}
```



xml配置文件

```xml
<!--    方法三-->
    <bean id="annotaionPointcut" class="com.jacky.diy.AnnotationPointcut"/>

    <aop:aspectj-autoproxy/>

</beans>
```

![image-20221124150040837](https://s2.loli.net/2022/11/24/Fm19SbKanqpRwV6.png)



> 当方法符合切点规则不符合环绕通知的规则时候，执行的顺序如下
>
> @Before→@After→@AfterRunning(如果有异常→@AfterThrowing)
>
> 当方法符合切点规则并且符合环绕通知的规则时候，执行的顺序如下
>
> @Around→@Before→@Around→@After执行 ProceedingJoinPoint.proceed() 之后的操作→@AfterRunning(如果有异常→@AfterThrowing)



## 8、整合Mybatis

### 8.1、方式一【传统】

**步骤一：导包**

```xml
<dependencies>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.13.2</version>
    </dependency>
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.5.9</version>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.29</version>
    </dependency>
    <dependency>
        <groupId>org.aspectj</groupId>
        <artifactId>aspectjweaver</artifactId>
        <version>1.9.7</version>
    </dependency>
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis-spring</artifactId>
        <version>2.0.6</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.3.20</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-jdbc</artifactId>
        <version>5.3.20</version>
    </dependency>
</dependencies>
```

**步骤二：连接数据库，写mybatis配置文件**

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
    <typeAliases>
        <package name="com.jacky.pojo"/>
    </typeAliases>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url"
                          value="jdbc:mysql://localhost:3306/jdbcstudy?useSSL=true&amp;useUnicode=true&amp;characterEncoding=utf8"/>
                <property name="username" value="root"/>
                <property name="password" value="12345qaz"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <package name="com.jacky.dao"/>
    </mappers>
</configuration>
```

**步骤三：实体类**

```java
public class User {
    private int id;
    private String name;
    private int age;
    private String sex;
```

**步骤四：mapper接口（dao层）**

```java
public interface UserMapper {
    List<User> selectUser();
}
```

以及mapper.xml

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.jacky.dao.UserMapper">
    <select id="selectUser" resultType="User">
        select * from user
    </select>
</mapper>
```

**步骤五：编写测试类**

这里需要在测试类里面完成数据库的

```java
public class test {
    public static void main(String[] args) throws IOException {

        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);

        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        SqlSession sqlSession = sqlSessionFactory.openSession();

        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        List<User> users = mapper.selectUser();
        for (User user : users) {
            System.out.println(user);
        }
    }
}
```

可能会遇到xml导不出去（无法在target中生成）

```xml
<build>
    <resources>
        <resource>
            <!-- 设定主资源目录  -->
            <directory>src/main/resources</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
        </resource>
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
            <filtering>true</filtering>
        </resource>
    </resources>
</build>
```



### 8.2、方式二【Spring】

UserMapper和UserMapper.xml都不变，增加一个UserMapper接口的实现类！并且将该实现类声明为bean对象

```java
public class UserMapperImpl implements UserMapper {

    private SqlSessionTemplate sqlSession;

    public void setSqlSession(SqlSessionTemplate sqlSession){
        this.sqlSession = sqlSession;
    }

    @Override
    public List<User> selectUser() {
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        return mapper.selectUser();
    }
}
```

**applicationContext.xml**

```xml
<import resource="spring-dao.xml"/>

<bean id="userDao" class="com.jacky.dao.UserMapperImpl">
    <property name="sqlSession" ref="sqlSession"/>
</bean>
```

**spring-dao.xml**

```xml
    <!--dataSource: 使用spring的数据源来替换mybatis配置，这里可以也可以配置其他的数据库，比如:c3p0、druid、dbcp等-->
    <bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        <property name="username" value="root"/>
        <property name="password" value="12345qaz"/>
        <property name="url"
                  value="jdbc:mysql://localhost:3306/jdbcstudy?useSSL=true&amp;useUnicode=true&amp;characterEncoding=utf8"/>
        <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"/>
    </bean>


    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <!--        dataSource 是唯一的必要属性-->
        <property name="dataSource" ref="dataSource"/>
        <!--        configLocation它用来指定 MyBatis 的 XML 配置文件路径。它在需要修改MyBatis 的基础配置非常有用-->
        <property name="configLocation" value="classpath:mybatis-config.xml"/>
        <!--        mapper具体文件定位器，原来是写在mybatis配置文件里的，
        相当于
            <mappers>
                <package name="com.jacky.dao"/>
            </mappers>
        -->
        <property name="mapperLocations" value="classpath:com/jacky/dao/*.xml"/>
    </bean>


    <bean id="sqlSession" class="org.mybatis.spring.SqlSessionTemplate">
<!--        只能使用sqlSessionFactory来注入，没有set方法-->
        <constructor-arg index="0" ref="sqlSessionFactory"/>
    </bean>

```

这里配置了mybatis的相关配置，所以可以减少mybatis-config.xml中的一些配置

**mybatis-config.xml**

```xml
<configuration>
    <typeAliases>
        <package name="com.jacky.pojo"/>
    </typeAliases>
<!--    <environments default="development">-->
<!--        <environment id="development">-->
<!--            <transactionManager type="JDBC"/>-->
<!--            <dataSource type="POOLED">-->
<!--                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>-->
<!--                <property name="url"-->
<!--                          value="jdbc:mysql://localhost:3306/jdbcstudy?useSSL=true&amp;useUnicode=true&amp;characterEncoding=utf8"/>-->
<!--                <property name="username" value="root"/>-->
<!--                <property name="password" value="12345qaz"/>-->
<!--            </dataSource>-->
<!--        </environment>-->
<!--    </environments>-->
<!--    <mappers>-->
<!--        <package name="com.jacky.dao"/>-->
<!--    </mappers>-->
</configuration>
```

**测试类**

```java
public class test02 {
    public static void main(String[] args) {

        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        UserMapper userDao = (UserMapper) context.getBean("userDao");
        List<User> users = userDao.selectUser();
        for (User user : users) {
            System.out.println(user);
        }
    }
}
```

### 8.3、方式三【方法二的简化】

![image-20221124204123637](https://s2.loli.net/2022/11/24/mC9JeUYzuSMhTdF.png)

**applicationContext.xml修改后**

```xml
<bean id="userDao" class="com.jacky.dao.UserMapperImpl">
    <property name="sqlSessionFactory" ref="sqlSessionFactory"/>
</bean>
```

![image-20221124204552532](https://s2.loli.net/2022/11/24/BoMiXu3VdsHvSeG.png)

## 9、事务管理



事务管理

- 声明式事务：AOP横切的方式实现，不影响业务代码！【推荐】
- 编程式事务：改变业务代码，用捕获异常的方式来实现事务



**【事务】transaction，一件事要么全部都完成，要么全部不完成**

事务在项目的开发十分重要，涉及到数据的一致性和完整性的问题，不能马虎！

编织事务，完全不影响原来业务的代码和执行。做一个横向的切面，即可！

![image-20221124205232783](https://s2.loli.net/2022/11/24/OjeIiqygofMG8lb.png)





```xml
    <!--    JDBC事务管理器-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>

<!--配置好事务管理器后我们需要去配置事务的通知-->
    <tx:advice id="txAdvice" transaction-manager="transactionManager">
        <tx:attributes>
            <!--配置哪些方法使用什么样的事务,配置事务的传播特性-->
            <tx:method name="add" propagation="REQUIRED"/>
            <tx:method name="delete" propagation="REQUIRED"/>
            <tx:method name="update" propagation="REQUIRED"/>
            <tx:method name="search*" propagation="REQUIRED"/>
            <tx:method name="get" read-only="true"/>
            <tx:method name="*" propagation="REQUIRED"/>
        </tx:attributes>
    </tx:advice>
```



```xml
<aop:config>
    <aop:pointcut id="txPointcut" expression="execution(* com.jacky.dao.*.*(..))"/>
    <aop:advisor advice-ref="txAdvice" pointcut-ref="txPointcut"/>
</aop:config>
```

dao层下的所有文件的所有方法都加上了事务

