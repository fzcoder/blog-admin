<template>
  <div class="category-list-container">
    <!-- 添加目录对话框 -->
    <category-add
      :visible.sync="Switch.isAddDialogVisible"
      type="article"
      @submit="handleSubmit"
      @cancel="Switch.isAddDialogVisible = !Switch.isAddDialogVisible"
    ></category-add>
    <!-- 修改目录对话框 -->
    <category-update
      :visible.sync="Switch.isUpdateDialogVisible"
      :id="updateCategoryId"
      @update="handleUpdate"
      @cancel="Switch.isUpdateDialogVisible = !Switch.isUpdateDialogVisible"
    ></category-update>
    <!-- 删除目录对话框 -->
    <category-delete
      :visible.sync="Switch.isDeleteDialogVisible"
      :id="deleteCategoryId"
      @remove="handleRemove"
      @cancel="Switch.isDeleteDialogVisible = !Switch.isDeleteDialogVisible"
    ></category-delete>
    <!-- 主体区域 -->
    <a class="category-item-link" href="/#/article">
      <div class="category-item-content">
        <div class="category-item-info">
          <i class="el-icon-document"></i>
          <span>所有文章</span>
        </div>
      </div>
    </a>
    <a class="category-item-link" href="/#/article?category_id=default">
      <div class="category-item-content">
        <div class="category-item-info">
          <i class="el-icon-folder"></i>
          <span>默认分区</span>
        </div>
      </div>
    </a>
    <button class="category-item-create-btn" @click="create">
      <i class="el-icon-circle-plus-outline"></i>
      <span>新建目录</span>
    </button>
    <div v-for="item in list" :key="item.id" >
      <div class="category-item-divider">
        <div class="category-item-info">
          <i class="el-icon-s-unfold"></i>
          <span>{{ item.name }}</span>
        </div>
        <div class="category-item-btngroup">
          <button class="item-btn-op" @click="update(item.id)">
            <i class="el-icon-edit"></i>
            <span>编辑</span>
          </button>
          <button class="item-btn-op" @click="remove(item.id)">
            <i class="el-icon-delete"></i>
            <span>删除</span>
          </button>
        </div>
      </div>
      <a
        v-for="i in item.children"
        :key="i.id"
        :href="'/#/article?category_id=' + i.id"
        class="category-item-link"
      >
        <div class="category-item-content">
          <div class="category-item-info">
            <i class="el-icon-folder"></i>
            <span>{{ i.name }}</span>
          </div>
          <div class="category-item-btngroup-2">
            <el-dropdown size="small" :show-timeout="0" :hide-timeout="150" @command="handleCommand">
              <i class="el-icon-edit-outline"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-edit" :command="'edit,' + i.id">编辑</el-dropdown-item>
                <el-dropdown-item icon="el-icon-delete" :command="'delete,' + i.id">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import CategoryAdd from '@/views/main/category/Add.vue'
import CategoryUpdate from '@/views/main/category/Update.vue'
import CategoryDelete from '@/views/main/category/Delete.vue'
export default {
  name: 'category-list',
  components: {
    'category-add': CategoryAdd,
    'category-update': CategoryUpdate,
    'category-delete': CategoryDelete
  },
  data () {
    return {
      // 目录列表
      list: [],
      // 开关
      Switch: {
        // 是否显示添加目录对话框
        isAddDialogVisible: false,
        // 是否显示添加目录对话框
        isUpdateDialogVisible: false,
        // 是否显示添加目录对话框
        isDeleteDialogVisible: false
      },
      updateCategoryId: '',
      deleteCategoryId: ''
    }
  },
  created () {
    this.getCategory()
  },
  methods: {
    // 获取文章列表
    async getCategory () {
      const { data: result } = await this.$http.get('/category/menu', {
        params: {
          type: '文章'
        }
      })
      this.list = result.data
    },
    // 创建目录
    create () {
      this.Switch.isAddDialogVisible = true
    },
    // 打开修改标签对话框
    update (id) {
      this.updateCategoryId = id
      this.Switch.isUpdateDialogVisible = true
    },
    // 打开删除标签对话框
    remove (id) {
      this.deleteCategoryId = id
      this.Switch.isDeleteDialogVisible = true
    },
    // 处理更多操作事件
    handleCommand (command) {
      var arr = command.split(',')
      if (arr[0] === 'edit') {
        return this.update(arr[1])
      }
      if (arr[0] === 'delete') {
        return this.remove(arr[1])
      }
    },
    // 处理添加事件
    handleSubmit () {
      this.Switch.isAddDialogVisible = false
      this.getCategory()
    },
    // 处理修改事件
    handleUpdate () {
      this.Switch.isUpdateDialogVisible = false
      this.getCategory()
    },
    // 处理删除事件
    handleRemove () {
      this.Switch.isDeleteDialogVisible = false
      this.getCategory()
    }
  }
}
</script>

<style lang="less" scoped>
.category-list-container {
  height: inherit;
  overflow:auto;
}
.category-item-link {
  text-decoration: none;
  color: #303133;
}
.category-item-link:hover {
  color: #409EFF;
}
.category-item-content {
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.category-item-content:hover {
  background-color: #F2F6FC;
}
.category-item-divider {
  padding: 8px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.category-item-divider:hover {
  .category-item-btngroup {
    display: inline-block;
  }
}
.category-item-info {
  span {
    margin-left: 5px;
  }
}
.category-item-btngroup {
  display: none;
  .item-btn-op {
    border: none;
    outline: none;
    margin: 0px 5px 0px 5px;
    padding: 0px;
    color: #303133;
    background-color: #FFFFFF;
  }
  .item-btn-op:hover {
    cursor: pointer;
    color: #409EFF;
  }
}
.category-item-create-btn {
  border: none;
  width: 100%;
  background-color: #FFFFFF;
  outline: none;
  text-align: left;
  padding: 8px;
  font-size: medium;
  span {
    margin-left: 5px;
  }
}
.category-item-create-btn:hover {
  cursor: pointer;
  background-color: #F2F6FC;
  color: #409EFF;
}
</style>
