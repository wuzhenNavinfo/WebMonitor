<template>
  <div style="width:100%;height:100%;background-color: #333">
    <div class="container">
      <div class="queryArea">
        <span>用户ID：<input type="input" placeholder="请输入ID" v-model="userid" style="height: 20px;"/></span>
        <span>类型：<select v-model="type"><option value="0">异常</option><option value="1">请求</option></select></span>
        <span>搜索时间：开始&nbsp;&nbsp; <input type="datetime-local" v-model="startTime"/>&nbsp;&nbsp;~ 结束&nbsp;&nbsp;<input type="datetime-local" v-model="endTime"/></span>
        <span class="queryButton" v-on:click="query">查询</span>
      </div>
      <div class="mainArea">
        <div class="rightArea">
          <div class="tableSpan">
            <grid ref="Grid"></grid>
          </div>
          <div class="tableDetail"></div>
        </div>
        <div class="leftArea">
          <div class="leftSpan">
            <ul>
              <li><span>内存使用率：</span><span class="resultSpan">{{CPUUse}}</span></li>
              <li><span>页面渲染耗时：</span><span class="resultSpan">{{loadPageTime}}</span></li>
              <li><span>接口平均耗时：</span><span class="resultSpan">{{interfaceTime}}</span></li>
              <li><span> 接口错误数：</span><span class="resultSpan">{{InterfaceError}}</span></li>
            </ul>
          </div>
          <div class="leftSpan">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import grid from './grid.vue';
  import { detailList } from '../dataService/api';
  import { appUtil } from '../config';
  import { Utils } from '../common/js/utils.js';
  var self;
  export default {
    name: 'Query',
    data () {
      return {
        userid:'',
        type: 0,
        startTime: initDate(86400000),
        endTime: initDate(),
        CPUUse: '无数据',
        loadPageTime: '无数据',
        interfaceTime: '无数据',
        InterfaceError: '无数据'
      }
    },
    mounted:function(){
      self = this;
    },
    components: {
      grid
    },
    methods: {
      query: query
    }
  }


  /**
   * 初始化时间
   */
  function initDate(time){
    time = time || 0;
    var currentDate = new Date(new Date().getTime() - time);
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth()>8? (currentDate.getMonth() + 1) :'0' + (currentDate.getMonth() + 1);
    var day = currentDate.getDate()>9? currentDate.getDate() : '0' + currentDate.getDate();
    var hour = currentDate.getHours()>9? currentDate.getHours() :'0' + currentDate.getHours();
    var minutues = currentDate.getMinutes()? currentDate.getMinutes() : '0' + currentDate.getMinutes();
    return year + '-' + month + '-' + day + 'T' + hour + ':' + minutues;
  }
  /**
   * 根据条件查询
   */
  function query(){

    function dealDate(time, char){
      var tempStr = time;
      char.forEach(function(ele){
        tempStr = tempStr.split(ele).join('');
      })
      return tempStr;
    }

    var param = {
      startTime: dealDate(self.startTime,['-','T',':']),
      endTime: dealDate(self.endTime,['-','T',':']),
      userId: self.userid,
      pageSize: 50,
      pageNo: 1
    }
    detailList(param).then(function(res){
      if(!res.errcode){
        self.CPUUse = res.data.memUse;
        self.loadPageTime = res.data.loadTime + ' 毫秒';
        self.interfaceTime = res.data.interfaceTime + ' 毫秒';
        self.InterfaceError = res.data.interfaceErrors + ' 个';
        self.$refs.Grid.tableData = res.data.list;
      }
    })
  }
</script>

<style scoped lang="less">
  .container {
    color: #FFF;
    height: 100%;
    width: 100%;
    margin: auto;
    border: 2px solid #009688;
    background-color: #333;
    align-items: center;
    position: relative;
    padding-top: 100px;
    box-sizing: border-box;
    .queryArea{
      border: 1px solid #009688;
      width: 100%;
      height: 100px;
      position: absolute;
      top:0;
      span{
        margin: 0 14px;
        line-height: 100px;
        padding: 12px;
        background-color: #444;
      }
      .queryButton{
        padding: 6px 16px;
        background-color: #009688;
        cursor: pointer;
      }
    }
    .mainArea{
      box-sizing: border-box;
      height: 100%;
      .leftArea{
        border: 1px solid #009688;
        width: 25%;
        height: 100%;
        box-sizing: border-box;
        float: left;
        .leftSpan{
          height: 50%;
          border: 1px solid #009688;
          box-sizing: border-box;
          ul{
            list-style: decimal;
            margin: 0;
            padding: 16px 27px;
            li{
              font-size: 14px;
              line-height: 38px;
              .resultSpan{
                color: #2aea78;
                margin-left: 5px;
                font-size: 15px; 
              }
            }
          }
        }
      }
      .rightArea{
        border: 1px solid #009688;
        width: 75%;
        box-sizing: border-box;
        height: 100%;
        float: right;
        .tableSpan{
          height: 80%;
          box-sizing: border-box;
          border: 1px solid #009688;
        }
        .tableDetail{
          height: 20%;
          box-sizing: border-box;
          border: 1px solid #009688;
        }
      }
    }
  }
</style>

