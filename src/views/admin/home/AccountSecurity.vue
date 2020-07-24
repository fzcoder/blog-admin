<template>
  <div class="account-security">
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
    <!-- 修改密码对话框 -->
    <el-dialog title="修改密码" :visible.sync="isUpdatePwdDialogVisible" width="30%">
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
      <span slot="footer">
        <el-button round @click="cancelUpdatePassword('updatePasswordFormRef')">取消</el-button>
        <el-button round type="primary" @click="updatePassword()">确定</el-button>
      </span>
    </el-dialog>
    <div class="content">
      <el-form label-position="top">
        <el-form-item label="* 邮箱">
          <span>绑定邮箱用于登录认证和身份校验，当用户在进行敏感操作时系统会向绑定的邮箱发送验证码进行校验</span>
          <div class="form-item">
            <i class="icon-mail-64px"></i>
            <div class="item-content">
              <h4>绑定邮箱</h4>
              <el-button
                type="text"
                icon="el-icon-edit"
                @click="isUpdateEmailDialogVisible = true"
              >修改</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="* 密码">
          <span>密码是用户登录的凭证，请设置一个含有字母数字和字符的混合密码以增强账号的安全性</span>
          <div class="form-item">
            <i class="icon-password-64px"></i>
            <div class="item-content">
              <h4>账号密码</h4>
              <el-button
                type="text"
                icon="el-icon-edit"
                @click="isUpdatePwdDialogVisible = true"
              >修改</el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表单
      form: {
        // 更新
        update: {
          // 密码
          password: {
            // 旧密码
            old_pwd: '',
            // 新密码
            new_pwd: '',
            // 邮箱验证码
            code: ''
          },
          // 邮箱
          email: {
            // 新邮箱
            email: '',
            // 邮箱验证码
            code: ''
          }
        }
      },
      // 激活的标签
      activeTab: 'first',
      activeTab_email: 'first',
      // 激活的步骤
      activeStep: 0,
      // 控制修改密码对话框的状态
      isUpdatePwdDialogVisible: false,
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
      // 修改密码表单
      updatePasswordForm: {
        old_pwd: '',
        new_pwd: '',
        code: ''
      },
      // 修改邮件表单
      updateEmailForm: {
        email: '',
        code: ''
      },
      // 修改邮件表单验证规则
      updateEmailFormRules: {},
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
    // 下一步操作
    async next () {
      const { data: result } = await this.$http.post('/verify/check', null, {
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
      this.isDisabled.step3 = false
    },
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
    // 获取激活码
    async getActiveCode () {
      const { data: result } = await this.$http.get('/verify/active', {
        params: { to: this.updateEmailForm.email }
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
      this.isUpdatePwdDialogVisible = false
      this.$refs[refName].resetFields()
    },
    // 取消修改密码
    cancelUpdateEmail (refName) {
      this.isUpdateEmailDialogVisible = false
      this.$refs[refName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.form-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: snow;
  padding: 10px;
  border-radius: 10px;
  // margin-left: 8px;
  .item-content {
    padding: 10px;
    h4 {
      margin: 0px;
    }
  }
}
</style>
