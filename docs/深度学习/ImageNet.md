# ImageNet

## **背景**

ImageNet图像数据集始于2009年，是由李飞飞团队从2007年开始，耗费大量人力，通过各种方式收集制作而成。并在CVPR-2009上发表了一篇名为 《ImageNet: A Large Scale Hierarchical Image Database》的论文，之后就是基于ImageNet数据集开展了7届的ImageNet挑战赛（也叫ILSVRC），ILSVRC从2010年开始举办，到2017年是最后一届（在算法层面已经刷过拟合了，再比下去意义不是很大了）。2017年之后ImageNet由Kaggle公司继续维护。

 

##  **数据集介绍**

ImageNet数据集是一个超过15million的图像数据集，大约有22,000类。

深度学习发展起来有几个关键的因素，一个就是庞大的数据（比如说ImageNet），一个是GPU的出现。（还有更优的深度模型，更好的优化算法，可以说数据和GPU推动了这些的产生，这些产生继续推动深度学习的发展）。

可以说ImageNet这一数据集在人工智能领域、图像识别领域，极大的推动了机器视觉的发展。

其中数据集可以在ImageNet官网下载。官方下载链接：[ImageNet Large Scale Visual Recognition Challenge (ILSVRC)](https://image-net.org/challenges/LSVRC/index.php)

![img](https://s2.loli.net/2022/05/13/Uh4N7nITxvYwtpm.jpg)

## ILSVRC比赛

ILSVRC是基于ImageNet数据集而开展的一个比赛，全称是ImageNet Large-Scale Visual Recognition Challenge，平常说的ImageNet比赛也指这个比赛。

使用的数据集是ImageNet数据集的一个**子集**，一般说的ImageNet（数据集）实际上指的是ImageNet的这个子集，总共有1000类，每类大约有1000张图像。具体地，有大约1.2 million的训练集，5万验证集，15万测试集。

ILSVRC在历届比赛中提出了一些经典的网络。12-15年期间在ILSVRC比赛上提出了一些经典网络，比如**AlexNet**，ZFNet，OverFeat，**VGG**，Inception，**ResNet**。16年之后也有一些经典网络，比如WideResNet，FractalNet，**DenseNet**，ResNeXt，DPN，**SENet**。其中目前常用的网络例如VGG16、ResNet、GoogleNet等常用于迁移学习之中，具有很好的鲁棒性。