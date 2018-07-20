# WebMonitor
Web端的监控平台，后端nodeJs服务+mysql数据库，以及用于监控结果展示Web界面.
# 发布时配置
 修改src/config.js文件，设置服务访问路径 http://fs-road.navinfo.com/dev/trunk/webMonitor/service

# 开发环境部署说明：
 - 1: nginx配置：
    a: nginx使用的是 192.168.4.188机器上的/usr/local/nginx-svr-dev/conf/fastmap/。
    b: 修改upstream.conf 文件增加了webMonitorCluster，service.conf文件增加了/dev/trunk/webMonitor/service/，webapps.conf增加了/dev/trunk/webMonitor/。
    c: 重启nginx的方法: 进入到/usr/local/nginx-svr-dev/sbin 目录下，然后执行 ./nginx -t 先检查下配置文件是否正确，如果正确然后在执行 ./nginx -s reload 重新启动
 - 2: 监控的web界面部署在192.168.4.188上，服务部署在192.168.4.130上（原因是 nginx是部署在188上的，所以web界面也是需要部署在188上【除非在其他机器上在搭建web服务器】；服务不部署在188上的原因是188上有测试的nodejs服务,所以部署在了130上）
    web界面部署路径（188）: /app/trunk/web/webMonitor/
    服务部署路径（130）: /app/web/WebMonitor/

