<template>
  <div class="link-table">
    <!-- 修改标签对话框 -->
    <UpdateDialog
      :visible.sync="Switch.isUpdateDialogVisible"
      :form="form"
      @update="handleUpdateEvent"
      @cancel="handleUpdateEvent"
    ></UpdateDialog>
    <!-- 删除标签对话框 -->
    <DeleteDialog
      :visible.sync="Switch.isDeleteDialogVisible"
      :id="deleteLinkId"
      @remove="handleDeleteEvent"
      @cancel="Switch.isDeleteDialogVisible = !Switch.isDeleteDialogVisible"
    ></DeleteDialog>
    <!-- 表格区 -->
    <el-table :data="list" stripe>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column label="名称" prop="name" width="120px"></el-table-column>
      <el-table-column label="链接地址" prop="linkUrl">
        <template slot-scope="scope">
          <el-link :underline="false" :href="scope.row.linkUrl">{{ scope.row.linkUrl }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="图标地址" prop="iconUrl">
        <template slot-scope="scope">
          <div style="display: flex; align-items: center;">
            <el-avatar
              size="small"
              :src="scope.row.iconUrl"
              style="background-color: white; margin-right: 5px;"
            ></el-avatar>
            <span>{{ scope.row.iconUrl }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="所属目录" width="120px">
        <template slot-scope="scope">
          <!-- 级联选择器 -->
          <el-cascader
            v-model="scope.row.category_id"
            :options="select.category"
            :props="{ expandTrigger: 'hover', value: 'id', label: 'name', emitPath: false }"
            :show-all-levels="false"
            @visible-change="getCategoryList"
            @change="changeCategory(scope.row)"
          ></el-cascader>
        </template>
      </el-table-column>
      <el-table-column label="快速链接" prop="visible" width="80px">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.shortcut" @change="changeVisible(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100px">
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-button
            type="warning"
            icon="el-icon-edit"
            circle
            size="small "
            @click="openUpdateDialog(scope.row) "
          ></el-button>
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="small"
            @click="openDeleteDialog(scope.row.id) "
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import UpdateDialog from '@/views/admin/link/Update.vue'
import DeleteDialog from '@/views/admin/link/Delete.vue'
export default {
  name: 'LinkTable',
  components: {
    UpdateDialog,
    DeleteDialog
  },
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
      // 表单
      form: {},
      // 选择器
      select: {
        // 目录等级
        category: []
      },
      Switch: {
        // 控制修改对话框
        isUpdateDialogVisible: false,
        // 控制删除对话框
        isDeleteDialogVisible: false
      },
      // 删除链接id
      deleteLinkId: 0
    }
  },
  created () {
    this.getCategoryList()
  },
  methods: {
    // 获取目录列表
    async getCategoryList () {
      const { data: result } = await this.$http.get('/category/menu', {
        params: { type: '链接' }
      })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.select.category = result.data
    },
    // 设置链接为快速链接
    async changeVisible (link) {
      const { data: result } = await this.$http.put(
        `/admin/link/${link.id}`,
        null,
        { params: { shortcut: link.shortcut } }
      )
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success(result.message)
      this.$emit('change')
    },
    // 修改链接分类
    async changeCategory (link) {
      const { data: result } = await this.$http.put(
        `/admin/link/${link.id}`,
        null,
        { params: { category_id: link.category_id } }
      )
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success(result.message)
      this.$emit('change')
    },
    // 打开修改链接对话框
    openUpdateDialog (link) {
      this.form = link
      this.Switch.isUpdateDialogVisible = true
    },
    // 处理更新成功事件
    handleUpdateEvent () {
      this.Switch.isUpdateDialogVisible = false
      this.$emit('change')
    },
    // 打开删除链接对话框
    openDeleteDialog (id) {
      this.Switch.isDeleteDialogVisible = true
      this.deleteLinkId = id
    },
    // 处理删除成功事件
    handleDeleteEvent () {
      this.Switch.isDeleteDialogVisible = false
      this.$emit('change')
    }
  }
}
</script>

<style>
</style>
