# ListView

## 应用示例

将一个列表显示为ListView并添加分割线

```dart
ListView.builder(
    padding: const EdgeInsets.all(16.0),
    // 列表长度乘以2，给分割线留下空间
    itemCount: list.length * 2,
    // 创建每一项，i代表index
    itemBuilder: (context, i) {
        // 当i为奇数时，添加分割线
        if (i.isOdd) {
            return const Divider();
        }

        // i为偶数时，返回一个列表项ListTile
        return ListTile(
            title: list[i ~/ 2],
            trailing: IconButton(
                icon: Icon(Icons.navigate_next),
                onPressed: () {
                    Navigator.of(context).push(
                        MaterialPageRoute(builder: (context) {
                            return MedicineInfo();
                        }),
                    );
                },
            ),
    		);
  	},
)
```

效果图

<img src="https://dev.azure.com/dyjch666/313c572b-e599-43df-8705-ba95d9ff0eec/_apis/git/repositories/e4266438-9949-4157-a0c4-485dd69d831a/items?path=%2F1650257469069_9245.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=master&resolveLfs=true&%24format=octetStream&api-version=5.0" alt="image-20220418125108922" style="zoom:50%" />