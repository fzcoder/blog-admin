<template>
  <div class="editor">
    <!-- 这里采用的是github上的开源编辑器mavon-editor, 项目主页: https://github.com/hinesboy/mavonEditor -->
    <mavon-editor
      :toobars="option"
      v-model="_value"
      :ishljs="isHightLight"
      :style="style"
      ref=md
      @save="handleSaveEvent"
      @change="contentChangeEvent"
      @imgAdd="handleImageAdd"
      @imgDel="handleImageDelete"
    ></mavon-editor>
  </div>
</template>

<script>
export default {
  name: 'editor',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    // v-model双向绑定的值
    value: String,
    // 工具栏选项
    option: {
      type: Object,
      default: () => ({
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      })
    },
    // 代码是否高亮
    isHightLight: {
      type: Boolean,
      default: true
    },
    // 设置最小高度
    'min-height': {
      type: String,
      default: '600px'
    }
  },
  computed: {
    // 此时如果操作赋权，将会改变绑定的value属性，引起报错。
    // 子组件中更改绑定的prop值最好使用计算属性computed解决。
    _value: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  data () {
    return {
      // 设置编辑器最小高度
      style: {
        'min-height': this.minHeight
      }
    }
  },
  methods: {
    // 处理保存事件
    handleSaveEvent (value, render) {
      this.$emit('save', value, render)
    },
    // 处理内容修改事件
    contentChangeEvent (value, render) {
      this.$emit('change', value, render)
    },
    // 处理图片添加事件
    async handleImageAdd (filename, imgfile) {
      // 从应用服务器获取凭证
      const { data: result } = await this.$http.get('/admin/aliyun/oss/policy', { params: { type: 'img' } })
      // 文件服务器主机地址
      const host = result.host
      // 上传表单
      var formData = new FormData()
      formData.append('OSSAccessKeyId', result.accessKeyId)
      formData.append('policy', result.policy)
      formData.append('signature', result.signature)
      formData.append('key', result.dir + '/' + result.key + '.' + imgfile.name.split('.')[1])
      formData.append('callback', result.callback)
      formData.append('success_action_status', 200)
      formData.append('file', imgfile)
      // 上传请求
      this.$http.post(host, formData).then(response => {
        // $vm.$img2Url(filename, url)表示将md源码中图片文件名替换为url
        // $vm指mavonEditor实例, 这里用this.$refs.md来代替
        this.$refs.md.$img2Url(filename, response.data.url)
      })
    },
    // 处理图片删除事件
    // filename: 写在md中的文件名
    handleImageDelete (filename) {
      // console.log(filename[0])
      let urlList = []
      urlList.push(filename[0])
      this.$http.put('/admin/aliyun/oss/delete', urlList).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style>
</style>
