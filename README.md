# Readme
Web端的监控平台，后端nodeJs服务+mysql数据库，以及用于监控结果展示Web界面。


![WebMonitor](https://github.com/870479457/WebMonitor/blob/master/static/readme/webmonitor.png)

## 目录

*  [发布时配置](#发布时配置)

*  [开发环境部署](#开发环境部署)

*  [背景介绍](#背景介绍)

*  [项目介绍](#项目介绍)

*  [使用说明](#使用说明)

*  [获取代码](#获取代码)

*  [搭配环境](#搭配环境)

*  [代码插入](#代码插入)

*  [其他](#其他)


<a  name="发布时配置"></a>

## 发布时配置
 修改src/config.js文件，设置服务访问路径 http://fs-road.navinfo.com/dev/trunk/webMonitor/service

<a  name="开发环境部署"></a>

## 开发环境部署说明：
 1: nginx配置：
 nginx使用的是 192.168.4.188机器上的/usr/local/nginx-svr-dev/conf/fastmap/。
 修改upstream.conf 文件增加了webMonitorCluster，service.conf文件增加了/dev/trunk/webMonitor/service/，webapps.conf增加了/dev/trunk/webMonitor/。
 重启nginx的方法: 进入到/usr/local/nginx-svr-dev/sbin 目录下，然后执行 ./nginx -t 先检查下配置文件是否正确，如果正确然后在执行 ./nginx -s reload 重新启动
 2: 监控的web界面部署在192.168.4.188上，服务部署在192.168.4.130上（原因是 nginx是部署在188上的，所以web界面也是需要部署在188上【除非在其他机器上在搭建web服务器】；服务不部署在188上的原因是188上有测试的nodejs服务,所以部署在了130上）
 web界面部署路径（188）: /app/trunk/web/webMonitor/
 服务部署路径（130）: /app/web/WebMonitor/


<a  name="背景介绍"></a>

## 背景介绍

**WebMonitor**，此次项目工程的英文名。<br/>

**数据监控界面**，此次项目工程的中文名。

<a  name="项目介绍"></a>

## 项目介绍

>**WebMonitor** 的设计初衷是给用户提供一个web端的监控平台。分前端监控组件+后端nodeJs服务+mysql数据库，以及用于监控结果展示Web界面。项目托管于平台GitHub，可以向项目工作人员共享项目内容。<br>

<a  name="使用说明"></a>

## 使用说明

### 实现项目流程图：
<img src="https://github.com/870479457/WebMonitor/blob/master/static/readme/%E5%AE%89%E8%A3%85%E6%B5%81%E7%A8%8B%E5%9B%BE.png" width="150" height="200" alt="流程图"/>
<a  name="获取代码"></a>

### 获取代码

1. **github**克隆项目内容,即下载代码:<br>

  
<img src="https://github.com/870479457/WebMonitor/blob/master/static/readme/githublogo.png" width="150" height="200" alt="githublogo"/>
* 1.1 首先进入`github`主页: <https://github.com>，如图：<br>
<img src="https://github.com/870479457/WebMonitor/blob/master/static/readme/GIThub.png" width="150" height="200" alt="github"/>
* 1.2 注册`github`账户<br>

* 1.3 账户登录，项目人员发出的邀请——接受邀请<br>

* 1.4 点击页面导航栏`Code`下的`Clone or download`按钮，复制*web站点URL*，如图：<br>
<img src="https://github.com/870479457/WebMonitor/blob/master/static/readme/codeURL.png" width="150" height="200" alt="CodeURL"/>
* 1.5 在本地主机任意一个磁盘下创建项目文件夹，在此目录下右键选择*git clone*即可将项目内容克隆到该文件夹中(需要安装`GIT`才可右键*git clone*)，如图：<br>
<img src="https://github.com/870479457/WebMonitor/blob/master/static/readme/Right%20Button.png" width="150" height="200" alt="Git Clone"/>
<a  name="搭配环境"></a>

### 搭配环境

>**WebMonitor**项目中，我们虽然主要编写的是web前端代码，但是需要模拟搭建后端来运行项目内容，所以在后端还没建立而前端已经编写出来时，就需要项目成员搭建后端的环境来配合前端来运行代码，以便于查看代码的不足之处以及确保项目顺利运行。此次项目所需的环境内容如下：

  | Logo | 网址  | 名称 |
| :------------ |:---------------:| -----:|
| ![Github](https://github.com/870479457/WebMonitor/blob/master/static/readme/githublogo.png)      | https://github.com/ | Github |
| ![nodejs](https://github.com/870479457/WebMonitor/blob/master/static/readme/nodejslogo.png)      | http://nodejs.cn/        |   node.js |
| ![GIT](https://github.com/870479457/WebMonitor/blob/master/static/readme/GITlogo.png) | https://git-scm.com |Git|


<br>
1. 安装分布式版本控制系统——**Git**：

* 1.1 首先进入**GIT**下载页面: <https://git-scm.com/downloads>，如图：<br>
<img src="https://github.com/870479457/WebMonitor/blob/master/static/readme/GITDownloads.png" width="150" height="200" alt="GITDownloads"/>
* 1.2 根据电脑操作系统，选择下载并安装对应的版本到磁盘文件夹中。<br>

* 1.3 这样一来鼠标单击右键才会有**Git**相关操作,日后方便更新代码等操作<br>
<img src="https://github.com/870479457/WebMonitor/blob/master/static/readme/Right%20Button.png" width="150" height="200" alt="Right Button"/>
2. 基于*JavaScript*语言和V8引擎的开源Web服务器项目——*node.js*
<br>
<img src="https://github.com/870479457/WebMonitor/blob/master/static/readme/nodejslogo.png" width="150" height="200" alt="nodejslogo"/>
>*node.js*的优势在于:借助*JavaScript*天生的事件驱动机制加V8高性能引擎，使编写高性能Web服务轻而易举,无需考虑浏览器兼容性问题。安装方法如下：

* 2.1 安装*node.js*：

* 2.1.1 首先需要进入*node.js*官网: <https://nodejs.org/en/>。<br>

* 2.1.2 选择*LTS(稳定版)*或*Current(常用版)*版本进行下载。<br>
* 2.1.3 安装*node.js*，默认勾选项方可。<br>
>安装完成*Node.js*后,*windows键+R*打开运行界面,输入*cmd*呼出命令行，输入*node -v*回车即可提示当前*node.js*版本号。
<br/>

<img src="https://github.com/870479457/WebMonitor/blob/master/static/readme/nodejsbanben.png" width="150" height="200" alt="nodejsbanben"/>

>也可输入*node*进入*Node.js*的交互环境。在交互环境下,你可以输入任意*JavaScript*语句,回车后将得到输出结果。
要退出*Node.js*环境，连按两次*Ctrl+C*。(注：如果版本号小于*v7.6.0*，说明*Node.js*版本不对,需要重新安装*node.js*新版本。)
<br/>

3. Node.js的包管理工具——*npm*

>在Node.js上开发时，会用到很多别人写的JavaScript代码。大家都把自己开发的模块打包后放到npm官网上,如果要使用,直接通过npm安装就可以直接用,而且npm可以根据依赖关系，把所有依赖的包都下载下来并管理起来。否则，靠我们自己手动管理，肯定既麻烦又容易出错<br/>

参考来源:<https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/00143450141843488beddae2a1044cab5acb5125baf0882000)>。

  

* 3.1 npm不需要去网站上下载什么,它随着node.js已经顺带着了,我们只需要打开命令行,进入项目目录盘符中，如图：我的项目盘符进入后显示为：**E:\work\WebMonitor>**：<br/>


* 3.2 由于安转包的时候下载的速度太慢,安装之前，我们需要切换镜像为淘宝的国内镜像：命令行输入：*npm config set registry <https://registry.npm.taobao.org>* 即可。切换完成后，可以通过命令行输入：*npm config get registry*来查看是否切换成功。

* 3.3 接下来在命令行：**E:\work\WebMonitor>**中输入**npm install**即可开始安装npm,等待若干分钟后会提示安装成功响应字符,若出现ERR开头的提示符,即安装失败，安装失败大多由于网络不稳定,需要多尝试几次或重启电脑。<br/>
<img src="https://github.com/870479457/WebMonitor/blob/master/static/readme/npminstall.png" width="150" height="200" alt="npminstall"/>
* 3.4 安装完成后换行输入***npm start***即可启动项目（此
<img src="https://github.com/870479457/WebMonitor/blob/master/static/readme/npmstart.png" width="150" height="200" alt="npmstart"/>

<a  name="代码插入"></a>

## 代码插入

```javascript
//代码高亮
/**
* @description 定义web app全局命名空间，并在此空间下定义属性和函数，以便全局使用
* @file api.js
* @author wuzhen
* @date 2017/11/1
*
* @copyright @Navinfo, all rights reserved.
*/
export const appConfig = {
appName: 'WebMonitor',
//serviceUrl: 'http://localhost:3000' // 开发环境的服务地址
serviceUrl: 'http://192.168.4.130:5000'
}
export const appUtil = {
}
```

<a name="介绍"></a>

## 介绍

```diff

+ 版本更新

- 版本删除

```

<a  name="其他"></a>

## 其他

特别希望看到该项目对您哪怕一点点的帮助。任意的意见和建议，欢迎随意与我沟通,联系方式：

* Email: <XXXXX@XXX.com>

* QQ:XXXXXX

项目的Bug和改进点，可在XX上以XX的方式提交给项目人员。