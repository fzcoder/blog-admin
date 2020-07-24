<template>
  <el-dialog title="删除链接" :visible.sync="_visible" width="30%" :show-close="false">
    <!-- 内容主体区域 -->
    <span>确定删除该链接？</span>
    <!-- 底部区域 -->
    <span slot="footer">
      <el-button size="small" icon="el-icon-close" round @click="cancel">取消</el-button>
      <el-button size="small" icon="el-icon-check" round type="primary" @click="remove">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'LinkDeleteDialog',
  model: {
    prop: 'visible',
    event: 'changevisible'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    }
  },
  computed: {
    _visible: {
      get () {
        return this.visible
      },
      set (val) {
        this.$emit('changevisible', val)
      }
    }
  },
  methods: {
    // 删除标签
    async remove () {
      const { data: result } = await this.$http.delete('/admin/category/' + this.id)
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success(result.message)
      this.$emit('remove')
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
