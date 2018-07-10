import dbHelper from '../dbHelper/DBConnection'

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
	 * 加载地图显示用户数以及坐标的方法
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
					WHERE r.use_time > 0 GROUP BY u.province ORDER BY  average_use_time DESC LIMIT 0, 10 `;
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
	 * 统计平均页面渲染时间最长的10个省份
	 */
	loadPageTime() {
		let sql = ` SELECT u.province, TRUNCATE(AVG(t.target_value), 2) average_value FROM user_info u LEFT JOIN target_info t 
				ON u.user_token = t.user_token WHERE t.target_code = 'domTimeout' 
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
	 * 统计接口错误个数最多的10个省份
	 */
	interfaceError() {
		let sql = ` SELECT u.province, COUNT(r.flag) num FROM user_info u , req_info r 
					WHERE u.user_token = r.user_token AND r.flag != 0 
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
		let sql1 = ` SELECT COUNT(0) error_count FROM req_info WHERE flag != 0 `;
		let sql2 = ` SELECT TRUNCATE(AVG(use_time), 2) use_time FROM req_info WHERE flag != 0 AND use_time > 0 `;
		let sql3 = ` `;
		let promise1 = dbHelper.execPromiseSelect(sql1).then(function (data) {
			let list = [];
			console.info(data);
			return list;
		});
		let promise2 = dbHelper.execPromiseSelect(sql2).then(function (data) {
			console.info(data);
			let list = [];
			return list;
		});

		return Promise.all([promise1, promise2]).then(function (data) {
			console.info(data);
			return data;
		});

	}

}

export default StatisticsInfo;
