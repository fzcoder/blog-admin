##  BLOG-ADMIN

一个使用 [Vue](https://github.com/vuejs/vue) 框架和 [element](https://github.com/ElemeFE/element) 组件库开发的个人博客网站后台管理端。

### 一、项目简介

该项目为个人博客网站后台管理端，采用 [Vue](https://github.com/vuejs/vue) 框架编写，集成了[vue router](https://github.com/vuejs/vue-router) 和 [axios](https://github.com/axios/axios)，并且采用 [element](https://github.com/ElemeFE/element) 作为UI组件库。

项目的服务端地址为: [https://github.com/fzcoder/blog-server](https://github.com/fzcoder/blog-server)

### 二、功能特性

本项目自`v2.0`版本起将支持在下载文章时添加一些静态博客（如：[hexo](https://github.com/hexojs/hexo)、[hugo](https://github.com/gohugoio/hugo) 等）所需要的一些头部信息，方便配合静态博客。关于本项目更多的功能特性，请详见 [Release](https://github.com/fzcoder/blog-server/releases) 版本说明。

### 三、安装部署

#### 1、克隆到本地

```bash
$ git clone https://github.com/fzcoder/blog-admin.git
```

#### 2、安装NPM依赖

首先请确保您已经安装了 [node.js](https://github.com/nodejs/node) 和 [npm](https://github.com/npm/cli)。

在安装完`node.js`和`npm`之后输入以下指令安装依赖：

```shell
$ npm i
```
如果您位于中国大陆，也可以通过淘宝镜像进行安装。首先需要安装`cnpm`

```shell
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```

之后便可用`cnpm`安装NPM依赖

```shell
$ cnpm i
```

#### 3、修改配置文件

在`src/`目录下找到`main-dev.js`和`main-prod.js`分别修改以下内容：

```javascript
// 配置请求的根路径
axios.defaults.baseURL = 'http://<host>:<port>/api'
```

将其中的`host`和`port`更改为你本地服务端的地址和端口号即可

#### 4、运行项目

首先请确保您已经安装了 [vue cli](https://github.com/vuejs/vue-cli)。

在安装完`vue cli`之后在项目根目录下打开控制台，输入以下命令以开发模式启动项目：

```shell
$ npm run serve
```