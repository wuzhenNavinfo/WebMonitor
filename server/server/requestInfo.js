import dbHelper from '../dbHelper/DBConnection'

/**
 * 接口请求信息控制类
 */
class RequestInfo {

    /**
     * 保存接口信息的方法
     * @param paramArr
     * @param callback
     */
    saveReqInfo(paramArr, callback) {
        let sqlParam = [];

        for (let i = 0; i < paramArr.length; i++) {
            let temp = {
                sql: 'INSERT INTO req_info(url, param, flag, use_time,user_token, track, web_time, service_time) VALUES(?, ?, ?, ?, ?, ?, ?, now())',
                params: [paramArr[i].url, JSON.stringify(paramArr[i].parameter), paramArr[i].flag, paramArr[i].time, paramArr[i].userToken, paramArr[i].track, paramArr[i].currentTime]
            };
            sqlParam.push(temp)
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

export default RequestInfo;
