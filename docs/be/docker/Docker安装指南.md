net.ipv4.ip_forward 设置决定了系统是否允许 IP 层的数据包转发，即是否启用路由器功能。将其设置为 1 意味着开启 IP 转发功能。

```
cat >> /etc/sysctl.conf <<-'EOF'
net.ipv4.ip_forward=1
EOF
sysctl -p

```

通过 yum 包管理器安装三个软件包：

yum-utils：这是 Yum 工具集，提供了许多用于管理和维护 Yum 软件包及其仓库的实用程序，比如自动解决依赖关系、创建和管理本地 Yum 仓库等。
device-mapper-persistent-data：这是 Device Mapper 持久化数据相关的软件包，Device Mapper 是 Linux 内核中的一种通用块设备映射机制，常用于 LVM（逻辑卷管理）和 Docker 等容器技术，这个包提供了一些必要的数据存储支持。
lvm2：这是第二代逻辑卷管理器（Logical Volume Manager）的软件包，LVM 是一种灵活的磁盘管理工具，可以方便地对磁盘进行扩展、缩小、迁移等操作，对于需要动态调整存储空间的场景非常有用。

```
yum install -y yum-utils device-mapper-persistent-data lvm2

```

添加阿里云 Docker 镜像仓库地址:

```
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

更新 yum 缓存:

```
yum makecache fast
```

安装 Docker 引擎:

```
yum -y install docker-ce
```

启动 Docker 服务:

```
service docker start
```

查看 Docker 版本信息:

```
docker version
```

```
mkdir -p /etc/docker
tee /etc/docker/daemon.json <<-'EOF'
{
 "registry-mirrors": ["https://fskvstob.mirror.aliyuncs.com"]
}
EOF

```

重新加载 systemd 配置:

```
systemctl daemon-reload
```

重启 Docker 服务:

```
sudo systemctl restart docker
```

设置 Docker 服务开机自启动:

```
sudo systemctl enable docker
```

docker compose

```yml
services:
  db:
    # We use a mariadb image which supports both amd64 & arm64 architecture
    image: mariadb:10.6.4-focal
    # If you really want to use MySQL, uncomment the following line
    #image: mysql:8.0.27
    command: '--default-authentication-plugin=mysql_native_password'
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=somewordpress
      - MYSQL_DATABASE=wordpress
      - MYSQL_USER=wordpress
      - MYSQL_PASSWORD=wordpress
    expose:
      - 3306
      - 33060
  wordpress:
    image: wordpress:latest
    volumes:
      - wp_data:/var/www/html
    ports:
      - 80:80
    restart: always
    environment:
      - WORDPRESS_DB_HOST=db
      - WORDPRESS_DB_USER=wordpress
      - WORDPRESS_DB_PASSWORD=wordpress
      - WORDPRESS_DB_NAME=wordpress
volumes:
  db_data:
  wp_data:
```
