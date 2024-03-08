# SpringBoot

## 1、

自动装配

简化spring

这里建议使用springboot2.7.0版本





原理初探

自动配置：

pom.xml

- 在父类的
- 我们在写或者引入一些依赖的时候，需要指定版本，是因为这些版本由父类管理了



结论：springboot所有自动配置都是在启动的时候扫描并加载：spring.factories





```java
ServletRequestAttributes requestAttributes =(ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
HttpServletRequest request = requestAttributes.getRequest();
String userId = request.getHeader("auth");
```



```java
@RestControllerAdvice
@Slf4j
public class WebExceptionHandler {


    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.OK)
    public Result<String> exceptionHandler(HttpServletRequest request, Exception e) {
        log.error("运行时异常: Request Url: {}, exception: {}", request.getRequestURL(), e.getMessage());
        e.printStackTrace();
        return Result.fail(500, "服务器内部错误", e.getMessage());
    }

}
```



