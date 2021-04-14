<template>
  <!-- <div class="home"> -->
    <el-container class="container-s">
      <el-header class="header v-header">
        <el-row class="header-el-row">
          <el-col :span="2" style="height: 100%;">
            <img src="../assets/img/logo.png" style="height: 100%;" alt="">
            <span style="font-size: 20px;font-weight: bolder;color: rgb(67 67 68); position: absolute;margin: 17px;">长沙地铁</span>
          </el-col>
          <el-col style="height:100%; display: flex; float: right;" :span="3">
            <el-dropdown  @command="userInfos" class="box">
              <span class="el-dropdown-link center">
                <el-avatar :size="40" src="../assets/img/yz01.png"></el-avatar>
                <span style="margin-left:15px;">{{ userName }}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item command="0">个人信息</el-dropdown-item> -->
                <el-dropdown-item command="1">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      
      <el-container>
        <el-container class="mb v-main-contant">
          <el-main>
            <stationGailan />
          </el-main>
        </el-container>
      </el-container>
      <userInfo ref="userInfoRef"></userInfo>
    </el-container>
</template>

<script>
import userInfo from '../components/user/user'
import stationGailan from './station/station-gailan.vue'
export default {
  name: "home",
  components: {
    userInfo,
    stationGailan
  },
  data() {
    return {
      isCollapse: false,
      nowIndex:'1',
      routerList:[],
      circleUrl:'',
      routerTitleList:[],
      userName: ''
    }
  },
  created() {
    // console.log(this);
    this.userName = localStorage.stlogin
    this.routerList = this.$router.options.routes;
    let title = localStorage.getItem('stlRouter') ? JSON.parse(localStorage.getItem('stlRouter')) : '';
    console.log(title,'title');
    if (this.$route.fullPath != '/home') {
      this.routerTitleList.push({
            name:title.name,
            path:title.path,
            title:title.mate.title,
            icon:title.mate.icon
      })
      this.nowIndex = title.path;
    }
  },
  methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
        // console.log(this.nowIndex);
      },
      select(index,indexPath){
        console.log('select',index,indexPath);
        this.nowIndex = index
        // console.log('this.nowIndex',this.nowIndex);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      add(obj){
        console.log(obj);
        return obj&&obj.title ? obj.title : ''
      },

      move(row,index){
        console.log(row,index);
        this.$set(row,'icon',!row.icon)
      },
      pushRouter(row,i){
        console.log(this.routerTitleList,'this.routerTitleList[i-1]');
        console.log('i',i,'row',row);
        if (i != 0 && this.routerTitleList.length != 0) {
          this.$router.push({name:this.routerTitleList[i-1].name})
          this.nowIndex = this.routerTitleList[i-1].path;
        }else if (i == 0 && this.routerTitleList.length >= 2) {
          this.$router.push({name:this.routerTitleList[i+1].name})
          this.nowIndex = this.routerTitleList[i+1].path;
        }else{
          this.$router.push({name:'home'})
          this.nowIndex = '';
        }
        this.routerTitleList.splice(i,1);
      },
      menuLineHeight(row){ // 点击面包屑标题 菜单高亮操作
        console.log(row,'row');
        this.nowIndex = row.path;
      },
      userInfos(type){
        console.log(1,type)
        if (type == 0) {
          this.$refs.userInfoRef.show();
        }else{
          sessionStorage.removeItem("stlToken");
          this.$router.push({ name: "login" });

        }
      }
  },
 
};
</script>

<style lang="scss" scope>
  .is-active{
    // width: calc(100% + 2px);
    background:#409EFF!important;
  }
  .container-s{
    height: 100vh;
    .menubar{
      height: 100%;
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    text-align: left;
    width: 200px;
  }
  .header{
    // background: var(--foo, #000);
    // color: var(--col);
    -webkit-box-shadow: 0 2px 4px rgba(0,21,41,.3);
    box-shadow: 0 2px 4px rgba(0,21,41,.3);
    box-sizing: border-box;
    .header-el-row{
      height: 100%;
      .header-el-col{    
        height: 100%;
        cursor: pointer;
        position: relative;
        .btnBox{
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .line::after{
          content: '';
          display: block;
          position: absolute;
          width: 2px;
          height: 50%;
          background: #000;
          top: 15px;
          right: 0;
        }
        .iconfont{
            display: block;
            transition: all .5s;
            transform-origin:50%;
        }
        .iconfontChange{
            transform: rotate(180deg);
        }
      }
    }
  }
  .el-submenu__icon-arrow{
    color: #ffffff !important;
  }
  .box{
    display: flex !important;
    font-size: 18px !important;
    outline: none;
    .center{
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .customMenu{
    transition:  all .5s;
  }
  .mb{
    .el-breadcrumb__inner{
      display: flex;
      align-items: center;
      cursor: pointer !important;
    }
    .mb-item{
      cursor: pointer !important;
      margin-right:8px;
      padding:10px 0;
      .mb-title{
          position: relative;
          display: inline-block;
          .closeIcon{
            // color: #2769dc;
            margin-left:3px;
          }
      }
    }
    .mb-item:hover .mb-title{
      color: #409EFF ;
    }
    .activeTitlt{
      color: #409EFF ;
    }
  }
</style>
