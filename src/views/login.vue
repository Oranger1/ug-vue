<template>
    <div class="body">
        <div class="stars"></div>
        <div ref="table" class="table" v-show="type == 0">
            <h2 style="margin-top: 20px;margin-bottom:10px;color: white;">{{type == 0 ? '登录' : '注册'}}</h2>
            <el-form :model="form" ref="form" label-position="top" >
                <el-form-item label="用户名" prop="username">
                    <el-input class="login-item" v-model="form.username">
                        <template>
                            <i style="color: #000;" slot="prepend" class="el-icon-user-solid"></i>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" class="login-item" v-model="form.password">
                        <template>
                            <i style="color: #000;" slot="prepend" class="el-icon-s-goods"></i>
                        </template>
                    </el-input>
                </el-form-item>
                <!-- <el-form-item>
                    <div @click="register" style="float:left;color:#fff;font-weight:500;font-size:18px;cursor: pointer;">立即注册</div>
                    <div @click="forget" style="float:right;color:#fff;font-weight:500;font-size:18px;cursor: pointer;">忘记密码</div>
                </el-form-item> -->
                <el-form-item>
                    <div id="draw-border">
                        <button :disabled="loading" class="button" type="button" @click="login">
                            <i v-show="loading" class="el-icon-loading"></i>
                            登陆
                        </button>
                        <button :disabled="loading" class="button" type="button" @click="touristLogin">
                            <i v-show="loading" class="el-icon-loading"></i>
                            游客登陆
                        </button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <div ref="table2" class="table" v-show="type == 1">
            <span @click="back" style="color:#fff; cursor: pointer;position: relative;top: 30px;left: -170px;">返回</span>
            <h2 style="color: white;margin-bottom:20px;">{{type == 0 ? '登录' : '注册'}}</h2>
            <el-form :model="form2" :rules="rules" ref="form2" label-position="top" :validate-on-rule-change="false">
                <el-form-item label="用户名" prop="username">
                    <el-input class="login-item" v-model="form2.username">
                        <template>
                            <i style="color: #000;" slot="prepend" class="el-icon-user-solid"></i>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" class="login-item" v-model="form2.password">
                        <template>
                            <i style="color: #000;" slot="prepend" class="el-icon-s-goods"></i>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input type="password" class="login-item"  v-model="form2.username2">
                        <template>
                            <i style="color: #000;" slot="prepend" class="el-icon-s-goods"></i>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <div id="draw-border">
                        <button class="button" type="button" @click="registerBtn">
                            <i v-show="loading2" class="el-icon-loading"></i>
                            {{type == 0 ? '登录' : '注册'}}
                        </button>
                    </div>
                </el-form-item>
            </el-form>

            <!-- 验证 -->
            <div v-if="yz" @click="yz = false" class="mask">
            </div>
            <slide-verify v-if="yz" class="yz"
                :l="42"
                :r="10"
                :w="310"
                :h="155"
                :imgs="arr"
                ref="slideblock"
                @success="onSuccess"
                @click.stop
                :accuracy="accuracy"
                @fail="onFail"
                @refresh="onRefresh"
                :slider-text="text">
            </slide-verify>
        </div>
    </div>
</template>

<script>
// import $ from 'jquery';
// import { mapState,mapActions,mapMutations } from 'vuex'
import { login, getdata,touristLogin } from '../services/admin/admin'
export default {
    name: "login",
    data() {
        return {
            loading:false,
            loading2:false,
            yz:false,
            accuracy: 2,
            text: "向右滑",
            form:{
                username:'',
                password:'',
            },
            form2:{},
            rules:{
                username:[
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: "blur"
                    }
                ],
                password:[
                    {
                        required: true,
                        message: '请输入用密码',
                        trigger: "blur"
                    }
                ]
            },
            forgetIndex:0,
            type:0, // 0 登录 1注册
            arr:[
                require('../assets/img/bg.jpg'),
                require('../assets/img/yz01.jpg'),
                require('../assets/img/yz02.jpg'),
                require('../assets/img/yz03.jpg'),
                require('../assets/img/yz04.jpg'),
                require('../assets/img/yz05.jpg'),
            ]
        }
    },
    created(){
        // this.$store.commit('home/add', '778')
        // this.$store.commit('ma', '775')
        // this.$store.dispatch('home/ADD', '先调actions')
        // this.add()
        // this.ADD('先调actions')
        // if (localStorage.getItem('stlogin')) { // 浏览器是否有缓存 有则不需登录
        //     this.$router.push('home')
        // }
    },
    
    mounted() {
        this.$refs.form.resetFields()
        var stars=1800;  /*星星的密集程度，数字越大越多*/
        var $stars=$(".stars");
        var r=800;   /*星星的看起来的距离,值越大越远,可自行调制到自己满意的样子*/
        for(var i=0;i<stars;i++){
            var $star=$("<div/>").addClass("star");
            $stars.append($star);
        }
        $(".star").each(function(){
            var cur=$(this);
            var s=0.2+(Math.random()*1);
            var curR=r+(Math.random()*300);
            cur.css({ 
            transformOrigin:"0 0 "+curR+"px",
            transform:" translate3d(0,0,-"+curR+"px) rotateY("+(Math.random()*360)+"deg) rotateX("+(Math.random()*-50)+"deg) scale("+s+","+s+")"            
            })
        })
    },
    methods: {
        // ...mapMutations('home',['add']),
        // ...mapActions('home',['ADD']),
        async login(){ // 进行登录
            if (!this.form.username || !this.form.password) {
                this.$message.error({message:'用户名或密码不能为空!'})
                return;
            }
            console.log('form',this.form);
            let formData = new FormData() // 表单提交方式
            this.loading = true
            formData.append('username',this.form.username)
            formData.append('password',this.form.password)
            await login({ username: this.form.username, password: this.form.password }).then(r =>{ // post 不是表单提交
                console.log(r,'r');
                this.loading = false
                if (r.code === 404) {
                    return this.$message.error('您输入的账号或密码有误')
                }
                localStorage.setItem('stlogin',this.form.username)
                this.$refs.form.resetFields()
                this.$router.push({name:'userInfo-one'})
            }, err =>{
                this.loading = false;
            })
            // await this.$post("/login",this.form).then(r => {
            //     console.log(r, "r");
            //     this.loading = false
                // localStorage.setItem('stlogin',this.form.username)
            //     this.$refs.form.resetFields()
            //     this.$router.push('home')
            // },err =>{
            //     this.loading = false
            // });
        },
        touristLogin(){ //游客登陆
            touristLogin().then(r => {
                this.$router.push({name:'userInfo-one'})
            })
        },
        registerBtn(){ // 进行注册
            this.$refs.form2.validate( isok =>{
                if (!isok) { return false }
                this.yz = true
            })
        },
        forget(){
            let str = ''
            str = this.forgetIndex == 0 ? '我也不知道,别点我' : '说了不知道真别点啦!'
            this.$message.error({
                message:str
            })
            this.forgetIndex++
        },
        handleChange(value) {
            console.log("您验证结果为:", value);
        },
        verify(result) {
            console.log(result, "result"); // result为true表示验证通过，false表示验证三次都失败了哦
        },
        async onSuccess(times) { // 验证成功
            this.loading2 = true
            // let formData = new FormData()
            // formData.append('username',this.form2.username)
            // formData.append('password',this.form2.password)
            await this.$post("/register",{
                username:this.form2.username,
                password:this.form2.password
            }).then(r => {
                this.loading2 = false
                console.log(r,'注册');
                this.yz = false
                this.type = 0
                this.$refs.form2.resetFields()
            }, err=>{
                this.loading2 = false
                this.yz = false
            })
        },
        onFail() {
            console.log('失败');
        },
        onRefresh(){
            console.log('1');
        },
        register(){ // 注册跳转
            this.type = 1
        },
        back(){
            this.type = 0;
            this.$refs.form2.resetFields()
        },
    }
};
</script>

<style lang="scss">
.body {
    width: 100%;
    height: 100%;
    position: absolute;
    background: radial-gradient(
        200% 100% at bottom center,
        #f7f7b6,
        #e96f92,
        #75517d,
        #1b2947
    );
    background: radial-gradient(
        220% 105% at top center,
        #1b2947 10%,
        #75517d 40%,
        #e96f92 65%,
        #f7f7b6
    );
    background-attachment: fixed;
    overflow: hidden;
}

@keyframes rotate {
    0% {
        transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
    }
    100% {
        transform: perspective(400px) rotateZ(20deg) rotateX(-40deg)
            rotateY(-360deg);
    }
}
.stars {
    transform: perspective(500px);
    transform-style: preserve-3d;
    position: absolute;
    bottom: 0;
    perspective-origin: 50% 100%;
    left: 50%;
    animation: rotate 90s infinite linear;
}

.star {
    width: 2px;
    height: 2px;
    background: #f7f7b6;
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: 0 0 -300px;
    transform: translate3d(0, 0, -300px);
    backface-visibility: hidden;
}
.table {
    width: 400px;
    // height: 600px;
    overflow: hidden;
    margin: 110px auto;
    // -webkit-transform-style: preserve-3d;
    // transform-style: preserve-3d;
    transition: all 1s;
    // background: rgba(0,0,0,0.1);
    // h2{
    //     transform: translate3d(0, -50%, 35px) perspective(100px);
    // }
    // .el-form{
    //     transform: translate3d(0, 0%, 35px) perspective(100px);
    // }
}
.table form {
    width: 100%;
}
.table .btn {
    font-family: 'Microsoft Yahei';
    font-size: 16px;
    color: #fff;
    line-height: 1.2;
    text-transform: uppercase;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    width: 100%;
    height: 50px;
}
.el-form--label-top .el-form-item__label{
    color: #fff;
    float: left;
}
.el-input__inner{
    color: #000;
    font-weight: bolder;
}
.login-item{
    position: relative;
    // padding-bottom: 30px;
}
.login-item::after{
    position: absolute;
    top: 70px;
    left: 0;
    display: block;
    content: '';
    width: 0px;
    height: 2px;
    background: #fff;
    transition: all .5s ease-out;
}
.login-item:hover::after{
    width: 100%;
}
.el-form-item__content{
    margin-bottom: 30px;
}
.el-form-item__error{
    font-weight: bolder;
}
.mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.6);
}
.yz{
    position: absolute !important;
    top: 50%;
    left: 50%;
    margin-top: -170px;
    margin-left: -155px;
}

// 按钮样式
#draw-border {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
}

.button {
  border: 0;
  background: none;
  text-transform: uppercase;
  color: #fff;
//   color: red;
  font-size: 18px;
  font-weight: bold;
  position: relative;
  outline: none;
  padding: 10px 20px;
  box-sizing: border-box;
}

.button::before, .button::after {
  box-sizing: inherit;
  position: absolute;
  content: '';
  border: 2px solid transparent;
  width: 0;
  height: 0;
}

.button::after {
  bottom: 0;
  right: 0;
}

.button::before {
  top: 0;
  left: 0;
}

.button:hover::before, .button:hover::after {
  width: 100%;
  height: 100%;
}

.button:hover::before {
  border-top-color: #FFF;
  border-right-color: #FFF;
  transition: width 0.3s ease-out, height 0.3s ease-out 0.3s;
}

.button:hover::after {
  border-bottom-color: #FFF;
  border-left-color: #FFF;
  transition: border-color 0s ease-out 0.6s, width 0.3s ease-out 0.6s, height 0.3s ease-out 1s;
}
</style>