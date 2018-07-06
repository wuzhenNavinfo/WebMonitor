import dbHelper from '../dbHelper/DBConnection'

/**
 * 用户记录error的类
 */
class ErrorInfo {

    /**
     * 保存错误日志信息的方法
     * @param paramArr
     * @param callback
     */
    saveErrorInfo(paramArr, callback) {
        let sqlParam = [];

        for (let i = 0; i < paramArr.length; i++) {
            let temp = {
                sql: 'INSERT INTO error_info(msg, url, line, col, error_msg, error_stack, user_token, web_time, service_time) VALUES(?, ?, ?, ?, ?, ?, ?, ?, now())',
                params: [paramArr[i].message, paramArr[i].url, paramArr[i].lineNum, paramArr[i].colNum, paramArr[i].error.message, paramArr[i].error.stack, paramArr[i].token, paramArr[i].time]
            };
            sqlParam.push(temp);
        }


        dbHelper.execTrans(sqlParam, function (err, info) {
            if(err){
                console.error("事务执行失败");
            }else{
                console.log("done.");
            }
            if (callback) {
                callback();
            }
        });
    }
}

export default ErrorInfo;
