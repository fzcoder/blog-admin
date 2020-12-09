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
              <div class="dynamic-item" v-for="i in item.content" :key="i.id">
                <p class="dynamic-item-header">
                  <i class="el-icon-time"></i>
                  <span> {{ i.createTime }}</span>
                </p>
                <!-- 左侧布局 -->
                <div  class="dynamic-item-content" v-if="i.eventPosition === 'left'">
                  <el-avatar :src="user.avatar" :size="20"></el-avatar>
                  <a class="dynamic-item-link" href="/#/user">
                    <span style="margin: 0 5px 0 5px; font-weight: bold;">{{ user.nickname }}</span>
                  </a>
                  <el-tag :type="i.eventType" size="mini" effect="dark">{{ i.eventContent }}</el-tag>
                  <span>了</span>
                  <a v-if="i.prefixLink" class="dynamic-item-link" :href="'/#' + i.prefixLink">
                    <span v-if="i.prefixContent">{{ i.prefixContent }}</span>
                    <span v-else>&lt;未命名&gt;</span>
                  </a>
                  <span v-if="i.prefixContent && !i.prefixLink">{{ i.suffixContent }}</span>
                  <span v-if="!i.prefixContent && !i.prefixLink">&lt;未命名&gt;</span>
                  <span v-if="i.suffixContent">到</span>
                  <a v-if="i.suffixLink" class="dynamic-item-link" :href="'/#' + i.suffixLink">
                    <span v-if="i.suffixContent">{{ i.suffixContent }}</span>
                    <span v-else>&lt;未命名&gt;</span>
                  </a>
                  <span v-if="i.suffixContent && !i.suffixLink">{{ i.suffixContent }}</span>
                  <span v-if="i.suffixContent">中</span>
                </div>
                <!-- 中间布局 -->
                <div class="dynamic-item-content" v-else>
                  <el-avatar :src="user.avatar" :size="20"></el-avatar>
                  <a class="dynamic-item-link" href="/#/user">
                    <span style="margin: 0 5px 0 5px; font-weight: bold;">{{ user.nickname }}</span>
                  </a>
                  <span>在</span>
                  <a class="dynamic-item-link" :href="'/#' + i.prefixLink">{{ i.prefixContent }}</a>
                  <span>中</span>
                  <el-tag :type="i.eventType" size="mini" effect="dark">{{ i.eventContent }}</el-tag>
                  <span>了</span>
                  <a class="dynamic-item-link" :href="'/#' + i.suffixLink">
                    <span v-if="i.suffixContent">{{ i.suffixContent }}</span>
                    <span v-else>&lt;未命名&gt;</span>
                  </a>
                </div>
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
          start_date: '',
          end_date: ''
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
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
      this.dynamic.params.start_date = start.getFullYear() + '-' + (start.getMonth() + 1 < 10 ? '0' + (start.getMonth() + 1) : start.getMonth() + 1) + '-' + start.getDate()
      this.dynamic.params.end_date = end.getFullYear() + '-' + (end.getMonth() + 1 < 10 ? '0' + (end.getMonth() + 1) : end.getMonth() + 1) + '-' + end.getDate()
      const { data: result } = await this.$http.get('/admin/dynamic', { params: this.dynamic.params })
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
.dynamic-item-link {
  text-decoration: none;
  color: #303133;
  margin: 0 5px 0 5px;
}
.dynamic-item-link:hover {
  color: #409EFF;
}
.dynamic-item-content {
  .el-avatar {
    padding: 0px;
    margin: 0px;
  }
  display: inline-flex;
  .el-tag {
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
