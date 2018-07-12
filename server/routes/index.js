import staticView from './staticView'
import staticCollection from './staticCollection'

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
	 * 监控统计数据收集
	 */
	app.use('/webMonitor/statisCollection', staticCollection);

    /**
     * 用于接口统计的路由
     */
    app.use('/webMonitor/statis', staticView);
};

export default routerDispatcher;
