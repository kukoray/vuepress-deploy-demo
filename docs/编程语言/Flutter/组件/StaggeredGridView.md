# [StaggeredGridView](https://pub.dev/packages/flutter_staggered_grid_view)

提供Flutter网格布局的集合

## 应用案例

### 瀑布流列表

需要降低版本，最新版本没有直接的StaggeredGridView类

案例采用如下版本

```yaml
flutter_staggered_grid_view: ^0.4.1
```

代码如下

```dart
StaggeredGridView.countBuilder(
      padding: const EdgeInsets.all(5.0),
      // 个人理解
      // 按行划分的单元个数，要填满整个行，1到4都可以，若大于4，则会取4/n的空间来划分为4格
      crossAxisCount: 4,
      itemCount: 10,
      itemBuilder: (context, i) {
          // 省略复杂代码
          return Container(...);
      },
      staggeredTileBuilder: (int index) => new StaggeredTile.count(2, index == 0 ? 2.7: 2.7),    //
      mainAxisSpacing: 8.0,
      crossAxisSpacing: 8.0,
    );
```

效果图

<img src="https://dev.azure.com/dyjch666/313c572b-e599-43df-8705-ba95d9ff0eec/_apis/git/repositories/e4266438-9949-4157-a0c4-485dd69d831a/items?path=%2F1650261696018_8367.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=master&resolveLfs=true&%24format=octetStream&api-version=5.0" alt="image-20220418140135875" style="zoom:50%" align="middle"/>

#### 参数解析

```dart
crossAxisCount: 4,  
// crossAxisCount:横轴和竖轴的单元格数，默认是一个大正方形，范围为1到4，超过则空间变小
const StaggeredTile.count(this.crossAxisCellCount, this.mainAxisCellCount)
// crossAxisCellCount:横轴占据的单元数。
// mainAxisCellCount:主轴占用的单元数。
```

**由于尚不清楚其原理，crossAxisCount的值个人建议设为1到4即可，其它使用方法参考其它博客**

接下来进行验证，为了方便看到效果，做如下约定：

1、下述测试中项宽高的单元数都设为1

2、代码模板采用如下代码，只对crossAxisCount进行修改

```dart
StaggeredGridView.countBuilder(
      padding: const EdgeInsets.all(5.0),
      // 个人理解
      // 按行划分的单元个数，要填满整个行，1到4都可以，若大于4，则会取4/n的空间来划分为4格
      crossAxisCount: 1,
      itemCount: 10,
      itemBuilder: (context, i) {
          // 省略复杂代码
          return Container(...);
      },
      staggeredTileBuilder: (int index) => new StaggeredTile.count(1, index == 0 ? 1: 1),    //
      mainAxisSpacing: 8.0,
      crossAxisSpacing: 8.0,
    );
```

- crossAxisCount = 1

<img src="https://dev.azure.com/dyjch666/313c572b-e599-43df-8705-ba95d9ff0eec/_apis/git/repositories/e4266438-9949-4157-a0c4-485dd69d831a/items?path=%2F1650265005481_8347.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=master&resolveLfs=true&%24format=octetStream&api-version=5.0" alt="image-20220418145645380" style="zoom:50%;" />

可以看到宽高为1时，每个card刚好填充满空间

- crossAxisCount = 2

<img src="https://dev.azure.com/dyjch666/313c572b-e599-43df-8705-ba95d9ff0eec/_apis/git/repositories/e4266438-9949-4157-a0c4-485dd69d831a/items?path=%2F1650265162291_9579.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=master&resolveLfs=true&%24format=octetStream&api-version=5.0" alt="image-20220418145922187" style="zoom:50%;" />

可以看到宽高为2时，每个card刚好占整个空间的四分之一

- crossAxisCount = 3

<img src="https://dev.azure.com/dyjch666/313c572b-e599-43df-8705-ba95d9ff0eec/_apis/git/repositories/e4266438-9949-4157-a0c4-485dd69d831a/items?path=%2F1650265424547_860.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=master&resolveLfs=true&%24format=octetStream&api-version=5.0" alt="image-20220418150344436" style="zoom:50%;" />

可以看到宽高为3时，每个card刚好占整个空间的九分之一

- crossAxisCount = 4

<img src="https://dev.azure.com/dyjch666/313c572b-e599-43df-8705-ba95d9ff0eec/_apis/git/repositories/e4266438-9949-4157-a0c4-485dd69d831a/items?path=%2F1650265597591_7210.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=master&resolveLfs=true&%24format=octetStream&api-version=5.0" alt="image-20220418150637496" style="zoom:50%;" />

可以看到宽高为4时，每个card刚好占空间的十六分之一



**在值超过四时，会发现整个空间被压缩了，个人猜测空间最多只能分为16份，再多会变为N*N份，但是仍然只会占其中的16份**



- crossAxisCount = 5

<img src="https://dev.azure.com/dyjch666/313c572b-e599-43df-8705-ba95d9ff0eec/_apis/git/repositories/e4266438-9949-4157-a0c4-485dd69d831a/items?path=%2F1650265678528_9583.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=master&resolveLfs=true&%24format=octetStream&api-version=5.0" alt="image-20220418150758429" style="zoom:50%;" />

可以看到此时被缩放了，虽然可以看到空间分为了25份，但内容仍然只占左上角的16份，看上去就像被缩放了

- crossAxisCount = 6

<img src="https://dev.azure.com/dyjch666/313c572b-e599-43df-8705-ba95d9ff0eec/_apis/git/repositories/e4266438-9949-4157-a0c4-485dd69d831a/items?path=%2F1650265844948_3561.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=master&resolveLfs=true&%24format=octetStream&api-version=5.0" alt="image-20220418151044852" style="zoom:50%;" />

