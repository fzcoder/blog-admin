<template>
  <el-container>
    <el-header>
      <div class="header">
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/admin/article' }">文章列表</el-breadcrumb-item>
          <el-breadcrumb-item>添加文章</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 按钮区 -->
        <div class="btn-area">
          <el-upload
            :action="host"
            :headers="headers"
            :multiple="false"
            :show-file-list="false"
            accept=".md"
            :before-upload="beforeUpload"
            :on-success="handleSuccess"
            v-show="Switch.formShow[0]"
          >
            <el-button type="primary" plain size="small" icon="el-icon-upload2">
              <span>上传</span>
            </el-button>
          </el-upload>
          <el-button
            type="primary"
            size="small"
            round
            icon="el-icon-back"
            @click="preStep()"
            v-show="Switch.preStepBtn"
          >
            <span>上一步</span>
          </el-button>
          <el-button
            type="primary"
            size="small"
            round
            @click="nextStep()"
            v-show="Switch.nextStepBtn"
          >
            <span>
              下一步
              <i class="el-icon-right"></i>
            </span>
          </el-button>
          <el-button
            type="success"
            size="small"
            round
            icon="el-icon-check"
            @click="submit()"
            v-show="Switch.submitBtn"
          >
            <span>提交</span>
          </el-button>
          <el-button
            round
            size="small"
            icon="el-icon-close"
            @click="cancel()"
            v-show="Switch.cancelBtn"
          >
            <span>取消</span>
          </el-button>
        </div>
      </div>
    </el-header>
    <el-main>
      <Editor v-show="Switch.formShow[0]" v-model="form.contentMd" @change="handleContentChange"></Editor>
      <Form
        v-show="Switch.formShow[1]"
        :form="form"
        :tag-list="tagList"
        @add-tag="handleAddTag"
        @remove-tag="handleRemoveTag"
        @upload-img="handleUploadImage"
        @file-remove="handleFileRemove"
      ></Form>
    </el-main>
  </el-container>
</template>

<script>
import Editor from '@/components/admin/article/Editor.vue'
import Form from '@/components/admin/article/Form.vue'
export default {
  components: {
    Editor,
    Form
  },
  data () {
    return {
      // 上传服务器地址
      host: this.$http.defaults.baseURL + '/admin/article/upload',
      // 请求头
      headers: {
        // 文件上传需要用户权限，需携带token令牌
        Authorization: window.sessionStorage.getItem('token')
      },
      // 文章
      form: {
        // 文章标题
        title: '',
        // 作者id
        authorId: window.sessionStorage.getItem('uid'),
        // 简介
        introduction: '',
        // 目录id
        categoryId: '',
        // 标签
        tags: '',
        // 封面链接
        cover: '',
        // html格式内容
        contentHtml: '',
        // markdown格式内容
        contentMd: ''
      },
      // 标签列表
      tagList: [],
      // 开关
      Switch: {
        preStepBtn: false,
        nextStepBtn: true,
        submitBtn: false,
        cancelBtn: true,
        formShow: [true, false]
      },
      // 步骤
      step: {
        list: ['基本信息', '扩展信息', '索引信息', '推荐信息', '表单核验'],
        active: 0
      }
    }
  },
  methods: {
    // 处理添加标签事件
    handleAddTag (value) {
      this.tagList.push(value)
    },
    // 处理删除标签事件
    handleRemoveTag (value) {
      this.tagList.splice(this.tagList.indexOf(value), 1)
    },
    // 处理上传封面事件
    handleUploadImage (response) {
      this.form.cover = response.url
    },
    // 处理文件移除事件
    handleFileRemove (file, fileList) {
      this.form.cover = ''
    },
    // 处理文章内容修改
    handleContentChange (value, render) {
      // 更新HTML格式的文章内容
      this.form.contentHtml = render
    },
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeUpload (file) {},
    // 文件上传成功时的钩子，参数为(response, file, fileList)
    handleSuccess (response, file, fileList) {
      if (response.status !== 200) {
        return this.$message.error(response.message)
      }
      this.$message.success(response.message)
      this.form.contentMd = response.data
    },
    // 提交文章
    async submit () {
      this.form.tags = this.tagList.toString()
      const { data: result } = await this.$http.post(
        '/admin/article',
        this.form
      )
      if (result.status !== 200) {
        return this.$message.error('上传失败！')
      }
      this.$message.success('上传成功！')
      this.$router.push('/admin/article')
    },
    // 取消
    cancel () {
      this.$router.back(-1)
    },
    // 隐藏所有表单
    hideAll () {
      for (let i = 0; i < this.Switch.formShow.length; i++) {
        this.Switch.formShow[i] = false
      }
    },
    // 上一步
    preStep () {
      if (
        this.step.active > 0 &&
        this.step.active < this.Switch.formShow.length
      ) {
        // 当从最后一步跳转到上一步时显示下一步按钮，隐藏提交按钮
        if (this.step.active === this.Switch.formShow.length - 1) {
          this.Switch.nextStepBtn = true
          this.Switch.submitBtn = false
        }
        this.step.active--
        this.hideAll()
        this.Switch.formShow[this.step.active] = true
        // 当退回到第一步时隐藏上一步按钮
        if (this.step.active === 0) {
          this.Switch.preStepBtn = false
        }
      }
    },
    // 下一步
    nextStep () {
      if (this.step.active < this.Switch.formShow.length - 1) {
        // 当从第一步跳转到第二步时显示上一步按钮
        if (this.step.active === 0) {
          this.Switch.preStepBtn = true
        }
        this.step.active++
        this.hideAll()
        this.Switch.formShow[this.step.active] = true
        // 当进行表单核验时隐藏下一步按钮，显示提交按钮
        if (this.step.active === this.Switch.formShow.length - 1) {
          this.Switch.nextStepBtn = false
          this.Switch.submitBtn = true
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-write {
  padding: 20px;
}
.el-container {
  height: 100%;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.el-main {
  height: 100%;
  padding-top: 0px;
  // background-color: snow;
}
.btn-area {
  display: flex;
  align-content: center;
}
</style>
