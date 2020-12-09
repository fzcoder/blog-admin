<template>
  <div class="main-article-list">
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :xs="0" :sm="7" :md="6" :lg="4" :xl="4">
        <h4 style="margin: 0px 0px 10px 10px;"><i class="el-icon-s-unfold"></i> 链接目录</h4>
        <!-- 目录列表 -->
        <category-list></category-list>
      </el-col>
      <el-col :xs="24" :sm="14" :md="14" :lg="16" :xl="16">
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/link' }"
            >链接管理</el-breadcrumb-item
          >
          <el-breadcrumb-item>链接列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 链接列表 -->
        <link-list></link-list>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CategoryList from '@/components/main/link/CategoryList.vue'
import LinkList from '@/components/main/link/LinkList.vue'
export default {
  components: {
    'category-list': CategoryList,
    'link-list': LinkList
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>
