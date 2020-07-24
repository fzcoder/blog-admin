<template>
  <el-dialog title="删除目录" :visible.sync="visible_" width="30%" :show-close="false">
    <!-- 内容主体区域 -->
    <span>确定删除该目录？</span>
    <!-- 底部区域 -->
    <span slot="footer">
      <el-button size="small" round icon="el-icon-close" @click="cancel">取消</el-button>
      <el-button size="small" round icon="el-icon-check" type="primary" @click="delete_">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'CategoryDelete',
  model: {
    prop: 'visible',
    event: 'changevisible'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: Number
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
    // 删除标签
    async delete_ () {
      const { data: result } = await this.$http.delete('/admin/category/' + this.id)
      if (result.status !== 200) {
        return this.$emit('error', result.message, 'delete')
      }
      this.$emit('success', result.message, 'delete')
    },
    cancel () {
      this.$emit('cancel', 'delete')
    }
  }
}
</script>

<style>
</style>
