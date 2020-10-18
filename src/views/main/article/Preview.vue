<template>
  <div class="container">
    <!-- 返回顶部按钮 -->
    <el-backtop :bottom="100" :right="50" :visibility-height="50">
      <i class="el-icon-arrow-up"></i>
    </el-backtop>
    <el-row :gutter="20" type="flex">
      <el-col :xs="0" :sm="5" :md="6" :lg="5" :xl="5">
        <div class="aside">
          <h4 class="content-title">文章目录</h4>
          <div id="table-of-content"></div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="18" :md="18" :lg="14" :xl="14">
        <div class="main">
          <!-- 面包屑导航区域 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/article' }"
              >文章管理</el-breadcrumb-item
            >
            <el-breadcrumb-item>文章预览</el-breadcrumb-item>
          </el-breadcrumb>
          <h3>{{ article.title }}</h3>
          <div
            id="article-content-html"
            class="markdown-body"
            v-html="article.content_html"
          ></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      article: {}
    }
  },
  created () {
    this.getArticle()
  },
  mounted () {
    /* this.$nextTick(function () {
      this.createContentTree()
    }) */
    setTimeout(() => {
      this.createContentTree()
    }, 300)
  },
  methods: {
    // 获取文章
    async getArticle () {
      const { data: result } = await this.$http.get(
        `/article/${this.$route.params.id}`
      )
      this.article = result.data
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
                document.body.scrollTop = document.documentElement.scrollTop = top += 10
                if (top >= offsetTop) {
                  clearInterval(timeTop)
                }
              } else {
                document.body.scrollTop = document.documentElement.scrollTop = top -= 10
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
.aside, .main {
  padding: 20px;
}
.aside {
  position: fixed;
  .content-title {
    margin: 0 0 10px 0;
  }
  width: 220px;
}
.container {
  width: 100%;
}
.el-row {
  width: inherit;
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
  background-color: #f2f6fc;
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
