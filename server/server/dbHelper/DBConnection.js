/**
 * mysql数据库连接池配置，以及事物处理方法
 */
import mysql from 'mysql'
import async from 'async'
var logger = require('../../log4js').logger;

import config from '../../config/config'


var pool = mysql.createPool({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    port: config.mysql.port ? config.mysql.port : 3306
});

var execTrans = function (sqlArray, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            return callback(err, null);
        }
        connection.beginTransaction(function (err) {
            if (err) {
                return callback(err, null);
            }
            logger.info("开始执行transaction，共执行" + sqlArray.length + "条数据");
            var funcAry = [];
            sqlArray.forEach(function (sql_param) {
                var temp = function (cb) {
                    var sql = sql_param.sql;
                    var param = sql_param.params;
                    connection.query(sql, param, function (tErr, rows, fields) {
                        if (tErr) {
                            connection.rollback(function () {
                                logger.error("事务失败，" + sql_param + "，ERROR：" + tErr);
                                throw tErr;
                            });
                        } else {
                            return cb(null, 'ok');
                        }
                    })
                };
                funcAry.push(temp);
            });

            async.series(funcAry, function (err, result) {
                if (err) {
                    connection.rollback(function (err) {
                        logger.error("transaction error: " + err);
                        connection.release();
                        return callback(err, null);
                    });
                } else {
                    connection.commit(function (err, info) {
                        logger.info("transaction info: " + JSON.stringify(info));
                        if (err) {
                            logger.error("执行事务失败，" + err);
                            connection.rollback(function (err) {
                                connection.release();
                                return callback(err, null);
                            });
                        } else {
                            connection.release();
                            return callback(null, info);
                        }
                    })
                }
            })
        });
    });
};

var execSelect = function (sql, param, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err, null);
        }
        connection.query(sql, param, function (error, results, fields) {
            connection.release();
            if (error) {
                return callback(error, null);
            }
            return callback(null, results);
        });
    });
};

/**
 * 使用promise的方式查询sql
 * @param sql
 * @param param
 * @param callback
 * @return {Promise}
 */
var execPromiseSelect = function (sql, param = null) {
  return new Promise((resolved, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
          logger.error('获取数据库连接失败：', err);
          return reject(err);
      }
      connection.query(sql, param, function (error, results, fields) {
        connection.release();
        if (error) {
        	logger.error("sql:", sql);
	        logger.error("param:", param);
            logger.error('执行sql失败:', error);
            return reject(error);
        } else {
	        logger.info('执行sql成功结果：', results);
            return resolved(results)
        }
      });
    });
  });
};

let dbHelper = {
    execTrans: execTrans,
    execSelect: execSelect,
    execPromiseSelect: execPromiseSelect
}

export default dbHelper;
