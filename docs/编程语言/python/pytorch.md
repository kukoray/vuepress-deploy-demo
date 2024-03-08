# pytorch常用手册



## 随机数种子设置

```python
#---------------------------------------------------#
#   设置种子
#---------------------------------------------------#
def seed_everything(seed=11):
    random.seed(seed)   #设置random库
    np.random.seed(seed) # 设置numpy库
    torch.manual_seed(seed) # 设置torch库——CPU
    torch.cuda.manual_seed(seed) # 设置torch库——GPU
    torch.cuda.manual_seed_all(seed) # 设置torch库——GPU
    torch.backends.cudnn.deterministic = True
    torch.backends.cudnn.benchmark = False
```





## 数据读取

<img src="https://s2.loli.net/2023/07/10/ksBKjP9DbH7oA6Q.png" alt="image-20230710234942705" style="zoom: 67%;" />

### Dataset







### Dataloader