<template>
    <div>
        <el-container>
          <el-header style="height:'';">
              <el-row v-show="!isshow">
                  <el-col :span="6">
                      <el-input size="medium" clearable v-model="params.username" placeholder="请输入管理员姓名">
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
                  <el-col style="text-align: left;" :span="12">
                      <el-button @click="add" size="medium" class="tableBtn" icon="el-icon-circle-plus" type="primary">新增</el-button>
                  </el-col>
                  <el-col style="text-align: right;" :span="12">
                    <el-button class="filter-item" size="" @click="refresh" type="text" icon="el-icon-refresh">刷新</el-button>
                  </el-col>
              </el-row>
              <el-table :data="tableData" style="width: 100%;" border stripe>
                <el-table-column prop="username" label="用户名"  width="150"></el-table-column>
                <el-table-column prop="mobile" label="手机" width="150"></el-table-column>
                <el-table-column prop="sex" label="性别" width="120">
                    <template slot-scope="{ row }">
                        {{ row.sex | filterSex}}
                    </template>
                </el-table-column>
                <el-table-column  prop="email" label="邮箱" width="200"></el-table-column>
                <el-table-column prop="status" label="是否启用" width="120">
                    <template slot-scope="{ row }">
                        {{ row.status | filterStatus }}
                    </template>
                </el-table-column>
                <el-table-column prop="updationTime" label="最后登录时间"  width=""></el-table-column>
                <el-table-column
                    align="center"
                    fixed="right"
                    label="操作"
                    width="140">
                    <template slot-scope="{ row }">
                        <el-button class="buttons" @click="editor(row)" type="text" size="small">编辑</el-button>
                        <el-popconfirm title="确定删除该条数据吗？" @confirm="del(row)">
                            <el-button class="buttons" slot="reference" type="text" size="small">删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
              </el-table>
            <div class="pagination-container" ref="pagination">
                <el-pagination @size-change="handleSizeChange" :current-page.sync="params.page" @current-change="handleCurrentChange" :page-sizes="[10, 30,50,100]" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
          </el-main>
        </el-container>
        <managerAdd ref="managerAddRef" @getData="getData" userType="manager"></managerAdd>
    </div>
</template>

<script>
import managerAdd from '@/components/add/addComponents.vue';
import { pageManagers,delManager } from '../../services/manager/managerService';
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
            list:[
                {label:'男', value:1},
                {label:'女', value:0},
            ],
            statusList:[
                {label: '启用', value: 1},
                {label: '禁用', value: 0},
            ],
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
            // this.form是高级查询
            if(!this.params.username){
                this.params.username=null;
            }
            pageManagers(this.params).then(r =>{
                console.log(r.records,'r');
                this.tableData = r.records;
                this.page = r.page;
                this.total = r.total;
            })
        },
        add(){
            this.$refs.managerAddRef.show();
        },
        editor(row){ // 编辑
            this.$refs.managerAddRef.show(row);
        },
        del(row){ // 删除
            console.log(row.id);
            delManager({'managerId':row.id}).then(
                this.getData()
            );
        },
        handleIconClick(){

        },
        refresh(){ // 刷新
            this.getData();
        },
    
        advancedQuery(num){ //高级查询  1为展开高级搜索 0 为隐藏
            if (num) {
                delete this.params.filter
                this.isshow = true;
            }else{
                this.reset();
                this.isshow = false;
            }
        },
        reset(){ // 重置
            this.params = {
                page: 0, // 当前显示的数据位置 例如 5 就是当前后台所有数据的第5条数据开始查
                limit: 10 // 每页显示最大条数
            }
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
    components:{
        managerAdd,
    }
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