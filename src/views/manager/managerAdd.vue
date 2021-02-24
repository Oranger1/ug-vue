<template>
    <el-dialog title="新增页面" :visible.sync="isShow" width="60%">
        <el-form :model="form" ref="form" :rules="rules">
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="username">
                <el-input clearable v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                <el-input clearable v-model="form.password" autocompleted="off" autocomplete="new-password" show-password></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
                  <el-select style="width: 100%" v-model="form.sex">
                    <el-option
                      v-for="(item,i) in list"
                      :key="i"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
            </el-form-item>
            <el-form-item label="手机" :label-width="formLabelWidth" prop="mobile">
                <el-input clearable v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                <el-input clearable v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item style="text-align: left;" label="是否启用" :label-width="formLabelWidth" prop="status">
                <el-switch v-model="form.status"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="isShow = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { updateManager,addManager } from '../../services/userInfo/userinfo';
    export default {
        props: ['getData'],
        data() {
            var emailCheck = (rule, value, callback) => {
                var pPatterns = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if (!pPatterns.test(value)) {
                    callback(new Error("请输入正确的邮箱格式"));
                }else{
                    callback();
                }
            };
            return {
                isShow:false,
                form:{},
                formLabelWidth: '120px',
                list:[
                    {label:'男', value:1},
                    {label:'女', value:0},
                ],
                rules:{
                    name: [
                        { required: true, message: "请输入姓名", trigger: "blur" },
                    ],
                    password:[
                        { required: true, message: "请输入密码", trigger: "blur" },
                    ],
                    sex:[
                        { required: true, message: "请选择性别", trigger: "change" },
                    ],
                    email:[
                        { required: true, validator: emailCheck, trigger: 'change' }
                    ]
                }
            }
        },
        methods:{
            show(data){
                this.form = {};
                // this.$set(this.form, {})
                if (data) {
                    this.$set(this, 'form', { ...data})
                }
                this.isShow = true;
            },
            confirm(){
                this.$refs.form.validate((valid) => {
                    if(!valid) return; // 表单检验
                    //  下面是检验成功todo
                    console.log('id:',this.form.id);
                    if(!this.form.id){
                        addManager(this.form).then(r =>{
                        this.isShow = false;
                        })
                    }else{
                        updateManager(this.form).then(r =>{
                        this.isShow = false;
                        })
                    }
                    // this.$parent.getData();
                    this.$emit('getData');
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>