<template>
  <div class="index-setting-content">
    <el-form label-position="top">
      <el-form-item label="# 走马灯">
        <el-button type="primary" size="small" icon="el-icon-plus">添加</el-button>
        <el-table :data="carousel.list" stripe>
          <el-table-column type="index" label="#" width="40px"></el-table-column>
          <el-table-column label="图片">
            <template slot-scope="scope">
              <el-image :src="scope.row.cover" fit="contain" :previewSrcList="carousel.srcList"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="链接地址">
            <template slot-scope="scope">
              <el-link :underline="false" :href="scope.row.url" target="_blank">{{ scope.row.url }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="标题" prop="title"></el-table-column>
          <el-table-column label="操作" width="250px">
            <template slot-scope="scope">
              <!-- 修改按钮 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                round
                size="small "
                @click="update (scope.row.id) "
              >修改</el-button>
              <!-- 删除按钮 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                round
                size="small"
                @click="remove (scope.row.id) "
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'IndexSetting',
  data () {
    return {
      // 走马灯
      carousel: {
        // 列表
        list: [],
        // 图片列表
        srcList: []
      }
    }
  },
  created () {
    this.getCarouselList()
  },
  methods: {
    getCarouselList () {
      this.$http.get('/carousel').then(res => {
        const result = res.data
        this.carousel.list = result.data
        for (var i = 0; i < this.carousel.list.length; i++) {
          this.carousel.srcList.push(this.carousel.list[i].cover)
        }
      })
    }
  }
}
</script>

<style>
</style>
