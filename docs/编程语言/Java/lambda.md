# lambda

> 参考博客：
> 
> [函数式接口 &amp; lambda表达式 &amp; 方法引用 - 赐我白日梦 - 博客园](https://www.cnblogs.com/ZhuChangwu/p/11150567.html)

Lambda 表达式，也可称为闭包，它是推动 Java 8 发布的最重要新特性。

Lambda 允许把函数作为一个方法的参数（函数作为参数传递进方法中）。

使用 Lambda 表达式可以使代码变的更加简洁紧凑。

## 函数式接口

### 性质

函数式接口本质上就是一个接口，有如下性质：

1. 如果一个接口只有一个抽象方法,无论有没有FunctionInterface注解,这个接口都是一个函数式接口
2. 如果我们在接口上加上了FunctionInterface注解,那么编译器按照函数式接口的要求,处理我们的接口

我们可以关注于函数式接口的入参类型和数量，以及返回值的类型。

例如，我们可以在定义一个函数式接口时，可以说这是一个M个入参，N个返回值的用于XXX用途的函数式接口

### 实现

**如何实现一个函数式接口？**

1. lambda表达式

2. 方法引用

3. 构造方法引用实现实现对应的实例，匿名实现类

4. 创建一个新类，实现该接口

### 案例

> jdk8新添加的函数式接口有几十个,但是套路相似

Consumer

```java
@FunctionalInterface
public interface Consumer<T> {

    void accept(T t);

    default Consumer<T> andThen(Consumer<? super T> after) {
        Objects.requireNonNull(after);
        return (T t) -> { accept(t); after.accept(t); };
    }
}
```

Function

接收一个参数，返回一个值

```java
@FunctionalInterface
public interface Function<T, R> {

    /**
     * Applies this function to the given argument.
     *
     * @param t the function argument
     * @return the function result
     */
    R apply(T t);

    default <V> Function<V, R> compose(Function<? super V, ? extends T> before) {
        Objects.requireNonNull(before);
        return (V v) -> apply(before.apply(v));
    }

    default <V> Function<T, V> andThen(Function<? super R, ? extends V> after) {
        Objects.requireNonNull(after);
        return (T t) -> after.apply(apply(t));
    }

    static <T> Function<T, T> identity() {
        return t -> t;
    }
}
```

## lambda表达式

### 概念

**什么是lambda表达式？**

- lambda表达式<mark>是一个对象</mark>,但是这种对象<mark>必须依附于函数式接口</mark>
- lambda是什么类型的对象只能通过给定的特定的上下文得知

### 作用

- 解决了<mark>在java中我们无法将函数传递给一个方法,也不能声明一个返回函数的方法</mark>这样一个问题
- 像js这种函数编程语言可以做到,比如`Ajax`向后端发送请求,得到的返回结果就是一个 回调函数`callback(){}`

### 案例

```java
Consumer consumer = i->{};

Function<String,String> function2 = String::toLowerCase;
Function<String,String> function3 = i->i.toUpperCase();

// 错误实例
// 无返回值
Function<String,String> function4 = i-> System.out.println(i);

// 返回值是布尔类型
Function<String,String> function1 = String::contains;
```

## 方法引用

### 概念

方法引用其实是lambda的语法糖,**当我们的lambda表达式只有一行并且恰好有一已经存在的方法作用跟他相同,我们就可以用方法引用替换lambda表达式,让代码的风格更好看**

### 案例

我们使用`Consumer`函数式接口，并准备一个普通类

```java
@FunctionalInterface
public interface Consumer<T> {

    void accept(T t);

    default Consumer<T> andThen(Consumer<? super T> after) {
        Objects.requireNonNull(after);
        return (T t) -> { accept(t); after.accept(t); };
    }
}

// 普通类
public class Main{
    public static void lamda(String str){
        System.out.println(str);
    }
}
```

进行测试：

```java
public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("hello");
        list.add("world");
        // 1、传入方法引用，入参出餐需要一致，除非接口函数返回类型为void
        Consumer<String> consumer = Main::lamda;
        // 2、传入lamdba表达式
//        Consumer<String> consumer1 = (str)->{
//            System.out.println(str);
//        };
        // 3、匿名实现类
//        Consumer<String> consumer2 = new Consumer<String>() {
//            @Override
//            public void accept(String s) {
//                System.out.println(s);
//            }
//        };
        list.forEach(consumer);
}
```

测试结果：

<img title="" src="file:///Users/bytedance/Library/Application%20Support/marktext/images/2022-05-04-13-22-37-image.png" alt="" width="96">
