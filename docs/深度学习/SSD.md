# SSD目标检测

SSD是一个one-stage目标检测算法，同时给出结果和分类。



第一步：resize到300x300x3的大小

采用VGG网络，在原本的VGG网络中增加了四个卷积部分



锚框anchor（也叫 先验框）