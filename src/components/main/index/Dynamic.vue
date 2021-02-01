<template>
  <div class="dynamic">
    <h4 class="block-title">动态</h4>
    <!-- 时间线 -->
    <el-timeline v-infinite-scroll="load">
      <el-timeline-item
        v-for="(item, index) in dynamic.list"
        :key="index"
        :timestamp="item.timeStamp"
        size="large"
        placement="top"
      >
        <div class="dynamic-item" v-for="i in item.content" :key="i.id">
          <!-- 动态头部 -->
          <div class="dynamic-item-header">
            <div class="item-author">
              <el-avatar :src="i.author.avatar" :size="24"></el-avatar>
              <a class="base-link" href="/#/home">
                <span>{{ i.author.nickname }}</span>
              </a>
            </div>
            <div style="margin: 5px 0 5px 0;">
              <span>在目录 </span>
              <a class="item-category" :href="'/#/article?category_id=' + i.category.categoryId">
                <i class="el-icon-folder"></i>
                <span>{{ i.category.categoryName }}</span>
              </a>
              <span> 中 </span>
              <el-tag type="success" size="small">发布</el-tag>
              <span> 了一篇文章</span>
              <a class="base-link-with-underline" :href="'/#/article/preview/' + i.id">《{{ i.title }}》</a>
            </div>
          </div>
          <!-- 动态正文部分 -->
          <div class="dynamic-item-main">
            <a
              class="dynamic-artcle-card-link"
              :href="'/#/article/preview/' + i.id"
            >
              <div class="dynamic-artcle-card">
                <el-row :gutter="0" type="flex" align="middle">
                  <el-col :span="18">
                    <div class="artcle-card-info">
                      <h4 class="article-info-title">{{ i.title }}</h4>
                      <p class="article-info-intro">{{ i.introduction }}</p>
                      <div class="article-info-tags">
                        <el-tag size="small" v-for="tag in i.tags" :key="tag.tagId">
                          {{ tag.tagName }}
                        </el-tag>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="artcle-card-cover">
                      <el-image :src="i.cover"></el-image>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </a>
          </div>
          <div class="dynamic-item-time">
            <i class="el-icon-time"></i>
            <span>{{ i.createTime }}</span>
          </div>
        </div>
      </el-timeline-item>
    </el-timeline>
    <div style="text-align: center;">
      <span style="font-size: 12px; color: #909399;">只展示最近半年的动态</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 动态
      dynamic: {
        // 请求参数
        params: {
          uid: window.sessionStorage.getItem('uid'),
          start_date: '',
          end_date: ''
        },
        // 列表
        list: []
      }
    }
  },
  created () {
    this.getDynamic()
  },
  methods: {
    // 获取动态信息
    async getDynamic () {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 183)
      this.dynamic.params.start_date = start.getFullYear() + '-' + (start.getMonth() + 1 < 10 ? '0' + (start.getMonth() + 1) : start.getMonth() + 1)
      this.dynamic.params.end_date = end.getFullYear() + '-' + (end.getMonth() + 1 < 10 ? '0' + (end.getMonth() + 1) : end.getMonth() + 1)
      const { data: result } = await this.$http.get('/admin/dynamic', { params: this.dynamic.params })
      this.dynamic.list = result.data
    }
  }
}
</script>

<style lang="less" scoped>
.block-title {
  margin: 0 0 20px 0;
}
.base-link {
  color: #303133;
  text-decoration: none;
  span {
    font-weight: bold;
    margin: 0 5px 0 5px;
  }
}
.base-link:hover {
  color: #409EFF;
}
.base-link-with-underline {
  color: #303133;
  text-decoration: none;
  span {
    font-weight: bold;
    margin: 0 5px 0 5px;
  }
}
.base-link-with-underline:hover {
  color: #409EFF;
  border-bottom: 1px solid #409EFF;
}
.el-timeline {
  padding: 0px;
}
.dynamic-item {
  margin: 15px 0 15px 0;
}
.item-author {
  display: inline-flex;
  align-items: center;
}
.item-category {
  padding: 2px;
  color: #303133;
  text-decoration: none;
  span {
    margin-left: 3px;
  }
}
.item-category:hover {
  background-color: #F2F6FC;
}
.dynamic-item-time {
  color: #606266;
  font-size: 12px;
  span {
    margin-left: 2px;
  }
}
.dynamic-item-main {
  padding: 10px;
}
.dynamic-artcle-card-link {
  color: #303133;
  text-decoration: none;
}
.dynamic-artcle-card {
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 3px #dcdfe6;
}
.artcle-card-info {
  padding: 5px;
  .article-info-title {
    margin: 0 0 5px 0;
  }
  .article-info-intro {
    margin: 10px 0 10px 0;
    color: #909399;
    font-size: 12px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .article-info-tags {
    .el-tag {
      margin-right: 5px;
    }
  }
}
.artcle-card-cover {
  .el-image {
    border-radius: 5px;
  }
}
</style>
