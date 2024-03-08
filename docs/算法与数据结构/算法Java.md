  

# 图算法

图的一些基本概念回顾：

图的存储：

> - 邻接矩阵
> - 邻接表



有向图的邻接表的数据结构：







## 遍历算法

### 深度优先遍历DFS

深度优先遍历，顾名思义就是每次都继续遍历未访问到的邻接点，知道没了才回溯。















### 广度优先遍历BFS

广度优先搜索是按层来处理顶点，距离开始点最近的那些顶点首先被访问，而最远的那些顶点则最后被访问，这个和树的层序变量很像，BFS的代码使用了一个**队列**。

很关键的一点，采用了队列！！！



```c++
const int maxn = 1e1 + 7;
int pic[maxn][maxn];
int n = 5;


回溯
----------------------------
struct Node {
    int x, y, pre;
}q[maxn];
----------------------------


int dir[4][2] = { { 0, -1 },{ 0, 1 },{ -1, 0 },{ 1, 0 } };
void BFS() {
    int front = 0, rear = 1;
    q[front] = { n - 1, n - 1, -1 };
    while (front < rear) {
        if (q[front].x == 0 && q[front].y == 0) {
            while (q[front].pre != -1) {
                cout << "(" << q[front].x << ", " << q[front].y << ")" << endl;
                front = q[front].pre;
            }
            cout << "(" << n - 1 << ", " << n - 1 << ")" << endl;
            break;
        }
        for (int i = 0; i < 4; ++i) {
            int x = q[front].x + dir[i][0];
            int y = q[front].y + dir[i][1];
            if (0 <= x && x < n && 0 <= y && y < n && pic[x][y] == 0) {
                pic[x][y] = 1;
                ---------------------------------------------
                q[rear++] = { x, y, front };   //加到数组里，front是指向前一个路径的数组下标，可以以此来回溯
                ---------------------------------------------
            }
        }
        front++;
    }
}
int main()
{
    for (int i = 0; i < n; ++i)
        for (int j = 0; j < n; ++j)
            cin >> pic[i][j];
    BFS();
    return 0;
}



```







## Dijkstra算法

**单源最短路径**：图中某一个顶点 到 其余各顶点的最短路径！！！

例如:求 起点 0 到 其余各个节点的最短距离



核心思想：贪心策略（每一次找当前已经走过的距离的最小值，作为**跳板**，通过跳板接着往下寻找）

![截图](https://s2.loli.net/2022/04/18/o3Fk4MyscrJ2XL1.png)

例如：找以0节点为起点的，所有最短路径。

**第一轮先初始化数组，将0节点所有相邻的节点遍历一遍，并找到其中距离最短的节点，则该节点列入已知节点的集合中！（可以好好思考下）**

**接着以刚刚找到的那个节点为跳板，接着往下寻找，会得到一组新的dist，再从中找出最小值，列入已知节点集合。以此列推**

下面是邻接矩阵的版本：

```java
void Dijkstra(MGraph g,int v) //v是指0，即起始点
{
    //求从v到其他顶点的最短路径
    int n = g.vexnum;
    int u ;
    int path[n];
    int dist[n];
    int s[n]; //S数组表示已经找到最短路径的点

    for (int i = 0; i < n; ++i) {
        dist[i]=g.arcs[v][i].adj;
        if (dist[i] == INFINITY)
            path[i]=-1;
        else
            path[i]=v;
        s[i]=0;
    }
    s[v]=1;
    
    for (int i = 1; i < n; ++i) {
        int min = INFINITY;
        
        //每一轮 先从 此时的 dist数组中找到此时 距离 v的 最近的那个 节点
        for (int j = 0; j < n; ++j) {
            if (s[j]==0 && dist[j]<min){//dist[j] 是 起点 v 到 j  的最短距离
                min = dist[j];
                u=j;
            }
        }
        s[u]=1; //找到后 将该节点放入已知集合之中


        //将该节点作为跳板 更新 其余节点 距离 v的 距离
        for (int k = 0; k < n; ++k) {
            if (g.arcs[u][k].adj<INFINITY && dist[k]>dist[u]+g.arcs[u][k].adj && k!=v){
                dist[k]=dist[u]+g.arcs[u][k].adj;
                path[k]=u;
            }
        }
    }
}
```

下面是邻接表的版本：

```java
void Dijkstra(ALGraph g,int v)
{
    //求从v到其他顶点的最短路径
    int n = g.vexnum;
    int u ;
    int path[n];
    int dist[n];
    int s[n];
    for (int i = 0; i < n; ++i) {
        dist[i]=INFINITY;
        path[i]=-1;
        s[i]=0;
    }
    s[v]=1;

    dist[v] = 0;
    path[v] = 0;
    ArcNode* node = g.vertices[v].firstarc;
    while(node != NULL){
        int t = node->data.adjvex;
        dist[t] = node->data.info;
        path[t] = v;
        node = node->nextarc;
    }
    Dispdistpath(dist,path,n);

    for (int i = 1; i <n ; ++i) {
        int min = INFINITY;
        for (int j = 0; j < n; ++j) {
            if (s[j]==0 && dist[j]<min){
                min = dist[j];
                u=j;
            }
        }
        s[u]=1;
        ArcNode * node1 = g.vertices[u].firstarc;
        while (node1 != NULL){
            int j = node1->data.adjvex;
            if (node1->data.info + dist[u] < dist[j] && node1->data.info<INFINITY){
                dist[j] = node1->data.info + dist[u] ;
                path[j] = u;
            }
            node1 = node1->nextarc;
        }
        Dispdistpath(dist,path,n);
    }
    DispAllPath(g,dist,path,s,v);
 
}
```





## Floyd算法

简介：多源最短路径问题    

 **巧记代码：3个for循环，DP思路**

**以每个点为「中转站」，刷新所有「入度」和「出度」的距离。**

```java
//多源最短路径：求 图中 任意两点 之间的 最短路径
public static void floyd(int n, int [][] Graph ,int [][] path){  //Graph[][]是 i 到 j 的直接距离

    int [][] A = new int[n][n]; //A[i][j] 是 从 节点 i 到 j 之间的 最短距离长度
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            A[i][j]=Graph[i][j];
            path[i][j]=-1; //  path[i][j] 代表 从 i 到 j 最短路径 的中间点
        }
    }

    for (int v = 0; v < n; v++) { //选一个中间节点
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (A[i][j]>A[i][v]+A[v][j]){  //dp过程
                    A[i][j]=A[i][v]+A[v][j];
                    path[i][j]=v;
                }
            }
        }
    }
}


//输出节点 u 到 v 的最短路径 
public static void printPath(int u , int v , int [][] path){
    if (path[u][v]==-1){
        //直接输出
    }
    else {
        int mid = path[u][v];
        printPath(u,mid,path);
        printPath(mid,v,path);
    }
}
```

![截图](https://s2.loli.net/2022/04/18/Hit1eCGxyJsjbuK.png)





## 匈牙利算法

简介：**图论中寻找最大匹配的算法**

最大匹配也叫**二分图匹配**

常见问题：求二分图的**最大匹配数**和**最小点覆盖数**

（离散数学中的图论知识）

<img src="https://s2.loli.net/2022/05/14/xsapNwT7PGBYFIk.jpg" alt="算法学习笔记(5)：匈牙利算法" style="zoom:40%;" />

> 匹配的两个重点：
> 
> 1. 匹配是边的集合；
> 2. 在该集合中，任意两条边不能有共同的顶点。
> 
> 概念点2. 完美匹配：考虑部集为X={x1 ,x2, ...}和Y={y1, y2, ...}的二分图，一个完美匹配就是定义从X-Y的一个双射，依次为x1, x2, ... xn找到配对的顶点，最后能够得到 n！个完美匹配。
> 
> 这里有一个概念，有点陌生，即什么是二分图，这个其实很好理解，给定两组顶点，但是组内的任意两个顶点间没有边相连，只有两个集合之间存在边，即组1内的点可以和组2内的点相连，这样构建出来的图就叫做二部图（更好理解就是n个男人，n个女人，在不考虑同性恋的情况下，组成配偶）。

```cpp
int M, N;            //M, N分别表示左、右侧集合的元素数量
int Map[MAXM][MAXN]; //邻接矩阵存图
int p[MAXN];         //记录当前右侧元素所对应的左侧元素
bool vis[MAXN];      //记录右侧元素是否已被访问过
bool match(int i)
{
    for (int j = 1; j <= N; ++j)
        if (Map[i][j] && !vis[j]) //有边且未访问
        {
            vis[j] = true;                 //记录状态为访问过
            if (p[j] == 0 || match(p[j])) //如果暂无匹配，或者原来匹配的左侧元素可以找到新的匹配
            {
                p[j] = i;    //当前左侧元素成为当前右侧元素的新匹配
                return true; //返回匹配成功
            }
        }
    return false; //循环结束，仍未找到匹配，返回匹配失败
}
int Hungarian()
{
    int cnt = 0;
    for (int i = 1; i <= M; ++i)
    {
        memset(vis, 0, sizeof(vis)); //重置vis数组
        if (match(i))
            cnt++;
    }
    return cnt;
}
```



在连通网中查找最小生成树的常用方法有两个，分别称为普里姆算法和克鲁斯卡尔算法。









***





# 回溯法

回溯法的性能如何呢，这里要和大家说清楚了，虽然回溯法很难，很不好理解，但是回溯法并不是什么高效的算法。

因为**回溯的本质是穷举**，穷举所有可能，然后选出我们想要的答案，如果想让回溯法高效一些，可以加一些剪枝的操作，但也改不了回溯法就是穷举的本质。

那么既然回溯法并不高效为什么还要用它呢？

因为没得选，一些问题能暴力搜出来就不错了，撑死了再剪枝一下，还没有更高效的解法。



**回溯法解决的问题都可以抽象为树形结构**，是的，我指的是所有回溯法的问题都可以抽象为树形结构！

因为回溯法解决的都是在集合中递归查找子集，**集合的大小就构成了树的宽度，递归的深度，都构成的树的深度。**

**模板**

```c_cpp
void backtracking(参数) {
    if (终止条件) {
        存放结果;
        return;
    }

    for (选择：本层集合中元素（树中节点孩子的数量就是集合的大小）) {
        处理节点;
        backtracking(路径，选择列表); // 递归
        回溯，撤销处理结果
    }
}

```





经典例题：给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。

```java
class Solution {
    List<List<Integer>> result = new ArrayList<>();  //用全局变量来存储结果，最终结果
    LinkedList<Integer> path = new LinkedList<>();  //存储结果中的具体某一项
    public List<List<Integer>> combine(int n, int k) {
        combineHelper(n, k, 1);
        return result;
    }

    private void combineHelper(int n, int k, int startIndex){
        //终止条件
        if (path.size() == k){
            result.add(new ArrayList<>(path));  //由于最后需要返回的是一个二维数组，ArrayList里add linkedlist会是空的
            return;
        }
        for (int i = startIndex; i <= n - (k - path.size()) + 1; i++){
            path.add(i);
            combineHelper(n, k, i + 1);
            path.removeLast(); //采用移除最后一位的方式，很新颖很有特点！ 可以实现对空间的最大利用！
        }
    }
}
```

# 动态规划

动态规划（DP，Dynamic  Programming）是运筹学的一个重要分支，它是求解分阶段决策过程最优化问题的数学方法。一般的，动态规划可分为线性动规，区域动规，树形动规，背包动规四类。

特点：**递推公式！！！** 、（**空间换时间、带备忘录的递归、递归树的剪枝**）

解题关键：

1. dp数组以及下标的含义  ，例如dp[i] [j]
2. 递推公式
3. dp数组如何初始化
4. 遍历顺序
5. 打印dp数组（便于观察和纠错，思路更加清晰）



一些思路：

1. 先用穷举法探入、暴力搜索
2. 如果发现有很多重复的内容，就进行剪枝（记录下来，用空间换时间），记忆化搜索
3. 最后改写为迭代的形式



所以动态规划中每一个状态一定是由上一个状态推导出来的，这一点就区分于贪心，贪心没有状态推导，而是从局部直接选最优的。

动规核心：最优子结构+重叠子问题



当我们写出递推公式之后，要知道递推公式递推的方向，顺着递推公式的方向进行遍历，就可以实现自下而上的动态规划。



对于字符相关的动态规划问题的解题经验：一般都采用二维dp数组





一些复杂dp，例如一些在数组中取一些数，使得这些数之和为k的倍数。

1.状态定义：
dp(i,j) 代表前i 个物品总价值%k=j 的集合,在这里限制是关于 %k 余数是多少。









股票问题

![截图](https://s2.loli.net/2022/04/18/DG8TgBZSQ7lVOMc.png)





# DFS  深搜题









## 费解的开关

对于种类开关转换问题，**动一个开关  会使得周边格子状态改变的 模型**，要明白 **按开关的顺序 是不影响最后的结果的**。



所以只要遍历每个格子 开关 开或者关 两种状态就可以了。







# 记忆化搜索



实际上，有些看起来像是搜索算法的题目，大多都会因为数据范围而超时。
此时，通常都会用记忆化搜索或者DP算法来替之解决，本题也正是如此。





> 记忆化搜索：算法上依然是搜索的流程，但是搜索到的一些解用 动态规划的那种思想和模式作一些保存。
> 

> 
> 一般说来，动态规划总要遍历所有的状态，而搜索可以排除一些无效状态。
更重要的是搜索还可以剪枝，可能剪去大量不必要的状态，因此在空间开销上往往比动态规划要低很多。
记忆化算法在求解的时候还是按着自顶向下的顺序，但是每求解一个状态，就将它的解保存下来，
以后再次遇到这个状态的时候，就不必重新求解了。
> 

> 
> 这种方法综合了**搜索、动态规划**两方面的优点，因而还是很有实用价值的。







# 贪心算法

贪心算法（又称贪婪算法）是指，在对问题求解时，总是做出在当前看来是最好的选择。也就是说，不从整体最优上加以考虑，算法得到的是在某种意义上的局部最优解 。

关键点：**局部最优==》全局最优**

没有套路，需要验证其正确性。

关键的还是其贪心策略。





## MST最小生成树



### kruskal

 Kruskal算法用到的[数据结构](https://so.csdn.net/so/search?q=数据结构&spm=1001.2101.3001.7020)有：

 1、边顶点与权值[存储结构](https://so.csdn.net/so/search?q=存储结构&spm=1001.2101.3001.7020)(即图是由连接某一条边的两个顶点，以及这条边的权值来进行存储，具体看后面的例子)

 2、[并查集](https://so.csdn.net/so/search?q=并查集&spm=1001.2101.3001.7020)(具体是什么以及作用在后面的例子中解释)

<img src="https://s2.loli.net/2022/05/05/REHgsWi367MZ1Tv.png" alt="image-20220505165138676" style="zoom:33%;" />

会使用到`并查集`这一概念

下述代码：

1. 适用于给出每条边两个节点和边长的图
2. 不能保证连通性（可能题目中给的图压根就是不连通的，该代码无法检查出来）
3. 对于邻接矩阵和邻接表形式的输入数据，需要自己手动在转换一下

```java
package ACM;

import java.util.Arrays;
import java.util.Scanner;

/**
 * kruskal 算法
 */
public class Main {

    static int [] road;// road is the root of the each vertex
    static int n;//the number of the vertex
    static int m;//the number of the edge
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        n = scanner.nextInt();
        m =scanner.nextInt();

        road = new int[n+1];
        Graph[] graphs = new Graph[m];

        for (int i = 0; i < m; i++) {
            int v1 = scanner.nextInt();
            int v2 = scanner.nextInt();
            int len = scanner.nextInt();

            graphs[i]=new Graph(v1,v2,len);
        }

        Arrays.sort(graphs,(o1,o2)->{
            return Integer.compare(o1.len,o2.len);
        });

        System.out.println(kruskal(graphs));


    }

    public static int kruskal(Graph[] graphs){

        int sum = 0;
        for (int i = 1; i <=n ; i++) {
            road[i]=i;
        }

        for (int i = 0; i < m; i++) {
            int a = getRoot(graphs[i].v1);
            int b = getRoot(graphs[i].v2);
            if (a!=b){
                road[a]=b;
                sum += graphs[i].len;
            }

        }
        return sum;
    }

    public static int getRoot(int n){
        while (road[n]!=n){
            n=road[n];
        }
        return n;
    }


    static class Graph{
        int v1;
        int v2;
        int len;

        public Graph(int v1, int v2, int len) {
            this.v1 = v1;
            this.v2 = v2;
            this.len = len;
        }
    }

}
```



### Prime算法











## 树形dp

打家劫舍3  

[https://programmercarl.com/0337.%E6%89%93%E5%AE%B6%E5%8A%AB%E8%88%8DIII.html#%E6%80%9D%E8%B7%AF](https://)

用偷和不偷两种状态来遍历所有情况。 







## 区间dp



例：求一个字符串中的最长回文子序列的长度（子序列可以不连续）

换个问法：求一个字符串需要最少删除（增加）多少个字符，才能使其变成回文。

```java
public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    String next = scanner.next();
    char[] chars = next.toCharArray();
    int n = chars.length;
    int [][] dp = new int[n][n];
    for (int i = 0; i < n; i++) {
        dp[i][i]=1;
    }
    
    
    //dp 时 最好画一下 状态转移的图 清楚其遍历顺序
-------------------------------------------------------------------------------
    for (int t = 1; t <= n-1; t++) {
        for (int i = 0; i < n-t; i++) {
            int j = i+t;
            if (chars[i]==chars[j])
                dp[i][j]=Math.max(dp[i][j],dp[i+1][j-1]+2);
            else
                dp[i][j]=Math.max(dp[i][j-1],dp[i+1][j]);
        }
    }
-------------------------------------------------------------------------------
    System.out.println(n-dp[0][n-1]);

}
```





# 空间“点”问题

计算多维空间——主要是二维空间——中最近点问题是GIS、游戏、计算机图形学中常遇到的问题。最近点问题包含但不局限于下面问题：

1. 一维空间中距离点A 最近的一个点

平面最近点距离问题(分治法)

一般想到分治法，我们一般最开始可能就会想到，把n个点分成左右两部分， 为了将平面上的点集S分割为大小大致相同的2个子集S1和S2， 我们可以首先把所有点根据横坐标x从小到大排序，我们选取x=mid来作为分割线。其中，mid为S中所有点的横坐标的中位数。 这样可以将点集合S分为2部分，S1={P属于S| x§<=m} 和 S2={P属于S| x§>m}, 这样S1和S2中坐标点的个数大致相等。

然后分别求左、右两部分里面点的最短距离(设其最短距离分别为left_min和right_min)，现在设d=min(left_min,right_min),若S中存在最近点对（p,q）之间的距离小于d，那么p和q必分属于S1和S2,p,q的横坐标距直线x=mid的距离也均小于d.



<img src="https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTcwNDI4MTA1ODM4OTA5?x-oss-process=image/format,png" alt="这里写图片描述" style="zoom:80%;" />

在一维的情况下，距分割点距离为d的2个区间(mid-d,mid)和(mid,mid+d)中最多各有一个点(若多余一个点，与左右区间最小距离为d矛盾)。在二维情况下则要稍微复杂些， 最坏情况下可能左右各有n/2个点， 那么如果我们遍历这n/2个点对，需要的时间为n*n/4, 这样做时间效率太低，显然我们不能这样做。考虑到对P1中任意一点p，若他与p2中的某个点q构成一个最短距离，设p的坐标为(x,y),那么显然q的横坐标的范围为（mid,mid+d）,纵坐标范围为(y-d,y+d).

<img src="https://imgconvert.csdnimg.cn/aHR0cDovL2ltZy5ibG9nLmNzZG4ubmV0LzIwMTcwNDI4MTExMzEwODM5?x-oss-process=image/format,png" alt="包含点q的d*2d的矩形" style="zoom:80%;" />







1. 一维空间中距离点A 最近的K 个点
2. 一维空间中距离点A 小于D 的所有点
3. 二维空间中距离点A 最近的一个点（类似于数组中2个最接近数的差）
4. 二维空间中距离点A 最近的K 个点
5. 二维空间中距离点A 小于D 的所有点









# 数列操作



## 双指针









## 前缀和

特点：数组中 连续的一段区域



## 差分

通过前缀的方法，对其进行一些简单的处理，就可以得到差分。





## 单调栈

经典习题：有一个数组，对于其中的每一个元素，找到数组中其后面大于该值的最左侧元素，输出新的数组。

输入：[2,6,3,8,10,9]

输出：[6,8,8,10,-1,-1]

https://leetcode.cn/problems/daily-temperatures/



单调栈中存的是数组的下标，单调栈的本质是空间换时间，因为在遍历的过程中需要用一个栈来记录右边第一个比当前元素高的元素，优点是只需要遍历一次。

单调栈中很重要的一个要点就是：**单调栈中存放的是数组的下标**

```java
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();

        int [] num = new int[n];
        for (int i = 0; i < n; i++) {
            num[i]=scanner.nextInt();
        }

        Stack<Integer> stack = new Stack<>();

        for (int i = 0; i < n; i++) {

            while (!stack.isEmpty() && num[stack.peek()]<num[i]){
                Integer index = stack.pop();
                num[index] = num[i];
            }
            stack.push(i);//这里存放的是数组的下标
        }

        while (!stack.isEmpty()){
            Integer index = stack.pop();
            num[index] = -1;//还有一种办法就是初始化的时候就给结果数组，初始化为-1；对于c++—来说挺方便的
        }
        for (int i = 0; i < n; i++) {
            System.out.print(num[i]+" ");
        }
    }
```



java中给数组赋值初始化，可以用这条语句；

```java
 Arrays.fill(res,-1);
```



## 并查集







## 分块



所谓分块算法，就是讲一个序列分成若干块，维护块内的信息。为了保证一定的时间复杂度，所以对于一个n个元素组成的数组，将其分为√n块，每块也有√n个元素。所以一般分块算法的复杂中都带有根号。

对于一个暴力的区间修改问题，方法自然是对于区间的每一个元素都暴力修改，这样的话时间复杂度是明显不够优秀的。**所以引入了分块的算法，分块相当于一种优雅的暴力。**



区间修改，单点查询；



```java

public class Todo {

    static int [] num; //origin array
    static int k;      // the number of blocks
    static int [] l;   // the left index of every block   【输入的是块的id】
    static int [] r;   // the right index of every block  【输入的是块的id】
    static int [] belong ; // the belonged block of every index;  【输入的是1-n】 返回 所属的块id
    static int [] tag; // the tag of add

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        int m = scanner.nextInt();

        int[] num = new int[n+1];
        
        区间构建过程
---------------------------------------------------------------------------------
        for (int i = 1; i <= n; i++) {
            num[i]= scanner.nextInt();
        }

        int len = (int) Math.sqrt(n);
        k = n/len;
        if (n%len!=0)
            k++;

        for (int i = 1; i <=k ; i++) {
            r[i]=i*len;
            l[i]=r[i-1]+1;
        }

        r[k]=n;

        for (int i = 1; i <=k ; i++) {
            for (int j = l[i]; j <=r[i] ; j++) {
                belong[j]=i;
            }
        }
------------------------------------------------------------------------------------        

    }

区间加法
    // index from x to y of num[] plus z
    public static void add(int x,int y ,int z){

        if (belong[x]==belong[y]){
            for (int i = x; i <= y ; i++)
                num[i]+=z;
            return;
        }

        for (int i = x; i <= r[belong[x]] ; i++) {
            num[i]+=z;
        }
        for (int i = l[belong[y]]; i <= y ; i++) {
            num[i]+=z;
        }
        for (int i = belong[x]+1; i <=belong[y]-1 ; i++) {
            tag[i]+=z;
        }


    }
    
单点查询
    public static int ask(int x){
        return num[x]+tag[belong[x]];
    }


}

```









## 线段树

在我个人看来，线段树相当于对原数组不断进行分块，直到最后不可再分。由于一块分2块，2块分4块，这样的性质保证了复杂度在log2n的数量级上。而分块只分一次，每块√n个元素。

由于线段树所分块太多，所以在面对不符合区间加法的时候，就会显得十分无力。

对于分块，可以采用部分暴力部分利用块内信息来统计。

**对于区间的修改、维护、查询 ，时间复杂度优化为log级别**











## 树状数组

！！！最大的用处：**动态维护前缀和的工具**

修改和查询的时间复杂度都为log（n）

> - 单点修改+区间查询 ；
> - 区间修改+单点查询；（引入差分数组b）    **也可以使用分块的方法**
> - 区间修改+区间查询





特点：很快的求出一个区间数据的和。



lowbit（）运算：非负整数n在二进制表示下最低位1及其后面的0构成的数值

例如：lowbit（1101==100==）===100==

![截图](https://s2.loli.net/2022/04/18/hagAcVBGO9Rdrew.png)



![截图](https://s2.loli.net/2022/04/18/hEfO4waKRFJCAdz.png)



![截图](https://s2.loli.net/2022/04/18/9tp2wfPxZqGWuTn.png)



> - t[x]节点的长度等于lowbit(x)的长度
> - t[x]节点的父节点为 t[x+lowbit(x)]
> - t[x]节点保存以x为根节点的子树中叶子结点值的总和



add(x,k) 操作：即在原数组num上，让num[x]的值+k，所以要变更维护数组t。

![截图](https://s2.loli.net/2022/04/18/KUealpuLQ8BtWwD.png)



ask(x)操作 : 即查询 x这个点的前缀和 。 num（0-x）之和。

![截图](https://s2.loli.net/2022/04/18/85bYgIAJ64FthTM.png)







```java
    Scanner scanner = new Scanner(System.in);

    n = scanner.nextInt();
    m = scanner.nextInt();

    num = new int[n+1];
    t  = new int[n+1];//这里需要注意的一点就是，对于t数组来说 ，下标是从1开始的  
    for (int i = 1; i <= n; i++) {
        num[i]=scanner.nextInt();
        add(i,num[i]);//搭建树状数组
    }


    while (m>0){
        m--;

        int k = scanner.nextInt();
        int a = scanner.nextInt();
        int b = scanner.nextInt();

        if (k==1){
            add(a,b);
        }
        else {
            System.out.println(ask(b)-ask(a-1));//算出 区间和
        }

    }
}

——————————————————————————————————————————————————————————————
public static int lowbit(int x){
    return x&-x;
}

public static void add(int x , int k){
    for (int i = x; i <=n ; i += lowbit(i)) {
        t[i]+=k;
    }
}

public static int ask(int x){
    int ans=  0;
    for (int i = x; i >0 ; i-=lowbit(i)) {
        ans+=t[i];
    }
    return ans;
}
———————————————————————————————————————————————————————————————
```







****

# 数论



a和b不能组成的最大数 为 ab-a-b   反证法











****

# 杂

![截图](https://s2.loli.net/2022/04/18/l7JVPM169jzx5sN.png)

![截图](https://s2.loli.net/2022/04/18/2sQqoNAmUr8fkLE.png)



```java

public class Main_01 {


    static long [][] matrix = {
            {1,1,1},
            {1,0,0},
            {0,0,1}
    };

    static long [] s = {2,1,1};
    static long m ;
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        long n = scanner.nextLong();
        m = scanner.nextLong();

        long[] multiply = multiply(qpow(matrix, n - 2), s);

        System.out.println(multiply[0]%m);


    }


    public static long [] multiply(long [][] a ,long [] b){
        long [] res = new long[3];

        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                res[i]+=((a[i][j]%m)*(b[j]%m))%m;
            }
        }
        return res;
    }

    public static long [][] multiply(long [][] a , long [][] b){
        long [][] res = new long[3][3];
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                for (int k = 0; k < 3; k++) {
                    res[i][j]+=((a[i][k]%m)*(b[k][j]%m))%m;  //这里当m很大的时候 要考虑两个int相乘 
                                                              // 会超出Integer范围
                }
            }
        }
        return res;

    }
--------------------------------------------------------------矩阵快速幂
    public static long [][] qpow(long [][] a, long n){

        if (n==1){
            return a;
        }
        else {
            if (n%2==1)
                return multiply(qpow(a,n-1),a);
            else{
                long [][] temp = qpow(a,n/2);
                return multiply(temp,temp);
            }
        }

    }


}

```





## 欧拉回路

就是一笔画问题，如果图G中的一个路径包括每个边恰好一次，则该路径称为欧拉路径(Euler path)。

**无向图存在欧拉回路的充要条件**

> 一个无向图存在欧拉回路，当且仅当该图所有**顶点度数都为偶数**,且该图是连通图。

**有向图存在欧拉回路的充要条件**

> 一个有向图存在欧拉回路，所有顶点的**入度等于出度**且该图是连通图。





****

# 总结与心得

- 最好的算法都是根据题目本身的特点来设计的！（包括数据的特点、逻辑的特点等）
