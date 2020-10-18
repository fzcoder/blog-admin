<template>
  <el-form :model="form">
    <el-form-item label="链接名称" prop="name">
      <el-input placeholder="请输入内容" v-model="form.name" clearable></el-input>
    </el-form-item>
    <el-form-item label="链接地址" prop="linkUrl">
      <el-input placeholder="请输入内容" v-model="form.linkUrl" clearable>
        <template slot="append">
          <el-link :underline="false" :href="form.linkUrl" target="_blank">测试</el-link>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="图标地址" prop="iconUrl">
      <el-input placeholder="请输入内容" v-model="form.iconUrl" clearable>
        <template slot="prepend">
          <el-avatar size="small" :src="form.iconUrl" style="background-color: white;"></el-avatar>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="所属目录" prop="categoryId">
      <!-- 级联选择器 -->
      <el-cascader
        v-model="form.categoryId"
        :options="select.category"
        :props="{ expandTrigger: 'hover', value: 'id', label: 'name', emitPath: false }"
        :show-all-levels="false"
        clearable
        @visible-change="getCategoryList"
      ></el-cascader>
    </el-form-item>
    <el-form-item label="* 快速导航">
      <el-switch v-model="form.shortcut"></el-switch>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      // 选择器
      select: {
        // 目录等级
        category: []
      },
      // 验证表单
      rules: {
        name: [
          { required: true, message: '请输入链接名称！', trigger: 'blur' }
        ],
        linkUrl: [
          { required: true, message: '请输入链接地址！', trigger: 'blur' }
        ],
        iconUrl: [
          { required: true, message: '请输入图标地址！', trigger: 'blur' }
        ],
        categoryId: [
          { required: true, message: '请选择链接所属分类！', trigger: 'change' }
        ]
      }
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
    }
  }
}
</script>

<style>
</style>
