<template>
  <div class="container">
    <!-- 返回顶部按钮 -->
    <el-backtop :bottom="100" :right="50" :visibility-height="50">
      <i class="el-icon-arrow-up"></i>
    </el-backtop>
    <el-row :gutter="20" type="flex">
      <el-col :xs="0" :sm="6" :md="6" :lg="5" :xl="5">
        <div id="preview-toc" class="aside">
          <div style="padding: 10px;">
            <h4 class="content-title">文章目录</h4>
            <div id="table-of-content"></div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="14" :xl="14">
        <div class="main">
          <!-- 面包屑导航区域 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/article' }"
              >文章管理</el-breadcrumb-item
            >
            <el-breadcrumb-item>文章预览</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 文章信息 -->
          <div class="article-info">
            <!-- 文章标题 -->
            <h2 class="article-title">{{ article.title }}</h2>
          </div>
          <!-- 正文 -->
          <div
            id="article-content-html"
            class="markdown-body"
            v-html="article.contentHtml"
          ></div>
        </div>
      </el-col>
      <el-col :xs="0" :sm="6" :md="6" :lg="5" :xl="5">
        <div class="info-content">
          <!-- 文章作者 -->
          <h4 class="info-title">作者</h4>
          <div class="author-info-content">
            <el-avatar :src="author.avatar"></el-avatar>
            <div class="author-info">
              <a class="author-nickname" href="/#/user">
                <h4>{{ author.nickname }}</h4>
              </a>
              <span class="author-motto">{{ author.motto }}</span>
            </div>
          </div>
          <!-- 文章目录 -->
          <div class="category-info-content">
            <h4 class="info-title">目录</h4>
            <a class="category-info-link" :href="'/#/article?category_id=' + category.categoryId">
              <div class="category-info">
                <i class="el-icon-folder"></i>
                <span style="margin-left: 5px;">{{ category.categoryName }}</span>
              </div>
            </a>
          </div>
          <!-- 文章标签 -->
          <div class="tags-info-content">
            <h4 class="info-title">标签</h4>
            <div class="tag-list">
              <el-tag
              style="margin-right: 5px;"
              v-for="item in tags"
              :key="item.tagId">{{ item.tagName }}</el-tag>
            </div>
          </div>
          <div class="operate-content">
            <h4 class="info-title">操作</h4>
            <div class="btn-group">
              <!-- 下载下拉菜单 -->
              <el-dropdown @command="download" style="margin-right: 10px;">
                <el-button type="primary" size="small">
                  下载<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="1">
                    <i class="el-icon-download"></i>含文章信息
                  </el-dropdown-item>
                  <el-dropdown-item :command="0">
                    <i class="el-icon-download"></i>仅文章
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button type="warning" size="small" icon="el-icon-edit" @click="update">编辑</el-button>
              <el-popover
              v-model="Switch.removePop"
              placement="bottom"
              style="margin-left: 10px;">
                <p>确定要将这篇文章移除到废纸篓吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="Switch.removePop = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="remove">确定</el-button>
                </div>
                <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                slot="reference">移除</el-button>
              </el-popover>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 文章
      article: {},
      // 作者
      author: {},
      // 目录
      category: {},
      // 标签
      tags: [],
      // 开关
      Switch: {
        removePop: false
      }
    }
  },
  created () {
    this.getArticle()
  },
  mounted () {
    setTimeout(() => {
      this.createContentTree()
      this.init()
    }, 300)
  },
  methods: {
    // 初始化
    init () {
      // 1.获取元素
      var elem = document.getElementById('preview-toc')
      // 2.动态设置元素高度
      elem.style.height = (document.body.clientHeight - 50) + 'px'
    },
    // 获取文章
    async getArticle () {
      const { data: result } = await this.$http.get('/admin/article/view', {
        params: {
          'aid': this.$route.params.id
        }
      })
      // 获取文章信息
      this.article = result.data
      // 获取作者信息
      this.author = result.data.author
      // 获取目录信息
      this.category = result.data.category
      // 获取标签信息
      this.tags = result.data.tags
    },
    // 更新文章
    update () {
      this.$router.push(`/article/update/${this.$route.params.id}`)
    },
    // 移除文章
    async remove () {
      this.Switch.removePop = false
      const body = {
        op: 'replace',
        path: '/status',
        value: 2
      }
      const { data: result } = await this.$http.patch(`/admin/article/${this.$route.params.id}`, body)
      if (result.status !== 200) {
        return this.$message.error('移除失败！')
      }
      this.$message.success('移除成功！')
      this.$router.push('/article/trash')
    },
    // 下载文章
    async download (type) {
      // 下载状态
      var status
      // axios 响应拦截器
      await this.$http.interceptors.response.use(
        (response) => {
          status = response.status
          return response
        },
        (error) => {
          // console.log(error)
          return error
        }
      )
      // 下载配置
      const config = {
        withArticleInfo: type === 1,
        infoFormat: 'YAML',
        withTitle: true,
        withCreateTime: true,
        withUpdateTime: true,
        withDescription: true,
        withCoverUrl: true,
        withCategory: true,
        withTags: true
      }
      // 发送请求
      const result = await this.$http.post(`/admin/article/${this.$route.params.id}/download`, config)
      if (status === 200) {
        this.$message.success('下载成功!')
      } else {
        this.$message.error('下载失败!')
      }
      /**
       * 这里是从服务器接收到的文件流（content-type:application/octet-stream）创建blob对象并使用该blob
       * 创建一个指向类型数组的URL，将该url作为a标签的链接目标，然后去触发a标签的点击事件从而文件下载
       */
      var blob = new Blob([result.data], { type: 'application/octet-stream' })
      var contentDisposition = result.headers['content-disposition']
      var patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
      var res = patt.exec(contentDisposition)
      // 设置下载的文件名
      var filename = res[1]
      var downloadElement = document.createElement('a')
      // 创建下载的链接
      var href = window.URL.createObjectURL(blob)
      // var reg = /^["](.*)["]$/g
      downloadElement.style.display = 'none'
      downloadElement.href = href
      // 下载后文件名
      downloadElement.download = decodeURI(filename)
      document.body.appendChild(downloadElement)
      // 点击下载
      downloadElement.click()
      // 下载完成移除元素
      document.body.removeChild(downloadElement)
      // 释放掉blob对象
      window.URL.revokeObjectURL(href)
    },
    // 创建目录树
    createContentTree () {
      var dom = document.getElementById('article-content-html')
      // console.log(dom)
      var nodes = dom.getElementsByTagName('*')
      // 创建博客目录的div容器
      var contentElem = document.getElementById('table-of-content')
      var articleContentNum = 0
      for (var i = 0; i < nodes.length; i++) {
        var foundElem = false
        var divElemClassName = ''
        switch (nodes[i].nodeName) {
          case 'H1':
            foundElem = true
            divElemClassName = 'toc-content toc-h1'
            break
          case 'H2':
            foundElem = true
            divElemClassName = 'toc-content toc-h2'
            break
          case 'H3':
            foundElem = true
            divElemClassName = 'toc-content toc-h3'
            break
          case 'H4':
            foundElem = true
            divElemClassName = 'toc-content toc-h4'
            break
          case 'H5':
            foundElem = true
            divElemClassName = 'toc-content toc-h5'
            break
          default:
            break
        }
        if (foundElem === true) {
          // 创建<a>标签
          var aElem = document.createElement('A')
          // 设置<a>标签 class
          aElem.className = 'toc-link'
          // console.log(aElem)
          // 设置<a>标签的 id
          nodes[i].setAttribute('id', 'article_content_' + articleContentNum)
          // 设置<a>标签的链接
          aElem.setAttribute('href', 'javascript:;')
          const offsetTop = nodes[i].offsetTop
          // 实现滚动定位
          aElem.onclick = function () {
            let top =
              document.documentElement.scrollTop || document.body.scrollTop
            // 实现滚动效果
            var timeTop = setInterval(() => {
              if (offsetTop > top) {
                document.body.scrollTop = document.documentElement.scrollTop = top += 50
                if (top >= offsetTop) {
                  clearInterval(timeTop)
                }
              } else {
                document.body.scrollTop = document.documentElement.scrollTop = top -= 50
                if (top <= offsetTop) {
                  clearInterval(timeTop)
                }
              }
            }, 3)
          }
          articleContentNum++
          // 创建<div>标签
          var divElem = document.createElement('DIV')
          // 设置<div>标签 class
          divElem.className = divElemClassName
          // 创建<span>标签
          var spanElem = document.createElement('SPAN')
          // 设置<span>标签 class
          spanElem.className = 'toc-title'
          // 创建文本节点
          var textNode = document.createTextNode(nodes[i].innerText)
          // 将文本节点添加到<span>标签里
          spanElem.appendChild(textNode)
          // 将<span>标签添加到<a>标签中
          divElem.appendChild(spanElem)
          // 将<a>标签添加到<div>标签中
          aElem.appendChild(divElem)
          // console.log(aElem)
          // 将创建的DOM元素添加到容器中
          contentElem.appendChild(aElem)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
}
.el-row {
  width: inherit;
}
.main {
  padding: 20px;
}
.aside {
  position: fixed;
  width: inherit;
  height: 650px;
  overflow: auto;
  background-color: #f2f6fc;
  .content-title {
    margin: 0 0 10px 0;
  }
}
.info-content {
  position: fixed;
  width: inherit;
}
.info-title {
  margin: 20px 0 20px 0;
}
.author-info-content {
  display: flex;
  align-items: center;
}
// 作者信息
.author-info {
  margin-left: 10px;
}
// 昵称
.author-nickname {
  text-decoration: none;
  color: #303133;
  h4 {
    margin: 0px;
  }
}
// 昵称：鼠标悬浮
.author-nickname:hover {
  color: #409EFF;
}
// 座右铭
.author-motto {
  color: #909399;
  font-size: 12px;
}
.category-info-link {
  text-decoration: none;
  color: #303133;
}
.category-info {
  padding: 10px 0 10px 0;
}
.category-info:hover {
  color: #409EFF;
  background-color: #F2F6FC;
}
</style>

<style>
.toc-link {
  text-decoration: none;
  color: #303030;
}
.toc-link:hover {
  color: #409eff;
}
.toc-content {
  padding: 3px;
}
.toc-content:hover {
  background-color: #FFF;
}
.toc-h1 {
  padding-left: 0px;
}
.toc-h2 {
  padding-left: 0px;
}
.toc-h3 {
  padding-left: 0px;
}
.toc-h4 {
  padding-left: 10px;
}
.toc-h5 {
  padding-left: 20px;
}
</style>
