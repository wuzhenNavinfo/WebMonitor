import dbHelper from '../dbHelper/DBConnection'

/**
 * 用户记录user的类
 */
class UserInfo {

    /**
     * 保存用户登录信息的方法
     * @param paramArr
     * @param callback
     */
    saveUserInfo(param, callback) {
        let sqlParam = [];

        let userParam = {
            sql: 'INSERT INTO user_info(user_token, user_id, user_name, browser, login_time, location, ip, service_time) VALUES(?,?,?,?,?,?,?, NOW())',
            params: [param.userToken, param.userId, param.userName, param.browser, param.loginTime, param.location, param.ip]
        };

        sqlParam.push(userParam);
        if (param.target) {
            for (let k in param.target) {
                let targetParam = {
                    sql: 'INSERT INTO target_info(user_token, target_code,target_value,web_time,service_time) values(?,?,?,?, NOW())',
                    params: [param.userToken, k, param.target[k], param.loginTime]
                };
                sqlParam.push(targetParam);
            }
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

    test(param, callback) {
        let sql = 'SELECT id, target_code, target_value FROM target_info';
        let par = [];
        dbHelper.execSelect(sql, par, function (err, info) {
            if(err){
                console.error("查询失败");
            }else{
                console.log("done. 结果集为：",info);
            }
            if (callback) {
                callback(info);
            }
        });
    }
}

export default UserInfo;
