import express from 'express'
import Statistics from '../server/view/statistics'
import ResJson from '../utils/ResJson'

var logger = require('../log4js').logger;

var router = express.Router();


/**
 * 查询地图显示点的接口
 *
 */
router.get('/view/mapShow', function (req, res, next) {
	try {
		let statistics = new Statistics();
		let resJson = new ResJson();
		statistics.mapShow().then(function (data) {
			resJson.data = data;
			res.json(resJson);
		}).catch(function (err) {
			resJson.errcode = -1;
			resJson.errmsg = err.message;
			res.json(resJson);
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
});

/**
 * 用户占比接口
 * 是否需要try catch, 需要，主要目的是用于获取参数时的异常处理，调用statistics.userOnline()异常时候需要使用catch捕获异常
 *
 */
router.get('/view/userOnline', function (req, res, next) {
    try {
    	let statistics = new Statistics();
    	let resJson = new ResJson();
	    statistics.userOnline().then(function (data) {
		    resJson.data = data;
			res.json(resJson);
		}).catch(function (err) {
			resJson.errcode = -1;
			resJson.errmsg = err.message;
		    res.json(resJson);
	    });
    } catch (error) {
        logger.error(error);
        next(error);
    }
});

/**
 * 浏览器版本的统计
 */
router.get('/view/browser', function (req, res, next) {
	try {
		let statistics = new Statistics();
		let resJson = new ResJson();
		statistics.browserList().then(function (data) {
			resJson.data = data;
			res.json(resJson);
		}).catch(function (err) {
			resJson.errcode = -1;
			resJson.errmsg = err.message;
			res.json(resJson);
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
});

/**
 * 统计平均接口时间最长的10个省份
 */
router.get('/view/interfaceTime', function (req, res, next) {
	try {
		let statistics = new Statistics();
		let resJson = new ResJson();
		statistics.interfaceTime().then(function (data) {
			resJson.data = data;
			res.json(resJson);
		}).catch(function (err) {
			resJson.errcode = -1;
			resJson.errmsg = err.message;
			res.json(resJson);
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
});

/**
 * 统计平均页面渲染时间最长的10个省份
 */
router.get('/view/loadPageTime', function (req, res, next) {
	try {
		let statistics = new Statistics();
		let resJson = new ResJson();
		statistics.loadPageTime().then(function (data) {
			resJson.data = data;
			res.json(resJson);
		}).catch(function (err) {
			resJson.errcode = -1;
			resJson.errmsg = err.message;
			res.json(resJson);
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
});


/**
 * 统计接口错误个数最多的10个省份
 */
router.get('/view/interfaceError', function (req, res, next) {
	try {
		let statistics = new Statistics();
		let resJson = new ResJson();
		statistics.interfaceError().then(function (data) {
			resJson.data = data;
			res.json(resJson);
		}).catch(function (err) {
			resJson.errcode = -1;
			resJson.errmsg = err.message;
			res.json(resJson);
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
});


/**
 * 首页列表接口，统计近一周的接口错误总数，接口平均耗时，程序异常人员数量
 */
router.get('/view/staticList', function (req, res, next) {
	try {
		let statistics = new Statistics();
		let resJson = new ResJson();
		statistics.staticList().then(function (data) {
			resJson.data = data;
			res.json(resJson);
		}).catch(function (err) {
			resJson.errcode = -1;
			resJson.errmsg = err.message;
			res.json(resJson);
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
});

module.exports = router;
