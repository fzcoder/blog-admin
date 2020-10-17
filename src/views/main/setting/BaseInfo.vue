<template>
  <div class="base-setting">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/setting' }">网站设置</el-breadcrumb-item>
      <el-breadcrumb-item>网站信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="websiteInfoForm" :rules="websiteInfoFormRules" ref="websiteInfoFormRef">
      <el-form-item label="网站名称" prop="brand">
        <el-input type="text" v-model="websiteInfoForm.brand" clearable></el-input>
      </el-form-item>
      <el-form-item label="版权信息" prop="copyright">
        <el-input type="text" v-model="websiteInfoForm.copyright" clearable></el-input>
      </el-form-item>
      <el-form-item label="备案信息" prop="beian">
        <el-input type="text" v-model="websiteInfoForm.beianInfo" clearable></el-input>
      </el-form-item>
      <el-form-item label="声明信息" prop="statement">
        <el-input type="textarea" v-model="websiteInfoForm.statement"></el-input>
      </el-form-item>
      <div class="button-area">
        <el-button type="primary" size="small" round icon="el-icon-check" @click="updateInfo()">更新</el-button>
        <el-button type="success" size="small" round icon="el-icon-refresh" @click="cancelInfo()">还原</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Setting',
  data () {
    return {
      // 网站信息表单
      websiteInfoForm: {
        brand: '',
        copyright: '',
        beianInfo: '皖ICP备',
        statement: ''
      },
      // 验证规则
      websiteInfoFormRules: {
        brand: [
          { required: true, message: '请输入网站名称！', trigger: 'blur' }
        ],
        copyright: [
          { required: true, message: '请输入版权信息！', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getWebsiteInfo()
  },
  methods: {
    // 获取网站配置
    async getWebsiteInfo () {
      const { data: result } = await this.$http.get('/setting')
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.websiteInfoForm = result.data
    },
    // 修改配置
    updateInfo () {
      this.$refs.websiteInfoFormRef.validate(async valid => {
        if (valid) {
          const { data: result } = await this.$http.put('/admin/setting', this.websiteInfoForm)
          if (result.status !== 200) {
            return this.$message.error(result.message)
          }
          this.$message.success(result.message)
          this.getWebsiteInfo()
        }
      })
    },
    // 取消修改配置
    cancelInfo () {
      this.getWebsiteInfo()
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
.button-area {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
