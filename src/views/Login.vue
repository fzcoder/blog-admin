<template>
  <div class="container">
    <header>
      <!-- 头部导航栏 -->
      <nav class="header-nav">
        <ul class="header-nav-list">
          <li class="header-nav-item">
            <div class="header-nav-brand">
              <a class="header-nav-brand-link" href="/">{{ brand }}</a>
              <span style="font-size: small; color: grey; margin-left: 10px;">服务中心</span>
            </div>
          </li>
        </ul>
        <ul class="header-nav-list">
          <li class="header-nav-item" v-for="item in menu" :key="item.name">
            <a class="header-nav-item-link" :href="item.url" target="_blank">
              <i :class="item.icon"></i>{{ item.name }}
            </a>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <div class="main-container">
        <div class="login-content">
          <div class="card-header">
            <i class="el-icon-user-solid"></i>
            <span>用户登录</span>
          </div>
          <!-- 登录表单 -->
          <el-form
            :model="loginForm"
            :rules="loginFormRules"
            ref="loginFormRef"
          >
            <el-form-item label="用户名" prop="username">
              <el-input
                prefix-icon="el-icon-user"
                placeholder="请输入用户名"
                type="text"
                v-model="loginForm.username"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                prefix-icon="el-icon-lock"
                placeholder="请输入密码"
                type="password"
                show-password
                v-model="loginForm.password"
                clearable
              ></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="login" @keyup.enter="login" style="width: 100%;" >登录</el-button>
        </div>
      </div>
    </main>
    <footer>
      <!-- 底部信息 -->
      <div class="footer-container">
        <p class="footer-p">{{ copyright }}</p>
        <p class="footer-p">
          Powered by <a class="footer-link"
          href="https://spring.io/"
          target="_blank">Spring Framework</a> on <a class="footer-link"
          href="https://www.aliyun.com/"
          target="_blank">Aliyun</a>.
        </p>
      </div>
    </footer>
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
      // 表单的验证规则
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名！', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码！', trigger: 'blur' }
        ]
      },
      // 网站标题
      brand: 'Frank\'s Blog',
      // 菜单
      menu: [
        { name: '首页', icon: 'el-icon-house', url: '/' },
        { name: '博客', icon: 'el-icon-edit', url: '/' },
        { name: '文档', icon: 'el-icon-document', url: '/' },
        { name: '邮件', icon: 'el-icon-message', url: 'mailto:xxxxxxx@xxx.com' }
      ],
      // 版权声明
      copyright: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    // 初始化
    init () {
      // 获取当前年份
      var year = new Date().getFullYear()
      if (year > 2020) {
        this.copyright = 'Copyright © 2020 - ' + year + ' domain.com All Rights Reserved.'
      } else {
        this.copyright = 'Copyright © 2020 domain.com All Rights Reserved.'
      }
    },
    // 登录
    login () {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (valid) {
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
    },
    // 重置登录表单
    resetLoginForm (refName) {
      this.$refs[refName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: inherit;
  width: inherit;
  min-width: 800px;
  min-height: 400px;
}
header {
  padding: 15px;
}
.header-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-nav-brand-link {
  text-decoration: none;
  font-size: 24px;
  color: #303133;
}
.header-nav-list {
  list-style: none;
  display: flex;
  padding: 0px;
  margin: 0px;
  align-items: center;
}
.header-nav-item {
  display: inline-block;
  margin: 0 10px 0 10px;
}
.header-nav-item-link {
  text-decoration: none;
  color: #303133;
}
.header-nav-item-link:hover {
  color: #409EFF;
  border-bottom: 2px solid #409EFF;
}
main {
  padding: 20px;
}
footer {
  padding: 0px;
}
.footer-container {
  padding: 20px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  min-width: 800px;
}
.footer-p {
  color: #606266;
  font-size: 14px;
  margin: 8px;
}
.footer-link {
  color: #409EFF;
  text-decoration: none;
}
.login-content {
  width: 380px;
  padding: 0px;
  margin: 0 auto;
}
.card-header {
  text-align: center;
  padding: 10px;
  span {
    font-weight: bold;
    margin: 0 0 0 5px;
  }
}
</style>
