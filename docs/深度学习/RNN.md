# RNN



## 0 文本预处理

<img src="https://s2.loli.net/2023/02/26/qOmgnesoLvtkxXY.png" alt="image-20230226171802884" style="zoom:67%;" />

<img src="https://s2.loli.net/2023/02/26/cqgvf4QGhosxUbJ.png" alt="image-20230226172026407" style="zoom:67%;" />

**step1：文本处理text to sequence**

1. tokenization（text to words），把一个文本分成一个个的单词

2. count word frequency（统计词频）：保留常用词，去除低频词（名字、错误词），把每个单词映射成一个正整数 

3. one-hot encoding

    <img src="https://s2.loli.net/2023/02/26/Y83BFGyMPVlnHNi.png" alt="image-20230226162358394" style="zoom: 50%;" />

4. align sequence

    <img src="https://s2.loli.net/2023/02/26/Ci6Yg5M2cxPZpk3.png" alt="image-20230226162630587" style="zoom:50%;" />





**step2：word embedding（word to vector）**

在step1中的 align sequence之后（假设都对其到 input_length  = 20 ），那么每个样例的输入长度都是20个words；

但是我们需要对这words转为vector，可以直接想到的是用one-hot方法，对于我们得到的vocabulary（词汇量，字典，一般很大，比如10k），那么使用one-hot编码，那么得到的vector也会很大，一个单词就是10k维度。

所以我们采用word embedding（他的思路就是，把one-hot向量给降维，或者说是做了一个线性变换，就是乘上一个矩阵）

<img src="https://s2.loli.net/2023/02/26/K4rUqtBhFTgInO3.png" alt="image-20230226170434127" style="zoom:50%;" />

这里的d是最后我们对于每个单词表示的词向量的维度（embedding_dim），v是vocabulary的词汇量大小

embedding层的参数 =  vocabulary * embedding_dim



## 1 序列数据

 序列数据：前后数据通常具有**关联性**



## 2 语言模型

NLP

时间步：一个单词算一个time step；





联合概率：

<img src="https://s2.loli.net/2022/05/02/LEol7YsvWt1mQzk.png" alt="image-20220502111757867" style="zoom:50%;" />

以上的概率，由语料库中的词频统计来得到。



缺点：第i个词，依赖第i-1个词。随着时间步的增大，计算量呈指数递增。







## 3 循环神经网络

​		RNN是针对序列数据而生的神经网络结构，核心在于循环使用网络层参数，避免时间步增大带来的参数激增，并引入**隐藏状态**，用于记录历史信息，有效的处理数据的前后关联性。

![image-20230226172817676](https://s2.loli.net/2023/02/26/9Xn6FMSdtZ5W2mN.png)



![image-20220503114850772](https://s2.loli.net/2022/05/03/ZWqQodMPRl4D2XE.png)



三个权重$\boldsymbol{W}_{x h}、\boldsymbol{W}_{h h}、\boldsymbol{W}_{h q}$，会循环使用。
$$
\begin{array}{l}
\boldsymbol{H}_{t}=\phi\left(\boldsymbol{X}_{t} \boldsymbol{W}_{x h}+\boldsymbol{H}_{t-1} \boldsymbol{W}_{h h}+\boldsymbol{b}_{h}\right) \\
\boldsymbol{O}_{t}=\boldsymbol{H}_{t} \boldsymbol{W}_{h q}+\boldsymbol{b}_{q}
\end{array}
$$
这里$\boldsymbol{X}_{t}$是在时间步为t时的**输入数据**，而$\boldsymbol{O}_{t}$是时间步为t时的**输出数据**；其中的$\boldsymbol{H}_{t}$为时间步为t的**隐藏状态**（用于记录历史信息）



其中`隐藏状态`的作用是：用于记录历史信息，有效处理数据的前后关联性。激活函数采用==Tanh==（也就是上述公式中的$ \phi $），将输出值域控制在（-1,1），防止数值呈指数级变化。



RNN特性：

1. 循环神经网络的==隐藏状态==可以捕捉截至当前时间步的序列的历史信息
2. 循环神经网络模型参数的数量不随时间步的增加而增长



问题：

- 为什么simple RNN 使用tanh函数

    由于RNN 的ht的计算依赖于上一次的ht-1，可以简单理解为是一个累乘的过程，所以对于参数矩阵A中的参数，很容易出现参数累乘后爆炸、或者参数累乘后消失的情况。通过tanh函数，就可以把每一次得到的新ht的参数范围控制在-1~1之间，从而避免ht中参数过大或者消失的情况。

- Simple RNN的缺点

    simple RNN只能记住短序列的，对于长序列的输入，后面的隐藏状态会遗忘前面的输入。LSTM则比simple RNN的记忆时间长很多





### 3.1 循环神经网络的反向传播

穿越时间的反向传播



致命**缺点**：梯度随时间t呈指数变化（主要是看参数$\boldsymbol{W}_{hh}$），容易引发`梯度消失`、`梯度爆炸`



## 4 GRU-门控循环单元

引入了**门**的循环神经网络——GRU

对于梯度爆炸，我们可以采用**梯度裁剪**的方式去解决；但是对于梯度消失，我们无法解决。



### 4.1 梯度裁剪

 梯度裁剪是解决梯度爆炸的一种技术，其出发点是非常简明的：如果梯度变得非常大，那么我们就调节它使其保持较小的状态。精确的说，如果$∥ g ∥ ≥ c$ ，则
$$
g ← c ⋅ g / ∥ g ∥
$$
​		此处的c指超参数，$g$指梯度，$∥ g ∥$为梯度的[范数](https://so.csdn.net/so/search?q=范数&spm=1001.2101.3001.7020)，$g / ∥ g ∥$必然是个单位矢量，因此在进行调节后新的梯度范数必然等于c，注意到如果$∥ g ∥ ≤ c$则不需要进行调节。
  梯度裁剪确保了梯度矢量的最大范数（本文中规定为c）。即使在模型的损失函数不规则时，这一技巧也有助于梯度下降保持合理的行为。下面的图片展示了损失函数的陡崖。不采用裁剪，参数将会沿着梯度下降方向剧烈变化，导致其离开了最小值范围；而使用裁剪后参数变化将被限制在一个合理范围内，避免了上面的情况。

<img src="https://s2.loli.net/2022/05/04/phYExNtbcVFdOoz.png" alt="在这里插入图片描述" style="zoom:50%;" />



### 4.2 重置门&&更新门

作用：缓解RNN**梯度消失**带来的问题，引入门的概念，来控制信息流动，使模型更好的记住长远时期的信息，并缓解梯度消失。





重置门：哪些信息需要遗忘

更新门：哪些信息需要注意

<img src="https://s2.loli.net/2022/05/04/E65tH8kD1TGeu3j.png" alt="image-20220504090846784" style="zoom:53%;" />
$$
\begin{array}{l}
重置门：\boldsymbol{R}_{t}=\sigma\left(\boldsymbol{X}_{t} \boldsymbol{W}_{x r}+\boldsymbol{H}_{t-1} \boldsymbol{W}_{h r}+\boldsymbol{b}_{r}\right) \\
更新门：\boldsymbol{Z}_{t}=\sigma\left(\boldsymbol{X}_{t} \boldsymbol{W}_{x z}+\boldsymbol{H}_{t-1} \boldsymbol{W}_{h z}+\boldsymbol{b}_{z}\right)
\end{array}
$$


这里的$\sigma$是激活函数，此处采用的是sigmoid激活函数，使门的值为（0,1），0表示遗忘，1表示保留。



GRU和传统RNN的区别：

> GRU引入了门控单元，分别是重置门和更新门；
>
> 重置门的作用是：在计算候选隐藏状态$\tilde{\boldsymbol{H}}_{t}$时，控制上一时间步隐藏状态哪些信息需要去遗忘；
>
> 更新门的作用是：更新当前时间步的隐藏状态时，组合上一时间步隐藏状态和当前时间步候选隐藏状态$\tilde{\boldsymbol{H}}_{t}$。



详细过程见下述公式：
$$
\tilde{\boldsymbol{H}}_{t}=\tanh \left(\boldsymbol{X}_{t} \boldsymbol{W}_{x h}+\left(\boldsymbol{R}_{t} \odot \boldsymbol{H}_{t-1}\right) \boldsymbol{W}_{h h}+\boldsymbol{b}_{h}\right)\\
\boldsymbol{H}_{t}=\boldsymbol{Z}_{t} \odot \boldsymbol{H}_{t-1}+\left(1-\boldsymbol{Z}_{t}\right) \odot \tilde{\boldsymbol{H}}_{t}
$$




<img src="https://s2.loli.net/2022/05/04/nOo136w7RJeaLdt.png" alt="image-20220504092205544" style="zoom:50%;" />



## 5 LSTM-长短记忆神经网络



引入了3个门和记忆细胞，控制信息传递



输入门：哪些信息需要流入当前记忆细胞

输出门：哪些记忆信息流入隐藏状态



![image-20220504094308427](https://s2.loli.net/2022/05/04/yua9jPmr25wn7xc.png)



simpleRNN：很容易遗忘

LSTM：可以记住比较长的信息

能用LSTM就别用RNN，效果一定优于simpleRNN

**LSTM能够有更长记忆的原因**：在前向传播中，如果将输入的一串序列当做一部戏剧，那么LSTM的**cell就是记录下的主线**，而遗忘门，输入门都用于给主线增加一些元素（比如新的角色，关键性的转机）。通过训练，**遗忘门**能够针对性地对主线进行修改，选择“保留”或是“遗忘”过去主线中出现的内容，**输入门**用于判断是否要输入新的内容，并且输入内容。**输出门**则用于整合cell状态，判断需要把什么内容提取出来传递给下一层神经元。



## 6 Stacked LSTM

多层LSTM：

多层累加



## 7 Bidirectional RNN  

双向RNN

从前到后，从后到前；同时训练；

能用双向RNN，就别用单向的，一定比单向的效果来得好

把两条LSTM的隐层输出，ht1和ht2做concatenation，作为最终的特征



**Pretrain 预训练**（让神经网络有较好的初始化）

两个数据集或者任务越接近，之后的transfer迁移效果就会越好

提前训练embedding层，在大数据集上预训练embedding层

预训练就是，用大数据集去提前训练一个网络，然后保留一些我们想要的层（比如保留embedding层），然后用我们自己的小数据集去训练，记住：这个时候要保持embedding的参数和结构不变！

一般我们都对embedding层进行预训练，因为embedding层的参数一般都很大（vocabulary_size * embedding_dim ： 10000*300；如果词汇量有10000个，词向量维度设为300，那么embedding层的参数量就有300w个，很容易过拟合，所以我们采用大数据集先预训练！）



## 8 Attention



## 9 self-attention



## 10 transformer