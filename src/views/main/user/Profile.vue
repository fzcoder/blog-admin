<template>
  <div class="user-profile-container">
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :xs="0" :sm="8" :md="6" :lg="4" :xl="5">
        <h4 style="margin: 0px 0px 10px 8px;">基本设置</h4>
        <a class="profile-item-link" v-for="item in menu.base" :key="item.title" :href="item.url">
          <div class="profile-item-content">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </div>
        </a>
        <h4 style="margin: 10px 0px 10px 8px;">仓库管理</h4>
        <a class="profile-item-link" v-for="item in menu.repositories" :key="item.title" :href="item.url">
          <div class="profile-item-content">
            <i :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </div>
        </a>
      </el-col>
      <el-col :xs="24" :sm="16" :md="14" :lg="12" :xl="12">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menu: {
        base: [
          { title: '个人资料', url: '/#/profile', icon: 'el-icon-user' },
          { title: '修改密码', url: '/#/profile/password', icon: 'el-icon-lock' },
          { title: '修改邮箱', url: '/#/profile/email', icon: 'el-icon-message' }
        ],
        repositories: [
          { title: 'Github', url: '/#/profile/github', icon: 'el-icon-coin' },
          { title: '码云', url: '/#/profile/gitee', icon: 'el-icon-coin' }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.profile-item-link {
  text-decoration: none;
  color: #303133;
}
.profile-item-content {
  padding: 8px;
  span {
    margin-left: 5px;
  }
}
.profile-item-content:hover {
  background-color: #F2F6FC;
  color: #409EFF;
}
</style>
