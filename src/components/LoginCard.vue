<template>
  <el-card class="loginCard" shadow="never">
    <el-tabs v-model="tabs.activeName" stretch>
      <el-tab-pane name="first">
        <span slot="label">
          <i class="el-icon-user"></i> 账户密码登录
        </span>
        <el-form
          class="login_form"
          :model="loginRuleForm"
          :rules="loginFormRules"
          ref="loginFormRef"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              prefix-icon="el-icon-user"
              placeholder="请输入用户名"
              type="text"
              v-model="loginRuleForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
              type="password"
              show-password
              v-model="loginRuleForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <div style="display: flex; align-items: center;">
              <el-input placeholder="请输入邮箱验证码" type="text" v-model="loginRuleForm.code"></el-input>
              <el-button
                type="primary"
                plain
                round
                style="margin-left: 10px;"
                @click="getVerificationCode()"
              >获取验证码</el-button>
            </div>
          </el-form-item>
        </el-form>
        <div class="btn-group">
          <div class="btn-left">
            <el-button type="text">忘记密码</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text">用户注册</el-button>
          </div>
          <div class="btn-right">
            <el-button type="primary" round @click="login()">登录</el-button>
            <el-button round @click="resetLoginForm('loginFormRef')">重置</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label">
          <i class="el-icon-full-screen"></i> 扫码登录
        </span>
        <div class="QR_Code-login">
          <p>打开手机APP，扫描下方二维码即可快速登录</p>
          <div class="QR_Code-img">
            <!--
              <img src="" />
            -->
          </div>
          <el-button type="text" icon="el-icon-refresh">刷新二维码</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      loginRuleForm: {
        username: '',
        password: '',
        code: ''
      },
      // 表单的验证规则
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名！', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码！', trigger: 'blur' }
        ],
        code: [{ required: true, message: '请输入验证码！', trigger: 'blur' }]
      },
      tabs: {
        activeName: 'first'
      }
    }
  },
  created () {
    // this.getWebsiteInfo()
  },
  methods: {
    // 重置登录表单
    resetLoginForm (refName) {
      this.$refs[refName].resetFields()
      // console.log(this)
    },
    // 获取邮箱验证码
    async getVerificationCode () {
      if (this.loginRuleForm.username !== '') {
        const { data: result } = await this.$http.get('/verify/login', {
          params: { username: this.loginRuleForm.username }
        })
        if (result.status !== 200) {
          return this.$message.error(result.message)
        }
        this.$message.success(result.message)
      } else {
        this.$message.error('请填写用户名')
      }
    },
    // 登录
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          const { data: response } = await this.$http.post(
            '/verify/check',
            null,
            {
              params: {
                key: this.loginRuleForm.username,
                value: this.loginRuleForm.code
              }
            }
          )
          if (response.status !== 200) {
            this.resetLoginForm('loginFormRef')
            return this.$message.error(response.message)
          }
          this.loginForm.username = this.loginRuleForm.username
          this.loginForm.password = this.loginRuleForm.password
          const { data: result } = await this.$http.post(
            '/login',
            this.loginForm
          )
          if (result.status !== 200) {
            this.resetLoginForm('loginFormRef')
            return this.$message.error(result.message)
          }
          this.$message.success(result.message)
          window.sessionStorage.setItem('uid', result.data.id)
          window.sessionStorage.setItem('token', result.data.token)
          this.$router.push('/admin')
        } else {
          this.$message.warning('请正确填写表单内容！')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  background: rgba(255, 255, 255, 0.85);
}
.btn-group {
  display: flex;
  justify-content: space-between;
}
.QR_Code-login {
  text-align: center;
  color: #606266;
}
</style>
