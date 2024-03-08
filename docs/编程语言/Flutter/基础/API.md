# API

## Future

### delayed

Future.delayed是指将任务延迟进行

```dart
Future.delayed(Duration.zero,(){
    // ...
});
```

> dart语言本身是一个单线程语言，主线程种只依靠Event Queue和Microtask Queue来进行事件处理，因此Flutter没有时间调度的概念。
>
> 延时任务不一定在指定时间之后执行，但是在指定时间之后会放到任务队列的最前面，当没有正在执行的微任务或者其他事件时，才会执行该事件