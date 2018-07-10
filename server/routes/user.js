import express from 'express'
import User from '../server/user'

var logger = require('../log4js').logger;

var router = express.Router();


router.post('/saveUserInfo', function (req, res, next) {
    try {
        // console.log('11111111111111111');
        // console.log('req.fresh:', req.fresh);
        // console.log('req.stale:', req.stale);
        // console.log('req.hostname:', req.hostname);
        // console.log('req.ip:', req.ip);
        // console.log('req.ips:', req.ips);
        // console.log('req.protocol:', req.protocol);
        // console.log('req.url:', req.url);
        // console.log('req.originalUrl:', req.originalUrl);
        // console.log('req.xhr:', req.xhr);
        // console.log('req.params:', req.params);
        // console.log('req.path:', req.path);
        // console.log('222222222222');

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

router.get('/test', function (req, res, next) {
    try {
        let ip = req.ip;

        // let parm = JSON.parse(req.body.parameter);
        let parm = {};

        let user = new User();
        user.test(parm, function (data) {
            res.json({errcode: 0, data: data, errmsg: ''});
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
});

module.exports = router;
