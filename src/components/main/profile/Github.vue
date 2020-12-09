<template>
  <div class="profile-github">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/profile' }"
        >个人设置</el-breadcrumb-item
      >
      <el-breadcrumb-item>Github</el-breadcrumb-item>
    </el-breadcrumb>
    <p>请输入个人空间地址</p>
    <el-input v-model="username" clearable>
      <template slot="prepend">https://github.com/</template>
    </el-input>
    <div class="btn-group">
      <el-button type="primary" @click="update">更新</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      url: ''
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    // 获取信息
    async getInfo () {
      const { data: result } = await this.$http.get(`/admin/${window.sessionStorage.getItem('uid')}/github`)
      if (result.status !== 200) {
        return this.$message.error('获取信息失败')
      }
      this.url = result.data.github
      this.username = this.url.split('/')[this.url.split('/').length - 1]
    },
    // 更新
    async update () {
      this.url = 'https://github.com/' + this.username
      const body = {
        op: 'replace',
        path: '/github',
        value: this.url
      }
      const { data: result } = await this.$http.patch(`/admin/${window.sessionStorage.getItem('uid')}`, body)
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success(result.message)
      this.getInfo()
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
.btn-group {
  margin: 10px 0 10px 0;
}
</style>
