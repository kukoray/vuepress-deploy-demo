# git常用命令

![image-20221018115203991](https://s2.loli.net/2022/10/18/lbJgpCOr2kAGnjt.png)



git工作区中文件的状态

> - untracked 未跟踪（未被纳入版本控制）
> - tracked 已跟踪（被纳入版本控制）
>     - unmodified  未修改状态
>     - modified  已修改状态
>     - staged   已暂存状态



## 全局设置

```shell
git config --global user.naem "kukoray"
git config --global user.email "kukoray@163.com"

查看配置项信息
git config --list

另外git的配置其实是一个文件，找到该文件也可以修改配置
```



## 常用命令

本地仓库

```shell
git status 查看文件状态
git add 将文件的修改加入暂存区
	1】git add test.txt
	2】git add .
git reset 将暂存区的文件取消暂存或者是切换到指定版本
	1】git reset test.txt
	2】git reset --hard 090950e68cc099c5c021194d14v18d7516sad456
	ps:这里面的版本信息，可以通过git log 来查看所提交的 所有版本信息
git commit 将暂存区的文件修改提交到版本库
	1】git commit -m "这里输入提交信息"
git log 查看日志
```

远程仓库

```shell
git remote 查看远程仓库（如果是clone下来的项目，会自动配置好了remote信息，init的项目需要手动配置）
	1】git remote
	2】git remote -v
git remote add <shortName> <url> 添加远程仓库
	1】git remote add origin https://gitee.com/kukoray/test.git
git clone <url>从远程仓库克隆
git pull [remote-name] [remote-branch-name]从远程仓库拉取
git push [remote-name] [remote-branch-name]推送到远程仓库
```







## 分支操作

查看分支

```shell
git branch       列出所有本地分支
git branch -r    列出所有远程分支
git branch -a    列出所有本地分支和远程分支
git branch -b [name] 创建分支并跳转

// 删除本地分支,ps:如果你还在一个分支上，那么 Git 是不允许你删除这个分支的。所以，请记得退出分支
git branch -d localBranchName

// 删除远程分支
git push origin --delete remoteBranchName
```

 创建分支

```shell
git branch [name]

ex:
git branch hfutplus_dev     在本地创建一个名为hfutplus_dev的分支

```

切换分支

```shell
git checkout master 
```

推送本地分支至远程仓库

```shell
git push origin hfutplus_dev     将本地名为hfutplus_dev的分支推送至远程仓库
```

分支合并

``` shell
git merge [name]

例如：如果当前在master分支
git merge dev      作用是：将dev分支merge到当前所在的分支，dev分支不会发生改变


当分支发生冲突时，需要解决完冲突，在提交
如果解决完冲突，提交时commit还是报错
可以使用 git commit "XXXX" -i 来忽略报错
```



```shell
git add test.txt    是将test.txt文件加入到缓存区
git commit -m "推送缓存区所有文件至当前本地仓库的分支"
git push origin master    将本地的分支推送到远程仓库
```



标签操作：类似于一种快照技术，对于当前版本的情况进行一个记录，标签内的内容是无法修改的

```shell
git tag   列出已有标签
git tag [name] 创建标签
git push [shortName] [name] 将标签推送至远程仓库.   shortName是远程仓库的别名 一般都是origin
git checkout -b [branch] [name] 检出标签，创建一个新的分支来检出这个标签
```



## gitignore





```shell
# 当远程仓库有一些其他的提交历史，需要拉取的时候做
git pull origin master --allow-unrelated-histories
```

