# vue_fecshop_appserver

Fecshop Appserver 前后端彻底分离,VUE客户端部分代码。

DEMO：http://demo.fancyecommerce.com/

开发状态：【已完成】


1.首先您需要安装npm

**建议在window下面安装VUE部分**

linux 详细参看：[安装npm和nodejs](http://www.fancyecommerce.com/2017/07/12/%E5%AE%89%E8%A3%85npm%E5%92%8Cnodejs/)

window 详细参看：http://www.fecshop.com/doc/fecshop-guide/develop/cn-1.0/guide-fecshop-about-install-vue.html

2.全局安装 vue-cli：  

```
npm install -g vue-cli
```

3.下载本文件

```
git clone https://github.com/fecshop/vue_fecshop_appserver.git
```

4.进入上面下载的`文件夹vue_fecshop_appserver`，然后执行。

```
npm install 
```

这里需要很长一段时间，您也可以使用淘宝镜像,速度会快很多

```
npm install --registry=https://registry.npm.taobao.org
```

如果中间没有报错（warn警告信息就没问题的），则说明安装成功了

在`本页面的底部`有一些常见的问题的解决方式，您可以参看一下，如果出现的问题，里面没有
，可以自行搜索解决这些问题，大多数可能是库包缺失或者版本的问题导致`无法install`

下面进行配置工作

5.vue的配置

5.1文件包里面的文件说明：

`build`: 配置了webpack的基本配置、开发环境配置、生产环境配置

`config`: 中配置了路径端口值等

`node_modules`: 为依赖的模块

`src`: 放置组件和入口文件

`static`: 放置静态资源文件

`index.html`: 文件入口

5.2配置后端url地址和vue url地址

打开配置文件：

开发环境为:`config/dev.env.js`

生产环境为:`config/prod.env.js`

上面2个环境下的配置文件都可以看到下面的配置：

```
API_ROOT: '"//fecshop.appserver.fancyecommerce.com"',
WEBSITE_ROOT: '"//demo.fancyecommerce.com"'
```

`API_ROOT`: 是fecshop server部分的api url，也就是fecshop的appserver入口, 作为vue后端数据提供者

`WEBSITE_ROOT`: 这个是vue部分的域名，也就是访问vue的域名

**下面，我们以本地开发环境为例子进行配置**

您需要将这里改成您自己的域名，譬如：我的fecshop是docker配置的，
fecshop appserver入口url为：appserver.fecshop.com，
我打开配置文件`config/dev.env.js`，修改配置如下：

```
API_ROOT: '"//appserver.fecshop.com"',
WEBSITE_ROOT: '"//localhost:8080"'
```

在运行vue端之前，你要保证`//appserver.fecshop.com` 已经配置好，否则无法获取后端数据


5.3配置store

打开配置文件：src/config/store.js

可以看到

```

'domain': 'demo.fancyecommerce.com',
'lang_code' : 'zh',
'currency_code' : 'EUR'
```

`domain`: 这个是vue访问的url地址，和上面的`WEBSITE_ROOT`部分设置成一样即可

`lang_code`: 这个是默认的语言

`currency_code`: 默认的货币

因此，我们需要进行更改如下：

```
'domain': 'localhost:8080',
'lang_code' : 'zh',
'currency_code' : 'EUR'
```

5.4下面就可以执行了

在vue的根目录下面启动vue

5.4.1开发环境执行

```
npm run dev
```

执行成功后，访问`http://localhost:8080/#/` 即可访问


5.4.2生产环境执行，

```
npm run build
```

执行后，后在dist文件夹下面生成相应的html js css文件，您将nginx设置到这个路径即可
，使用生产环境，nginx设置的域名，需要到 `config/prod.env.js` 和  `src/config/store.js`
中设置，上面已经说明，这里不做陈述





6.其他说明

6.1、另外，vue里面有一些图片地址，是直接写上的，这个开发者自己替换掉自己的图片地址即可。

6.2、网站的多语言和多货币，是在服务端appserver中进行设置。


6.3、文档: [fecshop appserver api 状态码](http://www.fecshop.com/doc/fecshop-guide/develop/cn-1.0/guide-fecshop-server-return-code.html)

6.4、文档: [fecshop appserver的一些说明](http://www.fecshop.com/doc/fecshop-guide/develop/cn-1.0/guide-fecshop-server.html)




### 安装的报错解决

报错1:

```
npm ERR! phantomjs-prebuilt@2.1.14 install: `node install.js`

npm ERR! Exit status 1

npm ERR! 

npm ERR! Failed at the phantomjs-prebuilt@2.1.14 install script 'node install.js
```

解决：
```
npm install phantomjs-prebuilt@2.1.14 --ignore-scripts
```


报错2：

执行`npm install`报错如下

```
npm ERR! code EINTEGRITY
npm ERR! sha512-MKiLiV+I1AA596t9w1sQJ8jkiSr5+ZKi0WKrYGUn6d1Fx+Ij4tIj+m2WMQSGczs5jZVxV339chE8iwk6F64wjA== integrity checksum failed when using sha512: wanted sha512-MKiLiV+I1AA596t9w1sQJ8jkiSr5+ZKi0WKrYGUn6d1Fx+Ij4tIj+m2WMQSGczs5jZVxV339chE8iwk6F64wjA== but got sha512-n+6hC9m8/M79/zP73OVephxorZkaamBKLLwslR3SOUCqGyBpmyWwfdmqEs/NZGksb86QEJawH8+fz6iKNrYJKw==. (48732 bytes)

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\likang\AppData\Roaming\npm-cache\_logs\2017-12-14T11_24_54_278Z-debug.log
```

解决：


使用 `npm cache clean --force` 重新清理，然后重新 `npm install`, 成功


### 后续：


关于vue部分的多语言

> 多语言分为几个部分，api提供的多语言数据 和 VUE本身的多语言

10.1、api提供的多语言: 在fecshop appserver入口的翻译文件部分
处理，详细参看：[Fecshop 多语言](http://www.fecshop.com/doc/fecshop-guide/instructions/cn-1.0/guide-fecshop_mutil_lang.html)

10.2、VUE本身的多语言: 在文件路径  `/src/config/languages/` 下面就可以
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

