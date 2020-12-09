<template>
  <div class="article-draft">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/article' }"
        >文章管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>草稿箱</el-breadcrumb-item>
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
        <span>确定要删除该草稿吗？删除之后将无法恢复！</span>
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
            <span v-if="scope.row.title">{{ scope.row.title }}</span>
            <span v-else>&lt;未命名&gt;</span>
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
            <!-- 修改按钮 -->
            <el-button
              type="success"
              icon="el-icon-edit"
              circle
              size="small "
              @click="edit(scope.row.id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="small"
              @click="openDeleteDialog(scope.row.id)"
            ></el-button>
            <!-- 下载按钮 -->
            <el-button
              type="primary"
              round
              icon="el-icon-upload2"
              size="small"
              style="margin-left: 10px"
              @click="publish(scope.row.id)"
              >发布</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页区 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.pageNum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="params.pageSize"
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
        pageNum: 1,
        pageSize: 10,
        status: 0,
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
    },
    // 编辑草稿
    edit (id) {
      this.$router.push(`/article/update/${id}`)
    },
    // 发布
    async publish (id) {
      const body = {
        op: 'replace',
        path: '/status',
        value: 1
      }
      const { data: result } = await this.$http.patch(`/admin/article/${id}`, body)
      if (result.status !== 200) {
        return this.$message.error('发布失败！')
      }
      this.$message.success('发布成功！')
      this.$router.push('/article')
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
</style>
