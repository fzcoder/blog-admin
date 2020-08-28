<template>
  <div class="container">
    <!-- 返回顶部按钮 -->
    <el-backtop :bottom="100" :right="50" :visibility-height="50">
      <i class="el-icon-arrow-up"></i>
    </el-backtop>
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :xs="0" :sm="6" :md="5" :lg="4" :xl="4">
        <div>
          <div class="user-info">
            <div class="user-info-head">
              <span class="user-info-nickname">{{ user.nickname }}</span>
              <a class="user-page-link" href="/#/user">
                <i class="el-icon-postcard"></i>
                <span> 个人中心</span>
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
              <a class="user-info-nav-link" href="/#/category">
                <div class="user-info-nav-item">
                  <i class="el-icon-folder"></i>
                  <span> 目录</span>
                </div>
              </a>
              <a class="user-info-nav-link" href="/#/link">
                <div class="user-info-nav-item">
                  <i class="el-icon-link"></i>
                  <span> 链接</span>
                </div>
              </a>
            </div>
            <div class="user-info-account" v-if="true">
              <h4 class="block-title">主页</h4>
              <div class="user-info-homepage">
                <el-link :href=" 'http://' + user.home_page + '/' " icon="el-icon-link" target="_blank">
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
        <div class="dynamic">
          <h4 class="block-title">动态</h4>
          <!-- 时间线 -->
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in dynamic.list"
              :key="index"
              :timestamp="item.timeStamp"
              size="large"
              placement="top"
            >
              <!-- 动态内容 -->
              <div class="dynamic-item" v-for="(i, idx) in item.content" :key="idx">
                <p class="dynamic-item-header">
                  <i class="el-icon-time"></i>
                  <span> {{ i.create_time }}</span>
                </p>
                <p class="dynamic-item-content">
                  <el-avatar :src="user.avatar" size="small"></el-avatar>
                  <span class="dynamic-item-content-nickname">
                    {{ user.nickname }}
                  </span>
                  <span>
                    在<el-tag type="primary" size="mini" effect="dark">{{ i.category_name }}</el-tag>中添加了一篇文章
                  </span>
                  <el-link :underline="false" :href=" '/#/article/view/' + i.id "># {{ i.title }}</el-link>
                </p>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
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
export default {
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
      },
      // 动态
      dynamic: {
        // 请求参数
        params: {
          uid: window.sessionStorage.getItem('uid'),
          type: 'article',
          part_num: 1
        },
        // 列表
        list: []
      }
    }
  },
  created () {
    this.getDynamic()
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息
    getUserInfo () {
      this.$http.get(`/user/${window.sessionStorage.getItem('uid')}`).then(res => {
        this.user = res.data.data
      })
    },
    // 获取动态信息
    async getDynamic () {
      const { data: result } = await this.$http.get('/dynamic', { params: this.dynamic.params })
      this.dynamic.list = result.data
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
.el-timeline {
  padding: 0px;
}
.dynamic-item {
  margin: 10px 0 10px 0;
}
.dynamic-item-header {
  font-size: small;
  color: #303133;
}
.dynamic-item-content {
  padding: 0px;
  margin: 0px;
  display: flex;
  align-items: center;
  .dynamic-item-content-nickname {
    font-weight: bold;
    margin: 0 5px 0 5px;
  }
  .el-tag {
    margin: 0 5px 0 5px;
  }
  .el-link {
    margin: 0 5px 0 5px;
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
