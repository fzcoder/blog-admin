<template>
  <div class="link-list-container">
    <!-- 链接添加对话框 -->
    <link-add
      :visible.sync="Switch.isLinkAddDialogVisible"
      @submit="handleSubmit()"
      @cancel="Switch.isLinkAddDialogVisible = !Switch.isLinkAddDialogVisible"
    ></link-add>
    <!-- 搜索区 -->
    <search v-model="query.body.key" @search="getList()" @add="handleAdd()"></search>
    <link-table :list="list" @change="getList()"></link-table>
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
import Table from '@/components/main/link/Table.vue'
import LinkAdd from '@/views/main/link/Add.vue'
import Search from '@/components/admin/common/Search.vue'
export default {
  components: {
    'link-table': Table,
    'link-add': LinkAdd,
    'search': Search
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
        url: '/link',
        // 路径参数
        params: {},
        // 请求参数
        body: {
          key: '',
          pageNum: 1,
          pageSize: 10,
          orderBy: ['id'],
          reverse: true
        }
      },
      Switch: {
        isLinkAddDialogVisible: false
      }
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
    // 处理路径值更新
    handleQueryUpdate () {
      this.query.params.category_id = this.$route.query.category_id
      this.getList()
    },
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
      this.Switch.isLinkAddDialogVisible = true
    },
    // 获取列表
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
    },
    // 处理提交成功事件
    handleSubmit () {
      // 关闭 Dialog
      this.Switch.isLinkAddDialogVisible = !this.Switch.isLinkAddDialogVisible
      // 消息提示
      this.$message.success('链接添加成功！')
      // 重新获取列表
      this.getList()
    }
  }
}
</script>

<style>

</style>
