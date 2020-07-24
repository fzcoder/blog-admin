<template>
  <!-- 动态列表 -->
  <div class="dynamic">
    <h4># 最新动态</h4>
    <el-timeline>
      <el-timeline-item
        :timestamp="item.date"
        placement="top"
        v-for="(item, index) in dynamic.list"
        :key="item.id"
      >
        <el-card>
          <div class="dynamic-item">
            <div class="item-header">
              <el-avatar shape="circle" :size="30" :src="user.avatar"></el-avatar>
              <h4>{{ user.nickname }}</h4>
            </div>
            <p>
              # {{ user.nickname }} 在
              <el-tag size="small" :type="style.tag[index%4]" effect="dark">{{ item.category_name }}</el-tag>中发布了一篇新文章
            </p>
            <div class="item-content">
              <el-row :gutter="0">
                <el-col :span="6">
                  <el-image class="item-cover" :src="item.cover" fit="contain"></el-image>
                </el-col>
                <el-col :span="18">
                  <div class="item-body">
                    <el-link
                      :underline="false"
                      :href=" 'http://www.frankfang.cn/article/' + item.id "
                      target="_blank"
                    >
                      <h3 style="margin: 0px 0px 10px 0px;">{{ item.title }}</h3>
                    </el-link>
                    <div>
                      <el-tag
                        v-for="(tag, i) in item.tags"
                        :key="tag"
                        :type="style.tag[i%4]"
                        size="small"
                        effect="dark"
                        class="item-tag"
                      >{{ tag }}</el-tag>
                    </div>
                    <p class="item-intro">简介: {{ item.introduction }}</p>
                    <div class="btn-group">
                      <el-button
                        type="text"
                        size="small"
                        icon="el-icon-edit"
                        @click="() => { $router.push(`/admin/article/update/${item.id}`) }"
                      >修改</el-button>
                      <el-button
                        type="text"
                        size="small"
                        icon="el-icon-delete"
                        @click="() => { $router.push('/admin/article') }"
                      >删除</el-button>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  name: 'Dynamic',
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      // 动态
      dynamic: {
        // 列表
        list: [],
        // 总数
        total: 0,
        // 请求参数
        params: {},
        // 请求体
        body: {
          key: '',
          pageNum: 1,
          pageSize: 50,
          orderBy: ['date'],
          reverse: true
        }
      },
      style: {
        tag: ['primary', 'success', 'warning', 'danger']
      }
    }
  },
  created () {
    this.getDynamic()
  },
  methods: {
    async getDynamic () {
      const { data: result } = await this.$http.post(
        '/article',
        this.dynamic.body
      )
      this.dynamic.list = result.data.records
    }
  }
}
</script>

<style lang="less" scoped>
.el-timeline {
  padding: 0px 0px 0px 5px;
}
.dynamic-item {
  .item-header {
    display: flex;
    align-content: center;
    justify-content: flex-start;
    h4 {
      margin: 0px;
    }
  }
  .item-content {
    background-color: snow;
    border-radius: 10px;
    padding: 5px;
    // display: flex;
    // align-items: center;
    // justify-content: flex-start;
  }
  .item-body {
    padding: 10px;
    // width: 70%;
    height: inherit;
  }
  .item-cover {
    // height: 100%;
    // width: 30%;
    border-radius: 10px;
    // display: block;
  }
  .item-tag {
    margin-right: 5px;
  }
  .item-intro {
    font-size: small;
    margin: 5px 0 0px 0;
  }
}
</style>
