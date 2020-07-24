<template>
  <div class="container">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>链接管理</el-breadcrumb-item>
      <el-breadcrumb-item>链接列表</el-breadcrumb-item>
    </el-breadcrumb>
    <Content type="link"></Content>
  </div>
</template>

<script>
import Content from '@/components/admin/common/Content.vue'
export default {
  components: {
    Content
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 15px;
}
</style>
