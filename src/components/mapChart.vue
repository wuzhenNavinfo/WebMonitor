<template>
    <div id="china-map" style="width:100%;height:100%"></div>
</template>

<script>
import echarts from 'echarts'
import chinaMap from 'echarts/map/js/china'
let chartObj, vueObj = {};
export default {
    data() {
        return {}
    },
    props: [],
    mounted: function () {
        vueObj[this.$options._parentVnode.data.ref] = this;
    },
    methods: {
        init:init,
        setData: setData,
        mapClick:function(){}
    }
}


function init(param){
    initContent(param.content);
    var option = JSON.parse(JSON.stringify(param.option));
    option.ref = param.content.ref;
    initMap(option);
}


function initMap(option){
    var mapOption = {
	title : {
		subtextStyle: {color: '#000000'},
        text: '',
        textStyle: {
            color: '#fff',
            fontWeight: 'normal',
            fontSize: 20
        },
        x: 'center',
        y: '30px'
	},
	tooltip: {
		show : false
	},
	series : [
	   {
           type: 'map',
            mapType: 'china',
            hoverable: false,
            roam:true,
		//    coordinateSystem: 'geo',
		   //将业务点映射到地图,先默认为空
		   data: [],
		   symbolSize: 7,
		   symbolRotate: 35,
		   label: {
			   normal: {
				   formatter: '{b}',
				   position: 'right',
                   show: true,
                   color: '#ccc',
			   }
		   },
		   itemStyle: {
			   normal: {
                    color: '#FF0000',
                    areaColor:'#666',
                    borderColor: 'rgba(0, 0, 0, 0.3)'
			   },
			   emphasis:{
                    areaColor: '#aaa',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20,
                    borderWidth: 0,
                    shadowColor: 'rgba(204, 204, 204, 0.5)'
			    }
           },
           markPoint : {
                symbol:'emptyCircle',
                symbolSize : function (v){
                    return v + 15
                },
                effect : {
                    show: false,
                    shadowBlur : 0
                },
                itemStyle: {
                    normal: {
                        // borderColor: '#0f0',
                        // borderWidth: 1,
                        label: {
                            show: true,
                            // color: '#000'
                        }
                    }
                },
                data : []
            }
		},            
	]
};
//然后就是将option添加到地图展示:
chartObj = echarts.init(document.getElementById(vueObj[option.ref].$el.id));
chartObj.setOption(mapOption);

chartObj.on('click', function(param){
    for(var o in vueObj){
        if(vueObj[o].mapClick){
            vueObj[o].mapClick(param);
        }
    }
 });
}
/**
 * 初始化表格框样式
 */
function initContent(content){
    content = content || {};
    vueObj[content.ref].$el.id = content.id || createUUID();

    var style = {
        height: content.height || '300px',
        width: content.width || '300px'
    }
    for(var o in style){
        vueObj[content.ref].$el.style[o] = style[o];
    }
}

/**
 * 设置图表数据
 * @param {Array} data 图表数据
 */
function setData(data){
    var option = chartObj.getOption();
    option.series[0].markPoint.data = data;
    chartObj.setOption(option);
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
</style>
