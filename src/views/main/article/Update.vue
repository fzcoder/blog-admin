<template>
  <el-container>
    <el-header>
      <div class="header">
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/article' }">文章列表</el-breadcrumb-item>
          <el-breadcrumb-item v-if="Switch.isDraft">编辑文章</el-breadcrumb-item>
          <el-breadcrumb-item v-else>修改文章</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 按钮区 -->
        <div class="btn-area">
          <el-button
            type="text"
            size="small"
            round
            icon="el-icon-back"
            @click="preStep()"
            :disabled="!Switch.preStepBtn"
          >
            <span>上一页</span>
          </el-button>
          <el-button
            type="text"
            size="small"
            round
            @click="nextStep()"
            :disabled="!Switch.nextStepBtn"
          >
            <span>
              下一页
              <i class="el-icon-right"></i>
            </span>
          </el-button>
          <el-button type="primary" size="small" round icon="el-icon-edit" @click="update()">
            <span v-if="Switch.isDraft">发布</span>
            <span v-else>修改</span>
          </el-button>
          <el-button v-if="Switch.isDraft" type="success" size="small" round icon="el-icon-edit" @click="save()">
            <span>保存</span>
          </el-button>
          <el-button size="small" round icon="el-icon-refresh" @click="getArticle()">
            <span>还原</span>
          </el-button>
        </div>
      </div>
    </el-header>
    <el-main>
      <Editor v-show="Switch.formShow[0]" v-model="form.contentMd" @change="handleContentChange"></Editor>
      <Form
        v-show="Switch.formShow[1]"
        :form="form"
        :file-list="fileList"
        @upload-img="handleUploadImage"
        @file-remove="handleFileRemove"
      ></Form>
    </el-main>
  </el-container>
</template>

<script>
import Editor from '@/components/main/article/Editor.vue'
import Form from '@/components/main/article/Form.vue'
export default {
  components: {
    Editor,
    Form
  },
  data () {
    return {
      // 表单
      form: {
        // 文章id
        id: '',
        // 文章标题
        title: '',
        // 简介
        introduction: '',
        // 目录id
        categoryId: '',
        // 标签
        tags: [],
        // 封面链接
        cover: '',
        // html格式内容
        contentHtml: '',
        // markdown格式内容
        contentMd: '',
        // 文章状态
        status: ''
      },
      // 标签列表
      tagList: [],
      // 文件列表
      fileList: [],
      // 开关
      Switch: {
        preStepBtn: false,
        nextStepBtn: true,
        submitBtn: false,
        cancelBtn: true,
        formShow: [true, false],
        isDraft: false
      },
      // 步骤
      step: {
        list: ['基本信息', '扩展信息', '索引信息', '推荐信息', '表单核验'],
        active: 0
      }
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    // 处理标签变化事件
    /* handleChangeTag (value) {
      this.form.tags = value
    },
    // 处理标签移除事件
    handleRemoveTag (value) {
      // this.tagList.splice(this.tagList.indexOf(value), 1)
      this.form.tags = value
    }, */
    // 处理文章内容修改
    handleContentChange (value, render) {
      // 更新HTML格式的文章内容
      this.form.contentHtml = render
    },
    // 处理上传封面事件
    handleUploadImage (response) {
      this.form.cover = response.url
    },
    // 处理文件移除事件
    handleFileRemove (file, fileList) {
      this.fileList = []
      this.form.cover = ''
    },
    // 获取文章信息
    async getArticle () {
      const { data: result } = await this.$http.get('/admin/article/form', {
        params: {
          'aid': this.$route.params.id
        }
      })
      if (result.status !== 200) {
        return this.$message.error(result.message)
      }
      // 判断是否为草稿
      if (result.data.status === 0) {
        this.Switch.isDraft = true
      }
      // 判断标签是否为空
      /* if (result.data.tags === '') {
        this.tagList = []
      } else {
        this.tagList = (result.data.tags || '').split(',')
      } */
      // 判断封面链接是否为空
      if (result.data.cover === '') {
        this.fileList = []
      } else {
        var url = result.data.cover
        var file = {
          name: url.substring(url.lastIndexOf('/') + 1),
          response: {
            url: url
          }
        }
        // console.log(file)
        // 先对列表进行清空
        this.fileList = []
        this.fileList.push(file)
      }
      this.form = result.data
    },
    // 修改&发布文章
    async update () {
      // this.form.tags = this.tagList.toString()
      var message = '修改'
      if (this.Switch.isDraft) {
        this.form.status = 1
        message = '发布'
      }
      const { data: result } = await this.$http.put('/admin/article', this.form)
      if (result.status !== 200) {
        return this.$message.error(message + '失败！')
      }
      this.$message.success(message + '成功！')
      this.$router.push('/article')
    },
    // 保存草稿
    async save () {
      // this.form.tags = this.tagList.toString()
      const { data: result } = await this.$http.put('/admin/article', this.form)
      if (result.status !== 200) {
        return this.$message.error('保存失败！')
      }
      this.$message.success('保存成功！')
      this.$router.push('/article/draft')
    },
    // 隐藏所有表单
    hideAll () {
      for (let i = 0; i < this.Switch.formShow.length; i++) {
        this.Switch.formShow[i] = false
      }
    },
    // 上一页
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
    // 下一页
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
</style>
