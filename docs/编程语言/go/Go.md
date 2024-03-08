# Go语言

解决执行效率和开发效率不能兼备的一个问题

**go语言特点：**

- 简洁、快速、安全
- 并行、有趣、开源
- 内存管理、数组安全、编译迅速



printf

%d

%p

%T

%t

%f

%s

b,a = a,b

_ 匿名变量，任何赋给这个变量的值都将被抛弃

const 常量，无法改变

:=  自动识别类型

var{

}



const{

}

iota   自动增1  ，常量计数器； 在const关键字出现时重置为0



中文的编码是GBK

全世界的编码表Unicode





类型转换，显示类型转换

c := int(b)





fmt.Scanln(&x,&Y)



![31-init.png](https://cdn.nlark.com/yuque/0/2022/png/26269664/1650528765014-63d3d631-428e-4468-bc95-40206d8cd252.png?x-oss-process=image%2Fresize%2Cw_929%2Climit_0)

init函数前于main执行



类似于析构函数的作用，【延迟执行语句】

defer，栈的形式，先声明的 后输出

defer在return之后 



数组的长度不同，对应的数据类型不同

动态数组   []int     静态数组 [4]int 

slice切片 感觉和数组很像

%d  是int值 ， %v输出全部信息   ， %T输出变量类型

```go
package main


import "fmt"


func main() {
    //创建一个切片（动态数组），长度是3，容量是5；
    //当slice中追加的元素超过容量cap时，容量会翻倍
   var numbers = make([]int,3,5)
   printSlice(numbers)
}


func printSlice(x []int){
   fmt.Printf("len=%d cap=%d slice=%v\n",len(x),cap(x),x)
}
```





切片，有点像python

```
s1 := s[0:1]
左闭右开
```





struct 类型 作为函数的参数的话，是传递一个struct的副本

如果是指针的话，会改变原来struct对象的值

接口本质是指针

父类指向子类





多态，多继承





reflect反射包

```go
func main() {
   kukoray := user.User{Name: "kukoray", Age: 12, Sex: "girl"}
   DoFieldAndMethod(kukoray)
}

func DoFieldAndMethod(arg interface{}) {
   inputType := reflect.TypeOf(arg)
   fmt.Println("inputType is :", inputType.Name())

   inputValue := reflect.ValueOf(arg)
   fmt.Println("input value is:", inputValue)

   for i := 0; i < inputType.NumField(); i++ {
      fmt.Printf("%s:", inputType.Field(i).Name)
      fmt.Println(inputValue.Field(i))
   }
//这里需要注意的是，method必须是public才能扫描到，并且struct的方法声明中 不能带指针
   for i := 0; i < inputType.NumMethod(); i++ {
      fmt.Println(inputType.Method(i).Name)
   }
}
```

eflect.TypeOf()是获取pair中的type，reflect.ValueOf()获取pair中的value

使用反射包的时候，对于引用类型，例如struct，得传入结构体变量的指针







```go
type Movie struct {
   Name   string   `json:"Name"`
   Time   int      `json:"Time"`
   Actors []string `json:"Actors"`
}

func main() {
   mv := Movie{"欢乐喜剧人", 1231, []string{"shenteng", "xaioshenyang"}}
   fmt.Println(mv)

   marshal, err := json.Marshal(mv)
   fmt.Println(err)
   if err != nil {
      fmt.Println("there is something wrong")
   }
   fmt.Printf("%s", marshal)

   var newMoive Movie
   err = json.Unmarshal(marshal, &newMoive)
   fmt.Println(err)
   if err != nil {
      fmt.Println("there is something wrong")
   }
   fmt.Printf("%v", newMoive)

}
```

json转换注意点：

- 输出json字符串时，需要`fmt.Printf("%s", marshal)`
- 解码时，需要传入指针`err = json.Unmarshal(marshal, &newMoive)`





上下文切换不需要切换内核态



协程、线程、协程调度器

协程用来执行用户空间，底层调用用线程；

go的协程叫做goroutine，通常那个是几十kb（一般线程都是几兆），有大量，并且对协程调度器进行了优化



有全局队列，和协程处理器的本地队列

偷取机制：从其他协程处理器的本地队列中，偷取goroutine来执行





## goroutine

```go
func newTask() {
   i := 0
   for {
      i++
      fmt.Printf("new goroutine is running : %d\n", i)
      time.Sleep(1 * time.Second)
   }
}

func main() {
   go newTask()
   for i := 0; i < 30; i++ {
      fmt.Printf("main goroutine is running : %d\n", i)
      time.Sleep(1 * time.Second)
   }
   fmt.Println("main goroutine is finish")
}
```

主goroutine结束，子goroutine也就结束





## channel

- 无缓冲channel



![image-20221203202630221](https://s2.loli.net/2022/12/03/EmXCaBbAT2Jfznp.png)



- 有缓冲channel

`c := make(chan int ,3) ` 带有缓冲的channel ，定义channel

当缓冲区满的时候，会发生阻塞，等缓冲区中的数据被取走的时候，腾出位置之后再次运行

```go
func main() {
   c := make(chan int, 3)

   go func() {
      defer fmt.Println("child goroutine finish")
      for i := 0; i < 4; i++ {
         c <- i
         fmt.Printf("child goroutine is running, the len(c) is %d, the cap(c) is %d\n", len(c), cap(c))
      }

   }()

   time.Sleep(3 * time.Second)

   for i := 0; i < 3; i++ {
      num := <-c
      fmt.Printf("Num:%d\n", num)
      fmt.Println("main goroutine is running")
   }
}
```





```go
c := make(chan int, 3)
close(c)
data, ok := <-c  // ok为true表示channel未关闭
```

关闭channel；

```go
for data:= range c{
   fmt.Println(data) //迭代的去取channel “c” ，直到c关闭为止
}
```





## select

多路状态监控的功能

