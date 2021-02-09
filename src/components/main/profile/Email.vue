<template>
  <div class="profile-email-container">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/profile' }"
        >个人设置</el-breadcrumb-item
      >
      <el-breadcrumb-item>修改邮箱</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 修改邮箱对话框 -->
    <el-dialog title="修改邮箱" :visible.sync="isUpdateEmailDialogVisible" width="30%">
      <!-- 内容主体区域 -->
      <el-tabs v-model="activeTab_email" stretch>
        <el-tab-pane label="第一步" name="first" :disabled="isDisabled.step1">
          <el-form>
            <p>为了确保是本人操作，请点击下方的“获取验证码”按钮，服务器将向您的邮箱发送验证码。</p>
            <el-form-item label="验证码">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <el-input type="text" v-model="checkCode"></el-input>
                <el-button type="primary" plain style="margin-left: 15px;" @click="getCode()">获取验证码</el-button>
              </div>
            </el-form-item>
          </el-form>
          <el-steps :active="activeStep" finish-status="success">
            <el-step title="步骤 1"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
          <div
            style="display: flex; align-items: center; justify-content: flex-end; margin-top: 15px;"
          >
            <el-button round @click="isUpdateEmailDialogVisible = false">取消</el-button>
            <el-button round type="primary" @click="next()">下一步</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="第二步" name="second" :disabled="isDisabled.step2">
          <el-form :model="updateEmailForm" :rules="updateEmailFormRules" ref="updateEmailFormRef">
            <p>您已完成身份验证，请继续填写新的邮箱地址</p>
            <el-form-item label="新邮箱地址" prop="old_pwd">
              <el-input type="text" v-model="updateEmailForm.email"></el-input>
            </el-form-item>
            <p>请点击下方的“获取验证码”按钮，服务器将向您的新邮箱发送验证码，请注意查收</p>
            <el-form-item label="验证码" prop="verifyCode">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <el-input type="text" v-model="updateEmailForm.code"></el-input>
                <el-button
                  type="primary"
                  plain
                  style="margin-left: 15px;"
                  @click="getActiveCode()"
                >获取验证码</el-button>
              </div>
            </el-form-item>
          </el-form>
          <el-steps :active="activeStep" finish-status="success">
            <el-step title="步骤 1"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
          <div
            style="display: flex; align-items: center; justify-content: flex-end; margin-top: 15px;"
          >
            <el-button round @click="isUpdateEmailDialogVisible = false">取消</el-button>
            <el-button round type="primary" @click="finish()">下一步</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="完成" name="third" :disabled="isDisabled.step3">
          <p>您已成功更改绑定邮箱</p>
          <div
            style="display: flex; align-items: center; justify-content: flex-end; margin-top: 15px;"
          >
            <el-button round @click="isUpdateEmailDialogVisible = false">取消</el-button>
            <el-button round type="primary" @click="isUpdateEmailDialogVisible = false">完成</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <div class="profile-email-content">
      <p>当前使用邮箱：</p>
      <el-button @click="isUpdateEmailDialogVisible = true">修改邮箱</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 激活的标签
      activeTab: 'first',
      activeTab_email: 'first',
      // 激活的步骤
      activeStep: 0,
      // 控制修改邮件对话框的状态
      isUpdateEmailDialogVisible: false,
      // 身份验证
      checkCode: '',
      // 步骤是否可以执行
      isDisabled: {
        step1: false,
        step2: true,
        step3: true
      },
      // 修改邮件表单
      updateEmailForm: {
        email: '',
        code: ''
      },
      // 修改邮件表单验证规则
      updateEmailFormRules: {}
    }
  },
  methods: {
    // 下一步操作
    async next () {
      const { data: result } = await this.$http.post('/auth/verify/check', null, {
        params: {
          key: window.sessionStorage.getItem('uid'),
          value: this.checkCode
        }
      })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.activeStep++
      this.activeTab_email = 'second'
      this.isDisabled.step1 = true
      this.isDisabled.step2 = false
      this.isDisabled.step3 = true
    },
    // 完成修改邮箱
    async finish () {
      const { data: result } = await this.$http.put(
        '/admin/' + window.sessionStorage.getItem('uid') + '/email',
        this.updateEmailForm
      )
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.activeStep++
      this.activeTab_email = 'third'
      this.isDisabled.step1 = true
      this.isDisabled.step2 = true
      this.isDisabled.step3 = true
    },
    // 获取验证码
    async getCode () {
      const { data: result } = await this.$http.get('/auth/verify/update', {
        params: { id: window.sessionStorage.getItem('uid') }
      })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success(result.message)
    },
    // 获取激活码
    async getActiveCode () {
      const { data: result } = await this.$http.get('/auth/verify/active', {
        params: { to: this.updateEmailForm.email }
      })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success(result.message)
    },
    // 取消修改邮箱
    cancelUpdateEmail (refName) {
      this.isUpdateEmailDialogVisible = false
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
