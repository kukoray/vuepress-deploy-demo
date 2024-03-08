# Inception



> 本文介绍了 Inception 家族的主要成员，包括 Inception v1、Inception v2 、Inception v3、Inception v4 和 Inception-ResNet。它们的计算效率与参数效率在所有卷积架构中都是顶尖的。

Inception 网络是 CNN分类器 发展史上一个重要的里程碑。在 Inception 出现之前，大部分流行 CNN 仅仅是把卷积层堆叠得越来越多，使网络越来越深，以此希望能够得到更好的性能。

例如 AlexNet，GoogleNet、 VGG-Net、ResNet等 都是通过加深网络的层次和深度来提高准确率。



## Inception v1

Inception v1 首先是出现在《Going deeper with convolutions》这篇论文中，作者提出一种深度卷积神经网络 Inception，它在 ILSVRC14（GoogLeNet） 中达到了当时最好的分类和检测性能。

Inception v1 的主要特点： 

- 一是挖掘了1*1卷积核的作用 ，减少了参数，提升了效果； 
- 二是让模型自己来决定用多大的的卷积核。