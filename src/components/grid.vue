<template>
    <div>
        <el-table :data="tableData" style="width: 100%" @row-click="onRowClick">
            <!-- <el-table-column v-for="col in cols" :prop="col.prop" :label="col.label">
            </el-table-column> -->
            <el-table-column prop="date" label="日期">
            </el-table-column>
            <el-table-column prop="name" label="姓名">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
        </el-table>
        <el-pagination :page-size="pageSize" :current-page="pageNo" layout="prev, pager, next" :total="tableData.length" @current-change="changePage" v-show="tableData.length>0">
        </el-pagination>
    </div>
</template>

<script>

import Element from 'element-ui';
let gridObj, vueObj = {};
export default {
    name: 'grid',
    data() {
        return {
            cols:[{
                label: '日期',
                prop: 'date'
            },{
                label: '姓名',
                prop: 'name'
            },{
                label: '地址',
                prop: 'address'
            }],
            pageNo: 1,
            pageSize: 20,
            tableData: []
        }
    },
    props: [],
    mounted: function () {
        vueObj[this.$options._parentVnode.data.ref] = this;
    },
    methods: {
        initContent: initContent,
        onRowClick: function(){},
        changePage: function(){}
    }
}

/**
 * 初始化表格框样式
 */
function initContent(content){
    content = content || {};
    vueObj[content.ref].$el.id = content.id || createUUID();

    var style = {
        height: content.height || '300px',
        width: content.width || '100%'
    }
    for(var o in style){
        vueObj[content.ref].$el.style[o] = style[o];
    }
    document.getElementById(vueObj[content.ref].$el.id).getElementsByClassName('el-table__body')[0].style.maxHeight = (content.height - 70) +'px'
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
<style lang="less">
    @import '/element-ui/lib/theme-chalk/index.css';
    .el-table th, .el-table tr {
        
    }
    .el-table td, .el-table th{
        padding: 5px 0;
    }
    .el-table {
        .el-table__empty-block{
            background-color: #666;
            span{
                color:white;
            }
        }
        th{
            background-color: #666; 
            color: #ccc;
            border-bottom: 1px solid #999;
            // border-right:1px solid white;
        }
        tr:nth-child(odd){
            background-color: #333; 
            color: #ccc;
            cursor: pointer;
            td{
                border-right:1px solid #999;
                border-bottom: 1px solid #999;
            }
        }
        tr:nth-child(even){
            background-color: #666; 
            color: #ccc;
            cursor: pointer;
            td{
                border-right:1px solid #999;
                border-bottom: 1px solid #999;
            }
        }
        tr:hover{
            color:#333;
            background-color: #999;
        }
    }
    .el-table__body{
        max-height: 600px;
        display: block;
        overflow: auto;
    }
    .el-pagination{
        padding: 2px 0px;
    }
    .el-pager li, .el-pagination .btn-next, .el-pagination .btn-prev, .el-pagination .btn-next, .el-pagination .btn-prev, .el-pagination button:disabled{
        background:#ccc;
    }
    
</style>
