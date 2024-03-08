# python



## 类与对象



```python
class Car(object):
    def __init__(self, age, color, brand="奥迪"):  # 构造方法
        self.__brand = brand
        self._age = age  # 实例属性
        self.color = color  # 实例属性

    @property
    def age(self):
        return self._age


    def __privateFunc(self):
        return "private function!"


car = Car(9, "red")
print(car.color)
print(car.age)
print(car._Car__brand) # 是一种访问私有属性的方法，但是不推荐使用
# print(car.__brand) # 会报错，访问不到私有属性

print(car._Car__privateFunc())  # 是一种访问私有方法的方式，但是不推荐使用
```







## tensorflow

```
tf.reset_default_graph()
```

无论执行多少次生成的张量始终不变。换句话说就是：tf.reset_default_graph函数用于清除默认图形堆栈并重置全局默认图形。







## conda

conda安装环境时，采用conda install 或 pip install



whereis和 which对比

`which`更专注于查找命令的可执行文件路径，而`whereis`则更多地提供了其他有关命令的相关信息。





## 偏函数partial

```python
from functools import partial

def add(*args):
    return sum(args)

add_100 = partial(add, 100)
print(add_100(1, 2, 3))  # 106

add_101 = partial(add, 101)
print(add_101(1, 2, 3))  # 107
```

