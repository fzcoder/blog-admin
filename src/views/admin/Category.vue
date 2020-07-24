<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>目录管理</el-breadcrumb-item>
      <el-breadcrumb-item>目录列表</el-breadcrumb-item>
    </el-breadcrumb>
    <Content type="category"></Content>
  </div>
</template>

<script>
import Content from '@/components/admin/common/Content.vue'
export default {
  name: 'category',
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
