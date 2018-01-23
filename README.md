# vue_fecshop_appserver

Fecshop Appserver 前后端彻底分离,VUE客户端部分代码。

DEMO：http://demo.fancyecommerce.com/

开发状态：【已完成】


1.首先您需要安装npm，

```
version='5.12.0'
wget https://npm.taobao.org/mirrors/node/v${version}/node-v${version}-linux-x64.tar.gz
tar xzf node-v${version}-linux-x64.tar.gz
mv node-v${version}-linux-x64 /usr/local/nodejs

echo 'export NODEJS_HOME=/usr/local/nodejs' >> ~/.bash_profile
echo 'export PATH=$PATH:$NODEJS_HOME/bin' >> ~/.bash_profile
source ~/.bash_profile

echo checking nodejs:
node -v
echo checking npm:
npm -v

# 设置镜像
npm config set registry=http://registry.npm.taobao.org

```

1.2 安装bzip

```
yum install bzip2 bzip2-devel
```


2.全局安装 vue-cli：  

```
npm install -g vue-cli
```

3.下载本文件

```
git clone https://github.com/fecshop/vue_fecshop_appserver.git
```

4.进入上面下载的文件夹，然后执行。

```
npm install
```

这里需要很长一段时间，您也可以使用淘宝镜像  `cnpm install`

5.下面就可以执行了

开发环境执行

```
npm run dev
```

线上环境执行，

```
npm run build
```


6.文件包里面的文件说明：

`build`: 配置了webpack的基本配置、开发环境配置、生产环境配置

`config`: 中配置了路径端口值等

`node_modules`: 为依赖的模块

`src`: 放置组件和入口文件

`static`: 放置静态资源文件

`index.html`: 文件入口

7.配置

7.1、配置获取远程数据的地址：

开发环境为:`config/dev.env.js`

生产环境为:`config/prod.env.js`


7.1.1.src/config/store.js

将 `demo.fancyecommerce.com` 改成 `vue.fecshop.com`

7.1.2.config/prod.env.js

将 

```
module.exports = {
  NODE_ENV: '"production"',
  API_ROOT: '"//fecshop.appserver.fancyecommerce.com"',
  WEBSITE_ROOT: '"http://demo.fancyecommerce.com"'
}
```

改成：

```
module.exports = {
  NODE_ENV: '"production"',
  API_ROOT: '"//appserver.fecshop.com"',
  WEBSITE_ROOT: '"http://vue.fecshop.com"'
}
```

7.1.3.config/dev.env.js

将 

```
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"//fecshop.appserver.fancyecommerce.com"',
  WEBSITE_ROOT: '"//demo.fancyecommerce.com"'
})
```

改成：

```
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"//appserver.fecshop.com"',
  WEBSITE_ROOT: '"http://vue.fecshop.com"'
})
```


`src/config/store.js`:这里设置vue端的多语言store，
将`domain`改成您的vue端访问的域名，并设置相应的语言，
您还可以在这里添加其他的域名，设置默认访问的语言



因此，您需要先安装fecshop，并将appserver端配置好，提供api支持，vue才可以通过
api获取数据。

7.2、生产环境设置发布文件地址：

`config/index.js` 文件中的`assetsRoot`为设置生产环境的文件发布地址

```
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
```

这个，懂vue的都明白，也就是线上环境编译后文件的存放位置
，因此，在线上环境，您需要将nginx配置的域名指向该文件路径。


7.3、设置开发环境的地址和端口

设置地址：`build/dev-server.js`

```
 var uri = 'http://localhost:' + port
```

设置端口：config/index.js 设置dev里面的port，改为您想要更改的端口

```
port: 8080,
```


7.4、另外，vue里面有一些图片地址，是直接写上的，这个开发者自己替换掉自己的图片地址即可。

7.5、网站的多语言和多货币，是在服务端appserver中进行设置。

8.文档

8.1、文档: [fecshop appserver api 状态码](http://www.fecshop.com/doc/fecshop-guide/develop/cn-1.0/guide-fecshop-server-return-code.html)

8.2、文档: [fecshop appserver的一些说明](http://www.fecshop.com/doc/fecshop-guide/develop/cn-1.0/guide-fecshop-server.html)


9.多语言

> 多语言分为几个部分，api提供的多语言数据 和 VUE本身的多语言

9.1、api提供的多语言: 在fecshop appapi入口的翻译文件部分
处理，详细参看：[Fecshop 多语言](http://www.fecshop.com/doc/fecshop-guide/instructions/cn-1.0/guide-fecshop_mutil_lang.html)

9.2、VUE本身的多语言: 在文件路径  `/src/config/languages/` 下面就可以
看到各个语言对应的js类型的配置文件，多语言使用的是vue-i18n，
下面是这个组件的资料。

[vue-i18n github地址](https://github.com/kazupon/vue-i18n)

[vue-i18n 文档](http://kazupon.github.io/vue-i18n/en/started.html)

譬如设置中文使用多语言，/src/config/languages/zh_CN.js 加入hello的语言配置

```
const messagesZh = {
    hello: '你好、世界'
}
export default messagesZh
```

调用处代码：

```
    <p>{{ $t("message.hello") }}</p>
    <p>{{ $t("message.wowowo") }}</p>
```

当设置当前语言为中文zh的时候，就会显示语言配置里的中文字符。



### 问题：

1.多语言显示message.xxx，不显示相应的翻译

答：参看7.1步，设置`src/config/store.js`

2.切换语言不变语言，第二次切换才会剩下

答：打开文件 `src/view/body/home/Index.vue`, 将132行和140行的
`if(this.propsCurrency = 1){`
改成
`if(this.propsCurrency >= 1){`

