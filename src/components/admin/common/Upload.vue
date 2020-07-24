<template>
  <el-upload
    :drag="drag"
    :action="host"
    :data="form"
    :multiple="multiple"
    :accept="accept"
    :limit="limit"
    :show-file-list="showFileList"
    :list-type="listType"
    :file-list="fileList"
    :auto-upload="true"
    :before-upload="beforeUpload"
    :on-success="handleSuccess"
    :on-remove="handleFileRemove"
  >
    <!-- 内容插槽 -->
    <slot></slot>
    <template v-slot:trigger>
      <!-- 触发文件选择框的内容 -->
      <slot name="trigger"></slot>
    </template>
    <template v-slot:tip>
      <!-- 提示说明文字 -->
      <slot name="tip"></slot>
    </template>
  </el-upload>
</template>

<script>
export default {
  name: 'Upload',
  props: {
    // 是否支持拖拽上传
    drag: {
      type: Boolean,
      default: false
    },
    // 是否支持多选文件
    multiple: {
      type: Boolean,
      default: false
    },
    // 接受上传的文件类型
    accept: {
      type: String,
      default: '.jpg, .png, .jpeg'
    },
    // 是否显示已上传文件列表
    'show-file-list': {
      type: Boolean,
      default: false
    },
    // 文件列表的类型
    'list-type': {
      type: String,
      default: 'text'
    },
    // 上传的文件列表
    'file-list': {
      type: Array,
      default: () => {
        return []
      }
    },
    // 最大允许上传个数
    limit: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      // OSS主机地址
      host: '',
      // 上传表单
      form: {
        OSSAccessKeyId: '',
        policy: '',
        signature: '',
        key: '',
        callback: '',
        success_action_status: 200
      }
    }
  },
  methods: {
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeUpload (file) {
      const isType =
        file.type === 'image/png' ||
        file.type === 'image/jpg' ||
        file.type === 'image/jpeg'
      const isSize = file.size < 10 * 1024 * 1024
      // 判断上传文件的类型是否为指定类型
      if (!isType) {
        this.$message.error('请上传png/jpg/jpeg格式的图片!')
        return false
      }
      // 判断上传文件的大小是否超过限制
      if (!isSize) {
        this.$message.error('图片大小不能超过10MB!')
        return false
      }
      // 返回一个Promise对象
      return new Promise((resolve, reject) => {
        this.$http
          .get('/admin/aliyun/oss/policy', {
            params: {
              type: 'img'
            }
          })
          .then(response => {
            this.host = response.data.host
            this.form.OSSAccessKeyId = response.data.accessKeyId
            this.form.policy = response.data.policy
            this.form.signature = response.data.signature
            this.form.key =
              response.data.dir +
              '/' +
              response.data.key +
              '.' +
              file.name.split('.')[1]
            this.form.callback = response.data.callback
            resolve(true)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 文件上传成功时的钩子，参数为(response, file, fileList)
    handleSuccess (response, file, fileList) {
      // console.log(response)
      this.$emit('success', response)
    },
    // 文件列表移除文件时的钩子
    handleFileRemove (file, fileList) {
      // console.log(file)
      // console.log(fileList)
      this.$emit('remove', file, fileList)
      let urlList = []
      urlList.push(file.response.url)
      // console.log(urlList)
      this.$http.put('/admin/aliyun/oss/delete', urlList).then(res => {
        // console.log(res)
        if (res.data.status !== 200) {
          this.$message.error(res.data.message)
        }
      })
    }
  }
}
</script>

<style>
</style>
