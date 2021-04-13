<template>
    <el-dialog title="新增页面" :visible.sync="isShow" width="60%">
        
        <el-form v-if="userType == 'manager'" :model="form" ref="form" :rules="managerRules">
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
        <el-form v-if="userType == 'station'" :model="form" ref="form" :rules="stationRules">
                <el-form-item v-if="form.isStation" label="地铁站名" :label-width="formLabelWidth" prop="name">
                    <el-input clearable v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属线路" :label-width="formLabelWidth" prop="lineId">
                    <el-input clearable v-model="form.lineId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item v-if="form.isStation" label="站序" :label-width="formLabelWidth" prop="stationNumber">
                    <el-input clearable v-model="form.stationNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="线路顺序" :label-width="formLabelWidth" prop="sequence">
                    <el-input clearable v-model="form.sequence" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="站点横坐标" :label-width="formLabelWidth" prop="x">
                    <el-input clearable v-model="form.x" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="站点纵坐标" :label-width="formLabelWidth" prop="y">
                    <el-input clearable v-model="form.y" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item v-if="form.isStation" label="站名朝向" :label-width="formLabelWidth" prop="labelPos">
                    <el-input clearable v-model="form.labelPos" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item style="text-align: left;" label="是否站点" :label-width="formLabelWidth" prop="isStation">
                    <el-switch v-model="form.isStation"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
        </el-form>

        <el-form v-if="userType == 'line'" :model="form" ref="form" :rules="stationRules">
                <el-form-item v-if="form.name" label="地铁线路" :label-width="formLabelWidth" prop="name">
                    <el-input clearable v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="label" :label-width="formLabelWidth" prop="label">
                    <el-input clearable v-model="form.label" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="总站数" :label-width="formLabelWidth" prop="totalStation">
                    <el-input clearable v-model="form.totalStation" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="颜色" :label-width="formLabelWidth" prop="sequence">
                    <div class="block">
                        <el-color-picker v-model="form.color"></el-color-picker>
                    </div>
                </el-form-item>
        </el-form>
        
        <div slot="footer" class="dialog-footer">
            <el-button @click="isShow = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { updateManager,addManager } from '@/services/manager/managerService';
import { addStation,updateStation } from '@/services/station/stationService';
import { addLine,updateLine } from '@/services/line/lineService';
    export default {
        props: {
            getData: Array,
            userType: String
        },
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
                form:{
                    isStation: true
                },
                formLabelWidth: '120px',
                list:[
                    {label:'男', value:1},
                    {label:'女', value:0},
                ],
                managerRules:{
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
                },

                stationRules:{
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
                        if(this.userType === 'manager'){
                            addManager(this.form).then(r =>{
                                this.isShow = false;
                            })
                        }
                        if(this.userType === 'station'){
                            addStation(this.form).then(r => {
                                this.isShow = false;
                            })
                        }
                        if(this.userType === 'line'){
                            addLine(this.form).then(r => {
                                this.isShow = false;
                            })
                        }
                    }else{
                        if(this.userType === 'manager'){
                             updateManager(this.form).then(r =>{
                             this.isShow = false;
                        })
                        }
                       
                        if(this.userType === 'station'){
                            updateStation(this.form).then(r => {
                                this.isShow = false;
                            })
                        }

                        if(this.userType === 'line'){
                            updateLine(this.form).then(r => {
                                this.isShow = false;
                            })
                        }
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