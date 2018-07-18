<template>
  <div style="width:100%;height:100%;background-color: #333;min-height:500px;">
    <div class="container">
      <div class="queryArea">
        <span>用户ID：<input type="input" placeholder="请输入ID" v-model="userid" style="height: 20px;"/></span>
        <span>类型：<select v-model="type" v-on:change="changeType"><option value="1">异常</option><option value="2">请求</option></select></span>
        <span>搜索时间：开始&nbsp;&nbsp; <input type="datetime-local" v-model="startTime"/>&nbsp;&nbsp;~ 结束&nbsp;&nbsp;<input type="datetime-local" v-model="endTime"/></span>
        <span class="queryButton" v-on:click="query">查询</span>
      </div>
      <div class="mainArea">
        <div class="rightArea">
          <div class="tableSpan" id="tableEle">
            <grid ref="Grid"></grid>
          </div>
          <div class="dragLine" v-on:drag="dragDetail" >
            <div class="arrow" v-on:drag="dragDetail"></div>
          </div>
          <div class="tableDetail" id="detailEle">
            <div>
              <textarea>{{errorDetail}}</textarea>
            </div>
          </div>
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
  var self, currentPage = 1;
  export default {
    name: 'Query',
    data () {
      return {
        userid:'',
        type: 1,
        startTime: initDate(86400000),
        endTime: initDate(),
        CPUUse: '无数据',
        colWidth: 180,
        loadPageTime: '无数据',
        interfaceTime: '无数据',
        InterfaceError: '无数据',
        errorDetail: ''
      }
    },
    mounted:function(){
      self = this;
      lastY = document.getElementsByClassName('dragLine')[0].offsetTop; //鼠标的位置
      initGrid();
    },
    components: {
      grid
    },
    methods: {
      query: query,
      changeType: changeType,
      dragDetail: dragDetail
    }
  }

  function initGrid(){
    self.$refs.Grid.tableData = [];
    setTableColunm();

    self.$refs.Grid.onRowClick = function(rowData){
      if(self.type == 1){
        self.errorDetail = rowData.errorStack;
      }else{
        self.errorDetail = rowData.track;
      }
      
    }

    self.$refs.Grid.changePage = function(pageNo){
      currentPage = pageNo;
      query(pageNo);
    }
    self.$refs.Grid.initContent({
      id: 'detailTable',
      ref: 'Grid',
      height: document.getElementsByClassName('tableSpan')[0].offsetHeight
    });
  }

  function changeType(){
    setTableColunm();
    self.$refs.Grid.tableData = [];
  }

  var lastY;
  function dragDetail(e){
    var tableObj = document.getElementsByClassName('tableSpan')[0];
    var detailObj = document.getElementsByClassName('tableDetail')[0];
    var rightHeight = document.getElementsByClassName('rightArea')[0].offsetHeight;
    if(tableObj.offsetHeight < 300){
      tableObj.style.height = '300px';
      detailObj.style.height = rightHeight-300 + 'px';
      lastY = document.getElementsByClassName('dragLine')[0].offsetTop;
      return;
    }
    if(detailObj.offsetHeight < 100){
      detailObj.style.height = '100px';
      tableObj.style.height = rightHeight-100 + 'px';
      lastY = document.getElementsByClassName('dragLine')[0].offsetTop;
      return;
    }
    if(e.clientY == 0){
      return;
    }
    var moveY = e.clientY - lastY;
    lastY = e.clientY;
    tableObj.style.height = tableObj.offsetHeight + moveY + 'px';
    detailObj.style.height = detailObj.offsetHeight - moveY + 'px';
  }

  function setTableColunm(){
    var outerWidth = document.getElementsByClassName('tableSpan')[0].offsetWidth-5;
    if(self.type == 1){
      self.$refs.Grid.cols = [{
        label: '列号',
        prop: 'col',
        width: outerWidth/18
      },{
        label: '登录用户',
        prop: 'userName',
        width: outerWidth/18
      },{
        label: '错误概述',
        prop: 'errorMsg',
        width: outerWidth/9
      },{
        label: '错误详细',
        prop: 'errorStack',
        width: outerWidth*3/18
      },{
        label: '行号',
        prop: 'line',
        width: outerWidth/18
      },{
        label: '日期',
        prop: 'msg',
        width: outerWidth/9
      },{
        label: '服务时间',
        prop: 'serviceTime',
        width: outerWidth/9
      },{
        label: '接口url',
        prop: 'url',
        width: outerWidth/9
      },{
        label: '用户token',
        prop: 'userToken',
        width: outerWidth/9
      },{
        label: 'web时间',
        prop: 'webTime',
        width: outerWidth/9
      }]
    }else{
      self.$refs.Grid.cols = [{
        label: '接口状态',
        prop: 'flag',
        width: outerWidth/18,
        formatter:function(rowData){
          return rowData.flag === 0? '成功': '失败';
        }
      },{
        label: '参数',
        prop: 'param',
        width: outerWidth/9
      },{
        label: '登录用户',
        prop: 'userName',
        width: outerWidth/9
      },{
        label: '服务时间',
        prop: 'serviceTime',
        width: outerWidth/9
      },{
        label: '栈信息',
        prop: 'track',
        width: outerWidth*2/9
      },{
        label: '接口url',
        prop: 'url',
        width: outerWidth/9
      },{
        label: '接口耗间',
        prop: 'useTime',
        width: outerWidth/18
      },{
        label: '用户token',
        prop: 'userToken',
        width: outerWidth/9
      },{
        label: 'web时间',
        prop: 'webTime',
        width: outerWidth/9
      }]
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
    var minutues = currentDate.getMinutes()>9? currentDate.getMinutes() : '0' + currentDate.getMinutes();
    return year + '-' + month + '-' + day + 'T' + hour + ':' + minutues;
  }
  /**
   * 根据条件查询
   */
  function query(pageNo){
    initDetail();
    function dealDate(time, char){
      var tempStr = time;
      char.forEach(function(ele){
        tempStr = tempStr.split(ele).join('');
      })
      return tempStr + '00';
    }

    var param = {
      begin: dealDate(self.startTime,['-','T',':']),
      end: dealDate(self.endTime,['-','T',':']),
      userId: self.userid,
      pageSize: self.$refs.Grid.pageSize,
      pageNo: currentPage,
      type: self.type
    }
    detailList({parameter: JSON.stringify(param)}).then(function(res){
      if(!res.errcode){
        self.CPUUse = res.data.overview.useRate*100 + '%';
        self.loadPageTime = res.data.overview.loadTimeout + ' 毫秒';
        self.interfaceTime = res.data.overview.interfaceTime + ' 毫秒';
        self.InterfaceError = res.data.overview.interfaceErrors + ' 个';
        self.$refs.Grid.tableData = res.data.list;
        setTimeout(function(){
          self.$refs.Grid.refreshWidth();
        },100)
      }
    })
  }

  function initDetail(){
    self.$refs.Grid.tableData = [];
    self.CPUUse = '无数据';
    self.loadPageTime = '无数据';
    self.interfaceTime = '无数据';
    self.InterfaceError = '无数据';
  }
  
</script>

<style scoped lang="less">
  .container {
    color: #FFF;
    height: 100%;
    width: 100%;
    margin: auto;
    border: 2px solid #009688;
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
        width: 15%;
        height: 100%;
        box-sizing: border-box;
        float: left;
        .leftSpan{
          height: 50%;
          box-sizing: border-box;
          border: 1px solid #009688;
          ul{
            list-style: decimal;
            margin: 0;
            padding: 16px 27px;
            li{
              font-size: 14px;
              line-height: 38px;
              .resultSpan{
                color: #009688;
                margin-left: 5px;
                font-size: 15px; 
              }
            }
          }
        }
      }
      .rightArea{
        width: 85%;
        box-sizing: border-box;
        height: 100%;
        float: right;
        .tableSpan{
          height: 80%;
          box-sizing: border-box;
          border: 1px solid #009688;
          overflow: auto;
        }
        .tableDetail{
          margin-top: -5px; 
          height: 20%;
          box-sizing: border-box;
          border: 1px solid #009688;
          overflow: auto;
          div{
            height: 99%;
            border: none;
            textarea{
              width: 100%;
              height: 99%;
              background-color: #333;
              color: rgb(255, 255, 255);
              margin: 0px;
              resize: none;
              box-sizing: border-box;
              border: none;
            }
          }
        }
        .dragLine{
          width: 100%;
          height: 10px;
          position: relative;
          cursor: n-resize;
          z-index: 100;
          margin-top: -5px;
          .arrow{
            width: 0;
            height: 0;
            border-bottom: 10px solid #57d2de;
            border-left: 14px solid transparent;
            border-right: 14px solid transparent;
            position: absolute;
            left: 0;
            right: 0;
            top: -14px;
            cursor: n-resize;
            margin: auto;
          }
        }
      }
    }
  }
</style>

