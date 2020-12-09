<template>
  <!-- 添加目录对话框 -->
  <el-dialog title="添加目录" :visible.sync="visible_" width="30%" :show-close="false">
    <!-- 内容主体区域 -->
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item label="目录名称" prop="name">
        <el-input v-model="form.name" clearable></el-input>
      </el-form-item>
      <!--
      <el-form-item label="目录类型" prop="type">
        <el-select placeholder="请选择" v-model="form.type" clearable>
          <el-option v-for="item in select.type" :key="item.value" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      -->
      <el-form-item v-if="form.type === 'article'" label="目录等级" prop="level">
        <el-select placeholder="请选择" v-model="form.level" clearable>
          <el-option v-for="item in select.level" :key="item.value" :value="item.value" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.level === 1 && form.type !== ''" label="上级目录">
        <el-select placeholder="请选择" v-model="form.parentId" clearable @visible-change="getParentCategory(form.level, '文章')">
          <el-option v-for="item in select.parent" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="目录描述" prop="description">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="封面图片" prop="icon">
        <el-input v-model="form.icon"></el-input>
      </el-form-item>
    </el-form>
    <!-- 底部区域 -->
    <span slot="footer">
      <el-button size="small" round icon="el-icon-close" @click="cancel('formRef')">取消</el-button>
      <el-button size="small" round icon="el-icon-check" type="primary" @click="add()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'CategoryAdd',
  model: {
    prop: 'visible',
    event: 'changevisible'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    // 此时如果操作赋权，将会改变绑定的visible属性，引起报错。子组件中更改绑定的prop值最好使用计算属性computed解决。
    visible_: {
      get () {
        return this.visible
      },
      set (val) {
        this.$emit('changevisible', val)
      }
    }
  },
  data () {
    return {
      // 表单
      form: {
        // 名称
        name: '',
        // 等级
        level: '',
        // 上一级目录id
        parentId: '',
        // 类型
        type: this.type,
        // 描述
        description: '',
        // 图标链接
        icon: ''
      },
      // 验证规则
      rules: {
        name: [
          { required: true, message: '请输入目录名称！', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请输入目录层级！', trigger: 'change' }
        ],
        description: [
          { required: false, message: '请输入目录描述！', trigger: 'blur' }
        ],
        icon: [
          { required: false, message: '请输入目录图标！', trigger: 'blur' }
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
        parent: []
      }
    }
  },
  methods: {
    // 获取上一级菜单
    async getParentCategory (level, type) {
      const { data: result } = await this.$http.get('/category/menu', { params: { level: level - 1, type: type } })
      if (result.status !== 200) {
        return this.$emit(result.message)
      }
      this.select.parent = result.data
    },
    // 添加目录
    async add () {
      if (this.form.level === 0) {
        this.form.parentId = 0
      }
      this.$refs.formRef.validate(async valid => {
        if (valid) {
          if (this.type === 'article') {
            this.form.type = '文章'
          } else if (this.type === 'link') {
            this.form.level = 0
            this.form.type = '链接'
            this.form.parentId = 0
          } else {
            return this.$message.error('目录类型错误')
          }
          const { data: result } = await this.$http.post('/admin/category', this.form)
          if (result.status !== 200) {
            this.$refs['formRef'].resetFields()
            return this.$message.error(result.message)
          }
          this.$refs['formRef'].resetFields()
          this.clear()
          this.$emit('submit')
        } else {
          this.$message.warning('请正确填写表单信息!')
        }
      })
    },
    // 取消添加
    cancel (refName) {
      this.$refs[refName].resetFields()
      this.clear()
      this.$emit('cancel')
    },
    // 清空
    clear () {
      this.form.parentId = ''
      this.form.description = ''
      this.form.icon = ''
    }
  }
}
</script>

<style>
</style>
