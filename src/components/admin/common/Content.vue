<template>
  <div class="content">
    <CategoryAdd
      :visible.sync="Switch.isCategoryAddDialogVisible"
      @submit="Switch.isLinkAddDialogVisible = !Switch.isLinkAddDialogVisible"
      @cancel="Switch.isCategoryAddDialogVisible = !Switch.isCategoryAddDialogVisible"
    ></CategoryAdd>
    <!-- 链接添加对话框 -->
    <LinkAdd
      :visible.sync="Switch.isLinkAddDialogVisible"
      @submit="Switch.isLinkAddDialogVisible = !Switch.isLinkAddDialogVisible"
      @cancel="Switch.isLinkAddDialogVisible = !Switch.isLinkAddDialogVisible"
    ></LinkAdd>
    <!-- 搜索区 -->
    <Search v-model="query.body.key" @search="getList()" @add="handleAdd()"></Search>
    <!-- 文章列表区 -->
    <ArticleTable v-if="Switch.isArticle" :list="list" @change="getList()"></ArticleTable>
    <!-- 目录列表区 -->
    <CategoryTable v-if="Switch.isCategory" :list="list" @change="getList()" @remove="getList()"></CategoryTable>
    <!-- 链接列表区 -->
    <LinkTable v-if="Switch.isLink" :list="list" @change="getList()"></LinkTable>
    <!-- 分页区 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.body.pageNum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="query.body.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
    ></el-pagination>
  </div>
</template>

<script>
import CategoryAdd from '@/views/admin/category/Add.vue'
import LinkAdd from '@/views/admin/link/Add.vue'
import ArticleTable from '@/components/admin/article/Table.vue'
import CategoryTable from '@/components/admin/category/Table.vue'
import LinkTable from '@/components/admin/link/Table.vue'
import Search from '@/components/admin/common/Search.vue'
export default {
  name: 'Content',
  components: {
    Search,
    ArticleTable,
    CategoryTable,
    LinkTable,
    LinkAdd,
    CategoryAdd
  },
  props: {
    type: String
  },
  data () {
    return {
      // 列表
      list: [],
      // 总数
      total: 0,
      // 请求
      query: {
        // 地址
        url: '',
        // 路径参数
        params: {},
        // 请求参数
        body: {
          key: '',
          pageNum: 1,
          pageSize: 10,
          orderBy: ['date'],
          reverse: true
        }
      },
      Switch: {
        isArticle: false,
        isCategory: false,
        isLink: false,
        isLinkAddDialogVisible: false,
        isCategoryAddDialogVisible: false
      }
    }
  },
  created () {
    if (this.type === 'article') {
      this.Switch.isArticle = true
      this.query.url = '/article'
    }
    if (this.type === 'category') {
      this.Switch.isCategory = true
      this.query.body.orderBy[0] = 'id'
      this.query.url = '/category'
    }
    if (this.type === 'link') {
      this.Switch.isLink = true
      this.query.body.orderBy[0] = 'id'
      this.query.url = '/link'
    }
    this.getList()
  },
  methods: {
    // 监听pageSize改变的事件
    handleSizeChange (newSize) {
      this.query.body.pageSize = newSize
      this.getList()
    },
    // 监听页码值改变的事件
    handleCurrentChange (newPage) {
      this.query.body.pageNum = newPage
      this.getList()
    },
    // 监听添加请求
    handleAdd () {
      if (this.type === 'article') {
        this.$router.push('/admin/article/write')
      }
      if (this.type === 'category') {
        this.Switch.isCategoryAddDialogVisible = true
      }
      if (this.type === 'link') {
        this.Switch.isLinkAddDialogVisible = true
      }
    },
    // 获取文章列表
    async getList () {
      const { data: result } = await this.$http.post(
        this.query.url,
        this.query.body,
        { params: this.query.params }
      )
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.list = result.data.records
      this.query.body.pageNum = result.data.current
      this.query.body.pageSize = result.data.size
      this.total = result.data.total
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 15px;
}
.el-pagination {
  margin-top: 15px;
}
</style>
