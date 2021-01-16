<template>
  <div class="article-draft">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/article' }"
        >文章管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>废纸篓</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 文章列表 -->
    <div class="article-list">
      <!-- 删除文章对话框 -->
      <el-dialog
        title="删除文章"
        :visible.sync="isDeleteDialogVisible"
        width="30%"
      >
        <!-- 内容主体区域 -->
        <span>确定要删除该文章吗？删除之后将无法恢复！</span>
        <!-- 底部区域 -->
        <span slot="footer">
          <el-button round @click="isDeleteDialogVisible = false"
            >取消</el-button
          >
          <el-button
            round
            type="primary"
            @click="deleteArticle(deleteArticleId)"
            >确定</el-button
          >
        </span>
      </el-dialog>
      <el-table :data="list" style="width: 100%">
        <el-table-column type="selection" width="40"> </el-table-column>
        <el-table-column label="文章ID" prop="id" width="95"> </el-table-column>
        <el-table-column label="文章标题">
          <template slot-scope="scope">
            <a :href="'/#/article/preview/' + scope.row.id">
              <span v-if="scope.row.title">{{ scope.row.title }}</span>
            </a>
          </template>
        </el-table-column>
        <el-table-column label="创建日期" prop="createTime" width="160">
        </el-table-column>
        <el-table-column label="所属目录" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.category">{{ scope.row.category.categoryName }}</span>
            <span v-else>&lt;未选择&gt;</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              round
              size="small"
              @click="openDeleteDialog(scope.row.id)"
            >删除</el-button>
            <!-- 下载按钮 -->
            <el-button
              type="primary"
              round
              icon="el-icon-refresh"
              size="small"
              style="margin-left: 10px"
              @click="restore(scope.row.id)"
              >还原</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页区 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.page_num"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="params.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      params: {
        uid: window.sessionStorage.getItem('uid'),
        key: '',
        page_num: 1,
        page_size: 10,
        status: 2,
        order_by: 'date',
        is_reverse: true
      },
      total: 0,
      // 控制确认删除弹出框的显示与隐藏
      isDeleteDialogVisible: false,
      // 要删除的文章id
      deleteArticleId: ''
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 监听pageSize改变的事件
    handleSizeChange (newSize) {
      this.params.page_size = newSize
      this.getList()
    },
    // 监听页码值改变的事件
    handleCurrentChange (newPage) {
      this.params.page_num = newPage
      this.getList()
    },
    // 获取文章列表
    async getList () {
      const { data: result } = await this.$http.get('/admin/article', {
        params: this.params
      })
      this.list = result.data.records
      this.total = result.data.total
      this.params.page_num = result.data.current
      this.params.page_size = result.data.size
    },
    // 打开删除标签对话框
    openDeleteDialog (id) {
      this.isDeleteDialogVisible = true
      this.deleteArticleId = id
    },
    // 删除标签
    async deleteArticle (id) {
      const { data: result } = await this.$http.delete(`/admin/article/${id}`)
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.deleteArticleId = ''
      this.isDeleteDialogVisible = false
      this.$message.success(result.message)
      this.getList()
    },
    // 还原
    async restore (id) {
      const body = {
        op: 'replace',
        path: '/status',
        value: 1
      }
      const { data: result } = await this.$http.patch(`/admin/article/${id}`, body)
      if (result.status !== 200) {
        return this.$message.error('还原失败！')
      }
      this.$message.success('还原成功！')
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin: 0 0 20px 0;
}
.el-pagination {
  margin: 20px 0 20px 0;
}
a {
  text-decoration: none;
  color: #303133;
}
a:hover {
  color: #409eff;
}
</style>
