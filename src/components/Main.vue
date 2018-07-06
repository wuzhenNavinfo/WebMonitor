<template>
  <div class="container">
    <div class="stable" >
      <on-off-line class="arrange-v"></on-off-line>
    </div>
    <div class="change">

    </div>
    <div class="stable">

    </div>
  </div>
</template>

<script>
  import OnOffLine from './OnOffLine.vue'
  import { login, registerApi } from '../dataService/api';
  import { appUtil } from '../config';
  import { Utils } from '../common/js/utils.js'

  export default {
    name: 'Main',
    data () {
      return {
      }
    },
    components: {
      OnOffLine
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .container {
    height: 100%;
    width: 100%;
    background-color: #333; // rgb(6, 19, 37)
  }
  .container{
    height: 100%;
    display:flex; /*设为伸缩容器*/
    flex-flow:row; /*伸缩项目单行排列*/
    align-items: center; /* 上下居中 */
    //overflow: hidden;
    .stable {
      width:400px; /*固定宽度*/
      height: 100%;
      border: solid red 1px;
    }
    .change {
      flex:1; /*这里设置为占比1，填充满剩余空间*/
      height: 100%;
      min-width: 600px;
    }
  }
</style>

