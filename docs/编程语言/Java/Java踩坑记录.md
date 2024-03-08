# Java踩坑记录

## JDK

### Number

1. 拆箱空指针异常

Number值为null时拆箱会报空指针异常

```java
Integer i = null;
int a = i;
System.out.println(i);
```

```java
Exception in thread "main" java.lang.NullPointerException
```

### List

1. addAll空指针异常

addAll传参为空时会报错

```java
List<Object> objects = null;
objects.addAll(getObject());


public Object getObject() {
    return null;
}
```

```java
Exception in thread "main" java.lang.NullPointerException
```

传入非空即可，在某些情况下，条件不满足时可能会返回一个空给调用方，为了防止new太多对象，可以在异常情况返回`Collections.emptyList()`而不是`new ArrayList<>()`

```java
List<Object> objects = null;
objects.addAll(getObject());


public Object getObject() {
    return Collections.emptyList();
}
```

### String

1. toString空指针异常

`null.toString()`肯定会报错

```java
String str = null;
System.out.println("" + str.toString());
```

```java
Exception in thread "main" java.lang.NullPointerException
```

考虑到可能出现这种情况，若实体类重写了toString方法，则换为如下写法

```java
String str = null;
System.out.println("" + str);
```

```java
null
```


