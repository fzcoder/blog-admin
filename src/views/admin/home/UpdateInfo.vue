<template>
  <div class="update-info">
    <el-form :model="form.update.info">
      <el-form-item label="昵称">
        <el-input v-model="form.update.info.nickname" clearable style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <!-- 上传组件 -->
        <Upload show-file-list :file-list="fileList" list-type="text" @remove="handleFileRemove">
          <!-- 当已选择图片或处于修改模式时展示图片内容 -->
          <el-avatar
            v-if="form.update.info.avatar"
            shape="square"
            :size="100"
            :src="form.update.info.avatar"
          ></el-avatar>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过3MB</div>
        </Upload>
      </el-form-item>
      <el-form-item label="座右铭">
        <el-input v-model="form.update.info.motto" clearable style="width: 500px;"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input
          v-model="form.update.info.introduction"
          type="textarea"
          style="width: 600px;"
          :rows="5"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="button-area" style="display: flex; justify-content: flex-start; margin-top: 15px;">
      <el-button size="small" type="success" round icon="el-icon-check" @click="updateInfo()">修改</el-button>
      <el-button size="small" type="primary" round icon="el-icon-refresh" @click="getUserInfo()">还原</el-button>
    </div>
  </div>
</template>

<script>
import Upload from '@/components/admin/common/Upload.vue'
export default {
  components: {
    Upload
  },
  data () {
    return {
      // 表单
      form: {
        // 更新
        update: {
          // 展示信息
          info: {
            avatar: '',
            nickname: '',
            motto: '',
            introduction: ''
          }
        }
      },
      // 用户信息
      user: {
        nickname: '',
        avatar: '',
        motto: '',
        introduction: ''
      },
      // 已上传文件列表
      fileList: []
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息
    async getUserInfo () {
      const { data: result } = await this.$http.get(
        '/user/' + window.sessionStorage.getItem('uid')
      )
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.user = result.data
      this.form.update.info = result.data
      var url = result.data.avatar
      var file = {
        name: url.substring(url.lastIndexOf('/') + 1),
        url: url,
        response: {
          url: url
        }
      }
      // console.log(file)
      // 先对列表进行清空
      this.fileList = []
      this.fileList.push(file)
    },
    // 修改用户信息
    async updateInfo () {
      const { data: result } = await this.$http.put('/admin', {
        id: window.sessionStorage.getItem('uid'),
        nickname: this.form.update.info.nickname,
        motto: this.form.update.info.motto,
        introduction: this.form.update.info.introduction
      })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success(result.message)
      this.getUserInfo()
    },
    handleFileRemove (file, fileList) {
      this.fileList = []
      this.form.update.info.avatar = ''
    }
  }
}
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
