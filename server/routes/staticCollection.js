import express from 'express'
import User from '../server/user'
import ReqestInfo from '../server/requestInfo'
import ErrorInfo from "../server/error";

var logger = require('../log4js').logger;

var router = express.Router();

/**
 * 用户信息收集
 */
router.post('/saveUserInfo', function (req, res, next) {
	try {

		let ip = req.ip;

		let parm = JSON.parse(req.body.parameter);
		parm.ip = ip;

		let user = new User();
		user.saveUserInfo(parm, function () {
			res.json({errcode: 0, data: null, errmsg: ''});
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
});

/**
 * 接口请求信息收集
 */
router.post('/saveReqInfo', function (req, res, next) {
	try {
		let parm = JSON.parse(req.body.parameter);
		let reqestInfo = new ReqestInfo();
		reqestInfo.saveReqInfo(parm,function () {
			res.json({errcode: 0, data: null, errmsg: ''});
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
});

/**
 * 操作异常信息收集
 */
router.post('/saveErrorInfo', function (req, res, next) {
	try {
		let parm = JSON.parse(req.body.parameter);
		let errorInfo = new ErrorInfo();
		errorInfo.saveErrorInfo(parm, function () {
			res.json({errcode: 0, data: null, errmsg: ''});
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
});

module.exports = router;
