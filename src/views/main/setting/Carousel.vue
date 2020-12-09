<template>
  <div class="setting-carousel">
    <!-- 添加 -->
    <el-dialog title="添加" :visible.sync="Switch.isAdd" width="30%">
      <el-form :data="addForm">
        <el-form-item label="封面">
          <el-input v-model="addForm.cover"></el-input>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="addForm.url"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="add" type="primary">添加</el-button>
        <el-button @click="cancelAdd">取消</el-button>
      </span>
    </el-dialog>
    <!-- 更新 -->
    <el-dialog title="更新" :visible.sync="Switch.isUpdate" width="30%">
      <el-form :data="updateForm">
        <el-form-item label="封面">
          <el-input v-model="updateForm.cover"></el-input>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="updateForm.url"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="updateForm.title"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="update" type="primary">更新</el-button>
        <el-button @click="cancelUpdate">取消</el-button>
      </span>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog title="删除" :visible.sync="Switch.isDelete" width="30%">
      <span>确定要删除吗？</span>
      <span slot="footer">
        <el-button @click="cancelDelete">取消</el-button>
        <el-button @click="remove" type="primary">确定</el-button>
      </span>
    </el-dialog>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/setting' }">网站设置</el-breadcrumb-item>
      <el-breadcrumb-item>走马灯</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="setting-carousel-content">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="Switch.isAdd = true">添加</el-button>
      <el-table :data="carousel.list" stripe>
        <el-table-column type="index" label="#" width="40px"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover" fit="contain" :previewSrcList="carousel.srcList"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="链接地址">
          <template slot-scope="scope">
            <el-link :underline="false" :href="scope.row.url" target="_blank">{{ scope.row.url }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="操作" width="250px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              round
              size="small "
              @click="openUpdateDialog(scope.row.id) "
            >修改</el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              round
              size="small"
              @click="openDeleteDialog(scope.row.id) "
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 走马灯
      carousel: {
        // 列表
        list: [],
        // 图片列表
        srcList: [],
        // 删除id
        deleteId: ''
      },
      // 添加表单
      addForm: {
        cover: '',
        url: '',
        title: ''
      },
      // 更新表单
      updateForm: {
        id: '',
        cover: '',
        url: '',
        title: ''
      },
      Switch: {
        isAdd: false,
        isUpdate: false,
        isDelete: false
      }
    }
  },
  created () {
    this.getCarouselList()
  },
  methods: {
    // 获取列表
    getCarouselList () {
      this.$http.get('/carousel').then(res => {
        const result = res.data
        this.carousel.list = result.data
        for (var i = 0; i < this.carousel.list.length; i++) {
          this.carousel.srcList.push(this.carousel.list[i].cover)
        }
      })
    },
    // 打开更新对话框
    openUpdateDialog (id) {
      this.$http.get(`/admin/setting/carousel/${id}`).then(res => {
        this.updateForm = res.data.data
        this.Switch.isUpdate = true
      })
    },
    // 打开删除对话框
    openDeleteDialog (id) {
      this.carousel.deleteId = id
      this.Switch.isDelete = true
    },
    // 取消添加
    cancelAdd () {
      this.addForm.cover = ''
      this.addForm.url = ''
      this.addForm.title = ''
      this.Switch.isAdd = false
    },
    // 取消更新
    cancelUpdate () {
      this.Switch.isUpdate = false
    },
    // 取消删除
    cancelDelete () {
      this.Switch.isDelete = false
    },
    // 添加
    async add () {
      const { data: result } = await this.$http.post('/admin/setting/carousel', this.addForm)
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success(result.message)
      this.getCarouselList()
    },
    // 更新
    async update () {
      const { data: result } = await this.$http.put('/admin/setting/carousel', this.updateForm)
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success(result.message)
      this.getCarouselList()
    },
    // 删除
    async remove () {
      const { data: result } = await this.$http.delete(`/admin/setting/corousel/${this.carousel.deleteId}`)
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success(result.message)
      this.getCarouselList()
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
</style>
