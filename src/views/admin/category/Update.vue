<template>
  <el-dialog title="修改目录" :visible.sync="visible_" width="30%" :show-close="false">
    <!-- 内容主体区域 -->
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item label="目录名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item v-if="form.level !== 0" label="上级目录" prop="parentId">
        <el-select placeholder="请选择" v-model="form.parentId" @visible-change="getParentCategory(form.level, form.type)">
          <el-option v-for="item in select.parent" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="图标链接" prop="icon">
        <el-input v-model="form.icon"></el-input>
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <span slot="footer">
      <el-button size="small" round icon="el-icon-close" @click="cancel('formRef')">取消</el-button>
      <el-button size="small" round icon="el-icon-check" type="primary" @click="update">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'CategoryUpdate',
  model: {
    prop: 'visible',
    event: 'changevisible'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    datasource: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      // 修改表单
      form: {
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
      },
      // 添加表单的验证规则
      rules: {
        name: [
          { required: true, message: '请输入目录名称！', trigger: 'blur' }
        ]
      },
      // 选择器
      select: {
        // 目录等级
        level: [
          { value: 0, label: '一级目录' },
          { value: 1, label: '二级目录' }
        ],
        // 上一级菜单
        parent: [],
        // 目录类型
        type: [
          { value: '文章', label: '文章' },
          { value: '链接', label: '链接' }
        ]
      }
    }
  },
  created () {
    this.form = this.datasource
  },
  computed: {
    visible_: {
      get () {
        return this.visible
      },
      set (val) {
        this.$emit('changevisible', val)
      }
    }
  },
  methods: {
    // 获取上一级菜单
    async getParentCategory (level, type) {
      const { data: result } = await this.$http.get('/category/menu', { params: { level: level - 1, type: type } })
      if (result.status !== 200) {
        return this.$emit('error', result.message, 'update')
      }
      this.select.parent = result.data
    },
    // 修改目录
    async update () {
      this.$refs.formRef.validate(async valid => {
        if (valid) {
          const { data: result } = await this.$http.put('/admin/category', this.form)
          if (result.status !== 200) {
            return this.$emit('error', result.message, 'update')
          }
          this.$emit('success', result.message, 'update')
        } else {
          this.$emit('warn', '请正确填写表单信息！', 'update')
        }
      })
    },
    // 取消修改标签
    cancel (refName) {
      this.$refs[refName].resetFields()
      this.$emit('cancel', 'update')
    }
  }
}
</script>

<style>
</style>
