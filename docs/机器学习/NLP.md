# 自然语言处理



## Word Embedding

[Word Embedding（词嵌入） - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/55947915)

①Count Vector

假设语料库内容如下：
D1: He is a boy.
D2: She is a girl, good girl.
那么可以构建如下2 × 7维的矩阵：

![img](https://s2.loli.net/2022/06/21/eEBrX4ShU7kjHYT.png)

所以一般来说count vector得到的矩阵是一个稀疏矩阵。



②TF-IDF Vector

TF是在单个文档中出现的词频，IDF是某个词在多个文档中出现的次数。

显然，IDF用于**惩罚**那些常用词汇，而TF用于**奖励**那些在特定文档中出现频繁的词汇。二者的乘积**TF X IDF**用来表示词汇的权重，显然合理性大大增强。



③Co-Occurence Vector

- **Context Window（背景窗、划窗）**
    上面我们提到了**context**，但**context**的长度需要有一个界定，也就是说，对于一个给定的**word**，需要有一个**Context Window**大小的概念。

![img](https://pic2.zhimg.com/80/v2-4b185824439b3861bcb2cfddf3db0d75_720w.png)

如上图所示，如果指定**Context Window=2**，范围为前后两个**word**，那么对于**such** 这个词，它的**Context Window**如上图所示。

如果单词是She,那么She的Context Window为is、such。

- **Co-Occurence（共现）**：
    有了**Context Window**的概念，**Co-Occurence**就好理解了。对于**such**这个单词来说，在其上下文窗口内，它分别与**[she, is, a, beautiful]**这四个单词各出现了**一次共现**。如果我们在语料库中所有**such**出现的地方，计算其共现的单词，并按次数累加，那么我们就可以利用其上下文范围内的单词来表示**such**这个词，这就是**Co-Occurence Vector**的计算方法。