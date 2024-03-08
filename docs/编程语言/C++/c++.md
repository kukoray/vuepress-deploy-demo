# 学习路线

![img](https://s2.loli.net/2022/09/19/Yr8MQpmINZjzxvn.jpg)





## 一、内存的分区模型

c++程序的分区

- 代码区
- 全局区
- 栈区：编译器自动分配释放，存放函数的参数值，局部变量等（通常我们dfs时说的爆栈就是这个东西）
- 堆区：由程序员分配和释放





代码区：存放cpu执行的机器指令，代码区是共享的（对于频繁被执行的程序，内存中只需要存一份即可），也是只读（避免因为一些原因被修改了）

全局区：包括全局变量和静态变量（static）、常量（字符串常量、全局常量），该区域的数据在程序结束后由操作系统释放。**局部变量、局部常量不在这个里面**



![image-20220922164152922](https://s2.loli.net/2022/09/22/dIAxSYrOHt4VvNQ.png)

![image-20220922164236349](https://s2.loli.net/2022/09/22/Zdj1Kf87rNMoqJp.png)



栈区：由编译器，存放局部变量、形参；

函数不要返回局部变量的地址，编译器第一次对于这个地址进行了一次保留，第二次的时候会被编译器释放，就访问不到那个局部变量的数据了。



堆区：由程序员分配释放

在c++中主要利用new

int * p = new int(10);   //这里指针p也是局部变量，但是指针保存的数据在堆区（申请一个int的空间，初始化为10，返回int *型的指针指向这块空间）

释放堆区，使用delete操作符

delete p;





int * arr = new int [10]; // 这里是分配了10个int的空间，返回了这个数组的首地址

delete [] arr;





## 二、c++中的引用

引用必须要初始化，必须要告诉他是谁的别名

一旦初始化之后，就不可以更改；

在函数中 引用也是可以实现用形参来改变实参的作用的



int a = 10;

int & ref = a;



和堆区的原理一样，局部变量的引用不要作为函数的返回值，因为会被栈区释放，第一次能保留，第二次的 时候就被编译器释放了

另外，一个函数的返回值如果是引用类型，那么这个函数名也可以作为坐值对他进行赋值；

例如  test()=1000;  //   int & test(){}



引用的本质：是一个**指针常量**；   int & ref = a;相当于 int * const ref = &a ;





常量引用：const int & val ;防止函数中对于引用变量的改变，导致实参发生改变



const int  & 和 int &是两种不同的数据类型





## 三、类和对象

面向对象四大特性：封装、继承、多态、抽象



```c++
#include <iostream>
 
using namespace std;
 
class Box
{
   public:
      double length;   // 长度
      double breadth;  // 宽度
      double height;   // 高度
      // 成员函数声明
      double get(void);
      void set( double len, double bre, double hei );
};
// 成员函数定义
double Box::get(void)
{
    return length * breadth * height;
}
 
void Box::set( double len, double bre, double hei)
{
    length = len;
    breadth = bre;
    height = hei;
}
int main( )
{
   Box Box1;        // 声明 Box1，类型为 Box
   Box Box2;        // 声明 Box2，类型为 Box
   Box Box3;        // 声明 Box3，类型为 Box
   double volume = 0.0;     // 用于存储体积
 
   // box 1 详述
   Box1.height = 5.0; 
   Box1.length = 6.0; 
   Box1.breadth = 7.0;
 
   // box 2 详述
   Box2.height = 10.0;
   Box2.length = 12.0;
   Box2.breadth = 13.0;
 
   // box 1 的体积
   volume = Box1.height * Box1.length * Box1.breadth;
   cout << "Box1 的体积：" << volume <<endl;
 
   // box 2 的体积
   volume = Box2.height * Box2.length * Box2.breadth;
   cout << "Box2 的体积：" << volume <<endl;
 
 
   // box 3 详述
   Box3.set(16.0, 8.0, 12.0); 
   volume = Box3.get(); 
   cout << "Box3 的体积：" << volume <<endl;
   return 0;
}
```





保护权限和私有权限都是类内可以直接访问，类外无法访问



面试题：struct和class的区别

区别：

1. struct默认权限为公共
2. class默认访问权限为私有



### 构造函数和析构函数

我们不提供时，编译器会提供空的实现

```c++
//
// Created by Jacky on 2022-09-23.
//

#include <iostream>
using namespace std;

class Line {
public:

    Line();  // 这是构造函数

    Line(double length);

    virtual ~Line();


    double getLength() const;

    void setLength(double length);

private:
    double length;
};

// 成员函数定义，包括构造函数
Line::Line(void) {
    cout << "Object is being created" << endl;
}

Line::Line(double length) : length(length) {}

Line::~Line() {

}

double Line::getLength() const {
    return length;
}

void Line::setLength(double length) {
    Line::length = length;
}

// 程序的主函数
int main() {
    Line line;

    // 设置长度
    line.setLength(6.0);
    cout << "Length of line : " << line.getLength() << endl;

    return 0;
}
```



析构函数不可以有参数

对象在销毁前，会调用析构函数，只会调用一次



### 深拷贝与浅拷贝

拷贝构造函数

```c++
Line::Line(const Line &obj)
{
    cout << "调用拷贝构造函数并为指针 ptr 分配内存" << endl;
    ptr = new int;
    *ptr = *obj.ptr; // 拷贝值
}
```



深拷贝与浅拷贝的区别就在于深拷贝会在堆内存中另外申请空间来储存数据，从而也就解决了指针悬挂的问题。

简而言之，当数据成员中有指针时，必须要用深拷贝。



如果类没有显式实现拷贝构造函数，那么系统会调用默认的拷贝函数：浅拷贝









### 抽象类，接口类

接口描述了类的行为和功能，而不需要完成类的特定实现。

C++ 接口是使用**抽象类**来实现的，抽象类与数据抽象互不混淆，数据抽象是一个把实现细节与相关的数据分离开的概念。

<u>如果类中至少有一个函数被声明为纯虚函数，则这个类就是抽象类</u>。纯虚函数是通过在声明中使用 "= 0" 来指定的，如下所示：

```c++
class Box
{
   public:
      // 纯虚函数
      virtual double getVolume() = 0;
   private:
      double length;      // 长度
      double breadth;     // 宽度
      double height;      // 高度
};

```



抽象类不能被用于实例化对象，它只能作为**接口**使用。如果试图实例化一个抽象类的对象，会导致编译错误。







## 四、文件和流





