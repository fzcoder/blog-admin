<template>
  <el-form :model="form" ref="infoFormRef">
    <el-form-item label="标题" prop="title">
      <el-input placeholder="请输入文章标题" type="text" clearable v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="所属目录" prop="categoryId">
      <!-- 级联选择器 -->
      <el-cascader
        v-model="form.categoryId"
        :options="select.category"
        :props="{ expandTrigger: 'hover', value: 'id', label: 'name', emitPath: false }"
        :show-all-levels="false"
        clearable
        @visible-change="getCategoryList()"
      ></el-cascader>
      <el-button
        type="primary"
        icon="el-icon-plus"
        style="margin-left: 10px;"
        @click="createCategory()"
      >新建</el-button>
    </el-form-item>
    <el-form-item label="文章标签">
      <el-tag
        v-for="tag in tagList"
        :key="tag"
        :disable-transitions="true"
        closable
        @close="handleTagClose(tag)"
      >{{ tag }}</el-tag>
      <el-input
        class="input-new-tag"
        size="small"
        v-if="Switch.inputVisible"
        v-model="temp.inputValue"
        ref="saveTagInput"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      ></el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </el-form-item>
    <el-form-item label="封面">
      <!-- 上传组件 -->
      <Upload drag show-file-list :file-list="fileList" @success="handleUploadSuccess" @remove="handleFileRemove">
        <!-- 当已选择图片或处于修改模式时展示图片内容 -->
        <el-image v-if="form.cover" :src="form.cover" fit="contain"></el-image>
        <!-- 当没有选择图片展示此部分内容 -->
        <div v-else class="upload-nofile">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </div>
        <div class="el-upload__tip" slot="tip" v-if="true">只能上传jpg/png文件，且不超过3MB</div>
      </Upload>
    </el-form-item>
    <el-form-item label="简介" prop="introduction">
      <el-input placeholder="请输入文章简介" type="textarea" v-model="form.introduction" :rows="3"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import Upload from '@/components/admin/common/Upload.vue'
export default {
  name: 'Form',
  components: {
    Upload
  },
  props: {
    // 表单
    form: {
      type: Object,
      default: () => ({})
    },
    // 标签列表
    'tag-list': {
      type: Array,
      default: () => {
        return []
      }
    },
    // 上传的文件列表
    'file-list': {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  created () {
    this.getCategoryList()
  },
  data () {
    return {
      // 校验规则
      rules: {
        // 验证是否输入标题
        title: [
          { required: true, message: '请输入文章标题！', trigger: 'blur' },
          {
            min: 1,
            max: 32,
            message: '长度不能超过 32 个字符',
            trigger: 'blur'
          }
        ],
        // 验证简介是否合法
        introduction: [
          {
            required: true,
            message: '请输入文章简介（不超过 64 个字符）！',
            trigger: 'blur'
          },
          {
            min: 0,
            max: 64,
            message: '长度不能超过 64 个字符',
            trigger: 'blur'
          }
        ],
        // 验证是否选择目录
        categoryId: [
          { required: true, message: '请选择文章所属目录', trigger: 'change' }
        ],
        // 验证是否输入标签
        tags: [
          {
            type: 'array',
            required: false,
            message: '请至少输入一个标签',
            trigger: 'change'
          }
        ]
      },
      // 选择器
      select: {
        // 目录
        category: []
      },
      // 开关
      Switch: {
        inputVisible: false,
        // 预览封面
        previewCover: false
      },
      // 暂存
      temp: {
        // 当前的标签列表
        tags: [],
        // 新建标签的输入值
        inputValue: ''
      }
    }
  },
  methods: {
    // 标签清除事件
    handleTagClose (tag) {
      this.$emit('remove-tag', tag)
    },
    // 打开标签输入框
    showInput () {
      this.Switch.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 添加新标签
    handleInputConfirm () {
      let inputValue = this.temp.inputValue
      if (inputValue) {
        this.$emit('add-tag', inputValue)
      }
      this.Switch.inputVisible = false
      this.temp.inputValue = ''
    },
    // 处理图片上传成功事件
    handleUploadSuccess (response) {
      this.$message.success('上传成功!')
      this.$emit('upload-img', response)
    },
    // 处理文件移除事件
    handleFileRemove (file, fileList) {
      this.$emit('file-remove', file, fileList)
    },
    // 获取目录列表
    async getCategoryList () {
      const { data: result } = await this.$http.get('/category/menu', {
        params: { type: '文章' }
      })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      this.select.category = result.data
    },
    // 创建目录
    createCategory () {
      this.$router.push('/admin/category')
    }
  }
}
</script>

<style lang="less" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
