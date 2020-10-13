<template>
  <div class="article-list-container">
    <!-- 搜索区 -->
    <div class="seach-content">
      <div class="btn-group">
        <el-button
          icon="el-icon-plus"
          size="small"
          type="primary"
          @click="addArticle"
          >添加文章</el-button
        >
        <el-button icon="el-icon-delete" size="small" type="danger"
          >批量删除</el-button
        >
      </div>
      <!-- 搜索框 -->
      <div class="input-wrapper">
        <input
          placeholder="请输入关键字"
          v-model="params.key"
          @keyup.enter="getList"
        />
        <button class="search-btn" @click="getList">
          <i class="el-icon-search"></i>
        </button>
      </div>
    </div>
    <!-- 文章列表 -->
    <div class="article-list">
      <!-- 删除文章对话框 -->
      <el-dialog
        title="删除文章"
        :visible.sync="isDeleteDialogVisible"
        width="30%"
      >
        <!-- 内容主体区域 -->
        <span>确定要该文章移除到废纸篓吗？</span>
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
        <el-table-column type="selection" width="55" v-if="false"> </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item label="封面">
                <el-image
                  :src="props.row.cover"
                  style="width: 240px"
                ></el-image>
              </el-form-item>
              <el-form-item label="简介">
                <span>{{ props.row.introduction }}</span>
              </el-form-item>
              <el-form-item label="标签">
                <el-tag
                  v-for="tag in props.row.tags.split(',')"
                  :key="tag"
                  style="margin-right: 5px"
                  >{{ tag }}</el-tag
                >
              </el-form-item>
              <el-form-item label="最后修改时间">
                <span>{{ props.row.updateTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="文章ID" prop="id" width="95"> </el-table-column>
        <el-table-column label="文章标题">
          <template slot-scope="scope">
            <a :href="'/#/article/preview/' + scope.row.id">
              <span>{{ scope.row.title }}</span>
            </a>
          </template>
        </el-table-column>
        <el-table-column label="创建日期" prop="createTime" width="160">
        </el-table-column>
        <el-table-column
          label="所属目录"
          prop="category.categoryName"
          width="120"
        >
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="success"
              icon="el-icon-edit"
              circle
              size="small "
              @click="modify(scope.row.id)"
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
              icon="el-icon-download"
              size="small"
              style="margin-left: 10px"
              @click="download(scope.row.id)"
              >下载</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
        category_id: this.$route.query.category_id,
        status: 1,
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
  watch: {
    // 监听$route中的query值变化
    '$route': 'handleQueryUpdate'
  },
  methods: {
    handleQueryUpdate () {
      this.params.category_id = this.$route.query.category_id
      this.getList()
    },
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
    // 添加文章
    addArticle () {
      this.$router.push('/article/write')
    },
    // 修改文章
    modify (id) {
      this.$router.push(`/article/update/${id}`)
    },
    // 打开删除标签对话框
    openDeleteDialog (id) {
      this.isDeleteDialogVisible = true
      this.deleteArticleId = id
    },
    // 删除标签
    async deleteArticle (id) {
      const body = {
        op: 'replace',
        path: '/status',
        value: 2
      }
      const { data: result } = await this.$http.patch(`/admin/article/${id}`, body)
      if (result.status !== 200) {
        return this.$message.error('移除失败！')
      }
      this.deleteArticleId = ''
      this.isDeleteDialogVisible = false
      this.$message.success('移除成功！')
      this.getList()
    },
    // 下载文章
    async download (id) {
      // axios 响应拦截器
      await this.$http.interceptors.response.use(
        (response) => {
          // console.log(response)
          return response
        },
        (error) => {
          // console.log(error)
          return error
        }
      )
      // 发送请求
      const result = await this.$http.post(`/admin/article/${id}/download`)
      // 消息提示
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      /**
       * 这里是从服务器接收到的文件流（content-type:application/octet-stream）创建blob对象并使用该blob
       * 创建一个指向类型数组的URL，将该url作为a标签的链接目标，然后去触发a标签的点击事件从而文件下载
       */
      var blob = new Blob([result.data], { type: 'application/octet-stream' })
      var contentDisposition = result.headers['content-disposition']
      var patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
      var res = patt.exec(contentDisposition)
      // 设置下载的文件名
      var filename = res[1]
      var downloadElement = document.createElement('a')
      // 创建下载的链接
      var href = window.URL.createObjectURL(blob)
      // var reg = /^["](.*)["]$/g
      downloadElement.style.display = 'none'
      downloadElement.href = href
      // 下载后文件名
      downloadElement.download = decodeURI(filename)
      document.body.appendChild(downloadElement)
      // 点击下载
      downloadElement.click()
      // 下载完成移除元素
      document.body.removeChild(downloadElement)
      // 释放掉blob对象
      window.URL.revokeObjectURL(href)
      this.$message.success(result.message)
    }
  }
}
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
  color: #303133;
}
a:hover {
  color: #409eff;
}
.seach-content {
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.input-wrapper {
  input {
    border: none;
    outline: none;
    background: none;
    font-size: 15px;
    color: #303133;
    width: 240px;
    line-height: 30px;
  }
  button {
    border: none;
    outline: none;
    background: #fff;
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 15px;
  }
  background-color: #f2f6fc;
  padding: 5px 5px 5px 10px;
  border-radius: 20px;
  width: 275px;
}
.el-pagination {
  margin: 20px 0 20px 0;
}
</style>