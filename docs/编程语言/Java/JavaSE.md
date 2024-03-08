# JavaSE



## 基础数据类型

Java 中有 8 种基本数据类型，分别为：

- 6 种数字类型： 
    - 4 种整数型：`byte`、`short`、`int`、`long`
    - 2 种浮点型：`float`、`double`
- 1 种字符类型：`char`
- 1 种布尔型：`boolean`。

这 8 种基本数据类型的默认值以及所占空间的大小如下：

| 基本类型  | 位数 | 字节 | 默认值  | 取值范围                                   |
| :-------- | :--- | :--- | :------ | ------------------------------------------ |
| `byte`    | 8    | 1    | 0       | -128 ~ 127                                 |
| `short`   | 16   | 2    | 0       | -32768 ~ 32767                             |
| `int`     | 32   | 4    | 0       | -2147483648 ~ 2147483647                   |
| `long`    | 64   | 8    | 0L      | -9223372036854775808 ~ 9223372036854775807 |
| `char`    | 16   | 2    | 'u0000' | 0 ~ 65535                                  |
| `float`   | 32   | 4    | 0f      | 1.4E-45 ~ 3.4028235E38                     |
| `double`  | 64   | 8    | 0d      | 4.9E-324 ~ 1.7976931348623157E308          |
| `boolean` | 1    |      | false   | true、false                                |

**注意：**

1. Java 里使用 `long` 类型的数据一定要在数值后面加上 **L**，否则将作为整型解析。
2. `char a = 'h'`char :单引号，`String a = "hello"` :双引号。

这八种基本类型都有对应的包装类分别为：`Byte`、`Short`、`Integer`、`Long`、`Float`、`Double`、`Character`、`Boolean` 。



基本数据类型的局部变量存放在 Java 虚拟机**栈中的局部变量表**中

基本数据类型的成员变量（未被 `static` 修饰 ）存放在 Java 虚拟机的**堆**中

包装类型属于对象类型，我们知道几乎所有**对象实例都存在于堆**中。



## 面向对象

java是面向对象的，采用这种语言进行编程称为面向对象编程（OOP）

**面向对象编程的本质就是：以类的方式组织代码，以对象来组织(封装)数据。**



除了基本数据类型之外的叫做引用类型



父类中的属性和方法使用public修饰,在子类中继承后"可以直接"使用 

父类中的属性和方法使用private修饰,在子类中继承后"不可以直接"使用

**父类中的构造器是不能被子类继承的**,但是子类的构造器中,**会隐式的调用父类中的无参构造器(**默认使用 super关键字)。



1. 父类引用可以指向它的任何一个子类对象，子类引用不能指向父类

2. 把子类的实例化对象直接赋值给父类叫做向上转型upcasting，向上转型不需要强制转型

    Father father = new Son();

3. 把指向子类对象的父类引用赋给子类引用叫向下转型（downcasting），要强制转型。 如father就是一个指向子类对象的父类引用，把father赋给子类引用son 即Son son =（Son） father； 其中father前面的（Son）必须添加，进行强制转换。

4. upcasting 会丢失子类特有的方法,但是子类overriding 父类的方法会仍然生效（重写过的还是用的子类自己的方法）

5. static方法，因为被static修饰的方法是属于类的，而不是属于实例的 

6. final方法，因为被final修饰的方法无法被子类重写，但是可以继承 ；final修饰的类不能被继承，没有子类；final修饰的变量，只能赋值一次（引用变量不能改变引用地址，但是引用对象的属性是可以改变的）

7. private方法和protected方法，前者是因为被private修饰的方法对子类不可见，后者是因为尽管被 protected修饰的方法可以被子类见到，也可以被子类重写，但是它是**无法被外部所引用的**。

8. abstract修饰的方法叫做抽象方法，abstract修饰的类叫做抽象类；**抽象类中可以没有抽象方法,但是有抽象方法的类一定要声明为抽象类。**

9. 抽象类,不能使用new关键字来创建对象,它是用来让子类继承的；抽象方法,只有方法的声明,没有方法的实现,它是用来让子类实现的。有点像接口的感觉，但接口和抽象类又有区别





普通类：只有具体实现

抽象类：具体实现和规范(抽象方法) 都有！ 

接口：只有规范！

<img src="https://s2.loli.net/2022/10/23/btANphHZOn9aVUC.png" alt="image-20221023195239939" style="zoom: 80%;" />



```java
public interface Action{
    public abstract void run();
    //默认就是public abstract修饰的
    void test();
    public void go();
}
```





## IO流

```java

try {
    //1. 定位到服务器端的资源
    URL url = new URL("http://localhost:8080/helloworld/qinjiang.jpg");
    //2. 创建连接
    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    //3. 获取输入流
    InputStream is = connection.getInputStream();
    //4. 写出文件
    FileOutputStream fos = new FileOutputStream("qinjiang2.jpg");
    byte[] buffer = new byte[1024];
    int len;
    while ((len=is.read(buffer))!=-1){
        fos.write(buffer,0,len);
    }

```



## 多线程

<img src="https://s2.loli.net/2022/10/23/OhKDUtzo4AElpyX.png" alt="image-20221023222455903" style="zoom:50%;" />

### Thread

Thread类继承了Runnable接口，所以本质还是**继承Runnable接口**

- 自定义线程类继承Thread类
- 重写run()方法，编写线程执行体
- 创建线程对象，调用start()方法启动线程

```java
public class ThreadTest1 extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 20; i++) {
            System.out.println("并行线程" + i);
        }
    }

    public static void main(String[] args) {
        ThreadTest1 threadTest1 = new ThreadTest1();
        threadTest1.start();

        for (int i = 0; i < 20; i++) {
            System.out.println("这是主线程" + i);
        }
    }
}
```

### Runnable（推荐）

推荐使用Runnable对象，因为Java单继承的局限性

- 定义MyRunnable类实现Runnable接口
- 实现run()方法，编写线程执行体
- 创建线程对象，调用start()方法启动线程

```java
public class ThreadTest2 implements Runnable{
    @Override
    public void run() {
        for (int i = 0; i < 20; i++) {
            System.out.println("并行线程"+i);
        }
    }

    public static void main(String[] args) {
        ThreadTest2 threadTest2 = new ThreadTest2();
        // 这里用的 方法 是静态代理
        new Thread(threadTest2).start();

        for (int i = 0; i < 20; i++) {
            System.out.println("主线程"+i);
        }
    }
}
```

补充：静态代理

> 静态代理模式总结：
>
> 真是对象和代理对象都要实现同一个接口
>
> 代理对象要代理真实对象（代理对象中需要将 接口类作为属性）

==接口作为类型使用==

接口作为引用类型来使用，任何实现该接口的类的实例都可以存储在该接口类型的变量中，通过这些变量可以访问类中所实现的接口中的方法，Java 运行时系统会动态地确定应该使用哪个类中的方法，实际上是调用相应的实现类的方法。

清单1：代理接口 

```java
/**  
 * 代理接口。处理给定名字的任务。 
 */  
public interface Subject {  
  /** 
   * 执行给定名字的任务。 
   * @param taskName 任务名 
   */  
   public void dealTask(String taskName);   
}  
```

清单2：委托类，具体处理业务。

```java
/** 
 * 真正执行任务的类，实现了代理接口。 
 */ 
public class RealSubject implements Subject { 
 /** 
  * 执行给定名字的任务。这里打印出任务名，并休眠500ms模拟任务执行了很长时间 
  * @param taskName  
  */  
   @Override  
   public void dealTask(String taskName) {  
      System.out.println("正在执行任务："+taskName);  
         Thread.sleep(500);  
      } catch (InterruptedException e) {  
         e.printStackTrace();  
      }  
   }  
}  
```

清单3：静态代理类

```java
/**
 * 　代理类，实现了代理接口。
 */
public class ProxySubject implements Subject {
    //代理类持有一个委托类的对象引用  
    private Subject delegate;

    public ProxySubject(Subject delegate) {
        this.delegate = delegate;
    }

    /**
     * 将请求分派给委托类执行，记录任务执行前后的时间，时间差即为任务的处理时间
     *
     * @param taskName
     */
    @Override
    public void dealTask(String taskName) {
        long stime = System.currentTimeMillis();
        //将请求分派给委托类处理  
        delegate.dealTask(taskName);
        long ftime = System.currentTimeMillis();
        System.out.println("执行任务耗时" + (ftime - stime) + "毫秒");
    }
}
```

### Callable

1. 实现Callable接口，需要返回值类型 
2. 重写call方法，需要抛出异常 
3. 创建目标对象
4. 创建执行服务：ExecutorService ser = Executors.newFixedThreadPool(1); 
5. 提交执行：Future result1 = ser.submit(t1); 
6. 获取结果：boolean r1 = result1.get() 7
7. 关闭服务：ser.shutdownNow();

**实现Callable接口通过FutureTask包装器来创建Thread线程**



### 线程池

```java
public class ThreadPool {

    public static void main(String[] args) {
        //创建线程池，池的大小为10
        ExecutorService service = Executors.newFixedThreadPool(10);

        //启动线程
        service.execute(new myThread());
        service.execute(new myThread());
        service.execute(new myThread());
        service.execute(()->{
            System.out.println("这里用lambda表达式，本质是使用了函数式接口");
        });

        //关闭线程池
        service.shutdown();
    }


}


class myThread implements Runnable{
    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName());
    }
}
```



### 守护线程

- 线程分为`用户线程`和`守护线程`
- 虚拟机必须保证用户线程的执行完毕
- 虚拟机不用等待守护线程的执行完毕
- 例如：后台记录操作日志、监控内存、垃圾回收等

```java
设置的方法就是
thread.setDaemon(True);
默认是false，即用户进程；
```



### 线程同步！！！

由于同一进程的多个线程共享同一块存储空间 , 在带来方便的同时,也带来了访问冲突问题 , 为了保证数据在方法中被访问时的正确性 , 在访问时加入锁机制 **synchronized** , 当一个线程获得对象（临界资源）的**排它锁 , 独占资源 , 其他线程必须等待 , 使用后释放锁即可** 。

但是也存在以下问题

-  一个线程持有锁会导致其他所有需要此锁的线程挂起 ;
- 在多线程竞争下 , 加锁 , 释放锁会导致比较多的上下文切换 和 调度延时,引起性能问题；
- 如果一个优先级高的线程等待一个优先级低的线程释放锁会导致优先级倒置 , 引起性能问题 .



`synchronized`方法控制对“对象”的访问，每个对象（锁的是this）对应一把锁，每个synchronized方法都需要获得调用该方法的对象的锁才可以正常执行，否则线程阻塞。

> 重点：
>
> `synchronized`方法，默认锁的是这个方法所在的类对象（也就是this），也就完全等价于`synchronized(this)`
>
> 但是`synchronized`方法块，锁的可以是任意对象。写法：`synchronized(obj)`，obj也叫做同步监视器
>
> ！！！锁的对象就是变化的量，需要增删改的对象





函数式接口：是Java8 lambda表达式的关键所在，他的定义是**任何接口如果只含唯一一个抽象方法，那么他就是一个函数式接口。**

lambda代码是为了减少匿名内部类的使用



### Lock锁

ReentrantLock可重入锁

可以显式的加锁和解锁

```java
class A {
    private final ReentrantLock lock = new ReenTrantLock();

    public void m() {
        lock.lock();
        try {
//保证线程安全的代码;
        } finally {
            lock.unlock();
//如果同步代码有异常，要将unlock()写入finally语句块
        }
    }
}
```

<img src="https://s2.loli.net/2022/10/24/8DGkHNLmc9MX5Qa.png" alt="image-20221024221349665" style="zoom: 67%;" />





## 抽象类和接口

相同点

- 都有抽象方法
- 都无法实例化，只能由子类去实例化子类对象



不同

- 抽象类 用的是继承extends    接口 用的是 implements 实现
- 抽象类可以实现接口 ，但是接口只能继承接口，不能继承类
- 接口没有成员属性  没有构造器，只有方法 和 静态属性（final 修饰的静态常量）；抽象类有成员属性
- java8之后，接口多了default关键字，给与默认方法，不需要强制重写

![image-20221208234519904](https://s2.loli.net/2022/12/08/y2o1CcsvKbizHLU.png)





当既可以用接口也可以用抽象类时，尽可能用接口，会让子类的灵活性更高，因为接口不占继承类的位置