<template>
  <el-container>
    <el-header>
      <div class="header">
        <el-link class="logo" :underline="false" href="/">
          <h1>{{ brand }}</h1>
        </el-link>
        <el-menu mode="horizontal">
          <el-menu-item v-for="item in menu" :key="item.name">
            <template slot="title">
              <el-link
                :underline="false"
                :icon="item.icon"
                :href="item.url"
                target="_blank"
              >
                <span>{{ item.name }}</span>
              </el-link>
            </template>
          </el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <el-main>
      <el-row class="container" type="flex" justify="center">
        <el-col :xs="24" :sm="12" :md="10" :lg="7" :xl="7">
          <login class="login-card"></login>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import login from '@/components/LoginCard.vue'
export default {
  components: {
    login
  },
  data () {
    return {
      brand: 'MyBlog',
      menu: [
        { name: '首页', url: 'http://www.xxxx.com', icon: 'el-icon-s-home' },
        { name: '下载APP', url: '/#/app', icon: 'el-icon-download' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  background-image: url('http://pic.xxxx.com/xxxxxx.jpg');
  background-size: 100% 100%;
  height: 100%;
  width: 100%;
}
.el-header {
  background: rgba(255, 255, 255, 0.85);
}
.header {
  display: flex;
  align-content: center;
  justify-content: space-between;
  height: 100%;
  .logo {
    color: #606266;
    h1 {
      margin: 0px;
    }
  }
  .el-menu {
    border-bottom: 0px;
    display: flex;
    align-items: center;
    background: transparent;
    .el-link {
      span {
        font-weight: bold;
      }
    }
  }
}
.el-main {
  padding: 0px;
}
.container {
  width: 100%;
  height: 100%;
}
.login-card {
  margin-top: 15%;
}
</style>
