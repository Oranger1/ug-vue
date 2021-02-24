<template>
    <el-dialog title="个人信息" :visible.sync="isShow" width="60%">
        <el-form :model="form">
            <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
                <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
            </el-form-item>
            <!-- <el-select v-model="form.password" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select> -->
            <el-form-item style="text-align: left;" label="头像"  :label-width="formLabelWidth">
                <el-upload 
                    action
                    :limit="1"
                    ref="upload"
                    :on-exceed="exceedFun"
                    :http-request="uploadFun"
                    :on-remove="removeFile"
                    accept=".jpg, .gif, .bmp, .png"
                    list-type="picture-card" 
                    :auto-upload="true">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                        <span class="el-upload-list__item-actions">
                            <span
                                v-if="!disabled"
                                class="el-upload-list__item-delete"
                                @click="handleRemove(file)">
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="isShow = false">取 消</el-button>
            <el-button :loading="loading" type="primary" @click="upload">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                isShow:false,
                form:{},
                formLabelWidth: '120px',
                imageUrl:'',
                files: [],
                file: null,
                disabled: false,
                loading:false
            }
        },
        methods:{
            show(){
                this.isShow = true;
            },
            async upload() { // 调接口
                if (!this.file) {
                    this.$message.error({ message:'请上传头像' })
                    return
                }
                this.loading = true
                let formData = new FormData();
                //此处文件名必须为 singleFile ，因为后台设置仅接口此文件名
                let username = localStorage.getItem('stlogin')
                // formData.append("singleFile", this.file.file);
                // formData.append("username", username);
                
            },
            uploadFun(params) {
                console.log(params, "---", this.files);
                this.file = params;
                this.files.push(params.file);
            },
            exceedFun() {
                // 文件超数
                this.$message.error({
                    message: "图片只能上传一张"
                    // offset:100
                });
            },
            removeFile() {
                this.files = [];
            },
            handleRemove(file) {
                console.log(file,this.$refs.upload);
                this.$refs.upload.uploadFiles = []
                this.file = []
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>