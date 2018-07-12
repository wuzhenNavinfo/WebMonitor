/**
 * 公共方法
 * @author    wuzhen
 * @date      2018/07/11
 * @copyright @Navinfo, all rights reserved.
 */
class Utils {

	/**
	 * 字符串时间格式转换
	 * 将20180705125959转换为2018 07 05 12:59:59
	 * @param str
	 * @return {String}
	 */
	static dateFormate(str) {
		if (!str) {
			return str;
		}
		str += ''; // 放置传递的是数字串
		if (str.length != 8 && str.length != 14) {
			throw new Error('参数的长度有误，请确认参数');
		}
		if (str.length == 8) {
			return str.substring(0, 4) + "-" + str.substring(4, 6) + "-" + str.substring(6, 8) + " 00:00:00";
		}
		if (str.length == 14) {
			return str.substring(0, 4) + "-" + str.substring(4, 6) + "-" + str.substring(6, 8) +
				" " + str.substring(8, 10) + ":" + str.substring(10, 12) + ":" + str.substring(12, 14);
		}
	}
}

export default Utils;