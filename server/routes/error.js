import express from 'express'
import ErrorInfo from "../server/error";

var logger = require('../log4js').logger;

var router = express.Router();


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