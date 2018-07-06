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

export const queryCaseList = param => { return getReq('/api/bs/case/list', param)};





