<template>
  <div class="dynamic-list">
    <el-row :gutter="20">
      <el-col :span="12" v-for="item in list" :key="item.id">
        <div class="list-item">
          <a class="item-title" :href="'/#/article/preview/' + item.id">{{ item.title }}</a>
          <p class="item-intro">{{ item.introduction }}</p>
          <div class="item-footer">
            <div class="item-tags">
              <el-tag size="small" v-for="tag in item.tags" :key="tag">{{ tag }}</el-tag>
            </div>
            <div class="item-date">
              <i class="el-icon-time"></i>
              <span>{{ item.date }}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12"></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      params: {
        key: '',
        page_num: 1,
        page_size: 4,
        is_reverse: true,
        type: 'dynamic'
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      const { data: result } = await this.$http.get('/article', {
        params: this.params
      })
      this.list = result.data.records
    }
  }
}
</script>

<style lang="less" scoped>
.list-item {
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #DCDFE6;
  margin-bottom: 20px;
}
.item-title {
  text-decoration: none;
  font-weight: bold;
  color: #303133;
}
.item-title:hover {
  color: #409EFF;
}
.item-intro {
  font-size: 14px;
  color: #606266;
}
.item-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.item-tags {
  .el-tag {
    margin-right: 5px;
  }
}
.item-date {
  font-size: small;
  color: #606266;
  span {
    margin-left: 5px;
  }
}
</style>
