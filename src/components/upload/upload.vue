<template>
    <div class="upload">
        <input type="file" hidden name="uploadFile" ref="uploadFile" accept="image/gif, image/jpeg, image/jpg, image/png" @change="upFile"/>
        <button @click="goUpload">上传头像</button>
    </div>
</template>
<script>
import common from '../../lib/common';
import {
    upload,
    relevance
} from '../../models/upload';
export default {
    name: 'upload',
    props: {
        cb: {
            type: Function,
            required: true,
            default: () => {}
        }
    },
    methods:{
        async upFile(e){
            const files = e.target.files;
            if (!files) {
                this.$el.querySelector('input').value = '';
                return;
            }
            const token = localStorage.getItem('token');
            let formData = new FormData();
            let file = files[0];
            formData.append("file", file);
            if(!common.upFile_accept.test(file.type)) {
                alert('非法上传文件格式！');
            }else if(file.size > common.upFile_maxSize){
                alert('上传文件大小超出！');
            }else{
                upload(formData).then(res => {
                    const { errmsg, errcode, data } = res.data;
                    if (errcode === 0) {
                        this.cb(data);
                        const userId = this.$route.query.userId;
                        const photoId = data.photoId;
                        relevance({photoId}).then(res => {
                            console.log('关联成功：',res);
                        }).catch(err => {
                            console.log('关联出错：',err)
                        })
                    }
                    alert(errmsg);
                }).catch(err => {
                    console.log(err);
                })
            }
        },

        goUpload() {
            this.$refs.uploadFile.value = '';
            this.$refs.uploadFile.click();
        }
    }
}
</script>