<template>
  <div class="profile-github">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/profile' }"
        >个人设置</el-breadcrumb-item
      >
      <el-breadcrumb-item>码云</el-breadcrumb-item>
    </el-breadcrumb>
    <p>请输入个人空间地址</p>
    <el-input v-model="username" clearable>
      <template slot="prepend">https://gitee.com/</template>
    </el-input>
    <div class="btn-group">
      <el-button type="primary">更新</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: ''
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
