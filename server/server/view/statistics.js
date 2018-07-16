import dbHelper from '../dbHelper/DBConnection'
var logger = require('../../log4js').logger;

/**
 * 用户查询统计的接口类
 */
class StatisticsInfo {

	/**
	 * 查询用户在线离线状态的接口
	 * 距离当前时间大于2小时代表离线
	 * @return {Promise.<TResult>}
	 */
    userOnline() {
    	// 查询 用户的最后操作时间距离当前时间的小时
        let sql = `SELECT DISTINCT(u.user_id) , TIMESTAMPDIFF(HOUR, MAX(r.service_time), NOW()) lead_time FROM user_info u LEFT JOIN req_info r ON u.user_token = r.user_token WHERE r.service_time IS NOT NULL GROUP BY u.user_id`;
        return dbHelper.execPromiseSelect(sql).then(function (data) {
        	let list = [];
        	let onLine = 0;
        	let offLine = 0;
			for (let i = 0; i < data.length; i++) {
				if (data[i]['lead_time'] > 2) { // 距离当前时间大于2小时代表离线
					offLine++;
				} else {
					onLine++;
				}
			}
	        list.push({
		        value: offLine,
		        name: '离线'
	        });
	        list.push({
		        value: onLine,
		        name: '在线'
	        });
            return list;
        }).catch(function (error) { // 可以不用捕捉异常，在顶层进行捕捉
	        throw new Error(error);
        });
    }

    /**
     * 加载地图显示用户数以及坐标的方法
     */
    mapShow() {
	    let sql = `SELECT  location, COUNT(location) user_count FROM user_info GROUP BY location`;
	    return dbHelper.execPromiseSelect(sql).then(function (data) {
		    let list = [];
		    for (let i = 0; i < data.length; i++) {
			   list.push({
				   geometry: data[i].location,
				   users: data[i].user_count
			   })
		    }
		    return list;
	    });
    }

    /**
     * 根据点坐标查询当前点的有结果异常的用户id
     * @param location
     * @return {Promise.<TResult>}
     */
    queryErrorByLocation(location) {
        let sql = ` SELECT DISTINCT(u.user_id) userId FROM user_info u, req_info r WHERE u.location = ? AND u.user_token = r.user_token AND r.flag != 0 AND r.service_time > DATE_SUB(NOW(), INTERVAL 1 MONTH) `;
        let param = [location];
        return dbHelper.execPromiseSelect(sql, param).then(function (data) {
            let list = [];
            for (let i = 0; i < data.length; i++) {
                list.push({
                    userId: data[i].userId
                })
            }
            return list;
        });
    }

    /**
	 * 浏览器版本分布的统计
	 */
    browserList() {
		let sql = `SELECT browser, COUNT(browser) num FROM user_info GROUP BY browser`;
		return dbHelper.execPromiseSelect(sql).then(function (data) {
			let list = [];
			for (let i = 0; i < data.length; i++) {
				list.push({
					value: data[i].num,
					name: data[i].browser
				})
			}
			return list;
		});
	}

	/**
	 * 统计平均接口时间最长的10个省份
	 */
	interfaceTime() {
		let sql = ` SELECT u.province, TRUNCATE(AVG(r.use_time), 2) average_use_time FROM user_info u LEFT JOIN req_info r 
					ON u.user_token = r.user_token 
					WHERE r.use_time > 0 AND r.service_time > DATE_SUB(NOW(), INTERVAL 1 MONTH) GROUP BY u.province ORDER BY  average_use_time DESC LIMIT 0, 10 `;
		return dbHelper.execPromiseSelect(sql).then(function (data) {
			let list = [];
			for (let i = 0; i < data.length; i++) {
				list.push({
					value: data[i]['average_use_time'],
					name: data[i]['province']
				})
			}
			return list;
		});
	}

	/**
	 * 统计平均页面渲染时间最长的10个省份(最近一个月)
	 */
	loadPageTime() {
		let sql = ` SELECT u.province, TRUNCATE(AVG(t.target_value), 2) average_value FROM user_info u LEFT JOIN target_info t 
				ON u.user_token = t.user_token WHERE t.target_code = 'domTimeout' AND t.service_time > DATE_SUB(NOW(), INTERVAL 1 MONTH)
				GROUP BY u.province ORDER BY average_value DESC LIMIT 0, 10 `;
		return dbHelper.execPromiseSelect(sql).then(function (data) {
			let list = [];
			for (let i = 0; i < data.length; i++) {
				list.push({
					value: data[i]['average_value'],
					name: data[i]['province']
				})
			}
			return list;
		});
	}

	/**
	 * 统计接口错误个数最多的10个省份(最近一个月)
	 */
	interfaceError() {
		let sql = ` SELECT u.province, COUNT(r.flag) num FROM user_info u , req_info r 
					WHERE u.user_token = r.user_token AND r.flag != 0 and r.service_time > DATE_SUB(NOW(), INTERVAL 1 MONTH)
					GROUP BY u.province ORDER BY num DESC LIMIT 0, 10`;
		return dbHelper.execPromiseSelect(sql).then(function (data) {
			let list = [];
			for (let i = 0; i < data.length; i++) {
				list.push({
					value: data[i]['num'],
					name: data[i]['province']
				})
			}
			if (list.length == 0) { // 如果没有查询出数据，默认给陕西并且值为0
				list.push({
					value: 'Shaanxi',
					name: 0
				})
			}
			return list;
		});
	}

	/**
	 * 首页列表接口，统计近一周的接口错误总数，接口平均耗时，程序异常人员数量
	 */
	staticList() {
		let sql1 = ` SELECT COUNT(0) error_count FROM req_info WHERE flag != 0 and service_time > DATE_SUB(NOW(), INTERVAL 1 MONTH) `; // DATE_SUB(CURDATE(), INTERVAL 1 DAY) 近一月
		let sql2 = ` SELECT TRUNCATE(AVG(use_time), 2) use_time FROM req_info WHERE flag != 0 AND use_time > 0 AND service_time > DATE_SUB(NOW(), INTERVAL 1 MONTH) `;
		let sql3 = ` SELECT DISTINCT(u.user_id) FROM error_info e LEFT JOIN user_info u 
						ON e.user_token = u.user_token 
						WHERE e.service_time > DATE_SUB(NOW(), INTERVAL 1 MONTH) `;
		let promise1 = dbHelper.execPromiseSelect(sql1).then(function (data) {
			return {
				errorCount : data[0]['error_count']
			};
		});
		let promise2 = dbHelper.execPromiseSelect(sql2).then(function (data) {
			return {
				loadTime : data[0]['use_time']
			};
		});
		let promise3 = dbHelper.execPromiseSelect(sql3).then(function (data) {
			let ret = {};
			ret.errUserCount = data.length;
			let arr = [];
			for (let i = 0; i < ret.length; i++) {
				arr.push(ret[i]['user_id']);
			}
			ret.errUserIds = arr.join(',');
			return ret;
		});

		return Promise.all([promise1, promise2, promise3]).then(function (data) {
			return {
				interfaceError: data[0].errorCount,
				loadTime: data[1].loadTime,
				errUserCount: data[2].errUserCount,
				errUserIds: data[2].errUserIds
			};
		});
	}

	/**
	 * 详细列表界面接口
	 * 查询接口错误和正常请求
	 */
	detailList(pageNo, pageSize, type, beginTime, endTime, userId) {
		let promises = [];
		if (type == 1) { // 异常
			let p = this.queryErrorList(pageNo, pageSize, beginTime, endTime, userId);
			promises.push(p);
		} else if (type == 2) { // 接口请求
			let p = this.queryReqList(pageNo, pageSize, beginTime, endTime, userId);
			promises.push(p);
		}

		var arr = this.detailByParam(beginTime, endTime, userId);
		promises = promises.concat(arr);
		return Promise.all(promises).then(function (data) {
			return {
				list: data[0],
				overview: {
					useRate: data[1].useRate,
					loadTimeout: data[2].loadTimeout,
					interfaceTime: data[3].useTime,
					interfaceErrors: data[4].errorCounts,
				}
			};
		});
	}

	/**
	 * 详情列表界面的左侧数据统计的接口
	 * @param beginTime
	 * @param endTime
	 * @param userId
	 * @return {[null,null,null,null]}
	 */
	detailByParam(beginTime, endTime, userId) {
		let sql1 = ``;
		let sql1_1 = `SELECT AVG(t.target_value) avgVal FROM user_info u, target_info t WHERE u.user_token = t.user_token and t.target_code = 'usedJSHeapSize' `; // 内存使用率--使用的内存
		let sql1_2 = `SELECT AVG(t.target_value) avgVal FROM user_info u, target_info t WHERE u.user_token = t.user_token and t.target_code = 'totalJSHeapSize' `; // 内存使用率--总内存
		let sql2 = ` SELECT TRUNCATE(AVG(t.target_value), 2) loadTimeout FROM user_info u, target_info t WHERE u.user_token = t.user_token and t.target_code = 'loadTimeout' `; // 平均页面加载时间
		let sql3 = ` SELECT TRUNCATE(AVG(t.use_time), 2) useTime FROM user_info u , req_info t WHERE u.user_token = t.user_token  AND t.use_time > 0 `; // 平均接口耗时
		let sql4 = ` SELECT COUNT(0) errorCounts FROM user_info u , req_info t WHERE u.user_token = t.user_token  AND  t.flag != 0 `;
		if (userId) {
			sql1_1 += ` and u.user_id = ${userId} `;
			sql1_2 += ` and u.user_id = ${userId} `;
			sql2 += ` and u.user_id = ${userId} `;
			sql3 += ` and u.user_id = ${userId} `;
			sql4 += ` and u.user_id = ${userId} `;
		}
		if (beginTime) {
			sql1_1 += ` and t.service_time >= '${beginTime}' `;
			sql1_2 += ` and t.service_time >= '${beginTime}' `;
			sql2 += ` and t.service_time >= '${beginTime}' `;
			sql3 += ` and t.service_time >= '${beginTime}' `;
			sql4 += ` and t.service_time >= '${beginTime}' `;
		}
		if (endTime) {
			sql1_1 += ` and t.service_time <= '${endTime}' `;
			sql1_2 += ` and t.service_time <= '${endTime}' `;
			sql2 += ` and t.service_time <= '${endTime}' `;
			sql3 += ` and t.service_time <= '${endTime}' `;
			sql4 += ` and t.service_time <= '${endTime}' `;
		}

		sql1 = ` select TRUNCATE((${sql1_1})/(${sql1_2}), 4) useRate from dual `;

		let promise1 = dbHelper.execPromiseSelect(sql1).then(function (data) {
			let ret = {};
			ret.useRate = 0; // 默认为0,防止数据为空的情况
			if (data.length > 0) {
				ret.useRate = data[0]['useRate'];
			}
			return ret;
		});

		let promise2 = dbHelper.execPromiseSelect(sql2).then(function (data) {
			let ret = {};
			ret.loadTimeout = 0; // 默认为0,防止数据为空的情况
			if (data.length > 0) {
				ret.loadTimeout = data[0]['loadTimeout'];
			}
			return ret;
		});

		let promise3 = dbHelper.execPromiseSelect(sql3).then(function (data) {
			let ret = {};
			ret.useTime = 0; // 默认为0,防止数据为空的情况
			if (data.length > 0) {
				ret.useTime = data[0]['useTime'];
			}
			return ret;
		});

		let promise4 = dbHelper.execPromiseSelect(sql4).then(function (data) {
			let ret = {};
			ret.errorCounts = 0; // 默认为0,防止数据为空的情况
			if (data.length > 0) {
				ret.errorCounts = data[0]['errorCounts'];
			}
			return ret;
		});

		let promise = [promise1, promise2, promise3, promise4];
		return promise;
	}

	/**
	 * 获取异常接口
	 * @param pageNo
	 * @param pageSize
	 * @param beginTime
	 * @param endTime
	 * @param userId
	 * @return {Promise.<TResult>}
	 */
	queryErrorList(pageNo, pageSize, beginTime, endTime, userId) {
		let param = [];
		let sql = ` SELECT e.* FROM error_info e LEFT JOIN user_info u  ON e.user_token = u.user_token where 1 = 1 `;
		if (userId) {
			sql += ` and u.user_id = ?`;
			param.push(userId);
		}
		if (beginTime) {
			sql += ` and e.service_time >= ?`;
			param.push(beginTime);
		}
		if (endTime) {
			sql += ` and e.service_time <= ?`;
			param.push(endTime);
		}
		sql += ' order by e.service_time asc limit ?, ?';
		param.push((pageNo - 1)  * pageSize);
		param.push(pageSize);


		return dbHelper.execPromiseSelect(sql, param).then(function (data) {
			let list = [];
			for (let i = 0; i < data.length; i++) {
				list.push({
					id: data[i]['id'],
					userToken: data[i]['user_token'],
					msg: data[i]['msg'],
					url: data[i]['url'],
					line: data[i]['line'],
					col: data[i]['col'],
					errorMsg: data[i]['error_msg'],
					errorStack: data[i]['error_stack'],
					webTime: data[i]['web_time'],
					serviceTime: data[i]['service_time'],
				})
			}
			return list;
		});
	}

	/**
	 * 获取请求列表
	 * @param pageNo
	 * @param pageSize
	 * @param beginTime
	 * @param endTime
	 * @param userId
	 * @return {Promise.<TResult>}
	 */
	queryReqList(pageNo, pageSize, beginTime, endTime, userId) {
		let param = [];
		let sql = ` SELECT r.* FROM req_info r LEFT JOIN user_info u ON r.user_token = u.user_token WHERE 1 = 1  `;
		if (userId) {
			sql += ` and u.user_id = ? `;
			param.push(userId);
		}
		if (beginTime) {
			sql += ` and r.service_time >= ? `;
			param.push(beginTime);
		}
		if (endTime) {
			sql += ` and r.service_time <= ? `;
			param.push(endTime);
		}
		sql += ' order by r.service_time asc limit ?, ? ';
		param.push((pageNo - 1)  * pageSize);
		param.push(pageSize);


		return dbHelper.execPromiseSelect(sql, param).then(function (data) {
			let list = [];
			for (let i = 0; i < data.length; i++) {
				list.push({
					id: data[i]['id'],
					userToken: data[i]['user_token'],
					url: data[i]['url'],
					param: data[i]['param'],
					flag: data[i]['flag'],
					useTime: data[i]['use_time'],
					track: data[i]['track'],
					webTime: data[i]['web_time'],
					serviceTime: data[i]['service_time'],
				})
			}
			return list;
		});
	}
}

export default StatisticsInfo;
