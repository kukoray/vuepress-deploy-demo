#   JavaWeb基础

## Tomcat服务器

tomcat目录结构

<img src="https://s2.loli.net/2022/11/05/xpUmnrWZw8auqIM.png" alt="image-20221105211458112" style="zoom:50%;" />

启动、关闭tomcat

<img src="https://s2.loli.net/2022/11/05/i7zLYG5XRFkBIlE.png" alt="image-20221105211600319" style="zoom:50%;" />

访问测试：http://localhost:8080/ 

可能遇到的问题： 

1. Java环境变量没有配置 
2. 闪退问题：需要配置兼容性
3. 乱码问题：配置文件中设置

<img src="https://s2.loli.net/2022/11/05/9SJEgTXNokmG8Qa.png" alt="image-20221105211747042" style="zoom:50%;" />



网站是如何访问的？

<img src="https://s2.loli.net/2022/11/05/6xMq43DueWynSdC.png" alt="image-20221105212347289" style="zoom:50%;" />



将自己写的网站，放到服务器(Tomcat)中指定的web应用的文件夹（webapps）下，就可以访问了 网站应该有的结构

WEB-INF是Java的WEB应用的安全目录。所谓安全就是客户端无法访问，只有服务端可以访问的目录。
如果想在页面中直接访问其中的文件，必须通过web.xml文件对要访问的文件进行相应映射才能访问。

```xml
--webapps ：Tomcat服务器的web目录
	-ROOT
	-kuangstudy ：网站的目录名
		- WEB-INF
			-classes : java程序
            -lib：web应用所依赖的jar包
            -web.xml ：网站配置文件
		- index.html 默认的首页
		- static
            -css
            	-style.css
            -js
            -img
		-.....

```

<img src="https://s2.loli.net/2022/11/09/9vFTKSMcu1IBba3.png" alt="image-20221109110023130" style="zoom:67%;" />

## Http





> 200：请求响应成功
>
> 3xx：请求重定向（302重定向；307请求转发）
>
> 4xx：找不到资源 404（页面不存在）
>
> 5xx：服务器代码错误   500   502：网关错误



## Servlet

<img src="https://s2.loli.net/2022/11/04/6yPBMgHDnNOvFR8.png" alt="image-20221104164614159" style="zoom:50%;" />

servlet 的 url-pattern 如果是 /*，那么访问 localhost:8080/  的话是不会进入index.jsp的，servlet的优先级更高

优先级关系：确定路径>通配符路径>index.jsp

可以用/*这个路径作为404的路径



> 一、使用绝对路径
>   response.sendRedirect(“绝对路径的URL地址”)；
>   如http://www.baidu.com，直接跳转到该地址(注意，http头不可省略)。
>   也可以使用本地服务器绝对路径地址http://localhost:8080/myProject/123.mp3。
>   这个是最简单的，可以访问到任何你可以访问的HTTP资源。
> 二、使用相对路径(这里以本地服务器地址为例）
>   1、路径前面没有斜线“/”
>   如response.sendRedirect(example/index.html);
>   容器会根据原先请求的URL建立一个完整的路径，如原先路径是http://localhost:8080/myProject/app/index.html , 那么会直接访问到http://localhost:8080/myProject/app/example/index.html
>   2、路径前面有斜线“/”
>   如response.sendRedirect(/example/index.html);
>   容器会根据原先请求的URL，相对于Web应用本身，建立一个完整的路径，如原先路径是http://localhost:8080/myProject/app/index.html , 那么会直接访问到http://localhost:8080/example/index.html





servlet网页请求URL，即可用注解@WebServlet来实现；也可以用web.xml来实现。

![img](https://s2.loli.net/2022/10/24/vY4IUK9rFOCL7n3.png)

```java
@WebServlet("/RegistServlet")
public class RegistServlet extends HttpServlet{

　　//处理 GET 方法请求的方法
　　public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {}

　　//处理POST方法请求的方法
　　protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {}

}
```



更改Tomcat启动时默认跳转的页面

~~~xml
  <welcome-file-list>
    <welcome-file>login.jsp</welcome-file>
  </welcome-file-list>
~~~



~~~java
req.setAttribute("roleList",roleList);
req.setAttribute("totalpage",totalpage);
req.setAttribute("totalCount",totalCount);
req.setAttribute("CurrentPageNo",CurrentPageNo);

//返回前端
req.getRequestDispatcher("userlist.jpg").forward(req,resp);

forward是转发（当前页面的url不会改变），redirect是重定向。
    
    
response.sendRequest("/jsp/user.do?method=query");//重定向
~~~







~~~java
 //根据参数名称获取参数值  例：username=flypig&password=2343
String username = request.getParameter("username");

 //根据参数名称获取参数值的数组   例：hooby=xx&hobby=name
String[] hobbies = request.getParameterValues("hobby");
~~~



**ServeltContext 可以代表整个应用。**

所以，ServletConetxt有另外一个名称：**application。**(EL表达式就是取这个名字)





### EL表达式不同域取值（四大域）

(page—>request—>session—>ServleContext)

~~~java
pageScope --> pageContext          常用${pageContext.request.contextPath}
requestScope --> request             request.getContextPath()
sessionScope --> session             
applicationScope --> application（ServletContext）
    
 举例：在request域中存储了name=张三
 获取：${requestScope.name}
~~~



pageContext.setAttribute()   属性只在当前页面有效

request.setAttribute()			只在请求中有效，请求转发携带这个数据	

session.setAttribute()			在整个会话中有效，从浏览器开启到关闭

application.setAttribute()      在服务器中有效，从打开服务器到关闭服务器





#### ServletContext

作用是：可以一个servlet中获取的数据，存到这个上下文中，然后其他servlet可以去这个上下文去取。





> 从地址栏显示来说
>
> 1. 转发的时候路径不变，但是使用的是另外的一个请求；
>
> 2. 重定向的话 路径是会变的
>
> 从数据共享来说
>
> 1. forward:转发页面和转发到的页面可以共享request里面的数据.
> 2. redirect:不能共享数据.
>
> 从运用地方来说
>
> 1. forward:一般用于用户登陆的时候,根据角色转发到相应的模块.
> 2. redirect:一般用于用户注销登陆时返回主页面和跳转到其它的网站等
>
> 从效率来说
>
> 1. forward:高.
> 2. redirect:低.

~~~java
String getInitParameter ()：
获 取 web.xml 文 件 的 <context-param/> 中 指 定 名 称 的 上 下 文 参 数 值 。 例 如getInitParameter(“myDBDriver”);会返回字符串“com.mysql.jdbc.Driver”。

Enumeration getInitParameterNames()：
获取 web.xml 文件的<context-param/>中的所有的上下文参数名称。其返回值为枚举类型 Enumeration<String>。

void setAttribute(String name, Object object)：
在 ServletContext 的公共数据空间中，也称为域属性空间，放入数据。这些数据对于 Web
应用来说，是全局性的，与整个应用的生命周期相同。当然，放入其中的数据是有名称的，
通过名称来访问该数据。

Object getAttribute(String name)：
从 ServletContext 的域属性空间中获取指定名称的数据。

void removeAttribute(String name)：
从 ServletContext 的域属性空间中删除指定名称的数据。

String getRealPath(String path)：
获取当前 Web 应用中指定文件或目录在本地文件系统中的路径，是基于盘符的路径。

String getContextPath()：
获取当前应用在 Web 容器中的名称。

~~~

#### Request

~~~java
对于 Request 中的域属性操作的方法有：
void setAttribute(String name, Object object)：
在 Request 域属性空间中放入数据。其生命周期与 Request 的生命周期相同。

Object getAttribute(String name)：
从 Request 的域属性空间中获取指定名称的数据。

void removeAttribute(String name)：
从Request 的域属性空间中删除指定名称的数据。由于这里我们举例子需要用到另外一个方法，所以将这个方法也进行介绍。

RequestDispatcher getRequestDispatcher(String path);
该方法用于创建请求转发器，而该请求转发器有一个方法 forward()，用于完成将请求对象转发给下一个资源。
 //forward()方法的原型如下：
void forward(HttpServletRequest request, HttpServletResponse response);

void getSession()
这是常用的方式，从当前request中获取session，如果获取不到session，则会自动创建一个session，并返回新创建的session；如果获取到，则返回获取到的session;
~~~

#### Session

一般我们都将一些公用的信息放在session里，类似于cookie的作用

我们一般系统的user信息登陆后都会存在session中，用于页面的拦截和身份验证。

~~~java
public void setAttribute(String name, Object value)
该方法用于向 Session 的域属性空间中放入指定名称、指定值的域属性。

public Object getAttribute(String name)
该方法用于从 Session 的域属性空间中读取指定名称为域属性值。

public void removeAttribute(String name)
该方法用于从 Session 的域属性空间中删除指定名称的域属性。

~~~







**关于resp.sendRedirect和req.getRequestDispatcher的路径问题**

假设前提：

- 本次配置的tomcat上下文路径为`/icoding`
- login.jsp页面在webapp根目录下

```java
方法一：
    req.getRequestDispatcher(req.getContextPath()+"/login.jsp").forward(req,resp);   //这种方式是不行的
	这种方式他请求的路径是/icoding/login.jsp；但是在我们webapp目录下根本没有icoding这个文件夹，所以这个是错误的！（不过如果恰好有icoding这个文件夹，那么也是能够访问到资源的，有点歪打误撞的感觉），总之这个方法是错误的，不推荐使用。

方法二：
	req.getRequestDispatcher("/login.jsp").forward(req,resp);    //这种应该是可以的
	这种方法是可行的，由于这里加了/ ，代表webapp根目录，所以可以访问到。

方法三：    
	req.getRequestDispatcher("login.jsp").forward(req,resp);    //这种应该也是可以的
	这种方法和第二种的区别在于，有无/ 
	这里采用的是相对地址的概念，如果路径是相对路径，则相对目录是当前servlet的请求路径
    如果路径是/user.do，那么相对路径就是/;如果路径是/jsp/user.do，那么相对路径就是/jsp;
方法四：
	req.getRequestDispatcher("/icoding/index.jsp").forward(req,resp);
	这种方法是和第二种一样的，都是从根目录去找，这里不考虑我们的上下文路径；



总结：
//请求转发 如果使用'/'的话  是从webapp根目录去加载资源的
//如果没有 '/'的话  是使用相对路径来加载的
```









---

## JSP

jsp等前端文件我们一般都写在webapp下，其中webapp下的WEB-INF目录是无法访问的（服务器可以访问），里面一般放我们不想用户看到的文件和资源，还有web配置文件web.xml

**jsp本质是servelt**

> 在jsp文件中
>
> 只要是java代码就会原封不动的输出
>
> 如果是前端代码的话会转换为`out.write("\r\n");`
>
> 输出到前端

~~~java
public final class index_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent,
                 org.apache.jasper.runtime.JspSourceImports {
~~~

HttpJspBase这个包继承了HttpServlet

 

~~~java
public void _jspService(final javax.servlet.http.HttpServletRequest request, final 		javax.servlet.http.HttpServletResponse response)
      throws java.io.IOException, javax.servlet.ServletException {
~~~

相当于servlet的     service方法



~~~java
final javax.servlet.jsp.PageContext pageContext;
final javax.servlet.ServletContext application;
final javax.servlet.ServletConfig config;
javax.servlet.jsp.JspWriter out = null;
final java.lang.Object page = this;
javax.servlet.jsp.JspWriter _jspx_out = null;
javax.servlet.jsp.PageContext _jspx_page_context = null;
~~~



### jsp的九大内置对象

### JSTL

是jsp的标准标签库

标签	                      描述
<c:out>	                    用于在JSP中显示数据，就像<%= ... >
<c:set>						 用于保存数据
<c:remove>			 	用于删除数据
<c:catch>					 用来处理产生错误的异常状况，并且将错误信息储存起来
<c:if>							与我们在一般程序中用的if一样
<c:choose>				  本身只当做<c:when>和<c:otherwise>的父标签
<c:when>					 <c:choose>的子标签，用来判断条件是否成立
<c:otherwise>			 c:choose>的子标签，接在<c:when>标签后，当<c:when>标签判断为false时被执行
<c:import>				  检索一个绝对或相对 URL，然后将其内容暴露给页面
<c:forEach>				 基础迭代标签，接受多种集合类型
<c:forTokens>			 根据指定的分隔符来分隔内容并迭代输出
<c:param>				   用来给包含或重定向的页面传递参数
<c:redirect>				 重定向至一个新的URL.
<c:url>						  使用可选的查询参数来创造一个URL





前端渲染常见问题与解决方式：

> 问题一：js加载失败、图片加载失败
>
> 排查方式
>
> 1. F12查看页面问题所在
> 2. 看后台日志
> 3. 查看target目录是否未重新生成
> 4. shift+F5  刷新网页缓存
> 5. 检查是否逻辑有误，后端代码是否有误，前端代码是否有误





## Maven

（快捷导包，且导入包所依赖的包）

会自动下载。

<img src="https://s2.loli.net/2022/10/24/ulgrJVifIXsRKB3.png" alt="image-20210905170855885" style="zoom: 67%;" />



~~~xml
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
<!-- 在bulid中配置resources，来防止我们的资源导出（是指编译到target目录）失败-->
~~~



~~~xml
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.encoding>UTF-8</maven.compiler.encoding>
        <java.version>8</java.version>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>
//解决java: 不再支持源选项 5。请使用 6 或更高版本。


~~~

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <configuration>
                <source>8</source>
                <target>8</target>
            </configuration>
        </plugin>
    </plugins>
</build>
和上面解决的问题相同，有的时候项目的编码老是会自己变动，可以在pom.xml中显示写出
```





**Maven中的父子工程**

















## MySQL



（pojo）entity 实体类 **（  实体类就是对应数据库中的一张表 ）**



构造实体类的时候，先写完**属性值（private String name）；**

然后构造 其 **getter** 和**setter**方法 **generator**（有参构造和无参构造）、**tostring**方法。



**JDBC使用步骤**

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class DbUtil {

    public static final String URL = "jdbc:mysql://localhost:3306/imooc";
    // 这里有点类似与http的url连接
    public static final String USER = "liulx";
    public static final String PASSWORD = "123456";
 
    public static void main(String[] args) throws Exception {
        //1.加载驱动程序
        Class.forName("com.mysql.jdbc.Driver");  // 由于Driver这个类，只有一个静态代码块，所以只需要把他注册即可
        // 也可以用  DriverManager.registerDriver(new com.mysql.jdbc.Driver) 但是这样会去加载驱动两次
        
        
        //2. 获得数据库连接
        Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
        // 代表数据库
        
        //3.操作数据库，实现增删改查
        Statement stmt = conn.createStatement();
        // 代表执行SQL类   还有PrepareStatement
        ResultSet rs = stmt.executeQuery("SELECT user_name, age FROM imooc_goddess");
        
        
        
        //如果有数据，rs.next()返回true
        while(rs.next()){
            System.out.println(rs.getString("user_name")+" 年龄："+rs.getInt("age"));
        }
    }
}
```

jdbc就增删改查



### PreparedStatement





### JDBC处理**事务**：

增删改（需要处理事务）；查询不需要处理，不会对数据库产生影响。  

ACID原则   回滚  



读取properties配置文件，src目录下的都可以通过反射的方法来获取到







## Filter 过滤器

过滤网站的数据；

- 处理中文乱码
- 登陆验证...   

<img src="https://s2.loli.net/2022/10/24/H2XnZICYLQOVJie.png" alt="image-20210905170414520" style="zoom: 67%;" />



Filter 使用步骤（实现过滤器的接口！）

1. 导包   import javax.servlet.Filter;

2. 编写过滤器

   ```java
   @WebFilter("/success.jsp")
   public class FirstFilter implements Filter {
       private FilterConfig filterConfig = null;
       String paramValue = null;
    
       @Override  //init 初始化：web服务器（Tomcat）启动，就开始初始化，随时等待过滤对象出现。
   
   
       public void init(FilterConfig filterConfig) throws ServletException {
           this.filterConfig = filterConfig;
           paramValue = filterConfig.getInitParameter("encoding");
       }
       
       @Override
       public void doFilter(ServletRequest request, ServletResponse response,
               FilterChain chain) throws IOException, ServletException {
           System.out.println("begin headers-------------------");
           Enumeration<?> headerNames = ((HttpServletRequest)request).getHeaderNames();
           
           while(headerNames.hasMoreElements()) {
               String headerName = (String)headerNames.nextElement();
               System.out.println(headerName + ": " + ((HttpServletRequest)request).getHeader(headerName));
           }
           System.out.println("end headers-------------------");
           
           //在调用目标前写入响应内容
           response.setContentType("text/html; charset=gb2312");
           PrintWriter out = response.getWriter();
           out.println("IP地址为：" + request.getRemoteHost() + "<br>");
    
           chain.doFilter(request, response);  //这句话必须要写！！！，让业务继续往下走。
           
           //在目标返回后写入响应内容
           out.println("<br>名称为encoding的初始化参数的值为：" + paramValue);
           out.println("<br>当前Web程序的真实路径为：" + filterConfig.getServletContext().getRealPath("/"));
           
           //out.println("<br>修改了test.html文件！");
       }
       
       @Override  //destroy： web服务器关闭的时候销毁。 
       public void destroy() {
           this.filterConfig = null;
       }
   }
   ```

用**过滤器**实现登陆页面的拦截效果

过滤器中的chain.doFilter方法是为了等待下一个filter出现。一般放在if（）语句外面。







## Ajax

AJax = Asynchronous JavaScript and XML（**异步**的JavaScript和XML）

Ajax：即异步 JavaScript 和XML。Ajax是一种用于创建快速动态网页的技术。通过在后台与服务器进行少量数据交换，Ajax可以使网页实现异步更新。**这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新**。而传统的网页(不使用 Ajax)如果需要更新内容，必需重载整个网页面。



同步提交：当用户发送请求时，当前页面不可以使用，服务器响应页面到客户端，响应完成，用户才可以使用页面。

异步提交：当用户发送请求时，当前页面还可以继续使用，当异步请求的数据响应给页面，页面把数据显示出来 。



~~~java
BS:(Browser/Server,浏览器/服务器模式),web应用 可以实现跨平台，客户端零维护，但是个性化能力低，响应速度较慢。
CS:(Client/Server,客户端/服务器模式),桌面级应用 响应速度快，安全性强，个性化能力强，响应数据较快
~~~

 底层和本质：XHR



~~~java
 readyState === 0 : 表示未初始化完成，也就是 open 方法还没有执行 
 readyState === 1 : 表示配置信息已经完成，也就是执行完 open 之后 
 readyState === 2 : 表示 send 方法已经执行完成
 readyState === 3 : 表示正在解析响应内容
 readyState === 4 : 表示响应内容已经解析完毕，可以在客户端使用了
~~~



可以用百度的https://sp1.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su 来实现

<img src="https://s2.loli.net/2022/10/24/EpvTe7y2CusoGDh.png" alt="image-20210905154844842" style="zoom:67%;" />

这种动态显示的效果，wd=王企鹅。 用前端去获取链接中的数据实现。









**ajax**默认是get请求（post的参数在formdata中、get的参数在URL中）

~~~javascript
$.post(){  //post更加安全 
    里面url这个参数是必填的，其他的参数随意
}

$.ajax(){ // 默认是get提交
    
}

下午写一个粘贴在这里。
~~~

~~~JavaScript
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/jquery-3.6.0.js"></script>  
<script type="text/javascript">
        function a(){
            $.ajax({
                url: "${pageContext.request.contextPath}/ajax/a1",
                data: {"name": $("txtName").val()},
                success:function (data,status){
                    console.log(data);
                    console.log(status)
                }
            });
        }
</script>

    <h2>登陆界面</h2>
    用户名:
    <input type="text" id="txtName" onblur="a()" >
~~~





使用jQuery需要导入jQuery的包 ；       使用Vue就导Vue的包

**使用方法（三部曲）**

1. 编写对应处理的Controller，返回**消息**或者**字符串**或者**json**格式的数据
2. 编写ajax请求
   1. url ：待载入页面的URL地址（必填） 
   2. data  ： 待发送的 key/value 参数   ，自动识别键值对为data
   3. success  ：  载入成功时的回调函数 ，成功了就会执行。   自动识别函数为success
3. 给ajax绑定事件（click 、 onblur 、 keyup）









## 读properties的方法

​	

```java
public class jdbcUtils {
    private static String driver =null;
    private static String url = null;
    private static String username =null  ;
    private static String password =null;
    static {
        try {
            Properties properties = new Properties();
            InputStream is = jdbcUtils.class.getClassLoader().getResourceAsStream("db.properties");
            properties.load(is); //导入properties
            
            driver = properties.getProperty("driver");
            url = properties.getProperty("url");
            username =properties.getProperty("username");
            password = properties.getProperty("password");
    }

}
```

```java
//插入（增删改查同理）
public class jdbcInsert {
    public static void main(String[] args) throws SQLException {
        Connection connection = jdbcUtils.getConnection();

        Statement statement = connection.createStatement();

        ResultSet resultSet = statement.getResultSet();

        String sql = "INSERT INTO user(id,name,age,sex) VALUES(3,'sd',34,'男')";

        int i = statement.executeUpdate(sql);
        if (i > 0) {
            System.out.println("插入成功");
        }

        jdbcUtils.release(connection,statement,resultSet);

    }

}
```



![image-20210905212111485](https://s2.loli.net/2022/10/24/TeGFB1gi9MXZUm7.png)





## 项目目录结构

![在这里插入图片描述](https://s2.loli.net/2022/11/09/xWMfyZk7oEOszjD.png)



什么是classpath

classpath其实就是一个路径而已，我们经常在spring的配置文件中这样写：

```java
<property name="configLocation" value="classpath:mybatis/SqlMapConfig.xml" />
```

这样配置完之后spring就知道mybatis配置文件所在的地方。

<img src="https://s2.loli.net/2022/11/24/wg4bhG8Z3a6qHjn.webp" alt="img" style="zoom:150%;" />

**classpath指向的就是打war包之后的classes的位置**。

而classes文件夹下就是我们原项目的java文件和resources文件夹里面的内容。

所以上面的代码的意思就是在编译后的classes文件中找mybatis/SqlMapConfig.xml文件。



# SSM框架

## 1、MyBatis



sql写在XMl里，便于统一管理和优化。

解除sql与程序代码的耦合，sql和代码分类。

提供，支持编写动态sql

### 1.1使用步骤

1、在pom.xml中导入包

~~~xml
<dependencies>

    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <scope>test</scope>
    </dependency>

    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.25</version>
    </dependency>

    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.5.2</version>
    </dependency>
</dependencies>


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

~~~



2、编写resources下的全局配置文件config.xml

~~~xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">


<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/jdbcstudy?useSSL=false&amp;serverTimezone=UTC"/>
                <property name="username" value="root"/>
                <property name="password" value="12345qaz"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <mapper resource="com/jacky/dao/UserMapper.xml"/>
    </mappers>
</configuration>
~~~



3、编写utils工具类（会话工厂产生器）

~~~java
public class MybatisUtils {

    private static SqlSessionFactory sqlSessionFactory;
    static {

        try {
            String resource = "config.xml";
            InputStream inputStream = Resources.getResourceAsStream(resource);
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static SqlSession getSqlSession(){
        return sqlSessionFactory.openSession();
    }
}

~~~



4、编写实体类pojo

~~~java
public class User {

    private int id;
    private String name;
    private int age;
    private String sex;
//getter  setter
}
~~~

5、编写Dao接口

~~~java
public interface UserDao {
    List<User> getUserList();
}

~~~

6、编写Mapper.xml配置文件（sql编写,**后期只需要修改这里的代码**）

~~~xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.jacky.dao.UserDao">   //要和dao层接口名一致
    <select id="getUserList" resultType="com.jacky.pojo.User">
    select * from user;
  </select>
</mapper>
~~~



**CRUD**

~~~xml
namespace  与dao层接口类名一致
select 查询   insert增加    delete删除   update改
id 对应dao接口的方法名
resultType返回值类型
parameterType参数类型


其中“增删改”需要提交事务：sqlSession.commit()
查询不需要

~~~







7、测试类junit（写在test目录）

~~~java
public class test {
    @Test
    public void test(){

        SqlSession sqlSession = MybatisUtils.getSqlSession();
        UserDao mapper = sqlSession.getMapper(UserDao.class);

        List<User> userList = mapper.getUserList();

        for (User user: userList ) {
            System.out.println(user.toString());
        }
        sqlSession.close();
    }
}



~~~



**万能的Map**

多个参数，用map。对于数据库参数比较多的情况map比较适合。

1. Map传递参数,直接在sq中取出key即可
2. 对象传递参数,直接在sq中取对象的属性即可
3. 只有一个基本类型参数的情况下,可以直接在sq中取到



### 1.2配置解析

![image-20210909163327739](https://s2.loli.net/2022/10/24/mQIJOU4X6W7pMew.png)

**！！！在xml中，所有的标签都需要按照规定顺序！！！**

可以在properties中引入外部文件（db.properties）



typeAliases（可以给实体类起别名）

```xml
<typeAliases>
  <typeAlias alias="user" type="com.kuang.pojo.User"/>

</typeAliases>
```

也可以指定一个包名，MyBatis 会在包名下面搜索需要的 Java Bean，比如：

```xml
<typeAliases>
  <package name="com.kuang.pojo"/>
</typeAliases>
```

用注解给pojo起别名：

```java
@Alias("author")
public class Author {
    ...
}
```












