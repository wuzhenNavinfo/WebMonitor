/**
 * 项目中的一些常量配置类（单例类）
 */
const conf = Object.freeze({
    // mysql的配置项
    mysql: {
        host:'192.168.4.189',
        user:'root',
        password:'',
        database:'web_monitor',
        port: 3306
    }
});

export default conf;