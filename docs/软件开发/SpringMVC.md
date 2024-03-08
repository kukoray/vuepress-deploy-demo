# SpringMVC

## 1、什么是SpringMVC

### 1.1、概述

**Spring MVC是Spring Framework的一部分，是基于Java实现MVC的轻量级Web框架。**

springMVC的底层还是servlet，全部是用java实现的

**并且他无缝衔接spring，所以可以用Spring中DI的方式，注入bean对象**



### 1.2、中心控制器

Spring的web框架围绕`DispatcherServlet`设计，`DispatcherServlet`的作用是将请求分发到不同的处理器

Spring MVC框架像许多其他MVC框架一样, 以请求为驱动 , 围绕一个中心Servlet分派请求及提供其他功能，DispatcherServlet是一个实际的Servlet

![image-20221124222704113](https://s2.loli.net/2022/11/24/Nt9MWhAcpnRo8Pe.png)

### 1.3、执行原理

![image-20221125095316753](https://s2.loli.net/2022/11/25/ORco5eu6yFBUPi9.png)

图为SpringMVC的一个较完整的流程图，实线表示SpringMVC框架提供的技术，不需要开发者实现，虚线表示需要开发者实现。

**简要分析执行流程**

1. DispatcherServlet表示前置控制器，是整个SpringMVC的控制中心。用户发出请求，DispatcherServlet接收请求并拦截请求。

    我们假设请求的url为 : http://localhost:8080/SpringMVC/hello

    

    **如上url拆分成三部分：**

    http://localhost:8080服务器域名

    SpringMVC部署在服务器上的web站点

    hello表示控制器

    通过分析，如上url表示为：请求位于服务器localhost:8080上的SpringMVC站点的hello控制器。

2. HandlerMapping为处理器映射。DispatcherServlet调用HandlerMapping,HandlerMapping根据请求url查找Handler。

3. HandlerExecution表示具体的Handler,其主要作用是根据url查找控制器，如上url被查找控制器为：hello。

4. HandlerExecution将解析后的信息传递给DispatcherServlet,如解析控制器映射等。

5. HandlerAdapter表示处理器适配器，其按照特定的规则去执行Handler。

6. Handler让具体的Controller执行。

7. Controller将具体的执行信息返回给HandlerAdapter,如ModelAndView。

8. HandlerAdapter将视图逻辑名或模型传递给DispatcherServlet。

9. DispatcherServlet调用视图解析器(ViewResolver)来解析HandlerAdapter传递的逻辑视图名。

10. 视图解析器将解析的逻辑视图名传给DispatcherServlet。

11. DispatcherServlet根据视图解析器解析的视图结果，调用具体的视图。

12. 最终视图呈现给用户。

### 1.4、深入原理

![image-20221125102500426](https://s2.loli.net/2022/11/25/mNW3xtCRVas1iHB.png)

![image-20221125102840836](https://s2.loli.net/2022/11/25/jzrvEGx6nAMyk19.png)

![image-20221125102859905](https://s2.loli.net/2022/11/25/txygGnV7IZELWhf.png)



## 2、HelloSpring

### 2.1、配置版

1. 新建一个Module ， springmvc-02-hello ， 添加web的支持！ 

2. 确定导入了SpringMVC 的依赖！ 

3. 配置web.xml ， 注册DispatcherServlet

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
    http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
             version="4.0">
        <!--1.注册DispatcherServlet-->
        <servlet>
            <servlet-name>springmvc</servlet-name>
            <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
            <!--关联一个springmvc的配置文件:【servlet-name】-servlet.xml-->
            <init-param>
                <param-name>contextConfigLocation</param-name>
                <param-value>classpath:springmvc-servlet.xml</param-value>
            </init-param>
            <!--启动级别-1-->
            <load-on-startup>1</load-on-startup>
        </servlet>
    
    
        <!--/ 匹配所有的请求；（不包括.jsp）;一般都用这个，应为页面的请求不需要走dispatcherservlet-->
        <!--/* 匹配所有的请求；（包括.jsp）-->
        <servlet-mapping>
            <servlet-name>springmvc</servlet-name>
            <url-pattern>/</url-pattern>
        </servlet-mapping>
    </web-app>
    ```

4. 编写SpringMVC 的 配置文件！名称：springmvc-servlet.xml 

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd">
        
        这一块后面可以用mvc的一些配置简化掉
        <!--处理器映射器-->
        <bean class="org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping"/>
        <!--    处理器适配器-->
        <bean class="org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter"/>
    
        <!--视图解析器:DispatcherServlet给他的ModelAndView-->
        <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver" id="InternalResourceViewResolver">
            <!--前缀-->
            <property name="prefix" value="/WEB-INF/jsp/"/>
            <!--后缀-->
            <property name="suffix" value=".jsp"/>
        </bean>
    
        <!--Handler-->（这一块如果用Controller注解的话，可以不用手动注册bean，交给spring容器）
        <bean id="/hello" class="com.jacky.controller.HelloController"/>
    </beans>
    ```

5. 编写Controller

    ```java
    public class HelloController implements Controller {
        public ModelAndView handleRequest(HttpServletRequest request,
                                          HttpServletResponse response) throws Exception {
    //ModelAndView 模型和视图
            ModelAndView mv = new ModelAndView();
    //封装对象，放在ModelAndView中。Model
            mv.addObject("msg", "HelloSpringMVC!");
    //封装要跳转的视图，放在ModelAndView中
            mv.setViewName("hello"); //: /WEB-INF/jsp/hello.jsp
            return mv;
        }
    }
    ```

6. 编写视图页面

    ```jsp
    <%@ page contentType="text/html;charset=UTF-8" language="java" %>
    <html>
    <head>
        <title>Title</title>
    </head>
    <body>
    ${msg}
    </body>`
    </html>
    ```

### 2.2、注解版



@RestController 是用于返回json格式数据，不会被视图解析器所解析

@Controller会被视图解析器解析



修改springmvc-servlet.xml

```xml
    <context:component-scan base-package="com.jacky.controller"/>
<!--
    支持mvc注解驱动
    在spring中一般采用@RequestMapping注解来完成映射关系
    要想使@RequestMapping注解生效
    必须向上下文中注册DefaultAnnotationHandlerMapping
    和一个AnnotationMethodHandlerAdapter实例
    这两个实例分别在类级别和方法级别处理。
    而annotation-driven配置帮助我们自动完成上述两个实例的注入。
-->

    <mvc:annotation-driven/>
    <mvc:default-servlet-handler/>

    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/jsp/"/>
        <property name="suffix" value=".jsp"/>
    </bean>
```

修改controller代码

```java
@Controller  //视为了让springIOC容器能够自动扫描到，这样就不需要再去手动配置bean了 
//@RestController  //类的所有方法都 不会走视图解析器，会直接返回一个json字符串
public class HelloController {

    @RequestMapping("/hello")
    public String hello(Model model){
        model.addAttribute("msg","hello SpringMVC");

        return "test";
    }
}
```

- @Controller是为了让Spring IOC容器初始化时自动扫描到； 
- @RequestMapping是为了映射请求路径，这里因为类与方法上都有映射所以访问时应该 是/HelloController/hello； 
- 方法中声明Model类型的参数是为了把Action中的数据带到视图中； 
- 方法返回的结果是视图的名称hello，加上配置文件中的前后缀变成WEB-INF/jsp/hello.jsp。



## 3、Controller和RestFul风格

### 3.2、RestFul

Restful就是一个资源定位及资源操作的风格。不是标准也不是协议，只是一种风格。基于这个风格设计的软件可以更简洁，更有层次，更易于实现缓存等机制。

**传统方式操作资源 ：**通过不同的参数来实现不同的效果！方法单一，post 和 get

- http://127.0.0.1/item/queryItem.action?id=1 查询,GET  
- http://127.0.0.1/item/saveItem.action 新增,POST 
- http://127.0.0.1/item/updateItem.action 更新,POST 
- http://127.0.0.1/item/deleteItem.action?id=1 删除,GET或POST 



**使用RESTful操作资源 ：** 可以通过不同的请求方式来实现不同的效果！如下：

请求地址一样，但是功能 可以不同！ 

- http://127.0.0.1/item/1 查询,GET 
- http://127.0.0.1/item 新增,POST 
- http://127.0.0.1/item 更新,PUT 
- http://127.0.0.1/item/1 删除,DELETE





@PathVariable 注解

```java
@Controller
public class RestFulController {
    //映射访问路径
    @RequestMapping("/commit/{p1}/{p2}")
    public String index(@PathVariable int p1, @PathVariable int p2, Model model){
        int result = p1+p2;
		//Spring MVC会自动实例化一个Model对象用于向视图中传值
        model.addAttribute("msg", "结果："+result);
		//返回视图位置
        return "test";
    }
```





**小结：**

Spring MVC 的 @RequestMapping 注解能够处理 HTTP 请求的方法, 比如 GET, PUT, POST, DELETE 以及 PATCH。

**所有的地址栏请求默认都会是 HTTP GET 类型的。** 

方法级别的注解变体有如下几个： 组合注解 

```java
@GetMapping 
@PostMapping
@PutMapping
@DeleteMapping
@PatchMapping
```

@GetMapping 是一个组合注解 它所扮演的是 @RequestMapping(method =RequestMethod.GET) 的一个快捷方式。 

平时使用的会比较多！





## 4、结果跳转方式

### 4.1、ModelAndView

```java
@Controller
public class HelloController {

    @RequestMapping("/hello")
    public String hello(Model model){
        model.addAttribute("msg","hello SpringMVC");
        return "test";
    }
}
```

通过视图解析器，前缀和后缀的添加后，会跳转到对应的页面，并将数据渲染上去

### 4.2、ServletAPI

通过设置ServletAPI , 不需要视图解析器 . 

1. 通过HttpServletResponse进行输出 
2. 通过HttpServletResponse实现重定向 
3. 通过HttpServletResponse实现转发

```java
@Controller
public class ResultGo {
    @RequestMapping("/result/t1")
    public void test1(HttpServletRequest req, HttpServletResponse rsp) throws IOException {
        //输出
        rsp.getWriter().println("Hello,Spring BY servlet API");
    }
    
    @RequestMapping("/result/t2")
    public void test2(HttpServletRequest req, HttpServletResponse rsp) throws IOException {
        //重定向
        rsp.sendRedirect("/index.jsp");
    }
    
    @RequestMapping("/result/t3")
    public void test3(HttpServletRequest req, HttpServletResponse rsp) throws Exception {
			//请求转发
        req.setAttribute("msg","/result/t3");
        req.getRequestDispatcher("/WEB-INF/jsp/test.jsp").forward(req,rsp);
    }
}
```

### 4.3、SpringMVC

无需视图解析器：

```java
@Controller
public class ResultSpringMVC {
    @RequestMapping("/rsm/t1")
    public String test1(){
//转发
        return "/index.jsp";
    }
    @RequestMapping("/rsm/t2")
    public String test2(){
//转发二
        return "forward:/index.jsp";
    }
    @RequestMapping("/rsm/t3")
    public String test3(){
//重定向
        return "redirect:/index.jsp";
    }
}
```

需要图解析器：

```java
@Controller
public class ResultSpringMVC2 {
    @RequestMapping("/rsm2/t1")
    public String test1(){
//转发
        return "test";
    }
    @RequestMapping("/rsm2/t2")
    public String test2(){
//重定向
        return "redirect:/index.jsp";
//return "redirect:hello.do"; //hello.do为另一个请求/
    }
}
```







乱码问题

```xml
<filter>
    <filter-name>encoding</filter-name>
    <filter-class>
        org.springframework.web.filter.CharacterEncodingFilter
    </filter-class>
    <init-param>
        <param-name>encoding</param-name>
        <param-value>utf-8</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>encoding</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

## 5、拦截器

拦截器与过滤器之间的区别：

**拦截器**

- 拦截器是SpringMVC框架自己的
- 拦截器只会拦截访问的控制器方法，如果访问的是jsp/html/css/imgae/js是不会进行拦截的，也就是说拦截器自带静态资源过滤
- 拦截器是AOP思想的具体应用，横切进去的

**过滤器**

- 过滤器是servlet中的一部分，任何javaweb工程都可以使用
- url-pattern配置了/*之后，可以对所有要访问的资源进行拦截



### 5.1、具体实现

继承并实现handlerInterceptor

```java
public class MyInterceptor implements HandlerInterceptor {
    //    拦截的作用
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("===处理前===");
        return true;  // 执行下一个拦截器，放行；false的话就拦截了
    }

//    一般用于日志
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("===处理中===");
    }
    
//    一般用于日志
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("===清理===");
    }
}
```

写完拦截器后还需要在Spring容器中配置注册

```xml
<mvc:interceptors>
    <mvc:interceptor>
        <!-- 包括这个请求下面的所有请求-->
        <mvc:mapping path="/**"/>
        <bean class="com.jacky.config.MyInterceptor"/>
    </mvc:interceptor>
</mvc:interceptors>
```

这里相当于一个切点的作用，对于 根路径下的所有请求，都加上了pointcut，然后调用Interceptor去实现AOP拦截

![image-20221125160216785](https://s2.loli.net/2022/11/25/7qrxLAQnJKty5Xd.png)



### 5.2、登陆拦截器

```java
public class LoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpSession session = request.getSession();

        if (request.getRequestURI().contains("login")){
            System.out.println(1);
            return true;
        };

        if (session.getAttribute("userLoginInfo")!=null){
            System.out.println(2);
            return true;
        }
        if (session.getAttribute("user")!=null){
            System.out.println(3);
            return true;
        }

        request.getRequestDispatcher("/WEB-INF/jsp/logintext.jsp").forward(request,response);

        return true;
    }
}
```

同样也要注册、而且在loginController里将用户信息注入session

退出登录时，将session中的user信息移除。来保证用户的登录权限



## 6、文件上传下载

前端jsp,需要把表单中的enctype更改为multipart/form-data

```jsp
<form action="" enctype="multipart/form-data" method="post">
    <input type="file" name="file"/>
    <input type="submit">
</form>
```



