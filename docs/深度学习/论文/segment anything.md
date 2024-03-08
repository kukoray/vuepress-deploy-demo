# Segment Anything 论文解读

![image-20230502114526789](https://s2.loli.net/2023/05/02/kcB1G4tyOS3hPz8.png)

于2023年4月5日发表在CVPR上，号称CV界的chatgpt，由meta公司（原facebook）发表

PDF:[Segment Anything (arxiv.org)](https://arxiv.org/abs/2304.02643)

Code: [https://github.com/facebookresearch/segment-anything](https://github.com/facebookresearch/segment-anything)

Dataset: [https://ai.facebook.com/datasets/segment-anything/](https://ai.facebook.com/datasets/segment-anything/)

Demo的效果非常惊人: [https://segment-anything.com/](https://segment-anything.com/)

## 一 引言

***论文试图解决什么问题？***

- 在图像分割领域建立一个**基础模型**, 使其可以实现非常强大的泛化能力, **可以迁移到其他下游的图像分割任务中**
- 计算机视觉领域非常广泛，对于其中许多问题，**没有丰富的训练数据**

> “基础模型”:在大规模的广泛数据上训练，并适应广泛的下游任务的模型

***这是否是一个新的问题？***

- 不是，在NLP领域已经有了chatgpt等基于prompt的通用模型

***这篇文章要验证一个什么科学假设？***

- 分割任务也能通过prompt，来实现通用分割，进而实现基础通用视觉模型。

***有哪些相关研究？如何归类？谁是这一课题在领域内值得关注的研究员？***

- 交互式分割、边缘检测、超像素化、目标建议生成、前景分割、语义分割、实例分割、全景分割等。
- 本文工作与之前在多任务分割系统上的工作不同。在多任务系统中，单个模型执行一组固定的任务，例如联合语义、实例和全景分割，但训练和测试任务是相同的。本文工作中的一个重要区别是，为提示分割任务训练的模型可以作为更大系统中的一个组件，在推理时执行新的、不同的任务，例如，为了执行实例分割，将提示分割模型与现有的目标检测器相结合。

***论文中提到的解决方案之关键是什么？***

![image-20230502114734044](https://s2.loli.net/2023/05/02/Zbw2z5H6K41psxe.png)

该计划的成功取决于三个组成部分：**任务、模型和数据**。 为了开发它们，作者解决了以下有关图像分割的问题：

1. 什么任务可以实现零样本泛化？
2. 对应的模型架构是怎样的？
3. 哪些数据可以为这项任务和模型提供支持？

- **task**：在NLP和计算机视觉中， Foundation models是一个有希望的发展，可以通过使用"prompting"技术对新数据集和任务进行零样本和少样本学习。受这一工作的启发，本文提出了**promptable分割任务**，目标是对于给定的任何提示，返回有效的分割mask。

这里的提示包括：点、框、mask、text

<img src="https://s2.loli.net/2023/05/02/wkB1K6tudFcySC5.png" alt="image-20230502120820491"  />

- **model**：通过将SAM分解为（heavyweight）**图像编码器**和（lightweight）**快速prompt编码器/mask解码器**，相同的图像嵌入可以在不同的提示符下重用。为了使SAM能够感知歧义，作者设计它为一个prompt预测多个掩码，由此SAM能够自然地处理歧义

![image-20230502120829637](https://s2.loli.net/2023/05/02/mkoRayNiDXUYlP2.png)

- **data**：为了训练这个模型，需要一个多样化的、大规模的数据源——目前没有这样的数据源，作者构建了一个**“数据引擎”**，通过这个引擎可以高效获取想要的标注数据（左脚踩右脚）

![image-20230502120855337](https://s2.loli.net/2023/05/02/59devfEHQZJ8lip.png)



## **二 Task**

启发来源：NLP领域、Prompt Engineering

**Task：**

将prompt的想法从NLP领域转到图像分割领域，prompt可以是一组前景/背景点、一个粗糙的框或mask、文本等等。**promptable分割任务**是在任何prompt下返回一个**有效的分割mask**。“有效”mask的要求仅仅意味着，即使一个prompt是不明确的，输出也应该是这些对象中至少一个合理的mask。

**Pre-training：**

输入的无论是图像还是提示，首先需要转化成一个向量，作者在这里直接用现成的（**ViT、CLIP**）

promptable分割任务提出了一种自然的预训练算法，该算法为每个训练样本模拟一系列prompts(例如点、框、掩码)，并将模型的mask预测与GT进行比较。作者将这种方法应用于**交互式分割**（低成本的数据标注），目的是始终预测任何prompt的有效掩码，即使prompt是模糊的。

**Zero-shot transfer：**

预训练任务赋予了模型在推理时对任何prompt作出适当反应的能力，从而可以通过设计适当的prompts来解决下游任务。例如，如果有一个猫的bounding box detector，那么可以通过向我们的模型提供detector's box输出作为prompt来解决猫实例分割问题。

**Discussion**

作者认为：**提示**和**组合**是强大的工具，使单个模型能够以可扩展的方式使用，可完成模型设计时未知的任务。

由prompt等驱动的可组合系统将比专门为固定任务训练的系统更广泛地支持各种应用。



## 三 Model

SAM有三个部分组成，如下图所示，分别是图像encoder，灵活的提示encoder和快速掩码decoder。建立在Vision Transformer上，对实时性能进行特定的权衡

![image-20230502114826415](https://s2.loli.net/2023/05/02/IfT6zt24gA8Gjhx.png)



### 1.Image encoder

使用**MAE预训练的ViT**（heavyweight），最小限度地适用于处理**高分辨率输入**(输入图像基本都是2k左右的)。

图像编码器对每张图像运行一次，在提示模型之前进行应用。

1. 对于输入的图像，通过缩放和pad较短边将其尺寸改为1024×1024（C×H×W→C×1024×1024）。
2. 经过image encoder，得到对图像16倍下采样的feature，**最终的大小为(256,64,64)**。



### 2.Prompt encoder

考虑两种提示：**稀疏**(点、框、文本)和**密集**(mask)。

<img src="https://s2.loli.net/2023/05/02/wkB1K6tudFcySC5.png" alt="image-20230502120820491"  />

- **point（稀疏）**：映射到256维的向量，包含代表点位置的 positional encoding，加2个代表该点是前景/背景的可学习的embedding。
- **box（稀疏）**：用一个embedding对表示（1）可学习的embedding代表左上角（2）可学习的embedding代表右下角
- **文本（稀疏）：**使用预训练的CLIP模型中的text encoder进行embedding
- **mask （稠密）：**用三个卷积进行嵌入（考虑稠密信息之间的空间关系，所以不能直接使用embedding），之后mask 和image embedding通过element-wise逐元素求和(**可以理解成mask的feature对image的feature进行加权**)

不管是那种prompt，或者是其中的任意组合，最后Prompt Encoder都是输出256维的一个向量。

代码：

```python
    def forward(
        self,
        points: Optional[Tuple[torch.Tensor, torch.Tensor]], # 要嵌入的点坐标和标签。
        boxes: Optional[torch.Tensor],
        masks: Optional[torch.Tensor],
    ) -> Tuple[torch.Tensor, torch.Tensor]:
       
        bs = self._get_batch_size(points, boxes, masks)
        sparse_embeddings = torch.empty((bs, 0, self.embed_dim), device=self._get_device())
        if points is not None:
            coords, labels = points #坐标，标签
            point_embeddings = self._embed_points(coords, labels, pad=(boxes is None))
            sparse_embeddings = torch.cat([sparse_embeddings, point_embeddings], dim=1)
        if boxes is not None:
            box_embeddings = self._embed_boxes(boxes)
            sparse_embeddings = torch.cat([sparse_embeddings, box_embeddings], dim=1)

        if masks is not None:
            dense_embeddings = self._embed_masks(masks)
        else:
            dense_embeddings = self.no_mask_embed.weight.reshape(1, -1, 1, 1).expand(
                bs, -1, self.image_embedding_size[0], self.image_embedding_size[1]
            )

        return sparse_embeddings, dense_embeddings
```

point embed的代码：

```python
input_point = np.array([[500, 375]])
input_label = np.array([1])

def _embed_points(
        self,
        points: torch.Tensor,  
        labels: torch.Tensor,  # 1—前景；0—背景
        pad: bool,
    ) -> torch.Tensor:
        """Embeds point prompts."""
        points = points + 0.5  # Shift to center of pixel
        if pad:
            # 建立一个和point的shape相同的空向量
            padding_point = torch.zeros((points.shape[0], 1, 2), device=points.device)
            # 建立一个和labels的shape相同的-1向量
            padding_label = -torch.ones((labels.shape[0], 1), device=labels.device)
            # pointshape由(1,2)--(2,2)
            points = torch.cat([points, padding_point], dim=1)
            # labelshape由(1)--(2)
            labels = torch.cat([labels, padding_label], dim=1)
        # 对点进行位置编码                
        point_embedding = self.pe_layer.forward_with_coords(points, self.input_image_size)
        point_embedding[labels == -1] = 0.0  
        point_embedding[labels == -1] += self.not_a_point_embed.weight # 这里不是前景背景，是填充
        point_embedding[labels == 0] += self.point_embeddings[0].weight #背景
        point_embedding[labels == 1] += self.point_embeddings[1].weight #前景
        return point_embedding # (2,256)
```

box embed的代码：

```python
input_box = np.array([425, 600, 700, 875])

def _embed_boxes(self, boxes: torch.Tensor) -> torch.Tensor:
        """Embeds box prompts."""
        boxes = boxes + 0.5  # Shift to center of pixel
        coords = boxes.reshape(-1, 2, 2)  #shape(1,4)—>(2,2)
        # 对box进行位置编码 
        corner_embedding = self.pe_layer.forward_with_coords(coords, self.input_image_size) #(2,256)
        # 分别对背景前景加权
        corner_embedding[:, 0, :] += self.point_embeddings[2].weight
        corner_embedding[:, 1, :] += self.point_embeddings[3].weight
        return corner_embedding
```

mask embed的代码：

```python
    def _embed_masks(self, masks: torch.Tensor) -> torch.Tensor:
        """Embeds mask inputs."""
        mask_embedding = self.mask_downscaling(masks)
        return mask_embedding

# -----------------------------------------------------------
self.mask_downscaling = nn.Sequential(
            nn.Conv2d(1, mask_in_chans // 4, kernel_size=2, stride=2),
            LayerNorm2d(mask_in_chans // 4),
            activation(),
            nn.Conv2d(mask_in_chans // 4, mask_in_chans, kernel_size=2, stride=2),
            LayerNorm2d(mask_in_chans),
            activation(),
            nn.Conv2d(mask_in_chans, embed_dim, kernel_size=1),
)
```



### 3.Mask decoder

输入是 Image Encoder 和 Prompt Encoder 的输出。TwoWayTransformer 是指 transformer 的 v 不变，有两套输入的 q 和 k。做完 Attention 之后，Mask Decoder 会做上采样，然后用 MLP 预测最后的 mask_iou。

![image-20230502140631940](https://s2.loli.net/2023/05/02/8mQKiCDcsaglnZb.png)

1. 作者修改了Transformer decoder，在使用decoder之前，首先**将可学习的output token嵌入到prompt embedding集合中**（类似于vit中的[class]标记）。

2. 修改后的解码器块使用两个方向上的提示**自注意力**和**交叉注意力**(提示到图像嵌入，图像嵌入再到提示)来更新所有嵌入。每个解码器执行四个步骤，重复两次

   ①prompt tokens+output tokens进行自注意力（这里prompt tokens会输入两遍！！！使decoder对prompt token的几何位置和类型都有很强的依赖）
   
   ②用得到的token和image embedding进行cross-attention（token作为Q）
   
   ③逐点MLP 更新token
   
   ④用image embedding和③的token进行cross-attention（image embedding作为Q）

重复上述步骤2次，再将attn再通过残差进行连接，最终输出masks和iou scores。

3. 运行解码器后，使用两个卷积层对image embedding进行4倍的上采样(相对于输入图像缩小了4倍，信息扩充256*256)。

4. token再次参与图像嵌入，将更新后的output token embedding传递给一个小的3层MLP，该MLP输出与放大图像嵌入的通道维度匹配的向量。最后，用放大后的image embedding和MLP输出的逐点乘积，来计算每个图像位置的mask概率。

另外，为了解决输出模糊性问题(一个提示可能生成多个mask，比如衣服上的一个点，既可以表示衣服，也表示穿衣服的人)

<img src="https://s2.loli.net/2023/05/02/6NHyagmIBRr8qlG.png" alt="image-20230502140846284" style="zoom:80%;" />

本文采取的策略是，**使用少量output tokens同时预测多个mask**，而不是预测单个mask。默认预测三个mask(整体、部分和子部分)，在训练过程中计算GT和每个预测mask之间的损失，但只回传最小的loss。另外，为了对mask进行排序，添加了一个小head(在额外的output token上操作)，以估计每个mask与其覆盖的对象之间的IoU。



### 4.Losses and training

mask loss ： focal loss和dice loss的线性组合，focal loss与dice loss的比例为20:1；

iou loss：  用mse loss

We train for the promptable segmentation task **using a mixture of geometric prompts**， we simulate an interactive setup by randomly sampling prompts in **11 rounds per mask**, al- lowing SAM to integrate seamlessly into our data engine.（形成11种mask和prompt的对）

## **四 Data Engine**

该数据引擎有三个阶段:

1. 模型辅助的**手动标注阶段**，
2. **半自动阶段**，其中混合了自动预测的掩码和模型辅助的标注，
3. **全自动阶段**，在该阶段中，我们的模型在没有人工辅助输入的情况下生成mask。

### **1.Assisted-manual stage**

一组专业标注人员通过使用SAM支持的基于浏览器的交互式分割工具点击前景/背景的点来标记mask，人工对mask进行细化。模型可以实时输出mask，建议标注者优先标记他们命名的对象。另外，要求标注者按图层顺序标记物体，如果一个mask标记超过30s，先处理下一张。

SAM先用公开数据集训练，然后再用新增的标注mask训练。随着收集到更多的mask，图像编码器从ViT-B扩展到ViT-H，其他架构细节也得到了细化，image-encoder的能力越来越强。总共重新**训练了模型6次**。随着模型的改进，每个mask的平均标注时间从34秒减少到14秒（**通过交互式分割来简化标注工作**），每个图像的平均mask数量从20个mask增加到44个mask。

总的来说，在这个阶段**从12万张图像中收集了430万个mask。**

### **2.Semi-automatic stage**

这一阶段的目标是**增加mask的多样性**

为了使标注者关注到不太突出的对象，首先自动检测出可信的mask。然后向标注者展示了预测mask填充图像，并让他们标注其他没被标注的对象。

为了检测可信的mask，先**用第一步的mask训练了一个类别一样的box检测器**。在此阶段，从18万张图像中收集了额外的590万个mask(此时总共已有1020万个mask)。与第一阶段一样，用新收集的数据，**重新训练模型(5次)**。每个mask的平均注释时间回到34秒，因为这些对象更难标记。每个图像的平均掩码数量从44个增加到72个。

### **3.Fully automatic stage**

在这一阶段的开始，已经通过前两个阶段收集了大量的和多样性的mask来改进模型。另外，到此阶段，我们已经开发了**模糊感知模型**，它可以根据不明确的输入也能输出有效的mask。

具体来说，**对图像生成（32,32）个格网点，每个点预测一系列mask**，如果一个点落在某个部分或子部分上，模型返回部分、子部分和整体的object。同时，通过预测的iou筛选**confident**(可信的mask),选取一个**stable**的mask(稳定的mask,在相似的mask中，概率阈值在 0.5-δ和 0.5+δ之间)；最后，通过nms过滤**confident**和**stable**中重复的mask。

至此，在所有1100万幅图像上，总共产生了11亿个高质量的mask。

## **五 Segment Anything Dataset**

所提出的数据集SA-1B由1100万不同的、高分辨率的、授权的、保护隐私的图像和用数据引擎收集的11亿个高质量mask组成。平均每张图像有100个mask

<img src="https://s2.loli.net/2023/05/02/TEvwZBhsWDiqHkR.png" alt="image-20230502190525265" style="zoom: 67%;" />

**图像**：从一家直接与摄影师合作的提供商获取1100万张高分辨率的(平均3300×4950像素)图像，按短边重采样到1500像素。即使在下采样后的图像分辨率也明显高于许多现有的视觉数据集(例如，COCO图像是480×640像素)。

**mask**：数据引擎生产了11亿个掩码，其中99.1%都是自动生成的。通过对比分析，自动生成的mask质量也是非常高的。

**Mask quality**：为了评估质量，随机选500张图像（约5万个mask），让专业的标注人员进行标注，计算了每对之间的IoU，发现94%的mask对的IoU大于90%(97%的对的IoU大于75%)。作为比较，之前的工作估计标注者之间的一致性在85-91% IoU。

**Mask properties**： 数据分布更广，从全世界获取数据，mask更多，数据偏向性较小。

![image-20230502191030379](https://s2.loli.net/2023/05/02/AT5mi8FXjEUfLQH.png)

## **六 实验与效果**

**核心：验证其零样本的迁移能力**

作者考虑五个任务，其中四个与用于训练 SAM 的可提示分割任务有很大不同。这些实验在训练期间未见的数据集和任务上评估 SAM（对“零样本迁移”的使用遵循其在 CLIP 中的使用）。数据集可能包括新颖的图像分布，例如水下或以第一视角的图像，这些图像不会出现在 SA-1B 中。

实验首先测试可提示分割的核心目标：从任何提示生成有效的掩码。

1. 执行**边缘检测；**
2. 分割所有内容，即**对象候选生成；**
3. 分割检测到的对象，即**实例分割；**
4. 作为概念验证，以分割来自自由格式文本的对象（根据文本分割）。

这四个任务与 SAM 接受训练并通过提示工程实现的提示分割任务有很大不同。

实施细节：除非另有说明，SAM 使用 **MAE 预训练的 ViT-H 图像编码器**

### 1 零样本迁移——点分割验证

评估从单个前景点分割对象（使用groud truth的中心点作为输入），使用muti-mask中的confidence mask

作者用一项**人类评估**来补充标准的 mIoU 指标（即，预测掩码和真实掩码之间所有 **IoU 的平均值**），其中注释者将掩码质量从 1（无意义）到 10（像素完美）进行评分。

我们主要与 RITM分割算法进行比较，下图是对比的实验结果：

![image-20230502191052428](https://s2.loli.net/2023/05/02/OqJtHC2AD87vw6g.png)

SAM 在 23 个数据集中的 16 个上产生了更高的结果，高达 ∼47 IoU

### 2 零样本迁移——边缘检测

<img src="https://s2.loli.net/2023/05/02/dXlLKBYW1NA4Gpn.png" alt="image-20230502194441775" style="zoom: 67%;" />

![image-20230502191109133](https://s2.loli.net/2023/05/02/1gtIaT9Fv32ACWB.png)

定性地，可以观察到即使 SAM 没有接受过边缘检测训练，它也会产生合理的边缘图。 与 ground truth 相比，SAM 预测了更多的边缘，包括 BSDS500 中未注释的敏感边缘（**准确率低，召回率高**）

![image-20230502191126306](https://s2.loli.net/2023/05/02/ysan6EzFBgQRjYv.png)

### 3 零样本迁移——目标候选生成

目标候选生成在目标检测研究中发挥了重要作用，作为开创性系统的中间步骤。为了生成对象候选，论文运行了一个稍微修改过的自动掩码生成管道版本。数据集使用 LVIS，因为它的大量类别提出了具有挑战性的测试。 SAM与作ViTDet检测器（使用级联 Mask R-CNN ViT-H）实现的强基线进行比较。注意到，这个“基线”对应于向游戏 AR 展示的“检测器伪装成提议生成器”(DMP) 方法，使其成为一个真正苛刻的比较。

![image-20230502191138629](https://s2.loli.net/2023/05/02/QmeJ65TvNhgFtbP.png)

在上表中，不出所料地看到使用 ViTDet-H 的检测作为对象候选总体上表现最好。 然而，SAM 在几个指标上表现非常出色。 值得注意的是，它在中型和大型物体以及稀有和常见物体上的表现优于 ViTDet-H。 事实上，SAM 仅在小对象和频繁对象上表现不如 ViTDet-H，而 ViTDet-H 可以轻松学习 LVIS 特定的注释偏差，因为它是在 LVIS 上训练的，与 SAM 不同。 作者还与 SAM 的消除歧义无意识版本（“单挑”）进行了比较，后者在所有 AR 指标上的表现都明显低于 SAM。

### 4 零样本迁移——实例分割

转向更高层次的愿景，使用 SAM 作为实例分割器的分割模块。 实现很简单：运行对象检测器（之前使用的 ViTDet）并使用其输出框提示 SAM。 这说明了在更大的系统中编写 SAM。

![image-20230502191151386](https://s2.loli.net/2023/05/02/FQETbC7f4g3aWrm.png)

观察到两个数据集上的差距，其中 SAM 相当接近，但肯定落后于 ViTDet。假设在 COCO 上，mask AP 间隙较大且标注质量相对较低（正如人类研究所证实的那样），ViTDet 学习了 COCO masks 的特定偏差。SAM 作为一种零样本方法，无法利用这些（通常不受欢迎的）偏差。LVIS 数据集具有更高质量的 ground truth，但仍然存在特定的特性（例如，masks 不包含孔，它们是构造简单的多边形）和模态与 amodal masks 的偏差。 同样，SAM 没有接受过学习这些偏差的训练，而 ViTDet 可以利用它们。

### 5 零样本迁移——文本引导的掩码生成

考虑一个更高级别的任务：从自由格式文本中分割对象。该实验是 SAM 处理文本提示的能力的概念验证。 虽然在之前的所有实验中都使用了完全相同的 SAM，但对于这个 SAM 的训练过程进行了修改，使其具有文本感知能力，但不需要新的文本注释。 具体来说，对于每个面积大于 100^2 的手动收集掩码，我们提取 CLIP 图像嵌入。 然后，在训练期间，我们使用提取的 CLIP 图像嵌入提示 SAM 作为其第一次交互。

因为 **CLIP 的图像嵌入经过训练以与其文本嵌入对齐**，所以我们可以使用图像嵌入进行训练，但使用文本嵌入进行推理。 也就是说，在推理时，我们通过 CLIP 的文本编码器运行文本，然后将生成的文本嵌入作为 SAM 的提示。

![image-20230502191204160](https://s2.loli.net/2023/05/02/r3D2sZBOdW7P1Yc.png)





## 七 总结和不足

Segment Anything 项目贡献：**新任务（可提示分割）、模型（SAM）和数据集（SA-1B）**。

**不足**：

1. 虽然SAM总体上表现良好，但并不完美，它可能会错过精细的结构;
2. 专用的分割方法在一些任务上性能优于SAM，比如医学分割;
3. 文中对text-to-mask任务的尝试是探索性的，并不完全可靠;

**未来：**

1. 预训练模型可以提供新功能，甚至超出训练时的想象（**涌现**现象）。一个突出的例子是 CLIP如何用作更大系统中的一个组件，例如 DALL·E。
2. 本文的目标是使用 SAM 使这种组合变得简单明了，通过要求 SAM 为广泛的分割提示预测有效掩码来实现这一目标。 效果是在 SAM 和其他组件之间创建可靠的接口。 例如，MCC可以轻松地使用 SAM 来分割感兴趣的对象，并实现对未见对象的强泛化，以便从单个 RGB-D 图像进行 3D 重建。
3. 在另一个示例中，SAM 可以通过可穿戴设备检测到的注视点进行提示，从而启用新的应用程序。 由于 SAM 能够泛化到第一视角的图像等新领域，这样的系统无需额外培训即可工作。