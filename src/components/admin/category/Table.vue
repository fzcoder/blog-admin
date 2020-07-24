<template>
  <div class="category-table">
    <!-- 修改目录对话框 -->
    <Update
      :visible.sync="isUpdateDialogVisible"
      :datasource="form.update"
      @cancel="handleCancel"
      @success="handleSuccess"
      @error="handleError"
      @warn="handleWarn"
    ></Update>
    <!-- 删除目录对话框 -->
    <Delete
      :visible.sync="isDeleteDialogVisible"
      :id="deleteCategoryId"
      @cancel="handleCancel"
      @success="handleSuccess"
    ></Delete>
    <!-- 列表区 -->
    <el-table :data="list" stripe>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="类型" prop="type"></el-table-column>
      <el-table-column label="等级">
        <template slot-scope="scope">{{ style.level[scope.row.level] }}</template>
      </el-table-column>
      <el-table-column label="上一级菜单" prop="parent_name"></el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            round
            size="small"
            @click="openUpdateDialog(scope.row)"
          >修改</el-button>
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            round
            size="small"
            @click="openDeleteDialog(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Update from '@/views/admin/category/Update.vue'
import Delete from '@/views/admin/category/Delete.vue'
export default {
  name: 'CategoryList',
  components: {
    Update,
    Delete
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
      form: {
        // 修改表单
        update: {
          // id
          id: '',
          // 名称
          name: '',
          // 等级
          level: '',
          // 上级目录id
          parentId: '',
          // 类型
          type: '',
          // 描述
          description: '',
          // 图标链接
          icon: ''
        }
      },
      deleteCategoryId: 0,
      // 控制添加目录对话框的显示与隐藏
      isAddDialogVisible: false,
      // 控制添加目录对话框的显示与隐藏
      isUpdateDialogVisible: false,
      // 控制添加目录对话框的显示与隐藏
      isDeleteDialogVisible: false,
      // 样式
      style: {
        // 等级
        level: ['一级目录', '二级目录']
      }
    }
  },
  methods: {
    // 处理成功事件
    handleSuccess (message, name) {
      if (name === 'add') {
        this.isAddDialogVisible = false
      }
      if (name === 'update') {
        this.isUpdateDialogVisible = false
      }
      if (name === 'delete') {
        this.isDeleteDialogVisible = false
      }
      // this.getCategoryList()
      this.$message.success(message)
    },
    // 处理错误事件
    handleError (message, name) {
      this.$message.error(message)
    },
    // 处理警告事件
    handleWarn (message, name) {
      this.$message.warning(message)
    },
    // 处理取消事件
    handleCancel (name) {
      if (name === 'add') {
        this.isAddDialogVisible = false
      }
      if (name === 'update') {
        this.isUpdateDialogVisible = false
      }
      if (name === 'delete') {
        this.isDeleteDialogVisible = false
      }
    },
    // 打开修改标签对话框
    openUpdateDialog (category) {
      /* if (category.level > 0) {
        this.getParentCategory(category.level - 1, category.type)
      } */
      this.form.update.id = category.id
      this.form.update.name = category.name
      this.form.update.level = category.level
      this.form.update.type = category.type
      this.form.update.parentId = category.parent_id
      this.form.update.description = category.description
      this.form.update.icon = category.icon
      this.isUpdateDialogVisible = true
    },
    // 打开删除标签对话框
    openDeleteDialog (id) {
      this.deleteCategoryId = id
      this.isDeleteDialogVisible = true
    }
  }
}
</script>

<style>
</style>
