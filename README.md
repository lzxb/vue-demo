fork from

我们配置下我们各自电脑的ssh，步骤如下：

1、新建github账号的 ssh-key
```
ssh-keygen -t rsa -C "yourEmail@blabla.com"

```

2、提示命名key的文件名
```
Generating public/private rsa key pair.
Enter file in which to save the key (/path/to/your/.ssh/id_rsa):
```

起一个容易标识的名字 like :
```
id_rsa_yourName

```

3、复制 .ssh/id_rsa_yourName.pub文件内容到`https://github.com/settings/profile`的`SSH and GPG keys`里面
这样你就可以push啦

4、修改.ssh目录下的config文件（如果没有就新建）
```
# 建一个gitlab别名，新建的帐号使用这个别名做克隆和更新
Host github.com
 HostName github.com
 User git
 IdentityFile ~/.ssh/id_rsa_yourName

 ```
