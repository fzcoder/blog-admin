<template>
  <div class="main-article-list">
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :xs="0" :sm="6" :md="5" :lg="4" :xl="4">
        <div class="category-content">
          <!-- 目录列表 -->
          <category-list></category-list>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="14" :lg="16" :xl="16">
        <div class="article-list-content">
          <!-- 文章列表 -->
          <article-list></article-list>
        </div>
      </el-col>
      <el-col :xs="0" :sm="6" :md="5" :lg="4" :xl="4">
        <div class="nav-content">
          <!-- 导航列表 -->
          <nav-list></nav-list>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CategoryList from '@/components/main/article/list/CategoryList.vue'
import ArticleList from '@/components/main/article/list/ArticleList.vue'
import NavList from '@/components/main/article/list/NavList.vue'
export default {
  components: {
    'category-list': CategoryList,
    'article-list': ArticleList,
    'nav-list': NavList
  },
  data () {
    return {}
  },
  created () {},
  mounted () {
    this.init()
  },
  methods: {
    // 初始化
    init () {
      var elem = document.getElementsByClassName('category-content')[0]
      elem.style.height = (document.body.clientHeight - 50) + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
.container, .el-row {
  width: 100%;
}
.category-content {
  position: fixed;
  width: inherit;
  z-index: 100px;
}
.article-list-content {
  padding: 20px;
}
</style>
