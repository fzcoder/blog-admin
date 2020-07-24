<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right" v-show="Switch.isHeadVisible">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="18">
        <!-- 用户信息 -->
        <div class="user-information">
          <!-- 基本信息 -->
          <div class="user-info" v-show="Switch.isHeadVisible">
            <el-avatar class="user-avatar" shape="square" :size="100" :src="user.avatar"></el-avatar>
            <div class="info-content">
              <h2 class="user-nickname">{{ user.nickname }}</h2>
              <p class="user-motto"># {{ user.motto }} #</p>
              <div class="btn-group">
                <el-button type="text" size="small" icon="el-icon-edit" @click="editUserInfo">编辑</el-button>
                <el-button type="text" size="small" icon="el-icon-setting" @click="userSetting">设置</el-button>
              </div>
            </div>
          </div>
          <!-- 更多信息 -->
          <el-collapse :accordion="true" value="exInfo" v-show="Switch.isHeadVisible">
            <el-collapse-item name="exInfo">
              <template slot="title">
                <i class="el-icon-info"></i>
                <span>更多信息</span>
              </template>
              <p>简介：{{ user.introduction }}</p>
            </el-collapse-item>
          </el-collapse>
        </div>
        <!-- 标签页 -->
        <el-tabs
          v-model="tabs.activeName"
          tab-position="top"
          :stretch="false"
          @tab-click="handleTabClick"
        >
          <!-- 动态 -->
          <el-tab-pane name="dynamic">
            <span slot="label">
              <i class="el-icon-user"></i> 动态
            </span>
            <Dynamic :user="user"></Dynamic>
          </el-tab-pane>
          <!-- 修改信息 -->
          <el-tab-pane name="update">
            <span slot="label">
              <i class="el-icon-edit-outline"></i> 修改信息
            </span>
            <UpdateInfo></UpdateInfo>
          </el-tab-pane>
          <!-- 账户安全 -->
          <el-tab-pane name="security">
            <span slot="label">
              <i class="el-icon-lock"></i> 账户安全
            </span>
            <AccountSecurity></AccountSecurity>
          </el-tab-pane>
          <!-- 个性化设置 -->
          <el-tab-pane name="setting">
            <span slot="label">
              <i class="el-icon-setting"></i> 个性化设置
            </span>
            功能暂未开放
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="6">
        <div class="count">
          <h4 style="margin-top: 0px;"># 统计</h4>
          <div>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="count-item">
                  <h4>访问量</h4>
                  <h4>{{ count.hits }}</h4>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="count-item">
                  <h4>文章数</h4>
                  <h4>{{ count.articleNumber }}</h4>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="module">
          <h4># 模块</h4>
          <!-- 模块信息 -->
          <div class="module-item" v-for="item in modules" :key="item.id">
            <div class="module-item-content">
              <h4>
                <i :class="item.icon_title"></i>
                {{ item.name }}
              </h4>
              <el-button type="text" size="medium" @click="gotoModule(item.link)">>> 点击进入</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Dynamic from '@/views/admin/home/Dynamic.vue'
import UpdateInfo from '@/views/admin/home/UpdateInfo.vue'
import AccountSecurity from '@/views/admin/home/AccountSecurity.vue'
export default {
  components: {
    Dynamic,
    UpdateInfo,
    AccountSecurity
  },
  data () {
    return {
      // 用户信息
      user: {},
      // 统计信息
      count: {
        hits: 0,
        articleNumber: 0
      },
      // 标签页
      tabs: {
        // 激活的标签
        activeName: 'dynamic'
      },
      // 模块
      modules: [
        {
          id: 1,
          name: '文章管理',
          icon_title: 'el-icon-edit',
          icon: 'icon-article2-primary-80px',
          introduction: '在该模块中可对文章进行统一管理。',
          style: 'primary',
          link: '/admin/article'
        },
        {
          id: 2,
          name: '目录管理',
          icon_title: 'el-icon-s-fold',
          icon: 'icon-category3-success-64px',
          introduction: '在该模块中可对文章进行统一管理。',
          style: 'success',
          link: '/admin/category'
        },
        {
          id: 3,
          name: '链接管理',
          icon_title: 'el-icon-link',
          icon: 'icon-link-warning-64px',
          introduction: '在该模块中可对文章进行统一管理。',
          style: 'warning',
          link: '/admin/link'
        },
        {
          id: 4,
          name: '统计数据',
          icon_title: 'el-icon-s-data',
          icon: 'icon-count-primary-64px',
          introduction: '在该模块中可对文章进行统一管理。',
          style: 'primary',
          link: '/admin/count'
        },
        {
          id: 5,
          name: '网站设置',
          icon_title: 'el-icon-setting',
          icon: 'icon-setting-info-64px',
          introduction: '在该模块中可对文章进行统一管理。',
          style: 'info',
          link: '/admin/setting'
        }
      ],
      // 开关
      Switch: {
        // 头部信息是否可见
        isHeadVisible: true
      }
    }
  },
  created () {
    this.getUserInfo()
    this.getCountInfo()
  },
  methods: {
    // 获取用户信息
    async getUserInfo () {
      const { data: result } = await this.$http.get(
        '/user/' + window.sessionStorage.getItem('uid')
      )
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.user = result.data
    },
    // 获取统计信息
    getCountInfo () {
      this.$http.get('/count/website').then(response => {
        this.count.hits = response.data.data.hits
      })
      this.$http.get('/count/article').then(response => {
        this.count.articleNumber = response.data.data.total
      })
    },
    // 编辑用户信息
    editUserInfo () {
      this.tabs.activeName = 'update'
      this.Switch.isHeadVisible = false
    },
    // 个性化设置
    userSetting () {
      this.tabs.activeName = 'setting'
      this.Switch.isHeadVisible = false
    },
    // 处理标签页选中事件
    handleTabClick (tab) {
      this.Switch.isHeadVisible = tab.name === 'dynamic'
    },
    gotoModule (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 15px;
}
.user-info {
  display: flex;
  justify-content: flex-start;
  .info-content {
    margin-left: 15px;
    .user-nickname {
      margin-top: 0px;
      margin-bottom: 5px;
      color: #303133;
    }
    .user-motto {
      color: #909399;
      margin: 0;
      // font-size: small;
    }
    .user-introduction {
      color: #606266;
      margin: 0 0 5px 0;
      font-size: small;
    }
  }
}
.el-collapse {
  margin-top: 10px;
}
.count-item {
  border: solid 3px #409EFF;
  border-radius: 60px;
  text-align: center;
  color: #409EFF;
}
.module-item {
  // display: flex;
  // align-items: center;
  // justify-content: flex-start;
  background-color: snow;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 10px;
  .module-item-content {
    padding: 10px;
    h4 {
      margin: 0px;
    }
  }
}
</style>
