<template>
  <div class="container">
    <!-- 返回顶部按钮 -->
    <el-backtop :bottom="100" :right="50" :visibility-height="50">
      <i class="el-icon-arrow-up"></i>
    </el-backtop>
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :xs="0" :sm="6" :md="5" :lg="4" :xl="4">
        <div class="user-info">
          <div class="user-info-head">
            <span class="user-info-nickname">{{ user.nickname }}</span>
            <a class="user-page-link" href="/#/profile">
              <i class="el-icon-postcard"></i>
              <span> 个人信息</span>
            </a>
          </div>
          <el-divider></el-divider>
          <div class="user-info-nav">
            <a class="user-info-nav-link" href="/#/article">
              <div class="user-info-nav-item">
                <i class="el-icon-document"></i>
                <span> 文章</span>
              </div>
            </a>
            <a class="user-info-nav-link" href="/#/link">
              <div class="user-info-nav-item">
                <i class="el-icon-link"></i>
                <span> 链接</span>
              </div>
            </a>
          </div>
          <div class="user-info">
            <div class="user-info-account" v-if="true">
              <h4 class="block-title">主页</h4>
              <div class="user-info-homepage">
                <el-link :href="user.home_page" icon="el-icon-link" target="_blank">
                  {{ user.home_page }}
                </el-link>
                <span v-if="!user.home_page">暂无个人网站</span>
              </div>
              <h4 class="block-title">仓库</h4>
              <a class="user-info-repository-link" :href="user.github" target="_blank" v-if="user.github">
                <div class="user-info-repository">
                  <i class="icon-github-24px"></i>
                  <span>Github</span>
                </div>
              </a>
              <a class="user-info-repository-link" :href="user.gitee" target="_blank" v-if="user.gitee">
                <div class="user-info-repository">
                  <i class="icon-gitee-24px"></i>
                  <span>码云</span>
                </div>
              </a>
              <span v-if="!user.github && !user.gitee">暂无代码仓库</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="10" :xl="10">
        <dynamic/>
      </el-col>
      <el-col :xs="0" :sm="6" :md="5" :lg="4" :xl="4">
        <div class="quick-fetch">
          <h4 class="block-title">快速访问</h4>
          <a class="link-card" href="/#/article">
            <div class="link-card-content color-gradient-NewLife">
              <i class="icon-article iconsize-large"></i>
              <span>文章管理</span>
            </div>
          </a>
          <a class="link-card" href="/#/data">
            <div class="link-card-content color-gradient-MalibuBeach">
              <i class="icon-data iconsize-large"></i>
              <span>统计数据</span>
            </div>
          </a>
          <a class="link-card" href="https://github.com" target="_blank">
            <div class="link-card-content color-gradient-TrueSunset">
              <i class="icon-code iconsize-large"></i>
              <span>代码仓库</span>
            </div>
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Dynamic from '@/components/main/index/Dynamic.vue'
export default {
  components: {
    'dynamic': Dynamic
  },
  data () {
    return {
      user: {
        id: '',
        username: '',
        nickname: '',
        avatar: '',
        introduction: '',
        motto: '',
        home_page: '',
        github: '',
        gitee: ''
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息
    getUserInfo () {
      this.$http.get(`/user/${window.sessionStorage.getItem('uid')}`).then(res => {
        this.user = res.data.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}
.block-title {
  margin: 0 0 20px 0;
}
.link-card {
  text-decoration: none;
  cursor: pointer;
  color: #fff;
}
.link-card-content {
  padding: 10px;
  margin: 0 0 10px 0;
  border-radius: 10px;
  // 阴影
  box-shadow: 0px 0px 8px #dcdfe6;
  display: flex;
  align-items: center;
  span {
    margin: 0 0 0 10px;
    font-weight: bold;
  }
}
.user-info {
  .user-info-head {
    .user-info-nickname {
      font-weight: bold;
    }
    .user-page-link {
      text-decoration: none;
      color: #303133;
    }
    .user-page-link:hover {
      color: #409EFF;
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .el-divider {
    margin: 10px 0 10px 0;
  }
  .user-info-nav {
    .user-info-nav-link {
      text-decoration: none;
      color: #303133;
    }
    .user-info-nav-item {
      padding: 5px;
    }
    .user-info-nav-item:hover {
      background-color: #F2F6FC;
    }
  }
  .user-info-account {
    margin: 10px 0 10px 0;
    .user-info-repository-link {
      text-decoration: none;
    }
    .user-info-repository {
      padding: 8px;
      display: flex;
      align-items: center;
      // background-color: #000000;
      border-radius: 16px;
      i {
        background-color: #FFFFFF
      }
      span {
        color: #000000;
        font-weight: bold;
        margin: 0 0 0 5px;
      }
      // 阴影
      box-shadow: 0px 0px 8px #dcdfe6;
      margin: 0 0 10px 0;
    }
  }
  .user-info-homepage {
    .user-info-homepage-link {
      text-decoration: none;
    }
    span, i {
      color: #303133;
    }
    .user-info-homepage-link:hover {
      span, i {
        color: #409EFF;
      }
    }
    margin: 0 0 20px 0;
  }
}
</style>
