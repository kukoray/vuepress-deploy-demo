# 流形 Manifold

[流形](https://baike.baidu.com/item/流形/2884058?fromModule=lemma_inlink)学习，全称流形[学习方法](https://baike.baidu.com/item/学习方法/141?fromModule=lemma_inlink)(Manifold Learning)，自2000年在著名的[科学](https://baike.baidu.com/item/科学/5400107?fromModule=lemma_inlink)杂志《Science》被首次提出以来，已成为[信息科学](https://baike.baidu.com/item/信息科学/1296011?fromModule=lemma_inlink)领域的研究热点。在理论和应用上，流形学习方法都具有重要的研究意义。假设数据是[均匀采样](https://baike.baidu.com/item/均匀采样/4891653?fromModule=lemma_inlink)于一个高维[欧氏空间](https://baike.baidu.com/item/欧氏空间/8282013?fromModule=lemma_inlink)中的低维流形，流形学习就是从高维[采样数据](https://baike.baidu.com/item/采样数据/7656238?fromModule=lemma_inlink)中恢复低维流形结构，即找到[高维空间](https://baike.baidu.com/item/高维空间/692559?fromModule=lemma_inlink)中的低维流形，并求出相应的[嵌入映射](https://baike.baidu.com/item/嵌入映射/18882055?fromModule=lemma_inlink)，以实现[维数约简](https://baike.baidu.com/item/维数约简/5067217?fromModule=lemma_inlink)或者[数据可视化](https://baike.baidu.com/item/数据可视化/1252367?fromModule=lemma_inlink)。它是从观测到的现象中去寻找事物的本质，找到产生数据的内在规律。[流形](https://baike.baidu.com/item/流形/2884058?fromModule=lemma_inlink)学习，全称流形[学习方法](https://baike.baidu.com/item/学习方法/141?fromModule=lemma_inlink)(Manifold Learning)，自2000年在著名的[科学](https://baike.baidu.com/item/科学/5400107?fromModule=lemma_inlink)杂志《Science》被首次提出以来，已成为[信息科学](https://baike.baidu.com/item/信息科学/1296011?fromModule=lemma_inlink)领域的研究热点。在理论和应用上，流形学习方法都具有重要的研究意义。假设数据是[均匀采样](https://baike.baidu.com/item/均匀采样/4891653?fromModule=lemma_inlink)于一个高维[欧氏空间](https://baike.baidu.com/item/欧氏空间/8282013?fromModule=lemma_inlink)中的低维流形，流形学习就是从高维[采样数据](https://baike.baidu.com/item/采样数据/7656238?fromModule=lemma_inlink)中恢复低维流形结构，即找到[高维空间](https://baike.baidu.com/item/高维空间/692559?fromModule=lemma_inlink)中的低维流形，并求出相应的[嵌入映射](https://baike.baidu.com/item/嵌入映射/18882055?fromModule=lemma_inlink)，以实现[维数约简](https://baike.baidu.com/item/维数约简/5067217?fromModule=lemma_inlink)或者[数据可视化](https://baike.baidu.com/item/数据可视化/1252367?fromModule=lemma_inlink)。它是从观测到的现象中去寻找事物的本质，找到产生数据的内在规律。

> 个人理解：例如在高维空间有一系列的点的集合，从高维角度去看，每个点都是由n维来描述的。但实际上可能通过对这个n维的坐标系进行放射变换，就可以让这些点的进行降维（例如三维空间中的一个斜着的平面，可以将其转化为2位空间，也就是第三维本质上是浪费的，而转化的这个过程可以理解为是一种放射变化，也就是一种映射关系）

![img](https://pic3.zhimg.com/v2-721c4988bd5a019a4deb6274c89e2d96_r.jpg)

**流形学习的本质是，建立一种映射，从高维空间到低维空间的映射。**

这种映射是“非线性降维”，PCA是线性降维





方法一：Isomap

找到一个低维空间，使得样本间的距离，在高维空间和低维空间基本一致。

地球仪表面与平面地图，是三维映射到二维的关系。

我们绘制平面地图的原则，就是保持城市之间的距离，在平面地图上，跟地球仪是一致的。(平面地图稍有扭曲，但基本保持，城市距离跟地球仪一致)

这种一致，是“全局一致”，就是对于地球上1万个城市，彼此之间的距离，在平面地图上，跟地球仪是一致的。

运算量太大!1万个城市，要考虑安排1亿对儿距离的优化。



方法二：LLE

为了克服isomap方法，计算量过大的问题。（想偷懒)
考虑到，每个城市，都有距离最近的3个哥们。
例如，沈阳的哥们城市:铁岭、抚顺、鞍山例如，深圳的哥们城市:东莞、广州、珠海
那么我们绘制平面地图的原则，就改成了∶
平面地图稍有扭曲，但基本保持，“哥们城市"距离跟地球仪一致。离得太远的城市，不用照顾情绪。
计算量一下子小多了。



是一种很优秀的非线性降维的方法



## 参数流形和数据流形

在流形学习（Manifold Learning）中，流形是指数据空间中的一种局部欧几里德几何结构，通常用来描述高维数据在低维空间中的嵌入。流形学习旨在发现高维数据的低维表示，以便更好地理解和处理数据。

 

在流形学习中，有两种主要类型的流形，即参数流形（parametric manifold）和数据流形（data manifold）：

**参数流形（Parametric Manifold）：**

参数流形是由参数化函数定义的，通常用数学模型表示。这些数学模型将高维数据映射到低维空间。参数流形假设数据在低维空间中具有某种确定的数学结构，如线性映射、非线性映射或其他数学函数。流形学习算法试图学习这些参数，以便能够在低维空间中重构或表示数据。

> **优点：**
>
> 参数流形的表达能力通常较强，可以捕获复杂的数据结构。
>
> 学习到的参数可以提供对数据的解释和理解。
>
> **缺点：**
>
> 参数流形通常依赖于先验的数学模型，这些模型可能不够灵活，无法适应所有类型的数据。
>
> 参数流形的学习过程可能较为复杂，需要大量的数据和计算。
>
>  

**数据流形（Data Manifold）：**

数据流形是在数据空间中定义的实际数据分布。数据流形假设高维数据通常分布在一个或多个连续的低维流形上。流形学习算法的目标是通过观察数据中的局部结构来推测数据流形的全局结构，并在低维空间中表示数据。

> **优点：**
>
> 数据流形不依赖于预先设定的数学模型，更加灵活和自适应。
>
> 数据流形可以应用于各种类型的数据，不限于特定的数学模型。
>
> **缺点：**
>
> 数据流形的表达能力受到局部观测和采样的限制，可能难以完全捕获全局数据结构。
>
> 在高维空间中，流形结构可能变得非常复杂，导致流形学习变得困难。
>
>  

在实际应用中，流形学习算法可以同时使用参数流形和数据流形的概念，以充分利用两者的优点，提高对数据的建模和表达能力。不同的流形学习方法可以根据数据特点和问题需求选择合适的模型和策略。



 