# mysql



## mysql主从复制

MySQL主从复制是一个异步的复制过程，底层是基于Mysql数据库自带的二进制日志功能。就是一台或多台MySQL数据库(slave，即从库)从另一台MySQL数据库(master，即主库）**进行日志的复制然后再解析日志并应用到自身，最终实现从库的数据和主库的数据保持一致**。MySQL主从复制是MySQL数据库自带功能，无需借助第三方工具。



我们可以通过mysql的主从复制，来实现**读写分离**



我的服务器mysql配置文件在/etc/mysql/mysql.conf.d/mysqld.cnf

mysql的数据是保存在，/var/lib/mysql/ 这个 目录下，每新建一个数据库就是在这个目录下新增一个文件夹

![image-20221029094343597](https://s2.loli.net/2022/10/29/RGrTkIZhnwHNldt.png)

```shell
第一步:修改Mysql数据库的配置文件/etc/my . cnf
[mysqld]
log-bin=mysql-bin
#[必须]启用二进制日志
server-id=100
#[必须]服务器唯一ID
```

```mysql
第二步:重启mysql服务
systemctl restart mysqld

第三步:登录Mysql数据库,执行下面SQL
GRANT REPLICATION SLAVE ON *.* to 'xiaoming'@'%' identified by 'Root@123456';
注:上面SQL的作用是创建一个用户xiaoming,密码为Root@123456,并且给xiaoming用户授予REPLICATION SLAVE
权限。常用于建立复制时所需要用到的用户权限，也就是slave必须被master授权具有该权限的用户，才能通过该用户复制。


```



## MySQL 基础架构

连接器->分析器->优化器->执行器

![img](https://s2.loli.net/2022/12/07/8qxz1tJLv2eiyPR.png)

存储引擎是基于表的，而不是数据库





## 索引

B树，m叉数

B+树，多叉树

**B 树& B+树两者有何异同呢？**

- B 树的所有节点既存放键(key) 也存放 数据(data)，而 B+树只有叶子节点存放 key 和 data，其他内节点只存放 key。
- B 树的叶子节点都是独立的;B+树的叶子节点有一条引用链指向与它相邻的叶子节点。
- B 树的检索的过程相当于对范围内的每个节点的关键字做二分查找，可能还没有到达叶子节点，检索就结束了。而 B+树的检索效率就很稳定了，任何查找都是从根节点到叶子节点的过程，叶子节点的顺序检索很明显。





## 模拟数据脚本









## checkpoint

在[数据库系统](https://baike.baidu.com/item/数据库系统?fromModule=lemma_inlink)中，写日志和写数据文件是数据库中IO消耗最大的两种操作，在这两种操作中写数据文件属于分散写，写日志文件是顺序写，因此为了保证数据库的性能，通常数据库都是保证在提交([commit](https://baike.baidu.com/item/commit/9214278?fromModule=lemma_inlink))完成之前要先保证日志都被写入到日志文件中，而脏数据块则保存在数据缓存(buffer cache)中再不定期的分批写入到数据文件中。也就是说日志写入和提交操作是同步的，而数据写入和提交操作是不同步的。这样就存在一个问题，当一个数据库崩溃的时候并不能保证缓存里面的[脏数据](https://baike.baidu.com/item/脏数据/631511?fromModule=lemma_inlink)全部写入到数据文件中，这样在实例启动的时候就要使用日志文件进行恢复操作，将[数据库恢复](https://baike.baidu.com/item/数据库恢复/3949044?fromModule=lemma_inlink)到崩溃之前的状态，保证数据的一致性。检查点是这个过程中的重要机制，通过它来确定，恢复时哪些重做日志应该被扫描并应用于恢复。

一般所说的checkpoint是一个数据库事件(event)，checkpoint事件由checkpoint进程([LGWR](https://baike.baidu.com/item/LGWR/1281226?fromModule=lemma_inlink)/[CKPT](https://baike.baidu.com/item/CKPT/1274375?fromModule=lemma_inlink)进程)发出，当checkpoint事件发生时[DBWR](https://baike.baidu.com/item/DBWR/1274116?fromModule=lemma_inlink)会将脏块写入到磁盘中，同时数据文件和控制文件的[文件头](https://baike.baidu.com/item/文件头/2695144?fromModule=lemma_inlink)也会被更新以记录checkpoint信息。

作用：

- 保证数据库的一致性，这是指**将脏数据写入到硬盘，保证内存和硬盘上的数据是一样的**;
- 缩短实例恢复的时间，实例恢复要把实例异常关闭前没有写出到硬盘的[脏数据](https://baike.baidu.com/item/脏数据/631511?fromModule=lemma_inlink)通过日志进行恢复。如果脏块过多，实例恢复的时间也会很长，检查点的发生可以**减少脏块的数量，从而提高实例恢复的时间**。







## 备份与恢复



mysqldump





## mysql脚本



```mysql
SELECT * FROM `test`

DELIMITER $$
CREATE FUNCTION rand_string(n INT) RETURNS VARCHAR(255)
BEGIN
	DECLARE chars_str VARCHAR(100) DEFAULT 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	DECLARE return_str VARCHAR(255) DEFAULT '';
	DECLARE i INT DEFAULT 0;
	
	WHILE i < n DO
		SET return_str=CONCAT(return_str,SUBSTRING(chars_str,FLOOR(1+RAND()*52),1));
		SET i = i+1;
	END WHILE;
	RETURN return_str;
END $$


DELIMITER $$
CREATE FUNCTION rand_num() RETURNS INT(5)
BEGIN
	DECLARE i INT DEFAULT 0;
	SET i = FLOOR(10 + RAND()*10000);
	RETURN i;
END $$


DELIMITER $$
CREATE FUNCTION rand_datetime(sd DATETIME,ed DATETIME) RETURNS DATETIME
BEGIN
	RETURN DATE_ADD(sd,INTERVAL FLOOR(1+RAND()*((ABS(UNIX_TIMESTAMP(ed)-UNIX_TIMESTAMP(sd)))-1)) SECOND);
END$$


DELIMITER $$
CREATE FUNCTION rand_factor() RETURNS VARCHAR(255)
BEGIN
	DECLARE i INT DEFAULT 0;
	DECLARE return_str VARCHAR(255) DEFAULT '';
	SET i = RAND()*2;
	IF i%2 =1 THEN
		SET return_str="new_buy_order_value";
	ELSE
		SET return_str="new_sell_order_value";
	END IF;
		
	RETURN return_str;
END $$




DELIMITER $$
CREATE PROCEDURE insert_flink(IN max_num INT(10))
BEGIN
	DECLARE i INT DEFAULT 0;
	SET autocommit = 0;
	REPEAT
		SET i = i + 1;
		INSERT INTO test(SecurityID,FactorName,TradeDate,`Value`) VALUES(rand_string(7),rand_factor(),rand_datetime("2023-01-01 00:00:00","2023-12-31 23:59:59"),rand_num());
	UNTIL i = max_num
	END REPEAT;
	COMMIT;
END $$


DELIMITER ;
CALL insert_flink(10);
```





