<template>
  <div class="account-security">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/profile' }"
        >个人设置</el-breadcrumb-item
      >
      <el-breadcrumb-item>修改密码</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <!-- 内容主体区域 -->
      <el-form
        :model="updatePasswordForm"
        :rules="updatePasswordFormRules"
        ref="updatePasswordFormRef"
      >
        <el-form-item label="原密码" prop="old_pwd">
          <el-input type="password" v-model="updatePasswordForm.old_pwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_pwd">
          <el-input type="password" v-model="updatePasswordForm.new_pwd"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <el-input type="text" v-model="updatePasswordForm.code"></el-input>
            <el-button type="primary" plain style="margin-left: 15px;" @click="getCode()">获取验证码</el-button>
          </div>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <div>
        <el-button round @click="cancelUpdatePassword('updatePasswordFormRef')">取消</el-button>
        <el-button round type="primary" @click="updatePassword()">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 修改密码表单
      updatePasswordForm: {
        old_pwd: '',
        new_pwd: '',
        code: ''
      },
      // 修改密码表单验证规则
      updatePasswordFormRules: {
        old_pwd: [
          { required: true, message: '请输入原密码！', trigger: 'blur' }
        ],
        new_pwd: [
          { required: true, message: '请输入新密码！', trigger: 'blur' }
        ],
        code: [{ required: true, message: '请输入验证码！', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 获取验证码
    async getCode () {
      const { data: result } = await this.$http.get('/verify/update', {
        params: { id: window.sessionStorage.getItem('uid') }
      })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success(result.message)
    },
    // 修改密码
    async updatePassword () {
      const { data: result } = await this.$http.put(
        '/admin/' + window.sessionStorage.getItem('uid') + '/password',
        this.updatePasswordForm
      )
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success(result.message)
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 取消修改密码
    cancelUpdatePassword (refName) {
      this.$refs[refName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>
