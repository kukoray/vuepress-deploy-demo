#  Nginx

本质是一个web服务器

## 部署静态资源

相较于tomcat，Nginx处理静态资源的能力更加高效

> 首先是启动nginx
>
> 在/usr/local/nginx/html/中放入我们所需要的静态资源，例如自己的一些html网页
>
> 对于配置的修改的话，在/usr/local/nginx/conf/nginx.conf文件中修改
>
> 修改完后，执行nginx -s reload重新加载配置

<img src="https://s2.loli.net/2022/10/20/b5TKHVZ4QgnveUS.png" alt="image-20221020232415290" style="zoom:50%;" />

## 反向代理 

什么是正向代理：

<img src="https://s2.loli.net/2022/10/20/3ieoRYjOEfUrMyw.png" alt="image-20221020231725168" style="zoom:50%;" />

什么是反向代理：

<img src="https://s2.loli.net/2022/10/20/hWrRy7FUfw2ZzcQ.png" alt="image-20221020231947507" style="zoom:50%;" />

区别在于：客户端是否知道代理服务

<img src="https://s2.loli.net/2022/10/20/C7W2hI6OSFawMTs.png" alt="image-20221020232635545" style="zoom: 50%;" />

## 负载均衡

本质其实还是，nginx**反向代理**，通过负载均衡算法，把来自客户端的请求，分发到web服务器集群中，达到负载均衡。



负载均衡算法有很多，默认是**轮询**的算法

<img src="https://s2.loli.net/2022/10/20/jPNS65ZCnpc7a8y.png" alt="image-20221020233134201" style="zoom:50%;" />

负载均衡策略

| 名称       | 说明                 |
| ---------- | :------------------- |
| 轮询       | 默认方式             |
| weight     | 权重方式             |
| ip_hash    | 依据ip分配方式       |
| least_conn | 依据最少连接方式     |
| url_hash   | 依据url分配方式      |
| fair       | 依据响应时间分配方式 |

