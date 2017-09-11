# vue_fecshop_appserver

开发演示地址：http://demo.fancyecommerce.com/

目前还在开发中...

做fecshop的前后端彻底分离部分的前端界面部分

1. 首先您需要安装npm，详细参看：[安装npm和nodejs](http://www.fancyecommerce.com/2017/07/12/%E5%AE%89%E8%A3%85npm%E5%92%8Cnodejs/)

2. 全局安装 vue-cli：  

```
npm install -g vue-cli
```

3. 下载本文件

```
git clone https://github.com/fecshop/vue_fecshop_appserver.git
```

4. 进入上面下载的文件夹，然后执行。

```
npm install
```

这里需要很长一段时间，您也可以使用淘宝镜像  `cnpm install`

5. 下面就可以执行了

开发环境执行

```
npm run dev
```

线上环境执行，

```
npm run build
```


6. 文件包里面的文件说明：

build中配置了webpack的基本配置、开发环境配置、生产环境配置

config中配置了路径端口值等

node_modules为依赖的模块

src放置组件和入口文件

static放置静态资源文件

index.html文件入口

7. 配置

7.1 配置获取远程数据的地址：

开发环境为:config/dev.env.js

生产环境为:config/prod.env.js

修改 `API_ROOT` 的值：

```
API_ROOT: '"https://cnodejs.org/api/v1"'
```


7.2 生产环境设置发布文件地址：

config/index.js 文件中的assetsRoot为设置生产环境的文件发布地址

```
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
```


7.3 设置开发环境的地址和端口

设置地址：build/dev-server.js

```
 var uri = 'http://localhost:' + port
```

设置端口：config/index.js 设置dev里面的port，改为您想要更改的端口

```
port: 8080,
```












