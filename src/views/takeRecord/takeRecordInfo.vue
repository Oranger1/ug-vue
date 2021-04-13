<template>
    <div>
        <el-container>
          <el-header style="height:'';">
              <el-row v-show="!isshow">
                  <el-col :span="6">
                      <el-input size="medium" clearable v-model="params.username" placeholder="请输入乘车码">
                        <i class="el-icon-search el-input__icon" slot="prefix" @click="handleIconClick">
                        </i>
                        <el-button @click="getData" class="filterBtn" style="background: #2769DC; color: #fff; border-radius: 0;" slot="append">搜索</el-button>
                      </el-input>
                  </el-col>
                  <el-col :span="6" style="display: flex; line-height: 40px; margin-left:15px;">
                      <el-link @click="advancedQuery(1)" :underline="false" icon="el-icon-s-operation">高级查询</el-link>
                  </el-col>
              </el-row>
              <el-row v-show="isshow" style="margin-bottom:15px;">
                  <el-col style="text-align: left;">
                      <el-button icon="el-icon-arrow-up" @click="advancedQuery(0)" type="primary">隐藏</el-button>
                      <el-button @click="reset" icon="el-icon-refresh-right">重置</el-button>
                      <el-button @click="getData" icon="el-icon-search">搜索</el-button>
                  </el-col>
              </el-row>
              <el-row v-show="isshow">
                  <el-col :span="6">
                    <el-form ref="form" :model="params" label-width="80px">
                            <el-form-item label="用户名称">
                                <el-input v-model="params.username"></el-input>
                            </el-form-item>
                    </el-form>
                  </el-col>
              </el-row>
          </el-header>

          <el-main>
              <el-row style="margin-bottom:15px;">
                
                  <el-col style="text-align: right;" :span="12">
                    <el-button class="filter-item" size="" @click="refresh" type="text" icon="el-icon-refresh">刷新</el-button>
                  </el-col>
              </el-row>
              <el-table :data="tableData" style="width: 100%;" border stripe>
                <el-table-column prop="takeRecordNumber" label="乘车码" ></el-table-column>
                <el-table-column prop="startStation" label="起始站"></el-table-column>
                <el-table-column prop="endStation" label="终点站" ></el-table-column>
                <el-table-column prop="orderNumber" label="账单流水号"></el-table-column>
                <el-table-column prop="status" label="状态"></el-table-column>
                <el-table-column prop="getOnTime" label="上车时间"></el-table-column>
                <el-table-column prop="getOffTime" label="下车时间"></el-table-column>
               
            
              </el-table>
            <div class="pagination-container" ref="pagination">
                <el-pagination @size-change="handleSizeChange" :current-page.sync="params.page" @current-change="handleCurrentChange" :page-sizes="[10, 30,50,100]" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
          </el-main>
        </el-container>
     
    </div>
</template>

<script>

import { pageTakeRecord } from '../../services/billAndRecord/billAndRecordService';
var that
export default {
    data () {
        return {
            filter:'',
            isshow:false,
            params:{
                page: 0, // 当前显示的数据位置 例如 5 就是当前后台所有数据的第5条数据开始查
                limit: 10, // 每页显示最大条数
                username: ''
            },
            form:{},
            tableData: [
               
            ],
            total: 0, // 这是分页组件显示的条数
        }
    },
    created(){ // 进页面默认执行
        that = this
        this.getData(); 
    },
    methods: {
        getData(){
            // this.form是高级查询pageBill(this.params).then(r =>{
            pageTakeRecord().then(r =>{
                console.log(r.records,'r');
                this.tableData = r.records;
                this.page = r.page;
                this.total = r.total;
            })
        },
        
        handleIconClick(){

        },
        refresh(){ // 刷新
            this.getData();
        },
    
       
        handleSizeChange(val) {
            this.params.size = val;
            console.log(this.params,'params');
            // this.fetchData();
        },
        handleCurrentChange() {
            // this.params.page = this.params.size * (val - 1);
            console.log(this.page);
            console.log(this.params,'params');
            this.getData();
        },
    },
    filters:{
        filterStatus(v){
            // console.log(v,'v');
            let result = that.statusList.find(item => v == item.value);
            return result ? result.label : ''
        },
        filterSex(v){
            // console.log(v,'v');
            let result = that.list.find(item => v == item.value);
            return result ? result.label : ''
        } 
    },
   
}
</script>

<style lang="scss" scoped>
.filterBtn{
    background: #2769DC;
    color: #fff;
    border-radius: 0;
}
.filterBtn:hover{
    background: #5287E3 !important;
}
.tableBtn{
    background: #2769DC;
    color: #fff;
}
.tableBtn:hover{
    background: #5287E3 !important;
}
.buttons{
    margin-right: 10px;
}
</style>