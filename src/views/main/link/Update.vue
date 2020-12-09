<template>
  <!-- 修改链接对话框 -->
  <el-dialog title="修改链接" :visible.sync="_visible" width="30%" :show-close="false">
    <!-- 内容主体区域 -->
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
    </el-form>
    <!-- 底部区域 -->
    <span slot="footer">
      <el-button size="small" round icon="el-icon-close" @click="cancel()">取消</el-button>
      <el-button size="small" round icon="el-icon-check" type="primary" @click="update()">添加</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'Form',
  model: {
    prop: 'visible',
    event: 'changeVisible'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      default: () => ({})
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
    return {}
  },
  methods: {
    // 提交表单
    async update () {
      const { data: result } = await this.$http.put(
        '/admin/link',
        this.form
      )
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success(result.message)
      this.$emit('update')
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
