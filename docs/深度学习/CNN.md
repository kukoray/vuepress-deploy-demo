# CNN卷积神经网络

![这里写图片描述](https://s2.loli.net/2022/05/17/tzLbE6uHT1QGM7D.png)

## CNN

卷积层还有一个特性就是“权值共享”原则。



### 卷积层

![img](https://s2.loli.net/2023/07/24/GBgez9ambAVN713.webp)



卷积层：输入的数据也叫特征feature map，维度一般是 channel * long * width 例如 256x224x224

卷积层输出的数据特征维度是  512x111x111

其中这里的512是指filter的个数，这里的filter在多通道的卷积中是卷积核的集合，例如此处，一个filter的大小就是256x3x3

个数是512个，所以整个卷积层的参数是 512x256x3x3

**卷积的计算公式**

卷积神将网络的计算公式为：
**N=(W-F+2P)/S+1**

> 其中N：输出大小
> W：输入大小
> F：[卷积核](https://so.csdn.net/so/search?q=卷积核&spm=1001.2101.3001.7020)大小
> P：填充值的大小
> S：步长大小



![image-20230724170016656](https://s2.loli.net/2023/07/24/oQLzIy1xewZ3b6F.png)

### 池化层

也叫下采样层，缩小feature map 的大小

**该层没有任何参数**，只有size（3x3）和stride（步长为2）；

常用:

> maxPooling：最大池化，把3*3的区域里最大值作为该区域的代表，起到突出的效果
>
> averagePooling：平均池化，把3*3区域的平均值作为该区域代表，起到模糊的效果







图中不同颜色代表不同的特征，需要学习对应数量的卷积核进行[特征提取](https://so.csdn.net/so/search?q=特征提取&spm=1001.2101.3001.7020)。

对于[灰度图像](https://so.csdn.net/so/search?q=灰度图像&spm=1001.2101.3001.7020)，图像为2D
例如一个图像大小是5×5，
有一个3×3的卷积核对着图像进行卷积，步长为1，卷积结束后生成一个3×3的矩阵。
如果有2组卷积核对着图像卷积，就会生成2个3×3的矩阵。
**同理有多少组卷积核对图像卷积就有多少个矩阵。**
这个叫做通道。



对于RGB图像，图像为3维
若要提取2个特征，可以设置2个3维卷积核进行特征提取，提取结果为2通道的feature map，2个通道互相独立，代表着不同卷积核提取的不同特征。

<img src="https://img-blog.csdnimg.cn/20210715191700154.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tyaXNfcGF1bA==,size_16,color_FFFFFF,t_70" alt="sad" style="zoom:70%;" />

[上图的动图链接](https://cs231n.github.io/assets/conv-demo/index.html)



**一般来说一个卷积核对应着一个特征的提取**（例如：一个卷积核用来提取边缘特征，另外一个卷积核用来提取x方向的边缘特征等）





**进行卷积处理的卷积通道数默认和输入图像的通道数相等。**
比如输入图像维度为256，进行特征提取的卷积核也默认是256维。
若设定输出64个特征，那么就一共有64个256维的卷积核用来提取特征，即提取特征的输出通道数为64，输出64个feature map。



<img src="https://img-blog.csdnimg.cn/20210715191734669.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tyaXNfcGF1bA==,size_16,color_FFFFFF,t_70" alt="im g" style="zoom:33%;" />

## 3DCNN



### 硬线层

每帧提取5个通道信息（gray、gradient_X、gradient_Y、optflow_X、optflow_Y）

## Shortcut



残差块，也叫skip connect，





## CNN常见问题

### 1*1卷积为什么能降维？

背景：最早出现在 Network In Network的论文中 ，使用1*1卷积是想**加深加宽网络结构** 。

  所谓1x1默认是w和h上的1x1，但对于高维度，其实应该是这样：就是H和W不变，而是channel这个维度上降维，如图对于channel与原三维矩阵相同的1x1卷积核，直接channel就给干到了1维，而原来是32维。



1*1卷积的主要作用有以下几点：

1、降维。比如，**一张500 x 500且厚度depth为100 的图片在20个filter上做1x1的卷积，那么结果的大小为500x500x20。**

2、加入非线性。卷积层之后经过激励层，1*1的卷积在前一层的学习表示上添加了非线性激励，提升网络的表达能力；

3、增加模型深度。可以减少网络模型参数，增加网络层深度，一定程度上提升模型的表征能力。





### 网络退化问题？

​		举个例子，假设已经有了一个最优化的网络结构，是18层。当我们设计网络结构的时候，我们并不知道具体多少层次的网络是最优化的网络结构，假设设计了34层网络结构。那么多出来的16层其实是冗余的，我们希望训练网络的过程中，模型能够自己训练这五层为恒等映射，也就是经过这层时的输入与输出完全一样。

​		但是往往模型很难将这16层恒等映射的参数学习正确，那么就一定会不比最优化的18层网络结构性能好，这就是**随着网络深度增加，模型会产生退化现象**。它不是由过拟合产生的，而是由**冗余的网络层学习了不是恒等映射的参数**造成的。



### 为什么残差连接能解决网络退化问题？



我们发现，要想让该冗余层能够恒等映射，我们只需要学习F(x)=0。**学习F(x)=0比学习h(x)=x要简单，因为一般每层网络中的参数初始化偏向于0**，这样在相比于更新该网络层的参数来学习h(x)=x，该冗余层学习F(x)=0的更新参数能够更快收敛

并且ReLU能够将负数激活为0，过滤了负数的线性变化，也能够更快的使得F(x)=0。这样当网络自己决定哪些网络层为冗余层时，使用ResNet的网络很大程度上解决了学习恒等映射的问题，用学习残差F(x)=0更新该冗余层的参数来代替学习h(x)=x更新冗余层的参数。



### 高斯金字塔

![img](https://s2.loli.net/2022/05/25/jnNoLmtCz3S9WdO.jpg)

高斯金字塔，本质就是在原图片的基础上，进行高斯模糊（一个滤波器，filter，其实就是一个卷积核），然后进行2*2的下采样。

得到了同一张图片不同尺度的子图。



### 拉普拉斯金字塔

拉普拉斯金字塔可以认为就是一个残差金字塔。

<img src="https://s2.loli.net/2022/05/26/Kmf25XAeBlVhbtW.png" alt="img" style="zoom:50%;" />

我们知道一张图片进行下采样后，在进行上采样，图片是没办法恢复的一模一样的，也就是说下采样是一个不可逆的过程。

![im g](https://pic2.zhimg.com/80/v2-cd004410f46aa5657a946568ff403251_720w.jpg)

可以看出，原始图片下采样后得到的小尺寸图片虽然保留了视觉效果，但是将该小尺寸图像再次上采样也不能完整的恢复出原始图像。为了能够从下采样图像Down(Gi)中还原原始图像Gi，我们需要记**录再次上采样得到Up(Down(Gi))与原始图片Gi之间的差异**，这就是拉普拉斯金字塔的核心思想



![img](https://pic3.zhimg.com/80/v2-1641deeb3eec372b6ff3fc436c8651b6_720w.jpg)

下面的就是**拉普拉斯金字塔**



![img](https://pic3.zhimg.com/80/v2-d88c440419db98a262482d31b4a19e22_720w.jpg)







## 1特征提取



### 1.1形状特征

#### 1.1.1 HOG

HOG主要是用于提取图片的一个形状特征，经常用HOG+SVM的方式来进行行人检测。







#### 1.1.2 SIFT





#### 1.1.3 Harris







### 1.2纹理特征



#### 1.2.1 LBP



### 1.3 颜色特征







### 1.4 空间关系特征





## DW卷积

也叫做深度可分离卷积，Separable Convolution的卷积运算方式。它将传统卷积分解为**Depthwise Convolution**与**Pointwise Convolution**两部分，有效的减小了参数数量。

[卷积神经网络中的Separable Convolution (yinguobing.com)](https://yinguobing.com/separable-convolution/#fn2)

相同的输入，同样是得到4张Feature map，Separable Convolution的参数个数是常规卷积的约1/3。因此，在参数量相同的前提下，采用Separable Convolution的神经网络层数可以做的更深。







## 卷积基本训练代码

```python
#!/usr/bin/env python
# -*- coding: UTF-8 -*-
'''
@Project ：slimmable_networks 
@File    ：train_BN.py
@Author  ：Jacky
@Date    ：2023-06-01 20:09 
'''
import torch
import torch.nn as nn
import torch.optim as optim
import torchvision.datasets as datasets
import torchvision.transforms as transforms
import time
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

# 定义卷积神经网络
class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.conv1 = nn.Conv2d(in_channels=3, out_channels=32, kernel_size=3, padding=1)
        self.bn1 = nn.BatchNorm2d(32)
        self.relu1 = nn.ReLU(inplace=True)
        self.conv2 = nn.Conv2d(in_channels=32, out_channels=64, kernel_size=3, padding=1)
        self.bn2 = nn.BatchNorm2d(64)
        self.relu2 = nn.ReLU(inplace=True)
        self.pool = nn.MaxPool2d(kernel_size=2, stride=2)
        self.fc1 = nn.Linear(64 * 16 * 16, 128)
        self.relu3 = nn.ReLU(inplace=True)
        self.fc2 = nn.Linear(128, 10)

    def forward(self, x):
        x = self.conv1(x)
        x = self.bn1(x)
        x = self.relu1(x)
        x = self.conv2(x)
        x = self.bn2(x)
        x = self.relu2(x)
        x = self.pool(x)
        x = x.view(-1, 64 * 16 * 16)
        x = self.fc1(x)
        x = self.relu3(x)
        x = self.fc2(x)
        return x

# 加载CIFAR-10数据集
transform = transforms.Compose([transforms.ToTensor(), transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))])
trainset = datasets.CIFAR10(root='./data/cifar10', train=True, download=True, transform=transform)
trainloader = torch.utils.data.DataLoader(trainset, batch_size=64, shuffle=True)

# 定义模型、损失函数和优化器
net = Net()
criterion = nn.CrossEntropyLoss()
optimizer = optim.SGD(net.parameters(), lr=0.01, momentum=0.9)

# 训练模型
start_time = time.time()
for epoch in range(10):
    running_loss = 0.0
    for i, data in enumerate(trainloader):
        inputs, labels = data
        optimizer.zero_grad()
        outputs = net(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        running_loss += loss.item()

        if i % 100 == 99:
            print('[%d, %5d] loss: %.3f' % (epoch + 1, i + 1, running_loss / 100))
            running_loss = 0.0

print('Finished Training. Time taken:', time.time() - start_time, 'seconds')
```

