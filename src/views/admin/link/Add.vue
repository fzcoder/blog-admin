<template>
  <!-- 添加链接对话框 -->
  <el-dialog title="添加链接" :visible.sync="_visible" width="30%" :show-close="false">
    <!-- 内容主体区域 -->
    <LinkForm :form="form"></LinkForm>
    <!-- 底部区域 -->
    <span slot="footer">
      <el-button size="small" round icon="el-icon-close" @click="cancel()">取消</el-button>
      <el-button size="small" round icon="el-icon-check" type="primary" @click="submit()">添加</el-button>
    </span>
  </el-dialog>
</template>

<script>
import LinkForm from '@/components/admin/link/Form.vue'
export default {
  name: 'Form',
  components: {
    LinkForm
  },
  model: {
    prop: 'visible',
    event: 'changeVisible'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    _visible: {
      get () {
        return this.visible
      },
      set (val) {
        this.$emit('changeVisible', val)
      }
    }
  },
  data () {
    return {
      // 添加表单
      form: {
        name: '',
        linkUrl: '',
        iconUrl: '',
        shortcut: false,
        categoryId: ''
      }
    }
  },
  methods: {
    // 提交表单
    async submit () {
      const { data: result } = await this.$http.post('/admin/link', this.form)
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success(result.message)
      this.$emit('submit')
    },
    // 取消
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style>
</style>
