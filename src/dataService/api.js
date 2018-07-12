/**
 * @description 前端页面定义的接口调用
 * @file api.js
 * @author    wuzhen
 * @date      2018/07/04
 *
 * @copyright @Navinfo, all rights reserved.
 */

import axios from 'axios';
import { appConfig, appUtil } from '../config';

var baseUrl = appConfig.serviceUrl; // 服务的地址

// 统一增加token
var postReq = function (url, param) {
    if (!param) {
      param = {};
    }
    return axios.post(`${baseUrl + url}`, param).then(res => res.data).catch(res => ({errcode: null, message: '处理失败'}));
};
// 统一增加token
var getReq = function (url, param) {
  if (!param) {
    param = {};
  }
  return axios.get(`${baseUrl + url}`, {params: param}).then(res => res.data).catch(res => ({errcode: null}));
};

//地图作业员分布
export const mapShow = param => { return postReq('/webMonitor/statis/view/mapShow', param)};
//在线、离线用户数
export const userOnline = param => { return postReq('/webMonitor/statis/view/userOnline', param)};
//页面接口返回时间
export const interfaceTime = param => { return postReq('/webMonitor/statis/view/interfaceTime', param)};
//省份平均页面渲染时间
export const loadPageTime = param => { return postReq('/webMonitor/statis/view/loadPageTime', param)};
//浏览器使用占比
export const browser = param => { return postReq('/webMonitor/statis/view/browser', param)};
//十个省份接口错误
export const interfaceError = param => { return postReq('/webMonitor/statis/view/interfaceError', param)};
//首页列表
export const staticList = param => { return postReq('/webMonitor/statis/view/staticList', param)};
//详细列表
export const detailList = param => { return getReq('/webMonitor/statis/view/detailList', param)};
