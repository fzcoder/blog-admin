<template>
  <div class="container">
    <div class="container-content">
      <div class="content-header">
        <h2 style="margin: 0px;">Frank's Blog</h2>
      </div>
      <div class="content-main">
        <login class="login-card">
          <div class="card-header">
            <i class="el-icon-user-solid"></i>
            <span>账号密码登录</span>
          </div>
          <!-- 登录表单 -->
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
                  :disabled="countdown.show"
                  style="margin-left: 10px;"
                  @click="getVerificationCode()"
                >
                  <span v-show="!countdown.show">获取验证码</span>
                  <span v-show="countdown.show">还剩{{ countdown.count }}s</span>
                </el-button>
              </div>
            </el-form-item>
          </el-form>
          <div class="btn-group">
            <div class="btn-left">
              <el-button type="text">忘记密码?</el-button>
            </div>
            <div class="btn-right">
              <el-button type="primary" round @click="login()">登录</el-button>
              <el-button round @click="resetLoginForm('loginFormRef')">重置</el-button>
            </div>
          </div>
        </login>
      </div>
    </div>
  </div>
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
      // 验证码倒计时
      countdown: {
        show: false,
        count: 0,
        timer: null
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
        // 获取失败
        if (result.status !== 200) {
          return this.$message.error(result.message)
        }
        this.$message.success(result.message)
        // 获取成功，开始倒计时
        this.countDown()
      } else {
        this.$message.error('请填写用户名')
      }
    },
    // 倒计时
    countDown () {
      const TIME_COUNT = 60 * 5
      if (!this.countdown.timer) {
        this.countdown.count = TIME_COUNT
        this.countdown.show = true
        this.countdown.timer = setInterval(() => {
          if (this.countdown.count > 0 && this.countdown.count <= TIME_COUNT) {
            this.countdown.count--
          } else {
            this.countdown.show = false
            clearInterval(this.countdown.timer)
            this.countdown.timer = null
          }
        }, 1000)
      }
    },
    // 登录
    login () {
      this.$refs.loginFormRef.validate(async (valid) => {
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
          window.sessionStorage.setItem('username', result.data.id)
          window.sessionStorage.setItem('token', result.data.token)
          this.$router.push('/')
        } else {
          this.$message.warning('请正确填写表单内容！')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  background-image: url('../assets/image/login-background.jpg');
  background-size: 100% 100%;
  height: 100%;
  width: 100%;
}

.container-content {
  padding: 20px;
}

.content-main {
  padding: 20px;
}

.login-card {
  float: right;
  width: 360px;
  padding: 20px;
  margin: 3% 2% 0 0;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #dcdfe6;
}

.card-header {
  text-align: center;
  padding: 10px;
  span {
    font-weight: bold;
    margin: 0 0 0 5px;
  }
}
.btn-group {
  display: flex;
  justify-content: space-between;
}
</style>
