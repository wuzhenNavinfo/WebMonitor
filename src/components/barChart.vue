<template>
    <div>
        <div class="nodata" v-show="noData">
            <h3>{{noDataTitle}}</h3>
            <span>无数据</span>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
let chartObj, vueObj = {};
export default {
    data() {
        return {
            noData: false,
            noDataTitle: ''
        }
    },
    props: [],
    mounted: function () {
        vueObj[this.$options._parentVnode.data.ref] = this;
    },
    methods: {
        init:init,
        setOption: setOption,
        setData: setData
    }
}


function init(param){
    initContent(param.content);
    var option = JSON.parse(JSON.stringify(param.option));
    option.ref = param.content.ref;
    initChart(option);
}

/**
 * 初始化表格框样式
 */
function initContent(content){
    content = content || {};
    vueObj[content.ref].$el.id = content.id || createUUID();

    var style = {
        height: content.height || '100%',
        width: content.width || '100%',
        position: 'relative'
    }
    for(var o in style){
        vueObj[content.ref].$el.style[o] = style[o];
    }
}


/**
 * 初始化表格配置
 */
function initChart(option){
    if(option.data.length>0){
        vueObj[option.ref].noData = false;
        var extendOption = {
            backgroundColor: 'rgba(51,51,51,0)',
            title: { 
                text: '' || option.title,
                x: 'center',
                textStyle: {
                    color: '#fff',
                    fontWeight: 'normal',
                    fontSize: 16
                }
            },
            tooltip: {},
            xAxis: {
                type: 'category',
                data: option.xAxis || []
            },
            yAxis: {
                type: 'value',
                minInterval:1,
                axisLabel : {
                    margin:'0',
                    formatter:function(value){
                        if(value >1000){
                            value = value/1000 + ' K';
                        }
                        return value;
                    }
                }
            },
            label:{
                normal: {
                    show: true,
                }
            },
            series: [{
                type: 'bar',
                center: ['20px','60%'],
                barWidth: 10,
                itemStyle: {
                    normal: {
                        color: '#009688',
                        label: {
                            show: true,
                            position: 'top'
                        }
                    }
                },
                data: option.data || []
            }]
        };
        chartObj = echarts.init(document.getElementById(vueObj[option.ref].$el.id), 'dark');
        chartObj.setOption(extendOption);
    }else{
        vueObj[option.ref].noData = true;
        vueObj[option.ref].noDataTitle = option.title;
    }
}

/**
 * 设置图标配置信息
 */
function setOption(option){
    var extendOption = {
        title: { text: '' || option.title},
        tooltip: {},
        xAxis: {
            show: false
        },
    yAxis: {
        show: false
    },
    series: [{
        type: 'pie',
        data: option.data || []
    }]};
    chartObj.setOption(extendOption);
}

/**
 * 设置图表数据
 * @param {Array} data 图表数据
 */
function setData(data){
    var option = chartObj.getOption();
    option.series[0].data = data;
    chartObj.setOption(option);
    // chartObj.getOption().series[0].data = data;
}

/**
 * 随机生成ID
 * @return {String} ID值
 */
function createUUID(){
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return ('uuid_' + S4() + S4() + '_' + S4() + '_' + S4());
}

</script>
<style scoped lang="less">
    .nodata{
        color: #fff;
        height: 100%;
        h3{
            font-size: 16px;
            font-weight: normal;
        }
        span{
            display: block;
            margin-top: 30%;
        }
    }
</style>
