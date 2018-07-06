<template>
  <div style="height: 300px;" id="onOffLineChart"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  data() {
    return {

    }
  },
  props: [],
  mounted: function () {
    var myChart = echarts.init(document.getElementById('onOffLineChart'), 'dark');

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '作业员在线统计'
      },
      tooltip: {},
      xAxis: {
        show: false
      },
      yAxis: {
        show: false
      },
      series: [{
        name: '作业员在线统计',
        type: 'pie',
        // radius : '55%',
        data: [
          { value:5, name: '离线' },
          { value:20, name: '在线' }
        ]
      }]
    };
    myChart.setOption(option);
  },
  methods: {

  }
}
</script>

<style scoped lang="less">

</style>
