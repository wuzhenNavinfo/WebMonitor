import reqInterface from './reqInterface';
import user from './user'
import error from './error'
import staticView from './staticView'

/**
 * 顶层路由控制器
 * @param app
 */
const routerDispatcher = function (app) {

    /**
     * 测试路由
     */
    app.use('/test', function (req, res) {
        res.end('test');
    });

    /**
     * 和接口请求有关的路由
     */
    app.use('/webMonitor/interface', reqInterface);

    /**
     * 和用户有关的路由
     */
    app.use('/webMonitor/user', user);

    /**
     * 和错误信息有关的路由
     */
    app.use('/webMonitor/error', error);

    /**
     * 用于接口统计的路由
     */
    app.use('/webMonitor/statis', staticView);
};

export default routerDispatcher;
