<template>
  <div>
    <el-container>
      <el-header style="height: ''">
        <el-row v-show="isshow" style="margin-bottom: 15px">
          <el-col style="text-align: left">
            <el-button
              icon="el-icon-arrow-up"
              @click="advancedQuery(0)"
              type="primary"
              >隐藏</el-button
            >
            <el-button @click="reset" icon="el-icon-refresh-right"
              >重置</el-button
            >
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
        <el-row style="margin-bottom: 15px">
          <el-col style="text-align: left" :span="12">
            <el-button
              @click="add"
              size="medium"
              class="tableBtn"
              icon="el-icon-circle-plus"
              type="primary"
              >新增</el-button
            >
          </el-col>
          <!-- <el-col style="text-align: right;" :span="12">
                    <el-button class="filter-item" size="" @click="refresh" type="text" icon="el-icon-refresh">刷新</el-button>
                  </el-col> -->
          <el-form :model="params" :inline="true">
            <el-form-item label="">
              <el-select
                v-model="params.isOnlyStation"
                placeholder="请选择"
              >
                <el-option label="仅地铁站查询" :value="true" />
                <el-option label="线路站点查询" :value="false" />
              </el-select>
            </el-form-item>

            <el-form-item label="线路">
              <el-select
                v-model="params.lineId"
                :clearable="true"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in lines"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="地铁站">
              <el-input
                size="medium"
                style="width: 150px"
                clearable
                v-model="params.name"
                placeholder="请输入地铁站"
              />
            </el-form-item>
            <el-form-item>
              <el-button @click="getData" class="filterBtn">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-row>
        <el-table :data="tableData" style="width: 100%" border stripe>
          <el-table-column
            prop="name"
            label="地铁站名"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="lineId"
            label="所属线路"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="stationNumber"
            label="站数"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="sequence"
            label="线路点顺序"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="x"
            label="站点横坐标"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="y"
            label="站点纵坐标"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="labelPos"
            label="站名朝向"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="creationTime"
            label="创建时间"
            width=""
          ></el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="140"
          >
            <template slot-scope="{ row }">
              <el-button
                class="buttons"
                @click="editor(row)"
                type="text"
                size="small"
                >编辑</el-button
              >
              <el-popconfirm title="确定删除该条数据吗？" @confirm="del(row)">
                <el-button
                  class="buttons"
                  slot="reference"
                  type="text"
                  size="small"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container" ref="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            :current-page.sync="params.page"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 30, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </el-main>
    </el-container>
    <managerAdd
      ref="managerAddRef"
      @getData="getData"
      userType="station"
    ></managerAdd>
  </div>
</template>

<script>
import managerAdd from "@/components/add/addComponents.vue";
import {
  pageManagers,
  delManager,
} from "../../services/manager/managerService";
import { pageStation, queryLines } from "../../services/station/stationService";
var that;
export default {
  data() {
    return {
      filter: "",
      isshow: false,
      params: {
        page: 0, // 当前显示的数据位置 例如 5 就是当前后台所有数据的第5条数据开始查
        limit: 10, // 每页显示最大条数
        lineId: null,
        name: "",
        isOnlyStation: true
      },
      form: {},
      tableData: [],
      total: 0, // 这是分页组件显示的条数
      lines: [],
    };
  },
  created() {
    // 进页面默认执行
    that = this;
    this.getData();
  },
  methods: {
    getData() {
      // this.form是高级查询
      queryLines().then((r) => {
        console.log(r, "lines:");
        this.lines = [];
        r.forEach((item) => {
          this.lines.push({
            name: item.name,
            id: item.id,
          });
        });
      });

      if (!this.params.name) {
        this.params.name = null;
      }
      pageStation(this.params).then((r) => {
        console.log(r.records, "r");
        this.tableData = r.records;
        this.page = r.page;
        this.total = r.total;
      });
    },
    add() {
      this.$refs.managerAddRef.show({ isStation: true});
    },
    editor(row) {
      // 编辑
      this.$refs.managerAddRef.show({...row, isStation: row.name ? true : false});
    },
    del(row) {
      // 删除
      console.log(row.id);
      delManager({ managerId: row.id }).then(this.getData());
    },
    handleIconClick() {},
    refresh() {
      // 刷新
      this.getData();
    },

    advancedQuery(num) {
      //高级查询  1为展开高级搜索 0 为隐藏
      if (num) {
        delete this.params.filter;
        this.isshow = true;
      } else {
        this.reset();
        this.isshow = false;
      }
    },
    reset() {
      // 重置
      this.params = {
        page: 0, // 当前显示的数据位置 例如 5 就是当前后台所有数据的第5条数据开始查
        limit: 10, // 每页显示最大条数
      };
    },
    handleSizeChange(val) {
      this.params.size = val;
      console.log(this.params, "params");
      // this.fetchData();
    },
    handleCurrentChange() {
      // this.params.page = this.params.size * (val - 1);
      console.log(this.page);
      console.log(this.params, "params");
      this.getData();
    },
  },
  filters: {
    filterStatus(v) {
      // console.log(v,'v');
      let result = that.statusList.find((item) => v == item.value);
      return result ? result.label : "";
    },
    filterSex(v) {
      // console.log(v,'v');
      let result = that.list.find((item) => v == item.value);
      return result ? result.label : "";
    },
  },
  components: {
    managerAdd,
  },
};
</script>

<style lang="scss" scoped>
.filterBtn {
  background: #2769dc;
  color: #fff;
  border-radius: 0;
}
.filterBtn:hover {
  background: #5287e3 !important;
}
.tableBtn {
  background: #2769dc;
  color: #fff;
}
.tableBtn:hover {
  background: #5287e3 !important;
}
.buttons {
  margin-right: 10px;
}
</style>