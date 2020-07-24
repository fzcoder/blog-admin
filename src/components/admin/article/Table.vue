<template>
  <div class="article-table">
    <!-- 删除文章对话框 -->
    <el-dialog title="删除文章" :visible.sync="isDeleteDialogVisible" width="30%">
      <!-- 内容主体区域 -->
      <span>确定要删除该文章吗？</span>
      <!-- 底部区域 -->
      <span slot="footer">
        <el-button round @click="isDeleteDialogVisible = false">取消</el-button>
        <el-button round type="primary" @click="deleteArticle(deleteArticleId)">确定</el-button>
      </span>
    </el-dialog>
    <!-- 文章列表区 -->
    <el-table :data="list" stripe>
      <el-table-column type="index" label="#" width="40px"></el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="发布时间" prop="date"></el-table-column>
      <el-table-column label="所属目录" prop="category_name" width="100px"></el-table-column>
      <el-table-column label="所属标签" width="250px">
        <template slot-scope="scope">
          <el-tag
            v-for="(tag, index) in scope.row.tags"
            :key="tag"
            :type="style.tags[index%5]"
            effect="light"
            size="small"
            style="margin: 3px;"
          >{{ tag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="阅读量" prop="view" width="63px"></el-table-column>
      <el-table-column label="点赞数" prop="like" width="63px"></el-table-column>
      <el-table-column label="操作" width="250px">
        <template slot-scope="scope">
          <!-- 查看按钮 -->
          <el-button
            type="success"
            circle
            size="small"
            icon="el-icon-view"
            @click="view(scope.row.id)"
          ></el-button>
          <!-- 修改按钮 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="small "
            @click="modify (scope.row.id) "
          ></el-button>
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="small"
            @click="openDeleteDialog (scope.row.id) "
          ></el-button>
          <!-- 下载按钮 -->
          <el-button
            type="primary"
            icon="el-icon-download"
            round
            size="small"
            style="margin-left: 10px;"
            @click="download (scope.row.id) "
          >下载</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      // 控制确认删除弹出框的显示与隐藏
      isDeleteDialogVisible: false,
      // 要删除的文章id
      deleteArticleId: '',
      // 样式信息
      style: {
        tags: ['success', 'primary', 'warning', 'danger', 'info']
      }
    }
  },
  methods: {
    // 添加文章
    addArticle () {
      this.$router.push(`/admin/article/write`)
    },
    // 阅读文章
    view (id) {
      // 在新窗口打开
      window.open(`http://www.frankfang.cn/article/${id}`, '_blank')
    },
    // 修改文章
    modify (id) {
      this.$router.push(`/admin/article/update/${id}`)
    },
    // 下载文章
    async download (id) {
      // axios 响应拦截器
      await this.$http.interceptors.response.use(
        response => {
          // console.log(response)
          return response
        },
        error => {
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
      this.$emit('change')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
