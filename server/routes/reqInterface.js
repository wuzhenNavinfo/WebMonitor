import express from 'express'
import ReqestInfo from '../server/requestInfo'

var logger = require('../log4js').logger;

var router = express.Router();


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

module.exports = router;
