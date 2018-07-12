/**
 * 接口返回的数据格式类
 * @author    wuzhen
 * @date      2018/07/10
 * @copyright @Navinfo, all rights reserved.
 */
class ResJson {
    /**
     * 构造方法.
     * @returns {undefined}
     */
    constructor (errcode = 0, errmsg = '', data = null) {
        this.errcode = errcode;
        this.errmsg = errmsg;
        this.data = data;
    }
}

// export default ResJson;
module.exports = ResJson;