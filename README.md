# blog.node

1. mongod.conf 
```
#mongodb config file
dbpath=/Users/zhoujian/mongodb/data/db/
logpath=/Users/zhoujian/mongodb/mongod.log    
logappend = true
port = 27017
fork = true
auth = true
```

   2.   mongod Mac 环境配置： command + shift + . 查看当前用户中的.bash_profile 粘贴 
                                   
```
 export PATH=/Users/zhoujian/mongodb/bin:$PATH
```

3 。 Auth  在对应的表中  use $sheet   db.auth($username,$password)

```
db.createUser( { user: “accountAdmin01” ,
pwd: "changeMe",                
customData: { employeeId: 12345 },
roles: [
    { role: "clusterAdmin", db: "admin" },
    { role: "readAnyDatabase", db: "admin" }
]
```

```
Built-In Roles（内置角色）：
1. 数据库用户角色：read、readWrite;
2. 数据库管理角色：dbAdmin、dbOwner、userAdmin；
3. 集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager；
4. 备份恢复角色：backup、restore；
5. 所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
6. 超级用户角色：root  
// 这里还有几个角色间接或直接提供了系统超级用户的访问（dbOwner 、userAdmin、userAdminAnyDatabase）
7. 内部角色：__system
```

#已完成
1./list 列表
2./detailById 详情
3./login 登录
4./add 发布
5./update 修改
