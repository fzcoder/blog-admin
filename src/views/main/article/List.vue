<template>
  <div class="main-article-list">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/article' }"
        >文章管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :xs="0" :sm="7" :md="6" :lg="4" :xl="4">
        <!-- 目录列表 -->
        <category-list></category-list>
      </el-col>
      <el-col :xs="24" :sm="14" :md="14" :lg="16" :xl="16">
        <!-- 文章列表 -->
        <article-list></article-list>
      </el-col>
      <el-col :xs="0" :sm="3" :md="4" :lg="4" :xl="4">
        <div class="base-content">
          <h4>功能</h4>
          <a class="link-card" href="/#/article/draft">
            <div class="link-card-content color-gradient-HappyUnicorn">
              <i class="el-icon-edit"></i>
              <span class="card-title">草稿箱</span>
            </div>
          </a>
          <a class="link-card" href="/#/article/trash">
            <div class="link-card-content color-gradient-MagicLake">
              <i class="el-icon-delete"></i>
              <span class="card-title">废纸篓</span>
            </div>
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CategoryList from '@/components/main/article/list/CategoryList.vue'
import ArticleList from '@/components/main/article/list/ArticleList.vue'
export default {
  components: {
    'category-list': CategoryList,
    'article-list': ArticleList
  },
  data () {
    return {
      list: [],
      params: {
        uid: window.sessionStorage.getItem('uid'),
        key: '',
        pageNum: 1,
        pageSize: 10,
        status: 1,
        order_by: 'date',
        is_reverse: true
      },
      total: 0,
      // 控制确认删除弹出框的显示与隐藏
      isDeleteDialogVisible: false,
      // 要删除的文章id
      deleteArticleId: '',
      // 目录列表
      category: []
    }
  },
  created () {
    // this.getList()
  },
  methods: {
    // 监听pageSize改变的事件
    handleSizeChange (newSize) {
      this.params.pageSize = newSize
      this.getList()
    },
    // 监听页码值改变的事件
    handleCurrentChange (newPage) {
      this.params.pageNum = newPage
      this.getList()
    },
    // 获取文章列表
    async getList () {
      const { data: result } = await this.$http.get('/admin/article', {
        params: this.params
      })
      this.list = result.data.records
      this.total = result.data.total
      this.params.pageNum = result.data.current
      this.params.pageSize = result.data.size
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
}
.el-breadcrumb {
  margin: 0px 0px 20px 0px;
}
.el-pagination {
  margin: 20px 0 20px 0;
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
  .card-title {
    margin: 0 0 0 10px;
    font-weight: bold;
  }
}
</style>
