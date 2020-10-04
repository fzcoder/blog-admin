<template>
  <div class="container">
    <el-row :gutter="20" type="flex" justify="center">
      <el-col :xs="24" :sm="20" :md="20" :lg="18" :xl="16">
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-col>
      <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
        <div class="base-content">
          <h4>功能</h4>
          <a class="link-card" href="/#/article/draft">
            <div class="link-card-content color-gradient-HappyUnicorn">
              <i class="el-icon-edit"></i>
              <span class="card-title">草稿箱</span>
            </div>
          </a>
          <a class="link-card" href="/#/article/trash">
            <div class="link-card-content color-gradient-MagicLake">
              <i class="el-icon-delete"></i>
              <span class="card-title">废纸篓</span>
            </div>
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
}
.el-row {
  width: 100%;
  padding: 20px;
}
.link-card {
  text-decoration: none;
  cursor: pointer;
  color: #fff;
}
.link-card-content {
  padding: 10px;
  margin: 0 0 10px 0;
  border-radius: 10px;
  // 阴影
  box-shadow: 0px 0px 8px #dcdfe6;
  display: flex;
  align-items: center;
  .card-title {
    margin: 0 0 0 10px;
    font-weight: bold;
  }
}
</style>
